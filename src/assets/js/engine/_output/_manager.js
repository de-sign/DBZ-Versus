/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputManager(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputManager, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
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
        OutputSprite: OutputSprite,
        
        oViewport: null,
        oAudio: new OutputAudioContext(),
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
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        init: function() {
            this.oViewport = new OutputViewport( document.querySelector( this.oConfig.selectors.OutputViewport ) );
            this.oViewport.autoCreateChildElement();
            for( let id in OutputElement.oInstanceByConstructor.OutputHTMLContext ){
                const oCtx = OutputElement.oInstanceByConstructor.OutputHTMLContext[id];
                this.oViewport.add(oCtx);
                oCtx.hElement.classList.contains( this.oConfig.class.used ) && this.oViewport.useContext(id);
            }
            this.oViewport.hElement.classList.add( this.oConfig.class.init );
        },
        update: function() {
            this.oViewport.update();
            this.oAudio.update();
        },

        getElement: function(sCod){
            return OutputElement.oInstance[sCod];
        },
        getChannel: function(sCod){
            return this.oAudio.oChannel[sCod];
        },
        getContext: function(sCod) {
            return this.oViewport.getContext(sCod);
        }
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */