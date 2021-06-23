function InitializeBattle(){
	this.oContext = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeBattle.prototype,
    {

        init: function(){
            this.oContext = OutputManager.getElement('CTX__Battle');

            this.getPattern();
            BattleEntity.init('LAY__Battle_Entity_');
            for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                this.createHUDPlayer(nIndex + 1);
            }
        },

        getPattern: function(){
            this.oPattern = {
                oHUD: OutputManager.getElement('LAY__Battle_HUD_')
            };

            for( let sPattern in this.oPattern ){
                this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
            }
        },
        createHUDPlayer: function(nPlayer){
            // Clone du LAYER
            let hLayer = this.oPattern.oHUD.hElement.cloneNode(true);
            hLayer.id += nPlayer;
            hLayer.classList.remove(OutputManager.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += nPlayer;
                    hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                }
            );

            // Ajout dans le context
            this.oContext.add(new OutputManager.OutputLayer(hLayer), '.Battle__HUDs');
            this.oContext.update();

            // Ajout des ROUNDS
            const oRound = OutputManager.getElement('LAY__Battle_HUD_Round_' + nPlayer);
            for( let nRound = 0; nRound < GameSettings.oRound.nMax; nRound++ ){
                oRound.add( new OutputManager.OutputText() );
            }
            this.oContext.update();
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