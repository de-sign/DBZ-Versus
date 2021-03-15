GAME.oData = {
    oPath: {
        oCharacter: {
            sRoot: 'assets/images/characters',
            sFace: 'assets/images/characters/face',
            sPreview: 'assets/images/characters/preview'
        },
        oStage: {
            sRoot: 'assets/images/stages',
            sBackground: 'assets/images/stages/background',
            sPreview: 'assets/images/stages/preview'
        }
    },

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
    sStartScene: 'MenuScene',

    oCharacter: {
        GKU: {
            sCod: 'GKU',
            sName: 'Son Gokū SSJ'
        },
        BJT: {
            sCod: 'BJT',
            sName: 'Bejīta SSJ'
        },
        GHT: {
            sCod: 'GHT',
            sName: 'Son Gohan SSJT'
        },
        GHS: {
            sCod: 'GHS',
            sName: 'Son Gohan SNS'
        },
        FRZ: {
            sCod: 'FRZ',
            sName: 'Furīza'
        },
        SRU: {
            sCod: 'SRU',
            sName: 'Seru'
        },
        BUU: {
            sCod: 'BUU',
            sName: 'Majin Buu'
        }
    },

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