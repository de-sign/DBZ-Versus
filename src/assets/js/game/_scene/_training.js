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

                    this.oTraining = new BattleTraining( this.aPlayer );
                    this.oMenu = {
                        oPrimary: new GameMenu('LAY__Training_Menu_Primary')
                    };
                    this.oCurrentMenu = this.oMenu.oPrimary
                },
                update: function(){
                    this.oKeyboard.ifPressedNow( {
                        START: () => {
                            this.toogleMenu();
                        }
                    } );

                    if( this.bMenu ){
                        this.oKeyboard.ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                let oMenuSelected = this.oCurrentMenu.getSelected();
                                switch( oMenuSelected.sId ){
                                    case 'TXT__Training_Menu_Continue':
                                        this.toogleMenu();
                                        break;
                                    case 'TXT__Training_Menu_Quit':
                                        GAME.oScene.change( new MenuScene() );
                                        break;
                                }
                            },
                            // Gestion déplacement
                            UP: () => {
                                this.oCurrentMenu.prev();
                            },
                            DOWN: () => {
                                this.oCurrentMenu.next();
                            }
                        } );
                        this.oCurrentMenu.update();
                    } else {
                        BattleScene.prototype.update.call(this);
                        this.oTraining.update();
                    }
                },
                destroy: function(){
                    this.oContext.hElement.classList.remove('--menu');
                    this.oMenu.oPrimary.destroy();
                },

                toogleMenu: function(){
                    this.aPlayer.forEach( oPlayer => {
                        oPlayer.oAnimation[this.bMenu ? 'unFreeze' : 'setFreeze']();
                    } );
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList[this.bMenu ? 'add' : 'remove']('--menu');
                    } );
                    this.bMenu = !this.bMenu;
                }
            }
        )
    }
);