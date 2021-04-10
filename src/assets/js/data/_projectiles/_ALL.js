GAME.oData.oProjectile.ALL = {
    sCod: 'ALL',
    bActive: true,
    aColor: [
        {
            sCod: 'BLU',
            sName: 'Blue kikoha'
        },
        {
            sCod: 'ORG',
            sName: 'Orange kikoha'
        },
        {
            sCod: 'PRP',
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
        hit_light: false
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
        }
    }
};