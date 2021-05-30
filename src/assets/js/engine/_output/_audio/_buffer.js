/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputSourceBuffer(sId, oSource) {
    OutputSource.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputSourceBuffer, {

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputSource.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputSourceBuffer,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(){
                    this.setNode(null, OutputAudioElement.oAudioContext.createChannelMerger());
                },
                create: function(){
                    const oSource = OutputAudioElement.oAudioContext.createBufferSource();
                    oSource.buffer = this.oSource;
                    oSource.connect( this.oNode.oOutput );
                    oSource.addEventListener('ended', () => {
                        oSource.disconnect( this.oNode.oOutput );
                    } );
                    return oSource;
                },

                play: function(bLoop){
                    const oSource = this.create();
                    if( bLoop != null ){
                        oSource.loop = bLoop;
                    }
                    oSource.start();
                },
                resume: function(){
                    this.play();
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */