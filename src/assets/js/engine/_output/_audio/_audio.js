function OutputSourceAudio(sId, oAudio) {
    this.sId = sId;
    this.oAudio = oAudio;
    OutputAudioElement.call(this);
}

Object.assign(
    OutputSourceAudio, {

        prototype: Object.assign(
            Object.create(OutputAudioElement.prototype), {
                constructor: OutputSourceAudio,

                init: function(){
                    this.setNode(null, OutputAudioElement.oAudioContext.createMediaElementSource(this.oAudio));
                },

                play: function(bLoop){
                    if( bLoop != null ){
                        this.oAudio.loop = bLoop;
                    }
                    this.oAudio.currentTime = 0;
                    this.oAudio.play();
                },
                resume: function(){
                    this.oAudio.paused && this.oAudio.play();
                },
                pause: function(){
                    this.oAudio.paused || this.oAudio.pause();
                }
            }
        )
    }
);