function OutputText(sTxt, oHCfg) {
    sTxt || (sTxt = '');
    if (typeof sTxt === 'string') {
        OutputHTMLElement.call(this, oHCfg);
        this.setText(sTxt);
    } else {
        OutputHTMLElement.call(this, sTxt);
        this.setText(sTxt.innerHTML);
    }
}
Object.assign(
    OutputText, {
        prototype: Object.assign(
            Object.create(OutputHTMLElement.prototype), {
                constructor: OutputText,

                setText: function(sTxt) {
                    if (this.sText != sTxt) {
                        this.addTickUpdate(() => {
                            this.hElement.innerHTML = this.sText = sTxt;
                        });
                    }
                }
            }
        )
    }
);