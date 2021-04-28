// Require
const path          = require('path');
const fs            = require('fs');
const canvas        = require('canvas');
const extra         = require('./_config');

module.exports = function(config){

    // Creation des FRAMES à partir du FRAMESET
    function getSize(oChar, sFrame, nX, nY){
        const oRatioFrame = oChar.oRatio[sFrame] || extra.oRatio;
        return {
            nSrcX: (nX + (oRatioFrame.nX || 0)) * extra.nSquare,
            nSrcY: (nY + (oRatioFrame.nY || 0)) * extra.nSquare,
            nSrcW: oRatioFrame.nWidth * extra.nSquare,
            nSrcH: oRatioFrame.nHeight * extra.nSquare,
            nDstW: oRatioFrame.nWidth * extra.nSquare * 4,
            nDstH: oRatioFrame.nHeight * extra.nSquare * 4
        };
    }

    // Export
    return {
        generate: function(sChar){

            return function generate(done) {
                const oChar = extra.oChar[sChar],
                    aPromise = [];
        
                oChar.aColor.forEach( sColor => {
                    aPromise.push(
                        new Promise( (fResolveColor, fRejectColor) => {
                            const sPath = config.paths.src.images + '/' + extra.oPath.sFrames + '/' + sChar + '/' + sColor,
                                aPromiseColor = [];
        
                            canvas.loadImage(sPath + '/__frameset.png').then( oImage => {
                                oChar.aFrames.forEach( (aRow, nY) => {
                                    aRow && aRow.forEach( (sFrame, nX) => {
                                        if( sFrame && ( extra.aFilterFrames.length == 0 || extra.aFilterFrames.indexOf(sFrame) != -1 ) ){
                                            aPromiseColor.push(
                                                new Promise( (fResolveFrame, fRejectFrame) => {
        
                                                    const oSize = getSize(oChar, sFrame, nX, nY),
                                                        sFilePath = sPath + '/' + sFrame + '.png',
                                                        oCanvas = canvas.createCanvas(oSize.nDstW, oSize.nDstH),
                                                        oContext = oCanvas.getContext('2d');
                                                    
                                                    oContext.imageSmoothingEnabled  = false;
                                                    oContext.drawImage(oImage, oSize.nSrcX, oSize.nSrcY, oSize.nSrcW, oSize.nSrcH, 0, 0, oSize.nDstW, oSize.nDstH);
        
                                                    fs.writeFile(
                                                        sFilePath,
                                                        oCanvas.toBuffer('image/png'),
                                                        oErr => {
                                                            oErr ? fRejectFrame(oErr) : fResolveFrame(sFilePath);
                                                        }
                                                    );
                                                } )
                                            );

                                            extra.aFilter.forEach( oFilter => {
                                                if( oFilter.aFrame.indexOf(sFrame) != -1 ){
                                                    aPromiseColor.push(
                                                        new Promise( (fResolveFrame, fRejectFrame) => {
                
                                                            const oSize = getSize(oChar, sFrame, nX, nY),
                                                                sFilePath = sPath + '/' + sFrame + '_' + oFilter.sSuffixe + '.png',
                                                                oCanvas = canvas.createCanvas(oSize.nDstW, oSize.nDstH),
                                                                oContext = oCanvas.getContext('2d', { alpha: true });
                                                            
                                                            oContext.imageSmoothingEnabled  = false;
                                                            oContext.drawImage(oImage, oSize.nSrcX, oSize.nSrcY, oSize.nSrcW, oSize.nSrcH, 0, 0, oSize.nDstW, oSize.nDstH);
                                                            oContext.globalCompositeOperation = 'source-atop';
                                                            oContext.globalAlpha = oFilter.nAlpha;
                                                            oContext.fillStyle = oFilter.sColor;
                                                            oContext.fillRect(0, 0, oSize.nDstW, oSize.nDstH);
                
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
    };
};