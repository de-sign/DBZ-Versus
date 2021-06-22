/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

    this.oController = null;

    this.oCurrentMenu = null;
    this.oMenu = {};
    this.bMenu = false;

    this.fCheckNewController = oController => {
        if( !this.allPlayerActive() && SceneManager.oTransverseData.MNU__aController.indexOf(oController) == -1 ){
            this.oContext.addTickUpdate( () => {
                const nIndex = SceneManager.oTransverseData.MNU__aController.indexOf(null);
                SceneManager.oTransverseData.MNU__aController[nIndex] = oController;
                this.aPlayer[nIndex].oInputBuffer.init(oController);
                GameHelper.aController.push(oController);
            } );
        }
    };
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
                    aButton: ['DOWN', 'START'],
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
                            aController: SceneManager.oTransverseData.MNU__aController,
                            sAnimation: 'move_5',
                            nTimer: -1,
                            aRound: [0, 0]
                        }
                    );

                    GameHelper.set(TrainingScene.oHelper.aBattle, SceneManager.oTransverseData.MNU__aController.filter( oController => oController ) );
                    
                    ControllerManager.on('create addEvent', this.fCheckNewController);

                    this.oTraining = new TrainingEngine(this);
                    this.oTraining.trigger('onInit');
                },
                update: function(){
                    SceneManager.oTransverseData.MNU__aController.forEach( oController => {
                        oController && oController.ifPressedNow( {
                            START: () => {
                                if( oController.isPressed('DOWN') && !this.oTraining.isOpen() ){
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
                    ControllerManager.off('create addEvent', this.fCheckNewController);
                    GameHelper.destroy();
                    return {
                        MNU__nIndex: 1
                    };
                },

                endBattle: function(oEndGame){
                    if( oEndGame.bEnd ){
                        this.aPlayer.forEach( oPlayer => {
                            if( oPlayer.oAnimation.sType == 'animation' ){
                                oPlayer.setStance('launch_2', true);
                            }
                        } )
                    }
                },

                allPlayerActive: function(){
                    let bAllActive = true;
                    SceneManager.oTransverseData.MNU__aController.forEach( oController => {
                        !oController && ( bAllActive = false );
                    } );
                    return bAllActive;
                }
            }
        )
    }
);