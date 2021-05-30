/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputChannel(sId, nDefaultGain) {
    /* ----- START PROPERTIES ----- */
    this.sId = sId;
    this.oSource = {};
    this.sCurrentSource = null;
    /* ----- END PROPERTIES ----- */

    OutputAudioElement.call(this, nDefaultGain);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputChannel, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        nStepGain: 10,
        /* ----- END PROPERTIES ----- */

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputAudioElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputChannel,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(nDefaultGain){
                    const oMerger = OutputAudioElement.oAudioContext.createChannelMerger(),
                        oGain = OutputAudioElement.oAudioContext.createGain();
                        oMerger.connect(oGain);
                    this.setNode(oMerger, oGain);

                    const oStore = StoreEngine.get(this.sId);
                    this.setGain( oStore ? oStore.nGain : nDefaultGain / OutputChannel.nStepGain );
                },

                add: function(oElm){
                    if( !this.oSource[oElm.sId] ){
                        oElm.connect(this);
                        this.oSource[oElm.sId] = oElm;
                    }
                },
                remove: function(oElm) {
                    if( this.oSource[oElm.sId] ){
                        oElm.disconnect(this);
                        delete this.oSource[oElm.sId];
                    }
                },

                use: function(sCod){
                    let sLast = false;
                    if( this.oSource[sCod] && this.sCurrentSource != sCod ){
                        sLast = this.sCurrentSource;
                        this.sCurrentSource = sCod;
                    }
                    return sLast;
                },
                play: function(sCod, bRestart, bLoop){
                    if( !arguments.length ){
                        sCod = this.sCurrentSource;
                        bRestart = false;
                    }

                    if( this.oSource[sCod] ){
                        this.addTickUpdate( () => {
                            const sLast = this.use(sCod);
                            if( sLast || bRestart ){
                                sLast && this.oSource[sLast].pause();
                                this.oSource[this.sCurrentSource].play(bLoop);
                            } else {
                                this.oSource[this.sCurrentSource].resume();
                            }
                        } );
                    }
                },
                pause: function(){
                    this.addTickUpdate( () => {
                        this.sCurrentSource && this.oSource[this.sCurrentSource].pause();
                    } );
                },
                
                setGain: function(nGain){
                    const oGain = this.oNode.oOutput.gain;
                    this.addTickUpdate( () => {
                        oGain.value = nGain;
                        StoreEngine.update( this.sId, { nGain: nGain } );
                    } );
                },
                setGainAtStep: function(nStep){
                    nStep = Math.min( OutputChannel.nStepGain, Math.max( 0, nStep ) );
                    this.setGain( nStep ? nStep / OutputChannel.nStepGain : 0 );
                },
                getStepGain: function(){
                    return Math.round(this.oNode.oOutput.gain.value * OutputChannel.nStepGain);
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */