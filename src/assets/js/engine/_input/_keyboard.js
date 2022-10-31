/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function KeyboardController() {
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

        recover: function(nIndex, oDefault){
            const aStore = StoreEngine.get('IPT__Keyboard') || [],
                oStore = aStore[nIndex],
                oLayouts = oStore ? oStore.oLayouts : {};
            return ControllerManager.create( 'Keyboard', nIndex, Object.assign({}, oDefault, oLayouts) );
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
                    const oType = {
                        keydown: true,
                        keyup: false
                    };

                    let bChange = false;
                    this.aEvents.forEach( oAddEvent => {
                        const oEvent = oAddEvent.oEvent,
                            oButton = this.getButton(oAddEvent.sCod),
                            bType = oType[oEvent.type];

                        if (oButton != null && oButton.bPressed != bType) {
                            if( !bType ){
                                delete oButton.oLastPress;
                                oButton.oLastPress = Object.assign({}, oButton);
                            }
                            
                            Object.assign(oButton, {
                                oEvent: oEvent,
                                nFrameChanged: TimerEngine.nFrames,
                                dTimestamp: TimerEngine.dUpdate,
                                bPressed: bType,
                                nValue: 1.0
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
                    const oLayout = this.getLayout(),
                        sCod = oLayout.oKeyMap[ oEvent.code.toUpperCase() ];
                        
                    sCod && this.aEvents.push( { sCod, oEvent } );
                    return !!sCod;
                },
                store: function(){
                    const sId = 'IPT__Keyboard',
                        aStore = StoreEngine.get(sId) || [],
                        oData = Controller.createDataStore(this);

                    aStore[this.nIndex] = oData;
                    StoreEngine.update( sId, aStore );
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */