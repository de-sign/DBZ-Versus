/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Mister Buu**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.BUU = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'BUU',
    /* ----- DETAILS Couleur utilisée pour les projectiles, rayons, etc. ----- */
    sEntityColor: 'PNK',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sName: 'Mister Buu',
            sColor: 'CTM_MBU',
            sColorName: 'Custom color',
        },
        {
            sName: 'Mister Buu',
            sColor: 'LSW_MBU',
            sColorName: 'Legendary Super Warrior color',
        },
        {
            sName: 'Supa Buu',
            sColor: 'LSW_SBU',
            sColorName: 'Legendary Super Warrior color'
        }
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {

        list_0: false,
        list_1: false,

        stand_0: {
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
                nWidth: 60,
                nHeight: 32
            }]
        },
        attack_2_1: {
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
                nWidth: 60,
                nHeight: 32
            }],
            aHitBox: {
                nX: 18,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }
        },
        attack_2_2: {
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
        attack_2_3: {
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
            }],
            aHitBox: {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }
        },

        attack_3_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -142,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -14,
                nY: -110,
                nWidth: 48,
                nHeight: 112
            }, {
                nX: 30,
                nY: -102,
                nWidth: 76,
                nHeight: 40
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
                nY: -142,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -14,
                nY: -110,
                nWidth: 48,
                nHeight: 112
            }, {
                nX: 30,
                nY: -102,
                nWidth: 76,
                nHeight: 40
            }],
            aHitBox: {
                nX: 30,
                nY: -102,
                nWidth: 76,
                nHeight: 40
            }
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
                nX: 34,
                nY: -170,
                nWidth: 36,
                nHeight: 80
            }, {
                nX: -22,
                nY: -134,
                nWidth: 60,
                nHeight: 136
            }]
        },
        attack_4_2: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 34,
                nY: -170,
                nWidth: 36,
                nHeight: 80
            }, {
                nX: -22,
                nY: -134,
                nWidth: 60,
                nHeight: 136
            }],
            aHitBox: {
                nX: 34,
                nY: -170,
                nWidth: 36,
                nHeight: 80
            }
        },
        attack_4_3: false,

        attack_5_0: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
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
        attack_5_1: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
            },
            aHurtBox: [{
                nX: -42,
                nY: -114,
                nWidth: 96,
                nHeight: 72
            },
            {
                nX: -10,
                nY: -78,
                nWidth: 64,
                nHeight: 56
            }]
        },
        attack_5_2: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
            },
            aHurtBox: [{
                nX: -54,
                nY: -114,
                nWidth: 96,
                nHeight: 72
            },
            {
                nX: -22,
                nY: -78,
                nWidth: 64,
                nHeight: 56
            }]
        },
        attack_5_3: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
            },
            aHurtBox: [{
                nX: -38,
                nY: -122,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -26,
                nY: -122,
                nWidth: 84,
                nHeight: 92
            }]
        },
        attack_5_4: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
            },
            aHurtBox: [{
                nX: -10,
                nY: -122,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -50,
                nY: -110,
                nWidth: 92,
                nHeight: 84
            }]
        },
        attack_5_5: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
            },
            aHurtBox: [{
                nX: -10,
                nY: -122,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -50,
                nY: -110,
                nWidth: 92,
                nHeight: 84
            }],
            aHitBox: [{
                nX: -58,
                nY: -66,
                nWidth: 104,
                nHeight: 64
            }]
        },
        attack_5_6: {
            nZIndex: 30,
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

        attack_6_0: false,
        attack_6_1: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: {
                nX: -14,
                nY: -126,
                nWidth: 72,
                nHeight: 112
            }
        },
        attack_6_2: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: {
                nX: -14,
                nY: -126,
                nWidth: 72,
                nHeight: 112
            },
            aHitBox: {
                nX: 6,
                nY: -102,
                nWidth: 56,
                nHeight: 84
            }
        },
        attack_6_3: false,

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
                nX: -6,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
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
                nX: -6,
                nY: -134,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }]
        }
    },
    /* ----- DETAILS Données des animations. ----- */
    oAnimations: {
        // 4, 4, 6
        attack_A_0: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bReverse: true
                }
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
                sFrame: 'stand_1'
            }
        ],
        // 4, 4, 6
        attack_A_1: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bReverse: true
                }
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
                sFrame: 'stand_1'
            }
        ],
        // 6, 4, 8
        attack_B: {
            
            uMove: {
                nDelay: 2,
                nLength: 4,
                nX: 32
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_0'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_3_0',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                }
            ]
        },
        // 8, 6, 10
        attack_6B: {
            uMove: {
                nDelay: 2,
                nLength: 6,
                nX: 48
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_6_0',
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_6_1',
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_6_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_6_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_6_0'
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                }
            ]
        },
        //
        attack_6A: {
            uMove: {
                nDelay: 2,
                nLength: 20,
                aStep: [
                    { nX: 8, nY: 0 },
                    { nX: 8, nY: -18 },
                    { nX: 8, nY: -16 },
                    { nX: 8, nY: -15 },
                    { nX: 8, nY: -13 },
                    { nX: 8, nY: -11 },
                    { nX: 8, nY: -10 },
                    { nX: 8, nY: -8 },
                    { nX: 8, nY: -7 },
                    { nX: 8, nY: -5 },
                    { nX: 8, nY: -3 },
                    { nX: 8, nY: -2 },
                    { nX: 8, nY: 0 },
                    { nX: 8, nY: 5 },
                    { nX: 8, nY: 9 },
                    { nX: 8, nY: 13 },
                    { nX: 8, nY: 16 },
                    { nX: 8, nY: 19 },
                    { nX: 8, nY: 22 },
                    { nX: 8, nY: 24 }
                ]
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_0',
                    oStatus: {
                        bAerial: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_5',
                    oStatus: {
                        bAerial: false
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_4',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_6'
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                }
            ]
        },
        // 10, 8, 12
        attack_2B: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_4_0'
            },
            {
                nFrame: 2,
                sFrame: 'attack_4_1'
            },
            {
                nFrame: 8,
                sFrame: 'attack_4_2'
            },
            {
                nFrame: 4,
                sFrame: 'attack_4_1',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_4_3'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ],
        
        attack_C: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 8,
                sFrame: 'ki_0_0'
            },
            {
                nFrame: 12,
                sFrame: 'ki_0_0',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
        ],
        
        // 46, 36, 26
        attack_236C: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bInvul: true,
                    bReverse: true
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
                nFrame: 40,
                sFrame: 'list_1'
            },
            {
                nFrame: 2,
                sFrame: 'list_2'
            },
            {
                nFrame: 20,
                sFrame: 'super_1'
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
                aFilter: ['CTM_MBU', 'LSW_MBU'],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Cho Noryoku',
                    sGroup: 'ki',
                    sAnimation: 'list_236C'
                },
                oProperty: {
                    bLaunch: true,
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 46
                    }
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
                            sText: '超',
                            nFrameStart: 1
                        },
                        {
                            sType: 'Text',
                            sText: '超能',
                            nFrameStart: 22
                        },
                        {
                            sType: 'Text',
                            sText: '超能力',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Beam',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'zigzag',
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -16,
                                nY: -60
                            }
                        }
                    ]
                },
                aEffect: [
                    {
                        sType: 'dark',
                        nLength: 45
                    },
                    {
                        sType: 'freeze',
                        nLength: 45,
                        bIgnore: true
                    },
                    {
                        sType: 'zoom',
                        nLength: 45,
                        nZoom: 1.5,
                        oPosition: true
                    }
                ],
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
                aFilter: ['LSW_SBU'],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Cho Noryoku',
                    sGroup: 'ki',
                    sAnimation: 'list_236C'
                },
                oProperty: {
                    bLaunch: true,
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 46
                    }
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
                            sText: '超',
                            nFrameStart: 1
                        },
                        {
                            sType: 'Text',
                            sText: '超能',
                            nFrameStart: 22
                        },
                        {
                            sType: 'Text',
                            sText: '超能力',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Beam',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'zigzag',
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -16,
                                nY: -72
                            }
                        }
                    ]
                },
                aEffect: [
                    {
                        sType: 'dark',
                        nLength: 45
                    },
                    {
                        sType: 'freeze',
                        nLength: 45,
                        bIgnore: true
                    },
                    {
                        sType: 'zoom',
                        nLength: 45,
                        nZoom: 1.5,
                        oPosition: true
                    }
                ],
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
                                nY: -24
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
                    bLaunch: true,
                    oInvulnerable: {
                        sType: 'Aerial',
                        nStart: 9,
                        nLength: 14
                    }
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
                sCod: 'attack_6B',
                sAnimation: 'attack_6B',
                oList: {
                    sName: 'Shoulder dash',
                    sGroup: 'command'
                },
                oProperty: {},
                oGatling: {
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 24,
                        sAnimation: 'hit_1'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -128
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_4'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -128
                    }
                }
            },
            {
                sCod: 'attack_6A',
                sAnimation: 'attack_6A',
                oList: {
                    sName: 'Dive Bomb',
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
                    },
                    aEntity: [
                        {
                            sType: 'Text',
                            sText: 'マウントダイブ',
                            nLength: 40,
                            nFrameStart: 1
                        }
                    ]
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
                        sAnimation: 'defense_4'
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
                    }
                }
            }
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */