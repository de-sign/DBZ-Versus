/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, sColor, oPosition, bReverse, oController){
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
                init: function(nPlayer, sChar, sColor, oPosition, bReverse, oController) {
                    BattleEntity.prototype.init.call(this, 'character', GAME.oData.oCharacter[sChar][sColor], oPosition, bReverse);

                    this.nLife = GAME.oSettings.oLife.player;
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
                            GAME.oOutput.getChannel('CHN__SFX').play('ADO__Recovery');
                        }
                        
                        else {

                            // Gestion MANIP
                            const oCommand = this.oGatling.update(this.nKi, oCanAction);
                            if( oCommand ){
                                oCommand.nCost && (this.nKi -= oCommand.nCost);
                                this.killLink();
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
                takeHit: function(oEntity, oData){
                    let sSFX = '';
                    if( this.oAnimation.oFrame.oStatus.bGuard ){
                        this.setHurt('guard', oData.oStun.nBlock, true);
                        oEntity.confirmHit(this, oData, true);
                        sSFX = 'ADO__Guard';
                    } else {
                        const nDamage = oData.nDamage == null ? 1 : oData.nDamage;

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
                        oEntity.confirmHit(this, oData);
                        sSFX = 'ADO__Hit';
                    }
                    return sSFX;
                },
                confirmHit: function(oEntityHurt, oData, bGuard){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oData, bGuard);
                    const nDamage = oData.nDamage == null ? 1 : oData.nDamage;
                    bGuard || oData.nCost || this.addKi(nDamage);
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
                    if( this.oAnimation.sType == 'movement' && !this.oAnimation.oFrame.bFreeze ){
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
                    else if( (this.oAnimation.sType == 'guard' || this.oAnimation.sType == 'hit') && !this.oAnimation.oFrame.bFreeze ){
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
                    else if( this.aHit.length ){
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
                        BattleEntity.prototype.pushBack.call(this, oPushback, bDivide);
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
                    const aCommandEntity = this.oGatling.getEntity();
                    aCommandEntity.length && aCommandEntity.forEach( oCommandEntity => {
                        const oEntity = new window['Battle' + oCommandEntity.sType](
                            oCommandEntity.sEntity || 'ALL',
                            oCommandEntity.sColor || this.oData.sEntityColor,
                            oCommandEntity.sAnimation,
                            oCommandEntity.oPosition,
                            this.bReverse,
                            this.oGatling.oCurrent,
                            this
                        );
                        oCommandEntity.bLink && this.add(oEntity);
                        // Pour ne pas perdre une FRAME dans la LOOP
                        oEntity.update();
                        oCommandEntity.sSFX && GAME.oOutput.getChannel('CHN__SFX').play(oCommandEntity.sSFX);
                    } );
                    BattleEntity.prototype.updateAnimation.call(this);
                }
            }
        )
    }
);