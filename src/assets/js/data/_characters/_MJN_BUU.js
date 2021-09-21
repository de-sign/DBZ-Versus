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
        attack_B: [
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
        ],
        // 8, 6, 10
        attack_6A_0: {
            uMove: {
                nLength: 2,
                nX: 8
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
                sFrame: 'attack_6_3'
            },
            {
                nFrame: 2,
                sFrame: 'attack_6_4'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ],
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
        aGround: [
            {
                aFilter: ['LSW_MJB'],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Puranetto Basuto',
                    sGroup: 'ki'
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
                            sText: 'プラネット',
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: 'Text',
                            sText: 'バスト',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Projectile',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'ball',
                            nFrameStart: 13,
                            oPosition: {
                                nX: -48,
                                nY: -256
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
                        sImpact: 'explode_heavy',
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
                        sImpact: 'explode_heavy',
                        sText: 'ブーム'
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192
                    }
                }
            },
            {
                aFilter: ['LSW_PKR'],
                sCod: 'attack_236C',
                sAnimation: 'attack_236C',
                oList: {
                    sName: 'Makuhoidan',
                    sGroup: 'ki'
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
                            sText: '魔空包',
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: 'Text',
                            sText: '魔空包囲弾',
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: 'Projectile',
                            sSFX: 'ADO__Beam',
                            sAnimation: 'death',
                            nFrameStart: 13,
                            oPosition: {
                                nX: 0,
                                nY: -230
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
                        sImpact: 'explode_heavy',
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
                        sImpact: 'explode_heavy',
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
                            sText: '気功波',
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
                sCod: 'attack_6A',
                sAnimation: 'attack_6A_0',
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
                    },
                    oPushback: false
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'defense_4'
                    },
                    oPushback: false
                },
                oFollowUp: {
                    sCheck: true,
                    sCod: 'attack_6A_1',
                    sAnimation: 'attack_6A_1',
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
                            nDamage: 75
                        },
                        oStun: {
                            nStun: 24,
                            sAnimation: 'hit_0'
                        },
                        oPushback: {
                            nLength: 16,
                            nX: 128
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
                            nLength: 16,
                            nX: 128
                        }
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
                        nStun: 18,
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