/* ----- START CLASS ----- */
/* ----- MENU GameEngine/System ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS
L'horlorge du moteur de jeu, avec une possibilité de paramétrage du FPS    
Utilise l'API WEB [requestAnimationFrame()](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame).
----- */
function TimerEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    TimerEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Technical properties
        DETAILS Les propriétés suivantes sont purement technique et ne devrait être utilisé principalement que par le système
        ----- */

        /* ----- DETAILS Nombre de FRAMES à _éviter_ avant la mise à jour de la suivante afin de respecter le FPS défini. ----- */
        nFramesToSkip: 0,
        /* ----- DETAILS Nombre de FRAMES _évité_ depuis la dernière FRAME mise à jour afin de respecter le FPS défini. ----- */
        nFramesSkip: 0,
        /* ----- END PROPERTIES ----- */

        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Utilitary properties
        DETAILS Les propriétés suivantes sont destinées à être utilisé par le système ou par un développeur
        ----- */

        /* ----- DETAILS TIMESTAMP du démarage de l'horloge : [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now) ----- */
        dStart: null,
        /* ----- DETAILS TIMESTAMP du début de la mise à jour actuelle du moteur de jeu :
        - [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
        - [GameEngine](GameEngine.md)
        ----- */
        dUpdate: null,
        /* ----- DETAILS TIMESTAMP de fin de la dernière mise à jour du moteur de jeu :
        - [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
        - [GameEngine](GameEngine.md)
        ----- */
        dLastUpdate: null,
        /* ----- DETAILS Nombre de FRAMES mise à jour depuis le démarage de l'horloge ----- */
        nFrames: 0,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* -----
        SUBCATEGORY Technical methods
        DETAILS Les méthodes suivantes sont purement technique et ne devrait être utilisé principalement que par le système
        ----- */

        /* ----- DETAILS
        Mise à jour de l'horloge interne.    
        Mets à jours les FRAMES évités. Si la FRAME courante doit être mise à jour, change les TIMESTAMP et mets à jour le moteur de jeu : [GameEngine](GameEngine.md).
        ----- */
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
        /* ----- DETAILS Démarre ou redémarre l'horloge si ce n'est pas le cas ----- */
        run: function() {
            if( !this.isStarted() ) {
                this.dStart = this.dLastUpdate || Date.now();
                this.tick();
            }
        },
        /* ----- DETAILS Mets en pause l'horloge si ce n'est pas le cas ----- */
        pause: function() {
            if( this.isStarted() ) {
                this.dStart = null;
            }
        },
        /* ----- DETAILS Arrete l'horloge si ce n'est pas le cas ----- */
        stop: function() {
            if( this.isStarted() ) {
                this.dStart = this.dLastUpdate = null;
                this.nFrames = 0;
            }
        },
        /* ----- DETAILS Indique si l'horloge tourne ----- */
        isStarted: function() {
            return this.dStart != null;
        },
        /* ----- END METHODS ----- */

        /* ----- START METHODS ----- */
        /* -----
        SUBCATEGORY Utilitary methods
        DETAILS Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur
        ----- */
        /* ----- DETAILS
        Défini le FPS en modifiant le nombre de FRAMES à _éviter_.    
        Ne peux pas être supérieur à 60 FPS.
        ----- */
        setFPS: function(nFps) {
            this.nFramesToSkip = parseInt(60 / Math.min(nFps, 60) - 1);
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */