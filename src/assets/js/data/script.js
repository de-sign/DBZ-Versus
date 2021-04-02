Object.assign(
    GAME,
    {
        oSettings: {
            
            // Technique
            oPath: {
                oCharacter: {
                    sRoot: 'assets/images/characters',
                    sFace: 'assets/images/characters/face',
                    sFrames: 'assets/images/characters/frames',
                    sPreview: 'assets/images/characters/preview'
                },
                oStage: {
                    sRoot: 'assets/images/stages',
                    sBackground: 'assets/images/stages/background',
                    sPreview: 'assets/images/stages/preview'
                }
            },
            nPlayer: 2,
            sStartScene: 'InitializeScene',
            oPositionPoint: {
                nX: 98,
                nY: 182,
                nGapY: 200 - 182 - 2
            },

            // Game
            nLife: 30,
            nKi: 20,
            oLuncher: {
                nLength: 36,
                nInvulnerable: 8,
                oMove: {
                    nX: -63 * 4,
                    nY: -54 * 4
                },
                oFrames: {
                    sLunch: 'hit_luncher',
                    sFall: 'hit_fall'
                }
            },
            nFreeze: 6,
            oPushback: {
                nLength: 4,
                nX: -24
            },
            oRecovery: {
                backward: {
                    nLength: 1,
                    nX: -192
                },
                forward: {
                    nLength: 1,
                    nX: 192
                }
            },
            aKeyboard: [
                {
                    UP: 'z',
                    DOWN: 's',
                    LEFT: 'q',
                    RIGHT: 'd',
                    A: 'u',
                    B: 'i',
                    C: 'o',
                    START: 'enter'
                },
                {
                    UP: 'ArrowUp',
                    DOWN: 'ArrowDown',
                    LEFT: 'ArrowLeft',
                    RIGHT: 'ArrowRight',
                    A: '1',
                    B: '2',
                    C: '3',
                    START: '0'
                }
            ]
        },

        oData: {
            oCharacter: {},
            oStage: {
                GZA: {
                    sCod: 'GZA',
                    sName: 'Gizādo Arano',
                    sColor: '#90D0F8'
                },
                NMK: {
                    sCod: 'NMK',
                    sName: 'Namekku-sei',
                    sColor: '#A8D880'
                },
                STH: {
                    sCod: 'STH',
                    sName: 'Seishin to Toki no Heya',
                    sColor: '#F8F8F8'
                },
                KSK: {
                    sCod: 'KSK',
                    sName: 'Kaiōshin-kai',
                    sColor: '#F098F8'
                }
            }
        }
    }
);

//=include character.js
//=include _characters/_GKU.js
//=include _characters/_BJT.js
//=include _characters/_GHA.js
//=include _characters/_GHC.js
//=include _characters/_FRZ.js
//=include _characters/_SRU.js
//=include _characters/_BUU.js