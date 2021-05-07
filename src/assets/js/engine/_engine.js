/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function GameEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GameEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        // Components
        oTimer: TimerEngine,
        oStore: StoreEngine,

        // Managers
        oInput: ControllerManager,
        oScene: SceneManager,
        oOutput: OutputManager,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
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
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */