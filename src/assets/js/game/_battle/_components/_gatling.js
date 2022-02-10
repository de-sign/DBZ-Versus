/* ----- BattleGatling ----- */
function BattleGatling(oInputBuffer, oCommandData){
    this.oInputBuffer = null;
    this.oCommandData = null;

    this.oCurrent = null;
    this.nFrameCheck = 0;
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
        update: function(oCanAction, oConditions){

            let oUse = null;

            if( oCanAction.bStack ){
                this.nFrameCheck || ( this.nFrameCheck = TimerEngine.nFrames );
            }
            else {
                const aCommand = this.getCommands(oCanAction.sCommand);
                this.nFrameCheck = 0;

                for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                    const oCommand = aCommand[nIndex];
                    if( !oCommand.oGatling.sCheck || oCanAction[oCommand.oGatling.sCheck] ){
                        if( this.canUseCommand(oCommand, oConditions) ){
                            oUse = oCommand;
                            break;
                        }
                    }
                }
            }

            return oUse;

        },
        destroy: function(){},

        reset: function(bNotUsed){
            this.oCurrent = null;
            bNotUsed || ( this.oUsed = {} );
            this.aTimerEntity = [];
        },
        use: function(oCommand){
            if( oCommand.oGatling.bReset ){
                this.reset();
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
            let bLastNoManip = false;
            const aCommand = [],
                aCommandNoManip = [],
                nFrameCheck = this.nFrameCheck || TimerEngine.nFrames;

            for( let nIndex = 0; nIndex < this.oCommandData[sType].length; nIndex++ ){
                let oCommand = this.oCommandData[sType][nIndex];

                // Gestion FOLLOW UP
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
                        oCommand = oFollow;
                    } else {
                        oCommand = null;
                    }
                }

                // Gestion COMMAND
                if( oCommand ){
                    const oManip = oCommand.oGatling.oManipulation;
                    if( !oManip || !oManip.aButtons ){
                        if( !bLastNoManip ){
                            aCommandNoManip.push( Object.assign({}, oCommand) );
                            bLastNoManip = oManip && oManip.bLast;
                        }
                    }
                    else if(
                        ( oManip.bStay || this.oInputBuffer.nFrameLastUpdate >= nFrameCheck )
                        && this.oInputBuffer.checkManipulation(nFrameCheck, oManip)
                    ){
                        aCommand.push( Object.assign({}, oCommand) );
                        if( oManip.bLast ){
                            break;
                        }
                    }
                }
            }
            [].push.apply(aCommand, aCommandNoManip);
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

        canUseCommand: function(oCommand, oConditions){
            return ( !this.oUsed[oCommand.sCod] ) // USED
                && ( !oCommand.oGatling.nCost || oConditions.nCost >= oCommand.oGatling.nCost ) // KI
                && (
                    !this.oCurrent // First
                    || ( this.oCurrent.oGatling.oCancel && this.oCurrent.oGatling.oCancel[ oCommand.oGatling.sCancelCod ] ) // Gatling
                    || ( this.oCurrent.sRoot || this.oCurrent.sCod ) == oCommand.sRoot // Follow Up 
                    || oConditions.aCategory.indexOf('stack') != -1 // Stack Animation
                );
        },
        getEffect: function(){
            let aEffect = null;
            if( this.oCurrent && this.oCurrent.aEffect ){
                aEffect = this.oCurrent.aEffect;
                this.oCurrent.aEffect = [];
            }
            return aEffect;
        }
    }
);