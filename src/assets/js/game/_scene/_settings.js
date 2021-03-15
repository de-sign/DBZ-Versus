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
            this.oLayer = GAME.oOutput.getElement('LAY__Setting_Player_' + this.nPlayer);
            this.oKeyboard = GAME.oInput.getController('IC_' + this.nPlayer);
            this.oMenu = new GameMenu('LAY__Setting_Player_' + this.nPlayer, this.nPlayer == 1 ? 0 : -1);
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
                            case 'TXT__Setting_Return_' + this.nPlayer:
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
                GAME.oOutput.getElement('TXT__Setting_Return_' + this.nPlayer).setText( this.bReady ? 'Waiting ...' : 'Return' );
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
                const sNewBtn = this.oWaitingButton.hElement.querySelector('.Setting__Button_Name').innerHTML,
                    sLastBtn = this.oKeyboard.oKeyMap[this.oScenePressed.sKey],
                    oBtns = {
                        [sNewBtn]: this.oScenePressed.sKey
                    };
                    
                if( sNewBtn != sLastBtn ){
                    if( sLastBtn ){
                        GAME.oOutput.getElement('LAY__Setting_Button_' + sLastBtn + '_' + this.nPlayer).aChildElement[0].setText( this.oKeyboard.oButtons[sNewBtn].sKey );
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
	this.oContext = null;
    this.oPattern = null;

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
					GAME.oOutput.useContext('CTX__Setting');
					this.oContext = GAME.oOutput.getElement('CTX__Setting');

                    // Gestion Buttons
                    this.oLastPress.fFunction = (oEvent) => {
                        this.oLastPress.sKey = oEvent.key.toUpperCase();
                        this.oLastPress.nFrames = GAME.oTimer.nFrames + 1;
                    };
                    window.addEventListener('keydown', this.oLastPress.fFunction, false);

                    // Players init
                    this.getPattern();
                    for( let nPlayer = 0; nPlayer < GAME.oData.oSettings.nPlayer; nPlayer++ ){
                        this.createLayerPlayer(nPlayer + 1);
                        this.oContext.addTickUpdate( () => {
                            this.aPlayer.push( new SettingPlayer(nPlayer + 1, this.oLastPress) );
                        } );
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
                },

                getPattern: function(){
                    this.oPattern = {
                        oLayer: GAME.oOutput.getElement('LAY__Setting_Player_'),
                        oButton: GAME.oOutput.getElement('LAY__Setting_Button_')
                    };

                    for( let sPattern in this.oPattern ){
                        this.oPattern[sPattern] && this.oContext.remove( this.oPattern[sPattern] );
                    }
                },
                createLayerPlayer: function(nPlayer){
                    let oLayer = GAME.oOutput.getElement('LAY__Setting_Player_' + nPlayer);
                    if( !oLayer && this.oPattern.oLayer ){

                        // Clone du LAYER
                        let hLayer = this.oPattern.oLayer.hElement.cloneNode(true);
                        hLayer.id += nPlayer;
                        hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += nPlayer;
                                hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                            }
                        );
                        hLayer.querySelector('.Setting__Player_Number').innerHTML += nPlayer;

                        // Clone des BUTTON
                        const oKeyboard = GAME.oInput.getController('IC_' + nPlayer);
                        for( let sBtn in oKeyboard.oButtons ){
                            let hButton = this.oPattern.oButton.hElement.cloneNode(true);
                            hButton.classList.remove(GAME.oOutput.oConfig.class.created);
                            hButton.id += sBtn + '_' + nPlayer;
                            hButton.querySelector('.Setting__Button_Name').innerHTML = sBtn;

                            let hKey = hButton.querySelector('.Setting__Button_Key');
                            hKey.classList.remove(GAME.oOutput.oConfig.class.created);
                            hKey.innerHTML = oKeyboard.oButtons[sBtn].sKey;

                            hLayer.querySelector('.Setting__Buttons').appendChild(hButton);
                        }

                        // Ajout dans le context
                        this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Setting__Players');
                    }
                }
            }
        )
    }
);