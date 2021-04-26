/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

    this.oController = null;

    this.oCurrentMenu = null;
    this.oMenu = {};
    this.bMenu = false;
    this.bRestart = false;
}

Object.assign(
    TrainingScene, {

        oHelper: {
            aBattle: [
                {
                    aButton: ['START'],
                    sText: 'Open menu'
                },
                {
                    aButton: ['UP', 'START'],
                    sText: 'Restart'
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
                init: function(){
                    BattleScene.prototype.init.call(
                        this,
                        {
                            sContextClass: '--training',
                            aController: GAME.oScene.oTransverseData.MNU__aController
                        }
                    );

                    this.nFrameCreated = GAME.oTimer.nFrames;
                    this.oTraining = new TrainingEngine(this);

                    const aController = GAME.oScene.oTransverseData.MNU__aController.reduce(
                        (aAccu, oCtrl) => {
                            return oCtrl ? [...aAccu, oCtrl] : aAccu;
                        }, []
                    );
                    GameHelper.set( aController, TrainingScene.oHelper.aBattle );

                    this.oTraining.trigger('onInit');
                },
                update: function(){
                    this.addNewController();

                    GAME.oScene.oTransverseData.MNU__aController.forEach( oController => {
                        oController && oController.ifPressedNow( {
                            START: () => {
                                if( oController.isPressed('UP') ){
                                    this.oTraining.restart();
                                } else {
                                    this.oController = oController;
                                    this.oTraining.toggle();
                                }
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
                    BattleScene.prototype.destroy.call(this);
                    this.oTraining.destroy();
                    GameHelper.destroy();
                    return {
                        MNU__nIndex: 1
                    };
                },

                addNewController: function(){
                    const aOldController = GAME.oScene.oTransverseData.MNU__aController.reduce(
                        (aAccu, oCtrl) => {
                            return oCtrl ? [...aAccu, oCtrl.sId] : aAccu;
                        }, []
                    );

                    if( aOldController.length != GAME.oScene.oTransverseData.MNU__aController.length ){
                        for( let sController in GAME.oInput.oController ){
                            const oController = GAME.oInput.getController(sController);
                            if( aOldController.indexOf(sController) == -1 && this.nFrameCreated < oController.nFrameChange ){
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    if( !oPlayer.oInputBuffer.oController ){
                                        oPlayer.oInputBuffer.init(oController);
                                        GAME.oScene.oTransverseData.MNU__aController[nIndex] = oController;
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