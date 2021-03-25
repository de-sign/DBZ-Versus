function InitializeBattle(){
	this.oContext = null;
	this.oArea = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeBattle.prototype, {

        init: function(){
            this.oContext = GAME.oOutput.getElement('CTX__Battle');
            this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');

            this.getPattern();
            for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                const nPlayer = nIndex + 1;
                this.createPlayer(nPlayer);
                this.createHUDPlayer(nPlayer);
                this.createHUDBars(nPlayer);
            }

            this.oContext.update();
        },

        getPattern: function(){
            this.oPattern = {
                oHUD: GAME.oOutput.getElement('LAY__Battle_HUD_'),
                oPlayer: GAME.oOutput.getElement('LAY__Battle_Character_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },
        createPlayer: function(nPlayer){
            // Clone du LAYER
            let hLayer = this.oPattern.oPlayer.hElement.cloneNode(true);
            hLayer.id += nPlayer;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += nPlayer;
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );

            // Ajout dans l'arène
            this.oArea.add(new GAME.oOutput.OutputLayer(hLayer));
            this.oContext.update();
        },
        createHUDPlayer: function(nPlayer){
            // Clone du LAYER
            let hLayer = this.oPattern.oHUD.hElement.cloneNode(true);
            hLayer.id += nPlayer;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += nPlayer;
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );

            // Ajout dans le context
            this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Battle__HUDs');
            this.oContext.update();
        },

        createHUDBars: function(nPlayer){
            const oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_Bar_' + nPlayer);
            if( oLayer.aChildElement.length != GAME.oSettings.nLife ){
                const nMax = Math.max(oLayer.aChildElement.length, GAME.oSettings.nLife);
                for( let nIndex = 0; nIndex < nMax; nIndex++ ){
                    if( nIndex >= oLayer.aChildElement.length ){
                        oLayer.add( new GAME.oOutput.OutputText() );
                    }
                    else if( nIndex >= GAME.oSettings.nLife ){
                        oLayer.addTickUpdate(
                            (oElm => {
                                return () => oLayer.delete(oElm);
                            } )( oLayer.aChildElement[nIndex] )
                        );
                    }
                }
            }
        }
    }
);

InitializeScene.prototype.stepContext_Battle = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Battle' );
            new InitializeBattle();
            this.bStepEnd = true;
        }
    )
};