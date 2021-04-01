/* ----- BattleInputBuffer ----- */
function BattleInputBuffer(oKeyboard){
    this.oKeyboard = null;

    this.nDirection = 5;
    this.bReverse = false;
    this.aHistory = [];
    this.nFrameLastUpdate = 0;

    this.init(oKeyboard);
}

Object.assign(
    BattleInputBuffer,
    {
        nLengthHistory: 20,
        oButtonsDirection: {
            UP: 3,
            DOWN: -3,
            LEFT: -1,
            RIGHT: 1
        },
        oMapDirection: {
            aNormal: ['DB', 'DN', 'DF', 'BW', 'NT', 'FW', 'UB', 'UP', 'UF'],
            aReverse: ['DF', 'DN', 'DB', 'FW', 'NT', 'BW', 'UF', 'UP', 'UB']
        },
        prototype: {
            constructor: BattleInputBuffer,
            init: function(oKeyboard) {
                this.oKeyboard = oKeyboard;
            },
            update: function(bReverse){
                this.bReverse = bReverse;
                if( this.oKeyboard && this.oKeyboard.nFrameLastEvent == GAME.oTimer.nFrames ){
                    this.nFrameLastUpdate = GAME.oTimer.nFrames;
                    this.updateDirection();

                    this.aHistory.length >= BattleInputBuffer.nLengthHistory && this.aHistory.shift();
                    this.aHistory.push( {
                        nFrame: GAME.oTimer.nFrames,
                        oButtons: this.getButtonsPressed()
                    } );
                }
            },
            destroy: function(){
            },

            updateDirection: function(){
                this.nDirection = 5;
                for (sBtn in BattleInputBuffer.oButtonsDirection) {
                    if ( this.oKeyboard.oButtons[sBtn].bPressed ) {
                        this.nDirection += BattleInputBuffer.oButtonsDirection[sBtn];
                    }
                }
            },
            getButtonsPressed: function(){
                const oBtns = {},
                    aFrameDir = [];

                // Gestion BTN
                for( let sBtn in this.oKeyboard.oButtons ){
                    if( BattleInputBuffer.oButtonsDirection[sBtn] ){
                        aFrameDir.push( this.oKeyboard.oButtons[sBtn].nFrameChanged );
                    } else if( this.oKeyboard.oButtons[sBtn].bPressed ){
                        oBtns[sBtn] = this.oKeyboard.oButtons[sBtn].nFrameChanged;
                    }
                }

                // Gestion DIR
                oBtns[ this.getDirection() ] = Math.max.apply(Math, aFrameDir);

                return oBtns;
            },
            getDirection: function(){
                return BattleInputBuffer.oMapDirection[ this.bReverse ? 'aReverse' : 'aNormal' ][this.nDirection - 1];
            },
            checkManipulation: function(nFrameCheck, oManip){
                const nManipButtons = oManip.aButtons.length;

                let nIndexHistory = this.aHistory.length,
					nIndexButtons = nManipButtons - 1,
					bFCheck = true,
                    bNotCheck = false,
					nButtonsCheck = 0, 
					oHistory;

                while( oHistory = this.aHistory[--nIndexHistory] ){

                    const oManipButtons = oManip.aButtons[nIndexButtons];
                    let bButtonCheck = true;

                    if( oManipButtons ){
                        for(let sButton in oManipButtons){
                            if(
                                ( bFCheck && oManipButtons[sButton] && oHistory.oButtons[sButton] != oHistory.nFrame )
                                ||
                                ( !oManipButtons[sButton] && !oHistory.oButtons[sButton] )
                            ){
                                bButtonCheck = false;
                                break;
                            }
                        }
                    } else {
                        bNotCheck = true;
                    }

                    if(bFCheck){
                        if(bButtonCheck){
                            if(oManipButtons){
                                bNotCheck = false;
                            }
                            bFCheck = false;
                            nButtonsCheck++;
                        } else if(!bNotCheck){
                            break;
                        }
                    }

                    if( !oManipButtons || ( !bFCheck && !bButtonCheck ) ){
                        bFCheck = true;
                        nIndexButtons--;
                        nIndexHistory++;
                    } else {
                        let nButtonDiff = nFrameCheck - oHistory.nFrame + 1;
                        if(	nButtonDiff >= oManip.nMaxLengthFrame || nButtonsCheck == nManipButtons || ( !bNotCheck && !nIndexButtons ) ){
                            break;
                        }
                    }
                }

                return nButtonsCheck == nManipButtons;
            }
        }
    }
);

/* ----- BattleGatling ----- */
function BattleGatling(oInputBuffer, oCommandData){
    this.oInputBuffer = null;
    this.oCommandData = null;

    this.oCurrent = null;
    this.bFreeze = false;
    this.oNext = null;
    this.oUsed = {};

    this.init(oInputBuffer, oCommandData);
}

Object.assign(
    BattleGatling.prototype, {
        init: function(oInputBuffer, oCommandData){
            this.oInputBuffer = oInputBuffer;
            this.oCommandData = oCommandData;
        },
        update: function(nKi, oCanAction){
            let bFind = false,
                bUse = false;
            const aCommand = this.getEnterCommands(oCanAction.sCommand);

            for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                const oCommand = aCommand[nIndex];
                if( oCommand.bGuard ? oCanAction.bGuard : !oCanAction.bGuard ){
                    if( this.canUseCommand(nKi, oCommand) ){
                        if( oCanAction.bStack ){
                            this.oNext = oCommand;
                            bFind = true;
                        } else {
                            this.use(oCommand);
                            bFind = true;
                            bUse = true;
                        }
                        break;
                    }
                }
            }

            // Gestion Gatling Buffer
            if( !bFind && this.oNext && !oCanAction.bStack ){
                this.use(this.oNext);
                bUse = true;
            }

            return bUse ? this.oCurrent : null;

        },
        destroy: function(){
        },

        reset: function(){
            this.oCurrent = null;
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed = {};
        },
        use: function(oCommand){
            this.oCurrent = Object.assign({ nFrameStart: GAME.oTimer.nFrames }, oCommand);
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed[oCommand.sCod] = true;
        },
        getEnterCommands: function(sType){
            const aCommand = [],
                nFrameCheck = GAME.oTimer.nFrames;

            if( this.oInputBuffer.nFrameLastUpdate == nFrameCheck ){
                for( let nIndex = 0; nIndex < this.oCommandData[sType].length; nIndex++ ){
                    const oCommand = this.oCommandData[sType][nIndex];
                    if( this.oInputBuffer.checkManipulation(nFrameCheck, oCommand.oManipulation) ){
                        aCommand.push( Object.assign({ bHit: false }, oCommand) );
                        if( oCommand.bLast ){
                            break;
                        }
                    }
                }
            }
            return aCommand;
        },
        canUseCommand: function(nKi, oCommand){
            let bCanUse = false;
            // Gestion KI
            if( !oCommand.nCost || nKi >= oCommand.nCost ){
                // Gestion GATLING
                if( this.oUsed[oCommand.sCod] ){
                    // Gestion REDA CANCEL
                    const aSelfCancel = oCommand.oSelfCancel ? Object.keys(oCommand.oSelfCancel) : [];
                    if( this.oCurrent && aSelfCancel.length && ( this.oCurrent.sCod == oCommand.sCod || aSelfCancel.indexOf(this.oCurrent.sCod) != -1 ) ){
                        for( let nIndex = 0; nIndex < aSelfCancel.length; nIndex++ ){
                            if( !this.oUsed[ aSelfCancel[nIndex] ] ){
                                Object.assign(oCommand, oCommand.oSelfCancel[ aSelfCancel[nIndex] ]);
                                bCanUse = true;
                                break;
                            }
                        }
                    }
                }
                // Gestion LEVEL
                else if( !this.oCurrent || this.oCurrent.nGatlingLevel <= oCommand.nGatlingLevel ) {
                    bCanUse = true;
                }
            }
            return bCanUse;
        },
        isHit: function(){
            return this.oCurrent && this.oCurrent.bHit;
        },
        needFreeze: function(){
            return this.oCurrent && this.oCurrent.oStun.nFreeze && !this.bFreeze;
        }
    }
);

/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, nColor, oKeyboard){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;

    this.oCharacter = null;
    this.oColor = null;
    this.oPath = null;
    this.oInputBuffer = null;

    this.oAnimation = null;
    this.oLunch = null;
    this.oGatling = null;

    this.nHitting = 0;
    
    this.bReverse = false;
    this.nLife = GAME.oSettings.nLife;
    this.nKi = 0;

    this.init(sChar, nColor, oKeyboard);
}

Object.assign(
    BattlePlayer.prototype, {
        init: function(sChar, nColor, oKeyboard) {
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + this.nPlayer);
            this.oSprite = GAME.oOutput.getElement('SPT__Battle_Character_Sprite_' + this.nPlayer);
            
            this.oLayer.resetPosition();
            this.oLayer.update();

            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oColor = this.oCharacter.aColor[nColor];
            this.oPath = this.oCharacter.oPath[this.oColor.sCod];
            this.oInputBuffer = new BattleInputBuffer(oKeyboard);
            this.oGatling = new BattleGatling(this.oInputBuffer, this.oCharacter.oCommands);

            // init en STAND
            this.setAnimation('stand', true);
        },
        // Gestion des INPUTs
        updateInput: function(){
            this.oInputBuffer.update(this.bReverse);

            // Si pas stun par Animation
            const oCanAction = this.canAction();
            if( oCanAction.sCommand ){
                const sDirection = this.oInputBuffer.getDirection();

                // Gestion RECOVERY
                if( oCanAction.bRecovery ){
                    switch( sDirection ){
                        case 'DB':
                        case 'BW':
                            this.setMovement('recovery_backward');
                            break;
                        case 'DF':
                        case 'FW':
                            this.setMovement('recovery_forward');
                            break;
                        default:
                            this.setMovement('recovery');
                            break;
                    }
                }
                
                else {

                    // Gestion MANIP
                    const oCommand = this.oGatling.update(this.nKi, oCanAction);
                    if( oCommand ){
                        oCommand.nCost && (this.nKi -= oCommand.nCost);
                        this.setAnimation(oCommand.sAnimation);
                    }
                    // Gestion DIR
                    else if( this.canMove() ){

                        if( this.oLunch ){
                            this.oAnimation = this.oLunch;                
                        }
                        else {
                            switch( sDirection ){
                                case 'DB':
                                    this.setMovement('block');
                                    break;
                                case 'BW':
                                    this.setMovement('backward');
                                    break;
                                case 'FW':
                                    this.setMovement('forward');
                                    break;
                                default:
                                    this.setMovement('stand');
                                    break;
                            }
                        }
                    }
                }
            }

            this.oAnimation.update();

            // Deplacement via animation
            if( this.oAnimation.oFrame.oMove && !this.oAnimation.oFrame.bFreeze ){
                if( this.oAnimation.oFrame.oMove.nX ){
                    this.oLayer.oPosition.nX += this.oAnimation.oFrame.oMove.nX * (this.bReverse ? -1 : 1);
                }
                if( this.oAnimation.oFrame.oMove.nY ){
                    this.oLayer.oPosition.nY += this.oAnimation.oFrame.oMove.nY;
                }
            }
        },
        // Gestion de OUTPUT
        updateOutput: function(){
            // Reverse
            this.oLayer.hElement.classList[ this.bReverse ? 'add' : 'remove' ]('--reverse');
            // Animation Freeze en HURT
            if( this.oAnimation.isHurt() ){
                if( this.oAnimation.oFrame.bFreeze ){
                    this.oLayer.hElement.classList.add(this.oAnimation.nFreeze % 2 ? '--freeze_pair' : '--freeze_impair');
                    this.oLayer.hElement.classList.remove(this.oAnimation.nFreeze % 2 ? '--freeze_impair' : '--freeze_pair');
                } else {
                    this.oLayer.hElement.classList.remove('--freeze_pair', '--freeze_impair');
                }
            }

            // Type
            if( !this.oLayer.hElement.classList.contains('--' + this.oAnimation.sType) ){
                DOMTokenList.prototype.remove.apply( this.oLayer.hElement.classList, GameAnimation.aAllType.map( sType => '--' + sType ) );
                this.oLayer.hElement.classList.add('--' + this.oAnimation.sType);
            }
            this.oLayer.hElement.classList[ this.oAnimation.oFrame.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
            
            // Frame
            this.oAnimation.oFrame.nZIndex && this.oLayer.setStyle( { zIndex: this.oAnimation.oFrame.nZIndex } );
            this.oSprite.setSource( this.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
        },
        destroy: function(){
        },

        // Fonction technique
        getCharacterBox: function(sBox){
            let aBox = this.oAnimation.oFrame[sBox];
            if( aBox ){
                Array.isArray(aBox) || ( aBox = [aBox] );
                aBox = aBox.map( oBox => {
                    return Object.assign(
                        {},
                        oBox,
                        this.bReverse ? { nX: -(oBox.nWidth + oBox.nX - 4) } : {}
                    );
                } );
            } else {
                aBox = [];
            }
            return aBox;
        },
        addKi: function(nKi){
            this.nKi = Math.min(this.nKi + nKi, GAME.oSettings.nKi);
        },

        // Fonction INPUT
        canAction: function(){
            let oCanAction = {
                sCommand: null,
                bStack: false,
                bMove: false,
                bRecovery: false,
                bGuard: false,
                nCode: 0
            };

            // Gestion MOVEMENT
            if( this.oAnimation.sType == 'movement' ){
                oCanAction = {
                    sCommand: 'aOffense',
                    bStack: false,
                    bMove: true,
                    bRecovery: false,
                    bGuard: false,
                    nCode: 1
                };
            }
            // Gestion END ANIMATION
            else if( this.oAnimation.isEnd() ){
                if( this.oAnimation.sType != 'down' ){
                    oCanAction = {
                        sCommand: 'aOffense',
                        bStack: false,
                        bMove: true,
                        bRecovery: false,
                        bGuard: false,
                        nCode: 2
                    };
                } else {
                    oCanAction = {
                        sCommand: 'aRecovery',
                        bStack: false,
                        bMove: false,
                        bRecovery: true,
                        bGuard: false,
                        nCode: 3
                    };
                }
            }
            // Gestion HURT
            else if( this.oAnimation.sType == 'guard' || this.oAnimation.sType == 'hit' ){
                oCanAction = {
                    sCommand: 'aDefense',
                    bStack: false,
                    bMove: false,
                    bRecovery: false,
                    bGuard: this.oAnimation.sType == 'guard',
                    nCode: 4
                };
            }
            // Gestion ACTION en HIT
            else if( this.oGatling.isHit() ){
                const bCancel = this.oAnimation.oFrame.oStatus.bCancel && !this.oAnimation.oFrame.bFreeze;
                oCanAction = {
                    sCommand: 'aOffense',
                    bStack: bCancel ? false : true,
                    bMove: false,
                    bRecovery: false,
                    bGuard: false,
                    nCode: bCancel ? 5 : 6
                };
            }
            
            return oCanAction;
        },
        canMove: function(){
            oCanAction = this.canAction();
            return !this.oAnimation.oFrame.bFreeze && oCanAction.bMove;
        },

        // Fonction OUTPUT
        setAnimation: function(sAnimation, bUpdate){
            if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                this.oAnimation = new GameAnimation(
                    sAnimation,
                    this.oCharacter.oFrames,
                    this.oCharacter.oAnimations[sAnimation]
                );
                if( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' ){
                    this.nHitting = 0;
                }
            }
            bUpdate && this.oAnimation.update();
        },
        setMovement: function(sMovement, bUpdate){
            this.oGatling.reset();
            this.setAnimation(sMovement, bUpdate);
        },
        setHurt: function(sHurt, nFramesLength, bUpdate){
            this.setMovement(sHurt, bUpdate);
            if( this.oAnimation.sName == 'lunch' ){
                this.oLunch = this.oAnimation;
            } else {
                this.oAnimation.setLength(nFramesLength);
            }
        }
    }
);