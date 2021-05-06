// Require
const path          = require('path');
const fs            = require('fs');
const canvas        = require('canvas');
const extra         = require('./_config');

module.exports = function(config){

    // Creation des FRAMES à partir du FRAMESET
    function getSize(oEntity, sFrame, nX, nY){
        const oRatioFrame = oEntity.oRatio[sFrame] || extra.oRatio;
        return {
            nSrcX: (nX + (oRatioFrame.nX || 0)) * extra.oSquare[oEntity.sType],
            nSrcY: (nY + (oRatioFrame.nY || 0)) * extra.oSquare[oEntity.sType],
            nSrcW: oRatioFrame.nWidth * extra.oSquare[oEntity.sType],
            nSrcH: oRatioFrame.nHeight * extra.oSquare[oEntity.sType],
            nDstW: oRatioFrame.nWidth * extra.oSquare[oEntity.sType] * 4,
            nDstH: oRatioFrame.nHeight * extra.oSquare[oEntity.sType] * 4
        };
    }

    // Export
    return {
        generate: function(sType, sChar){

            return function generate(done) {
                const oEntity = extra[sType][sChar],
                    aPromise = [];
        
                oEntity.aColor.forEach( sColor => {
                    aPromise.push(
                        new Promise( (fResolveColor, fRejectColor) => {
                            const sPath = config.paths.src.images + '/' + extra.oPath.oFrames[sType] + '/' + ( sType == 'oChar' ? sChar + '/' + sColor : '' ),
                                aPromiseColor = [];
        
                            canvas.loadImage(sPath + '/__frameset.png').then( oImage => {
                                oEntity.aFrames.forEach( (aRow, nY) => {
                                    aRow && aRow.forEach( (sFrame, nX) => {
                                        if( sFrame && ( extra.aFilterFrames.length == 0 || extra.aFilterFrames.indexOf(sFrame) != -1 ) ){
                                            aPromiseColor.push(
                                                new Promise( (fResolveFrame, fRejectFrame) => {
        
                                                    const oSize = getSize(oEntity, sFrame, nX, nY),
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

                                            extra.oFilter[sType].forEach( oFilter => {
                                                if( oFilter.aFrame.indexOf(sFrame) != -1 ){
                                                    aPromiseColor.push(
                                                        new Promise( (fResolveFrame, fRejectFrame) => {
                
                                                            const oSize = getSize(oEntity, sFrame, nX, nY),
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