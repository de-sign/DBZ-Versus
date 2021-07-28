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
        attack_5_1: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -30,
                nY: -134,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 26,
                nY: -106,
                nWidth: 8,
                nHeight: 44
            }, {
                nX: -10,
                nY: -62,
                nWidth: 44,
                nHeight: 64
            }]
        },
        attack_5_2: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -30,
                nY: -134,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 26,
                nY: -106,
                nWidth: 8,
                nHeight: 44
            }, {
                nX: -10,
                nY: -62,
                nWidth: 44,
                nHeight: 64
            }],
            aHitBox: {
                nX: 26,
                nY: -106,
                nWidth: 76,
                nHeight: 44
            }
        },
        attack_5_3: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -30,
                nY: -142,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 26,
                nY: -122,
                nWidth: 80,
                nHeight: 72
            }, {
                nX: 26,
                nY: -86,
                nWidth: 80,
                nHeight: 36
            }, {
                nX: -10,
                nY: -70,
                nWidth: 44,
                nHeight: 64
            }]
        },
        attack_5_4: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -30,
                nY: -142,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 26,
                nY: -122,
                nWidth: 80,
                nHeight: 72
            }, {
                nX: 26,
                nY: -86,
                nWidth: 80,
                nHeight: 36
            }, {
                nX: -10,
                nY: -70,
                nWidth: 44,
                nHeight: 64
            }],
            aHitBox: [{
                nX: 26,
                nY: -122,
                nWidth: 80,
                nHeight: 72
            }, {
                nX: 26,
                nY: -86,
                nWidth: 80,
                nHeight: 36
            }]
        },
        attack_5_5: {
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
                sFrame: 'stand_1'
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
        ],
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
        // 6, 4, 8
        attack_B: {
            
            oMove: {
                nDelay: 2,
                nLength: 2,
                nX: 16
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
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
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // 8, 6, 10
        attack_6B: {
            oMove: {
                nDelay: 2,
                nLength: 6,
                nX: 48
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
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
                    nFrame: 6,
                    sFrame: 'attack_6_2'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_6_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_6_0',
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
        // 10, 6, 8
        attack_6A_0: {
            oMove: {
                nDelay: 2,
                nLength: 18,
                nX: 96
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_0'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_5',
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
        attack_6A_1: {
            oMove: {
                nLength: 4,
                nX: 24
            },
            aFrames: [
                {
                    nFrame: 4,
                    sFrame: 'attack_5_1',
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_3',
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_4'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_3',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_5',
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
                sFrame: 'attack_4_3',
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
        aOffense: [
            {
                aFilter: ['CTM_MBU', 'LSW_MBU'],
                sCod: 'attack_236C',
                sName: 'Cho ?oryoku',
                sAnimation: 'attack_236C',
                sListAnimation: 'list_236C',
                nCost: 30,
                nDamage: 300,
                nMinimumReduce: 40,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                aEntity: [
                    {
                        sType: 'text',
                        sText: '超',
                        nFrameStart: 1
                    },
                    {
                        sType: 'text',
                        sText: '超能',
                        nFrameStart: 22
                    },
                    {
                        sType: 'text',
                        sText: '超能力',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'beam',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'zigzag',
                        nFrameStart: 43,
                        bLink: true,
                        oPosition: {
                            nX: -16,
                            nY: -60
                        }
                    }
                ],
                oStun: {
                    nBlock: 36,
                    nHit: 36,
                    bLaunch: true,
                    sHitAnimation: 'hit_1'
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
                aFilter: ['LSW_SBU'],
                sCod: 'attack_236C',
                sName: 'Cho Noryoku',
                sAnimation: 'attack_236C',
                sListAnimation: 'list_236C',
                nCost: 30,
                nDamage: 300,
                nMinimumReduce: 40,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                aEntity: [
                    {
                        sType: 'text',
                        sText: '超',
                        nFrameStart: 1
                    },
                    {
                        sType: 'text',
                        sText: '超能',
                        nFrameStart: 22
                    },
                    {
                        sType: 'text',
                        sText: '超能力',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'beam',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'zigzag',
                        nFrameStart: 43,
                        bLink: true,
                        oPosition: {
                            nX: -16,
                            nY: -72
                        }
                    }
                ],
                oStun: {
                    nBlock: 36,
                    nHit: 36,
                    bLaunch: true,
                    sHitAnimation: 'hit_1',
                    sImpactText: 'ブーム'
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
                sCod: 'attack_C',
                sName: 'Kikoha',
                sAnimation: 'attack_C',
                nCost: 10,
                nGatlingLevel: 2,
                nDamage: 100,
                sCheck: 'bGround',
                aEntity:  [
                    {
                        sType: 'text',
                        sText: '気功波',
                        nLength: 40,
                        nFrameStart: 1
                    },
                    {
                        sType: 'projectile',
                        sSFX: 'ADO__Projectile',
                        sAnimation: 'kikoha',
                        nFrameStart: 10,
                        oPosition: {
                            nX: 58,
                            nY: -24
                        }
                    }
                ],
                oStun: {
                    nBlock: 12,
                    nHit: 16,
                    sHitAnimation: 'hit_0',
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
                sCod: 'attack_2B',
                sName: 'Launcher',
                sAnimation: 'attack_2B',
                nDamage: 100,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                bJumpCancellable: true,
                oStun: {
                    nBlock: 12,
                    nHit: 22,
                    bLaunch: true,
                    sHitAnimation: 'hit_2'
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
                sCod: 'attack_6B',
                sName: 'Shoulder dash',
                sAnimation: 'attack_6B',
                nDamage: 75,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
                },
                oPushback: {
                    nLength: 4,
                    nX: -128
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { FW: false, B: true }
                    ]
                }
            },
            {
                sCod: 'attack_6A_0',
                sName: 'Tracker',
                sAnimation: 'attack_6A_0',
                nDamage: 75,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oFollowUp: {
                    sName: '2nd',
                    sCod: 'attack_6A_1',
                    sAnimation: 'attack_6A_1',
                    bFollowOnlyOnHurt: true,
                    nDamage: 75,
                    nGatlingLevel: 1,
                    sCheck: 'bGround',
                    bOnHit: true,
                    oStun: {
                        nBlock: 12,
                        nHit: 18,
                        sHitAnimation: 'hit_0'
                    },
                    bLast: true
                },
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
                },
                oPushback: {
                    nLength: 4,
                    nX: -36
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
                sCod: 'attack_B',
                sName: 'Heavy',
                sAnimation: 'attack_B',
                nDamage: 50,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 10,
                    nHit: 16,
                    sHitAnimation: 'hit_1'
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
                sCod: 'attack_A_0',
                sName: 'Light',
                sAnimation: 'attack_A_0',
                nDamage: 25,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oFollowUp: {
                    sCod: 'attack_A_1',
                    sName: '2nd',
                    sAnimation: 'attack_A_1',
                    nDamage: 25,
                    nGatlingLevel: 1,
                    sCheck: 'bGround',
                    oStun: {
                        nBlock: 12,
                        nHit: 13,
                        sHitAnimation: 'hit_0'
                    },
                    bLast: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ]
                    }
                },
                oStun: {
                    nBlock: 12,
                    nHit: 13,
                    sHitAnimation: 'hit_0'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { A: true }
                    ]
                }
            }
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */