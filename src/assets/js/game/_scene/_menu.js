/* Menu */
function MenuScene(){
	this.oContext = null;
    this.oMenu = null;
}

Object.assign(
    MenuScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: MenuScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Menu');

                    this.oMenu = new GameMenu('LAY__Menu', GAME.oScene.oTransverseData.MNU__nIndex || 0);
                    GameHelper.set(
                        Object.values(ControllerManager.oController),
                        [ {
                            aButton: ['UP', 'DOWN'],
                            sText: 'Move'
                        },
                        {
                            aButton: ['A'],
                            sText: 'Validate'
                        } ]
                    );

                    GAME.oOutput.getChannel('CHN__BGM').play('ADO__Menu', false, true);
				},
				update: function(){
                    this.addNewController();

                    for( let sController in GAME.oInput.oController ){
                        const oController = GAME.oInput.getController(sController);
                        oController.ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                let sMenuSelected = this.oMenu.getSelected().sId;
                                GAME.oOutput.getChannel('CHN__SFX').play('ADO__Validate');
                                switch( sMenuSelected ){
                                    case 'TXT__Menu_Versus':
                                        GAME.oScene.change( new SideScene() );
                                        break;
                                    case 'TXT__Menu_Training':
                                        GAME.oScene.change( new SideScene() );
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
                },

                addNewController: function(){
                    if( GameHelper.aController.length < GAME.oInput.nController ){
                        const aOldController = GameHelper.aController.reduce(
                            (aAccu, oCtrl) => {
                                return [...aAccu, oCtrl.sId]
                            }, []
                        );
                        
                        for( let sController in GAME.oInput.oController ){
                            if( aOldController.indexOf(sController) == -1 ){
                                GameHelper.aController.push( GAME.oInput.getController(sController) );
                            }
                        }
                    }
                },
            }
        )
    }
);