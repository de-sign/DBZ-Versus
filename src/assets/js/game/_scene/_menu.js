/* Menu */
function MenuScene(){
	this.oContext = null;
    this.oMenu = null;
    this.oController = null;
    this.nController = 0;
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

                    this.nController = ControllerManager.nController;

                    this.oMenu = new GameMenu('LAY__Menu', SceneManager.oTransverseData.MNU__nIndex || 0);

                    if( SceneManager.oTransverseData.MNU__Title ){
                        GameHelper.set(MenuScene.aHelper);
                        OutputManager.getChannel('CHN__BGM').play('ADO__Menu', false, true);
                    }
				},
				update: function(){
                    this[ SceneManager.oTransverseData.MNU__Title ? 'updateMenu' : 'updateTitle' ]();
				},
                destroy: function(){
                    GameHelper.destroy();
                    const aName = [ 'Versus', 'Online', null, 'Challenge', 'Training' ],
                        nIndex = this.oMenu.destroy()[0];

                    return {
                        MNU__nIndex: nIndex,
                        BTL__sType: aName[nIndex],
                        MNU__aController: [this.oController, null]
                    };
                },

                updateTitle: function(){
                    let bPress = false;
                    if( this.nController < ControllerManager.nController ){
                        bPress = true;
                    } else {
                        for( let sController in ControllerManager.oController ){
                            const oController = ControllerManager.getController(sController);
                            if( this.nFrameCreated < oController.nFrameChange ){
                                bPress = true;
                                break;
                            }
                        }
                    }

                    if( bPress ){
                        OutputManager.oAudio.resume();
                        OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                        OutputManager.getChannel('CHN__BGM').play('ADO__Menu', false, true);

                        SceneManager.oTransverseData.MNU__Title = true;
                        this.oContext.hElement.classList.add('--menu');

                        GameHelper.set(MenuScene.aHelper);
                    }
                },

                updateMenu: function(){
                    this.oController = null;
                    for( let sController in ControllerManager.oController ){
                        const oController = ControllerManager.getController(sController);
                        oController.ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                let sMenuSelected = this.oMenu.getSelected().sId;
                                OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                                switch( sMenuSelected ){
                                    case 'TXT__Menu_Local':
                                        SceneManager.change( new SideScene() );
                                        break;
                                    case 'TXT__Menu_Training':
                                        this.oController = oController;
                                        SceneManager.change( new SelectScene() );
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
                                if( oController.isPressed('LEFT') && oController.isPressed('RIGHT') ){
                                    SceneManager.change( new PreDevScene() );
                                }
                            }
                        } );
                    }

                    this.oMenu.update();
                    GameHelper.update();
                }
            }
        )
    }
);