function OutputElement() {
    this.sId = this.sId || '';
    this.aTickUpdate = [];
    this.oParentElement = null;
    OutputElement.add(this);
}

Object.assign(
    OutputElement, {
        nId: 0,
        oInstance: {},
        oInstanceByConstructor: {},

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

        prototype: {
            constructor: OutputElement,

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
        }
    }
);