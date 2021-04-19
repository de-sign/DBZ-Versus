function InitializeInput(){
    this.init();
}

Object.assign(
    InitializeInput, {

        oPattern: null,

        getPattern: function(){
            this.oPattern = {
                oLayer: GAME.oOutput.getElement('LAY__Input_Controller_'),
                oButton: GAME.oOutput.getElement('LAY__Input_Button_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },

        createController: function(sController){
                
            const oContext = GAME.oOutput.getElement('CTX__Input'),
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
            hLayer.querySelector('.Input__Controller_Sprite').src = GAME.oSettings.oPath.oController.sRoot + '/' + oController.sType + '.png';
            hLayer.querySelector('.Input__Controller_Number').innerHTML = oController.sName;

            // Clone des BUTTON
            for( let sBtn in oController.oButtons ){
                let hButton = this.oPattern.oButton.hElement.cloneNode(true);
                hButton.classList.remove(GAME.oOutput.oConfig.class.created);
                hButton.id += sController + '_' + sBtn;
                hButton.querySelector('.Input__Button_Name').innerHTML = sBtn;

                let hKey = hButton.querySelector('.Input__Button_Key');
                hKey.classList.remove(GAME.oOutput.oConfig.class.created);
                hKey.innerHTML = oController.oButtons[sBtn].sText;

                hLayer.querySelector('.Input__Buttons').appendChild(hButton);
            }

            // Ajout dans le context
            oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Input__Controllers');
            oContext.update();
        },

        prototype: {
            init: function(){
                InitializeInput.getPattern();
                for( let sController in ControllerManager.oController ){
                    InitializeInput.createController(sController);
                }
            }
        }
    }
);

InitializeScene.prototype.stepContext_Input = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Input' );
            new InitializeInput();
            this.bStepEnd = true;
        }
    )
};