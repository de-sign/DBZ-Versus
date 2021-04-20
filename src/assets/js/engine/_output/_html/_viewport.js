function OutputViewport(hElm) {
    this.sContextUsed = '';
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
                    OutputHTMLElement.prototype.update.call(this);
                    const oCtx = this.getContext();
                    oCtx && oCtx.update();
                },
                
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
                },

                getContext: function(sId){
                    return OutputElement.oInstanceByConstructor.OutputHTMLContext[sId || this.sContextUsed];
                },
                useContext: function(sId) {
                    let oCtx = this.getContext(this.sContextUsed);
                    oCtx && oCtx.unuse();
                    oCtx = this.getContext(sId);
                    if (oCtx) {
                        this.sContextUsed = sId;
                        oCtx.use();
                    } else {
                        this.sContextUsed = null;
                    }
                    return oCtx;
                }
            }
        )
    }
);