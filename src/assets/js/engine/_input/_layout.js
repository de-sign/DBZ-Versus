/* ----- START CLASS ----- */
/* ----- MENU GameEngine/Input ----- */
/* ----- START CONSTRUCTOR ----- */
function ControllerLayout(){
    /* ----- START PROPERTIES ----- */
    this.oButtons = {};
    this.oKeyMap = {};
    /* ----- END PROPERTIES ----- */

    this.init.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    ControllerLayout, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
        
        prototype: {
            constructor: ControllerLayout,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            init: function(oButton){
                this.addButtons(oButton);
            },
            update: function(){},
            destroy: function(){},

            addButtons: function(oButtons){
                for( let sCod in oButtons ){
                    const oButton = oButtons[sCod],
                        sKey = oButton.sKey.toUpperCase();
                        
                    this.oButtons[sCod] = {
                        sKey,
                        sCod,
                        sText: oButton.sText,
                        nFrameChanged: null,
                        dTimestamp: 0,
                        bPressed: false,
                        oLastPress: null
                    };
                    this.oKeyMap[sKey] = sCod;
                }
            },
            removeButtons: function(oButtons) {
                for( let sCod in oButtons ){
                    const oButton = this.oButtons[sCod];
                    if( oButton ){
                        delete this.oKeyMap[oButton.sKey];
                        delete this.oButtons[sCod];
                    }
                }
            },
            updateButtons: function(oButtons){
                this.removeButtons(oButtons);
                this.addButtons(oButtons);
            }
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */