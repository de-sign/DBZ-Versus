/* ----- Display ----- */
function BattleDisplay(oScene, oOptions){
    this.oScene = null;
    this.oModule = {};

    this.init(oScene, oOptions);
}

Object.assign(
    BattleDisplay, {
        aModule: [
            'HUD',
            'Text',
            'Timer'
        ],

        prototype: {
            constructor: BattleDisplay,
            init: function(oScene, oOptions){
                this.oScene = oScene;

                BattleDisplay.aModule.forEach( sModule => {
                    this.oModule['o' + sModule] = window['BattleDisplay' + sModule] ?
                        new window['BattleDisplay' + sModule](this.oScene, oOptions) :
                        null;
                } );
            },
            update: function(){
                for( let sModule in this.oModule ){
                    const oModule = this.oModule[sModule];
                    oModule && oModule.update();
                }
            },
            destroy: function(){
                for( let sModule in this.oModule ){
                    const oModule = this.oModule[sModule];
                    oModule && oModule.destroy();
                }
            },
            
            // Text
            show: function(){
                const oText = this.oModule.oText;
                oText && oText.add.apply(oText, arguments);
            },
            hide: function(){
                this.oModule.oText && this.oModule.oText.destroy();
            },

            // Timer
            start: function(){
                this.oModule.oTimer && this.oModule.oTimer.start();
            },
            pause: function(){
                this.oModule.oTimer && this.oModule.oTimer.pause();
            }
        }
    }
);