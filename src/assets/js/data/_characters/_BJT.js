/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Bejita**  
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
            sName: 'Bejita SSJ',
            sColor: 'CTM_SSJ',
            sColorName: 'Custom color',
            sEntityColor: 'ORG'
        },
        {
            sName: 'Bejita',
            sColor: 'CTM_BAD',
            sColorName: 'Custom color',
            sEntityColor: 'PRP'
        },
        {
            sName: 'Bejita SSJ',
            sColor: 'LSW_SSJ',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'ORG'
        },
        {
            sName: 'Bejita',
            sColor: 'LSW_BAD',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'PRP'
        }
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {

        list_0: false,
        list_1: false,
        list_2: false,
        list_3: false,

        stand_0: {
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
        stand_1: false,

        move_0: false,
        move_1: false,
        move_2: false,
        move_3: false,

        jump_0: false,
        jump_1: false,
        jump_2: false,
        jump_3: false,
        jump_4: false,

        guard_0: false,
        guard_1: false,
        guard_2: false,

        hit_0: false,
        hit_1: false,
        hit_2: false,
        hit_3: false,
        hit_4: false,

        throw_0: false,
        throw_1: false,
        throw_2: false,
        throw_3: false,

        attack_0_1: false,
        attack_0_2: false,

        attack_1_1: false,
        attack_1_2: false,
        attack_1_3: false,
        attack_1_4: false,

        attack_2_0: {
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
        attack_2_1: {
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
        attack_2_2: {
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
        attack_2_3: {
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
        attack_2_4: {
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
                nHeight: 100
            }, {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }]
        },
        attack_2_5: {
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
                nHeight: 100
            }, {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }]
        },
        
        attack_3_0: {
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
        attack_3_1: {
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
        attack_3_2: {
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

        attack_4_0: false,
        attack_4_1: {
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
        attack_4_2: {
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
        attack_4_3: false,

        attack_5_0: false,
        attack_5_1: {
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
        attack_5_2: {
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
        attack_5_3: false,
        
        ki_0_0: {
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

        ki_1_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            }
        },
        ki_1_1: {
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
        ki_1_2: {
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
        }
    },
    /* ----- DETAILS Données des animations. ----- */
    oAnimations: {
        // Command
        // 4, 4, 6
        attack_A_0: {
            uMove: {
                nDelay: 2,
                nLength: 4,
                nX: 24
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_2_0'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_2_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_2_0',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 4, 4, 6
        attack_A_1: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 2,
                sFrame: 'attack_2_2'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_3'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_2',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ],
        // 4, 4, 6
        attack_A_2: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 2,
                sFrame: 'attack_2_4'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_5'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_4',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ],

        // 6, 4, 8
        attack_B: {
            uMove: {
                nDelay: 2,
                nLength: 4,
                nX: -24
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_0',
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_3_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 8, 6, 10
        attack_6A: {
            uMove: {
                nDelay: 2,
                nLength: 12,
                nX: 96
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_0',
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_1',
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_2'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_3',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 10, 8, 12
        attack_2B: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 6,
                sFrame: 'attack_4_0'
            },
            {
                nFrame: 2,
                sFrame: 'attack_4_1',
                oStatus: {
                    bAerialInvul: true
                }
            },
            {
                nFrame: 8,
                sFrame: 'attack_4_2',
                oStatus: {
                    bAerialInvul: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'attack_4_1',
                oStatus: {
                    bAerialInvul: true,
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_4_0',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ],
        
        attack_C: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 20,
                sFrame: 'ki_0_0',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            },
        ],
        // Final Flash / Garric Canon
        // 46, 36, 26
        attack_236C: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 30,
                sFrame: 'ki_1_0',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'ki_1_1',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'ki_1_2',
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 40,
                sFrame: 'ki_1_2'
            },
            {
                nFrame: 20,
                sFrame: 'ki_1_1'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ],

        // List
        list_236C: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 30,
                sFrame: 'ki_1_0'
            },
            {
                nFrame: 10,
                sFrame: 'ki_1_1'
            },
            {
                nFrame: 2,
                sFrame: 'list_0'
            },
            {
                nFrame: 2,
                sFrame: 'list_1'
            },
            {
                nFrame: 2,
                sFrame: 'list_2'
            },
            {
                nFrame: 32,
                sFrame: 'list_3'
            },
            {
                nFrame: 2,
                sFrame: 'list_2'
            },
            {
                nFrame: 2,
                sFrame: 'list_1'
            },
            {
                nFrame: 2,
                sFrame: 'list_0'
            },
            {
                nFrame: 20,
                sFrame: 'ki_1_1'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
        ]
    },
    /* ----- DETAILS Données des commandes. ----- */
    oCommands: {
        aGround: [
            {
                aFilter: [ 'CTM_SSJ', 'LSW_SSJ'],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Fainaru Furasshu',
                    sGroup: 'ki',
                    sAnimation: 'list_236C'
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: 'Text',
                            sText: 'ファイ',
                            nFrameStart: 1
                        },
                        {
                            sType: 'Text',
                            sText: 'ファイナルフラ',
                            nFrameStart: 22
                        },
                        {
                            sType: 'Text',
                            sText: 'ファイナルフラッシュ',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Beam',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'big_triangle',
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -32,
                                nY: -12
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: 'hit_1'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: 'defense_4'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192
                    }
                }
            },
            {
                aFilter: [ 'CTM_BAD', 'LSW_BAD' ],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Gyarikku-ho',
                    sGroup: 'ki',
                    sAnimation: 'list_236C'
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: 'Text',
                            sText: 'ギャ',
                            nFrameStart: 1
                        },
                        {
                            sType: 'Text',
                            sText: 'ギャリッ',
                            nFrameStart: 22
                        },
                        {
                            sType: 'Text',
                            sText: 'ギャリック砲',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Beam',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'triangle',
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -12,
                                nY: -12
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: 'hit_1',
                        sText: 'ブーム'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: 'defense_4',
                        sText: 'ブーム'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192
                    }
                }
            },
            {
                sCod: 'attack_C',
                sAnimation: 'attack_C',
                oList: {
                    sName: 'Kikoha',
                    sGroup: 'ki'
                },
                oProperty: {},
                oGatling: {
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: 'Text',
                            sText: '気功波',
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: 'Projectile',
                            sSFX: 'ADO__Projectile',
                            sAnimation: 'kikoha',
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -28
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: 'hit_0',
                        sImpact: 'explode_light'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_j4',
                        sImpact: 'explode_light'
                    }
                }
            },
            {
                sCod: 'attack_2B',
                sAnimation: 'attack_2B',
                oList: {
                    sName: 'Launcher',
                    sInfo: 'Aerial invulnerable',
                    sGroup: 'command'
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    nLevel: 1,
                    bJumpCancellable: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: 'hit_2'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_4'
                    }
                }
            },
            {
                sCod: 'attack_6A',
                sAnimation: 'attack_6A',
                oList: {
                    sName: 'Tracker',
                    sGroup: 'command'
                },
                oProperty: {},
                oGatling: {
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: 'hit_1'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_j4'
                    }
                }
            },
            {
                sCod: 'attack_B',
                sAnimation: 'attack_B',
                oList: {
                    sName: 'Heavy',
                    sGroup: 'normal'
                },
                oProperty: {},
                oGatling: {
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 50
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: 'hit_1'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 10,
                        sAnimation: 'defense_4'
                    }
                }
            },
            {
                sCod: 'attack_A_0',
                sAnimation: 'attack_A_0',
                oList: {
                    sName: 'Light',
                    sGroup: 'normal'
                },
                oProperty: {},
                oGatling: {
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 25
                    },
                    oStun: {
                        nStun: 13,
                        sAnimation: 'hit_0'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_j4'
                    }
                },
                oFollowUp: {
                    sCod: 'attack_A_1',
                    sAnimation: 'attack_A_1',
                    oProperty: {},
                    oGatling: {
                        nLevel: 1,
                        oManipulation: {
                            nMaxLengthFrame: 1,
                            aButtons: [
                                { A: true }
                            ],
                            bLast: true
                        }
                    },
                    oHit: {
                        oDamage: {
                            nDamage: 25
                        },
                        oStun: {
                            nStun: 13,
                            sAnimation: 'hit_0'
                        }
                    },
                    oGuard: {
                        oDamage: {
                            nDamage: 0
                        },
                        oStun: {
                            nStun: 12,
                            sAnimation: 'defense_j4'
                        }
                    },
                    oFollowUp: {
                        sCod: 'attack_A_2',
                        sAnimation: 'attack_A_2',
                        oProperty: {},
                        oGatling: {
                            nLevel: 1,
                            oManipulation: {
                                nMaxLengthFrame: 1,
                                aButtons: [
                                    { A: true }
                                ],
                                bLast: true
                            }
                        },
                        oHit: {
                            oDamage: {
                                nDamage: 25
                            },
                            oStun: {
                                nStun: 13,
                                sAnimation: 'hit_0'
                            }
                        },
                        oGuard: {
                            oDamage: {
                                nDamage: 0
                            },
                            oStun: {
                                nStun: 12,
                                sAnimation: 'defense_j4'
                            }
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