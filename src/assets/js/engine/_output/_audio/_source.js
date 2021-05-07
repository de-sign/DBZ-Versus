/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputSource(sId, oSource){
    this.sId = sId;
    this.oSource = oSource;

    OutputAudioElement.call(this);
}
/* ----- END CONSTRUCTOR ----- */
Object.assign(
    OutputSource, {

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputAudioElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputSource,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                play: function(){},
                pause: function(){},
                resume: function(){}
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */