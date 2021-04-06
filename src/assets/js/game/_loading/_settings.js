function InitializeSettings(){
    this.init();
}

Object.assign(
    InitializeSettings, {

        oPattern: null,

        getPattern: function(){
            this.oPattern = {
                oLayer: GAME.oOutput.getElement('LAY__Settings_Controller_'),
                oButton: GAME.oOutput.getElement('LAY__Settings_Button_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },

        createController: function(sController){
                
            const oContext = GAME.oOutput.getElement('CTX__Settings'),
                oController = GAME.oInput.getController(sController);

            // Clone du LAYER
            let hLayer = this.oPattern.oLayer.hElement.cloneNode(true);
            hLayer.id += sController;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += sController;
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Settings__Controller_Sprite').src = GAME.oSettings.oPath.oController.sRoot + '/' + oController.sType + '.png';
            hLayer.querySelector('.Settings__Controller_Number').innerHTML = oController.sName;

            // Clone des BUTTON
            for( let sBtn in oController.oButtons ){
                let hButton = this.oPattern.oButton.hElement.cloneNode(true);
                hButton.classList.remove(GAME.oOutput.oConfig.class.created);
                hButton.id += sController + '_' + sBtn;
                hButton.querySelector('.Settings__Button_Name').innerHTML = sBtn;

                let hKey = hButton.querySelector('.Settings__Button_Key');
                hKey.classList.remove(GAME.oOutput.oConfig.class.created);
                hKey.innerHTML = oController.oButtons[sBtn].sKey;

                hLayer.querySelector('.Settings__Buttons').appendChild(hButton);
            }

            // Ajout dans le context
            oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Settings__Controllers');
            oContext.update();
        },

        prototype: {
            init: function(){
                InitializeSettings.getPattern();
                for( let sController in ControllerManager.oController ){
                    InitializeSettings.createController(sController);
                }
            }
        }
    }
);

InitializeScene.prototype.stepContext_Settings = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Settings' );
            new InitializeSettings();
            this.bStepEnd = true;
        }
    )
};