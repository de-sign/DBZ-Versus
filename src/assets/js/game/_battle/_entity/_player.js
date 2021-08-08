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
                    const oCanCommand = this.canCommand(),
                        bFreeze = this.oAnimation.isFreeze();

                    // Gestion MANIP
                    let oCommand = null;
                    if( oCanCommand.sCommand ){
                        oCommand = this.oGatling.update(this.nKi, oCanCommand);
                        oCommand && this.useCommand(oCommand);
                    }

                    if( !oCommand ){
                        const sDirection = this.oInputBuffer.getDirection();
                        
                        // Gestion FALL / DIR / JUMPCANCEL
                        if(
                            this.canBeMoved()
                            || (
                                this.oGatling.isJumpCancellable()
                                && !oCanCommand.bStack
                                && sDirection[0] == 'U'
                            )
                        ){
                            if( this.oStatus.bAerial ){
                                // Gestion de chute
                                if( this.oAnimation.is('hurt') && this.oAnimation.sType != 'guard' ){
                                    this.setStance('launch_1');
                                }
                                // Gestion en l'air
                                else {
                                    switch( sDirection ){
                                        /* Guard AERIAL ?
                                        case 'UB':
                                        case 'BW':
                                        case 'DB':
                                            this.setStance('move_j4');
                                            break;
                                        */
                                        default:
                                            this.setStance('move_j5');
                                            break;
                                    }
                                }
                            }
                            else {
                                // Gestion au sol
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
                        }
                    }

                    this.updateAnimation();
                    if( !this.oAnimation.isFreeze() ){
                        this.generateEntity('command', this.oGatling.getEntity(), oEngine);
                    }
                },
                // destroy: function(){},

                // Fonction ENGINE
                canBeMoved: function(){
                    return this.oAnimation.isEnd()
                        || (
                            this.oAnimation.is('movement')
                            && !this.oAnimation.isFreeze()
                        );
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GameSettings.oKi.nMax);
                },

                // Gatling
                getCommandData: function(){
                    return this.oGatling.oCurrent;
                },
                canCommand: function(){

                    const sCommand = this.oStatus.bAerial ? 'aAerial' : 'aGround',
                        oCanCommand = {
                            sCommand: null,
                            bStack: false,
                            bGuard: false,
                            bThrow: false
                        };

                    // Gestion MOVEMENT
                    if( this.canBeMoved() ){
                        oCanCommand.sCommand = sCommand;
                    } else {

                        const bFreeze = this.oAnimation.isFreeze();

                        // Gestion HURT
                        if( this.oAnimation.is('hurt') ){
                            Object.assign( oCanCommand, {
                                sCommand: 'aDefense',
                                bStack: bFreeze,
                                bGuard: this.oStatus.bGuard,
                                bThrow: this.oStatus.bThrow
                            } );
                        }
                        // Gestion STACK pour ACTION en HIT ou STACK
                        else if( this.aHit.length || this.oAnimation.is('stack') ){
                            Object.assign( oCanCommand, {
                                sCommand: this.oAnimation.sType == 'down' ?
                                    'aRecovery' :
                                    sCommand,
                                bStack: !this.oStatus.bCancel || bFreeze
                            } );
                        }
                    }
                    
                    return oCanCommand;
                },
                useCommand: function(oCommand){
                    this.oGatling.use(oCommand);
                    oCommand.oGatling.nCost && (this.nKi -= oCommand.oGatling.nCost);

                    const oSet = this.setAnimation(oCommand.sAnimation);
                    if( this.oStatus.bAerial && oSet && oSet.oMovement ){
                        this.setFall(oSet.oMovement);
                    }
                },

                // Output
                render: function(){
                    BattleCharacter.prototype.render.call(this);
                    this.oLayer.hElement.classList[ this.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
                },
                setAnimation: function(sAnimation, bUpdate, bReverse){
                    const oChanged = BattleCharacter.prototype.setAnimation.call(this, sAnimation, bUpdate, bReverse);
                    if( oChanged ){
                        if( !this.oAnimation.is('hurt') || this.oAnimation.sType == 'guard' ){
                            this.nHitting = 0;
                        }
                    }
                    return oChanged;
                },
                setStance: function(sMovement, bUpdate, bReverse){
                    if( this.setAnimation(sMovement, bUpdate, bReverse) ){
                        this.oGatling.reset();
                    }
                },
                setHurt: function(sHurt, nFramesLength, bReverse){
                    this.setStance(sHurt, false, bReverse);

                    if( this.oAnimation.sName != 'launch_0' ){
                        this.oAnimation.setLength(nFramesLength);

                        if( this.oStatus.bAerial ){
                            // Gestion retombé / chute
                            const oMove = {
                                bEmpty: true,
                                nLength: nFramesLength
                            };

                            // Guard 
                            if( this.oAnimation.sType == 'guard' ){
                                this.oMovement.set(oMove);
                                this.setFall(true);
                            }
                            // Hit générant fall
                            else if( this.nHitting == 1 ){
                                this.oMovement.set(oMove);
                                const oFall = this.oMovement.after( this.oData.oAnimations.launch_0.oMove, this.bReverse );
                                oFall.nTick = GameSettings.oLauncher.nFallLength;
                            }
                            // Hit pendant fall
                            else {
                                this.oMovement.before(oMove);
                            }
                        }
                    }
                    
                    this.updateAnimation();
                },
                setMovement: function(oMove, bReverse){
                    let oMovement = null;
                    if( !this.oStatus.bAerial || oMove ){
                        oMovement = BattleEntity.prototype.setMovement.call(this, oMove, bReverse);
                    }
                    return oMovement;
                },
                setPushback: function(oPushback, bReverse, bDivide){
                    if( this.oAnimation.sName != 'launch_0' ){
                        BattleEntity.prototype.setPushback.call(this, oPushback, bReverse, bDivide);
                    }
                },
                setFall: function(uMovement){
                    let sAnimation = null,
                        sSetting = uMovement ? 'oJump' : 'oLauncher';
                    if( typeof uMovement == 'boolean' ){
                        sAnimation = uMovement ? 'move_7' : 'launch_0';
                    }
                    if( !sAnimation ){
                        const aFall = ['move_7', 'move_8', 'move_9'],
                            nMove = Math.min( 1, Math.max( -1, uMovement.aStep[ uMovement.aStep.length - 1 ].nX ) );
                        sAnimation = aFall[nMove + 1];
                    }
                    const oFall = this.oMovement.after( this.oData.oAnimations[sAnimation].oMove, this.bReverse );
                    oFall.nTick = GameSettings[sSetting].nFallLength;
                },
                updateAnimation: function(){
                    BattleEntity.prototype.updateAnimation.call(this);
                    this.updateStatus();
                },
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