// Input
const ControllerManager = {
    oController: {},
    oKeyMap: {},

    init: function() {
        const foo = this.addEvent.bind(this);
        document.addEventListener('keydown', foo, false);
        document.addEventListener('keyup', foo, false);
    },
    update: function() {
        for (let c in this.oController) {
            this.oController[c].update();
        }
    },

    create: function(oBtn) {
        var oCtrl = new KeyboardController(oBtn);
        this.addController(oCtrl);
        return oCtrl;
    },
    addController: function(oCtrl) {
        this.oController[oCtrl.sId] = oCtrl;
        for (let b in oCtrl.oButtons) {
            const sKey = oCtrl.oButtons[b].sKey;
            this.oKeyMap[sKey] || ( this.oKeyMap[sKey] = [] );
            this.oKeyMap[sKey].push(oCtrl.sId);
        }
    },
    removeController: function(oCtrl) {
        if( this.oController[oCtrl.sId] ){
            delete this.oController[oCtrl.sId];
            for (let sKey in this.oKeyMap) {
                let nIndex = this.oKeyMap[sKey].indexOf(oCtrl.sId);
                nIndex != -1 && this.oKeyMap[sKey].splice(nIndex, 1);
            }
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
        return this.KeyboardController.oInstance[sCod];
    }
};

function KeyboardController(oBtn) {
    this.sId = KeyboardController.add(this);
    this.oButtons = {};
    this.oKeyMap = {};
    this.aEvents = [];
    this.nFrameLastPress = 0;
    this.addButtons(oBtn);
}
Object.assign(
    KeyboardController, {
        nId: 0,
        oInstance: {},

        add: function(oKCtrl) {
            const id = 'IC_' + (++this.nId);
            this.oInstance[id] = oKCtrl;
            return id;
        },

        prototype: {
            update: function() {
                const pressTyp = {
                        keydown: true,
                        keyup: false
                    };

                this.aEvents.forEach( oEvent => {
                    const cod = this.oKeyMap[oEvent.key.toUpperCase()],
                        btn = this.oButtons[cod],
                        typ = pressTyp[oEvent.type];

                    if (btn != null && btn.bPressed != typ) {
                        if( typ ){
                            this.nFrameLastPress = GAME.oTimer.nFrames;
                        } else {
                            btn.oLastPress = Object.assign({}, btn);
                        }
                        btn.oEvent = oEvent;
                        btn.nFrameChanged = GAME.oTimer.nFrames;
                        btn.dTimestamp = GAME.oTimer.dUpdate;
                        btn.bPressed = typ;
                    }
                });

                this.aEvents = [];
            },

            addEvent: function(oEvent) {
                this.aEvents.push(oEvent);
            },
            addButtons: function(oBtns) {
                for (let b in oBtns) {
                    const key = oBtns[b].toUpperCase();
                    this.oButtons[b] = {
                        sKey: key,
                        sCod: b,
                        oEvent: null,
                        nFrameChanged: null,
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

Object.assign(
    ControllerManager,
    {
        KeyboardController: KeyboardController
    }
);