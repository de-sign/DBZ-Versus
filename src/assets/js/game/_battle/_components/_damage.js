/* ----- BattleDamage ----- */
function BattleDamage(){
    this.nScaling = 0;
    this.nHitting = 0;
    this.nDamage = 0;
    this.nFrameStart = 0;
    this.aHistory = [];

    this.init();
}

Object.assign(
    BattleDamage.prototype, {
        init: function(){
            // this.reset();
        },
        update: function(oDamage){
            let nDamage = 0,
                nScaling = Math.max(oDamage.nMinimumReduce, 100 - this.nScaling);

            if( oDamage.nDamage ){
                nDamage = Math.floor(oDamage.nDamage * Math.max(oDamage.nMinimumReduce, 100 - this.nScaling) / 100);
                this.nHitting++;
                this.nDamage += nDamage;
            }
            
            this.aHistory.push( {
                nDamage,
                nScaling,
                nBase: oDamage.nDamage || 0
            } );

            if( this.firstHit() ){
                this.nFrameStart = TimerEngine.nFrames;
                this.nScaling += oDamage.nScaling;
            } else {
                this.nScaling += oDamage.nProration;
            }
            
            return nDamage;
        },

        reset: function(){
            this.nScaling = 0;
            this.nHitting = 0;
            this.nDamage = 0;
            this.nFrameStart = 0;
            this.aHistory = [];
        },
        firstHit: function(){
            return this.nHitting <= 1;
        },
        takeDamage: function(){
            return !!this.aHistory.length;
        }
    }
);