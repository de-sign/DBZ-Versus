/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS **Le moteur de jeu.** Il possède tout : l'horloge, le stockage d'information technique, le managers des entrées, des scenes, des sorties. ----- */
function GameEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GameEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        // Components
        /* ----- DETAILS L'horlorge du moteur de jeu : [TimerEngine](TimerEngine.md) ----- */
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