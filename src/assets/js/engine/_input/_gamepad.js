/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function GamepadController() {
    /* ----- START PROPERTIES ----- */
    this.sName = 'Gamepad #';
    this.sType = 'gamepad';
    this.oGamepad = null;
    this.nIndexStore = -1;
    /* ----- END PROPERTIES ----- */

    Controller.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GamepadController, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        nAxePressed: 0.5,
        aGamepad: [],
        oIndexCreate: {},
        oIndexRecovered: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        oButtonText: {
            oCommon: {
                BUTTON10: 'L-CLICK',
                BUTTON11: 'R-CLICK',
                BUTTON12: 'PAD-UP',
                BUTTON13: 'PAD-DOWN',
                BUTTON14: 'PAD-LEFT',
                BUTTON15: 'PAD-RIGHT',
                'AXE-0': 'L-LEFT',
                'AXE+0': 'L-RIGHT',
                'AXE-1': 'L-UP',
                'AXE+1': 'L-DOWN',
                'AXE-2': 'R-LEFT',
                'AXE+2': 'R-RIGHT',
                'AXE-3': 'R-UP',
                'AXE+3': 'R-DOWN',
            },
            
            XBOX: {
                BUTTON0: 'A',
                BUTTON1: 'B',
                BUTTON2: 'X',
                BUTTON3: 'Y',
                BUTTON4: 'LB',
                BUTTON5: 'RB',
                BUTTON6: 'LT',
                BUTTON7: 'RT',
                BUTTON8: 'VIEW',
                BUTTON9: 'MENU',
                BUTTON16: 'XBOX',
            },
            CONTROLLER: {
                BUTTON0: 'CROSS',
                BUTTON1: 'CIRCLE',
                BUTTON2: 'SQUARE',
                BUTTON3: 'TRIANGLE',
                BUTTON4: 'L1',
                BUTTON5: 'R1',
                BUTTON6: 'L2',
                BUTTON7: 'R2',
                BUTTON8: 'SELECT',
                BUTTON9: 'START',
                BUTTON16: 'PS / HOME',
            }
        },

        /* ----- START METHODS ----- */
        update: function(){
            this.aGamepad = [...navigator.getGamepads()];
        },

        recover: function(oGamepad, oDefault){
            const aStore = StoreEngine.get( this.getId(oGamepad) ) || [];
            let oStore = null,
                nIndexStore = 0;
                
            for( ; nIndexStore < aStore.length; nIndexStore++ ){
                if( aStore[nIndexStore].nIndex == oGamepad.index ){
                    oStore = aStore[nIndexStore];
                    this.oIndexRecovered[nIndexStore] = true;
                    break;
                }
            }
            if( !oStore ){
                if( aStore[0] && !this.oIndexRecovered[0] ){
                    oStore = aStore[0];
                    nIndexStore = 0;
                } else {
                    nIndexStore = -1;
                }
            }

            const oLayouts = oStore ? oStore.oLayouts : {},
                oController = ControllerManager.create( 'Gamepad', oGamepad.index, Object.assign({}, oDefault, oLayouts) );
            oController.nIndexStore = nIndexStore;
            return oController;
        },

        getButtonText: function(sCode, oController) {
            sCode = sCode.toUpperCase();
            const sId = this.getId(oController.oGamepad).toUpperCase();
            
            let sText = null;
            for( let sController in this.oButtonText ){
                if( sController != 'oCommon' && sId.indexOf(sController) != -1 ){
                    const oButtonText = Object.assign({}, this.oButtonText.oCommon, this.oButtonText[sController]);
                    sText = oButtonText[sCode];
                    break;
                }
            }
            return sText || sCode;
        },

        getId: function(oGamepad){
            return 'IPT__' + oGamepad.id.replace(/[^\w\d\s]/g, '').replace(/\s/g, '_');
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
        
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(Controller.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: GamepadController,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(nIndex, oBtn){
                    this.oGamepad = navigator.getGamepads()[nIndex];
                    GamepadController.oIndexCreate[nIndex] = true;
                    Controller.prototype.init.call(this, nIndex, oBtn);
                },
                update: function() {

                    const oGamepad = GamepadController.aGamepad[ this.nIndex ],
                        oLastGamepad = this.oGamepad;
                    this.oGamepad = oGamepad;
                    oGamepad && ( this.oGamepad.nFrameChange = TimerEngine.nFrames );

                    if(
                        ( oGamepad == null && oLastGamepad != null )
                        || ( oLastGamepad == null && oGamepad != null )
                        || ( oGamepad && oLastGamepad && oGamepad.timestamp > oLastGamepad.timestamp )
                    ){

                        let bChange = oGamepad ? false : true;
                        const oButtons = this.getButton();
                        
                        for( let sButton in oButtons ){
                            const oButton = oButtons[sButton];

                            // Axes
                            if( oButton.sKey.indexOf('AXE') == 0 ){
                                const sIndex = oButton.sKey.substring(3),
                                    nIndex = parseInt(sIndex),
                                    nRatio = sIndex[0] == '+' ? 1 : -1,
                                    nAxe = this.oGamepad ? this.oGamepad.axes[nIndex * nRatio] : 0;
                                
                                if(
                                    this.updateButton( sButton, {
                                        pressed: nAxe * nRatio >= GamepadController.nAxePressed,
                                        value: nAxe * nRatio
                                    } )
                                ){
                                    bChange = true;
                                }
                            }

                            // Buttons
                            if( oButton.sKey.indexOf('BUTTON') == 0 ){
                                const nIndex = parseInt(oButton.sKey.substring(6)),
                                    oGpadButton = this.oGamepad ? this.oGamepad.buttons[nIndex] : {};
                                
                                if( this.updateButton(sButton, oGpadButton) ){
                                    bChange = true;
                                }
                            }
                        }

                        if( bChange ){
                            this.nFrameChange = TimerEngine.nFrames;
                            this.dTimestampChange = TimerEngine.dUpdate;
                        }
                    }
                },

                updateButton: function(sButton, oButton){
                    let bChange = false;
                    const oLastButton = this.getButton(sButton);
                    if ( oButton && oLastButton.bPressed != oButton.pressed ) {
                        if( !oButton.pressed ){
                            delete oLastButton.oLastPress;
                            oLastButton.oLastPress = Object.assign({}, oLastButton);
                        }

                        Object.assign(oLastButton, {
                            oEvent: null,
                            nFrameChanged: TimerEngine.nFrames,
                            dTimestamp: TimerEngine.dUpdate,
                            bPressed: oButton.pressed,
                            nValue: oButton.value
                        } );

                        bChange = true;
                    }
                    return bChange;
                },

                getAnyButtonsPressed: function(){
                    const aButtons = [],
                        oLayout = this.getLayout();

                    if( this.oGamepad ){
                        // Axes
                        this.oGamepad.axes.forEach( (nValue, nIndex) => {
                            if( Math.abs(nValue) >= GamepadController.nAxePressed ){
                                const sKey = 'AXE' + ( nValue > 0 ? '+' : '-' ) + nIndex,
                                    sButton = oLayout.oKeyMap[sKey];

                                aButtons.push( sButton ?
                                    oLayout.oButtons[sButton] :
                                    {
                                        sKey,
                                        sCod: null,
                                        sText: GamepadController.getButtonText(sKey, this),
                                        nFrameChanged: TimerEngine.nFrames,
                                        dTimestamp: TimerEngine.dUpdate,
                                        bPressed: true,
                                        nValue: Math.abs(nValue),
                                        oLastPress: null
                                    }
                                );
                            }
                        } );
                        
                        // Buttons
                        this.oGamepad.buttons.forEach( (oButton, nIndex) => {
                            if( oButton.pressed ){
                                const sKey = 'BUTTON' + nIndex,
                                    sButton = oLayout.oKeyMap[sKey];

                                aButtons.push( sButton ?
                                    oLayout.oButtons[sButton] :
                                    {
                                        sKey,
                                        sCod: null,
                                        sText: GamepadController.getButtonText(sKey, this),
                                        nFrameChanged: TimerEngine.nFrames,
                                        dTimestamp: TimerEngine.dUpdate,
                                        bPressed: true,
                                        nValue: oButton.value,
                                        oLastPress: null
                                    }
                                );
                            }
                        } );
                    }
                    return aButtons;
                },

                store: function() {
                    const sId = GamepadController.getId(this.oGamepad),
                        aStore = StoreEngine.get(sId) || [],
                        oData = Controller.createDataStore(this, {
                            nIndexStore: this.nIndexStore
                        } );

                    if( this.nIndexStore == -1 ){
                        oData.nIndexStore = this.nIndexStore = aStore.length;
                        aStore.push(oData);
                    } else {
                        aStore[this.nIndexStore] = oData;
                    }

                    StoreEngine.update( sId, aStore );
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */