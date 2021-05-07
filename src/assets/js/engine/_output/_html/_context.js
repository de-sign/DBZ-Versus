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
                    this.addTickUpdate( () => {
                        this.hElement.classList.add( OutputManager.oConfig.class.init );
                    } );
                },
                unuse: function() {
                    this.hElement.classList.remove( OutputManager.oConfig.class.used, OutputManager.oConfig.class.init );
                }
            }
        )
    }
);