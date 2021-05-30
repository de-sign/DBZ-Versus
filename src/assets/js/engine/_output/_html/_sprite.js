/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputSprite(sSrc, oHCfg) {
    /* ----- START PROPERTIES ----- */
    this.sSource = null;
    /* ----- END PROPERTIES ----- */
    
    sSrc = sSrc || '';
    if (typeof sSrc === 'string') {
        OutputHTMLElement.call(this, oHCfg);
        this.setSource(sSrc);
    } else {
        OutputHTMLElement.call(this, sSrc);
        this.setSource(sSrc.src);
    }
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputSprite, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputHTMLElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputSprite,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                setSource: function(sSrc){
                    if( this.sSource != sSrc ){
                        this.hElement.src = this.sSource = sSrc;
                    }
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */