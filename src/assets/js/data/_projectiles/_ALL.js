GAME.oData.oProjectile.ALL = {
    sEntity: 'ALL',
    bActive: true,
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