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
function BattleGatling(oInputBuffer, aCommandData){
    this.oInputBuffer = null;
    this.aCommandData = null;

    this.oCurrent = null;
    this.bFreeze = false;
    this.oNext = null;
    this.oUsed = {};

    this.init(oInputBuffer, aCommandData);
}

Object.assign(
    BattleGatling.prototype, {
        init: function(oInputBuffer, aCommandData){
            this.oInputBuffer = oInputBuffer;
            this.aCommandData = aCommandData;
        },
        update: function(nKi, bUse){
            let bFind = false;
            const aCommand = this.getEnterCommands();

            for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                const oCommand = aCommand[nIndex];
                if( this.canUseCommand(nKi, oCommand) ){
                    bUse ?
                        this.use(oCommand) :
                        this.oNext = oCommand;
                    bFind = true;
                    break;
                }
            }

            // Gestion Gatling Buffer
            if( !bFind && this.oNext && bUse ){
                this.use(this.oNext);
                bFind = true;
            }

            return bFind ? this.oCurrent : null;

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
            this.oUsed[oCommand.sName] = true;
        },
        getEnterCommands: function(){
            const aCommand = [],
                nFrameCheck = GAME.oTimer.nFrames;

            if( this.oInputBuffer.nFrameLastUpdate == nFrameCheck ){
                for( let nIndex = 0; nIndex < this.aCommandData.length; nIndex++ ){
                    const oCommand = this.aCommandData[nIndex];
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
                if( this.oUsed[oCommand.sName] ){
                    // Gestion REDA CANCEL
                    if( this.oCurrent && this.oCurrent.sName == oCommand.sName && oCommand.aSelfCancel ){
                        for( let nIndex = 0; nIndex < oCommand.aSelfCancel.length; nIndex++ ){
                            if( !this.oUsed[ oCommand.aSelfCancel[nIndex] ] ){
                                oCommand.sName = oCommand.sAnimation = oCommand.aSelfCancel[nIndex];
                                bCanUse = true;
                            }
                        }
                    }
                } else {
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
function BattlePlayer(nPlayer, sChar, oKeyboard){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;

    this.oCharacter = null;
    this.oInputBuffer = null;

    this.oAnimation = null;
    this.oLunch = null;
    this.oGatling = null;

    this.nHitting = 0;
    
    this.bReverse = false;
    this.nLife = GAME.oSettings.nLife;
    this.nKi = 0;

    this.init(sChar, oKeyboard);
}

Object.assign(
    BattlePlayer.prototype, {
        init: function(sChar, oKeyboard) {
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + this.nPlayer);
            this.oSprite = GAME.oOutput.getElement('SPT__Battle_Character_Sprite_' + this.nPlayer);
            
            this.oLayer.resetPosition();
            this.oLayer.update();

            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oInputBuffer = new BattleInputBuffer(oKeyboard);
            this.oGatling = new BattleGatling(this.oInputBuffer, this.oCharacter.aCommands);

            // init en STAND
            this.createLunchAnimation();
            this.createRecoveryAnimation();
            this.setAnimation('stand', true);
        },
        // Gestion des INPUTs
        updateInput: function(){
            this.oInputBuffer.update(this.bReverse);

            // Si pas stun par Animation
            const nCanAction = this.canAction(); // 0: NONE, 1: MOVEMENT, 2: END ANIM, 3: RECOVERY, 4: CANCEL, 5: GATLING
            if( nCanAction ){
                const sDirection = this.oInputBuffer.getDirection();

                // Gestion RECOVERY
                if( nCanAction == 3 ){
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
                } else {
                    // Gestion MANIP
                    const oCommand = this.oGatling.update(this.nKi, nCanAction != 5);
                    if( oCommand ){
                        oCommand.nCost && (this.nKi -= oCommand.nCost);
                        this.setAnimation(oCommand.sAnimation);
                    }
                    // Gestion DIR
                    else if( this.canMove(nCanAction) ){
                        if( this.oLunch ){
                            this.oAnimation = this.oLunch;                
                        } else {
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
            this.oSprite.setSource( GAME.oSettings.oPath.oCharacter.sFrames + '/' + this.oCharacter.sCod + '/' + this.oAnimation.oFrame.sPath );
        },
        destroy: function(){
        },

        // Fonction technique
        getCharacterBox: function(sBox){
            return this.oAnimation.oFrame[sBox] ?
                Object.assign(
                    {},
                    this.oAnimation.oFrame[sBox],
                    this.bReverse ? { nX: -(this.oAnimation.oFrame[sBox].nWidth + this.oAnimation.oFrame[sBox].nX - 4) } : {}
                ) :
                null;
        },
        createLunchAnimation: function(){
            let nLastY = 0,
                oLastFrame = null;
            const aAnim = [],
                nDemiLength = (GAME.oSettings.oLuncher.nLength - 1) / 2,
                nX = GAME.oSettings.oLuncher.oMove.nX / GAME.oSettings.oLuncher.nLength;

            // Ajout de 10 FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GAME.oSettings.oLuncher.nLength + 10; nIndex++ ){
                let nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GAME.oSettings.oLuncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    sFrame = nIndex <= GAME.oSettings.oLuncher.nLength / 2 ? 'hit_luncher' : 'hit_fall';

                if( oLastFrame && oLastFrame.oMove.nY == nY && oLastFrame.sFrame == sFrame ){
                    oLastFrame.nFrame++;
                } else {
                    aAnim.push( oLastFrame = {
                        nFrame: 1,
                        sFrame,
                        oMove: { nX, nY }
                    } );
                    if( GAME.oSettings.oLuncher.nInvulnerable >= nIndex){
                        oLastFrame.oHurtBox = null;
                    }
                }
                nLastY = nTargetY;
            }
            this.oCharacter.oAnimations.lunch = aAnim;
        },
        createRecoveryAnimation: function(){
            const aRecovery = this.oCharacter.oAnimations.recovery;
            ['forward', 'backward'].forEach( sType => {
                const aAnim = [];
                aRecovery.forEach( oFrame => {
                    aAnim.push( Object.assign({}, oFrame) );
                } );
                aAnim[0].oMove = {
                    nX: GAME.oSettings.nRecovery * ( sType == 'forward' ? 1 : -1 )
                };
                this.oCharacter.oAnimations['recovery_' + sType] = aAnim;
            } );
        },

        // Fonction INPUT
        canAction: function(){
            let nCanAction = 0;
            // Gestion MOVEMENT
            if( this.oAnimation.sType == 'movement' ){
                nCanAction = 1;
            }
            // Gestion END ANIMATION
            else if( this.oAnimation.isEnd() ){
                nCanAction = this.oAnimation.sType == 'down' ? 3 : 2;
            }
            // Gestion ACTION en HIT
            else if( this.oGatling.isHit() ){
                nCanAction = this.oAnimation.oFrame.oStatus.bCancel && !this.oAnimation.oFrame.bFreeze ? 4 : 5;
            }
            return nCanAction;
        },
        canMove: function(nCanAction){
            nCanAction || ( nCanAction = this.canAction() );
            return !this.oAnimation.oFrame.bFreeze && nCanAction && nCanAction < 3;
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