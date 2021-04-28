GAME.oData.oEntity.oProjectile = {

    oFrames: {
        kikoha: {
            sPath: 'kikoha.png'
        },
        death_first: {
            sPath: 'death_first.png'
        },
        death_second: {
            sPath: 'death_second.png'
        },
        ball_first: {
            sPath: 'ball_first.png'
        },
        ball_second: {
            sPath: 'ball_second.png'
        },

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