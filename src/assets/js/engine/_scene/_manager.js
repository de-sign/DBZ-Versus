/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS Le gestionnaire des scènes de jeu avec un stockage de données transverse. ----- */
function SceneManager(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    SceneManager, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* ----- DETAILS Contient la scène en cours : [Scene](Scene.md) ----- */
        oCurrent: null,
        /* ----- DETAILS Contient la scène gérer précédemment. ----- */
        oLast: null,
        /* ----- DETAILS
        Contient les données transvèrses des scenes.
        Est surchargé à chaque destruction d'une scene.
        ----- */
        oTransverseData: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* ----- DETAILS Initialise la scène en cours : [Scene.prototype.update](Scene.md). ----- */
        init: function() {
            this.oCurrent.init();
        },
        /* ----- DETAILS Mets à jour la scène en cours. ----- */
        update: function() {
            this.oCurrent.update();
        },
        /* ----- DETAILS Détruit la scène en cours, la stock comme scène précédente et surchage les données transverse. ----- */
        destroy: function() {
            this.oLast = this.oCurrent;
            this.oCurrent = null;
            Object.assign(
                this.oTransverseData,
                this.oLast.destroy() || {}
            );
        },

        /* ----- DETAILS Défini la scène transmise comme étant celle en cours. ----- */
        set: function(oScn) {
            this.oCurrent = oScn;
        },
        /* ----- DETAILS Détruit la scène en cours, défini la scène transmise comme courante et l'initialise. ----- */
        change: function(oScn) {
            this.destroy();
            this.set(oScn);
            this.init();
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */

/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS Classe de définition ayant pour unique but d'être mère des classes scenes du jeu. ----- */
function Scene() {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Context de sortie visuel de la scene : [OutputHTMLContext](OutputHTMLContext.md). ----- */
    this.oContext = null;
    /* ----- DETAILS FRAME de l'horloge interne lors de son initialisation : [TimerEngine.nFrames](TimerEngine.md). ----- */
    this.nFrameCreated = 0;
    /* ----- END PROPERTIES ----- */
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    Scene, {
        prototype: {
            constructor: Scene,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            /* ----- DETAILS
            Utilise le context transmis si défini et récupère la FRAME de l'horloge interne :
            - [OutputViewport.useContext()](OutputViewport.md)
            - [TimerEngine.nFrames](TimerEngine.md)
            ----- */
            init: function(sUseContext) {
                sUseContext && ( this.oContext = OutputManager.oViewport.useContext(sUseContext) );
                this.nFrameCreated = TimerEngine.nFrames;
            },
            /* ----- DETAILS Fonction de mise à jour de la scène, voué à être surcharger. ----- */
            update: function() {},
            /* ----- DETAILS
            Fonction de destruction de la scène, voué à être surcharger.    
            Si elle retourne un objet, ce dernier est utilisé pour surcharger les données transvères du gestionnaire de scene : [SceneManager.oTransverseData](SceneManager.md)
            ----- */
            destroy: function() {}
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */