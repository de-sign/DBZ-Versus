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
                            this.createLunch(oEntity);
                            this.createJump(oEntity);
                            this.createRecovery(oEntity);
                            this.createCommands(oEntity);
                            this.createAnimationsList(oEntity);
                            this.createThrow(oEntity);
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
                    oFrames[sFrame] = Object.assign({}, this.oData[sType].oFrames[sFrame] || {}, oEntity.oFrames[sFrame] || {});
                    for( let sProp in oFrames[sFrame] ){
                        if( this.oData[sType].oFrames[sFrame] && this.isPlainObject(this.oData[sType].oFrames[sFrame][sProp]) ){
                            if( this.isPlainObject(oEntity.oFrames[sFrame][sProp]) ){
                                Object.assign(oFrames[sFrame][sProp], this.oData[sType].oFrames[sFrame][sProp], oEntity.oFrames[sFrame][sProp]);
                            }
                            else if( this.oData[sType].oFrames[sFrame][sProp].bDelete && oEntity.oFrames[sFrame][sProp] == null ){
                                delete oFrames[sFrame][sProp];
                            }
                        }
                    }
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
                if( Array.isArray(oEntity.oAnimations[sAnim]) ){
                    oEntity.oAnimations[sAnim] = {
                        aFrames: oEntity.oAnimations[sAnim]
                    };
                }
            }
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
                    for( let sTypeCMD in oEntity.oCommands ){
                        oEntityColor.oCommands[sTypeCMD] = [];
                        oEntity.oCommands[sTypeCMD].forEach( oCommand => {
                            if( !oCommand.aFilter || oCommand.aFilter.indexOf(oColor.sColor) != -1 ){
                                if( oCommand.oName ){
                                    oCommand = Object.assign( {}, {
                                        sName: oCommand.oName[ oEntityColor.sColor ]
                                    }, oCommand );
                                    delete oCommand.oName;
                                }
                                oEntityColor.oCommands[sTypeCMD].push(oCommand);
                                
                                const sRoot = oCommand.sCod;
                                while( oCommand.oFollowUp ) {
                                    oCommand.oFollowUp.sRoot = sRoot;
                                    oCommand = oCommand.oFollowUp;
                                }
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
        createLunch: function(oChar){
            let nLastY = 0,
                oLastFrame = null;

            const oAnim = {
                    lunch: {
                        aAnim: [],
                        aMove: []
                    },
                    fall: {
                        aAnim: [],
                        aMove: []
                    }
                },
                nDemiLength = (GameSettings.oLuncher.nLength - 1) / 2,
                nX = GameSettings.oLuncher.oMove.nX / GameSettings.oLuncher.nLength;

            // Ajout de 10 FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GameSettings.oLuncher.nLength + 10; nIndex++ ){
                const nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GameSettings.oLuncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    bInvulnerable = GameSettings.oLuncher.nInvulnerable >= nIndex,
                    bFall = nIndex > GameSettings.oLuncher.nLength / 2,
                    sAnim = bFall ? 'fall' : 'lunch';
                
                let sFrame = GameSettings.oLuncher.oFrames[ bFall ? 'sFall' : 'sLunch' ];
                if( nIndex == 1 ){
                    sFrame += '_filter';
                } else if (bInvulnerable){
                    sFrame += '_invul';
                }

                if( oLastFrame && oLastFrame.sFrame == sFrame ){
                    oLastFrame.nFrame++;
                } else {
                    oAnim[sAnim].aAnim.push( oLastFrame = {
                        nFrame: 1,
                        sFrame,
                        oStatus: {
                            bAerial: true,
                            bLunch: true,
                            bInvul: bInvulnerable,
                            bReverse: nIndex == 1
                        }
                    } );
                }
                oAnim[sAnim].aMove.push( { nX, nY } );
                nLastY = nTargetY;
            }

            for( let sAnim in oAnim ){
                oChar.oAnimations[sAnim] = {
                    oMove: oAnim[sAnim].aMove,
                    aFrames: oAnim[sAnim].aAnim
                };
            }
        },

        createJump: function(oChar){
            const oCoef = {
                backward: -1,
                neutral: 0,
                forward: 1
            };

            for( let sType in oCoef ){
                let nLastY = 0,
                    oLastFrame = null;

                const aAnim = [ {
                        nFrame: 2,
                        sFrame: 'blur',
                        oStatus: {
                            bAerial: true
                        }
                    } ],
                    aMove = [{}],
                    nDemiLength = (GameSettings.oJump.nLength - 1) / 2,
                    nX = GameSettings.oJump.oMove.nX / GameSettings.oJump.nLength;

                // Ajout de 10 FRAMES supplémentaire pour gérer le LANDING
                for( let nIndex = 1; nIndex <= GameSettings.oJump.nLength + 10; nIndex++ ){
                    const nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                        nParabolY = -1 * (nParabolX * nParabolX - 1),
                        nTargetY = Math.round(nParabolY * GameSettings.oJump.oMove.nY),
                        nY = nTargetY - nLastY,
                        bPrejump = nIndex <= GameSettings.oJump.oPre.nJump,
                        bPrelanding = nIndex >= GameSettings.oJump.nLength - GameSettings.oJump.oPre.nLanding;
                    
                    let sFrame = 'sJump';
                    if( bPrejump ){
                        sFrame = 'sPrejump';
                    } else if( bPrelanding ){
                        sFrame = 'sPrelanding';
                    }
                    sFrame = GameSettings.oJump.oFrames[sFrame];

                    if( oLastFrame && oLastFrame.sFrame == sFrame ){
                        oLastFrame.nFrame++;
                    } else {
                        aAnim.push( oLastFrame = {
                            nFrame: 1,
                            sFrame,
                            oStatus: {
                                bAerial: true,
                                bReverse: true,
                                bCancel: !bPrejump
                            }
                        } );
                    }
                    aMove.push( { nX: nX * oCoef[sType], nY } );
                    nLastY = nTargetY;
                }
                
                oChar.oAnimations['jump_' + sType] = {
                    oMove: aMove,
                    aFrames: aAnim
                };
            }
        },

        createRecovery: function(oChar){
            const aRecovery = oChar.oAnimations.recovery.aFrames;
            ['forward', 'backward'].forEach( sType => {
                const aAnim = [];
                aRecovery.forEach( (oFrame, nIndex) => {
                    aAnim.push( Object.assign(
                        nIndex ? {} : { oPositionBox: null },
                        oFrame
                    ) );
                } );
                oChar.oAnimations['recovery_' + sType] = {
                    oMove: GameSettings.oRecovery[sType],
                    aFrames: aAnim
                };
            } );
        },

        createCommands: function(oChar){
            const oCommands = {};
            for( let sType in this.oData.oCharacter.oCommands ){
                oCommands[sType] = [];
                this.oData.oCharacter.oCommands[sType].forEach( oCommand => {
                    oCommands[sType].push( Object.assign({}, oCommand) );
                } );
                oChar.oCommands && oChar.oCommands[sType] && [].push.apply(oCommands[sType], oChar.oCommands[sType]);
                oCommands[sType].forEach( oCommand => {
                    if( oCommand.aEntity && !Array.isArray(oCommand.aEntity) ){
                        oCommand.aEntity = [oCommand.aEntity];
                    }
                } );
            }
            oChar.oCommands = oCommands;
        },

        createAnimationsList: function(oChar){
            oChar.oCommands.aOffense.forEach( oCommand => {
                if( !oCommand.bNotInCommandList ){
                    do {
                        if( oCommand.oFollowUp ){
                            // Creation de l'animation LIST pour les FOLLOWUP
                            const aListFrames = [],
                                aRefFrames = oChar.oAnimations[oCommand.sListAnimation || oCommand.sAnimation].aFrames,
                                aCurFrames = oChar.oAnimations[oCommand.oFollowUp.sAnimation].aFrames;

                            for(let nFrames = 0; nFrames < aRefFrames.length; nFrames++){
                                const oFrame = Object.assign( {}, aRefFrames[nFrames] );
                                aListFrames.push( oFrame );

                                if( oFrame.oStatus && oFrame.oStatus.bCancel ){
                                    delete oFrame.oStatus;
                                    oFrame.nFrame = GameSettings.nFreeze;
                                    break;
                                }
                            }
                            aCurFrames.forEach( oFrame => {
                                aListFrames.push( Object.assign( {}, oFrame ) );
                            } );

                            // Ajout de l'animation
                            const sListAnimation = 'list_' + oCommand.oFollowUp.sAnimation;
                            oChar.oAnimations[sListAnimation] = {
                                aFrames: aListFrames
                            };
                            oCommand.oFollowUp.sListAnimation = sListAnimation;
                        }
                        oCommand = oCommand.oFollowUp;
                    }
                    while( oCommand );
                }
            } );
        },

        createThrow: function(oChar){
            let oThrow = null,
                oBackThrow = null;
                oLuncher = null;

            oChar.oCommands.aOffense.forEach( oCommand => {
                switch( oCommand.sCod ){
                    case 'throw':
                        oThrow = oCommand;
                        break;
                    case 'back_throw':
                        oBackThrow = oCommand;
                        break;
                    case 'luncher':
                        oLuncher = Object.assign(
                            {},
                            oCommand,
                            {
                                sCod: 'throw_luncher',
                                oManipulation: null
                            }
                        );
                        break;
                }
            } );

            // BackThrow
            oBackThrow.oFollowUp.oFollowUp = oLuncher;
            oThrow.oFollowUp = Object.assign( { bFollowOnlyOnHurt: true }, oLuncher );
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