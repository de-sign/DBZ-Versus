/* ----- BattleMovement ----- */
function BattleMovement(oMove, bReverse){
    GameTimer.call(this);
    
    this.aStep = [];
    this.oMove = null;
    this.bReverse = false;
    this.bEmpty = false;
    this.bForward = false;
    this.bUpward = false;

    this.init(oMove, bReverse);
}

Object.assign(
    BattleMovement,
    {
        empty: function(nLength){
            return new BattleMovement( {
                bEmpty: true,
                aStep: [],
                nDelay: nLength - 1,
                nLength: 1
            } );
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleMovement,
                init: function(oMove, bReverse){
                    GameTimer.prototype.init.call(this, oMove.nLength, oMove.nDelay);
                    this.bEmpty = oMove.bEmpty;
                    this.aStep = oMove.aStep;
                    this.bForward = oMove.bForward;
                    this.bUpward = oMove.bUpward;
                    this.bReverse = bReverse;
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

/* ----- BattleMovement ----- */
function BattleMovementManager(){
    GameTimer.call(this);

    this.aCurrent = [];
    this.aParallel = [];
}

Object.assign(
    BattleMovementManager.prototype, {
        update: function(){
            this.clean();
            this.forEach( oMove => oMove.update() );
        },

        create: function(oMove, bReverse){
            return oMove.bEmpty ?
                BattleMovement.empty(oMove.nLength) :
                new BattleMovement( oMove, bReverse );
        },
        forEach: function(fCallback, bForce){
            ['aCurrent', 'aParallel'].forEach( sProp => {
                const oMove = this[sProp][0];
                if(oMove || bForce){
                    fCallback(oMove, sProp, this[sProp]);
                }
            } );
        },
        setFreeze: function(nFreeze){
            this.forEach( oMove => oMove.setFreeze(nFreeze) );
        },
        unFreeze: function(){
            this.forEach( oMove => oMove.unFreeze() );
        },

        clean: function(){
            this.forEach( (oMove, sProp, aProp) => {
                if( oMove.isEnd() ){
                    aProp.shift();
                }
            } );
        },
        reset: function(){
            this.aCurrent = [];
            this.aParallel = [];
        },

        // Current
        set: function(oMove, bReverse){
            this.aCurrent = [];
            return this.after(oMove, bReverse);
        },
        before: function(oMove, bReverse){
            let oReturn = null;
            if( oMove ){
                if( oMove.bEmpty && this.aCurrent[0] && this.aCurrent[0].bEmpty ){
                    oReturn = this.aCurrent[0] = this.create(oMove, bReverse);
                } else {
                    oReturn = this.create(oMove, bReverse);
                    this.aCurrent.unshift( oReturn );
                }
            }
            return oReturn;
        },
        after: function(oMove, bReverse){
            let oReturn = null;
            if( oMove ){
                oReturn = this.create(oMove, bReverse);
                this.aCurrent.push( oReturn );
            }
            return oReturn;
        },

        // Parallel
        parallel: function(oMove, bReverse){
            let oReturn = null;
            if( oMove ){
                oReturn = this.create(oMove, bReverse);
                this.aParallel.push( oReturn );
            }
            return oReturn;
        }
    }
);