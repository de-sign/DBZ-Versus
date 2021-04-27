// Input
const ControllerManager = {
    oController: {},
    oKeyMap: {},
    nController: 0,
    oListeners: {},

    init: function() {
        const fEvent = this.addEvent.bind(this);
        document.addEventListener('keydown', fEvent, false);
        document.addEventListener('keyup', fEvent, false);
    },
    update: function() {
        GamepadController.update();
        for (let c in this.oController) {
            this.oController[c].update();
        }
    },

    create: function(sType, oBtn, nIndex) {
        var oCtrl = new window[sType + 'Controller'](oBtn, nIndex);
        this.addController(oCtrl);
        this.trigger('create', oCtrl);
        return oCtrl;
    },
    addController: function(oCtrl) {
        this.oController[oCtrl.sId] = oCtrl;
        if( oCtrl.sType == 'keyboard' ){
            for (let b in oCtrl.oButtons) {
                const sKey = oCtrl.oButtons[b].sKey;
                this.oKeyMap[sKey] || ( this.oKeyMap[sKey] = [] );
                this.oKeyMap[sKey].push(oCtrl.sId);
            }
        }
        this.nController++;
    },
    removeController: function(oCtrl) {
        if( this.oController[oCtrl.sId] ){
            delete this.oController[oCtrl.sId];
            if( oCtrl.sType == 'keyboard' ){
                for (let sKey in this.oKeyMap) {
                    let nIndex = this.oKeyMap[sKey].indexOf(oCtrl.sId);
                    nIndex != -1 && this.oKeyMap[sKey].splice(nIndex, 1);
                }
            }
            this.nController--;
        }
    },
    updateController: function(oCtrl) {
        this.removeController(oCtrl);
        this.addController(oCtrl);
    },
    addEvent: function(oEvent) {
        const key = oEvent.code.toUpperCase();
        if (this.oKeyMap[key]) {
            this.oKeyMap[key].forEach((sId) => {
                this.oController[sId].addEvent(oEvent);
                this.trigger('addEvent', this.oController[sId], oEvent);
            });
        }
    },
    getController: function(sCod){
        return Controller.oInstance[sCod];
    },

    on: function(uEvent, uCallback){
        let oEvent = uEvent;
        if( typeof uEvent == 'string' ){
            oEvent = {};
            uEvent.split(' ').forEach( sEvent => {
                oEvent[sEvent] = uCallback;
            } );
        }
        for( let sEvent in oEvent ){
            this.oListeners[sEvent] || ( this.oListeners[sEvent] = [] );
            Array.isArray(oEvent[sEvent]) ? [].push.apply(this.oListeners[sEvent], oEvent[sEvent]) : this.oListeners[sEvent].push(oEvent[sEvent]);
        }
    },
    off: function(uEvent, uCallback){
        let oEvent = uEvent;
        if( typeof uEvent == 'string' ){
            oEvent = {};
            uEvent.split(' ').forEach( sEvent => {
                oEvent[sEvent] = uCallback;
            } );
        }
        for( let sEvent in oEvent ){
            if( this.oListeners[sEvent] ){
                const aCallback = Array.isArray(oEvent[sEvent]) ? oEvent[sEvent] : [oEvent[sEvent]];
                aCallback.forEach( fCallback => {
                    const nIndex = this.oListeners[sEvent].indexOf( fCallback );
                    nIndex != -1 && this.oListeners[sEvent].splice(nIndex, 1);
                } );
            }
        }
    },
    trigger: function(sEvent){
        if( this.oListeners[sEvent] ){
            const aArguments = [...arguments];
            aArguments.shift();
            this.oListeners[sEvent].forEach( fCallback => fCallback.apply(this, aArguments) );
        }
    }
};

function Controller(){
    this.oButtons = {};
    this.oKeyMap = {};
    this.nFrameChange = 0;
    this.dTimestampChange = 0;

    this.init.apply(this, arguments);
}

Object.assign(
    Controller, {
        nId: 0,
        oInstance: {},

        add: function(oKCtrl) {
            const id = 'IC_' + (++this.nId);
            oKCtrl.sName += this.nId;
            this.oInstance[id] = oKCtrl;
            return id;
        },

        createDataStore: function(oController, oStore){
            oStore = Object.assign( {
                sType: oController.sType,
                sId: oController.sId,
                oButtons: {}
            }, oStore || {});
            
            for( let sBtn in oController.oButtons ){
                oStore.oButtons[sBtn] = {
                    sKey: oController.oButtons[sBtn].sKey,
                    sText: oController.oButtons[sBtn].sText
                };
            }

            return oStore;
        },

        getDataStore: function(oStore){
            if( oStore ){
                const oButtons = {};
                GAME.oSettings.oController.aOrderButtons.forEach( sBtn => {
                    oButtons[sBtn] = oStore.oButtons[sBtn];
                } );
                oStore.oButtons = oButtons;
            }
            return oStore;
        },
    
        prototype: {
            constructor: Controller,
            init: function(oBtn){
                this.sId = Controller.add(this);
                this.addButtons(oBtn);
            },
            update: function(){},
            destroy: function(){},

            addButtons: function(oBtns) {
                for (let b in oBtns) {
                    const oBtn = Object.prototype.toString.call(oBtns[b]) === '[object Object]' ?
                        oBtns[b] :
                        {
                            sKey: oBtns[b],
                            sText: this.constructor.getButtonText(oBtns[b], this)
                        };

                    this.oButtons[b] = {
                        sKey: oBtn.sKey.toUpperCase(),
                        sCod: b,
                        sText: oBtn.sText,
                        nFrameChanged: null,
                        dTimestamp: 0,
                        bPressed: false,
                        oLastPress: null
                    };
                    this.oKeyMap[oBtn.sKey.toUpperCase()] = b;
                }
            },
            removeButtons: function(oBtns) {
                for (let b in oBtns) {
                    const oBtn = this.oButtons[b];
                    if( oBtn ){
                        delete this.oKeyMap[oBtn.sKey];
                        delete this.oButtons[b];
                    }
                }
            },
            updateButtons: function(oBtns){
                this.removeButtons(oBtns);
                this.addButtons(oBtns);
            },

            hasPressedNow: function(sBtn) {
                const oBtn = this.oButtons[sBtn];
                return oBtn ? oBtn.bPressed && oBtn.nFrameChanged == GAME.oTimer.nFrames : null;
            },
            isPressed: function(sBtn) {
                return this.oButtons[sBtn] ? this.oButtons[sBtn].bPressed : null;
            },
            getLastPress: function(sBtn){
                return this.oButtons[sBtn] ? this.oButtons[sBtn].oLastPress : null;
            },

            ifPressedNow: function(oCallback, bOnlyFirst = true){
                let bFirstPressed = false;
                for( let sBtn in oCallback ){
                    if( !bOnlyFirst || !bFirstPressed ){
                        if( this.hasPressedNow(sBtn) ){
                            oCallback[sBtn]( this.oButtons[sBtn] );
                            bFirstPressed = true;
                        }
                    }
                }
            },
            ifPressed: function(oCallback, bOnlyFirst = true){
                let bFirstPressed = false;
                for( let sBtn in oCallback ){
                    if( !bOnlyFirst || !bFirstPressed ){
                        if( this.hasPressed(sBtn) ){
                            oCallback[sBtn]( this.oButtons[sBtn] );
                            bFirstPressed = true;
                        }
                    }
                }
            }
        }
    }
);

function KeyboardController(oBtn) {
    this.sName = 'Keyboard #';
    this.sType = 'keyboard';
    this.aEvents = [];

    Controller.apply(this, arguments);
}

Object.assign(
    KeyboardController, {

        oButtonText: {
            KEYW: 'W / Z',
            KEYA: 'A / Q'
        },

        getButtonText: function(sCode){
            sCode = sCode.toUpperCase();
            let sText = this.oButtonText[sCode];
            if( !sText ){
                sText = sCode.indexOf('KEY') == -1 ? sCode : sCode.substring(3);
            }
            return sText;
        },

        recover: function(sId, oDefault){
            const oStore = Controller.getDataStore( GameStore.get(sId) );
            return GAME.oInput.create( 'Keyboard', oStore ? oStore.oButtons : oDefault );
        },

        prototype: Object.assign(
            Object.create(Controller.prototype), {
                constructor: KeyboardController,
                update: function() {
                    const pressTyp = {
                        keydown: true,
                        keyup: false
                    };

                    let bChange = false;
                    this.aEvents.forEach( oEvent => {
                        const cod = this.oKeyMap[oEvent.code.toUpperCase()],
                            btn = this.oButtons[cod],
                            typ = pressTyp[oEvent.type];

                        if (btn != null && btn.bPressed != typ) {
                            if( !typ ){
                                btn.oLastPress = Object.assign({ }, btn);
                            }
                            
                            Object.assign(btn, {
                                oEvent: oEvent,
                                nFrameChanged: GAME.oTimer.nFrames,
                                dTimestamp: GAME.oTimer.dUpdate,
                                bPressed: typ
                            } );
                            bChange = true;
                        }
                    } );

                    if( bChange ){
                        this.nFrameChange = GAME.oTimer.nFrames;
                        this.dTimestampChange = GAME.oTimer.dUpdate;
                    }

                    this.aEvents = [];
                },

                addEvent: function(oEvent) {
                    this.aEvents.push(oEvent);
                },
                store: function(){
                    const oData = Controller.createDataStore(this);
                    GameStore.update( this.sId, oData );
                }
            }
        )
    }
);

function GamepadController(oBtn, nIndex) {
    this.sName = 'Gamepad #';
    this.sType = 'gamepad';
    this.oGamepad = null;
    this.nIndex = -1;
    this.nIndexStore = -1;

    Controller.apply(this, arguments);
}

Object.assign(
    GamepadController, {

        nAxePressed: 0.5,
        aGamepad: [],
        oIndexCreate: {},
        oIndexRecovered: {},

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

        update: function(){
            this.aGamepad = [...navigator.getGamepads()];
        },

        recover: function(oGamepad, oDefault){
            const aStore = GameStore.get(oGamepad.id) || [];
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

            const oController = GAME.oInput.create( 'Gamepad', oStore ? Controller.getDataStore(oStore).oButtons : oDefault, oGamepad.index );
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
        
        prototype: Object.assign(
            Object.create(Controller.prototype), {
                constructor: GamepadController,
                init: function(oBtn, nIndex){
                    this.oGamepad = navigator.getGamepads()[ this.nIndex = nIndex ];
                    GamepadController.oIndexCreate[nIndex] = true;
                    Controller.prototype.init.call(this, oBtn);
                },
                update: function() {

                    const oGamepad = GamepadController.aGamepad[ this.nIndex ],
                        oLastGamepad = this.oGamepad;
                    this.oGamepad = oGamepad;
                    oGamepad && ( this.oGamepad.nFrameChange = GAME.oTimer.nFrames );

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
                            this.nFrameChange = GAME.oTimer.nFrames;
                            this.dTimestampChange = GAME.oTimer.dUpdate;
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
                            nFrameChanged: GAME.oTimer.nFrames,
                            dTimestamp: GAME.oTimer.dUpdate,
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
                                        nFrameChanged: GAME.oTimer.nFrames,
                                        dTimestamp: GAME.oTimer.dUpdate,
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
                                        nFrameChanged: GAME.oTimer.nFrames,
                                        dTimestamp: GAME.oTimer.dUpdate,
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
                    const aStore = GameStore.get( this.oGamepad.id ) || [],
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

                    GameStore.update( this.oGamepad.id, aStore );
                }
            }
        )
    }
);

Object.assign(
    ControllerManager,
    {
        KeyboardController: KeyboardController,
        GamepadController: GamepadController
    }
);