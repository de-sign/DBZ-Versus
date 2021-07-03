// Helper
function GameHelper(){}

Object.assign(
    GameHelper,
    {
        nTimer: 180, 
        oLayer: null,
        oWrapper: null,
        aController: null,
        aText: null,
        nController: -1,
        oTimer: new GameTimer(),

		init: function(sLayer){
			this.oLayer = OutputManager.getElement(sLayer);
            this.oWrapper = this.oLayer.aChildElement[0];
            this.oWrapper.enableAutoPositioning();
            this.oTimer.init( GameHelper.nTimer );
		},
		update: function(){
            if( this.switchController() ){
                this.aText.forEach( (oText, nIndex) => {
                    this.updateText(nIndex);
                } );
            }
            this.oLayer.update();
		},
		destroy: function(){
            this.nController = -1;
            this.hide();
		},

        set: function(aText, aController){
            this.nController = -1;
            if( aController ){
                this.aController = Array.isArray(aController) ? aController : [aController];
            }
            this.setText(aText);
            this.show();
        },
        
        setText: function(aText){
            this.aText = aText;
            this.oWrapper.clean();
            this.aText.forEach( oText => this.createText(oText) );
            this.update();
        },
        addText: function(oText){
            this.aText.push(oText);
            this.createText(oText);
            this.update();
        },
        createText: function(oText){
            const oLayer = new OutputManager.OutputLayer();
            oText.aButton.forEach( sButton => {
                oLayer.add( new OutputManager.OutputText(sButton, { class: 'Helper__Button' }) );
            } );
            oLayer.add( new OutputManager.OutputText(oText.sText) );
            this.oWrapper.add(oLayer);
        },
        updateText: function(nIndex){
            const oLayer = this.oWrapper.aChildElement[nIndex],
                oText = this.aText[nIndex],
                oController = this.getController()[ this.nController ];

            oText.aButton.forEach( (sButton, nButton) => {
                oLayer.aChildElement[nButton].setText(
                    oController.oButtons[sButton].sText
                );
            } );
        },

        getController: function(){
            return Array.isArray(this.aController) ? this.aController : Object.values(ControllerManager.oController);
        },
        switchController: function(){
            let bSwitch = false;
            const aController = this.getController();
            if( this.nController == -1 ){
                this.nController = 0;
                bSwitch = true;
            }
            else if( aController.length > 1 ){
                this.oTimer.update(this);
                if( this.oTimer.isEnd() ){
                    this.oTimer.reset();
                    this.nController = this.nController == aController.length - 1 ? 0 : this.nController + 1;
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