/* TrainingScene */
function TrainingScene() {
    BattleScene.call(this);

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
                    this.oKeyboard = GAME.oInput.getController('IC_1');
                    BattleScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sContextClass: '--training',
                            aKeyboard: [
                                this.oKeyboard,
                                GAME.oInput.getController('IC_2')
                            ]
                        }
                    );

                    this.oTraining = new TrainingEngine(this);

                    GameHelper.set( this.oKeyboard, TrainingScene.oHelper.aBattle );
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
                    GameHelper.update();
                },
                destroy: function(){
                    this.oTraining.destroy();
                    GameHelper.destroy();
                    return {
                        nLastIndexMenu: 1
                    };
                }
            }
        )
    }
);