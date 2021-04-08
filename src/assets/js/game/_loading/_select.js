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
            this.createStageList();
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
                const oChar = GAME.oData.oCharacter[sChar],
                    oSprite = new GAME.oOutput.OutputSprite( oChar.oDefaultColor.oPath.sFace );
                oSprite.__oData = oChar;
                GAME.oOutput.getElement('LAY__Select_Character').add( oSprite );
            }
            this.oContext.update();
        },
        createStageList: function(){
            for( let sStage in GAME.oData.oStage ){
                const oSprite = new GAME.oOutput.OutputSprite(GAME.oSettings.oPath.oStage.sPreview + '/' + sStage + '.png' );
                oSprite.__oData = GAME.oData.oStage[sStage];
                GAME.oOutput.getElement('LAY__Select_Stage').add( oSprite );
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