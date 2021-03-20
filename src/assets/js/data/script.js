GAME.oData = {
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
    sStartScene: 'MenuScene',
    oPositionPoint: {
        oNormal: {
            nX: 98,
            nY: 182
        },
        oReverse: {
            nX: 102,
            nY: 182
        }
    },
    oTypeAnimation: {
        aAll: ['action', 'movement','guard', 'hit'],
        // undefined: 'action' 
        // MOVEMENT
        stand: 'movement',
        forward: 'movement',
        backward: 'movement',
        // GUARD
        guard: 'guard',
        // HIT
        hit_light: 'hit',
        hit_heavy: 'hit',
        hit_luncher: 'hit'
    },
    nLengthFreeze: 6,
    oLuncher: {
        nLengthFrames: 36,
        oMove: {
            nX: -72 * 4,
            nY: -54 * 4
        },
        oFrames: {
            sLunch: 'hit_luncher',
            sFall: 'hit_fall',
            sDown: 'TODO'
        }
    },
    nPushback: 5 * 4,

    oSettings: {
        nPlayer: 2,
        nLife: 20,
        nTimer: null,
        aKeyboard: [
            {
                UP: 'z',
                DOWN: 's',
                LEFT: 'q',
                RIGHT: 'd',
                A: 'u',
                B: 'i',
                C: 'o'
            },
            {
                UP: 'ArrowUp',
                DOWN: 'ArrowDown',
                LEFT: 'ArrowLeft',
                RIGHT: 'ArrowRight',
                A: '1',
                B: '2',
                C: '3'
            }
        ]
    },

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
};

//=include _characters/_GKU.js
//=include _characters/_BJT.js
//=include _characters/_GHT.js
//=include _characters/_GHS.js
//=include _characters/_FRZ.js
//=include _characters/_SRU.js
//=include _characters/_BUU.js