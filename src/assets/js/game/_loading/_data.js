function InitializeData(){
    this.init();
}

Object.assign(
    InitializeData.prototype, {

        init: function(){
            // Entity
            this.oData = GameData.oEntity;
            for( let sType in this.oData ){
                if( GameData[sType] ){
                    for( let sCod in GameData[sType] ){
                        const oEntity = GameData[sType][sCod];
                        
                        this.createFrames(sType, oEntity);
                        this.createAnimations(sType, oEntity);
                        if( sType == 'oCharacter' ){
                            this.createLaunch(oEntity);
                            this.createJump(oEntity);
                            this.createRecovery(oEntity);
                            this.createCommands(oEntity);
                        }
                        this.createColor(sType, oEntity);
                    }
                }
            }
            // Stage
            for( let sCod in GameData.oStage ){
                this.createStage(GameData.oStage[sCod]);
            }
        },

        isPlainObject: function(uData){
            return Object.prototype.toString.call(uData) === '[object Object]';
        },
        generateMovement: function(uMove){

            let oMove = null;
            if( Array.isArray(uMove) ){
                oMove = {
                    bEmpty: false,
                    aStep: uMove,
                    nLength: uMove.length,
                    nDelay: 0,
                    bDivide: true,
                    bParallel: false,
                    oDirection: {
                        nX: 0,
                        nY: 0
                    }
                };
            }
            else {
                oMove = Object.assign(
                    {
                        bEmpty: false,
                        aStep: null,
                        nLength: 0,
                        nDelay: 0,
                        bDivide: true,
                        bParallel: false,
                        oDirection: {
                            nX: 0,
                            nY: 0
                        }
                    },
                    uMove
                );

                if( !oMove.bEmpty && !oMove.aStep ){
                    
                    oMove.aStep = [];
                    // Linear timing function
                    if( uMove.nLength > 1 ){
                        const nDivide = uMove.nMove || uMove.nLength,
                            oStep = {
                                nX: uMove.nX ? uMove.nX / nDivide : 0,
                                nY: uMove.nY ? uMove.nY / nDivide : 0
                            };
                        for( let nIndex = 0; nIndex < uMove.nLength; nIndex++ ){
                            oMove.aStep.push( nIndex < nDivide ? oStep : null);
                        }
                    }
                    else {
                        oMove.aStep.push( {
                            nX: uMove.nX || 0,
                            nY: uMove.nY || 0
                        } );
                    }
                }
            }

            if( oMove.aStep ){
                oMove.oDirection = {
                    nX: oMove.aStep.reduce( (nX, oStep) => {
                        return nX + ( ( oStep && oStep.nX ) || 0 );
                    }, 0 ),
                    nY: oMove.aStep.reduce( (nY, oStep) => {
                        return nY + ( ( oStep && oStep.nY ) || 0 );
                    }, 0 )
                };
            }

            return oMove;
        },

        // ENTITY
        createFrames: function(sType, oEntity){
            const oFrames = {};
            [
                ...Object.keys(this.oData[sType].oFrames),
                ...Object.keys(oEntity.oFrames)
            ]
            .filter( (uValue, nIndex, aSelf) => {
                return aSelf.indexOf(uValue) === nIndex;
            } )
            .forEach( sFrame => {
                if( oEntity.oFrames[sFrame] != null ){
                    oFrames[sFrame] = Object.assign({ sPath: sFrame + '.png' }, this.oData[sType].oFrames[sFrame] || {}, oEntity.oFrames[sFrame] || {});
                    GameSettings.aFilter.forEach( oFilter => {
                        if( oFilter.aFrames.indexOf(sFrame) != -1 ){
                            oFrames[sFrame + '_' + oFilter.sSuffixe] = Object.assign({}, oFrames[sFrame], oFilter.oData);
                            oFrames[sFrame + '_' + oFilter.sSuffixe].sPath = oFrames[sFrame].sPath.substring(0, oFrames[sFrame].sPath.length - 4) + '_' + oFilter.sSuffixe + '.png';
                        }
                    } );
                }
            } );
            oEntity.oFrames = oFrames;
        },

        createAnimations: function(sType, oEntity){
            oEntity.oAnimations = Object.assign({}, this.oData[sType].oAnimations, oEntity.oAnimations);
            for( let sAnim in oEntity.oAnimations ){
                const uAnim = oEntity.oAnimations[sAnim];
                // Gestion Frames
                if( Array.isArray(uAnim) ){
                    oEntity.oAnimations[sAnim] = {
                        aFrames: uAnim
                    };
                }
                // Gestion Move
                else if( uAnim.uMove ){
                    uAnim.oMove = this.generateMovement(uAnim.uMove);
                    delete uAnim.uMove;
                }

                if( oEntity.oAnimations[sAnim].aFrames ) {
                    this.createStepAnimations(oEntity, sAnim);
                }
            }
        },

        createStepAnimations: function(oEntity, sAnimation){
            
            // Gestion step
            let nValue = 0;
            const aCheckHitbox = [false, true, false],
                aProp = ['nStartUp', 'nActive', 'nRecovery'],
                oAnimation = oEntity.oAnimations[sAnimation];

            oAnimation.oData = {
                nLength: 0,
                nStartUp: 0,
                nActive: 0,
                nRecovery: 0
            };
            oAnimation.aFrames.forEach( oFrame => {
                oFrame = Object.assign( {}, oEntity.oFrames[oFrame.sFrame], oFrame);
                if( aCheckHitbox[nValue] == !oFrame.aHitBox ){
                    nValue++;
                }
                else if( !nValue && oFrame.oStatus && oFrame.oStatus.bCancel ){
                    nValue = 2;
                }
                oAnimation.oData[ aProp[nValue] ] += oFrame.nFrame || 0;
                oAnimation.oData.nLength += oFrame.nFrame || 0;
            } );
        },
        
        createColor: function(sType, oEntity){
            oEntity.aColor.forEach( (oColor, nIndex) => {
                // DUPLICATE
                const oEntityColor = oEntity[ oColor.sColor ] = Object.assign(
                    {
                        sCod: oEntity.sEntity + '_' + oColor.sColor,
                        sEntity: oEntity.sEntity,
                        sEntityColor: oEntity.sEntityColor,
                        sName: oEntity.sName,
                        oPath: {
                            sFrames: GameSettings.oPath[sType].sRoot + '/' + oEntity.sEntity + '/' + oColor.sColor
                        }
                    },
                    oColor
                );

                // DEFAULT
                oEntity.sDefaultColor || (oEntity.sDefaultColor = oColor.sColor);

                // PATH
                if( GameSettings.oPath[sType].sFace ){
                    oEntityColor.oPath.sFace = GameSettings.oPath[sType].sRoot + '/' + oEntity.sEntity + '/' + oColor.sColor + '/' + GameSettings.oPath[sType].sFace;
                }
                if( GameSettings.oPath[sType].sPreview ){
                    oEntityColor.oPath.sPreview = GameSettings.oPath[sType].sRoot + '/' + oEntity.sEntity + '/' + oColor.sColor + '/' + GameSettings.oPath[sType].sPreview;
                }
                
                // FRAMES
                oEntityColor.oFrames = {};
                for( let sFrame in oEntity.oFrames ){
                    const oFrame = oEntity.oFrames[sFrame];
                    if( !oFrame.aFilter || oFrame.aFilter.indexOf(oColor.sColor) != 1 ){
                        oEntityColor.oFrames[sFrame] = oFrame;
                    }
                }

                // ANIMATIONS
                oEntityColor.oAnimations = {};
                for( let sAnim in oEntity.oAnimations ){
                    const oAnim = oEntity.oAnimations[sAnim];
                    if( !oAnim.aFilter || oAnim.aFilter.indexOf(oColor.sColor) != -1 ){
                        oEntityColor.oAnimations[sAnim] = oAnim;
                    }
                }

                // COMMANDS
                if( oEntity.oCommands ){
                    oEntityColor.oCommands = {};
                    for( let sTypeCmd in oEntity.oCommands ){
                        oEntityColor.oCommands[sTypeCmd] = [];
                        oEntity.oCommands[sTypeCmd].forEach( oCommand => {
                            if( !oCommand.aFilter || oCommand.aFilter.indexOf(oColor.sColor) != -1 ){
                                if( oCommand.oName ){
                                    oCommand = Object.assign( {}, {
                                        sName: oCommand.oName[ oEntityColor.sColor ]
                                    }, oCommand );
                                    delete oCommand.oName;
                                }
                                oEntityColor.oCommands[sTypeCmd].push(oCommand);
                            }
                        } );
                    }
                }
            } );

            delete oEntity.oFrames;
            delete oEntity.oAnimations;
            delete oEntity.oCommands;
        },

        // CHARACTER
        createLaunch: function(oChar){
            let nLastY = 0,
                oLastFrame = null;

            const aFrames = [],
                aMove = [],
                nDemiLength = (GameSettings.oLauncher.nLength - 1) / 2,
                nX = GameSettings.oLauncher.oMove.nX / GameSettings.oLauncher.nLength;

            // Ajout de 10 FRAMES suppl??mentaire pour g??rer le DOWN
            for( let nIndex = 1; nIndex <= GameSettings.oLauncher.nLength + 10; nIndex++ ){
                const nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GameSettings.oLauncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    bInvulnerable = GameSettings.oLauncher.nInvulnerable >= nIndex;

                if( nIndex <= GameSettings.oLauncher.nLength / 2 ){
                
                    let sFrame = 'hit_2';
                    if( nIndex == 1 ){
                        sFrame += '__1';
                    } else if (bInvulnerable){
                        sFrame += '__0';
                    }

                    if( oLastFrame && oLastFrame.sFrame == sFrame ){
                        oLastFrame.nFrame++;
                    } else {
                        aFrames.push( oLastFrame = {
                            nFrame: 1,
                            sFrame,
                            oStatus: {
                                bInvul: bInvulnerable,
                                bReverse: nIndex == 1
                            }
                        } );
                        
                        if( nIndex == 1 ){
                            oLastFrame.oStatus.bAerial = true;
                            oLastFrame.oStatus.bLaunch = true;
                        }
                    }
                }
                aMove.push( { nX, nY } );
                nLastY = nTargetY;
            }

            Object.assign(
                oChar.oAnimations.launch_0,
                {
                    oMove: this.generateMovement(aMove),
                    aFrames: aFrames
                }
            );
            
            this.createStepAnimations(oChar, 'launch_0');
        },

        createJump: function(oChar){
            const aFrames = oChar.oAnimations.move_8.aFrames,
                oRatio = {
                    _7: -1,
                    _8: 0,
                    _9: 1
                };

            for( let sType in oRatio ){
                let nLastY = 0,
                    oLastFrame = null;

                const aMove = [],
                    nDemiLength = (GameSettings.oJump.nLength - 1) / 2,
                    nX = GameSettings.oJump.oMove.nX / GameSettings.oJump.nLength;

                // Ajout de 10 FRAMES suppl??mentaire pour g??rer le LANDING
                for( let nIndex = 1; nIndex <= GameSettings.oJump.nLength + 10; nIndex++ ){
                    const nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                        nParabolY = -1 * (nParabolX * nParabolX - 1),
                        nTargetY = Math.round(nParabolY * GameSettings.oJump.oMove.nY),
                        nY = nTargetY - nLastY;
                    
                    aMove.push( {
                        nX: nX * oRatio[sType],
                        nY
                    } );
                    nLastY = nTargetY;
                }
                
                Object.assign(
                    oChar.oAnimations['move' + sType],
                    {
                        oMove: this.generateMovement(aMove),
                        aFrames: aFrames
                    }
                );
            
                this.createStepAnimations(oChar, 'move' + sType);
            }
        },

        createRecovery: function(oChar){
            const aRecovery = oChar.oAnimations.launch_5.aFrames,
                oRatio = {
                    _4: -1,
                    _6: 1
                };
            
            for( let sType in oRatio ){
                const aFrames = [];
                aRecovery.forEach( (oFrame, nIndex) => {
                    aFrames.push( Object.assign( {}, oFrame ) );
                } );
                Object.assign(
                    oChar.oAnimations['launch' + sType],
                    {
                        oMove: this.generateMovement( {
                            nX: GameSettings.nRecovery * oRatio[sType]
                        } ),
                        aFrames
                    }
                );
            
                this.createStepAnimations(oChar, 'launch' + sType);
            }
        },

        createCommands: function(oChar){
            const oCommands = {};
            for( let sType in this.oData.oCharacter.oCommands ){
                oCommands[sType] = [];
                this.oData.oCharacter.oCommands[sType].forEach( oCommand => {
                    oCommands[sType].push( Object.assign({}, oCommand) );
                } );
                if( oChar.oCommands && oChar.oCommands[sType] ){
                    [].push.apply(oCommands[sType], oChar.oCommands[sType]);
                }

                oCommands[sType].forEach( oCommand => {
                    // ROOT pour FOllOW
                    const sRoot = oCommand.sCod;
                    do {
                        // GATLING ENTITY
                        if( oCommand.oGatling.aEntity && !Array.isArray(oCommand.oGatling.aEntity) ){
                            oCommand.oGatling.aEntity = [oCommand.oGatling.aEntity];
                        }

                        // HIT et GUARD DATA
                        ['oHit', 'oGuard'].forEach( sProp => {
                            if( oCommand[sProp] ){
                                const oPushback = oCommand[sProp].oPushback;
                                oCommand[sProp] = {
                                    oDamage: Object.assign( {}, GameSettings.oCommand.oDamage, oCommand[sProp].oDamage || {} ),
                                    oKi: Object.assign( {}, GameSettings.oCommand.oKi[sProp], oCommand[sProp].oKi || {} ),
                                    oStun: Object.assign( {}, GameSettings.oCommand.oStun[sProp], oCommand[sProp].oStun || {} ),
                                    oPushback: null
                                };
                                if( oPushback !== false ){
                                    oCommand[sProp].oPushback = oPushback ?
                                        this.generateMovement(oPushback) :
                                        Object.assign( {}, GameSettings.oCommand.oPushback );
                                }
                            }
                        } );

                        // FOLLOWUP ROOT
                        if( oCommand.oFollowUp ){
                            oCommand.oFollowUp.sRoot = sRoot;
                        }

                        oCommand = oCommand.oFollowUp;
                    }
                    while( oCommand );
                } );
            }
            oChar.oCommands = oCommands;
        },

        // STAGE
        createStage: function(oStage){
            oStage.oPath = {
                sPreview: GameSettings.oPath.oStage.sRoot + '/' + oStage.sCod + '/' + GameSettings.oPath.oStage.sPreview,
                sBackground: GameSettings.oPath.oStage.sRoot + '/' + oStage.sCod + '/' + GameSettings.oPath.oStage.sBackground
            };
        }
    }
);

InitializeScene.prototype.stepData = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create data Entity' );
            new InitializeData();
            this.bStepEnd = true;
        }
    )
};