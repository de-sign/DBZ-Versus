/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputHTMLContext(hElm) {
    OutputLayer.call(this, hElm);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputHTMLContext, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputLayer.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputHTMLContext,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                use: function() {
                    this.hElement.classList.add( OutputManager.oConfig.class.used );
                    this.addTickUpdate( () => {
                        this.hElement.classList.add( OutputManager.oConfig.class.init );
                    } );
                },
                unuse: function() {
                    this.hElement.classList.remove( OutputManager.oConfig.class.used, OutputManager.oConfig.class.init );
                }
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */