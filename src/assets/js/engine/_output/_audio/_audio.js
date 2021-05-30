/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputSourceAudio(sId, oSource) {
    OutputSource.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputSourceAudio, {

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputSource.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputSourceAudio,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(){
                    this.setNode(null, OutputAudioElement.oAudioContext.createMediaElementSource(this.oSource));
                },

                play: function(bLoop){
                    if( bLoop != null ){
                        this.oSource.loop = bLoop;
                    }
                    this.oSource.currentTime = 0;
                    this.oSource.play();
                },
                resume: function(){
                    this.oSource.paused && this.oSource.play();
                },
                pause: function(){
                    this.oSource.paused || this.oSource.pause();
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */