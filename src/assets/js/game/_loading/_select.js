function InitializeSelect(){
	this.oContext = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeSelect.prototype, {

        init: function(){
            this.oContext = OutputManager.getElement('CTX__Select');

            this.getPattern();
            for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                this.createLayerPlayer(nIndex + 1);
            }
            this.createCharacterList();
        },
        
        getPattern: function(){
            this.oPattern = OutputManager.getElement('LAY__Select_Player_');
            this.oPattern && this.oContext.delete( this.oPattern );
        },
        createLayerPlayer: function(nPlayer){
            // Clone du LAYER
            let hLayer = this.oPattern.hElement.cloneNode(true);
            hLayer.id += nPlayer;
            hLayer.classList.remove(OutputManager.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += nPlayer;
                    hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Select__Player_Number').innerHTML += nPlayer;

            // Ajout dans le context
            this.oContext.add(new OutputManager.OutputLayer(hLayer), '.Select__Players');
            this.oContext.update();
        },
        createCharacterList: function(){
            for( let sChar in GameData.oCharacter ){
                const oChar = GameData.oCharacter[sChar],
                    oDefaultColor = oChar[oChar.sDefaultColor],
                    oLayer = new OutputManager.OutputLayer(),
                    oSprite = new OutputManager.OutputSprite( oDefaultColor.oPath.sFace );
                oLayer.__oData = oChar;
                oLayer.add(oSprite);
                OutputManager.getElement('LAY__Select_Character').add(oLayer);
            }
            this.oContext.update();
        }
    }
);

InitializeScene.prototype.stepContext_Select = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Select' );
            new InitializeSelect();
            this.bStepEnd = true;
        }
    )
};