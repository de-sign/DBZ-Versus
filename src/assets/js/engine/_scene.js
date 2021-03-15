// Scene
const SceneManager = {
    oCurrent: null,
    oLast: null,
    oLastData: null,

    init: function() {
        this.oCurrent.init(this.oLastData);
    },
    update: function() {
        this.oCurrent.update();
    },
    destroy: function() {
        this.oLast = this.oCurrent;
        this.oCurrent = null;
        this.oLastData = this.oLast.destroy();
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

function Scene() {}
Object.assign(
    Scene, {
        prototype: {
            init: function() {},
            update: function() {},
            destroy: function() {}
        }
    }
);