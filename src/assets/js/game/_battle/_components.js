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
            destroy: function(){
            },

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

    this.oTimerEntity = null;

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
            const aCommand = this.getEnterCommands(oCanAction.sCommand);

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
            this.oTimerEntity = null;
        },
        use: function(oCommand){
            this.oCurrent = Object.assign({ nFrameStart: GAME.oTimer.nFrames }, oCommand);
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed[oCommand.sCod] = true;
            if( oCommand.oEntity ){
                this.oTimerEntity = new GameTimer();
                this.oTimerEntity.init( oCommand.oEntity.nFrameStart );
            }
        },

        getEnterCommands: function(sType){
            const aCommand = [],
                nFrameCheck = GAME.oTimer.nFrames;

            if( this.oInputBuffer.nFrameLastUpdate == nFrameCheck ){
                for( let nIndex = 0; nIndex < this.oCommandData[sType].length; nIndex++ ){
                    const oCommand = this.oCommandData[sType][nIndex];
                    if( this.oInputBuffer.checkManipulation(nFrameCheck, oCommand.oManipulation) ){
                        aCommand.push( Object.assign({}, oCommand) );
                        if( oCommand.bLast ){
                            break;
                        }
                    }
                }
            }
            return aCommand;
        },
        getEntity: function(){
            let oEntity = null;
            if( this.oCurrent && this.oCurrent.oEntity && this.oTimerEntity ){
                this.oTimerEntity.update(this);
                if( this.oTimerEntity.isEnd() ){
                    this.oTimerEntity = null;
                    oEntity = this.oCurrent.oEntity;
                }
            }
            return oEntity;
        },

        canUseCommand: function(nKi, oCommand){
            let bCanUse = false;
            // Gestion KI
            if( !oCommand.nCost || nKi >= oCommand.nCost ){
                // Gestion GATLING
                if( this.oUsed[oCommand.sCod] ){
                    // Gestion REDA CANCEL
                    const aSelfCancel = oCommand.oSelfCancel ? Object.keys(oCommand.oSelfCancel) : [];
                    if( this.oCurrent && aSelfCancel.length && ( this.oCurrent.sCod == oCommand.sCod || aSelfCancel.indexOf(this.oCurrent.sCod) != -1 ) ){
                        for( let nIndex = 0; nIndex < aSelfCancel.length; nIndex++ ){
                            if( !this.oUsed[ aSelfCancel[nIndex] ] ){
                                Object.assign(oCommand, oCommand.oSelfCancel[ aSelfCancel[nIndex] ]);
                                bCanUse = true;
                                break;
                            }
                        }
                    }
                }
                // Gestion LEVEL
                else if( !this.oCurrent || this.oCurrent.nGatlingLevel <= oCommand.nGatlingLevel ) {
                    bCanUse = true;
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