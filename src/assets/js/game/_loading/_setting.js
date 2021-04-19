function InitializeSetting(){
	this.oLayer = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeSetting.prototype, {

        init: function(){
            this.oLayer = GAME.oOutput.getElement('LAY__Setting');

            this.getPattern();
            for( let sChannel in GAME.oOutput.oAudio.oChannel ){
                this.createChannel(sChannel);
            }
            this.addReturn();
        },
        
        getPattern: function(){
            this.oPattern = GAME.oOutput.getElement('LAY__Setting_Channel_');
            this.oPattern && this.oLayer.delete( this.oPattern );
        },
        createChannel: function(sChannel){
            // Clone du LAYER
            let hLayer = this.oPattern.hElement.cloneNode(true);
            hLayer.id += sChannel;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Setting__Channel_Name').innerHTML = sChannel.substring(3) + ' volume';

            // Ajout dans le context
            const oLayer = new GAME.oOutput.OutputLayer(hLayer);
            oLayer.__sChannel = sChannel;
            this.oLayer.add(oLayer, '.Setting__Output');
            this.oLayer.update();
        },
        addReturn: function(){
            this.oLayer.add(false, new GAME.oOutput.OutputText(document.getElementById('TXT__Setting_Return')));
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