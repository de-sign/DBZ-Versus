/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function KeyboardController(oBtn) {
    /* ----- START PROPERTIES ----- */
    this.sName = 'Keyboard #';
    this.sType = 'keyboard';
    this.aEvents = [];
    /* ----- END PROPERTIES ----- */

    Controller.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    KeyboardController, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        oButtonText: {
            KEYW: 'W / Z',
            KEYA: 'A / Q'
        },
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        getButtonText: function(sCode){
            sCode = sCode.toUpperCase();
            let sText = this.oButtonText[sCode];
            if( !sText ){
                sText = sCode.indexOf('KEY') == -1 ? sCode : sCode.substring(3);
            }
            return sText;
        },

        recover: function(sId, oDefault){
            const oStore = Controller.getDataStore( StoreEngine.get(sId) );
            return ControllerManager.create( 'Keyboard', oStore ? oStore.oButtons : oDefault );
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(Controller.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: KeyboardController,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
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
                                nFrameChanged: TimerEngine.nFrames,
                                dTimestamp: TimerEngine.dUpdate,
                                bPressed: typ
                            } );
                            bChange = true;
                        }
                    } );

                    if( bChange ){
                        this.nFrameChange = TimerEngine.nFrames;
                        this.dTimestampChange = TimerEngine.dUpdate;
                    }

                    this.aEvents = [];
                },

                addEvent: function(oEvent) {
                    this.aEvents.push(oEvent);
                },
                store: function(){
                    const oData = Controller.createDataStore(this);
                    StoreEngine.update( this.sId, oData );
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */