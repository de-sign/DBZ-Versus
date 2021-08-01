/* ----- BattleMovement ----- */
function BattleMovement(nDelay, uMove, nLength, bReverse){
    GameTimer.call(this);
    
    this.aStep = [];
    this.oMove = null;
    this.bReverse = false;
    this.bEmpty = false;

    this.init(nDelay, uMove, nLength, bReverse);
}

Object.assign(
    BattleMovement,
    {
        empty: function(){
            const oMovement = new BattleMovement(-1, []);
            oMovement.bEmpty = true;
            return oMovement;
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleMovement,
                init: function(nDelay, uMove, nLength, bReverse){
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

                    this.bReverse = bReverse;

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