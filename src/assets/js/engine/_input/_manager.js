/* ----- START CLASS ----- */
/* ----- MENU GameEngine/Input ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS Le gestionnaire des controlleurs avec un système d'écouteurs. ----- */
function ControllerManager(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    ControllerManager, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Technical properties
        DETAILS Les propriétés suivantes sont purement technique et ne devrait être utilisé principalement que par le système
        ----- */
        /* ----- DETAILS La classe du controlleur clavier : [KeyboardController](KeyboardController.md). ----- */
        KeyboardController: KeyboardController,
        /* ----- DETAILS La classe du controlleur manette : [GamepadController](GamepadController.md). ----- */
        GamepadController: GamepadController,
        /* ----- DETAILS Objet technique listant les écouteurs d'évènement du gestionnaire mis en place via les fonctions `ControllerManager.on()` et `ControllerManager.off()`. ----- */
        oListeners: {},
        /* ----- DETAILS Nom de la configuration de bouttons utilisé par les Controller. ----- */
        sLayoutSelected: null,
        /* ----- END PROPERTIES ----- */

        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Utilitary properties
        DETAILS Les propriétés suivantes sont destinées à être utilisé par le système ou par un développeur
        ----- */
        /* ----- DETAILS Objet contenant tous les controlleurs avec leur code d'identification pour clef : [Controller.sId](Controller.md) ----- */
        oController: {},
        /* ----- DETAILS Nombre de controlleur disponible dans `ControllerManager.oController`. ----- */
        nController: 0,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* -----
        SUBCATEGORY Technical methods
        DETAILS Les méthodes suivantes sont purement technique et ne devrait être utilisé principalement que par le système
        ----- */
        /* ----- DETAILS
        Initialise le gestionnaire en ajoutant des écouteurs d'évènements pour la gestion des controlleurs claviers :
        - [KeyboardEvent](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent) (`keydown` et `keyup`)
        - [KeyboardController](KeyboardController.md)
        ----- */
        init: function() {
            const fEvent = this.addEvent.bind(this);
            document.addEventListener('keydown', fEvent, false);
            document.addEventListener('keyup', fEvent, false);
        },
        /* ----- DETAILS
        Mets à jours tous les controlleurs présent dans `ControllerManager.oController` :
        - [GamepadController.update()](GamepadController.md)
        - [Controller.prototype.update()](Controller.md)
        ----- */
        update: function() {
            GamepadController.update();
            for (let c in this.oController) {
                this.oController[c].update();
            }
        },
        
        /* ----- DETAILS
        Ajoute le controlleur transmis dans `ControllerManager.oController`.  
        ----- */
        addController: function(oCtrl) {
            this.oController[oCtrl.sId] = oCtrl;
            this.nController++;
        },
        /* ----- DETAILS
        Supprime le controlleur transmis de `ControllerManager.oController`.  
        ----- */
        removeController: function(oCtrl) {
            if( this.oController[oCtrl.sId] ){
                delete this.oController[oCtrl.sId];
                this.nController--;
            }
        },
        /* ----- DETAILS
        TODO
        ----- */
        addEvent: function(oEvent) {
            for( let sId in this.oController ){
                const oCtrl = this.oController[sId];
                if( oCtrl.sType == 'keyboard' ){
                    this.oController[sId].addEvent(oEvent);
                    this.trigger('addEvent', this.oController[sId], oEvent);
                }
            }
        },
        /* ----- END METHODS ----- */

        /* ----- START METHODS ----- */
        /* -----
        SUBCATEGORY Utilitary methods
        DETAILS Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur
        ----- */
        create: function(sType, nIndex, oBtn) {
            var oCtrl = new window[sType + 'Controller'](nIndex, oBtn);
            this.addController(oCtrl);
            this.trigger('create', oCtrl);
            return oCtrl;
        },
        getController: function(sCod){
            return Controller.oInstance[sCod];
        },
        setLayout: function(sLayout){
            this.sLayoutSelected = sLayout;
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