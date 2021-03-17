// Output
const OutputManager = {
	bAutoPositioning: false,
    oViewport: null,
    oContext: {},
    sContextUsed: null,
    oConfig: {
        selectors: {
            OutputViewport: '.outputViewport',
            OutputContext: '.outputContext',
            OutputLayer: '.outputLayer',
            OutputText: '.outputText',
            OutputSprite: '.outputSprite',

            toCreate: '.--outputScope {{elementSelector}}:not(.--outputCreated)'
        },

        class: {
            scope: '--outputScope',
            created: '--outputCreated',
            used: '--outputUsed',
            init: '--outputInitialize'
        },

        HTMLElements: {
            OutputContext: {
                tag: 'section',
                class: 'outputContext'
            },
            OutputLayer: {
                tag: 'div',
                class: 'outputLayer'
            },
            OutputText: {
                tag: 'span',
                class: 'outputText'
            },
            OutputSprite: {
                tag: 'img',
                class: 'outputSprite'
            }
        }
    },

    init: function() {
        this.oViewport = new OutputManager.OutputViewport( document.querySelector( OutputManager.oConfig.selectors.OutputViewport ) );
        OutputManager.OutputLayer.prototype.autoCreateChildElement.call(this.oViewport);
        for( let id in OutputManager.OutputElement.oInstanceByConstructor.OutputContext ){
            const ctx = OutputManager.OutputElement.oInstanceByConstructor.OutputContext[id];
            this.addContext( ctx );
            ctx.hElement.classList.contains( OutputManager.oConfig.class.used ) && this.useContext(id);
        }
        this.oViewport.hElement.classList.add( OutputManager.oConfig.class.init )
    },
    update: function() {
        this.oViewport.update();
        this.sContextUsed && this.oContext[this.sContextUsed].update();
    },

    addContext: function(oCtx) {
        return this.oContext[oCtx.sId] = oCtx;
    },
    getContext: function(sCod) {
        return this.oContext[sCod || this.sContextUsed];
    },
    useContext: function(sCod) {
        let ctx = this.oContext[this.sContextUsed];
        ctx && ctx.unuse();
        ctx = this.oContext[sCod];
        if (ctx) {
            this.sContextUsed = sCod;
            ctx.use();
        } else {
            this.sContextUsed = null;
        }
    },
    getElement: function(sCod){
        return this.OutputElement.oInstance[sCod];
    }
};

Object.assign(
    OutputManager,
    {
        OutputViewport: OutputViewport,
        OutputContext: OutputContext,
        OutputLayer: OutputLayer,
        OutputElement: OutputElement,
        OutputText: OutputText,
        OutputSprite: OutputSprite
    }
);