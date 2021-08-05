/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer){
    /* ----- START PROPERTIES ----- */
    this.nPlayer = null;
    
    this.oStatus = {
        bReverse: false, // Possibilité de se retourner : stand, tp, etc
        bGuard: false, // Possibilité de guarder : backdash, block
        bThrow: false, // Possibilité de TechThrow : hit_throw
        bInvul: false, // Impossibilité de prendre un coup : launch
        bAerialInvul: false, // Impossibilité de prendre un coup aérien : launcher
        bCancel: false, // Coup cancellable : ligth, etc
        bAerial: false, // Personnage en l'air : jump, launch, fall, etc
        bLaunch: false // Personnage en l'air via un coup : launch
    };

    this.oInputBuffer = null;
    this.oMemory = {
        sType: null,
        oAnimation: null,
        oMove: null
    };
    this.oGatling = null;

    this.nHitting = 0;
    this.nKi = 0;
    /* ----- END PROPERTIES ----- */

    BattleCharacter.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattlePlayer, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleCharacter.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattlePlayer,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer, nRound) {
                    BattleCharacter.prototype.init.call(
                        this,
                        sChar,
                        sColor,
                        sAnimation,
                        oPosition,
                        bReverse
                    );

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
                        this.generateEntity('command', this.oGatling.getEntity(), oEngine);
                    }
                },
                // destroy: function(){},

                // Fonction ENGINE
                updateStatus: function(oForce){
                    this.oStatus = Object.assign(
                        {
                            bReverse: false, // Possibilité de se retourner : stand, tp, etc
                            bGuard: false, // Possibilité de guarder : backdash, block
                            bThrow: false, // Possibilité de TechThrow : hit_throw
                            bInvul: false, // Impossibilité de prendre un coup : launch
                            bAerialInvul: false, // Impossibilité de prendre un coup aérien : launcher
                            bCancel: false, // Coup cancellable : ligth, etc
                            bAerial: this.oStatus.bAerial, // Personnage en l'air : jump, launch, fall, etc
                            bLaunch: this.oStatus.bLaunch // Personnage en l'air via un coup : launch
                        },
                        this.oAnimation.oFrame.oStatus,
                        oForce || {}
                    );
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
                },

                getCommandData: function(){
                    return this.oGatling.oCurrent;
                },
                canAction: function(){
                    let oCanAction = {
                        sCommand: null,
                        bStack: false,
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
                            bGuard: false,
                            bThrow: false
                        };
                    }
                    // Gestion END ANIMATION
                    else if( this.oAnimation.isEnd() ){
                        // DOWN => RECOVERY
                        if( this.oAnimation.sType == 'down' ){
                            oCanAction = {
                                sCommand: 'aRecovery',
                                bStack: false,
                                bGuard: false,
                                bThrow: false
                            };
                        }
                        // STAND => ALL action
                        else if( !(this.oStatus.bAerial && this.oAnimation.is('hurt')) ){
                            oCanAction = {
                                sCommand: sCommand,
                                bStack: false,
                                bGuard: false, 
                                bThrow: false
                            };
                        }
                    }
                    // Gestion HURT
                    else if( this.oAnimation.is('hurt') ){
                        oCanAction = {
                            sCommand: 'aDefense',
                            bStack: bFreeze,
                            bGuard: this.oStatus.bGuard,
                            bThrow: this.oStatus.bThrow
                        };
                    }
                    // Gestion STACK pour ACTION en HIT ou DASH, LANDING et RECOVERY
                    else if( this.aHit.length || this.oAnimation.is('stack') ){
                        const bCancel = this.oStatus.bCancel && !bFreeze;
                        oCanAction = {
                            sCommand: sCommand,
                            bStack: !bCancel,
                            bGuard: false,
                            bThrow: false
                        };
                    }
                    
                    return oCanAction;
                },
                canMove: function(){
                    return !this.oStatus.bAerial
                        && !this.oAnimation.isFreeze()
                        && (
                            this.oAnimation.isEnd()
                            || this.oAnimation.is('movement')
                        );
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GameSettings.oKi.nMax);
                },

                // Output
                render: function(){
                    BattleCharacter.prototype.render.call(this);
                    this.oLayer.hElement.classList[ this.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
                },
                setAnimation: function(sAnimation, bUpdate, bReverse){
                    const bChanged = BattleCharacter.prototype.setAnimation.call(this, sAnimation, bUpdate, bReverse);
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
                updateAnimation: function(){
                    BattleEntity.prototype.updateAnimation.call(this);
                    this.updateStatus();
                },
                setPushback: function(oPushback, bReverse, bDivide){
                    if( this.oAnimation.sName != 'launch_0' ){
                        BattleEntity.prototype.setPushback.call(this, oPushback, bReverse, bDivide);
                    }
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
                    this.generateEntity(bGuard ? 'guard' : 'hit', oStun, oEngine);

                    return bGuard;
                },
                confirmHit: function(oEntityHurt, oCommandData, bGuard){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oCommandData, bGuard);
                    this.oGatling.confirmHit(bGuard);

                    if( !oCommandData.oGatling.nCost ){
                        this.addKi( oCommandData[bGuard ? 'oGuard' : 'oHit'].oKi.nGain );
                    }
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */