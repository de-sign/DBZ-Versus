function OutputSourceBuffer(sId, oBuffer) {
    this.sId = sId;
    this.oBuffer = oBuffer;
    OutputAudioElement.call(this);
}

Object.assign(
    OutputSourceBuffer, {

        prototype: Object.assign(
            Object.create(OutputAudioElement.prototype), {
                constructor: OutputSourceBuffer,

                init: function(){
                    this.setNode(null, OutputAudioElement.oAudioContext.createChannelMerger());
                },
                create: function(){
                    const oBuffer = OutputAudioElement.oAudioContext.createBufferSource();
                    oBuffer.buffer = this.oBuffer;
                    oBuffer.connect( this.oNode.oOutput );
                    oBuffer.addEventListener('ended', () => {
                        oBuffer.disconnect( this.oNode.oOutput );
                    } );
                    return oBuffer;
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
                pause: function(){}
            }
        )
    }
);