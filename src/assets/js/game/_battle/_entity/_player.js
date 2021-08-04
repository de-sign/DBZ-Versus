/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer){
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
                init: function(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer, nRound) {
                    BattleEntity.prototype.init.call(this, 'character', GameData.oCharacter[sChar][sColor], sAnimation, oPosition, bReverse);

                    this.nLife = GameSettings.oLife.player;
                    this.nPlayer = nPlayer;
                    this.oInputBuffer = new BattleInputBuffer(oSourceBuffer);
                    this.oGatling = new BattleGatling(this.oInputBuffer, this.oData.oCommands);
                    this.nRound = nRound;
                },
                update: function(oEngine){
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
                                    this.setStance('launch_4');
                                    break;
                                case 'DF':
                                case 'FW':
                                    this.setStance('launch_6');
                                    break;
                                default:
                                    this.setStance('launch_5');
                                    break;
                            }
                            OutputManager.getChannel('CHN__SFX').play('ADO__Recovery');
                        }
                        
                        else {

                            // Gestion MANIP
                            const oCommand = this.oGatling.update(this.nKi, oCanAction);
                            if( oCommand ){
                                oCommand.oGatling.nCost && (this.nKi -= oCommand.oGatling.nCost);
                                this.setAnimation(oCommand.sAnimation);
                            }
                            // Gestion DIR
                            else if( this.canMove() ){
                                switch( sDirection ){
                                    case 'DB':
                                        this.setStance('move_1');
                                        break;
                                    case 'BW':
                                        this.setStance('move_4');
                                        break;
                                    case 'FW':
                                        this.setStance('move_6');
                                        break;
                                    case 'UB':
                                        this.setStance('move_7');
                                        break;
                                    case 'UP':
                                        this.setStance('move_8');
                                        break;
                                    case 'UF':
                                        this.setStance('move_9');
                                        break;
                                    default:
                                        this.setStance('move_5');
                                        break;
                                }
                            }
                            // Gestion JUMPCANCEL
                            else if( this.oGatling.isJumpCancellable() && !oCanAction.bStack ){
                                switch( sDirection ){
                                    case 'UB':
                                        this.setStance('move_7');
                                        break;
                                    case 'UP':
                                        this.setStance('move_8');
                                        break;
                                    case 'UF':
                                        this.setStance('move_9');
                                        break;
                                }
                            }
                        }
                    }

                    this.updateMemory();
                    this.updateAnimation();
                    if( !this.oAnimation.isFreeze() ){
                        this.generateEntity('command', this, this.oGatling.getEntity(), oEngine);
                    }
                },
                // destroy: function(){},

                // Fonction ENGINE
                getCommandData: function(){
                    return this.oGatling.oCurrent;
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GameSettings.oKi.nMax);
                },
                takeHit: function(oEntity, oCommandData, oEngine){

                    let bLaunch = false;
                    const bGuard = !oCommandData.oProperty.bUnblockable && this.oStatus.bGuard,
                        sData = bGuard ? 'oGuard' : 'oHit',
                        oData = oCommandData[sData],
                        oDamage = Object.assign( {}, oData.oDamage ),
                        oStun = Object.assign( {}, oData.oStun );

                    if( !bGuard ){
                        bLaunch = oCommandData.oProperty.bLaunch && !this.oStatus.bLaunch;
                        if( oDamage.nDamage ){
                            const nRatio = Math.max(oDamage.nMinimumReduce, 100 - (this.nHitting * GameSettings.oCommand.oDamage.nReduce));
                            oDamage.nDamage = Math.floor(oDamage.nDamage * nRatio / 100);
                        }
                        this.nHitting ++;
                    }

                    this.nLife -= oDamage.nDamage;
                    if( bLaunch || this.nLife <= 0 ){
                        oStun.sAnimation = 'launch_0';
                    }
                    if( oStun.sAnimation ){
                        this.setHurt(oStun.sAnimation, oStun.nStun, !oEntity.bReverse);
                    }
                    this.addKi( oData.oKi.nGive );
                    oEntity.confirmHit(this, oCommandData, bGuard);
                    this.generateEntity(bGuard ? 'guard' : 'hit', this, oStun, oEngine);

                    return bGuard;
                },
                confirmHit: function(oEntityHurt, oCommandData, bGuard){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oCommandData, bGuard);
                    this.oGatling.confirmHit(bGuard);

                    if( !oCommandData.oGatling.nCost ){
                        this.addKi( oCommandData[bGuard ? 'oGuard' : 'oHit'].oKi.nGain );
                    }
                },
                setMemory: function(sAnimation){
                    // FALL en fin d'animation avec un move
                    if( sAnimation ){
                        const oAnimation = this.oData.oAnimations[sAnimation];
                        this.oMemory = {
                            sType: 'jump',
                            oAnimation: new GameAnimation(
                                sAnimation,
                                oAnimation.sType,
                                this.oData.oFrames,
                                oAnimation.aFrames
                            ),
                            oMovement: new BattleMovement(
                                oAnimation.oMove.nDelay,
                                oAnimation.oMove,
                                oAnimation.oMove.nLength,
                                this.bReverse
                            )
                        };
                    }
                    // Annulation du JUMP en cas de HIT en l'air
                    else if( this.oAnimation.is('hurt') && this.oMemory.sType && this.oMemory.sType != 'fall' ){
                        this.oMemory = {
                            sType: null,
                            oAnimation: null,
                            oMove: null
                        };
                    }
                    else {
                        // Gestion en fonction de l'animation
                        switch( this.oAnimation.sName ){
                            case 'move_7':
                            case 'move_8':
                            case 'move_9':
                            case 'move_fall_4':
                            case 'move_fall_5':
                            case 'move_fall_6':
                                this.oMemory = {
                                    sType: 'jump',
                                    oAnimation: this.oAnimation,
                                    oMovement: this.oMovement
                                };
                                break;
                            case 'launch_1':
                                this.oMemory = {
                                    sType: 'fall',
                                    oAnimation: this.oAnimation,
                                    oMovement: this.oMovement
                                };
                                break;
                            case 'launch_0':
                            case 'launch_2':
                            case 'move_0':
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
                        nCode: 0
                    };
                    const bFreeze = this.oAnimation.isFreeze(),
                        sCommand = this.oStatus.bAerial ? 'aAerial' : 'aGround';

                    // Gestion MOVEMENT
                    if( !bFreeze && this.oAnimation.is('movement') ){
                        const bCancel = this.oAnimation.sType != 'jump' || this.oStatus.bCancel;
                        oCanAction = {
                            sCommand: sCommand,
                            bStack: !bCancel,
                            bMove: !this.oStatus.bAerial,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
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
                                nCode: 3
                            };
                        }
                        // STAND => ALL action
                        else if( !(this.oStatus.bAerial && this.oAnimation.is('hurt')) ){
                            oCanAction = {
                                sCommand: sCommand,
                                bStack: false,
                                bMove: !this.oStatus.bAerial,
                                bRecovery: false,
                                bGuard: false, 
                                bThrow: false, 
                                nCode: 4
                            };
                        }
                    }
                    // Gestion HURT
                    else if( this.oAnimation.is('hurt') ){
                        oCanAction = {
                            sCommand: 'aDefense',
                            bStack: bFreeze,
                            bMove: false,
                            bRecovery: false,
                            bGuard: this.oStatus.bGuard,
                            bThrow: this.oStatus.bThrow,
                            nCode: 5
                        };
                    }
                    // Gestion STACK pour ACTION en HIT ou DASH, LANDING et RECOVERY
                    else if( this.aHit.length || this.oAnimation.is('stack') ){
                        const bCancel = this.oStatus.bCancel && !bFreeze;
                        oCanAction = {
                            sCommand: sCommand,
                            bStack: !bCancel,
                            bMove: false,
                            bRecovery: false,
                            bGuard: false,
                            bThrow: false,
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
                setPushback: function(oPushback, bReverse, bDivide){
                    if( this.oAnimation.sName != 'launch_0' ){
                        BattleEntity.prototype.setPushback.call(this, oPushback, bReverse, bDivide);
                    }
                },
                setAnimation: function(sAnimation, bUpdate, bReverse){
                    const bChanged = BattleEntity.prototype.setAnimation.call(this, sAnimation, bUpdate, bReverse);
                    if( bChanged ){
                        if( !this.oAnimation.is('hurt') || this.oAnimation.sType == 'guard' ){
                            this.nHitting = 0;
                        }
                        if( this.oStatus.bAerial && !this.oAnimation.is('hurt') && !this.oMovement.bEmpty ){
                            this.oMemory = {
                                sType: 'aerial_move',
                                oAnimation: this.oAnimation,
                                oMovement: this.oMovement
                            };
                        }
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
                    if( this.oAnimation.sName != 'launch_0' ){
                        this.oAnimation.setLength(nFramesLength);
                    }
                },

                updateMemory: function(){
                    if( this.oStatus.bAerial ){
                        // Gestion FALL
                        if( this.oAnimation.isEnd() && this.oAnimation.is('hurt') ){
                            switch( this.oMemory.sType ){
                                case 'fall':
                                    this.oAnimation = this.oMemory.oAnimation;
                                    this.oMovement = this.oMemory.oMovement;
                                    break;
                                default:
                                    this.setStance('launch_1');
                                    break;
                            }
                        }
                        // Gestion JUMP
                        else if( !this.oAnimation.isFreeze() ){
                            switch( this.oMemory.sType ){
                                case 'jump':
                                    if( this.oAnimation.isEnd() ){
                                        this.oAnimation = this.oMemory.oAnimation;
                                        this.oMovement = this.oMemory.oMovement;
                                    }
                                    else if( this.oAnimation.sType != 'jump' ){
                                        this.oMovement = this.oMemory.oMovement;
                                        this.oMemory.oAnimation.update();
                                    }
                                    break;
                                case 'aerial_move':
                                    const bSameAnim = this.oAnimation.sName == this.oMemory.oAnimation.sName;
                                    if( !bSameAnim || this.oAnimation.isEnd() ){
                                        const aFall = ['move_fall_4', 'move_fall_5', 'move_fall_6'],
                                            nMove = Math.min( 1, Math.max( -1, this.oMemory.oMovement.aStep[ this.oMemory.oMovement.aStep.length - 1 ].nX ) ),
                                            nFall = nMove * (this.oMemory.oMovement.bReverse ? -1 : 1) * (this.bReverse ? -1 : 1),
                                            sAnimation = aFall[nFall + 1];

                                        if( bSameAnim ){
                                            this.setAnimation(sAnimation);
                                            this.setMemory();
                                        } else {
                                            this.setMemory(sAnimation);
                                            this.oMovement = this.oMemory.oMovement;
                                            this.oMemory.oAnimation.update();
                                        }
                                    }
                                    break;
                            }
                            
                        }
                    }
                }
            }
        )
    }
);