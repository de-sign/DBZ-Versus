// Scene
const SceneManager = {
    oCurrent: null,
    oLast: null,
    oTransverseData: {},

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
};

function Scene() {
    this.oContext = null;
    this.oTransverseData = null;
}
Object.assign(
    Scene, {
        prototype: {
            init: function(sUseContext) {
                sUseContext && ( this.oContext = OutputManager.oViewport.useContext(sUseContext) );
            },
            update: function() {},
            destroy: function() {}
        }
    }
);