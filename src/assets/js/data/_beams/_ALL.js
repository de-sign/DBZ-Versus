GAME.oData.oBeam.ALL = {
    sCod: 'ALL',
    bActive: true,
    aColor: [
        {
            sCod: 'BLU',
            sName: 'Blue beams'
        },
        {
            sCod: 'ORG',
            sName: 'Orange beams'
        },
        {
            sCod: 'PRP',
            sName: 'Purple beams'
        }
    ],

    oFrames: {
        beam: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox:  {
                nX: 30,
                nY: -98,
                nHeight: 24,
                nWidth: 1024
            }
        },

        circle_first: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox:  {
                nX: 30,
                nY: -110,
                nHeight: 48,
                nWidth: 1024
            }
        },
        circle_second: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox: {
                nX: 30,
                nY: -142,
                nHeight: 112,
                nWidth: 1024
            }
        },

        triangle_first: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox:  {
                nX: 30,
                nY: -118,
                nHeight: 64,
                nWidth: 1024
            }
        },
        triangle_second: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox: {
                nX: 30,
                nY: -126,
                nHeight: 80,
                nWidth: 1024
            }
        },
        triangle_third: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox: {
                nX: 30,
                nY: -142,
                nHeight: 112,
                nWidth: 1024
            }
        }
    },
    
    oAnimations: {
        beam: [
            {
                nFrame: 8,
                sFrame: 'beam'
            }
        ],

        circle: [
            {
                nFrame: 2,
                sFrame: 'beam'
            },
            {
                nFrame: 2,
                sFrame: 'circle_first'
            },
            {
                nFrame: 36,
                sFrame: 'circle_second'
            },
            {
                nFrame: 2,
                sFrame: 'circle_first'
            },
            {
                nFrame: 2,
                sFrame: 'beam'
            }
        ],

        triangle: [
            {
                nFrame: 2,
                sFrame: 'beam'
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first'
            },
            {
                nFrame: 36,
                sFrame: 'triangle_second'
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first'
            },
            {
                nFrame: 2,
                sFrame: 'beam'
            }
        ],
        big_triangle: [
            {
                nFrame: 2,
                sFrame: 'beam'
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first'
            },
            {
                nFrame: 22,
                sFrame: 'triangle_second'
            },
            {
                nFrame: 32,
                sFrame: 'triangle_third'
            },
            {
                nFrame: 2,
                sFrame: 'triangle_second'
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first'
            },
            {
                nFrame: 2,
                sFrame: 'beam'
            }
        ]
    }
};