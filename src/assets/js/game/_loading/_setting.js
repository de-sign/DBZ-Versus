function InitializeSetting(){
	this.oLayer = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeSetting.prototype, {

        init: function(){
            this.oLayer = OutputManager.getElement('LAY__Setting');

            this.getPattern();
            for( let sChannel in OutputManager.oAudio.oChannel ){
                this.createChannel(sChannel);
            }
            this.addReturn();
        },
        
        getPattern: function(){
            this.oPattern = OutputManager.getElement('LAY__Setting_Channel_');
            this.oPattern && this.oLayer.delete( this.oPattern );
        },
        createChannel: function(sChannel){
            // Clone du LAYER
            let hLayer = this.oPattern.hElement.cloneNode(true);
            hLayer.id += sChannel;
            hLayer.classList.remove(OutputManager.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Setting__Channel_Name').innerHTML = sChannel.substring(5) + ' volume';

            // Ajout dans le context
            const oLayer = new OutputManager.OutputLayer(hLayer);
            oLayer.__sChannel = sChannel;
            this.oLayer.add(oLayer, '.Setting__Output');
            this.oLayer.update();
        },
        addReturn: function(){
            this.oLayer.add(false, new OutputManager.OutputText(document.getElementById('TXT__Setting_Return')));
        }
    }
);

InitializeScene.prototype.stepContext_Setting = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Setting' );
            new InitializeSetting();
            this.bStepEnd = true;
        }
    )
};