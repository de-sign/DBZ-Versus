/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**Furīza**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.FRZ = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'FRZ',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sName: 'Furīza',
            sColor: 'LSW_FRZ',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'PRP'
        },
        {
            sName: 'Frost',
            sColor: 'SWP_FRT',
            sColorName: 'Swap color',
            sEntityColor: 'PNK'
        }
        /*
        {
            sName: 'Metaru Kūra',
            sColor: 'CTM_MKR',
            sColorName: 'Custom color',
            sEntityColor: 'ORG'
        }
        */
    ],
    /* ----- DETAILS Données des FRAMES. ----- */
    oFrames: {

        list_4: false,

        stand_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -150,
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
        attack_2_1: {
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
            }],
            aHitBox: {
                nX: 22,
                nY: -98,
                nWidth: 64,
                nHeight: 32
            }
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
                nX: -30,
                nY: -146,
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
                nX: -30,
                nY: -146,
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
        
        attack_4_0: false,
        attack_4_1: {
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 46,
                nY: -158,
                nWidth: 44,
                nHeight: 56
            }, {
                nX: 2,
                nY: -142,
                nWidth: 56,
                nHeight: 68
            }, {
                nX: -22,
                nY: -106,
                nWidth: 52,
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
            aHurtBox: [{
                nX: 46,
                nY: -158,
                nWidth: 44,
                nHeight: 56
            }, {
                nX: 2,
                nY: -142,
                nWidth: 56,
                nHeight: 68
            }, {
                nX: -22,
                nY: -106,
                nWidth: 52,
                nHeight: 108
            }],
            aHitBox: [{
                nX: 46,
                nY: -158,
                nWidth: 44,
                nHeight: 56
            }, {
                nX: 10,
                nY: -122,
                nWidth: 48,
                nHeight: 40
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
            }],
            aHitBox: {
                nX: 46,
                nY: -98,
                nWidth: 52,
                nHeight: 40
            }
        },
        attack_5_3: false,

        attack_6_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 30,
                nY: -114,
                nWidth: 76,
                nHeight: 40
            }, {
                nX: -14,
                nY: -110,
                nWidth: 48,
                nHeight: 112
            }]
        },
        attack_6_1: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 30,
                nY: -114,
                nWidth: 76,
                nHeight: 40
            }, {
                nX: -14,
                nY: -110,
                nWidth: 48,
                nHeight: 112
            }],
            aHitBox: {
                nX: 30,
                nY: -114,
                nWidth: 76,
                nHeight: 40
            }
        },

        ki_0_0: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -150,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: 22,
                nY: -110,
                nWidth: 80,
                nHeight: 32
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
            }]
        },
        ki_0_1: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -150,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: 22,
                nY: -110,
                nWidth: 80,
                nHeight: 32
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
            aHurtBox: {
                nX: -30,
                nY: -158,
                nWidth: 64,
                nHeight: 160
            }
        },
        ki_1_2: {
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
                nY: -102,
                nWidth: 64,
                nHeight: 36
            }, {
                nX: -30,
                nY: -98,
                nWidth: 56,
                nHeight: 100
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

        // 6, 4, 8
        attack_6B: {
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
                    nFrame: 4,
                    sFrame: 'attack_6_0'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_6_1'
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
                    sFrame: 'move_1',
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
                    sFrame: 'move_1',
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

        // 12, 4, 16
        attack_C: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 10,
                sFrame: 'ki_0_0'
            },
            {
                nFrame: 8,
                sFrame: 'ki_0_1',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 10,
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
            }
        ],

        // Death ball
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
                sCod: 'super',
                oName: {
                    LSW_FRZ: 'Desu Bōru',
                    SWP_FRT: 'Desu Bōru',
                    CTM_MTL_KRA: 'Sūpānova Kūra'
                },
                sAnimation: 'attack_236C',
                nCost: 12,
                nDamage: 4,
                nGatlingLevel: 3,
                sCheck: 'bGround',
                aEntity: {
                    sType: 'projectile',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'death',
                    nFrameStart: 13,
                    oPosition: {
                        nX: -24,
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
                sCod: 'death_beam',
                sName: 'Desubīmu',
                sAnimation: 'attack_C',
                sListAnimation: 'list_C',
                nCost: 4,
                nGatlingLevel: 2,
                sCheck: 'bGround',
                aEntity: {
                    sType: 'beam',
                    sSFX: 'ADO__Projectile',
                    sAnimation: 'beam',
                    nFrameStart: 13,
                    bLink: true,
                    oPosition: {
                        nX: 16,
                        nY: -12
                    }
                },
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
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
                sCod: 'launcher',
                sName: 'Launcher',
                sAnimation: 'attack_2B',
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
                sCod: 'extra',
                sName: 'Palm',
                sAnimation: 'attack_6B',
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_1'
                },
                oPushback: {
                    nLength: 4,
                    nX: -96
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
                sCod: 'tracker',
                sName: 'Tracker',
                sAnimation: 'attack_6A',
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
                sCod: 'heavy',
                sName: 'Heavy',
                sAnimation: 'attack_B',
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
                sCod: 'light_first',
                sName: 'Light',
                sAnimation: 'attack_A_0',
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oFollowUp: {
                    sName: '2nd',
                    sCod: 'light_second',
                    sAnimation: 'attack_A_1',
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