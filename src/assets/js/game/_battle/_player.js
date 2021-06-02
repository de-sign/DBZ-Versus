/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oController){
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
                init: function(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oController) {
                    BattleEntity.prototype.init.call(this, 'character', GameData.oCharacter[sChar][sColor], sAnimation, oPosition, bReverse);

                    this.nLife = GameSettings.oLife.player;
                    this.nPlayer = nPlayer;
                    this.oInputBuffer = new BattleInputBuffer(oController);
                    this.oGatling = new BattleGatling(this.oInputBuffer, this.oData.oCommands);
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
                            OutputManager.getChannel('CHN__SFX').play('ADO__Recovery');
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

                    return this.updateAnimation();
                },
                // destroy: function(){},

                // Fonction ENGINE
                getHitData: function(){
                    return this.oGatling.oCurrent;
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GameSettings.nKi);
                },
                takeHit: function(oEntity, oData){
                    const aNewEntity = [];
                    if( !oData.bUnblockable && this.oAnimation.oFrame.oStatus.bGuard ){
                        this.setHurt('guard', oData.oStun.nBlock, !oEntity.bReverse);
                        oEntity.confirmHit(this, oData, true);
                        if( oData.oStun.sImpactAnimation !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: oData.oStun.sImpactAnimation || 'impact_guard',
                                oPosition: GameSettings.oPositionEffect,
                                bReverse: !this.bReverse,
                                oParent: this
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Guard'
                        } );
                    }
                    else {
                        const nDamage = oData.nDamage == null ? 1 : oData.nDamage;

                        if( nDamage ){
                            this.nLife -= nDamage;
                            this.nHitting += nDamage;
                            this.addKi( 2 * nDamage );
                        }

                        const bLunch = oData.oStun.bLunch && !this.oLunch,
                            bDeath = this.nLife <= 0,
                            sHitAnim = bLunch || bDeath ? 'lunch' : oData.oStun.sHitAnimation;
                            
                        sHitAnim && this.setHurt(sHitAnim, oData.oStun.nHit, !oEntity.bReverse);
                        oEntity.confirmHit(this, oData);
                        if( oData.oStun.sImpactAnimation !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: oData.oStun.sImpactAnimation || 'impact_hit',
                                oPosition: GameSettings.oPositionEffect,
                                bReverse: !this.bReverse,
                                oParent: this
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Hit'
                        } );
                    }
                    return aNewEntity;
                },
                confirmHit: function(oEntityHurt, oData, bGuard){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oData, bGuard);
                    this.oGatling.confirmHit(bGuard);
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
                        bThrow: false,
                        nCode: 0
                    };
                    const bFreeze = this.oAnimation.isFreeze();

                    // Gestion MOVEMENT
                    if( this.oAnimation.sType == 'movement' && !bFreeze ){
                        oCanAction = {
                            sCommand: 'aOffense',
                            bStack: false,
                            bMove: true,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
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
                                bThrow: false,
                                nCode: 2
                            };
                        } else {
                            oCanAction = {
                                sCommand: 'aRecovery',
                                bStack: false,
                                bMove: false,
                                bRecovery: true,
                                bGuard: false,
                                bThrow: false,
                                nCode: 3
                            };
                        }
                    }
                    // Gestion HURT
                    else if( this.oAnimation.sType == 'guard' || this.oAnimation.sType == 'hit' ){
                        oCanAction = {
                            sCommand: 'aDefense',
                            bStack: bFreeze,
                            bMove: false,
                            bRecovery: false,
                            bGuard: this.oAnimation.oFrame.oStatus.bGuard,
                            bThrow: this.oAnimation.oFrame.oStatus.bThrow,
                            nCode: 4
                        };
                    }
                    // Gestion ACTION en HIT 
                    else if( this.aHit.length || this.oAnimation.sType == 'dash' ){
                        const bCancel = this.oAnimation.oFrame.oStatus.bCancel && !bFreeze;
                        oCanAction = {
                            sCommand: 'aOffense',
                            bStack: bCancel ? false : true,
                            bMove: false,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
                            nCode: bCancel ? 5 : 6
                        };
                    }
                    
                    return oCanAction;
                },
                canMove: function(){
                    oCanAction = this.canAction();
                    return !this.oAnimation.isFreeze() && oCanAction.bMove;
                },

                // Fonction OUTPUT
                pushBack: function(oPushback, bReverse, bDivide){
                    if( this.oAnimation.sName != 'lunch' ){
                        BattleEntity.prototype.pushBack.call(this, oPushback, bReverse, bDivide);
                    }
                },
                setAnimation: function(sAnimation, bUpdate, bReverse){
                    if(
                        BattleEntity.prototype.setAnimation.call(this, sAnimation, bUpdate, bReverse)
                        && ( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' )
                    ){
                        this.nHitting = 0;
                    }
                },
                setStance: function(sMovement, bUpdate, bReverse){
                    this.oGatling.reset();
                    this.setAnimation(sMovement, bUpdate, bReverse);
                },
                setHurt: function(sHurt, nFramesLength, bReverse){
                    this.setStance(sHurt, true, bReverse);
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
                    let aNewEntity = null;
                    if( !this.oAnimation.isFreeze() ){
                        const aCommandEntity = this.oGatling.getEntity();
                        if( aCommandEntity.length ){
                            aNewEntity = [];
                            aCommandEntity.forEach( oCommandEntity => {
                                aNewEntity.push( {
                                    sType: oCommandEntity.sType,
                                    bLink: oCommandEntity.bLink,

                                    sEntity: oCommandEntity.sEntity || 'ALL',
                                    sColor: oCommandEntity.sColor || this.oData.sEntityColor,
                                    sAnimation: oCommandEntity.sAnimation,
                                    oPosition: oCommandEntity.oPosition,
                                    bReverse: this.bReverse,
                                    oHitData: this.oGatling.oCurrent,
                                    oParent: this
                                } );

                                oCommandEntity.sSFX && aNewEntity.push( {
                                    sType: 'sound',
                                    sEntity: oCommandEntity.sSFX
                                } );
                            } );
                        }
                    }
                    BattleEntity.prototype.updateAnimation.call(this);

                    return aNewEntity;
                }
            }
        )
    }
);