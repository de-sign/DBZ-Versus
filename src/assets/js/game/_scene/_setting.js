function SettingMenu(nIndex){
    this.oLayer = {};
    this.oMenu = null;

    this.init(nIndex);
}

Object.assign(
    SettingMenu, {

        aHelper: [
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
            }
        ],

        prototype: {
            constructor: SettingMenu,
            init: function(nIndex){
                this.oMenu = new GameMenu('LAY__Setting', nIndex);
                for( let sChannel in GAME.oOutput.oAudio.oChannel ){
                    this.oLayer[sChannel] = GAME.oOutput.getElement('LAY__Setting_Channel_' + sChannel);
                }

                GameHelper.set(SettingMenu.aHelper);
            },
            update: function(){
                this.navigate();
                this.display();
                this.oMenu.update();
                GameHelper.update();
            },
            destroy: function(){
                GameHelper.destroy();
                return this.oMenu.destroy()[0];
            },

            navigate: function(){
                let sSFX = null;
                for( let sController in GAME.oInput.oController ){
                    const oController = GAME.oInput.getController(sController);
                    oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            sSFX = 'ADO__Validate';
                            GAME.oScene.oCurrent.oController = oController;
                            const sMenuSelected = this.oMenu.getSelected().sId;
                            switch( sMenuSelected ){
                                case 'TXT__Setting_Input':
                                    GAME.oScene.change( new InputScene() );
                                    break;
                                case 'TXT__Setting_Return':
                                    GAME.oScene.change( new MenuScene() );
                                    sSFX = 'ADO__Cancel';
                                    break;
                                default:
                                    this.change(1);
                                    break;
                            }
                        },
                        B: () => {
                            sSFX = 'ADO__Cancel';
                            GAME.oScene.oCurrent.oController = oController;
                            GAME.oScene.change( new MenuScene() );
                        },
                        // Gestion changement
                        LEFT: () => {
                            this.change(-1) && (sSFX = 'ADO__Validate');
                        },
                        RIGHT: () => {
                            this.change(1) && (sSFX = 'ADO__Validate');
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
                sSFX && GAME.oOutput.getChannel('CHN__SFX').play(sSFX);
            },
            display: function(){
                for( let sChannel in this.oLayer ){
                    this.oLayer[sChannel].aChildElement[0].setText( GAME.oOutput.getChannel(sChannel).getStepGain() );
                }
            },
            change: function(nChange){
                let sChange = false;
                const sChannel = this.oMenu.getSelected().__sChannel,
                    oChannel = GAME.oOutput.getChannel(sChannel);

                if( oChannel ){
                    let nStep = oChannel.getStepGain() + nChange;
                    
                    if( nStep > OutputChannel.nStepGain ){
                        nStep = 0;
                    } else if( nStep < 0 ){
                        nStep = OutputChannel.nStepGain;
                    }
                    oChannel.setGainAtStep(nStep);
                    sChange = true;
                }

                return sChange;
            }
        }
    }
)

/* Setting */
function SettingScene(){
	this.oContext = null;

    this.oController = null;
    this.oMenu = null;
}

Object.assign(
    SettingScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SettingScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Setting');
                    this.oMenu = new SettingMenu(GAME.oScene.oTransverseData.STG__nIndex || 0);
				},
				update: function(){
                    this.oMenu.update();
				},
                destroy: function(){
                    return {
                        STG__nIndex: this.oMenu.destroy(),
                        STG__oController: this.oController
                    };
                }
            }
        )
    }
);