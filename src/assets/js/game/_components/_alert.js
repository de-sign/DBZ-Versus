// Helper
function GameAlert(){}

Object.assign(
    GameAlert,
    {
        oLayer: null,
        oWrapper: null,
        aText: null,
        bContinue: false,

		init: function(){
			this.oLayer = OutputManager.getElement('LAY__Alert');
            this.oWrapper = this.oLayer.aChildElement[0];
            this.oWrapper.hElement.querySelector('.Alert__Close').addEventListener( 'click', () => {
                this.hide();
            }, false );
		},
		update: function(){ },
		destroy: function(){ },

        setText: function(aText){
            this.aText = Array.isArray(aText ) ? aText : [aText];
            this.oWrapper.clean();
            this.oWrapper.add( new OutputManager.OutputText(this.aText.join('\n'), { tag: 'pre' }) );
            this.oLayer.update();
        },

        show: function(aText, bContinue){
            this.setText(aText);
            this.bContinue = bContinue;
            TimerEngine.pause();
            this.oLayer.hElement.classList.add('--show');
        },
        hide: function(){
            this.oLayer.hElement.classList.remove('--show');
            if( this.bContinue ){
                TimerEngine.run();
            } else {
                location.reload();
            }
        }
    }
);