function OutputHTMLContext(hElm) {
    OutputLayer.call(this, hElm);
}
Object.assign(
    OutputHTMLContext, {
        prototype: Object.assign(
            Object.create(OutputLayer.prototype), {
                constructor: OutputHTMLContext,

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