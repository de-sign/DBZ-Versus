/* ----- BattleInputSourceBuffer - Dummy ----- */
function BattleInputSourceBufferDummy(oPlayer, oOpponent, oOptions){
    this.oPlayer = null;
    this.oOpponent = null;

    this.oOptions = null;
    this.oLastButtons = {};
    this.oCounter = {};
    this.nFrameGuard = 0;

    BattleInputSourceBuffer.apply(this, arguments);
}

Object.assign(
    BattleInputSourceBufferDummy, {

        oButtons: {
            nStance: [null, 'UP', 'UF', 'UB'],
            nReversal: [null, 'FW', 'BW']
        },
        nDurationGuard: 30,

        prototype: Object.assign(
            Object.create(BattleInputSourceBuffer.prototype), {
                constructor: BattleInputSourceBufferDummy,
                init: function(oPlayer, oOpponent, oOptions) {
                    this.oPlayer = oPlayer;
                    this.oOpponent = oOpponent;
                    this.oOptions = oOptions;

                    this.oPlayer.oData.oCommands.aOffense.forEach( oCommand => {
                        this.oCounter[oCommand.sCod] || ( this.oCounter[oCommand.sCod] = oCommand.oManipulation.aButtons );
                    } );
                },
                update: function(bReverse, bForce){
                    let uReturn = null,
                        oButtons = { NT: TimerEngine.nFrames };

                    // Counter
                    if(
                        this.oOptions.sCounter
                        && this.oPlayer.oAnimation.isEnd()
                        && (
                            this.oPlayer.oAnimation.isHurt()
                            || this.oPlayer.oAnimation.sType == 'recovery'
                        )
                    ){
                        uReturn = [];
                        this.oCounter[ this.oOptions.sCounter ].forEach( (oManip, nIndex) => {
                            const nFrame = TimerEngine.nFrames - nIndex - 1,
                                oManipButtons = {};
                            
                            let bDirection = false;
                            for( let sBtn in oManip ){
                                bDirection || ( bDirection = BattleInputBuffer.oMapDirection.aNormal.indexOf(sBtn) != -1 );
                                oManipButtons[sBtn] = nFrame;
                            }
                            bDirection || ( oManipButtons.NT = nFrame );

                            uReturn.push( {
                                nFrame: nFrame,
                                nDirection: this.getDirection(bReverse, oManipButtons),
                                oButtons: oManipButtons,
                                bReverse: bReverse
                            } );
                        } );
                    }
                    // Guard
                        // After 1st hit
                    else if ( this.oOptions.nGuard == 1 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'hit' ){
                        oButtons = { DB: TimerEngine.nFrames };
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Only 1st hit
                    else if( this.oOptions.nGuard == 2 && this.oPlayer.oAnimation.isEnd() && this.oPlayer.oAnimation.sType == 'guard' ){
                        this.nFrameGuard = TimerEngine.nFrames;
                    }
                        // Reflect
                    else if ( this.oOptions.nGuard == 4 && this.oPlayer.oAnimation.sType == 'guard' ){
                        oButtons = { B: TimerEngine.nFrames, C: TimerEngine.nFrames, NT: TimerEngine.nFrames };
                    }
                        // Guard others
                    else if(
                        this.oOptions.nGuard
                        && this.oOpponent.oAnimation.oFrame.aHitBox
                        && (
                            this.oPlayer.oAnimation.isEnd()
                            || this.oPlayer.oAnimation.isMovement()
                        )
                    ){
                        switch(this.oOptions.nGuard){
                            case 1:
                                if( TimerEngine.nFrames - this.nFrameGuard <= BattleInputSourceBufferDummy.nDurationGuard ){
                                    oButtons = { DB: TimerEngine.nFrames };
                                }
                                break;
                            case 2:
                                if( TimerEngine.nFrames - this.nFrameGuard > BattleInputSourceBufferDummy.nDurationGuard ){
                                    oButtons = { DB: TimerEngine.nFrames };
                                }
                                break;
                            case 3:
                            case 4:
                                oButtons = { DB: TimerEngine.nFrames };
                                break;
                            case 5:
                                if( Math.floor( Math.random() * 10 ) % 2 ){
                                    oButtons = { DB: TimerEngine.nFrames };
                                }
                                break;
                        }
                    }
                    // Reversal
                    else if( this.oOptions.nReversal && this.oPlayer.oAnimation.sType == 'down' ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nReversal;
                        oButtons = { [aConfig[this.oOptions.nReversal]]: TimerEngine.nFrames };
                    }
                    // Tech throw
                    else if( this.oOptions.bTechThrow && this.oPlayer.oAnimation.sName == 'hit_AB' ){
                        oButtons = { A: TimerEngine.nFrames, B: TimerEngine.nFrames, NT: TimerEngine.nFrames };
                    }
                    // Stance
                    else if( this.oOptions.nStance ){
                        const aConfig = BattleInputSourceBufferDummy.oButtons.nStance;
                        oButtons = { [aConfig[this.oOptions.nStance]]: TimerEngine.nFrames };
                    }

                    if( uReturn ){
                        const oLast = ( Array.isArray(uReturn) ? uReturn[ uReturn.length - 1 ] : uReturn );
                        this.oLastButtons = oLast.oButtons;
                    }
                    else if( bForce || this.compareButton(oButtons) ){
                        this.oLastButtons = oButtons;
                        uReturn = {
                            nFrame: TimerEngine.nFrames,
                            nDirection: this.getDirection(bReverse, oButtons),
                            oButtons: oButtons,
                            bReverse: bReverse
                        };
                    }
                    return uReturn;
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
                }
            }
        )
    }
);