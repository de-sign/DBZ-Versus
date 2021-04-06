function InitializeSide(){
	this.oContext = null;

    this.init();
}

Object.assign(
    InitializeSide,
    {
        
        oPattern: null,
        getPattern: function(){
            this.oPattern = {
                oPlayer: GAME.oOutput.getElement('LAY__Side_Player_'),
                oController: GAME.oOutput.getElement('LAY__Side_Controller_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },
        createController: function(sController){

            const oContext = GAME.oOutput.getElement('CTX__Side'),
                oController = GAME.oInput.getController(sController);

            // Clone du TEXT
            let hLayer = this.oPattern.oController.hElement.cloneNode(true);
            hLayer.id += sController;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += sController;
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Side__Controller_Sprite').src = GAME.oSettings.oPath.oController.sRoot + '/' + oController.sType + '.png';
            hLayer.querySelector('.Side__Controller_Name').innerHTML = oController.sName;

            GAME.oOutput.getElement('LAY__Side_Empty').add(new GAME.oOutput.OutputLayer(hLayer));
            oContext.update();
        },

        prototype: {
            init: function(){
                this.oContext = GAME.oOutput.getElement('CTX__Side');

                InitializeSide.getPattern();
                for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                    this.createLayerPlayer(nIndex + 1);
                }
                for( let sController in ControllerManager.oController ){
                    InitializeSide.createController(sController);
                }
            },
            
            createLayerPlayer: function(nPlayer){
                // Clone du LAYER
                let hLayer = InitializeSide.oPattern.oPlayer.hElement.cloneNode(true);
                hLayer.id += nPlayer;
                hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += nPlayer;
                        hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                    }
                );
                hLayer.querySelector('.Side__Player_Number').innerHTML += nPlayer;

                // Ajout dans le context
                this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Side__Players');
                this.oContext.update();
            }
        }
    }
);

InitializeScene.prototype.stepContext_Side = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Side' );
            new InitializeSide();
            this.bStepEnd = true;
        }
    )
};