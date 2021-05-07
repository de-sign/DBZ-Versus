function InitializeStage(){
	this.oContext = null;

    this.init();
}

Object.assign(
    InitializeStage.prototype, {

        init: function(){
            this.oContext = OutputManager.getElement('CTX__Stage');
            this.createStageList();
            this.createBGMList();
        },
        createStageList: function(){
            for( let sStage in GameData.oStage ){
                const oSprite = new OutputManager.OutputSprite( GameData.oStage[sStage].oPath.sPreview );
                oSprite.__oData = GameData.oStage[sStage];
                OutputManager.getElement('LAY__Stage_Stage').add( oSprite );
            }
            this.oContext.update();
        },
        createBGMList: function(){
            for( let sBGM in GameData.oBGM ){
                const oText = new OutputManager.OutputText( GameData.oBGM[sBGM].sName, { tag: 'h3' } );
                oText.__oData = GameData.oBGM[sBGM];
                OutputManager.getElement('LAY__Stage_BGM').add(oText);
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