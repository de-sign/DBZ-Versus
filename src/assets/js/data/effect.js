GAME.oData.oEntity.oEffect = {

    oPath: GAME.oSettings.oPath.oEffect,

    oFrames: {
        explode_light: {
            sPath: 'explode_light.png',
            nZIndex: 80
        },
        explode_heavy: {
            sPath: 'explode_heavy.png',
            nZIndex: 80
        }
    },
    
    oAnimations: {
        explode_light: {
            aFrames: [
                {
                    sFrame: 'explode_light',
                    nFrame: 8
                }
            ]
        },
        explode_heavy: {
            aFrames: [
                {
                    sFrame: 'explode_light',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_heavy',
                    nFrame: 16
                },
                {
                    sFrame: 'explode_light',
                    nFrame: 4
                }
            ]
        }
    }
};