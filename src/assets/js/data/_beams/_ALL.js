GameData.oBeam.ALL = {
    sEntity: 'ALL',
    aColor: [
        {
            sColor: 'BLU',
            sName: 'Blue beams'
        },
        {
            sColor: 'ORG',
            sName: 'Orange beams'
        },
        {
            sColor: 'PNK',
            sName: 'Pink beams'
        },
        {
            sColor: 'PRP',
            sName: 'Purple beams'
        }
    ],

    oFrames: {
        beam: {
            aHitBox:  {
                nX: 30,
                nY: -98,
                nHeight: 24,
                nWidth: 1024
            }
        },

        zigzag: {
            aHitBox:  {
                nX: 30,
                nY: -110,
                nHeight: 48,
                nWidth: 1024
            }
        },

        circle_first: {
            aHitBox:  {
                nX: 30,
                nY: -110,
                nHeight: 48,
                nWidth: 1024
            }
        },
        circle_second: {
            aHitBox: {
                nX: 30,
                nY: -142,
                nHeight: 112,
                nWidth: 1024
            }
        },

        triangle_first: {
            aHitBox:  {
                nX: 30,
                nY: -118,
                nHeight: 64,
                nWidth: 1024
            }
        },
        triangle_second: {
            aHitBox: {
                nX: 30,
                nY: -126,
                nHeight: 80,
                nWidth: 1024
            }
        },
        triangle_third: {
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

        zigzag: [
            {
                nFrame: 2,
                sFrame: 'beam',
                aHitBox: null
            },
            {
                nFrame: 40,
                sFrame: 'zigzag'
            },
            {
                nFrame: 2,
                sFrame: 'beam'
            }
        ],

        circle: [
            {
                nFrame: 2,
                sFrame: 'beam',
                aHitBox: null
            },
            {
                nFrame: 2,
                sFrame: 'circle_first',
                aHitBox: null
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
                sFrame: 'beam',
                aHitBox: null
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first',
                aHitBox: null
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
                sFrame: 'beam',
                aHitBox: null
            },
            {
                nFrame: 2,
                sFrame: 'triangle_first',
                aHitBox: null
            },
            {
                nFrame: 2,
                sFrame: 'triangle_second',
                aHitBox: null
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