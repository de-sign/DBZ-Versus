/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

    this.oCurrentMenu = null;
    this.oMenu = {};
    this.bMenu = false;
}

Object.assign(
    TrainingScene, {
        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: TrainingScene,
                init: function(oLastData){
                    this.oKeyboard = GAME.oInput.getController('IC_1');
                    BattleScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sContextClass: '--training',
                            aKeyboard: [
                                this.oKeyboard,
                                GAME.oInput.getController('IC_2')
                            ],
                            bDeath: false
                        }
                    );

                    this.oTraining = new TrainingEngine(this);
                },
                update: function(){
                    this.oKeyboard.ifPressedNow( {
                        START: () => {
                            this.oTraining.toggle();
                        }
                    } );

                    if( !this.oTraining.isOpen() ){
                        BattleScene.prototype.update.call(this);
                    }
                    this.oTraining.update();
                },
                destroy: function(){
                    this.oTraining.destroy();
                }
            }
        )
    }
);