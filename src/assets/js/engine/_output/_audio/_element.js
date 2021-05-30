/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputAudioElement(){
    /* ----- START PROPERTIES ----- */
    this.oNode = {
        oInput: null,
        oOutput: null
    };
    /* ----- END PROPERTIES ----- */

    OutputElement.call(this);
    this.init.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputAudioElement, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        oAudioContext: new AudioContext(),
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputAudioElement,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(){},

                setNode: function(oInput, oOutput) {
                    const oNode = {};
                    if( oInput !== undefined ){
                        oNode.oInput = oInput;
                    }
                    if( oOutput !== undefined ){
                        oNode.oOutput = oOutput;
                    }
                    Object.assign(this.oNode, oNode);
                },
                connect: function(oElm) {
                    if( this.oParentElement != oElm ){
                        this.oParentElement = oElm;
                        this.oNode.oOutput.connect( oElm.oNode.oInput );
                    }
                },
                disconnect: function(oElm) {
                    if( this.oParentElement == oElm ){
                        this.oParentElement = null;
                        this.oNode.oOutput.disconnect( oElm.oNode.oInput );
                    }
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */