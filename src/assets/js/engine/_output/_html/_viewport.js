/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputViewport(hElm) {
    /* ----- START PROPERTIES ----- */
    this.sContextUsed = '';
    this.oOrigin = {};
    /* ----- END PROPERTIES ----- */

    OutputLayer.call(this, hElm);
    this.setOrigin();
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputViewport, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputLayer.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputViewport,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
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
                    const oLastCtx = this.getContext(this.sContextUsed);
                    oLastCtx && this.addTickUpdate( () => oLastCtx.unuse() );
                    const oCtx = this.getContext(sId);
                    if (oCtx) {
                        this.sContextUsed = sId;
                        oCtx.use();
                    } else {
                        this.sContextUsed = null;
                    }
                    return oCtx;
                }
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */