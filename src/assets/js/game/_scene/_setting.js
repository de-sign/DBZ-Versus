function SettingMenu(nIndex){
    this.oLayer = {};
    this.oMenu = null;
    this.nRound = 0;

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
                for( let sChannel in OutputManager.oAudio.oChannel ){
                    this.oLayer[sChannel] = OutputManager.getElement('LAY__Setting_Channel_' + sChannel);
                }
                this.oLayer.nRound = OutputManager.getElement('LAY__Setting_Round');
                
                this.nRound = StoreEngine.get('BTL__Rounds') || GameSettings.oRound.nDefault;

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
                for( let sController in ControllerManager.oController ){
                    const oController = ControllerManager.getController(sController);
                    oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            sSFX = 'ADO__Validate';
                            SceneManager.oCurrent.oController = oController;
                            const oSelected = this.oMenu.getSelected(),
                                sMenuSelected = oSelected.sId;

                            switch( sMenuSelected ){
                                case 'TXT__Setting_Return':
                                    SceneManager.change( new MenuScene() );
                                    sSFX = 'ADO__Cancel';
                                    break;
                                case 'LAY__Setting_Round':
                                    this.change('round', 1) && (sSFX = 'ADO__Validate');
                                    break;
                                default:
                                    if( oSelected.__sLayout ){
                                        SceneManager.change( new InputScene() );
                                    } else {
                                        this.change('channel', 1) && (sSFX = 'ADO__Validate');
                                    }
                                    break;
                            }
                        },
                        B: () => {
                            sSFX = 'ADO__Cancel';
                            SceneManager.oCurrent.oController = oController;
                            SceneManager.change( new MenuScene() );
                        },
                        // Gestion changement
                        LEFT: () => {
                            const sMenuSelected = this.oMenu.getSelected().sId;
                            this.change(sMenuSelected == 'LAY__Setting_Round' ? 'round' : 'channel', -1) && (sSFX = 'ADO__Validate');
                        },
                        RIGHT: () => {
                            const sMenuSelected = this.oMenu.getSelected().sId;
                            this.change(sMenuSelected == 'LAY__Setting_Round' ? 'round' : 'channel', 1) && (sSFX = 'ADO__Validate');
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
                sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);
            },
            display: function(){
                for( let sLayer in this.oLayer ){
                    this.oLayer[sLayer].aChildElement[0].setText(
                        sLayer == 'nRound' ?
                            this.nRound :
                            OutputManager.getChannel(sLayer).getStepGain()
                    );
                }
            },
            change: function(sType, nChange){
                let sChange = false;

                switch( sType ){
                    case 'channel':
                        const sChannel = this.oMenu.getSelected().__sChannel,
                            oChannel = OutputManager.getChannel(sChannel);

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
                        break;
                    
                    case 'round':
                        this.nRound += nChange;
                        if( this.nRound > GameSettings.oRound.nMax ){
                            this.nRound = 1;
                        }
                        else if( this.nRound < 1 ){
                            this.nRound = GameSettings.oRound.nMax;
                        }
                        StoreEngine.update('BTL__Rounds', this.nRound);
                        sChange = true;
                        break;
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
                    Scene.prototype.init.call(this, 'CTX__Setting', 'IPT__Menu');
                    this.oMenu = new SettingMenu(SceneManager.oTransverseData.STG__nIndex || 0);
				},
				update: function(){
                    this.oMenu.update();
				},
                destroy: function(){
                    return {
                        STG__sLayout: this.oMenu.oMenu.getSelected().__sLayout,
                        STG__nIndex: this.oMenu.destroy(),
                        STG__oController: this.oController
                    };
                }
            }
        )
    }
);