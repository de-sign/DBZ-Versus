// Menu
function GameHelper(){}

Object.assign(
    GameHelper,
    {
        nDelay: 180,
        
        oLayer: null,
        aKeyboard: null,
        aText: null,
        nKeyboard: -1,
        nFrame: 0,

		init: function(sLayer){
			this.oLayer = GAME.oOutput.getElement(sLayer);
            this.oWrapper = this.oLayer.aChildElement[0];
            this.oWrapper.enableAutoPositioning();
		},
		update: function(){
            if( this.switchKeyboard() ){
                this.aText.forEach( (oText, nIndex) => {
                    this.updateText(nIndex);
                } );
            }
            this.oLayer.update();
		},
		destroy: function(){
            this.nKeyboard = -1;
            this.hide();
		},

        set: function(aKeyboard, aText){
            this.nKeyboard = -1;
            this.aKeyboard = Array.isArray(aKeyboard) ? aKeyboard : [aKeyboard];
            this.aText = aText;

            this.oWrapper.clean();
            this.aText.forEach( oText => this.createText(oText) );
            this.update();
            this.show();
        },
        createText: function(oText){
            const oLayer = new GAME.oOutput.OutputLayer();
            oText.aButton.forEach( sButton => {
                oLayer.add( new GAME.oOutput.OutputText(sButton, { class: 'Helper__Button' }) );
            } );
            oLayer.add( new GAME.oOutput.OutputText(oText.sText) );
            this.oWrapper.add(oLayer);
        },
        updateText: function(nIndex){
            const oLayer = this.oWrapper.aChildElement[nIndex],
                oText = this.aText[nIndex],
                oKeyboard = this.aKeyboard[ this.nKeyboard ];

            oText.aButton.forEach( (sButton, nButton) => {
                oLayer.aChildElement[nButton].setText(
                    oKeyboard.oButtons[sButton].sKey
                );
            } );
        },
        switchKeyboard: function(){
            let bSwitch = false;
            if( this.nKeyboard == -1 ){
                this.nKeyboard = 0;
                bSwitch = true;
            }
            else if( this.aKeyboard.length > 1 ){
                if(this.nFrame < this.nDelay){
                    this.nFrame++;
                } else {
                    this.nFrame = 0;
                    this.nKeyboard = this.nKeyboard == this.aKeyboard.length - 1 ? 0 : this.nKeyboard + 1;
                    bSwitch = true;
                }
            }
            return bSwitch;
        },

        show: function(){
            this.oLayer.hElement.classList.add('--show');
        },
        hide: function(){
            this.oLayer.hElement.classList.remove('--show');
        }
    }
);