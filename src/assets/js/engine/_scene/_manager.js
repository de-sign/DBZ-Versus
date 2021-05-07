/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function SceneManager(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    SceneManager, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        oCurrent: null,
        oLast: null,
        oTransverseData: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        init: function() {
            this.oCurrent.init();
        },
        update: function() {
            this.oCurrent.update();
        },
        destroy: function() {
            this.oLast = this.oCurrent;
            this.oCurrent = null;
            Object.assign(
                this.oTransverseData,
                this.oLast.destroy() || {}
            );
        },

        set: function(oScn) {
            this.oCurrent = oScn;
        },
        change: function(oScn) {
            this.destroy();
            this.set(oScn);
            this.init();
        }
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */

/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function Scene() {
    /* ----- START PROPERTIES ----- */
    this.oContext = null;
    this.nFrameCreated = 0;
    this.oTransverseData = null;
    /* ----- END PROPERTIES ----- */
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    Scene, {
        prototype: {
            constructor: Scene,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            init: function(sUseContext) {
                sUseContext && ( this.oContext = OutputManager.oViewport.useContext(sUseContext) );
                this.nFrameCreated = TimerEngine.nFrames;
            },
            update: function() {},
            destroy: function() {}
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */