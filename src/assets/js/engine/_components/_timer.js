/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function TimerEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    TimerEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        dStart: null,
        dLast: null,
        nFrames: 0,
        nFramesToSkip: 0,
        nFramesSkip: 0,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        tick: function() {
            if (this.isStarted()) {
                if( this.nFramesSkip < this.nFramesToSkip ){
                    this.nFramesSkip++;
                } else {
                    this.nFramesSkip = 0;
                    this.nFrames++;
                    this.dUpdate = Date.now();
                    GameEngine.update();
                    this.dLastUpdate = Date.now();
                }
                requestAnimationFrame( () => {
                    this.tick();
                } );
            }
        },
        run: function() {
            if (!this.isStarted()) {
                this.dStart = Date.now();
                this.tick();
            }
        },
        stop: function() {
            if (this.isStarted()) {
                this.dStart = this.dLast = null;
                this.nFrames = 0;
            }
        },
        isStarted: function() {
            return this.dStart != null;
        },
        setFPS: function(nFps) {
            this.nFramesToSkip = parseInt(60 / nFps - 1);
        }
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */