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
    
    // Migration de l'ancien FRAMESET
    function getMigrateSize(oEntity, sFrame, nX, nY, nMX, nMY){
        const oRatioFrame = oEntity.oRatio[sFrame] || extra.oRatio;
        return {
            nSrcX: (nX + (oRatioFrame.nX || 0)) * extra.oSquare[oEntity.sType],
            nSrcY: (nY + (oRatioFrame.nY || 0)) * extra.oSquare[oEntity.sType],
            nSrcW: (oRatioFrame.nWidth || 1) * extra.oSquare[oEntity.sType],
            nSrcH: (oRatioFrame.nHeight || 1) * extra.oSquare[oEntity.sType],
            nDstX: (nMX + (oRatioFrame.nMX || 0)) * extra.oSquare[oEntity.sType],
            nDstY: (nMY + (oRatioFrame.nMY || 0)) * extra.oSquare[oEntity.sType]
        };
    }

    function getMigrateFrame(sType, sName, sFrame){
        let sNew = null;
        if( extra.oMigrate[sType][sName] ){
            sNew = extra.oMigrate[sType][sName][sFrame];
        }
        return sNew == null ? sFrame : sNew;
    }

    // Export
    return {
        generate: function(sType, sChar){

            function newGenerate(done) {
                const oEntity = extra[sType][sChar],
                    aPromise = [];
        
                oEntity.aColor.forEach( sColor => {
                    aPromise.push(
                        new Promise( (fResolveColor, fRejectColor) => {
                            const sPath = config.paths.src.images + '/' + extra.oPath.oFrames[sType] + '/' + ( sType == 'oChar' ? sChar + '/' + sColor : '' ),
                                aPromiseColor = [];
        
                            canvas.loadImage(sPath + '/_frameset.png').then( oImage => {
                                extra.oMigrate.aFrames.forEach( (aRow, nY) => {
                                    aRow && aRow.forEach( (sFrame, nX) => {
                                        if( sFrame && ( extra.aFilterFrames.length == 0 || extra.aFilterFrames.indexOf(sFrame) != -1 ) ){
                                            let bOutput = false;
                                            aPromiseColor.push(
                                                new Promise( (fResolveFrame, fRejectFrame) => {
        
                                                    const oSize = getSize(oEntity, sFrame, nX, nY),
                                                        sFilePath = sPath + '/' + sFrame + '.png',
                                                        oCanvas = canvas.createCanvas(oSize.nDstW, oSize.nDstH),
                                                        oContext = oCanvas.getContext('2d');
                                                    
                                                    oContext.imageSmoothingEnabled  = false;
                                                    oContext.drawImage(oImage, oSize.nSrcX, oSize.nSrcY, oSize.nSrcW, oSize.nSrcH, 0, 0, oSize.nDstW, oSize.nDstH);
                                                    
                                                    const oBuffer = oCanvas.toBuffer('image/png');
                                                    if( oBuffer.length > 252 ){
                                                        bOutput = true;
                                                        fs.writeFile(
                                                            sFilePath,
                                                            oBuffer,
                                                            oErr => {
                                                                oErr ? fRejectFrame(oErr) : fResolveFrame(sFilePath);
                                                            }
                                                        );
                                                    }
                                                } )
                                            );

                                            bOutput && extra.oNewFilter[sType].forEach( oFilter => {
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

            function generate(done) {
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

            return sType == 'oChar' ? newGenerate : generate;
        },

        migrate: function(sType, sName){

            return function migrate(done) {
                const oEntity = extra[sType][sName],
                    aPromise = [],
                    oFramePos = {};

                oEntity.aFrames.forEach( (aRow, nY) => {
                    aRow.forEach( (sFrame, nX) => {
                        if( sFrame ){
                            oFramePos[sFrame] = [nX, nY];
                        }
                    } );
                } );
        
                oEntity.aColor.forEach( sColor => {
                    aPromise.push(
                        new Promise( (fResolveColor, fRejectColor) => {
                            const sPath = config.paths.src.images + '/' + extra.oPath.oFrames[sType] + '/' + ( sType == 'oChar' ? sName + '/' + sColor : '' ),
                                oCanvas = canvas.createCanvas(extra.oMigrate.oCanvas.nWidth * ( sName == 'MJN_BUU' ? 2 : 1 ), extra.oMigrate.oCanvas.nHeight),
                                oContext = oCanvas.getContext('2d');
        
                            canvas.loadImage(sPath + '/__frameset.png').then( oImage => {
                                extra.oMigrate.aFrames.forEach( (aRow, nY) => {
                                    aRow && aRow.forEach( (sFrame, nX) => {
                                        const sLastFrame = getMigrateFrame(sType, sName, extra.oMigrate.oMapping[sFrame]),
                                            aPos = oFramePos[sLastFrame];

                                        if( aPos && ( extra.aFilterFrames.length == 0 || extra.aFilterFrames.indexOf(sFrame) != -1 ) ){
                                            const oSize = getMigrateSize(oEntity, sFrame, aPos[0], aPos[1], nX, nY);
                                            oContext.drawImage(oImage, oSize.nSrcX, oSize.nSrcY, oSize.nSrcW, oSize.nSrcH, oSize.nDstX, oSize.nDstY, oSize.nSrcW, oSize.nSrcH);
                                        }
                                    } );
                                } );

                                fs.writeFile(
                                    sPath + '/_frameset.png',
                                    oCanvas.toBuffer('image/png'),
                                    oErr => {
                                        oErr ? fRejectColor(oErr) : fResolveColor();
                                    }
                                );
                            } );
                        } )
                    );
                } );
        
                Promise
                    .all(aPromise)
                    .then( () =>  done() )
                    .catch( oError => {
                        console.log('"' + sName + '" ' + oError.message);
                        done();
                    } );
            };
        }
    };
};