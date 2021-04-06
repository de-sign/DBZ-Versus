// Input
const ControllerManager = {
    oController: {},
    oKeyMap: {},
    nController: 0,

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
        const key = oEvent.key.toUpperCase();
        if (this.oKeyMap[key]) {
            this.oKeyMap[key].forEach((sId) => {
                this.oController[sId].addEvent(oEvent);
            });
        }
    },
    getController: function(sCod){
        return Controller.oInstance[sCod];
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
                    const key = oBtns[b].toUpperCase();
                    this.oButtons[b] = {
                        sKey: key,
                        sCod: b,
                        nFrameChanged: null,
                        dTimestamp: 0,
                        bPressed: false,
                        oLastPress: null
                    };
                    this.oKeyMap[key] = b;
                }
            },
            removeButtons: function(oBtns) {
                for (let b in oBtns) {
                    const oBtn = this.oButtons[b];
                    if( oBtn ){
                        const key = oBtns[b].toUpperCase();
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
                        const cod = this.oKeyMap[oEvent.key.toUpperCase()],
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

    Controller.apply(this, arguments);
}

Object.assign(
    GamepadController, {

        nAxePressed: 0.5,
        aGamepad: [],
        oIndexCreate: {}, 
        update: function(){
            this.aGamepad = [...navigator.getGamepads()];
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