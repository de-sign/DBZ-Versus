/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, nColor, oController){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;

    this.oCharacter = null;
    this.oColor = null;
    this.oPath = null;
    this.oInputBuffer = null;

    this.oAnimation = null;
    this.oMovement = null;
    this.oLunch = null;
    this.oGatling = null;

    this.nHitting = 0;
    
    this.bReverse = false;
    this.nLife = 0;
    this.nKi = 0;

    this.init(sChar, nColor, oController);
}

Object.assign(
    BattlePlayer.prototype, {
        init: function(nPlayer, sChar, nColor, oController) {
            this.nPlayer = nPlayer;
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + this.nPlayer);
            this.oSprite = GAME.oOutput.getElement('SPT__Battle_Character_Sprite_' + this.nPlayer);
            
            this.oLayer.resetPosition();
            this.oLayer.update();

            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oColor = this.oCharacter.aColor[nColor];
            this.oPath = this.oColor.oPath;
            this.oInputBuffer = new BattleInputBuffer(oController);
            this.oGatling = new BattleGatling(this.oInputBuffer, this.oCharacter.oCommands);
            
            this.nLife = GAME.oSettings.oLife.character;

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
                            this.setStance('recovery_backward');
                            break;
                        case 'DF':
                        case 'FW':
                            this.setStance('recovery_forward');
                            break;
                        default:
                            this.setStance('recovery');
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
                            this.oAnimation = this.oLunch.oAnimation;
                            this.oMovement = this.oLunch.oMovement;
                        }
                        else {
                            switch( sDirection ){
                                case 'DB':
                                    this.setStance('block');
                                    break;
                                case 'BW':
                                    this.setStance('backward');
                                    break;
                                case 'FW':
                                    this.setStance('forward');
                                    break;
                                default:
                                    this.setStance('stand');
                                    break;
                            }
                        }
                    }
                }
            }

            this.updateAnimation();

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
        setFreeze: function(nFreeze){
            this.oAnimation.setFreeze(nFreeze);
            this.oMovement.setFreeze(nFreeze);
        },
        unFreeze: function(){
            this.oAnimation.unFreeze();
            this.oMovement.unFreeze();
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
        setMovement: function(oMove){
            this.oMovement = oMove ?
                new BattleMovement(oMove.nDelay, oMove, oMove.nLength) :
                BattleMovement.empty();
        },
        move: function(){
            if( this.oMovement.oMove ){
                if( this.oMovement.oMove.nX ){
                    this.oLayer.oPosition.nX += this.oMovement.oMove.nX * (this.bReverse ? -1 : 1);
                }
                if( this.oMovement.oMove.nY ){
                    this.oLayer.oPosition.nY += this.oMovement.oMove.nY;
                }
            }
        },
        pushBack: function(oPushback, bDivide){
            if( this.oAnimation.sName != 'lunch' ){
                oPushback = Object.assign({}, oPushback || GAME.oSettings.oPushback);
                bDivide && (oPushback.nX /= 2);
                this.setMovement(oPushback);
                this.oMovement.update();
                this.move();
            }
        },
        setAnimation: function(sAnimation, bUpdate){
            if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                this.oAnimation = new GameAnimation(
                    sAnimation,
                    this.oCharacter.oFrames,
                    this.oCharacter.oAnimations[sAnimation].aFrames
                );
                if( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' ){
                    this.nHitting = 0;
                }
                this.setMovement( this.oCharacter.oAnimations[sAnimation].oMove );
                
                bUpdate && this.updateAnimation();
            }
        },
        setStance: function(sMovement, bUpdate){
            this.oGatling.reset();
            this.setAnimation(sMovement, bUpdate);
        },
        setHurt: function(sHurt, nFramesLength, bUpdate){
            this.setStance(sHurt, bUpdate);
            if( this.oAnimation.sName == 'lunch' ){
                this.oLunch = {
                    oAnimation: this.oAnimation,
                    oMovement: this.oMovement,
                };
            } else {
                this.oAnimation.setLength(nFramesLength);
            }
        },
        updateAnimation: function(){
            this.oAnimation.update();
            this.oMovement.update();
            this.move();
        }
    }
);