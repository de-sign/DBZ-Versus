function OutputAudioElement() {
    this.oNode = {
        oInput: null,
        oOutput: null
    };
    OutputElement.call(this);
    this.init.apply(this, arguments);
}

Object.assign(
    OutputAudioElement, {
        oAudioContext: new AudioContext(),

        prototype: Object.assign(
            Object.create(OutputElement.prototype), {
                constructor: OutputAudioElement,
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
                }
            }
        )
    }
);