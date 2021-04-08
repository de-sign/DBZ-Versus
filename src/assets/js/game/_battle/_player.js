/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, nColor, oController){
    this.nPlayer = null;

    this.oInputBuffer = null;
    this.oLunch = null;
    this.oGatling = null;

    this.nHitting = 0;
    this.nKi = 0;

    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattlePlayer, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattlePlayer,
                init: function(nPlayer, sChar, nColor, oController) {
                    BattleEntity.prototype.init.call(this, 'character', GAME.oData.oCharacter[sChar], nColor);

                    this.nPlayer = nPlayer;
                    this.oInputBuffer = new BattleInputBuffer(oController);
                    this.oGatling = new BattleGatling(this.oInputBuffer, this.oData.oCommands);

                    // init en STAND
                    this.setAnimation('stand', true);
                },
                update: function(){
                    // Gestion des INPUTs
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
                // destroy: function(){},

                // Fonction ENGINE
                getHitData: function(){
                    return this.oGatling.oCurrent;
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GAME.oSettings.nKi);
                },
                takeHit: function(oEntity){
                    if( this.oAnimation.oFrame.oStatus.bGuard ){
                        this.setHurt('guard', oHurt.oCommand.oStun.nBlock, true);
                    } else {
                        const oData = oEntity.getHitData(),
                            nDamage = oData.nDamage == null ? 1 : oData.nDamage;

                        if( nDamage ){
                            this.nLife -= nDamage;
                            this.nHitting += nDamage;
                            this.addKi( 2 * nDamage );

                            const bLunch = oData.oStun.bLunch && !this.oLunch,
                                bDeath = this.nLife <= 0;
                                
                            this.setHurt(
                                bLunch || bDeath ? 'lunch' : oData.oStun.sHitAnimation,
                                oData.oStun.nHit,
                                true
                            );
                        }
                        oEntity.confirmHit();
                    }
                },
                confirmHit: function(){
                    const oData = this.oGatling.oCurrent,
                        nDamage = oData.nDamage == null ? 1 : oData.nDamage;
                    this.bHit = true;
                    this.oGatling.oCurrent.nCost || this.addKi(nDamage);
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
                    else if( this.bHit ){
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
                pushBack: function(oPushback, bDivide){
                    if( this.oAnimation.sName != 'lunch' ){
                        BattleEntity.prototype.pushback.call(this, oPushback, bDivide);
                    }
                },
                setAnimation: function(sAnimation, bUpdate){
                    if(
                        BattleEntity.prototype.setAnimation.call(this, sAnimation, bUpdate)
                        && ( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' )
                    ){
                        this.nHitting = 0;
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
                    const oCommandEntity = this.oGatling.getEntity();
                    if( oCommandEntity ){
                        const oEntity = new window['Battle' + oCommandEntity.sType](
                            oCommandEntity.oColor ? oCommandEntity.oColor[this.oColor.sCod] : oCommandEntity.nColor,
                            {
                                nX: this.oLayer.oPosition.nX + oCommandEntity.oPosition.nX * (this.bReverse ? -1 : 1),
                                nY: this.oLayer.oPosition.nY + oCommandEntity.oPosition.nY
                            },
                            this.bReverse,
                            this.oGatling.oCurrent,
                            this
                        );
                        // Pour ne pas perdre une FRAME dans la LOOP
                        oEntity.update();
                    }
                    BattleEntity.prototype.updateAnimation.call(this);
                }
            }
        )
    }
);