/* ----- BattleInputSourceBuffer - Dummy ----- */
function BattleInputSourceBufferDummy(oPlayer, oOptions){
    this.sType = 'dummy';

    this.oPlayer = null;

    this.oOptions = null;
    this.oLastButtons = {};
    this.oCounter = {};
    this.nFrameGuard = 0;
    this.oRecord = null;

    BattleInputSourceBuffer.apply(this, arguments);
}

Object.assign(
    BattleInputSourceBufferDummy, {

        oButtons: {
            nStance: [null, null, 'UP', 'UF', 'UB'],
            nReversal: [null, 'FW', 'BW']
        },
        nDurationGuard: 30,
        aStep: [
            'step__Record',
            'step__Counter',
            'step__Guard',
            'step__Reversal',
            'step__Reversal',
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
                        this.oCounter[oCommand.sCod] || ( this.oCounter[oCommand.sCod] = oCommand.oManipulation.aButtons );
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

                startPlayingRecord: function(){
                    let oStep = {};

                    if( !this.oRecord || !this.oRecord.bLock ){
                        this.oRecord = new BattleInputBufferRecord(this.oOptions.aRecord);
                        oStep = this.step__Record(null, null, true);
                    }

                    return oStep;
                },

                step__Record: function(bReverse, bForce, bStart){
                    let oStep = null;

                    if( !bStart && this.oRecord ){
                        if(
                            this.oOptions.nStance == 1
                            && this.oOptions.sCounter != 'record'
                        ){
                            if( this.oPlayer.oAnimation.is('hurt') ){
                                this.oRecord.bLock = true;
                            }
                        }
                        else if(
                            this.oPlayer.oAnimation.is('hurt')
                            || (
                                this.oRecord.isEnd()
                                && this.oOptions.sCounter == 'record'
                            )
                        ){
                            this.oRecord = null;
                        }
                    }

                    // Record Stance / Counter
                    if( this.oRecord && !this.oRecord.isEnd() ){
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
                step__Counter: function(bReverse, bForce){
                    let oStep = null;

                    // Counter
                    if(
                        this.oOptions.sCounter
                        && this.oPlayer.oAnimation.isEnd()
                        && !this.oPlayer.oStatus.bAerial
                        && (
                            this.oPlayer.oAnimation.is('hurt')
                            || this.oPlayer.oAnimation.sType == 'recovery'
                        )
                        && (
                            this.oOptions.sCounter != 'record'
                            || this.oOptions.aRecord
                        )
                    ){
                        if( this.oOptions.sCounter == 'record' ){
                            oStep = this.startPlayingRecord();
                        }
                        else {
                            oStep = {
                                sType: 'uReturn',
                                uValue: []
                            };

                            this.oCounter[ this.oOptions.sCounter ].forEach( (oManip, nIndex) => {
                                const nFrame = TimerEngine.nFrames - nIndex - 1,
                                    oManipButtons = {};
                                
                                let bDirection = false;
                                for( let sBtn in oManip ){
                                    bDirection || ( bDirection = BattleInputBuffer.oMapDirection.aNormal.indexOf(sBtn) != -1 );
                                    oManipButtons[sBtn] = nFrame;
                                }
                                bDirection || ( oManipButtons.NT = nFrame );
    
                                oStep.uValue.push( {
                                    nFrame: nFrame,
                                    nDirection: this.getDirection(bReverse, oManipButtons),
                                    oButtons: oManipButtons,
                                    bReverse: bReverse
                                } );
                            } );
                        }
                    }

                    return oStep;
                },
                step__Guard: function(bReverse, bForce){
                    let oStep = null;

                    // Guard
                        // After 1st hit
                    if ( this.oOptions.nGuard == 1 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'hit' ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: { DB: TimerEngine.nFrames }
                        };
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Only 1st hit
                    else if( this.oOptions.nGuard == 2 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'guard' ){
                        oStep = {};
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Reflect
                    else if ( this.oOptions.nGuard == 4 && this.oPlayer.oAnimation.sType == 'guard' ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: { D: TimerEngine.nFrames, NT: TimerEngine.nFrames }
                        };
                    }
                        // Guard others
                    else if(
                        this.oOptions.nGuard
                        && (
                            this.oPlayer.oAnimation.isEnd()
                            || this.oPlayer.oAnimation.is('movement')
                        )
                    ){
                        // Check HitBox
                        const aOpponentEntity = BattleEntity.get().filter( oEntity => {
                            return oEntity.oCheck && oEntity.oCheck.bHit && !oEntity.isDead() && (oEntity.oParent || oEntity).sId != this.oPlayer.sId;
                        } );

                        let bHitBox = false;
                        for( let nIndex = 0; nIndex < aOpponentEntity.length; nIndex++ ){
                            const oEntity = aOpponentEntity[nIndex];
                            if(
                                oEntity.sType != 'character'
                                || ( oEntity.oAnimation.oFrame && oEntity.oAnimation.oFrame.aHitBox )
                            ){
                                bHitBox = true;
                                break;
                            }
                        }

                        if( bHitBox ){
                            switch(this.oOptions.nGuard){
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
                step__Reversal: function(bReverse, bForce){
                    let oStep = null;

                    // Reversal
                    if( this.oOptions.nReversal && this.oPlayer.oAnimation.sType == 'down' ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nReversal;
                        oStep = {
                            sType: 'oButtons',
                            uValue: { [aConfig[this.oOptions.nReversal]]: TimerEngine.nFrames }
                        };
                    }

                    return oStep;
                },
                step__TechThrow: function(bReverse, bForce){
                    let oStep = null;

                    // Tech throw
                    if( this.oOptions.bTechThrow && this.oPlayer.oAnimation.sName == 'hit_D' ){
                        oStep = {
                            sType: 'oButtons',
                            uValue: { D: TimerEngine.nFrames, NT: TimerEngine.nFrames }
                        };
                    }

                    return oStep;
                },
                step__Stance: function(bReverse, bForce){
                    let oStep = null;

                    // Stance
                    if( this.oOptions.nStance == 1 && this.oOptions.aRecord ){
                        oStep = this.startPlayingRecord();
                    }
                    else if( this.oOptions.nStance ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nStance;
                        oStep = {
                            sType: 'oButtons',
                            uValue: { [aConfig[this.oOptions.nStance]]: TimerEngine.nFrames }
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