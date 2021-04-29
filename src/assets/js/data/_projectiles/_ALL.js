GAME.oData.oProjectile.ALL = {
    sEntity: 'ALL',
    aColor: [
        {
            sColor: 'BLU',
            sName: 'Blue kikoha'
        },
        {
            sColor: 'ORG',
            sName: 'Orange kikoha'
        },
        {
            sColor: 'PNK',
            sName: 'Pink kikoha'
        },
        {
            sColor: 'PRP',
            sName: 'Purple kikoha'
        }
    ],

    oFrames: {
        kikoha: {
            aHurtBox: [
                {
                    nX: -16,
                    nY: -82,
                    nWidth: 40,
                    nHeight: 40
                }
            ],
            aHitBox: [
                {
                    nX: -16,
                    nY: -82,
                    nWidth: 40,
                    nHeight: 40
                }
            ]
        },

        death_first: {
            aHurtBox: [
                {
                    nX: -38,
                    nY: -94,
                    nWidth: 72,
                    nHeight: 72
                }
            ],
            aHitBox: [
                {
                    nX: -38,
                    nY: -94,
                    nWidth: 72,
                    nHeight: 72
                }
            ]
        },
        death_second: {
            aHurtBox: [
                {
                    nX: -70,
                    nY: -130,
                    nWidth: 136,
                    nHeight: 136
                }
            ],
            aHitBox: [
                {
                    nX: -70,
                    nY: -130,
                    nWidth: 136,
                    nHeight: 136
                }
            ]
        },

        ball_first: {
            aHurtBox: [
                {
                    nX: -52,
                    nY: -114,
                    nWidth: 104,
                    nHeight: 104
                }
            ],
            aHitBox: [
                {
                    nX: -52,
                    nY: -114,
                    nWidth: 104,
                    nHeight: 104
                }
            ]
        },
        ball_second: {
            aHurtBox: [
                {
                    nX: -98,
                    nY: -158,
                    nWidth: 196,
                    nHeight: 196
                }
            ],
            aHitBox: [
                {
                    nX: -98,
                    nY: -158,
                    nWidth: 196,
                    nHeight: 196
                }
            ]
        },

        hit_light: false,
        hit_heavy: false
    },
    
    oAnimations: {
        kikoha: {
            oMove: {
                nX: 12
            },
            aFrames: [
                {
                    sFrame: 'kikoha',
                    nFrame: 90
                }
            ]
        },

        death: {
            oMove: {
                nDelay: 30,
                nX: 16,
                nY: 4
            },
            aFrames: [
                {
                    sFrame: 'death_first',
                    nFrame: 15,
                    aHitBox: null
                },
                {
                    sFrame: 'death_second',
                    nFrame: 15,
                    aHitBox: null
                },
                {
                    sFrame: 'death_second',
                    nFrame: 105
                }
            ]
        },

        ball: {
            oMove: {
                nDelay: 30,
                nX: 16,
                nY: 6
            },
            aFrames: [
                {
                    sFrame: 'ball_first',
                    nFrame: 15,
                    aHitBox: null
                },
                {
                    sFrame: 'ball_second',
                    nFrame: 15,
                    aHitBox: null
                },
                {
                    sFrame: 'ball_second',
                    nFrame: 90
                }
            ]
        }
    }
};