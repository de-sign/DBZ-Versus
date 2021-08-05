/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oEntity ----- */
/* ----- DETAILS
Constante avec les données de base des personnages.  
Prévue pour être étendu et formaté par les informations contenues dans chaque fichier personnages :
    - [GameData.oCharacter.BJT](GameData.oCharacter.BJT.md)
    - [GameData.oCharacter.BUU](GameData.oCharacter.BUU.md)
    - [GameData.oCharacter.FRZ](GameData.oCharacter.FRZ.md)
    - [GameData.oCharacter.GHN](GameData.oCharacter.GHN.md)
    - [GameData.oCharacter.GKU](GameData.oCharacter.GKU.md)
    - [GameData.oCharacter.GKU_SSJ](GameData.oCharacter.GKU_SSJ.md)
    - [GameData.oCharacter.KID_GHN](GameData.oCharacter.KID_GHN.md)
    - [GameData.oCharacter.MJN_BUU](GameData.oCharacter.MJN_BUU.md)
----- */
GameData.oEntity.oCharacter = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Données des FRAMES ----- */
    oFrames: {
        // Surcharger par "_CHAR.js", complété via "gulp extra"
        stand_0: {},
        stand_1: {
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

        move_0: {
            nZIndex: 10,
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
        move_1: {
            nZIndex: 20,
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
        move_2: {
            nZIndex: 10,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            }
        },
        move_3: {
            nZIndex: 40,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            }
        },

        jump_0: {
            nZIndex: 30,
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
        jump_1: {
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
        jump_2: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
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
        jump_3: {
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
        jump_4: {
            nZIndex: 30,
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

        // Hurt
        guard_0: {
            nZIndex: 10,
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
        guard_1: {
            nZIndex: 10,
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
        guard_2: {
            nZIndex: 40,
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
        
        hit_0: {
            nZIndex: 10,
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
        hit_1: {
            nZIndex: 10,
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
        hit_2: {
            nZIndex: 10,
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
        hit_3: {
            nZIndex: 10,
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
        hit_4: {
            nZIndex: 10,
            oPositionBox: {
                nX: -30,
                nY: -58,
                nWidth: 60,
                nHeight: 60
            }
        },
        hit_5: {
            nZIndex: 10,
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
        hit_6: {
            nZIndex: 10,
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

        // Command
        throw_0: {
            nZIndex: 30,
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
        throw_1: {
            nZIndex: 30,
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
        throw_2: {
            nZIndex: 30,
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
        throw_3: {
            nZIndex: 30,
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

        attack_0_0: {
            nZIndex: 30,
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
        attack_0_1: {
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 76
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
        attack_0_2: {
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 76
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
        attack_0_3: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 76
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
        attack_0_4: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 76
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
        attack_0_5: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
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

        attack_1_0: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
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
        attack_1_1: {
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
        attack_1_2: {
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
        attack_1_3: {
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
            }],
            aHitBox: [{
                nX: -10,
                nY: -78,
                nWidth: 64,
                nHeight: 56
            }]
        },
        attack_1_4: {
            nZIndex: 30,
            oPositionBox: {
                nX: -22,
                nY: -110,
                nWidth: 68,
                nHeight: 76
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

        attack_4_0: {
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
        attack_4_3: {
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

        attack_5_0: {
            nZIndex: 30,
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
        attack_5_1: {
            nZIndex: 30
        },
        attack_5_2: {
            nZIndex: 30
        },
        attack_5_3: {
            nZIndex: 30,
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

        attack_6_0: {
            nZIndex: 30,
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
        attack_6_1: {
            nZIndex: 30
        },
        attack_6_2: {
            nZIndex: 30
        },
        attack_6_3: {
            nZIndex: 30,
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

        ki_0_0: {
            nZIndex: 80
        },
        ki_0_1: {
            nZIndex: 80
        },

        // Super
        ki_1_0: {
            nZIndex: 80,
            oStatus: {
                bInvul: true
            }
        },
        ki_1_1: {
            nZIndex: 80
        },
        ki_1_2: {
            nZIndex: 80
        },

        // Command List
        list_0: {},
        list_1: {},
        list_2: {},
        list_3: {},
        list_4: {}
    },
    /* ----- DETAILS Données des animations ----- */
    oAnimations: {
        // Stand
        move_0: {
            sType: 'landing',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'jump_4',
                    oStatus: {
                        bAerial: false,
                        bLaunch: false
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bReverse: true
                    }
                }
            ]
        },
        move_5: {
            sType: 'stand',
            aFrames: [
                {
                    sFrame: 'stand_0',
                    oStatus: {
                        bReverse: true,
                        bAerial: false
                    }
                }
            ]
        },
        move_1: {
            sType: 'stand',
            aFrames: [
                {
                    sFrame: 'stand_0',
                    oStatus: {
                        bReverse: true,
                        bGuard: true
                    }
                }
            ]
        },

        // Move
        move_6: {
            sType: 'movement',
            oMove: {
                nX: 6
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
                    sFrame: 'move_1',
                    oStatus: {
                        bReverse: true
                    }
                }
            ]
        },
        move_4: {
            sType: 'movement',
            oMove: {
                nX: -6
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bReverse: true,
                        bGuard: true
                    }
                },
                {
                    sFrame: 'move_0',
                    oStatus: {
                        bReverse: true,
                        bGuard: true
                    }
                }
            ]
        },
        move_66: {
            sType: 'dash',
            oMove: {
                nX: 12
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 2,
                    sFrame: 'move_2'
                },
                {
                    nFrame: 7,
                    sFrame: 'move_1'
                },
                {
                    nFrame: 1,
                    sFrame: 'move_1',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true,
                        bReverse: true
                    }
                }
            ]
        },
        move_44: {
            sType: 'dash',
            oMove: {
                nX: -12
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 8,
                    sFrame: 'move_2'
                },
                {
                    nFrame: 1,
                    sFrame: 'move_0'
                },
                {
                    nFrame: 1,
                    sFrame: 'move_0',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true,
                        bReverse: true
                    }
                }
            ]
        },

        // Hurt
        defense_4: {
            sType: 'guard',
            aFrames: [
                {
                    nFrame: 1,
                    sFrame: 'guard_0__2',
                    oStatus: {
                        bGuard: true
                    }
                },
                {
                    sFrame: 'guard_0',
                    oStatus: {
                        bGuard: true
                    }
                }
            ]
        },
        defense_j4: {
            sType: 'guard',
            aFrames: [
                {
                    nFrame: 1,
                    sFrame: 'guard_1__2',
                    oStatus: {
                        bGuard: true
                    }
                },
                {
                    sFrame: 'guard_1',
                    oStatus: {
                        bGuard: true
                    }
                }
            ]
        },
        defense_D: {
            sType: 'action',
            aFrames: [
                {
                    sFrame: 'stand_1__0',
                    nFrame: 2
                },
                {
                    sFrame: 'guard_0__0',
                    nFrame: 4
                },
                {
                    sFrame: 'guard_2__0',
                    nFrame: 6,
                    aHitBox: {
                        nX: -1024,
                        nY: (-39 * 4) - 2,
                        nWidth: 2048,
                        nHeight: 40 * 4
                    }
                },
                {
                    sFrame: 'stand_1__0',
                    nFrame: 2
                }
            ]
        },
        defense_4D: {
            sType: 'action',
            aFrames: [
                {
                    sFrame: 'stand_1__0',
                    nFrame: 2
                },
                {
                    sFrame: 'guard_0__0',
                    nFrame: 4
                },
                {
                    sFrame: 'guard_2__0',
                    nFrame: 6,
                    aHitBox: {
                        nX: -1024,
                        nY: (-39 * 4) - 2,
                        nWidth: 2048,
                        nHeight: 40 * 4
                    }
                },
                {
                    sFrame: 'stand_1__0',
                    nFrame: 2
                }
            ]
        },

        hit_0: {
            sType: 'hit',
            aFrames: [
                {
                    nFrame: 1,
                    sFrame: 'hit_0__1'
                },
                {
                    sFrame: 'hit_0'
                }
            ]
        },
        hit_1: {
            sType: 'hit',
            aFrames: [
                {
                    nFrame: 1,
                    sFrame: 'hit_1__1'
                },
                {
                    sFrame: 'hit_1'
                }
            ]
        },
        hit_2: {
            sType: 'hit',
            aFrames: [
                {
                    nFrame: 1,
                    sFrame: 'hit_2__1'
                },
                {
                    sFrame: 'hit_2'
                }
            ]
        },
        hit_D: {
            sType: 'hit',
            aFrames: [
                {
                    nFrame: 6,
                    sFrame: 'hit_0__3',
                    oStatus: {
                        bThrow: true
                    }
                },
                {
                    sFrame: 'hit_0'
                }
            ]
        },
        
        launch_2: {
            sType: 'down',
            aFrames: [
                {
                    nFrame: 20,
                    sFrame: 'hit_4__0',
                    oStatus: {
                        bAerial: false,
                        bLaunch: false
                    }
                }
            ]
        },
        launch_5: {
            sType: 'recovery',
            aFrames: [
                {
                    nFrame: 6,
                    sFrame: 'move_2__0',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'stand_1__0'
                }
            ]
        },
        
        attack_2D: {
            sType: 'cancel',
            aFrames: [
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'guard_0',
                    nFrame: 8
                },
                {
                    sFrame: 'guard_2',
                    nFrame: 12
                },
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'stand_0',
                    nFrame: 6
                }
            ]
        },
        attack_jA: {
            sType: 'action',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_0_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'attack_0_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_0_1',
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
        attack_jB: {
            sType: 'action',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_1_1'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_1_2'
                },
                {
                    nFrame: 8,
                    sFrame: 'attack_1_3'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_1_2',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_1_4',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },

        // Choppe
        attack_nD_0: {
            sType: 'action',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_0'
                },
                {
                    nFrame: 3,
                    sFrame: 'throw_1'
                },
                {
                    nFrame: 3,
                    sFrame: 'throw_1',
                    aHitBox: {
                        nX: 22,
                        nY: -110,
                        nWidth: 32,
                        nHeight: 112
                    }
                },
                {
                    nFrame: 1,
                    sFrame: 'throw_1',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                }
            ]
        },
        attack_4D_1: {
            sType: 'action',
            oMove: {
                nDelay: 4,
                nLength: 1,
                nX: 84
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 5,
                    sFrame: 'move_3',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 1,
                    sFrame: 'stand_1',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },

        // List
        list_8: {
            sType: 'jump',
            aFrames: [
                {
                    sFrame: 'jump_2'
                }
            ]
        },
        list_C: {
            sType: 'animation',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'move_1'
                },
                {
                    nFrame: 10,
                    sFrame: 'ki_0_0'
                },
                {
                    nFrame: 8,
                    sFrame: 'list_4'
                },
                {
                    nFrame: 10,
                    sFrame: 'ki_0_0'
                },
                {
                    nFrame: 2,
                    sFrame: 'move_1'
                }
            ]
        },
        list_236C: {
            sType: 'animation',
            aFrames: [
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
                    nFrame: 36,
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
                }
            ]
        },

        // Animation
        anim_open: {
            sType: 'animation',
            aFrames: [
                // TP
                {
                    nFrame: 8,
                    sFrame: 'move_3'
                },
                // FORWARD
                {
                    nFrame: 8,
                    sFrame: 'move_1'
                },
                // REFLECT
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'guard_0',
                    nFrame: 12
                },
                {
                    sFrame: 'guard_2',
                    nFrame: 16,
                    aHitBox: null
                },
                // STAND
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'stand_0'
                }
            ]
        },
        anim_death:  {
            sType: 'animation',
            aFrames: [
                {
                    sFrame: 'hit_4'
                }
            ]
        },
        anim_victory: {
            sType: 'animation',
            aFrames: [
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'guard_2',
                    nFrame: 24,
                    aHitBox: null
                },
                {
                    sFrame: 'guard_0',
                    nFrame: 32
                },
                // STAND
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    sFrame: 'stand_0'
                }
            ]
        },
        anim_lose: {
            sType: 'animation',
            aFrames: [
                {
                    sFrame: 'stand_1',
                    nFrame: 2
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_2'
                },
                {
                    nFrame: 6,
                    sFrame: 'throw_3'
                },
                {
                    sFrame: 'throw_2'
                }
            ]
        }
    },
    /* ----- DETAILS Données des commandes ----- */
    oCommands: {
        aDefense: [
            {
                sCod: 'defense_4D',
                sAnimation: 'defense_4D',
                oList: {
                    sName: 'Reflect',
                    sInfo: 'On guard',
                    sGroup: 'defense'
                },
                oProperty: {
                    sCollisionBox: 'oPositionBox'
                },
                oGatling: {
                    sCheck: 'bGuard',
                    nCost: 10,
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { D: true }
                        ]
                    },
                    aEntity: [
                        {
                            sType: 'Effect',
                            sAnimation: 'impact_hit',
                            oPosition: {
                                nX: 72
                            },
                            bReverse: true,
                            nFrameStart: 7
                        },
                        {
                            sType: 'Effect',
                            sAnimation: 'impact_hit',
                            oPosition: {
                                nX: 72
                            },
                            bReverse: false,
                            nFrameStart: 7
                        }
                    ]
                },
                oFreeze: {
                    bInfo: false,
                    nLength: 14
                },
                oHit: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sImpact: false
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192,
                        bDivide: false
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sImpact: false
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -192,
                        bDivide: false
                    }
                }
            },
            {
                sCod: 'defense_D',
                sAnimation: 'defense_D',
                oList: {
                    sName: 'Tech Throw',
                    sInfo: 'On throw',
                    sGroup: 'defense'
                },
                oProperty: {
                    sCollisionBox: 'oPositionBox'
                },
                oGatling: {
                    sCheck: 'bThrow',
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { D: true }
                        ]
                    },
                    aEntity: [
                        {
                            sType: 'Effect',
                            sAnimation: 'impact_hit',
                            oPosition: {
                                nX: 72
                            },
                            bReverse: true,
                            nFrameStart: 7
                        },
                        {
                            sType: 'Effect',
                            sAnimation: 'impact_hit',
                            oPosition: {
                                nX: 72
                            },
                            bReverse: false,
                            nFrameStart: 7
                        }
                    ]
                },
                oFreeze: {
                    bInfo: false,
                    nLength: 14
                },
                oHit: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        nStun: 12,
                        sAnimation: 'hit_0',
                        sImpact: false
                    },
                    oPushback: {
                        nLength: 4,
                        nX: -98,
                        bDivide: false
                    }
                }
            }
        ],
        aGround: [
            {
                sCod: 'move_66',
                sAnimation: 'move_66',
                oList: {
                    sName: 'Forward Dash',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 10,
                        aButtons: [
                            { FW: false },
                            { NT: false },
                            { FW: false }
                        ]
                    }
                }
            },
            {
                sCod: 'move_44',
                sAnimation: 'move_44',
                oList: {
                    sName: 'Backward Dash',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 10,
                        aButtons: [
                            { BW: false },
                            { NT: false },
                            { BW: false }
                        ]
                    }
                }
            },
            {
                sCod: 'attack_6D_0',
                sAnimation: 'attack_nD_0',
                oList: {
                    sName: 'Throw',
                    sGroup: 'offense'
                },
                oProperty: {
                    bUnblockable: true,
                    sOpponentCheck: 'bGround',
                    sCollisionBox: 'oPositionBox'
                },
                oGatling: {
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { FW: false, D: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        nStun: 30,
                        sAnimation: 'hit_D'
                    },
                    oPushback: {
                        nLength: 0,
                        nX: 0
                    }
                }
            },
            {
                sCod: 'attack_4D_0',
                sAnimation: 'attack_nD_0',
                oList: {
                    sName: 'Backward Throw',
                    sGroup: 'offense'
                },
                oProperty: {
                    bUnblockable: true,
                    sOpponentCheck: 'bGround',
                    sCollisionBox: 'oPositionBox'
                },
                oGatling: {
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { BW: false, D: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        nStun: 30,
                        sAnimation: 'hit_D'
                    },
                    oPushback: {
                        nLength: 0,
                        nX: 0
                    }
                },
                oFollowUp: {
                    sCheck: true,
                    sCod: 'attack_4D_1',
                    sAnimation: 'attack_4D_1',
                    oProperty: {},
                    oGatling: {
                        oManipulation: {
                            bLast: true
                        }
                    }
                }
            },
            {
                sCod: 'attack_2D',
                sAnimation: 'attack_2D',
                oList: {
                    sName: 'Freeze Cancel',
                    sGroup: 'offense'
                },
                oProperty: {},
                oGatling: {
                    nCost: 20,
                    bReset: true,
                    bIgnoreLevel: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, D: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: 'Effect',
                            sAnimation: 'cancel',
                            oPosition: {},
                            nFrameStart: 9
                        }
                    ]
                },
                oFreeze: {
                    bInfo: false,
                    nLength: 30
                }
            }
        ],
        aAerial: [
            {
                sCod: 'move_j66',
                sAnimation: 'move_66',
                oList: {
                    sName: 'Forward Air Dash',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 10,
                        aButtons: [
                            { FW: false },
                            { NT: false },
                            { FW: false }
                        ]
                    }
                }
            },
            {
                sCod: 'move_j44',
                sAnimation: 'move_44',
                oList: {
                    sName: 'Backward Air Dash',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 10,
                        aButtons: [
                            { BW: false },
                            { NT: false },
                            { BW: false }
                        ]
                    }
                }
            },
            {
                sCod: 'attack_jB',
                sAnimation: 'attack_jB',
                oList: {
                    sName: 'Jump Heavy',
                    sGroup: 'aerial'
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
                        nStun: 20,
                        sAnimation: 'hit_1'
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: 'defense_4'
                    }
                }
            },
            {
                sCod: 'attack_jA',
                sAnimation: 'attack_jA',
                oList: {
                    sName: 'Jump Light',
                    sGroup: 'aerial'
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
                        nStun: 16,
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
            }
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */