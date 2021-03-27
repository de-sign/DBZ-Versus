/* Gestion Player */
function SettingPlayer(nPlayer, oKeyboard, oPressed){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oMenu = null;
    
    this.oKeyboard = null;
    this.oPressed = null;
    this.oWaitingButton = null;

    this.bReady = nPlayer != 1;

    this.init(oKeyboard, oPressed);
}

Object.assign(
    SettingPlayer.prototype, {
        init: function(oKeyboard, oPressed) {
            this.oLayer = GAME.oOutput.getElement('LAY__Settings_Player_' + this.nPlayer);
            this.oMenu = new GameMenu('LAY__Settings_Player_' + this.nPlayer, this.nPlayer == 1 ? 0 : -1);
            this.oKeyboard = oKeyboard;
            this.oPressed = oPressed;
        },
        update: function() {

            // Gestion assignation
            if( this.oWaitingButton ){
                this.updateWaitingButton();
            } else {
                this.oKeyboard.ifPressedNow( {
                    // Gestion validation
                    A: () => {
                        let oMenuSelected = this.oMenu.getSelected();
                        switch( oMenuSelected.sId ){
                            case 'TXT__Settings_Return_' + this.nPlayer:
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
                GAME.oOutput.getElement('TXT__Settings_Return_' + this.nPlayer).setText( this.bReady ? 'Waiting ...' : 'Return' );
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
                    sLastBtn = this.oKeyboard.oKeyMap[this.oPressed.sKey],
                    oBtns = {
                        [sNewBtn]: this.oPressed.sKey
                    };
                    
                if( sNewBtn != sLastBtn ){
                    if( sLastBtn ){
                        GAME.oOutput.getElement('LAY__Settings_Button_' + sLastBtn + '_' + this.nPlayer).aChildElement[0].setText( this.oKeyboard.oButtons[sNewBtn].sKey );
                        oBtns[sLastBtn] = this.oKeyboard.oButtons[sNewBtn].sKey;
                    }
                    this.oKeyboard.updateButtons(oBtns);
                    GAME.oInput.updateController(this.oKeyboard);
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

    this.aPlayer = [];
    this.aKeyboard = [];
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

                    // Players init
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        const nPlayer = nIndex + 1,
                            oKeyboard = GAME.oInput.getController('IC_' + nPlayer);
                        this.aKeyboard.push( oKeyboard );
                        this.aPlayer.push( new SettingPlayer(nPlayer, oKeyboard, this.oLastPress) );
                    }
                    
                    GameHelper.set( this.aKeyboard, SettingScene.oHelper.aMenu );
				},
				update: function(){
                    let bAllReady = true;
                    this.aPlayer.forEach( oPlayer => {
                        oPlayer.update();
                        bAllReady && ( bAllReady = oPlayer.bReady );
                    } );
                    bAllReady && GAME.oScene.change( new MenuScene() );
                    GameHelper.update();
				},
                destroy: function(){
                    this.aPlayer.forEach( oPlayer => oPlayer.destroy() );
                    window.removeEventListener('keydown', this.oLastPress.fFunction, false);
                    return GAME.oScene.oLastData;
                    GameHelper.destroy();
                }
            }
        )
    }
);