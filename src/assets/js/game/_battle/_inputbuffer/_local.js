/* ----- BattleInputSourceBuffer - Local ----- */
function BattleInputSourceBufferLocal(oController){
    this.sType = 'local';
    this.oController = null;
    BattleInputSourceBuffer.apply(this, arguments);
}

Object.assign(
    BattleInputSourceBufferLocal, {

        oButtonsDirection: {
            UP: 3,
            DOWN: -3,
            LEFT: -1,
            RIGHT: 1
        },

        prototype: Object.assign(
            Object.create(BattleInputSourceBuffer.prototype), {
                constructor: BattleInputSourceBufferLocal,
                init: function(oController) {
                    this.oController = oController;
                },
                update: function(bReverse, bForce){
                    let oReturn = null;
                    if( this.oController.nFrameChange == TimerEngine.nFrames || bForce ){
                        const nDirection = this.getDirection();
                        oReturn = {
                            nFrame: TimerEngine.nFrames,
                            nDirection: nDirection,
                            oButtons: this.getButtonsPressed(nDirection, bReverse, bForce),
                            bReverse: bReverse
                        };
                    }
                    return oReturn;
                },

                getDirection: function(){
                    let nDirection = 5;
                    for (sBtn in BattleInputSourceBufferLocal.oButtonsDirection) {
                        if ( this.oController.oButtons[sBtn].bPressed ) {
                            nDirection += BattleInputSourceBufferLocal.oButtonsDirection[sBtn];
                        }
                    }
                    return nDirection;
                },
                getButtonsPressed: function(nDirection, bReverse, bForce){
                    const oBtns = {},
                        aFrameDir = [];

                    // Gestion BTN
                    for( let sBtn in this.oController.oButtons ){
                        if( BattleInputSourceBufferLocal.oButtonsDirection[sBtn] ){
                            aFrameDir.push( this.oController.oButtons[sBtn].nFrameChanged );
                        } else if( this.oController.oButtons[sBtn].bPressed ){
                            oBtns[sBtn] = this.oController.oButtons[sBtn].nFrameChanged;
                        }
                    }

                    // Gestion DIR
                    oBtns[ BattleInputBuffer.getDirection(nDirection, bReverse) ] = bForce ? TimerEngine.nFrames : Math.max.apply(Math, aFrameDir);

                    return oBtns;
                }
            }
        )
    }
);