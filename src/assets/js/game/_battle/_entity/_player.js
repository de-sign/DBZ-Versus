/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer){
    /* ----- START PROPERTIES ----- */
    this.nPlayer = null;
    
    this.oStatus = {
        bReverse: false, // Possibilité de se retourner : stand, tp, etc
        bThrough: false, // Possibilité de traverser
        bCounter: false, // Possibilité de se faire counter
        bGuard: false, // Possibilité de guarder : backdash, block
        bThrow: false, // Possibilité de TechThrow : hit_throw
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
    this.oDamage = null;

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
                init: function(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer) {

                    this.oDamage = new BattleDamage();
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
                },
                update: function(oEngine){
                    // Gestion des INPUTs
                    this.oInputBuffer.update(this.bReverse);

                    // Si pas stun par Animation
                    const oCanCommand = this.canCommand(),
                        oStatus = {};

                    // Check MANIP
                    let oCommand = null;
                    if( oCanCommand.sCommand ){
                        oCommand = this.oGatling.update(oCanCommand, {
                            nCost: this.nKi,
                            aCategory: this.oAnimation.is()
                        } );
                    }

                    // Gestion MANIP
                    if( oCommand ){
                        this.useCommand(oCommand);
                    }
                    else {

                        // Gestion FALL
                        if( oCanCommand.bFall ){
                            this.setStance('launch_1');
                        }
                        // Gestion DIR
                        else if( oCanCommand.bMove ){
                            const sDirection = this.oInputBuffer.getDirection();

                            if( this.oStatus.bAerial ){
                                switch( sDirection ){
                                    // Guard AERIAL
                                    case 'UB':
                                    case 'BW':
                                    case 'DB':
                                        oStatus.bGuard = true;
                                        break;
                                }
                                this.setStance('move_j5');
                            }
                            else {
                                // Gestion au sol
                                switch( sDirection ){
                                    case 'DB':
                                        oStatus.bGuard = true;
                                        this.setStance('move_5');
                                        break;
                                    case 'BW':
                                        this.setStance('move_4');
                                        break;
                                    case 'FW':
                                        this.setStance('move_6');
                                        break;
                                    default:
                                        this.setStance('move_5');
                                        break;
                                }
                            }
                        }
                    }

                    oStatus.bCounter = this.isCounterState();
                    this.updateAnimation(oStatus);

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
                needFall: function(){
                    return this.oStatus.bAerial && this.oAnimation.is('hit') && this.oAnimation.isEnd();
                },
                addKi: function(nKi){
                    this.nKi = Math.min(this.nKi + nKi, GameSettings.oKi.nMax);
                },
                isState: function(sState){
                    return this.oStatus['b' + sState];
                },

                // Gatling
                getCommandData: function(){
                    return this.oGatling.oCurrent;
                },
                canCommand: function(){

                    const sCommand = this.oStatus.bAerial ? 'aAerial' : 'aGround',
                        bFall = this.needFall(),
                        oCanCommand = {
                            sCommand: null,
                            bMove: !bFall && this.canBeMoved(),
                            bFall: bFall,
                            bStack: false,
                            bGuard: false,
                            bThrow: false
                        };

                    
                    // Gestion DOWN
                    if ( this.oAnimation.is('down') ){
                        Object.assign( oCanCommand, {
                            sCommand: 'aRecovery',
                            bStack: !oCanCommand.bMove
                        } );
                    }
                    // Gestion MOVEMENT
                    else if( oCanCommand.bMove ){
                        Object.assign( oCanCommand, {
                            sCommand: sCommand,
                            bStack: this.oAnimation.isFreeze()
                        } );
                    }
                    // Gestion HURT
                    else if( this.oAnimation.is('hurt') ){
                        Object.assign( oCanCommand, {
                            sCommand: 'aDefense',
                            bStack: this.oAnimation.isFreeze(),
                            bGuard: this.oStatus.bGuard,
                            bThrow: this.oStatus.bThrow
                        } );
                    }
                    // Gestion STACK pour ACTION en HIT ou STACK
                    else if( this.aHit.length || this.oAnimation.is('stack') ){
                        Object.assign( oCanCommand, {
                            sCommand: sCommand,
                            bStack: this.oAnimation.isFreeze() || this.oAnimation.getStep(-1, true) != 'nRecovery'
                        } );
                    }
                    
                    return oCanCommand;
                },
                useCommand: function(oCommand){
                    this.oGatling.use(oCommand);
                    oCommand.oGatling.nCost && (this.nKi -= oCommand.oGatling.nCost);

                    const oSet = this.setAnimation(oCommand.sAnimation);
                    if( oSet && oSet.oMovement && ( this.oStatus.bAerial || oSet.oMovement.oDirection.nY < 0 ) ){
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
                        if( !this.oAnimation.is('hit') ){
                            this.oDamage.reset();
                        }
                    }
                    return oChanged;
                },
                setStance: function(sMovement, bUpdate, bReverse){
                    const oChanged = this.setAnimation(sMovement, bUpdate, bReverse);
                    oChanged && this.oGatling.reset( this.oStatus.bAerial );
                    return oChanged;
                },
                setHurt: function(sHurt, nFramesLength, bReverse){
                    const oChanged = this.setStance(sHurt, false, bReverse);

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
                            else if( this.oDamage.firstHit() ){
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

                    return oChanged;
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
                            nMove = Math.min( 1, Math.max( -1, uMovement.oDirection.nX ) );
                        sAnimation = aFall[nMove + 1];
                    }
                    const oFall = this.oMovement.after( this.oData.oAnimations[sAnimation].oMove, this.bReverse );
                    oFall.nTick = GameSettings[sSetting].nFallLength;
                },
                updateAnimation: function(oForce){
                    BattleEntity.prototype.updateAnimation.call(this);
                    this.updateStatus(oForce);
                },
                updateStatus: function(oForce){
                    this.oStatus = Object.assign(
                        {
                            bReverse: false, // Possibilité de se retourner : stand, tp, etc
                            bThrough: false, // Possibilité de traverser

                            bCounter: false, // Possibilité de se faire counter
                            bGuard: false, // Possibilité de garder : backward, block
                            bThrow: false, // Possibilité de TechThrow : hit_throw

                            bAerial: this.oStatus.bAerial, // Personnage en l'air : jump, launch, fall, etc
                            bLaunch: this.oStatus.bLaunch // Personnage en l'air via un coup : launch
                        },
                        this.oAnimation.oFrame.oStatus,
                        oForce || {}
                    );
                },

                isInvulnerable: function(oEntityHit){
                    let bInvul = BattleEntity.prototype.isInvulnerable.call(this);
                    if( !bInvul ){
                        const oData = this.getCommandData(),
                            oInvul = oData && oData.oProperty.oInvulnerable;

                        if( oInvul && this.oAnimation.nTick >= oInvul.nStart && this.oAnimation.nTick < ( oInvul.nStart + oInvul.nLength ) ){

                            // Display TRAINING
                            if( oEntityHit === true ){
                                bInvul = true;
                            }
                            // Engine
                            else {
                                switch( oInvul.sType ){
                                    case 'All':
                                        bInvul = true;
                                        break;
                                    case 'Aerial':
                                        bInvul = oEntityHit.oStatus && oEntityHit.oStatus.bAerial;
                                        break;
                                    case 'Physical':
                                        bInvul = oEntityHit.sType == 'Character' || oEntityHit.sType == 'Player';
                                        break;
                                    case 'Ki':
                                        bInvul = oEntityHit.sType == 'Projectile' || oEntityHit.sType == 'Beam';
                                        break;
                                    default:
                                        bInvul = oEntityHit.sType == oInvul.sType;
                                        break;
                                }
                            }
                        }
                    }
                    return bInvul;
                },
                isCounterState: function(){
                    let bResult = false;
                    const oOptions = this.oInputBuffer.getOptions();

                    if( oOptions && oOptions.oOpponent.nCounter ){
                        if( !this.oDamage.takeDamage() ){
                            switch( oOptions.oOpponent.nCounter ){
                                case 1: // 'forced'
                                    bResult = true;
                                    break;
                                case 2: // 'random'
                                    bResult = Math.floor( Math.random() * 10 ) % 2;
                                    break;
                            }
                        }
                    }

                    // Dummy NORMALY / Local
                    else if(
                        ( this.oAnimation.is('counter') )
                        && this.oAnimation.getStep(-1) != 'nRecovery'
                    ){
                        bResult = true;
                    }

                    return bResult;
                },

                takeHit: function(oEntity, oCommandData, oEngine){

                    let bLaunch = false,
                        bCounter = false;
                    const bGuard = !oCommandData.oProperty.bUnblockable && this.oStatus.bGuard,
                        sData = bGuard ? 'oGuard' : 'oHit',
                        oData = oCommandData[sData],
                        oDamage = Object.assign( {}, oData.oDamage ),
                        oStun = Object.assign( {}, oData.oStun );

                    if( bGuard ){
                        if( this.oStatus.bAerial ){
                            oStun.sAnimation = 'defense_j4';
                        }
                    }
                    else {
                        bLaunch = oCommandData.oProperty.bLaunch && !this.oStatus.bLaunch;
                        oDamage.nDamage = this.oDamage.update(oDamage);
                        if( this.oStatus.bCounter && !oCommandData.oProperty.bCantCounter ){
                            bCounter = true;
                            oStun.nStun += GameSettings.oCounter.nStun;
                        }
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

                    return {
                        bGuard,
                        bCounter
                    };
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