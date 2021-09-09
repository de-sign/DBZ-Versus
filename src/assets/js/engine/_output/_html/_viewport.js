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
                    if( oOgn ){
                        this.hElement.style.transformOrigin = oOgn.nX + 'px ' + oOgn.nY + 'px';
                    } else {
                        const oRect = aOrigin = this.oStyle.transformOrigin.split(' ');
                        oOgn = {
                            nX: this.hElement.offsetLeft + parseFloat( aOrigin[0] ),
                            nY: this.hElement.offsetTop + parseFloat( aOrigin[1] )
                        };
                    }
                    return Object.assign(this.oOrigin, oOgn);
                },

                getContext: function(sId){
                    return OutputElement.oInstanceByConstructor.OutputHTMLContext[sId || this.sContextUsed];
                },
                useContext: function(sId) {
                    const bSame = sId == this.sContextUsed,
                        oLastCtx = this.getContext(this.sContextUsed);

                    if( oLastCtx && !bSame ) {
                        this.addTickUpdate( () => oLastCtx.unuse() );
                    }

                    const oCtx = this.getContext(sId);
                    if (oCtx) {
                        if( !bSame ) {
                            this.sContextUsed = sId;
                            oCtx.use();
                        }
                    } else {
                        this.sContextUsed = null;
                    }
                    return oCtx;
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */
