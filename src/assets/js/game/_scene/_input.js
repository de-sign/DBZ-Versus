/* Gestion Controller */
function InputController(oController, oPressed, bReady){
    this.oLayer = null;
    this.oMenu = null;
    
    this.oController = null;
    this.oPressed = null;
    this.oWaitingButton = null;

    this.bReady = false;

    this.init(oController, oPressed, bReady);
}

Object.assign(
    InputController.prototype, {
        init: function(oController, oPressed, bReady) {
            this.oController = oController;
            this.oPressed = oPressed;
            this.bReady = bReady;
            this.oLayer = OutputManager.getElement('LAY__Input_Controller_' + oController.sId);
            this.oMenu = new GameMenu('LAY__Input_Controller_' + oController.sId, bReady ? -1 : 0);
        },
        update: function() {

            const bConnected = this.oController.sType == 'keyboard' || this.oController.oGamepad;
            if( bConnected ){
                let sSFX = null;
                // Gestion assignation
                if( this.oWaitingButton ){
                    this.updateWaitingButton() && (sSFX = 'ADO__Validate');
                } else {
                    this.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                case 'TXT__Input_Reset_' + this.oController.sId:
                                    sSFX = 'ADO__Cancel';
                                    this.reset();
                                    this.bReady = false;
                                    break;
                                case 'TXT__Input_Return_' + this.oController.sId:
                                    sSFX = 'ADO__Cancel';
                                    this.bReady = true;
                                    break;
                                default:
                                    sSFX = 'ADO__Validate';
                                    this.setWaitingButton(oMenuSelected);
                                    this.bReady = false;
                                    break;
                            }
                        },
                        B: () => {
                            sSFX = 'ADO__Cancel';
                            this.oMenu.select(-1);
                            this.bReady = true;
                        },
                        C: () => {
                            sSFX = 'ADO__Cancel';
                            this.reset();
                            this.bReady = false;
                        },
                        // Gestion d??placement
                        UP: () => {
                            this.oMenu.prev();
                            this.bReady = false;
                        },
                        DOWN: () => {
                            this.oMenu.next();
                            this.bReady = false;
                        }
                    } );
                }
                sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);
            }
            else {
                this.oMenu.select(-1);
                this.oWaitingButton = null;
                this.bReady = true;
            }

            this.oMenu.update();
            OutputManager.getElement('TXT__Input_Return_' + this.oController.sId)
                .setText(
                    bConnected ? 
                        ( this.bReady ? 'Ready&nbsp;!' : 'Return' ) :
                        'Disconnected&nbsp;!'
                );
        },
        destroy: function() {
            this.oMenu.destroy();
        },

        setWaitingButton: function(oMenuSelected){
            this.oWaitingButton = oMenuSelected;
            this.oWaitingButton.nFramesChange = TimerEngine.nFrames;
            if( this.oController.sType == 'keyboard' ){
                this.oPressed.nFrames = -1;
                oMenuSelected.aChildElement[0].setText('Press key ...');
            } else {
                oMenuSelected.aChildElement[0].setText('Press button ...');
            }
        },
        updateWaitingButton: function(){
            let oBtn = null;
            switch( this.oController.sType ){
                case 'keyboard':
                    if( this.oPressed.nFrames == TimerEngine.nFrames ) {
                        oBtn = {
                            sKey: this.oPressed.oEvent.code.toUpperCase(),
                            sText: this.oPressed.oEvent.key.toUpperCase()
                        };
                    }
                    break;
                    
                case 'gamepad':
                    if( this.oController.nFrameChange > this.oWaitingButton.nFramesChange ) {
                        const aButtons = this.oController.getAnyButtonsPressed();
                        oBtn = aButtons.length ? aButtons[0] : null;
                    }
                    break;
            }

            if( oBtn ){
                const sNewBtn = this.oWaitingButton.hElement.querySelector('.Input__Button_Name').innerHTML,
                    sLastBtn = this.oController.oKeyMap[oBtn.sKey],
                    oBtns = {
                        [sNewBtn]: oBtn
                    };
                    
                if( sNewBtn != sLastBtn ){
                    if( sLastBtn ){
                        OutputManager.getElement('LAY__Input_Button_' + this.oController.sId + '_' + sLastBtn)
                            .aChildElement[0].setText( this.oController.oButtons[sNewBtn].sText );
                        oBtns[sLastBtn] = this.oController.oButtons[sNewBtn];
                    }
                }
                    
                this.oController.updateButtons(oBtns);
                ControllerManager.updateController(this.oController);
                this.oController.store();

                this.oWaitingButton.aChildElement[0].setText(oBtn.sText);
                this.oWaitingButton = null;
            }
            return oBtn;
        },

        reset: function(){
            let oBtns = null;
            switch( this.oController.sType ){
                case 'keyboard':
                    oBtns = GameSettings.oController.aKeyboard[ this.oController.sId.split('_')[1] - 1 ];
                    break;
                case 'gamepad':
                    oBtns = GameSettings.oController.oGamepad;
                    break;
            }
            
            // Reset BTN
            this.oController.updateButtons(oBtns);
            ControllerManager.updateController(this.oController);
            this.oController.store();

            // Refresh View
            this.oMenu.oLayer.aChildElement.forEach( oMenu => {
                const hBtn = oMenu.hElement.querySelector('.Input__Button_Name');
                if( hBtn ){
                    const sBtn = hBtn.innerHTML,
                       sText = this.oController.oButtons[sBtn].sText;
                    oMenu.aChildElement[0].setText(sText);
                }
            } );
        }
    }
);

/* Input */
function InputScene(){
    this.oContext = null;
    this.oLastPress = {
        nFrames: -1,
        sKey: null,
        fKeyDown: oEvent => {
            this.oLastPress.oEvent = oEvent;
            this.oLastPress.nFrames = TimerEngine.nFrames + 1;
        },
        fAddNewController: oController => {
            this.oContext.addTickUpdate( () => {
                this.aController.push( new InputController(oController, this.oLastPress, false) );
            } );
        }
    };

    this.aController = [];
}

Object.assign(
    InputScene, {

        aHelper: [
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
            },
            {
                aButton: ['C'],
                sText: 'Reset'
            }
        ],

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: InputScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Input');

                    // Controller init
                    for( let sController in ControllerManager.oController ){
                        const oController = ControllerManager.getController(sController);
                        this.aController.push( new InputController(oController, this.oLastPress, SceneManager.oTransverseData.STG__oController.sId != sController) );
                    }

                    window.addEventListener('keydown', this.oLastPress.fKeyDown, false);
                    ControllerManager.on('create', this.oLastPress.fAddNewController);
                    
                    GameHelper.set(InputScene.aHelper);
				},
				update: function(){
                    let bAllReady = true;
                    this.aController.forEach( oController => {
                        oController.update();
                        bAllReady && ( bAllReady = oController.bReady );
                    } );
                    GameHelper.update();
                    bAllReady && SceneManager.change( new SettingScene() );
				},
                destroy: function(){
                    this.aController.forEach( oController => oController.destroy() );
                    window.removeEventListener('keydown', this.oLastPress.fKeyDown, false);
                    ControllerManager.off('create', this.oLastPress.fAddNewController);
                    GameHelper.destroy();
                }
            }
        )
    }
);