/* Gestion Controller */
function SettingController(oController, oPressed, bReady){
    this.oLayer = null;
    this.oMenu = null;
    
    this.oController = null;
    this.oPressed = null;
    this.oWaitingButton = null;

    this.bReady = false;

    this.init(oController, oPressed, bReady);
}

Object.assign(
    SettingController.prototype, {
        init: function(oController, oPressed, bReady) {
            this.oController = oController;
            this.oPressed = oPressed;
            this.bReady = bReady;
            this.oLayer = GAME.oOutput.getElement('LAY__Settings_Controller_' + oController.sId);
            this.oMenu = new GameMenu('LAY__Settings_Controller_' + oController.sId, bReady ? -1 : 0);
        },
        update: function() {

            // Gestion assignation
            if( this.oWaitingButton ){
                this.updateWaitingButton();
            } else {
                this.oController.ifPressedNow( {
                    // Gestion validation
                    A: () => {
                        let oMenuSelected = this.oMenu.getSelected();
                        switch( oMenuSelected.sId ){
                            case 'TXT__Settings_Return_' + this.oController.sId:
                                this.bReady = true;
                                break;
                            default:
                                this.setWaitingButton(oMenuSelected);
                                this.bReady = false;
                                break;
                        }
                    },
                    B: () => {
                        this.oMenu.select(-1);
                        this.bReady = true;
                    },
                    // Gestion déplacement
                    UP: () => {
                        this.oMenu.prev();
                        this.bReady = false;
                    },
                    DOWN: () => {
                        this.oMenu.next();
                        this.bReady = false;
                    }
                } );

                this.oMenu.update();
                GAME.oOutput.getElement('TXT__Settings_Return_' + this.oController.sId)
                    .setText( this.bReady ? 'Ready !' : 'Return' );
            }
        },
        destroy: function() {
            this.oMenu.destroy();
        },

        setWaitingButton: function(oMenuSelected){
            this.oWaitingButton = oMenuSelected;
            oMenuSelected.aChildElement[0].setText('Press key ...');
            this.oPressed.nFrames = -1;
            GameHelper.set(GameHelper.aKeyboard, SettingScene.oHelper.aWaiting);
        },
        updateWaitingButton: function(){
            if( this.oPressed.nFrames == GAME.oTimer.nFrames ) {
                const sNewBtn = this.oWaitingButton.hElement.querySelector('.Settings__Button_Name').innerHTML,
                    sLastBtn = this.oController.oKeyMap[this.oPressed.sKey],
                    oBtns = {
                        [sNewBtn]: this.oPressed.sKey
                    };
                    
                if( sNewBtn != sLastBtn ){
                    if( sLastBtn ){
                        GAME.oOutput.getElement('LAY__Settings_Button_' + this.oController.sId + '_' + sLastBtn)
                            .aChildElement[0].setText( this.oController.oButtons[sNewBtn].sKey );
                        oBtns[sLastBtn] = this.oController.oButtons[sNewBtn].sKey;
                    }
                    this.oController.updateButtons(oBtns);
                    GAME.oInput.updateController(this.oController);
                }
                    
                this.oWaitingButton.aChildElement[0].setText( this.oPressed.sKey );
                this.oWaitingButton = null;
                GameHelper.set(GameHelper.aKeyboard, SettingScene.oHelper.aMenu);
            }
        }
    }
);

/* Setting */
function SettingScene(){
    this.oLastPress = {
        nFrames: -1,
        sKey: null,
        fFunction: null
    };

    this.aController = [];
}

Object.assign(
    SettingScene, {

        oHelper: {
            aWaiting: [
                {
                    aButton: [],
                    sText: 'Press any key to assign to button'
                }
            ],
            aMenu: [
                {
                    aButton: ['UP', 'DOWN'],
                    sText: 'Move'
                },
                {
                    aButton: ['A'],
                    sText: 'Validate'
                },
                {
                    aButton: ['B'],
                    sText: 'Return'
                }
            ]
        },

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SettingScene,
				init: function(){
					GAME.oOutput.useContext('CTX__Settings');

                    // Gestion Buttons
                    this.oLastPress.fFunction = (oEvent) => {
                        this.oLastPress.sKey = oEvent.key.toUpperCase();
                        this.oLastPress.nFrames = GAME.oTimer.nFrames + 1;
                    };
                    window.addEventListener('keydown', this.oLastPress.fFunction, false);

                    // Controller init
                    for( let sController in ControllerManager.oController ){
                        const oController = GAME.oInput.getController(sController);
                        this.aController.push( new SettingController(oController, this.oLastPress, sController != 'IC_1') );
                    }
                    
                    GameHelper.set( Object.values(ControllerManager.oController), SettingScene.oHelper.aMenu );
				},
				update: function(){
                    let bAllReady = true;
                    this.aController.forEach( oController => {
                        oController.update();
                        bAllReady && ( bAllReady = oController.bReady );
                    } );
                    GameHelper.update();
                    bAllReady && GAME.oScene.change( new MenuScene() );
				},
                destroy: function(){
                    this.aController.forEach( oController => oController.destroy() );
                    window.removeEventListener('keydown', this.oLastPress.fFunction, false);
                    GameHelper.destroy();
                    return GAME.oScene.oLastData;
                }
            }
        )
    }
);