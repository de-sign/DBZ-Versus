//=include _input.js
//=include _scene.js

//=include _output/_element.js
//=include _output/_audio/_element.js
//=include _output/_audio/_context.js
//=include _output/_audio/_channel.js
//=include _output/_audio/_audio.js
//=include _output/_audio/_buffer.js
//=include _output/_html/_element.js
//=include _output/_html/_layer.js
//=include _output/_html/_viewport.js
//=include _output/_html/_context.js
//=include _output/_html/_text.js
//=include _output/_html/_sprite.js
//=include _output.js

window.GAME = {

    // Timer
    oTimer: {
        dStart: null,
        dLast: null,
        nFrames: 0,
        nFramesToSkip: 0,
        nFramesSkip: 0,

        tick: function() {
            if (this.isStarted()) {
                if( this.nFramesSkip < this.nFramesToSkip ){
                    this.nFramesSkip++;
                } else {
                    this.nFramesSkip = 0;
                    this.nFrames++;
                    this.dUpdate = Date.now();
                    GAME.update();
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
    },

    // Managers
    oInput: ControllerManager,
    oScene: SceneManager,
    oOutput: OutputManager,

    // Methods
    start: function() {
        if (!this.oTimer.isStarted()) {
            this.oInput.init();
            this.oOutput.init();
            this.oScene.init();
            this.oTimer.run();
        }
    },
    update: function() {
        this.oInput.update();
        this.oScene.update();
        this.oOutput.update();
    },
    stop: function() {
        this.oTimer.stop();
        this.oScene.destroy();
    }
};