function InitializeStage(){
	this.oContext = null;

    this.init();
}

Object.assign(
    InitializeStage.prototype, {

        init: function(){
            this.oContext = GAME.oOutput.getElement('CTX__Stage');
            this.createStageList();
            this.createBGMList();
        },
        createStageList: function(){
            for( let sStage in GAME.oData.oStage ){
                const oSprite = new GAME.oOutput.OutputSprite( GAME.oData.oStage[sStage].oPath.sPreview );
                oSprite.__oData = GAME.oData.oStage[sStage];
                GAME.oOutput.getElement('LAY__Stage_Stage').add( oSprite );
            }
            this.oContext.update();
        },
        createBGMList: function(){
            for( let sBGM in GAME.oData.oBGM ){
                const oText = new GAME.oOutput.OutputText( GAME.oData.oBGM[sBGM].sName, { tag: 'h3' } );
                oText.__oData = GAME.oData.oBGM[sBGM];
                GAME.oOutput.getElement('LAY__Stage_BGM').add(oText);
            }
            this.oContext.update();
            
        }
    }
);

InitializeScene.prototype.stepContext_Stage = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Stage' );
            new InitializeStage();
            this.bStepEnd = true;
        }
    )
};