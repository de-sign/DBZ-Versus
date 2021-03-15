/* Menu */
function MenuScene(){
	this.oContext = null;
	this.aTextMenu = null;
    this.oKeyboard = null;
    
    this.oMenu = null;
}

Object.assign(
    MenuScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: MenuScene,
				init: function( oLastData ){
					GAME.oOutput.useContext('CTX__Menu');
					this.oContext = GAME.oOutput.getElement('CTX__Menu');
                    this.oKeyboard = GAME.oInput.getController('IC_1');

                    this.oMenu = new GameMenu('LAY__Menu', oLastData ? oLastData.nLastIndexMenu : 0);
				},
				update: function(){

                    this.oKeyboard.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let sMenuSelected = this.oMenu.getSelected().sId;
                            switch( sMenuSelected ){
                                case 'TXT__Menu_Versus':
                                    GAME.oScene.change( new SelectScene() );
                                    break;
                                case 'TXT__Menu_Training':
                                    GAME.oScene.change( new SelectScene() );
                                    break;
                                case 'TXT__Menu_Setting':
                                    GAME.oScene.change( new SettingScene() );
                                    break;
                            }
                        },
                        // Gestion déplacement
                        UP: () => {
                            this.oMenu.prev();
                        },
                        DOWN: () => {
                            this.oMenu.next();
                        }
                    } );

                    this.oMenu.update();
				},
                destroy: function(){
                    return {
                        nLastIndexMenu: this.oMenu.destroy()[0]
                    };
                }
            }
        )
    }
);