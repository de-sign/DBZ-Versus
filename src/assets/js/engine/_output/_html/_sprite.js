function OutputSprite(sSrc, oHCfg) {
    sSrc = sSrc || '';
    if (typeof sSrc === 'string') {
        OutputHTMLElement.call(this, oHCfg);
        this.setSource(sSrc);
    } else {
        OutputHTMLElement.call(this, sSrc);
        this.setSource(sSrc.src);
    }
}

Object.assign(
    OutputSprite, {
        prototype: Object.assign(
            Object.create(OutputHTMLElement.prototype), {
                constructor: OutputSprite,

                setSource: function(sSrc){
                    this.hElement.src = this.sSource = sSrc;
                }
            }
        )
    }
);