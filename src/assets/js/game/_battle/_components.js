/* ----- BattleInputBuffer ----- */
function BattleInputBuffer(oController){
    this.oController = null;

    this.nDirection = 5;
    this.bReverse = false;
    this.aHistory = [];
    this.nFrameLastUpdate = 0;

    this.init(oController);
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
            init: function(oController) {
                this.oController = oController;
            },
            update: function(bReverse){
                this.bReverse = bReverse;
                if( this.oController && this.oController.nFrameChange == GAME.oTimer.nFrames ){
                    this.nFrameLastUpdate = GAME.oTimer.nFrames;
                    this.updateDirection();

                    this.aHistory.length >= BattleInputBuffer.nLengthHistory && this.aHistory.shift();
                    this.aHistory.push( {
                        nFrame: GAME.oTimer.nFrames,
                        oButtons: this.getButtonsPressed()
                    } );
                }
            },
            destroy: function(){},

            updateDirection: function(){
                this.nDirection = 5;
                for (sBtn in BattleInputBuffer.oButtonsDirection) {
                    if ( this.oController.oButtons[sBtn].bPressed ) {
                        this.nDirection += BattleInputBuffer.oButtonsDirection[sBtn];
                    }
                }
            },
            getButtonsPressed: function(){
                const oBtns = {},
                    aFrameDir = [];

                // Gestion BTN
                for( let sBtn in this.oController.oButtons ){
                    if( BattleInputBuffer.oButtonsDirection[sBtn] ){
                        aFrameDir.push( this.oController.oButtons[sBtn].nFrameChanged );
                    } else if( this.oController.oButtons[sBtn].bPressed ){
                        oBtns[sBtn] = this.oController.oButtons[sBtn].nFrameChanged;
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
function BattleGatling(oInputBuffer, oCommandData){
    this.oInputBuffer = null;
    this.oCommandData = null;

    this.oCurrent = null;
    this.bFreeze = false;
    this.oNext = null;
    this.oUsed = {};
    this.aTimerEntity = [];

    this.init(oInputBuffer, oCommandData);
}

Object.assign(
    BattleGatling.prototype, {
        init: function(oInputBuffer, oCommandData){
            this.oInputBuffer = oInputBuffer;
            this.oCommandData = oCommandData;
        },
        update: function(nKi, oCanAction){
            let bFind = false,
                bUse = false;
            const aCommand = this.getCommands(oCanAction.sCommand);

            for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                const oCommand = aCommand[nIndex];
                if( oCommand.bGuard ? oCanAction.bGuard : !oCanAction.bGuard ){
                    if( this.canUseCommand(nKi, oCommand) ){
                        if( oCanAction.bStack ){
                            this.oNext = oCommand;
                            bFind = true;
                        } else {
                            this.use(oCommand);
                            bFind = true;
                            bUse = true;
                        }
                        break;
                    }
                }
            }

            // Gestion Gatling Buffer
            if( !bFind && this.oNext && !oCanAction.bStack ){
                this.use(this.oNext);
                bUse = true;
            }

            return bUse ? this.oCurrent : null;

        },
        destroy: function(){},

        reset: function(){
            this.oCurrent = null;
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed = {};
            this.aTimerEntity = [];
        },
        use: function(oCommand){
            this.oCurrent = Object.assign({ nFrameStart: GAME.oTimer.nFrames }, oCommand);
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed[oCommand.sCod] = true;
            if( oCommand.aEntity ){
                this.aTimerEntity = [];
                oCommand.aEntity.forEach( oEntity => {
                    const oTimer = new GameTimer();
                    oTimer.init( oEntity.nFrameStart );
                    this.aTimerEntity.push(oTimer);
                } );
            }
        },

        getCommands: function(sType){
            let bLastNoManip = false,
                bAddNoManip = true;
            const aCommand = [],
                aCommandNoManip = [],
                nFrameCheck = GAME.oTimer.nFrames;

            for( let nIndex = 0; nIndex < this.oCommandData[sType].length; nIndex++ ){
                let oCommand = this.oCommandData[sType][nIndex];
                if( this.oCurrent && ( this.oCurrent.sRoot || this.oCurrent.sCod ) == oCommand.sCod ){
                    const oFollow = this.oCurrent.oFollowUp
                    if(
                        oFollow &&
                        (
                            !oFollow.bFollowOnlyOnHurt
                            || ( typeof oFollow.bFollowOnlyOnHurt == 'string' ?
                                oFollow.bFollowOnlyOnHurt == this.oCurrent.sHurt :
                                this.oCurrent.sHurt )
                        )
                    ){
                        oCommand = this.oCurrent.oFollowUp;
                    } else {
                        oCommand = null;
                    }
                }
                if( oCommand ){
                    if( !oCommand.oManipulation ){
                        if( !this.oNext && !bLastNoManip ){
                            aCommandNoManip.push( Object.assign({}, oCommand) );
                            bLastNoManip = oCommand.bLast;
                        }
                    }
                    else if(
                        this.oInputBuffer.nFrameLastUpdate == nFrameCheck
                        && this.oInputBuffer.checkManipulation(nFrameCheck, oCommand.oManipulation)
                    ){
                        aCommand.push( Object.assign({}, oCommand) );
                        if( oCommand.bLast ){
                            bAddNoManip = false;
                            break;
                        }
                    }
                }
            }
            bAddNoManip && [].push.apply(aCommand, aCommandNoManip);
            return aCommand;
        },
        getEntity: function(){
            let aEntity = [];
            if( this.oCurrent && this.oCurrent.aEntity && this.aTimerEntity.length ){
                this.aTimerEntity.forEach( (oTimer, nIndex) => {
                    if( oTimer ){
                        oTimer.update(this);
                        if( oTimer.isEnd() ){
                            aEntity.push( this.oCurrent.aEntity[nIndex] );
                            this.aTimerEntity[nIndex] = null;
                        }
                    }
                } );
            }
            return aEntity;
        },
        confirmHit: function(bGuard){
            this.oCurrent && ( this.oCurrent.sHurt = bGuard ? 'guard' : 'hit');
        },

        canUseCommand: function(nKi, oCommand){
            let bCanUse = false;
            // Gestion KI
            if( !oCommand.nCost || nKi >= oCommand.nCost ){
                // Gestion GATLING
                if( !this.oUsed[oCommand.sCod] ){
                    // Gestion LEVEL
                    if( !this.oCurrent || this.oCurrent.nGatlingLevel <= oCommand.nGatlingLevel || this.oCurrent.sCod <= oCommand.sRoot ) {
                        bCanUse = true;
                    }
                }
            }
            return bCanUse;
        },
        needFreeze: function(){
            return this.oCurrent && this.oCurrent.oStun.nFreeze && !this.bFreeze;
        }
    }
);

/* ----- BattleMovement ----- */
function BattleMovement(nDelay, uMove, nLength){
    GameTimer.call(this);
    
    this.aStep = [];
    this.oMove = null;

    this.init(nDelay, uMove, nLength);
}

Object.assign(
    BattleMovement,
    {
        empty: function(){
            return new BattleMovement(-1, []);
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleMovement,
                init: function(nDelay, uMove, nLength){
                    if( Array.isArray(uMove) ){
                        nLength = uMove.length;
                        this.aStep = uMove;
                    } else {
                        if( nLength > 1 ){
                            // Linear timing function
                            const oMove = {
                                nX: uMove.nX / nLength,
                                nY: uMove.nY / nLength
                            };

                            for( let nIndex = 0; nIndex < nLength; nIndex++ ){
                                this.aStep.push(oMove);
                            }
                        } else {
                            this.aStep.push(uMove);
                        }
                    }

                    GameTimer.prototype.init.call(this, nLength, nDelay);
                },
                update: function(){
                    const bUpdate = GameTimer.prototype.update.call(this);
                    this.oMove = bUpdate ? this.aStep[ this.nLength ? this.nTick - 1 : 0 ] : null;
                    return bUpdate;
                }
            }
        )
    }
);