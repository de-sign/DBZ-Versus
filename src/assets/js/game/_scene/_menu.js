/* Menu */
function MenuScene(){
	this.oContext = null;
    this.oMenu = null;
}

Object.assign(
    MenuScene, {

        aHelper: 
        [ {
            aButton: ['UP', 'DOWN'],
            sText: 'Move'
        },
        {
            aButton: ['A'],
            sText: 'Validate'
        } ],

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: MenuScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Menu');

                    this.oMenu = new GameMenu('LAY__Menu', SceneManager.oTransverseData.MNU__nIndex || 0);
                    GameHelper.set(MenuScene.aHelper);

                    OutputManager.getChannel('CHN__BGM').play('ADO__Menu', false, true);
				},
				update: function(){
                    for( let sController in ControllerManager.oController ){
                        const oController = ControllerManager.getController(sController);
                        oController.ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                let sMenuSelected = this.oMenu.getSelected().sId;
                                OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                                switch( sMenuSelected ){
                                    case 'TXT__Menu_Versus':
                                        SceneManager.change( new SideScene() );
                                        break;
                                    case 'TXT__Menu_Training':
                                        SceneManager.change( new SideScene() );
                                        break;
                                    case 'TXT__Menu_Setting':
                                        SceneManager.change( new SettingScene() );
                                        break;
                                }
                            },
                            // Gestion déplacement
                            UP: () => {
                                this.oMenu.prev();
                            },
                            DOWN: () => {
                                this.oMenu.next();
                            },
                            START: () => {
                                SceneManager.change( new PreDevScene() );
                            }
                        } );
                    }

                    this.oMenu.update();
                    GameHelper.update();
				},
                destroy: function(){
                    GameHelper.destroy();
                    const aName = [ 'Versus', 'Training' ],
                        nIndex = this.oMenu.destroy()[0];

                    return {
                        MNU__nIndex: nIndex,
                        BTL__sType: aName[nIndex]
                    };
                }
            }
        )
    }
);