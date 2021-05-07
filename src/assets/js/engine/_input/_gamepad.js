/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function GamepadController(oBtn, nIndex) {
    /* ----- START PROPERTIES ----- */
    this.sName = 'Gamepad #';
    this.sType = 'gamepad';
    this.oGamepad = null;
    this.nIndex = -1;
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
            const aStore = StoreEngine.get(oGamepad.id) || [];
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

            const oController = ControllerManager.create( 'Gamepad', oStore ? Controller.getDataStore(oStore).oButtons : oDefault, oGamepad.index );
            oController.nIndexStore = nIndexStore;
            return oController;
        },

        getButtonText: function(sCode, oController) {
            sCode = sCode.toUpperCase();
            let sText = null;
            const sId = oController.oGamepad.id.toUpperCase();

            for( let sController in this.oButtonText ){
                if( sController != 'oCommon' && sId.indexOf(sController) != -1 ){
                    const oButtonText = Object.assign({}, this.oButtonText.oCommon, this.oButtonText[sController]);
                    sText = oButtonText[sCode];
                    break;
                }
            }
            return sText || sCode;
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
                init: function(oBtn, nIndex){
                    this.oGamepad = navigator.getGamepads()[ this.nIndex = nIndex ];
                    GamepadController.oIndexCreate[nIndex] = true;
                    Controller.prototype.init.call(this, oBtn);
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
                        
                        for( let sBtn in this.oButtons ){
                            const btn = this.oButtons[sBtn];
                            // Axes
                            if( btn.sKey.indexOf('AXE') == 0 ){
                                const sIndex = btn.sKey.substring(3),
                                    nIndex = parseInt(sIndex),
                                    nRatio = sIndex[0] == '+' ? 1 : -1,
                                    nAxe = this.oGamepad ? this.oGamepad.axes[nIndex * nRatio] : 0;
                                
                                if( this.updateButton(sBtn, { pressed: nAxe * nRatio >= GamepadController.nAxePressed }) ){
                                    bChange = true;
                                }
                            }

                            // Buttons
                            if( btn.sKey.indexOf('BUTTON') == 0 ){
                                const nIndex = parseInt(btn.sKey.substring(6)),
                                    oButton = this.oGamepad ? this.oGamepad.buttons[nIndex] : {};
                                
                                if( this.updateButton(sBtn, oButton) ){
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

                updateButton: function(sBtn, oButton){
                    let bChange = false;
                    const btn = this.oButtons[sBtn];
                    if ( oButton && btn.bPressed != oButton.pressed ) {
                        if( !oButton.pressed ){
                            btn.oLastPress = Object.assign({}, btn);
                        }

                        Object.assign(btn, {
                            oEvent: null,
                            nFrameChanged: TimerEngine.nFrames,
                            dTimestamp: TimerEngine.dUpdate,
                            bPressed: oButton.pressed
                        } );

                        bChange = true;
                    }
                    return bChange;
                },

                getAnyButtonsPressed: function(){
                    const aButtons = [];
                    if( this.oGamepad ){
                        // Axes
                        this.oGamepad.axes.forEach( (nValue, nIndex) => {
                            if( Math.abs(nValue) >= GamepadController.nAxePressed ){
                                const sKey = 'AXE' + ( nValue > 0 ? '+' : '-' ) + nIndex,
                                    sBtn = this.oKeyMap[sKey];

                                aButtons.push( sBtn ?
                                    this.oButtons[sBtn] :
                                    {
                                        sKey,
                                        sCod: null,
                                        sText: GamepadController.getButtonText(sKey, this),
                                        nFrameChanged: TimerEngine.nFrames,
                                        dTimestamp: TimerEngine.dUpdate,
                                        bPressed: true,
                                        oLastPress: null
                                    }
                                );
                            }
                        } );
                        
                        // Buttons
                        this.oGamepad.buttons.forEach( (oButton, nIndex) => {
                            if( oButton.pressed ){
                                const sKey = 'BUTTON' + nIndex,
                                    sBtn = this.oKeyMap[sKey];

                                aButtons.push( sBtn ?
                                    this.oButtons[sBtn] :
                                    {
                                        sKey,
                                        sCod: null,
                                        sText: GamepadController.getButtonText(sKey, this),
                                        nFrameChanged: TimerEngine.nFrames,
                                        dTimestamp: TimerEngine.dUpdate,
                                        bPressed: true,
                                        oLastPress: null
                                    }
                                );
                            }
                        } );
                    }
                    return aButtons;
                },

                store: function() {
                    const aStore = StoreEngine.get( this.oGamepad.id ) || [],
                        oData = Controller.createDataStore(this, {
                            nIndex: this.nIndex,
                            nIndexStore: this.nIndexStore
                        } );

                    if( this.nIndexStore == -1 ){
                        oData.nIndexStore = this.nIndexStore = aStore.length;
                        aStore.push(oData);
                    } else {
                        aStore[this.nIndexStore] = oData;
                    }

                    StoreEngine.update( this.oGamepad.id, aStore );
                }
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */