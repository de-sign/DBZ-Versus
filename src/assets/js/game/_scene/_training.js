/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

    this.oController = null;

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
                            aSourceBuffer: [
                                new BattleInputSourceBufferLocal( SceneManager.oTransverseData.MNU__aController[0] ),
                                null
                            ],
                            sAnimation: 'move_5',
                            nTimer: -1,
                            aRound: [0, 0]
                        }
                    );

                    GameHelper.set(TrainingScene.oHelper.aBattle, SceneManager.oTransverseData.MNU__aController.filter( oController => oController ) );

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
                }
            }
        )
    }
);