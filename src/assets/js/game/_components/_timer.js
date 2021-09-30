// Animations
function GameTimer(){
    this.nTick = 0;
    this.nLastFreeze = 0;
    this.nFreeze = 0;
    this.nLength = 0;
}

Object.assign(
    GameTimer.prototype, {
        constructor: GameTimer,
        init: function(nLength, nDelay){
            this.nLength = nLength;
            this.reset();
            nDelay && ( this.nFreeze = nDelay );
        },
        update: function(){
            let bUpdate = true;
            if( this.nFreeze ){
                this.nFreeze--;
                bUpdate = false;
            } else {
                this.nTick++;
            }
            return bUpdate;
        },
        destroy: function(){},

        setFreeze: function(nFreeze){
            if( nFreeze ){
                this.nFreeze += nFreeze;
            } else {
                this.nLastFreeze = this.nFreeze;
                this.nFreeze = -1;
            }
        },
        unFreeze: function(){
            this.nFreeze = this.nLastFreeze;
        },
        reset: function(){
            this.nTick = 0;
            this.nFreeze = 0;
        },
        isEnd: function(){
            return !this.isFreeze() && this.nLength && this.nTick >= this.nLength;
        },
        isFreeze: function(){
            return this.nFreeze > 0;
        },
        isFirstTick: function(){
            return !this.isFreeze() && this.nTick == 1;
        }
    }
);