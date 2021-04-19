// Output
const OutputManager = {
    oContext: {},
    sContextUsed: null,
    oViewport: null,
    oAudio: new OutputAudioContext(),
	bAutoPositioning: false,
    oConfig: {
        selectors: {
            OutputViewport: '.outputViewport',
            OutputHTMLContext: '.outputContext',
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
            OutputHTMLContext: {
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
        // HTML
        this.oViewport = new OutputManager.OutputViewport( document.querySelector( OutputManager.oConfig.selectors.OutputViewport ) );
        OutputManager.OutputLayer.prototype.autoCreateChildElement.call(this.oViewport);
        for( let id in OutputManager.OutputElement.oInstanceByConstructor.OutputHTMLContext ){
            const ctx = OutputManager.OutputElement.oInstanceByConstructor.OutputHTMLContext[id];
            this.addContext( ctx );
            ctx.hElement.classList.contains( OutputManager.oConfig.class.used ) && this.useContext(id);
        }
        this.oViewport.hElement.classList.add( OutputManager.oConfig.class.init );
    },
    update: function() {
        this.oViewport.update();
        this.sContextUsed && this.oContext[this.sContextUsed].update();
        this.oAudio.update();
    },

    addContext: function(oCtx) {
        return this.oContext[oCtx.sId] = oCtx;
    },
    getContext: function(sCod) {
        return this.oContext[sCod || this.sContextUsed];
    },
    useContext: function(sCod) {
        if( sCod != 'CTX__Audio' ){
            let ctx = this.oContext[this.sContextUsed];
            ctx && ctx.unuse();
            ctx = this.oContext[sCod];
            if (ctx) {
                this.sContextUsed = sCod;
                ctx.use();
            } else {
                this.sContextUsed = null;
            }
        }
    },

    getElement: function(sCod){
        return this.OutputElement.oInstance[sCod];
    },

    getChannel: function(sCod){
        return this.oAudio.oChannel[sCod];
    }
};

Object.assign(
    OutputManager,
    {
        OutputElement: OutputElement,
        OutputAudioElement: OutputAudioElement,
        OutputAudioContext: OutputAudioContext,
        OutputChannel: OutputChannel,
        OutputSourceAudio: OutputSourceAudio,
        OutputSourceBuffer: OutputSourceBuffer,
        OutputHTMLElement: OutputHTMLElement,
        OutputLayer: OutputLayer,
        OutputViewport: OutputViewport,
        OutputHTMLContext: OutputHTMLContext,
        OutputText: OutputText,
        OutputSprite: OutputSprite
    }
);