function OutputAudioContext() {
    this.sId = 'AD__Game';
    this.oChannel = {};
    OutputAudioElement.call(this);
}

Object.assign(
    OutputAudioContext, {

        prototype: Object.assign(
            Object.create(OutputAudioElement.prototype), {
                constructor: OutputAudioContext,

                init: function(){
                    const oMerger = OutputAudioElement.oAudioContext.createChannelMerger();
                    oMerger.connect( OutputAudioElement.oAudioContext.destination );
                    this.setNode(oMerger, null);
                },
                update: function(){
                    for( let sChannel in this.oChannel ){
                        this.oChannel[sChannel].update();
                    }
                    OutputElement.prototype.update.call(this);
                },

                add: function(oElm){
                    if( !this.oChannel[oElm.sId] ){
                        oElm.connect(this);
                        this.oChannel[oElm.sId] = oElm;
                    }
                },
                remove: function(oElm) {
                    if( this.oChannel[oElm.sId] ){
                        oElm.disconnect(this);
                        delete this.oChannel[oElm.sId];
                    }
                },

                resume: function(){
                    OutputAudioElement.oAudioContext.resume();
                },
                suspend: function(){
                    OutputAudioElement.oAudioContext.suspend();
                }
            }
        )
    }
);