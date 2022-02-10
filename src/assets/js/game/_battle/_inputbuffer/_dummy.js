/* ----- BattleInputSourceBuffer - Dummy ----- */
function BattleInputSourceBufferDummy(oPlayer, oOptions){
    this.sType = 'dummy';

    this.oPlayer = null;

    this.oOptions = null;
    this.oLastButtons = {};
    this.oReversals = {};
    this.nFrameGuard = 0;
    this.oRecord = null;

    BattleInputSourceBuffer.apply(this, arguments);
}

Object.assign(
    BattleInputSourceBufferDummy, {

        oButtons: {
            nStance: [null, 'UP', 'UF', 'UB'],
            nRecovery: [null, 'FW', 'BW']
        },
        nDurationGuard: 30,
        aStep: [
            'step__Record',
            'step__Reversal',
            'step__Guard',
            'step__Recovery',
            'step__TechThrow',
            'step__Stance'
        ],

        prototype: Object.assign(
            Object.create(BattleInputSourceBuffer.prototype), {
                constructor: BattleInputSourceBufferDummy,
                init: function(oPlayer, oOptions) {
                    this.oPlayer = oPlayer;
                    this.oOptions = oOptions;

                    this.oPlayer.oData.oCommands.aGround.forEach( oCommand => {
                        if( !this.oReversals[oCommand.sCod] ){
                            const oManip = oCommand.oGatling.oManipulation,
                                aButtons = oManip && oManip.aButtons;
                            aButtons && ( this.oReversals[oCommand.sCod] = aButtons[0] );
                        }
                    } );
                },
                update: function(bReverse, bForce){

                    const oResult = {
                        uReturn: null,
                        oButtons: { NT: TimerEngine.nFrames }
                    };

                    for( let nIndex = 0; nIndex < BattleInputSourceBufferDummy.aStep.length; nIndex++ ){
                        const oStep = this[ BattleInputSourceBufferDummy.aStep[nIndex] ](bReverse, bForce);
                        if( oStep ){
                            oStep.sType && (oResult[ oStep.sType ] = oStep.uValue);
                            break;
                        }
                    }

                    if( oResult.uReturn ){
                        const oLast = ( Array.isArray(oResult.uReturn) ? oResult.uReturn[ oResult.uReturn.length - 1 ] : oResult.uReturn );
                        this.oLastButtons = oLast.oButtons;
                    }
                    else if( bForce || this.compareButton(oResult.oButtons) ){
                        this.oLastButtons = oResult.oButtons;
                        oResult.uReturn = {
                            nFrame: TimerEngine.nFrames,
                            nDirection: this.getDirection(bReverse, oResult.oButtons),
                            oButtons: oResult.oButtons,
                            bReverse: bReverse
                        };
                    }

                    return oResult.uReturn;
                },

                reset: function(){
                    this.oLastButtons = {};
                    this.oRecord = null;
                },
                getDirection: function(bReverse, oButtons){
                    let nDirection = 0;
                    const aDirection = BattleInputBuffer.oMapDirection[ bReverse ? 'aReverse' : 'aNormal' ];
                    for( ; nDirection < aDirection.length; nDirection++ ){
                        if( oButtons[ aDirection[nDirection] ] ){
                            break;
                        }
                    }
                    return nDirection + 1;
                },
                compareButton: function(oButtons){
                    let bChange = false;
                    if( Object.keys(oButtons).length != Object.keys(this.oLastButtons).length ){
                        bChange = true;
                    } else {
                        for( let sButton in oButtons ){
                            if( !this.oLastButtons[sButton] ){
                                bChange = true;
                                break;
                            }
                        }
                    }
                    return bChange;
                },
                getOptions: function(){
                    return Object.assign( {}, this.oOptions );
                },
                startPlayingRecord: function(sRecord){
                    let oStep = {};

                    if( this.oOptions.oRecords[sRecord] ){
                        this.oRecord = new BattleInputBufferRecord(this.oOptions.oRecords[sRecord]);
                        oStep = this.step__Record(null, null, true);
                    }

                    return oStep;
                },
                step__Record: function(bReverse, bForce, bStart){
                    let oStep = null;

                    if(
                        !bStart 
                        && this.oRecord
                        && (
                            this.oPlayer.oAnimation.is('hurt')
                            || this.oRecord.isEnd()
                        )
                    ){
                        this.oRecord = null;
                    }

                    // Record
                    if( this.oRecord ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: this.oRecord.update()
                        };

                        for( let sBtn in oStep.uValue ){
                            oStep.uValue[sBtn] = TimerEngine.nFrames;
                        }
                    }

                    return oStep;

                },
                step__Reversal: function(bReverse, bForce){
                    let oStep = null;

                    const oType = {
                        sRestart: 'restart',
                        sBlock: 'guard',
                        sHit: 'hit',
                        sRecovery: 'recovery'
                    };

                    // Reversal
                    if(this.oPlayer.oAnimation.isEnd()
                        && !this.oPlayer.oStatus.bAerial
                    ){

                        for( let sType in this.oOptions.oReversals ){
                            if( this.oOptions.oReversals[sType] && this.oPlayer.oAnimation.sType == oType[sType] ){

                                let sReversal = this.oOptions.oReversals[sType];

                                if( sReversal.indexOf('record_') == 0 ){
                                    oStep = this.startPlayingRecord(sReversal);
                                }
                                else {
    
                                    oStep = {
                                        sType: 'uReturn',
                                        uValue: []
                                    };
    
                                    this.oReversals[sReversal].forEach( (sManipButtons, nIndex) => {
                                        const nFrame = TimerEngine.nFrames - nIndex - 1,
                                            oManipButtons = {};
                                        
                                        let bDirection = false;
                                        sManipButtons.split('+').forEach( sBtn => {
                                            bDirection || ( bDirection = BattleInputBuffer.oMapDirection.aNormal.indexOf(sBtn) != -1 );
                                            oManipButtons[sBtn] = nFrame;
                                        } );
                                        bDirection || ( oManipButtons.NT = nFrame );
            
                                        oStep.uValue.push( {
                                            nFrame: nFrame,
                                            nDirection: this.getDirection(bReverse, oManipButtons),
                                            oButtons: oManipButtons,
                                            bReverse: bReverse
                                        } );
                                    } );
                                }

                                break;
                            }
                        }
                    }

                    return oStep;
                },
                step__Guard: function(bReverse, bForce){
                    let oStep = null;

                    // Guard
                        // After 1st hit
                    if ( this.oOptions.oOpponent.nGuard == 1 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'hit' ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: { DB: TimerEngine.nFrames }
                        };
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Only 1st hit
                    else if( this.oOptions.oOpponent.nGuard == 2 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'guard' ){
                        oStep = {};
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Reflect
                    else if ( this.oOptions.oOpponent.nGuard == 4 && this.oPlayer.oAnimation.sType == 'guard' && this.oPlayer.oAnimation.isFirstTick() ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: { D: TimerEngine.nFrames, NT: TimerEngine.nFrames }
                        };
                    }
                        // Guard others
                    else if(
                        this.oOptions.oOpponent.nGuard
                        && (
                            this.oPlayer.oAnimation.isEnd()
                            || this.oPlayer.oAnimation.is('movement')
                        )
                    ){
                        // Check HitBox
                        const aOpponentEntity = BattleEntity.get().filter( oEntity => {
                            return !oEntity.isDead() && oEntity.getRootParent().sId != this.oPlayer.sId;
                        } );

                        let bHitBox = false;
                        for( let nIndex = 0; nIndex < aOpponentEntity.length; nIndex++ ){
                            const oEntity = aOpponentEntity[nIndex];
                            if(
                                oEntity.oParent
                                || ( oEntity.oAnimation.oFrame && oEntity.oAnimation.oFrame.aHitBox )
                            ){
                                bHitBox = true;
                                break;
                            }
                        }

                        if( bHitBox ){
                            switch(this.oOptions.oOpponent.nGuard){
                                case 1:
                                    if( TimerEngine.nFrames - this.nFrameGuard <= BattleInputSourceBufferDummy.nDurationGuard ){
                                        oStep = {
                                            sType: 'oButtons',
                                            uValue: { DB: TimerEngine.nFrames }
                                        };
                                    }
                                    break;
                                case 2:
                                    if( TimerEngine.nFrames - this.nFrameGuard > BattleInputSourceBufferDummy.nDurationGuard ){
                                        oStep = {
                                            sType: 'oButtons',
                                            uValue: { DB: TimerEngine.nFrames }
                                        };
                                    }
                                    break;
                                case 3:
                                case 4:
                                    oStep = {
                                        sType: 'oButtons',
                                        uValue: { DB: TimerEngine.nFrames }
                                    };
                                    break;
                                case 5:
                                    if( Math.floor( Math.random() * 10 ) % 2 ){
                                        oStep = {
                                            sType: 'oButtons',
                                            uValue: { DB: TimerEngine.nFrames }
                                        };
                                    }
                                    break;
                            }
                        }
                    }

                    return oStep;
                },
                step__Recovery: function(bReverse, bForce){
                    let oStep = null;

                    // Recovery
                    if(
                        this.oOptions.oOpponent.nRecovery
                        && this.oPlayer.oAnimation.sType == 'down'
                        && this.oPlayer.oAnimation.isFirstTick()
                    ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nRecovery;
                        let sBtn = null;

                        switch(this.oOptions.oOpponent.nRecovery){
                            case 1:
                            case 2:
                                sBtn = aConfig[this.oOptions.oOpponent.nRecovery];
                                break;
                            case 3:
                                const nRandomn = Math.floor( Math.random() * BattleInputSourceBufferDummy.oButtons.nRecovery.length + 1 );
                                sBtn = aConfig[nRandomn];
                                break;
                        }

                        oStep = {
                            sType: 'oButtons',
                            uValue: { [sBtn]: TimerEngine.nFrames }
                        };
                    }

                    return oStep;
                },
                step__TechThrow: function(bReverse, bForce){
                    let oStep = null;

                    // Tech throw
                    if(
                        this.oOptions.oOpponent.nTechThrow
                        && this.oPlayer.oAnimation.sName == 'hit_D'
                        && this.oPlayer.oAnimation.isFirstTick()
                    ){
                        switch( this.oOptions.oOpponent.nTechThrow ){
                            case 1:
                                oStep = {
                                    sType: 'oButtons',
                                    uValue: { D: TimerEngine.nFrames, NT: TimerEngine.nFrames }
                                };
                                break;
                            case 2:
                                if( Math.floor( Math.random() * 10 ) % 2 ){
                                    oStep = {
                                        sType: 'oButtons',
                                        uValue: { D: TimerEngine.nFrames, NT: TimerEngine.nFrames }
                                    };
                                }
                                break;
                        }
                    }

                    return oStep;
                },
                step__Stance: function(bReverse, bForce){
                    let oStep = null;

                    // Stance
                    if( this.oOptions.oOpponent.nStance ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nStance;
                        oStep = {
                            sType: 'oButtons',
                            uValue: { [aConfig[this.oOptions.oOpponent.nStance]]: TimerEngine.nFrames }
                        };
                    }

                    return oStep;
                }
            }
        )
    }
);

// Animations
function BattleInputBufferRecord(aStep){
    GameTimer.call(this);
    this.aStep = [];
    this.bLock = false;
    this.init(aStep);
}

Object.assign(
    BattleInputBufferRecord, {
        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleInputBufferRecord,
                init: function(aStep){
                    GameTimer.prototype.init.call(this, aStep.reduce( (nResult, oHistory) => Math.max(nResult, oHistory.nFrame), 0));
                    this.aStep = aStep;
                },
                update: function(){
                    const bUpdate = GameTimer.prototype.update.call(this);
                    let oButtons = { NT: TimerEngine.nFrames };
                    if( bUpdate ){
                        let oStep = null;
                        for( let nIndex = 0; nIndex < this.aStep.length; nIndex++ ){
                            oStep = this.aStep[nIndex];
                            if( this.nTick <= oStep.nFrame ){
                                oStep = this.aStep[nIndex - 1];
                                break;
                            }
                        }

                        if( oStep ){
                            oButtons = Object.assign( {}, oStep.oButtons );
                            for( let sBtn in oButtons ){
                                oButtons[sBtn] = TimerEngine.nFrames;
                            }
                        }
                    }
                    return oButtons;
                },

                isEnd: function(){
                    return this.bLock || GameTimer.prototype.isEnd();
                }
            }
        )
    }
);