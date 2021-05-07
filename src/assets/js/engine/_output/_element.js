/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputElement() {
    /* ----- START PROPERTIES ----- */
    this.sId = this.sId || '';
    this.aTickUpdate = [];
    this.oParentElement = null;
    /* ----- END PROPERTIES ----- */

    OutputElement.add(this);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputElement, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        nId: 0,
        oInstance: {},
        oInstanceByConstructor: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        add: function(oElm) {
            if( oElm.sId ){
                this.oInstanceByConstructor[oElm.constructor.name] || ( this.oInstanceByConstructor[oElm.constructor.name] = {} );
                this.oInstance[oElm.sId] = this.oInstanceByConstructor[oElm.constructor.name][oElm.sId] = oElm;
            } else {
                oElm.sId = 'OE_' + (++this.nId);
            }
            return oElm;
        },

        remove: function(oElm) {
            delete this.oInstance[oElm.sId];
            delete this.oInstanceByConstructor[oElm.constructor.name][oElm.sId];
            return oElm;
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */

        prototype: {
            constructor: OutputElement,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            update: function() {
                const aUpdate = this.aTickUpdate;
                this.aTickUpdate = [];
                aUpdate.forEach( fUpd => {
                    fUpd.call(this);
                } );
            },

            addTickUpdate: function(fUpd) {
                this.aTickUpdate.push(fUpd);
            }
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */