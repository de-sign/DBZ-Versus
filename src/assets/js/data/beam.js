GAME.oData.oEntity.oEffect = {

    oFrames: {
        hit_light: {
            sPath: '../__common/hit_light.png',
            nZIndex: 80
        },
        hit_heavy: {
            sPath: '../__common/hit_heavy.png',
            nZIndex: 80
        }
    },
    
    oAnimations: {
        hit_light: [
            {
                sFrame: 'hit_light',
                nFrame: 8
            }
        ],
        hit_heavy: [
            {
                sFrame: 'hit_light',
                nFrame: 2
            },
            {
                sFrame: 'hit_heavy',
                nFrame: 16
            },
            {
                sFrame: 'hit_light',
                nFrame: 4
            }
        ]
    }
};