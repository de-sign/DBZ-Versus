/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Majin Buu**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.MJN_BUU = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'MJN_BUU',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sColor: 'LSW_MJB',
            sName: 'Majin Buu',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'PNK'
        },
        {
            sColor: 'LSW_PKR',
            sName: 'Pikkoro Junia', 
            sColorName: 'Legendary Super Warrior color', 
            sEntityColor: 'ORG'
        }
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {
        stand_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -142,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -34,
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
                nWidth: 64,
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
                nWidth: 64,
                nHeight: 32
            }],
            aHitBox: {
                nX: 18,
                nY: -94,
                nWidth: 68,
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
                nY: -90,
                nWidth: 60,
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
                nY: -90,
                nWidth: 60,
                nHeight: 32
            }],
            aHitBox: {
                nX: 22,
                nY: -90,
                nWidth: 60,
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
                nY: -94,
                nWidth: 76,
                nHeight: 44
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
                nY: -94,
                nWidth: 76,
                nHeight: 44
            }],
            aHitBox: {
                nX: 30,
                nY: -94,
                nWidth: 76,
                nHeight: 44
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
                nX: 22,
                nY: -154,
                nWidth: 40,
                nHeight: 84
            }, {
                nX: -30,
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
                nX: 22,
                nY: -154,
                nWidth: 40,
                nHeight: 84
            }, {
                nX: -30,
                nY: -134,
                nWidth: 60,
                nHeight: 136
            }],
            aHitBox: {
                nX: 22,
                nY: -154,
                nWidth: 40,
                nHeight: 84
            }
        },
        attack_4_3: false,

        attack_5_0: {
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
        attack_5_1: {
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
                nWidth: 144,
                nHeight: 32
            }]
        },
        attack_5_2: {
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
                nWidth: 224,
                nHeight: 32
            }]
        },
        attack_5_3: {
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
                nWidth: 224,
                nHeight: 32
            }],
            aHitBox: {
                nX: 22,
                nY: -94,
                nWidth: 224,
                nHeight: 32
            }
        },
        attack_5_4: {
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
                nHeight: 64
            }, {
                nX: 198,
                nY: -106,
                nWidth: 48,
                nHeight: 32
            }, {
                nX: 50,
                nY: -102,
                nWidth: 64,
                nHeight: 32
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 110,
                nY: -94,
                nWidth: 92,
                nHeight: 32
            }]
        },
        attack_5_5: {
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
                nHeight: 64
            }, {
                nX: 50,
                nY: -102,
                nWidth: 48,
                nHeight: 32
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 94,
                nY: -94,
                nWidth: 40,
                nHeight: 28
            }, {
                nX: 124,
                nY: -86,
                nWidth: 56,
                nHeight: 32
            }]
        },
        attack_5_6: {
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
                nHeight: 64
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 30,
                nY: -94,
                nWidth: 68,
                nHeight: 32
            }]
        },
        
        attack_6_0: {
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
                nHeight: 64
            }, {
                nX: 198,
                nY: -106,
                nWidth: 48,
                nHeight: 32
            }, {
                nX: 50,
                nY: -102,
                nWidth: 64,
                nHeight: 32
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 110,
                nY: -94,
                nWidth: 92,
                nHeight: 32
            }]
        },
        attack_6_1: {
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
                nWidth: 224,
                nHeight: 32
            }],
            aHitBox: {
                nX: 22,
                nY: -94,
                nWidth: 224,
                nHeight: 32
            }
        },
        attack_6_2: {
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
                nWidth: 224,
                nHeight: 32
            }]
        },
        attack_6_3: {
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
                nWidth: 144,
                nHeight: 32
            }]
        },
        attack_6_4: {
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
                nHeight: 64
            }, {
                nX: -22,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 30,
                nY: -94,
                nWidth: 68,
                nHeight: 32
            }]
        },

        ki_0_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 64
            }, {
                nX: 22,
                nY: -102,
                nWidth: 64,
                nHeight: 36
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
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: {
                nX: -34,
                nY: -146,
                nWidth: 68,
                nHeight: 148
            }
        },
        ki_1_1: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: {
                nX: -34,
                nY: -146,
                nWidth: 68,
                nHeight: 148
            }
        },
        ki_1_2: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -134,
                nWidth: 60,
                nHeight: 64
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }, {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 36
            }]
        }
    },
    /* ----- DETAILS Données des animations. ----- */
    oAnimations: {
        // Command
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
        attack_B: [
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
        ],
        // 8, 6, 10
        attack_6A_0: {
            oMove: {
                nLength: 2,
                nX: 8
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_0',
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_1',
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_5_3'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_4',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_5_5'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_5_6',
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                }
            ]
        },
        attack_6A_1: [
            {
                nFrame: 4,
                sFrame: 'attack_6_0'
            },
            {
                nFrame: 6,
                sFrame: 'attack_6_1'
            },
            {
                nFrame: 4,
                sFrame: 'attack_6_2',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'attack_6_3',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'attack_6_4',
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
                nFrame: 60,
                sFrame: 'ki_1_2'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

    /* ----- DETAILS Données des commandes. ----- */
    oCommands: {
        aOffense: [
            {
                aFilter: ['LSW_MJB'],
                sCod: 'attack_236C',
                sName: 'Puranetto Bāsuto',
                sAnimation: 'attack_236C',
                nCost: 30,
                nDamage: 300,
                nMinimumReduce: 40,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                aEntity: {
                    sType: 'projectile',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'ball',
                    nFrameStart: 13,
                    oPosition: {
                        nX: -48,
                        nY: -256
                    }
                },
                oStun: {
                    nFreeze: 46,
                    nBlock: 36,
                    nHit: 36,
                    bLaunch: true,
                    sHitAnimation: 'hit_1',
                    sImpactAnimation: 'explode_heavy'
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
                
                aFilter: ['LSW_PKR'],
                sCod: 'attack_236C',
                sName: 'Makūhōidan',
                sAnimation: 'attack_236C',
                nCost: 30,
                nDamage: 300,
                nMinimumReduce: 40,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                aEntity: {
                    sType: 'projectile',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'death',
                    nFrameStart: 13,
                    oPosition: {
                        nX: 0,
                        nY: -230
                    }
                },
                oStun: {
                    nFreeze: 46,
                    nBlock: 36,
                    nHit: 36,
                    bLaunch: true,
                    sHitAnimation: 'hit_1',
                    sImpactAnimation: 'explode_heavy'
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
                sCod: 'attack_6A',
                sName: 'Tracker',
                sAnimation: 'attack_6A_0',
                nDamage: 75,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
                },
                oPushback: {},
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { FW: false, A: true }
                    ]
                },
                oFollowUp: {
                    sCod: 'attack_6A_1',
                    sName: '2nd',
                    sAnimation: 'attack_6A_1',
                    nDamage: 75,
                    nGatlingLevel: 1,
                    sCheck: 'bGround',
                    oStun: {
                        nBlock: 12,
                        nHit: 24,
                        sHitAnimation: 'hit_0'
                    },
                    oPushback: {
                        nLength: 16,
                        nX: 128
                    },
                    bLast: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ]
                    }
                },
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
                    nHit: 18,
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