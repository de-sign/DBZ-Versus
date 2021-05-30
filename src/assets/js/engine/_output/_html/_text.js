/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputText(sTxt, oHCfg) {
    /* ----- START PROPERTIES ----- */
    this.sText = null;
    /* ----- END PROPERTIES ----- */

    sTxt || (sTxt = '');
    if (typeof sTxt === 'string') {
        OutputHTMLElement.call(this, oHCfg);
        this.setText(sTxt);
    } else {
        OutputHTMLElement.call(this, sTxt);
        this.setText(sTxt.innerHTML);
    }
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputText, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputHTMLElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputText,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                setText: function(sTxt) {
                    sTxt = sTxt.toString();
                    if (this.sText != sTxt) {
                        this.addTickUpdate(() => {
                            this.hElement.innerHTML = this.sText = sTxt;
                        });
                    }
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */