/* ----- START CLASS ----- */
/* ----- MENU GameEngine/Input ----- */
/* ----- START CONSTRUCTOR ----- */
function Controller(){
    /* ----- START PROPERTIES ----- */
    this.oButtons = {};
    this.oKeyMap = {};
    this.nFrameChange = 0;
    this.dTimestampChange = 0;
    /* ----- END PROPERTIES ----- */

    this.init.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    Controller, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        nId: 0,
        oInstance: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
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
                oButtons: {},
                aOrder: []
            }, oStore || {});
            
            for( let sBtn in oController.oButtons ){
                oStore.oButtons[sBtn] = {
                    sKey: oController.oButtons[sBtn].sKey,
                    sText: oController.oButtons[sBtn].sText
                };
                oStore.aOrder.push(sBtn);
            }

            return oStore;
        },

        getDataStore: function(oStore){
            if( oStore ){
                const oButtons = {};
                oStore.aOrder.forEach( sBtn => {
                    oButtons[sBtn] = oStore.oButtons[sBtn];
                } );
                oStore.oButtons = oButtons;
            }
            return oStore;
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
        
        prototype: {
            constructor: Controller,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
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
                return oBtn ? oBtn.bPressed && oBtn.nFrameChanged == TimerEngine.nFrames : null;
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
                        if( this.isPressed(sBtn) ){
                            oCallback[sBtn]( this.oButtons[sBtn] );
                            bFirstPressed = true;
                        }
                    }
                }
            }
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */