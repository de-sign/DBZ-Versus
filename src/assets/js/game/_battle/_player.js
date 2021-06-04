/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oController){
    this.nPlayer = null;

    this.oInputBuffer = null;
    this.oMemory = {
        sType: null,
        oAnimation: null,
        oMove: null
    };
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
                        if( oCanAction.sCommand == 'aRecovery' ){
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
                            // Gestion JUMPCANCEL
                            else if( this.oGatling.isJumpCancellable() && !oCanAction.bStack ){
                                switch( sDirection ){
                                    case 'UB':
                                        this.setStance('jump_backward');
                                        break;
                                    case 'UP':
                                        this.setStance('jump_neutral');
                                        break;
                                    case 'UF':
                                        this.setStance('jump_forward');
                                        break;
                                }
                            }
                            // Gestion DIR
                            else if( this.canMove() ){
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
                                    case 'UB':
                                        this.setStance('jump_backward');
                                        break;
                                    case 'UP':
                                        this.setStance('jump_neutral');
                                        break;
                                    case 'UF':
                                        this.setStance('jump_forward');
                                        break;
                                    default:
                                        this.setStance('stand');
                                        break;
                                }
                            }
                        }
                    }

                    this.updateMemory();
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
                    if( !oData.bUnblockable && this.oStatus.bGuard ){
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

                        const bLunch = oData.oStun.bLunch && !this.oStatus.bLunch,
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
                setMemory: function(){
                    // Annulation du JUMP en cas de HIT en l'air
                    if( this.oAnimation.isHurt() && this.oMemory.sType == 'jump' ){
                        this.oMemory = {
                            sType: null,
                            oAnimation: null,
                            oMove: null
                        };
                    }
                    else {
                        // Gestion en fonction de l'animation
                        switch( this.oAnimation.sName ){
                            case 'jump_backward':
                            case 'jump_neutral':
                            case 'jump_forward':
                                this.oMemory = {
                                    sType: 'jump',
                                    oAnimation: this.oAnimation,
                                    oMovement: this.oMovement
                                };
                                break;
                            case 'fall':
                                this.oMemory = {
                                    sType: 'fall',
                                    oAnimation: this.oAnimation,
                                    oMovement: this.oMovement
                                };
                                break;
                            case 'down':
                            case 'landing':
                                this.oMemory = {
                                    sType: null,
                                    oAnimation: null,
                                    oMove: null
                                };
                                break;
                        }
                    }
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
                        bAerial: this.oStatus.bAerial,
                        bGround: !this.oStatus.bAerial,
                        nCode: 0
                    };
                    const bFreeze = this.oAnimation.isFreeze();

                    // Gestion MOVEMENT
                    if( !bFreeze && this.oAnimation.isMovement() ){
                        const bCancel = this.oAnimation.sType != 'jump' || this.oStatus.bCancel;
                        oCanAction = {
                            sCommand: 'aOffense',
                            bStack: !bCancel,
                            bMove: !this.oStatus.bAerial,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
                            bAerial: this.oStatus.bAerial,
                            bGround: !this.oStatus.bAerial,
                            nCode: bCancel ? 1 : 2
                        };
                    }
                    // Gestion END ANIMATION
                    else if( this.oAnimation.isEnd() ){
                        // DOWN => RECOVERY
                        if( this.oAnimation.sType == 'down' ){
                            oCanAction = {
                                sCommand: 'aRecovery',
                                bStack: false,
                                bMove: false,
                                bRecovery: true,
                                bGuard: false,
                                bThrow: false,
                                bAerial: false,
                                bGround: true,
                                nCode: 3
                            };
                        }
                        // STAND => ALL action
                        else if( !(this.oStatus.bAerial && this.oAnimation.isHurt()) ){
                            oCanAction = {
                                sCommand: 'aOffense',
                                bStack: false,
                                bMove: !this.oStatus.bAerial,
                                bRecovery: false,
                                bGuard: false, 
                                bThrow: false, 
                                bAerial: this.oStatus.bAerial,
                                bGround: !this.oStatus.bAerial,
                                nCode: 4
                            };
                        }
                    }
                    // Gestion HURT
                    else if( this.oAnimation.isHurt() ){
                        oCanAction = {
                            sCommand: 'aDefense',
                            bStack: bFreeze,
                            bMove: false,
                            bRecovery: false,
                            bGuard: this.oStatus.bGuard,
                            bThrow: this.oStatus.bThrow,
                            bAerial: this.oStatus.bAerial,
                            bGround: !this.oStatus.bAerial,
                            nCode: 5
                        };
                    }
                    // Gestion STACK pour ACTION en HIT ou DASH
                    else if( this.aHit.length || this.oAnimation.sType == 'dash' ){
                        const bCancel = this.oStatus.bCancel && !bFreeze;
                        oCanAction = {
                            sCommand: 'aOffense',
                            bStack: !bCancel,
                            bMove: false,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
                            bAerial: this.oStatus.bAerial,
                            bGround: !this.oStatus.bAerial,
                            nCode: bCancel ? 6 : 7
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
                    const bChanged = BattleEntity.prototype.setAnimation.call(this, sAnimation, bUpdate, bReverse);
                    if( bChanged && ( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' ) ){
                        this.nHitting = 0;
                    }
                    return bChanged;
                },
                setStance: function(sMovement, bUpdate, bReverse){
                    if( this.setAnimation(sMovement, bUpdate, bReverse) ){
                        this.oGatling.reset();
                        this.setMemory();
                    }
                },
                setHurt: function(sHurt, nFramesLength, bReverse){
                    this.setStance(sHurt, true, bReverse);
                    if( this.oAnimation.sName != 'lunch' ){
                        this.oAnimation.setLength(nFramesLength);
                    }
                },

                updateMemory: function(){
                    // Gestion FALL
                    if( this.oStatus.bAerial && this.oAnimation.isHurt() && this.oAnimation.isEnd() ){
                        if( this.oMemory.sType == 'fall' ){
                            this.oAnimation = this.oMemory.oAnimation;
                            this.oMovement = this.oMemory.oMovement;
                        } else {
                            this.setStance('fall');
                        }
                    }
                    // Gestion JUMP
                    else if( !this.oAnimation.isFreeze() && this.oMemory.sType == 'jump' ){
                        if( this.oAnimation.isEnd() ){
                            this.oAnimation = this.oMemory.oAnimation;
                            this.oMovement = this.oMemory.oMovement;
                            this.oGatling.reset();
                        }
                        else if( this.oAnimation.sType != 'jump' ){
                            this.oMovement = this.oMemory.oMovement;
                            this.oMemory.oAnimation.update();
                        }
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