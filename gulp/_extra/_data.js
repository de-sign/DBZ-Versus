// Require
const gulp          = require('gulp');
const path          = require('path');
const fs            = require('fs');
const pngjs         = require('png-js');
const plumber       = require('gulp-plumber');
const beautify      = require('gulp-beautify');
const extra         = require('./_config');

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


module.exports = function(config){

    // Creation du JSON à partir des images BOX
    function setFrame(oTarget, oBox, oData){
        oTarget[oBox.sFrame] || ( oTarget[oBox.sFrame] = {} );
        oTarget[oBox.sFrame][oBox.sBox] || ( oTarget[oBox.sFrame][oBox.sBox] = [] );

        const oFramePos = {
                nX: oBox.nFrameX * extra.nSquare + extra.oPos.nX,
                nY: oBox.nFrameY * extra.nSquare + extra.oPos.nY
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
            sFilePath = config.paths.src.js + '/' + extra.oPath.sData + '/' + sChar + '.json';

        extra.oChar[sChar].aFrames.forEach( aRow => {
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

    // Export
    return {
        parse: function(sChar) {
            return function parse(done) {
                const oChar = extra.oChar[sChar],
                    oFrameData = {},
                    aPromise = [];
        
                extra.aBox.forEach( sBox => {
                    aPromise.push(
                        new Promise( (fResolve, fReject) => {
                            try {
                                const oPNG = pngjs.load(config.paths.src.images + '/' + extra.oPath.sFrames + '/' + sChar + '/__box/' + sBox + '.png'),
                                    oPixelData = new PixelData(oPNG),
                                    oStart = {};
        
                                oPixelData.decode( function() {
                                    this.forEach( (oPos, oPixel) => {
                                        if( this.isBlack(oPixel) ){
                                            const oFrame = {
                                                    nFrameX: Math.floor(oPos.nX / extra.nSquare),
                                                    nFrameY: Math.floor(oPos.nY / extra.nSquare)
                                                },
                                                sFrame = oChar.aFrames[oFrame.nFrameY][oFrame.nFrameX];
        
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
        },

        clean: function(sChar){
            return function clean(){
                const sPath = config.paths.src.js + '/' + extra.oPath.sData,
                    sFile = sChar ? sChar + '.json' : '*.json';
        
                return gulp.src( sPath + '/' + sFile)
                    .pipe(plumber(config.plugins.plumber))
                    .pipe(beautify.js(config.plugins.beautify.js))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest(sPath));
            };
        }
    };
};