function InitializeInput(){
    this.init();
}

Object.assign(
    InitializeInput, {

        oPattern: null,

        getPattern: function(){
            this.oPattern = {
                oLayer: OutputManager.getElement('LAY__Input_Controller_'),
                oLayout: OutputManager.getElement('LAY__Input_Layout_'),
                oButton: OutputManager.getElement('LAY__Input_Button_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },

        createController: function(sController){
                
            const oContext = OutputManager.getElement('CTX__Input'),
                oController = ControllerManager.getController(sController);

            // Clone du LAYER
            const hLayer = this.oPattern.oLayer.hElement.cloneNode(true);
            hLayer.id += sController;
            hLayer.classList.remove(OutputManager.oConfig.class.created);
            hLayer.querySelector('.Input__Controller_Sprite').src = GameSettings.oPath.oController.sRoot + '/' + oController.sType + '.png';
            hLayer.querySelector('.Input__Controller_Number').innerHTML = oController.sName;

            // Clone du LAYOUT
            for( let sLayout in GameSettings.oController.oText ){

                const oLayout = GameSettings.oController.oText[sLayout],
                    sId = sController + '_' + sLayout,
                    hLayout = this.oPattern.oLayout.hElement.cloneNode(true);

                hLayout.id += sId;
                hLayout.classList.remove(OutputManager.oConfig.class.created);
                [].forEach.call(
                    hLayout.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += sId;
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );
                hLayer.appendChild(hLayout);
                
                // Clone des BUTTONS
                oLayout.aButtons.forEach( oCfg => {
                    const hButton = this.oPattern.oButton.hElement.cloneNode(true);
                    hButton.classList.remove(OutputManager.oConfig.class.created);
                    hButton.id += sId + '_' + oCfg.sCod;
                    hButton.querySelector('.Input__Button_Name').innerHTML = oCfg.sText;
                    hButton.__oData = {
                        sLayout: sLayout,
                        sButton: oCfg.sCod
                    };
                    
                    const hKey = hButton.querySelector('.Input__Button_Key');
                    hKey.classList.remove(OutputManager.oConfig.class.created);
                    hKey.innerHTML = oController.getButton(oCfg.sCod, sLayout).sText;
                    
                    hLayout.querySelector('.Input__Buttons').appendChild(hButton);
                } );
            }
                
            // Ajout dans le context
            oContext.add(new OutputManager.OutputLayer(hLayer), '.Input__Controllers');
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