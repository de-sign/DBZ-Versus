/* ----- BattleGatling ----- */
function BattleGatling(oInputBuffer, oCommandData){
    this.oInputBuffer = null;
    this.oCommandData = null;

    this.oCurrent = null;
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
                if( !oCommand.oGatling.sCheck || oCanAction[oCommand.oGatling.sCheck] ){
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
            this.oNext = null;
            this.oUsed = {};
            this.aTimerEntity = [];
        },
        use: function(oCommand){
            if( oCommand.oGatling.bReset ){
                this.reset();
            } else {
                this.oNext = null;
            }
            this.oCurrent = Object.assign(
                {
                    nFrameStart: TimerEngine.nFrames,
                    bFreeze: false
                },
                oCommand
            );
            this.oUsed[oCommand.sCod] = true;
            if( oCommand.oGatling.aEntity ){
                this.aTimerEntity = [];
                oCommand.oGatling.aEntity.forEach( oEntity => {
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
                nFrameCheck = TimerEngine.nFrames;

            for( let nIndex = 0; nIndex < this.oCommandData[sType].length; nIndex++ ){
                let oCommand = this.oCommandData[sType][nIndex];
                if( this.oCurrent && ( this.oCurrent.sRoot || this.oCurrent.sCod ) == oCommand.sCod ){
                    const oFollow = this.oCurrent.oFollowUp
                    if(
                        oFollow &&
                        (
                            !oFollow.sCheck
                            || (
                                typeof oFollow.sCheck == 'string' ?
                                    oFollow.sCheck == this.oCurrent.sHurt :
                                    this.oCurrent.sHurt
                            )
                        )
                    ){
                        oCommand = this.oCurrent.oFollowUp;
                    } else {
                        oCommand = null;
                    }
                }
                if( oCommand ){
                    const oManip = oCommand.oGatling.oManipulation;
                    if( !oManip.aButtons ){
                        if( !this.oNext && !bLastNoManip ){
                            aCommandNoManip.push( Object.assign({}, oCommand) );
                            bLastNoManip = oManip && oManip.bLast;
                        }
                    }
                    else if(
                        this.oInputBuffer.nFrameLastUpdate == nFrameCheck
                        && this.oInputBuffer.checkManipulation(nFrameCheck, oManip)
                    ){
                        aCommand.push( Object.assign({}, oCommand) );
                        if( oManip.bLast ){
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
            if( this.oCurrent && this.oCurrent.oGatling.aEntity && this.aTimerEntity.length ){
                this.aTimerEntity.forEach( (oTimer, nIndex) => {
                    if( oTimer ){
                        oTimer.update(this);
                        if( oTimer.isEnd() ){
                            aEntity.push( this.oCurrent.oGatling.aEntity[nIndex] );
                            this.aTimerEntity[nIndex] = null;
                        }
                    }
                } );
            }
            return aEntity;
        },
        confirmHit: function(bGuard){
            this.oCurrent && ( this.oCurrent.sHurt = bGuard ? 'bGuard' : 'bHit');
        },

        canUseCommand: function(nKi, oCommand){
            let bCanUse = false;
            // Gestion KI
            if( !oCommand.oGatling.nCost || nKi >= oCommand.oGatling.nCost ){
                // Gestion GATLING
                if( !this.oUsed[oCommand.sCod] ){
                    // Gestion LEVEL
                    if(
                        !this.oCurrent // None
                        || this.oCurrent.oGatling.bIgnoreLevel || oCommand.oGatling.bIgnoreLevel || this.oCurrent.oGatling.nLevel <= oCommand.oGatling.nLevel // Level
                        || (this.oCurrent.sRoot || this.oCurrent.sCod ) == oCommand.sRoot // Follow Up 
                    ) {
                        bCanUse = true;
                    }
                }
            }
            return bCanUse;
        },
        needFreeze: function(){
            let bFreeze = false;
            if( this.oCurrent && this.oCurrent.oFreeze && !this.oCurrent.bFreeze ){
                if( !this.oCurrent.oFreeze.nFrameStart || ( this.oCurrent.nFrameStart + this.oCurrent.oFreeze.nFrameStart <= TimerEngine.nFrames ) ){
                    bFreeze = true;
                }
            }
            return bFreeze;
        },
        isJumpCancellable: function(){
            return this.oCurrent && this.oCurrent.oGatling.bJumpCancellable;
        }
    }
);