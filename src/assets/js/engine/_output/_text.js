function OutputText(sTxt, oHCfg) {
    sTxt || (sTxt = '');
    if (typeof sTxt === 'string') {
        OutputElement.call(this, oHCfg);
        this.setText(sTxt);
    } else {
        OutputElement.call(this, sTxt);
        this.setText(sTxt.innerHTML);
    }
}
Object.assign(
    OutputText, {
        prototype: Object.assign(
            Object.create(OutputElement.prototype), {
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