/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

    this.oController = null;
    this.oData = null;

    this.oCurrentMenu = null;
    this.oMenu = {};
    this.bMenu = false;
}

Object.assign(
    TrainingScene, {

        oHelper: {
            aBattle: [
                {
                    aButton: ['START'],
                    sText: 'Open menu'
                }
            ],
            aMenu: [
                {
                    aButton: ['UP', 'DOWN'],
                    sText: 'Move'
                },
                {
                    aButton: ['A'],
                    sText: 'Enter / Change / Validate'
                },
                {
                    aButton: ['LEFT', 'RIGHT'],
                    sText: 'Change'
                },
                {
                    aButton: ['B'],
                    sText: 'Return'
                },
                {
                    aButton: ['START'],
                    sText: 'Close menu'
                }
            ]
        },

        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: TrainingScene,
                init: function(oLastData){
                    BattleScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sContextClass: '--training',
                            aController: oLastData.aController
                        }
                    );

                    this.nFrameCreated = GAME.oTimer.nFrames;
                    this.oTraining = new TrainingEngine(this);
                    this.oData = oLastData;

                    const aController = oLastData.aController.reduce(
                        (aAccu, oCtrl) => {
                            return oCtrl ? [...aAccu, oCtrl] : aAccu;
                        }, []
                    );
                    GameHelper.set( aController, TrainingScene.oHelper.aBattle );
                },
                update: function(){
                    this.addNewController();

                    this.oData.aController.forEach( oController => {
                        oController && oController.ifPressedNow( {
                            START: () => {
                                this.oController = oController;
                                this.oTraining.toggle();
                            }
                        } );
                    } );

                    if( !this.oTraining.isOpen() ){
                        BattleScene.prototype.update.call(this);
                    }
                    this.oTraining.update();
                    GameHelper.update();
                },
                destroy: function(){
                    this.oTraining.destroy();
                    GameHelper.destroy();
                    return {
                        nLastIndexMenu: 1
                    };
                },

                addNewController: function(){
                    const aOldController = this.oData.aController.reduce(
                        (aAccu, oCtrl) => {
                            return oCtrl ? [...aAccu, oCtrl.sId] : aAccu;
                        }, []
                    );

                    if( aOldController.length != this.oData.aController.length ){
                        for( let sController in GAME.oInput.oController ){
                            const oController = GAME.oInput.getController(sController);
                            if( aOldController.indexOf(sController) == -1 && this.nFrameCreated < oController.nFrameChange ){
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    if( !oPlayer.oInputBuffer.oController ){
                                        oPlayer.oInputBuffer.init(oController);
                                        this.oData.aController[nIndex] = oController;
                                    }
                                } );
                                GameHelper.aController.push(oController);
                            }
                        }
                    }
                }
            }
        )
    }
);