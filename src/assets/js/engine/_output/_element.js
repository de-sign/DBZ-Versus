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
            oElm.sId = oElm.sId || 'OE_' + (++this.nId);
            this.oInstanceByConstructor[oElm.constructor.name] || ( this.oInstanceByConstructor[oElm.constructor.name] = {} );
            this.oInstance[oElm.sId] = this.oInstanceByConstructor[oElm.constructor.name][oElm.sId] = oElm;
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
                this.aTickUpdate.forEach( fUpd => {
                    fUpd.call(this);
                } );
                this.aTickUpdate = [];
            },

            addTickUpdate: function(fUpd) {
                this.aTickUpdate.push(fUpd);
            }
        }
    }
);