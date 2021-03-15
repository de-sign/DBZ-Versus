function OutputSprite(sSrc, oHCfg) {
    sSrc = sSrc || '';
    if (typeof sSrc === 'string') {
        OutputElement.call(this, oHCfg);
        this.setSource(sSrc);
    } else {
        OutputElement.call(this, sSrc);
        this.setSource(sSrc.src);
    }
}

Object.assign(
    OutputSprite, {
        prototype: Object.assign(
            Object.create(OutputElement.prototype), {
                constructor: OutputSprite,

                setSource: function(sSrc){
                    this.hElement.src = this.sSource = sSrc;
                }
            }
        )
    }
);