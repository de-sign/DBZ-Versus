function OutputContext(hElm) {
    OutputLayer.call(this, hElm);
}
Object.assign(
    OutputContext, {
        prototype: Object.assign(
            Object.create(OutputLayer.prototype), {
                constructor: OutputContext,

                use: function() {
                    this.hElement.classList.add( OutputManager.oConfig.class.used );
                },
                unuse: function() {
                    this.hElement.classList.remove( OutputManager.oConfig.class.used );
                }
            }
        )
    }
);