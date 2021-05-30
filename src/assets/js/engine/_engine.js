/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS **Le moteur de jeu.** Il possède tout : l'horloge, le stockage d'informations persistantes, le managers des entrées, des scenes, des sorties. ----- */
function GameEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GameEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        // Components
        /* ----- DETAILS L'horlorge du moteur de jeu : [TimerEngine](TimerEngine.md) ----- */
        oTimer: TimerEngine,
        /* ----- DETAILS Le système de stockage d'informations persistantes : [StoreEngine](StoreEngine.md) ----- */
        oStore: StoreEngine,

        // Managers
        /* ----- DETAILS Le gestionnaire des entrées : [ControllerManager](ControllerManager.md) ----- */
        oInput: ControllerManager,
        /* ----- DETAILS Le gestionnaire des scènes de jeu : [SceneManager](SceneManager.md) ----- */
        oScene: SceneManager,
        /* ----- DETAILS Le gestionnaire des sorties : [OutputManager](OutputManager.md) ----- */
        oOutput: OutputManager,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* ----- DETAILS Si l'horloge n'est pas en route, initialise les gestionnaires et démarre l'horloge ----- */
        start: function() {
            if (!this.oTimer.isStarted()) {
                this.oInput.init();
                this.oOutput.init();
                this.oScene.init();
                this.oTimer.run();
            }
        },
        /* ----- DETAILS
        Mets à jours les gestionnaires dans l'ordre suivant :
        - [ControllerManager.update()](ControllerManager.md)
        - [SceneManager.update()](SceneManager.md)
        - [OutputManager.update()](OutputManager.md)
        ----- */
        update: function() {
            this.oInput.update();
            this.oScene.update();
            this.oOutput.update();
        },
        /* ----- DETAILS Arrete l'horloge et detruit la scène en cours ----- */
        stop: function() {
            this.oTimer.stop();
            this.oScene.destroy();
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */