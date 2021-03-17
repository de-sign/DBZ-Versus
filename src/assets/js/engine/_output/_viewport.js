function OutputViewport(hElm) {
    OutputLayer.call(this, hElm);
    this.oOrigin = {};
    this.setOrigin();
}
Object.assign(
    OutputViewport, {
        prototype: Object.assign(
            Object.create(OutputLayer.prototype), {
                constructor: OutputViewport,

                update: function(){
                    OutputElement.prototype.update.call(this);
                },

                createHTML: undefined,
                autoCreateChildElement: function(){},
                setOrigin: function(oOgn) {
                    let pos = null;
                    if( oOgn ){
                        pos = oOgn;
                    } else {
                        const box = this.getBox();
                        pos = {
                            nX: box.originX,
                            nY: box.originY
                        };
                    }
                    return Object.assign(this.oOrigin, pos);
                }
            }
        )
    }
);