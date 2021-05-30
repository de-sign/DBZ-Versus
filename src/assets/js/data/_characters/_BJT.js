/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Bejīta**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.BJT = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'BJT',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sName: 'Bejīta SSJ',
            sColor: 'LSW_SSJ',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'ORG'
        },
        {
            sName: 'Bejīta',
            sColor: 'LSW_BAD',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'PRP'
        }
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {
        stand: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -38,
                nY: -102,
                nWidth: 76,
                nHeight: 104
            }]
        },
        blur: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -146,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -38,
                nY: -102,
                nWidth: 76,
                nHeight: 104
            }]
        },
        backward: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -38,
                nY: -146,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -26,
                nY: -98,
                nWidth: 52,
                nHeight: 100
            }]
        },
        forward: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -6,
                nY: -130,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -38,
                nY: -98,
                nWidth: 76,
                nHeight: 100
            }]
        },
        forward_inverse: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -50,
                nY: -130,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -34,
                nY: -98,
                nWidth: 76,
                nHeight: 100
            }]
        },
        jump: {
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -138,
                nWidth: 60,
                nHeight: 84
            }, {
                nX: -18,
                nY: -70,
                nWidth: 64,
                nHeight: 72
            }]
        },
        fall: {
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -146,
                nWidth: 56,
                nHeight: 60
            }, {
                nX: -26,
                nY: -102,
                nWidth: 64,
                nHeight: 104
            }]
        },
        guard: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -146,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -34,
                nY: -102,
                nWidth: 76,
                nHeight: 104
            }]
        },
        reflect: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -30,
                nY: -142,
                nWidth: 68,
                nHeight: 144
            }]
        },
        burst: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            }
        },
        hit_light: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -142,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -34,
                nY: -102,
                nWidth: 72,
                nHeight: 104
            }]
        },
        hit_heavy: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 88
            },
            aHurtBox: [{
                nX: -18,
                nY: -122,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -58,
                nY: -110,
                nWidth: 92,
                nHeight: 84
            }]
        },
        hit_luncher: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -146,
                nWidth: 52,
                nHeight: 48
            }, {
                nX: -22,
                nY: -102,
                nWidth: 64,
                nHeight: 104
            }]
        },
        hit_fall: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 92
            },
            aHurtBox: [{
                nX: -38,
                nY: -114,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -26,
                nY: -114,
                nWidth: 84,
                nHeight: 92
            }]
        },
        down: {
            oPositionBox: {
                nX: -30,
                nY: -58,
                nWidth: 60,
                nHeight: 60
            }
        },
        recovery: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            }
        },
        light_first: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -138,
                nWidth: 96,
                nHeight: 52
            }, {
                nX: -34,
                nY: -106,
                nWidth: 68,
                nHeight: 108
            }]
        },
        light_first_active: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHitBox: {
                nX: 26,
                nY: -138,
                nWidth: 44,
                nHeight: 52
            },
            aHurtBox: [{
                nX: -26,
                nY: -138,
                nWidth: 96,
                nHeight: 52
            }, {
                nX: -34,
                nY: -106,
                nWidth: 68,
                nHeight: 108
            }]
        },
        light_second: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }]
        },
        light_second_active: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHitBox: {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }]
        },
        light_third: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 32
            }, {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }]
        },
        light_third_active: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHitBox: {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 32
            }, {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }]
        },
        heavy: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -134,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -102,
                nWidth: 80,
                nHeight: 44
            }, {
                nX: -10,
                nY: -62,
                nWidth: 44,
                nHeight: 64
            }]
        },
        heavy_active: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHitBox: {
                nX: 30,
                nY: -102,
                nWidth: 72,
                nHeight: 44
            },
            aHurtBox: [{
                nX: -34,
                nY: -134,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -102,
                nWidth: 80,
                nHeight: 44
            }, {
                nX: -10,
                nY: -62,
                nWidth: 44,
                nHeight: 64
            }]
        },
        tracker: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 6,
                nY: -122,
                nWidth: 56,
                nHeight: 64
            }, {
                nX: 58,
                nY: -98,
                nWidth: 40,
                nHeight: 40
            }, {
                nX: -14,
                nY: -90,
                nWidth: 52,
                nHeight: 48
            }, {
                nX: -38,
                nY: -46,
                nWidth: 76,
                nHeight: 48
            }]
        },
        tracker_active: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHitBox: {
                nX: 46,
                nY: -98,
                nWidth: 52,
                nHeight: 40
            },
            aHurtBox: [{
                nX: 6,
                nY: -122,
                nWidth: 56,
                nHeight: 64
            }, {
                nX: 58,
                nY: -98,
                nWidth: 40,
                nHeight: 40
            }, {
                nX: -14,
                nY: -90,
                nWidth: 52,
                nHeight: 48
            }, {
                nX: -38,
                nY: -46,
                nWidth: 76,
                nHeight: 48
            }]
        },
        luncher: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 42,
                nY: -162,
                nWidth: 48,
                nHeight: 44
            }, {
                nX: 22,
                nY: -130,
                nWidth: 44,
                nHeight: 64
            }, {
                nX: -54,
                nY: -106,
                nWidth: 56,
                nHeight: 64
            }, {
                nX: -2,
                nY: -106,
                nWidth: 40,
                nHeight: 108
            }]
        },
        luncher_active: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHitBox: [{
                nX: 42,
                nY: -162,
                nWidth: 48,
                nHeight: 44
            }, {
                nX: 22,
                nY: -130,
                nWidth: 44,
                nHeight: 64
            }],
            aHurtBox: [{
                nX: 42,
                nY: -162,
                nWidth: 48,
                nHeight: 44
            }, {
                nX: 22,
                nY: -130,
                nWidth: 44,
                nHeight: 64
            }, {
                nX: -54,
                nY: -106,
                nWidth: 56,
                nHeight: 64
            }, {
                nX: -2,
                nY: -106,
                nWidth: 40,
                nHeight: 108
            }]
        },
        kikoha: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 64
            }, {
                nX: 22,
                nY: -110,
                nWidth: 64,
                nHeight: 40
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }]
        },
        super_first: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            }
        },
        super_second: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -38,
                nY: -138,
                nWidth: 68,
                nHeight: 140
            }, {
                nX: -38,
                nY: -118,
                nWidth: 68,
                nHeight: 40
            }]
        },
        super_third: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -38,
                nY: -138,
                nWidth: 68,
                nHeight: 140
            }, {
                nX: -38,
                nY: -118,
                nWidth: 68,
                nHeight: 40
            }]
        },
        list_first: false,
        list_second: false,
        list_third: false,
        list_fourth: false
    },
    /* ----- DETAILS Données des animations. ----- */
    oAnimations: {
        // Command
        // 4, 4, 6
        light_first: {
            oMove: {
                nDelay: 2,
                nLength: 4,
                nX: 24
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur',
                },
                {
                    nFrame: 2,
                    sFrame: 'light_first'
                },
                {
                    nFrame: 4,
                    sFrame: 'light_first_active'
                },
                {
                    nFrame: 4,
                    sFrame: 'light_first',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'blur',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 4, 4, 6
        light_second: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 2,
                sFrame: 'light_second'
            },
            {
                nFrame: 4,
                sFrame: 'light_second_active'
            },
            {
                nFrame: 4,
                sFrame: 'light_second',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: true
                }
            }
        ],
        // 4, 4, 6
        light_third: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 2,
                sFrame: 'light_third'
            },
            {
                nFrame: 4,
                sFrame: 'light_third_active'
            },
            {
                nFrame: 4,
                sFrame: 'light_third',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: true
                }
            }
        ],
        // 8, 4, 8
        heavy: {
            oMove: {
                nDelay: 2,
                nLength: 4,
                nX: -24
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 4,
                    sFrame: 'forward_inverse',
                },
                {
                    nFrame: 2,
                    sFrame: 'heavy'
                },
                {
                    nFrame: 4,
                    sFrame: 'heavy_active'
                },
                {
                    nFrame: 6,
                    sFrame: 'heavy',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'blur',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 8, 6, 10
        tracker: {
            oMove: {
                nDelay: 2,
                nLength: 12,
                nX: 96
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 4,
                    sFrame: 'forward',
                },
                {
                    nFrame: 2,
                    sFrame: 'tracker',
                },
                {
                    nFrame: 6,
                    sFrame: 'tracker_active'
                },
                {
                    nFrame: 2,
                    sFrame: 'tracker',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 6,
                    sFrame: 'forward',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'blur',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 10, 8, 12
        luncher: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 6,
                sFrame: 'jump'
            },
            {
                nFrame: 2,
                sFrame: 'luncher'
            },
            {
                nFrame: 8,
                sFrame: 'luncher_active'
            },
            {
                nFrame: 4,
                sFrame: 'luncher',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'jump',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: true
                }
            }
        ],
        kikoha: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 20,
                sFrame: 'kikoha',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: true
                }
            },
        ],
        // Final Flash / Garric Canon
        // 46, 36, 26
        super: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 30,
                sFrame: 'super_first',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'super_second',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'super_third',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 40,
                sFrame: 'super_third'
            },
            {
                nFrame: 20,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'blur'
            }
        ],
        // List
        super_list: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 30,
                sFrame: 'super_first'
            },
            {
                nFrame: 10,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'list_first'
            },
            {
                nFrame: 2,
                sFrame: 'list_second'
            },
            {
                nFrame: 2,
                sFrame: 'list_third'
            },
            {
                nFrame: 32,
                sFrame: 'list_fourth'
            },
            {
                nFrame: 2,
                sFrame: 'list_third'
            },
            {
                nFrame: 2,
                sFrame: 'list_second'
            },
            {
                nFrame: 2,
                sFrame: 'list_first'
            },
            {
                nFrame: 20,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'blur'
            },
        ]
    },
    /* ----- DETAILS Données des commandes. ----- */
    oCommands: {
        aOffense: [
            {
                aFilter: ['LSW_SSJ'],
                sCod: 'super',
                sName: 'Fainaru Furasshu',
                sAnimation: 'super',
                sListAnimation: 'super_list',
                nCost: 12,
                nDamage: 4,
                nGatlingLevel: 3,
                aEntity: {
                    sType: 'beam',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'big_triangle',
                    nFrameStart: 43,
                    bLink: true,
                    oPosition: {
                        nX: -32,
                        nY: -12
                    }
                },
                oStun: {
                    nFreeze: 46,
                    nBlock: 36,
                    nHit: 36,
                    bLunch: true,
                    sHitAnimation: 'hit_heavy'
                },
                oPushback: {
                    nLength: 4,
                    nX: -192
                },
                bLast: false,
                oManipulation: {
                    nMaxLengthFrame: 15,
                    aButtons: [
                        { DN: false },
                        { DF: false },
                        { FW: false, C: true }
                    ]
                }
            },
            {
                aFilter: ['LSW_BAD'],
                sCod: 'super',
                sName: 'Gyarikku-hō',
                sAnimation: 'super',
                sListAnimation: 'super_list',
                nCost: 12,
                nDamage: 4,
                nGatlingLevel: 3,
                aEntity: {
                    sType: 'beam',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'triangle',
                    nFrameStart: 43,
                    bLink: true,
                    oPosition: {
                        nX: -12,
                        nY: -12
                    }
                },
                oStun: {
                    nFreeze: 46,
                    nBlock: 36,
                    nHit: 36,
                    bLunch: true,
                    sHitAnimation: 'hit_heavy'
                },
                oPushback: {
                    nLength: 4,
                    nX: -192
                },
                bLast: false,
                oManipulation: {
                    nMaxLengthFrame: 15,
                    aButtons: [
                        { DN: false },
                        { DF: false },
                        { FW: false, C: true }
                    ]
                }
            },
            {
                sCod: 'kikoha',
                sName: 'Kikoha',
                sAnimation: 'kikoha',
                nCost: 4,
                nGatlingLevel: 2,
                aEntity: {
                    sType: 'projectile',
                    sSFX: 'ADO__Projectile',
                    sAnimation: 'kikoha',
                    nFrameStart: 10,
                    oPosition: {
                        nX: 58,
                        nY: -28
                    }
                },
                oStun: {
                    nBlock: 12,
                    nHit: 16,
                    sHitAnimation: 'hit_light',
                    sImpactAnimation: 'explode_light'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { C: true }
                    ]
                }
            },
            {
                sCod: 'luncher',
                sName: 'Luncher',
                sAnimation: 'luncher',
                nGatlingLevel: 1,
                oStun: {
                    nBlock: 12,
                    nHit: 22,
                    bLunch: true,
                    sHitAnimation: 'hit_luncher'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { DN: false, B: true }
                    ]
                }
            },
            {
                sCod: 'tracker',
                sName: 'Tracker',
                sAnimation: 'tracker',
                nGatlingLevel: 1,
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_heavy'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { FW: false, A: true }
                    ]
                }
            },
            {
                sCod: 'heavy',
                sName: 'Heavy',
                sAnimation: 'heavy',
                nGatlingLevel: 1,
                oStun: {
                    nBlock: 10,
                    nHit: 16,
                    sHitAnimation: 'hit_heavy'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { B: true }
                    ]
                }
            },
            {
                sCod: 'light_first',
                sName: 'Light',
                sAnimation: 'light_first',
                nGatlingLevel: 1,
                oStun: {
                    nBlock: 12,
                    nHit: 13,
                    sHitAnimation: 'hit_light'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { A: true }
                    ]
                },
                oFollowUp: {
                    sName: '2nd',
                    sCod: 'light_second',
                    sAnimation: 'light_second',
                    nGatlingLevel: 1,
                    oStun: {
                        nBlock: 12,
                        nHit: 13,
                        sHitAnimation: 'hit_light'
                    },
                    bLast: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ]
                    },
                    oFollowUp: {
                        sName: '3rd',
                        sCod: 'light_third',
                        sAnimation: 'light_third',
                        nGatlingLevel: 1,
                        oStun: {
                            nBlock: 12,
                            nHit: 13,
                            sHitAnimation: 'hit_light'
                        },
                        bLast: true,
                        oManipulation: {
                            nMaxLengthFrame: 1,
                            aButtons: [
                                { A: true }
                            ]
                        }
                    }
                }
            }
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */