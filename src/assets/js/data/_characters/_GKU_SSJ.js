/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Gokū SSJ**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.GKU_SSJ = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'GKU_SSJ',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sName: 'Gokū SSJ',
            sColor: 'CTM_SSJ',
            sColorName: 'Custom color',
            sEntityColor: 'BLU'
        },
        {
            sName: 'Burakku SSJR',
            sColor: 'CTM_BRK',
            sColorName: 'Custom color',
            sEntityColor: 'PRP'
        },
        {
            sName: 'Gokū SSJ',
            sColor: 'LSW_SSJ',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'BLU'
        }
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {

        list_0: false,
        list_1: false,
        list_2: false,

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
                nY: -98,
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
                nY: -98,
                nWidth: 60,
                nHeight: 32
            }],
            aHitBox: {
                nX: 18,
                nY: -98,
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
                nY: -94,
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
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }],
            aHitBox: {
                nX: 22,
                nY: -94,
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
                nY: -102,
                nWidth: 76,
                nHeight: 44
            }],
            aHitBox: {
                nX: 30,
                nY: -102,
                nWidth: 76,
                nHeight: 44
            }
        },
        attack_3_2: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -10,
                nY: -146,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -22,
                nY: -98,
                nWidth: 52,
                nHeight: 100
            }]
        },
        attack_3_3: {
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
        attack_3_4: {
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
        attack_3_5: {
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
                nWidth: 44,
                nHeight: 104
            }, {
                nX: -22,
                nY: -138,
                nWidth: 60,
                nHeight: 124
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
                nWidth: 44,
                nHeight: 104
            }, {
                nX: -22,
                nY: -138,
                nWidth: 60,
                nHeight: 124
            }],
            aHitBox: {
                nX: 22,
                nY: -154,
                nWidth: 44,
                nHeight: 104
            }
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
                nY: -126,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -6,
                nY: -90,
                nWidth: 100,
                nHeight: 40
            }, {
                nX: -38,
                nY: -54,
                nWidth: 76,
                nHeight: 56
            }]
        },
        attack_5_2: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 6,
                nY: -126,
                nWidth: 52,
                nHeight: 60
            }, {
                nX: -6,
                nY: -90,
                nWidth: 100,
                nHeight: 40
            }, {
                nX: -38,
                nY: -54,
                nWidth: 76,
                nHeight: 56
            }],
            aHitBox: {
                nX: 46,
                nY: -90,
                nWidth: 48,
                nHeight: 40
            }
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
                nX: -10,
                nY: -138,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -22,
                nY: -118,
                nWidth: 104,
                nHeight: 64
            }, {
                nX: -38,
                nY: -58,
                nWidth: 84,
                nHeight: 60
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
                nX: -10,
                nY: -138,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -22,
                nY: -118,
                nWidth: 104,
                nHeight: 64
            }, {
                nX: -38,
                nY: -58,
                nWidth: 84,
                nHeight: 60
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
        attack_B_0: [
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
        // 6, 4, 8
        attack_B_1: {
            oMove: {
                nLength: 6,
                nX: 36
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_3_4'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_3_3',
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
            oMove: {
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
                    sFrame: 'attack_5_1'
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

        // Kameha
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

        anim_GHN_SSJT: [
            {
                nFrame: 8,
                sFrame: 'move_2',
                oPositionBox: null
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'ki_1_0',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'ki_1_1',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 44,
                sFrame: 'ki_1_2',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'ki_1_1',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oPositionBox: null,
                oStatus: {
                    bInvul: true
                }
            },
            {
                nFrame: 8,
                sFrame: 'move_2',
                oPositionBox: null
            }
        ]
    },
    /* ----- DETAILS Données des commandes. ----- */
    oCommands: {
        aOffense: [
            {
                sCod: 'attack_236C',
                sName: 'Chô Kamehameha',
                sAnimation: 'attack_236C',
                sListAnimation: 'list_236C',
                nCost: 30,
                nDamage: 300,
                nMinimumReduce: 40,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                aEntity: {
                    sType: 'beam',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'circle',
                    nFrameStart: 43,
                    bLink: true,
                    oPosition: {
                        nX: 0,
                        nY: 0
                    }
                },
                oStun: {
                    nFreeze: 45,
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
                sAnimation: 'attack_6A',
                nDamage: 75,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
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
                sCod: 'attack_B_0',
                sName: 'Heavy',
                sAnimation: 'attack_B_0',
                nDamage: 50,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oFollowUp: {
                    sCod: 'attack_B_1',
                    sName: '2nd',
                    sAnimation: 'attack_B_1',
                    nDamage: 50,
                    nGatlingLevel: 1,
                    sCheck: 'bGround',
                    oStun: {
                        nBlock: 10,
                        nHit: 16,
                        sHitAnimation: 'hit_1'
                    },
                    bLast: true
                },
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