/* ----- BattleDisplayTimer ----- */
function BattleDisplayTimer(oScene, oOptions){
    this.dStart = null;
    this.dFreeze = null;
    this.nDeltaFreeze = 0;
    this.nTimer = -1;

    this.init(oScene, oOptions);
}

Object.assign(
    BattleDisplayTimer.prototype,
    {
        init: function(oScene, oOptions){
            this.nTimer = oOptions.nTimer;
        },
        update: function(){
            let sTimer = '00';
            if( this.nTimer != -1 ){
                const nEllapsed = ( (this.dFreeze || TimerEngine.dUpdate) - this.dStart - this.nDeltaFreeze ) / 1000;
                sTimer = this.nTimer - Math.floor(nEllapsed);
                sTimer = (sTimer < 0 ? 0 : sTimer).toString().padStart(2, '0');
            }
            OutputManager.getElement('TXT__Battle_Timer').setText(sTimer);
        },
        destroy: function(){
        },
        
        start: function(){
            if( !this.dStart ){
                this.dStart = TimerEngine.dUpdate;
            }
            else if( this.dFreeze ){
                this.nDeltaFreeze += TimerEngine.dUpdate - this.dFreeze;
                this.dFreeze = null;
            }
        },
        pause: function(){
            if( this.dStart && !this.dFreeze ){
                this.dFreeze = TimerEngine.dUpdate;
            }
        },
        isEnd: function(){
            return this.nTimer == -1 || !this.dStart ?
                false :
                TimerEngine.dUpdate - this.dStart - this.nDeltaFreeze > this.nTimer * 1000;
        }
    }
);