/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function ControllerManager(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    ControllerManager, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        KeyboardController: KeyboardController,
        GamepadController: GamepadController,
        
        oController: {},
        oKeyMap: {},
        nController: 0,
        oListeners: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
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
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */