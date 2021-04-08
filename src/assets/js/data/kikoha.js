Object.assign(
    GAME.oData,
    {
        oKikoha: {
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
                stand: {
                    sPath: 'stand.png',
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
                hit_light: {
                    sPath: '../hit_light.png'
                }
            },
            oAnimations: {
                stand: {
                    oMove: {
                        nX: 12
                    },
                    aFrames: [
                        {
                            sFrame: 'stand',
                            nFrame: 90
                        }
                    ]
                },
                hit_light: {
                    aFrames: [
                        {
                            sFrame: 'hit_light',
                            nFrame: 8
                        }
                    ]
                }
            }
        }
    }
);