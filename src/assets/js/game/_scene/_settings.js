/* Gestion Player */
function SettingPlayer(nPlayer, oScenePressed){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oMenu = null;
    
    this.oKeyboard = null;
    this.oScenePressed = null;
    this.oWaitingButton = null;

    this.bReady = nPlayer != 1;

    this.init(oScenePressed);
}

Object.assign(
    SettingPlayer.prototype, {
        init: function(oScenePressed) {
            this.oLayer = GAME.oOutput.getElement('LAY__Settings_Player_' + this.nPlayer);
            this.oKeyboard = GAME.oInput.getController('IC_' + this.nPlayer);
            this.oMenu = new GameMenu('LAY__Settings_Player_' + this.nPlayer, this.nPlayer == 1 ? 0 : -1);
            this.oScenePressed = oScenePressed;
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
                        this.bReady = false;
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
            oMenuSelected.aChildElement[0].setText( 'Press button ...' );
            this.oScenePressed.nFrames = -1;
        },
        updateWaitingButton: function(){
            if( this.oScenePressed.nFrames == GAME.oTimer.nFrames ) {
                const sNewBtn = this.oWaitingButton.hElement.querySelector('.Settings__Button_Name').innerHTML,
                    sLastBtn = this.oKeyboard.oKeyMap[this.oScenePressed.sKey],
                    oBtns = {
                        [sNewBtn]: this.oScenePressed.sKey
                    };
                    
                if( sNewBtn != sLastBtn ){
                    if( sLastBtn ){
                        GAME.oOutput.getElement('LAY__Settings_Button_' + sLastBtn + '_' + this.nPlayer).aChildElement[0].setText( this.oKeyboard.oButtons[sNewBtn].sKey );
                        oBtns[sLastBtn] = this.oKeyboard.oButtons[sNewBtn].sKey;
                    }
                    this.oKeyboard.updateButtons(oBtns);
                    GAME.oInput.updateController(this.oKeyboard);
                }
                    
                this.oWaitingButton.aChildElement[0].setText( this.oScenePressed.sKey );
                this.oWaitingButton = null;
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
}

Object.assign(
    SettingScene, {
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
                    for( let nPlayer = 0; nPlayer < GAME.oSettings.nPlayer; nPlayer++ ){
                        this.aPlayer.push( new SettingPlayer(nPlayer + 1, this.oLastPress) );
                    }
				},
				update: function(){
                    let bAllReady = true;
                    this.aPlayer.forEach( oPlayer => {
                        oPlayer.update();
                        bAllReady && ( bAllReady = oPlayer.bReady );
                    } );
                    bAllReady && GAME.oScene.change( new MenuScene() );
				},
                destroy: function(){
                    this.aPlayer.forEach( oPlayer => oPlayer.destroy() );
                    window.removeEventListener('keydown', this.oLastPress.fFunction, false);
                    return GAME.oScene.oLastData;
                }
            }
        )
    }
);