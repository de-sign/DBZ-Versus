// Require
const gulp          = require('gulp');
const path          = require('path');
const fs            = require('fs');
const pngjs         = require('png-js');
const canvas        = require('canvas');
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

    const aChar = ['BJT', 'BUU', 'FRZ', 'GHA', 'GHC', 'GKU', 'SRU'],
        aColor = [ ['BSJ', 'SSJ'], ['MAJ'], ['FRZ'], ['GHS'], ['GHT'], ['TRN', 'SSJ'], ['SRU', 'PFC'] ],
        aBox = ['oPositionBox', 'aHurtBox', 'aHitBox'],
        nSquare = 50,
        nExpand = 1200,
        oRatio = {
            all: {
                nWidth: 1,
                nHeight: 1
            },
            ki_beam: {
                nWidth: 2,
                nHeight: 1
            },
            super_third: {
                nWidth: 2,
                nHeight: 1
            },
            super_fourth: {
                nWidth: 2,
                nHeight: 1
            },
            super_fifth: {
                nWidth: 3,
                nHeight: 1.5,
                nY: -0.25
            },
            super_sixth: {
                nWidth: 3,
                nHeight: 1.5,
                nY: -0.25
            }
        },
        oPos = { nX: 24, nY: 45 },
        aFrames = [
            ['stand', 'blur', 'backward', 'forward', 'forward_inverse'],
            ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
            ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
            ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
            ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
            ['kikoha', 'ki_beam'],
            ['super_first', 'super_second', 'super_third', null, 'super_fourth'],
            null,
            ['super_fifth', null, null, 'super_sixth']
        ],
        aExpand = ['ki_beam', 'super_third', 'super_fourth', 'super_fifth', 'super_sixth'],
        oPath = {
            sFrames: 'characters/frames',
            sData: 'data/_extra'
        };

    function getSize(sFrame, nX, nY){
        const oRatioFrame = oRatio[sFrame] || oRatio.all;
        return {
            nSrcX: (nX + (oRatioFrame.nX || 0)) * nSquare,
            nSrcY: (nY + (oRatioFrame.nY || 0)) * nSquare,
            nSrcW: oRatioFrame.nWidth * nSquare,
            nSrcH: oRatioFrame.nHeight * nSquare,
            nDstW: oRatioFrame.nWidth * nSquare * 4,
            nDstH: oRatioFrame.nHeight * nSquare * 4
        };
    }

    // Creation des FRAMES à partir du FRAMESET
    function generate(sChar){
        
        return function generate(done) {
            const nIndexChar = aChar.indexOf(sChar),
                aPromise = [];

            aColor[ nIndexChar ].forEach( sColor => {
                aPromise.push(
                    new Promise( (fResolveColor, fRejectColor) => {
                        const sPath = config.paths.src.images + '/' + oPath.sFrames + '/' + sChar + '/' + sColor,
                            aPromiseColor = [];

                        canvas.loadImage(sPath + '/__frameset.png').then( oImage => {
                            aFrames.forEach( (aRow, nY) => {
                                aRow && aRow.forEach( (sFrame, nX) => {
                                    if( sFrame ){
                                        aPromiseColor.push(
                                            new Promise( (fResolveFrame, fRejectFrame) => {

                                                const bExpand = aExpand.indexOf(sFrame) == -1 ? false : true,
                                                    oSize = getSize(sFrame, nX, nY),
                                                    sFilePath = sPath + '/' + sFrame + '.png',
                                                    oCanvas = canvas.createCanvas(bExpand ? nExpand : oSize.nDstW, oSize.nDstH),
                                                    oContext = oCanvas.getContext('2d');
                                                
                                                oContext.imageSmoothingEnabled  = false;
                                                oContext.drawImage(oImage, oSize.nSrcX, oSize.nSrcY, oSize.nSrcW, oSize.nSrcH, 0, 0, oSize.nDstW, oSize.nDstH);
                                                bExpand && oContext.drawImage(oImage, oSize.nSrcX + oSize.nSrcW - 2, oSize.nSrcY, 1, oSize.nSrcH, oSize.nDstW, 0, nExpand - oSize.nDstW, oSize.nDstH);

                                                fs.writeFile(
                                                    sFilePath,
                                                    oCanvas.toBuffer('image/png'),
                                                    oErr => {
                                                        oErr ? fRejectFrame(oErr) : fResolveFrame(sFilePath);
                                                    }
                                                );
                                            } )
                                        );
                                    }
                                } );
                            } );
                        } );

                        Promise.all(aPromiseColor)
                            .then( () => fResolveColor() )
                            .catch( oError => fRejectColor(oError) );
                    } )
                );
            } );

            Promise
                .all(aPromise)
                .then( () =>  done() )
                .catch( oError => {
                    console.log('"' + sChar + '" ' + oError.message);
                    done();
                } );
        };
    }

    // Creation du JSON à partir des images BOX
    function setFrame(oTarget, oBox, oData){
        oTarget[oBox.sFrame] || ( oTarget[oBox.sFrame] = {} );
        oTarget[oBox.sFrame][oBox.sBox] || ( oTarget[oBox.sFrame][oBox.sBox] = [] );

        const oFramePos = {
                nX: oBox.nFrameX * nSquare + oPos.nX,
                nY: oBox.nFrameY * nSquare + oPos.nY
            },
            oBoxFrame = {
                nX: (oBox.nX - oFramePos.nX) * 4 - 2,
                nY: (oBox.nY - oFramePos.nY) * 4 - 2,
                nWidth: oData.nWidth * 4,
                nHeight: oData.nHeight * 4
            };
        
        oTarget[oBox.sFrame][oBox.sBox].push(oBoxFrame);
    }

    function createFrame(oFile, oData, sFrame){
        if( oData ){
            oFile[sFrame] = Object.assign( {}, oData);
            if( oFile[sFrame] && oFile[sFrame].aHitBox && sFrame.indexOf('super_') == 0 ){
                oFile[sFrame].aHitBox.forEach( oHitBox => {
                    delete oHitBox.nWidth;
                } );
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
                    createFrame(oFile, oData[sFrame], sFrame);
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
                            sFilePath => done(),
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
        _extra['extra_' + sChar] = gulp.series( generate(sChar), parse(sChar), clean(sChar) );
    } );
    _extra.global = gulp.parallel.apply(gulp, Object.values(_extra) );

    return _extra;
};