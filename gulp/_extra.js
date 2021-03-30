// Require
const gulp          = require('gulp');
const path          = require('path');
const fs            = require('fs');
const pngjs         = require('png-js');
const plumber       = require('gulp-plumber');
const beautify      = require('gulp-beautify');

// Export
module.exports = function(config){

    function PixelData(oPNG){
        this.oPNG = oPNG;
    }

    Object.assign(
        PixelData.prototype, {
            decode: function(fCallback){
                this.oPNG.decode( oBuffer => {
                    this.oBuffer = oBuffer;
                    fCallback.call(this);
                } );
            },

            forEach: function( fCallback ){
                for( let nIndex = 0; nIndex < this.oBuffer.length; nIndex += 4 ){
                    fCallback.call(this, this.getPosition(nIndex), this.getPixel(nIndex));
                }
            },

            toRight: function(nX, nY, sCheck){
                let nMoreX = 0;
                do {
                    nMoreX++;
                }
                while( this[sCheck]( this.getPixel(nX + nMoreX, nY) ) );
                return nMoreX;
            },

            toBottom: function(nX, nY, sCheck){
                let nMoreY = 0;
                do {
                    nMoreY++;
                }
                while( this[sCheck]( this.getPixel(nX, nY + nMoreY) ) );
                return nMoreY;
            },

            getPosition: function(nIndex){
                nIndex = Math.floor(nIndex / 4);
                return {
                    nX: Math.floor( nIndex % this.oPNG.width ),
                    nY: Math.floor( nIndex / this.oPNG.width )
                };
            },
            getPixel: function(nX, nY){
                let nIndex = nX;
                if( nY != null ){
                    if( nX < this.oPNG.width && nY < this.oPNG.height ){
                        nIndex = 4 * (nY * this.oPNG.width + nX);
                    } else {
                        return null;
                    }
                }
                return {
                    r: this.oBuffer[nIndex],
                    g: this.oBuffer[nIndex + 1],
                    b: this.oBuffer[nIndex + 2],
                    a: this.oBuffer[nIndex + 3],
                };
            },

            isBlack: function(nX, nY){
                let oPixel = nX;
                if( nY != null ){
                    oPixel = this.getPixel(nX, nY);
                }
                return oPixel
                    && oPixel.a > 0
                    && oPixel.r == 0
                    && oPixel.g == 0
                    && oPixel.b == 0;
            },

            isColor: function(nX, nY){
                let oPixel = nX;
                if( nY != null ){
                    oPixel = this.getPixel(nX, nY);
                }
                return oPixel && oPixel.a > 0;
            }
        }
    );

    const aChar = ['BJT', 'BUU', 'FRZ', 'GHS', 'GHT', 'GKU', 'SRU'],
        aBox = ['oPositionBox', 'aHurtBox', 'aHitBox'],
        nSquare = 50,
        oPos = { nX: 24, nY: 45 },
        aFrames = [
            ['stand', 'blur', 'backward', 'forward', 'forward_inverse'],
            ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
            ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
            ['light_first', 'light_second', 'light_third', 'heavy', 'tracker', 'luncher'],
            ['ki_blast'],
            ['super_first', 'super_second', 'super_third', null, 'super_fourth'],
            null,
            ['super_fifth', null, null, 'super_sixth']
        ],
        aFrameActive = ['light_first', 'light_second', 'light_third', 'heavy', 'tracker', 'luncher'],
        oPath = {
            sFrames: 'characters/frames',
            sData: 'data/_extra'
        };

    function setFrame(oTarget, oBox, oData){
        oTarget[oBox.sFrame] || ( oTarget[oBox.sFrame] = {} );
        oTarget[oBox.sFrame][oBox.sBox] || ( oTarget[oBox.sFrame][oBox.sBox] = [] );

        const oFramePos = {
                nX: oBox.nFrameX * nSquare + oPos.nX,
                nY: oBox.nFrameY * nSquare + oPos.nY
            },
            oBoxFrame = {
                nX: (oBox.nX - oFramePos.nX) * 4,
                nY: (oBox.nY - oFramePos.nY) * 4,
                nWidth: oData.nWidth * 4,
                nHeight: oData.nHeight * 4
            };
        
        oBoxFrame.nX += oBoxFrame.nX > 0 ? 2 : -2;
        oBoxFrame.nY += oBoxFrame.nY > 0 ? 2 : -2;
        
        oTarget[oBox.sFrame][oBox.sBox].push(oBoxFrame);
    }

    function createFrame(oFile, oData, sFrame, bSkipHitBox){
        if( oData ){
            oFile[sFrame] = Object.assign( {}, oData);
            if( oFile[sFrame] && oFile[sFrame].aHitBox ){
                if( bSkipHitBox ){
                    delete oFile[sFrame].aHitBox;
                }
                else if ( sFrame.indexOf('super_') == 0 ){
                    oFile[sFrame].aHitBox.forEach( oHitBox => {
                        delete oHitBox.nWidth;
                    } );
                }
            }
            for( let sBox in oFile[sFrame] ){
                if( oFile[sFrame][sBox].length == 1 ){
                    oFile[sFrame][sBox] = oFile[sFrame][sBox][0];
                }
            }
        } else {
            oFile[sFrame] = null;
        }
    }

    function createJSON(sChar, oData){
        const oFile = {},
            sFilePath = config.paths.src.js + '/' + oPath.sData + '/' + sChar + '.json';

        aFrames.forEach( aRow => {
            aRow && aRow.forEach( sFrame => {
                if( sFrame ){
                    if( aFrameActive.indexOf(sFrame) == -1 ){
                        createFrame(oFile, oData[sFrame], sFrame, false);
                    } else {
                        createFrame(oFile, oData[sFrame], sFrame, true);
                        createFrame(oFile, oData[sFrame], sFrame + '_active');
                    }
                }
            } );
        } );

        return new Promise( (fResolve, fReject) => {
            fs.writeFile(
                sFilePath,
                JSON.stringify(oFile),
                oErr => {
                    oErr ? fReject(oErr) : fResolve(sFilePath);
                }
            );
        } );
    }

    function parse(sChar) {
        return function parse(done) {
            const oFrameData = {},
                aPromise = [];

            aBox.forEach( sBox => {
                aPromise.push(
                    new Promise( (fResolve, fReject) => {
                        try {
                            const oPNG = pngjs.load(config.paths.src.images + '/' + oPath.sFrames + '/' + sChar + '/box/' + sBox + '.png'),
                                oPixelData = new PixelData(oPNG),
                                oStart = {};

                            oPixelData.decode( function() {
                                this.forEach( (oPos, oPixel) => {
                                    if( this.isBlack(oPixel) ){
                                        const oFrame = {
                                                nFrameX: Math.floor(oPos.nX / nSquare),
                                                nFrameY: Math.floor(oPos.nY / nSquare)
                                            },
                                            sFrame = aFrames[oFrame.nFrameY][oFrame.nFrameX];

                                        oStart[sFrame] || ( oStart[sFrame] = [] );
                                        oStart[sFrame].push(
                                            Object.assign(
                                                oPos,
                                                oFrame, {
                                                    sBox,
                                                    sFrame
                                                }
                                            )
                                        );
                                    }
                                } );

                                for( let sFrame in oStart ){
                                    oStart[sFrame].forEach( oBoxStart => {
                                        const aX = [],
                                            aY = [];
                                    
                                        aX.push( this.toRight(oBoxStart.nX, oBoxStart.nY, 'isColor') );
                                        aY.push( this.toBottom(oBoxStart.nX, oBoxStart.nY, 'isColor') );

                                        const nNextX = this.toRight(oBoxStart.nX, oBoxStart.nY + aY[0] - 1, 'isColor'),
                                            nNextY = this.toBottom(oBoxStart.nX + aX[0] - 1, oBoxStart.nY, 'isColor');
                                        nNextX > 1 && aX.push(nNextX);
                                        nNextY > 1 && aY.push(nNextY);

                                        setFrame(oFrameData, oBoxStart, {
                                            nWidth: Math.min.apply( Math, aX ),
                                            nHeight: Math.min.apply( Math, aY )
                                        } );
                                    } )
                                }

                                fResolve();
                            } );
                        }
                        catch(oError) {
                            console.log('"' + sChar + '" ' + oError.message);
                            fReject();
                        }
                    } )
                );
            } );

            Promise
                .all(aPromise)
                .then(
                    () => {
                        createJSON(sChar, oFrameData).then(
                            sFilePath => {
                                done();
                            },
                            oError => {
                                console.log('"' + sChar + '" ' + oError.message);
                                done();
                            }
                        );
                    }
                )
                .catch(
                    oError => {
                        console.log('"' + sChar + '" ' + oError.message);
                        done();
                    }
                );
        };
    }

    function clean(sChar){
        return function clean(){
            const sPath = config.paths.src.js + '/' + oPath.sData,
                sFile = sChar ? sChar + '.json' : '*.json';

            return gulp.src( sPath + '/' + sFile)
                .pipe(plumber(config.plugins.plumber))
                .pipe(beautify.js(config.plugins.beautify.js))
                .pipe(plumber.stop())
                .pipe(gulp.dest(sPath));
        };
    }

    const _extra = {};
    aChar.forEach( sChar => {
        _extra['extra_' + sChar] = gulp.series( parse(sChar), clean(sChar) );
    } );
    _extra.global = gulp.series( gulp.parallel.apply(gulp, Object.values(_extra) ), clean() );

    return _extra;
};