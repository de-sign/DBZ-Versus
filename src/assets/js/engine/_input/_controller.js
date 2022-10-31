/* ----- START CLASS ----- */
/* ----- MENU GameEngine/Input ----- */
/* ----- START CONSTRUCTOR ----- */
function Controller(){
    /* ----- START PROPERTIES ----- */
    this.oLayouts = {};

    this.nIndex = -1;
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
                nIndex: oController.nIndex,
                oLayouts: {}
            }, oStore || {});
            
            for( let sLayout in oController.oLayouts ){
                const oButtons = oController.getButton(false, sLayout);
                for( let sButton in oButtons ){
                    oStore.oLayouts[sLayout] || ( oStore.oLayouts[sLayout] = {} );
                    oStore.oLayouts[sLayout][sButton] = {
                        sKey: oButtons[sButton].sKey,
                        sText: oButtons[sButton].sText
                    };
                }
            }

            return oStore;
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
        
        prototype: {
            constructor: Controller,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            init: function(nIndex, oLayouts){
                this.sId = Controller.add(this);
                this.nIndex = nIndex;
                for( let sLayout in oLayouts ){
                    const oButtons = this.normalizeButtons(oLayouts[sLayout]);
                    this.oLayouts[sLayout] = new ControllerLayout(oButtons);
                }
            },
            update: function(){},
            destroy: function(){},

            normalizeButtons: function(oButtons){
                for( let sCod in oButtons ){
                    if( Object.prototype.toString.call(oButtons[sCod]) !== '[object Object]' ){
                        oButtons[sCod] = {
                            sKey: oButtons[sCod],
                            sText: this.constructor.getButtonText(oButtons[sCod], this)
                        };
                    }
                }
                return oButtons;
            },

            getButton: function(sButton, sLayout){
                const oLayout = this.getLayout(sLayout);
                return sButton ? oLayout.oButtons[sButton] : oLayout.oButtons;
            },
            getLayout: function(sLayout){
                return this.oLayouts[ sLayout || ControllerManager.sLayoutSelected ];
            },

            hasPressedNow: function(sButton) {
                const oButton = sButton ? this.getButton(sButton) : null;
                return oButton ? oButton.bPressed && oButton.nFrameChanged == TimerEngine.nFrames : null;
            },
            isPressed: function(sButton) {
                const oButton = sButton ? this.getButton(sButton) : null;
                return oButton ? oButton.bPressed : null;
            },
            getLastPress: function(sButton){
                const oButton = sButton ? this.getButton(sButton) : null;
                return oButton ? oButton.oLastPress : null;
            },

            ifPressedNow: function(oCallback, bOnlyFirst = true){
                let bFirstPressed = false;
                for( let sButton in oCallback ){
                    if( !bOnlyFirst || !bFirstPressed ){
                        if( this.hasPressedNow(sButton) ){
                            oCallback[sButton]( this.getButton(sButton) );
                            bFirstPressed = true;
                        }
                    }
                }
            },
            ifPressed: function(oCallback, bOnlyFirst = true){
                let bFirstPressed = false;
                for( let sButton in oCallback ){
                    if( !bOnlyFirst || !bFirstPressed ){
                        if( this.isPressed(sButton) ){
                            oCallback[sButton]( this.getButton(sButton) );
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