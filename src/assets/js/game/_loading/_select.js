function InitializeSelect(){
	this.oContext = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeSelect.prototype, {

        init: function(){
            this.oContext = GAME.oOutput.getElement('CTX__Select');

            this.getPattern();
            for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                this.createLayerPlayer(nIndex + 1);
            }
            this.createCharacterList();
        },
        
        getPattern: function(){
            this.oPattern = GAME.oOutput.getElement('LAY__Select_Player_');
            this.oPattern && this.oContext.delete( this.oPattern );
        },
        createLayerPlayer: function(nPlayer){
            // Clone du LAYER
            let hLayer = this.oPattern.hElement.cloneNode(true);
            hLayer.id += nPlayer;
            hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
            [].forEach.call(
                hLayer.querySelectorAll('.--change'),
                hElement => {
                    hElement.id += nPlayer;
                    hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                }
            );
            hLayer.querySelector('.Select__Player_Number').innerHTML += nPlayer;

            // Ajout dans le context
            this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Select__Players');
            this.oContext.update();
        },
        createCharacterList: function(){
            for( let sChar in GAME.oData.oCharacter ){
                const oChar = GAME.oData.oCharacter[sChar];
                if( oChar.bActive ){
                    const oDefaultColor = oChar[oChar.sDefaultColor],
                        oLayer = new GAME.oOutput.OutputLayer(),
                        oSprite = new GAME.oOutput.OutputSprite( oDefaultColor.oPath.sFace );
                    oLayer.__oData = oChar;
                    oLayer.add(oSprite);
                    GAME.oOutput.getElement('LAY__Select_Character').add(oLayer);
                }
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