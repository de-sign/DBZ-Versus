function InitializeSettings(){
	this.oContext = null;
    this.oPattern = null;
    this.init();
}

Object.assign(
    InitializeSettings.prototype, {

        init: function(){
            this.oContext = GAME.oOutput.getElement('CTX__Setting');
            this.getPattern();
            for( let nPlayer = 0; nPlayer < GAME.oSettings.nPlayer; nPlayer++ ){
                this.createLayerPlayer(nPlayer + 1);
            }
            this.oContext.update();
        },

        getPattern: function(){
            this.oPattern = {
                oLayer: GAME.oOutput.getElement('LAY__Setting_Player_'),
                oButton: GAME.oOutput.getElement('LAY__Setting_Button_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oContext.delete( this.oPattern[sPattern] );
            }
        },

        createLayerPlayer: function(nPlayer){
            let oLayer = GAME.oOutput.getElement('LAY__Setting_Player_' + nPlayer);
            if( !oLayer && this.oPattern.oLayer ){

                // Clone du LAYER
                let hLayer = this.oPattern.oLayer.hElement.cloneNode(true);
                hLayer.id += nPlayer;
                hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += nPlayer;
                        hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                    }
                );
                hLayer.querySelector('.Setting__Player_Number').innerHTML += nPlayer;

                // Clone des BUTTON
                const oKeyboard = GAME.oInput.getController('IC_' + nPlayer);
                for( let sBtn in oKeyboard.oButtons ){
                    let hButton = this.oPattern.oButton.hElement.cloneNode(true);
                    hButton.classList.remove(GAME.oOutput.oConfig.class.created);
                    hButton.id += sBtn + '_' + nPlayer;
                    hButton.querySelector('.Setting__Button_Name').innerHTML = sBtn;

                    let hKey = hButton.querySelector('.Setting__Button_Key');
                    hKey.classList.remove(GAME.oOutput.oConfig.class.created);
                    hKey.innerHTML = oKeyboard.oButtons[sBtn].sKey;

                    hLayer.querySelector('.Setting__Buttons').appendChild(hButton);
                }

                // Ajout dans le context
                this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Setting__Players');
            }
        }
    }
);

InitializeScene.prototype.stepContext_Setting = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Settings' );
            new InitializeSettings();
            this.bStepEnd = true;
        }
    )
};