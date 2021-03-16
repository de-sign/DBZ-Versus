GAME.oData.oCharacter.GKU = {
    sCod: 'GKU',
    sName: 'Son Gokū SSJ',
    oFrames: {
        stand: {
            sPath: 'stand.png',
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 46 * 4
            }
        },
        blur: {
            sPath: 'blur.png',
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-14 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 30 * 4,
                nHeight: 46 * 4
            }
        },
        backward: {
            sPath: 'backward.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-15 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 46 * 4
            }
        },
        forward: {
            sPath: 'forward.png',
            nZIndex: 20,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 32 * 4,
                nHeight: 43 * 4
            }
        },
        light: {
            sPath: 'light.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 44 * 4
            },
            oHitBox: {
                nX: (7 * 4) + 2,
                nY: (-24 * 4) - 2,
                nWidth: 12 * 4,
                nHeight: 8 * 4
            }
        },
        heavy: {
            sPath: 'heavy.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 18 * 4,
                nHeight: 28 * 4
            },
            oHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-44 * 4) - 2,
                nWidth: 39 * 4,
                nHeight: 45 * 4
            },
            oHitBox: {
                nX: (9 * 4) + 2,
                nY: (-25 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 11 * 4
            }
        },
        
    },
    oAnimations: {
        stand: [
            {
                sFrame: 'stand'
            }
        ],
        forward: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oMove: {
                    nX: 6
                }
            },
            {
                sFrame: 'forward',
                oMove: {
                    nX: 6
                }
            }
        ],
        backward: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oMove: {
                    nX: -6
                }
            },
            {
                sFrame: 'backward',
                oMove: {
                    nX: -6
                }
            }
        ]
    },
    oManipulations: {

    }
};