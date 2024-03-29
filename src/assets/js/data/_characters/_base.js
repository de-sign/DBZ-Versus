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
            },
            aHurtBox: {
                nX: -46,
                nY: -130,
                nWidth: 92,
                nHeight: 132
            }
        },
        move_3: {
            nZIndex: 40,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: {
                nX: -46,
                nY: -130,
                nWidth: 92,
                nHeight: 132
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
            aHurtBox: {
                nX: -34,
                nY: -146,
                nWidth: 68,
                nHeight: 148
            }
        },
        ki_1_1: {
            nZIndex: 80,
            aHurtBox: {
                nX: -34,
                nY: -146,
                nWidth: 68,
                nHeight: 148
            }
        },
        ki_1_2: {
            nZIndex: 80
        }
    },
    /* ----- DETAILS Données des animations ----- */
    oAnimations: {
        restart: {
            sType: 'restart',
            aFrames: [
                {
                    sFrame: 'stand_0',
                    nFrame: 1,
                    oStatus: {
                        bReverse: true,
                        bAerial: false,
                        bLaunch: false
                    }
                }
            ]
        },
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
        // stand AERIAL
        move_j5: {
            sType: 'stand',
            aFrames: [
                {
                    sFrame: 'jump_2',
                    oStatus: {
                        bReverse: true,
                        bAerial: true
                    }
                }
            ]
        },

        // Move
        move_6: {
            sType: 'movement',
            uMove: {
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
                    sFrame: 'move_1',
                    oStatus: {
                        bReverse: true
                    }
                }
            ]
        },
        move_4: {
            sType: 'movement',
            uMove: {
                nX: -8
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
            uMove: {
                nX: 16 * 12,
                nLength: 12,
                bParallel: true
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
                    nFrame: 6,
                    sFrame: 'move_1'
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
        move_44: {
            sType: 'dash',
            uMove: {
                nX: -8 * 12,
                nLength: 12
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1'
                },
                {
                    nFrame: 6,
                    sFrame: 'move_2'
                },
                {
                    nFrame: 2,
                    sFrame: 'move_0'
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

        // jump
        move_7: {
            // Extend via LOADING
            sType: 'jump'
        },
        move_8: {
            // Extend via LOADING
            sType: 'jump',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oStatus: {
                        bAerial: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'jump_0',
                },
                {
                    nFrame: 4,
                    sFrame: 'jump_1'
                }
            ]
        },
        move_9: {
            // Extend via LOADING
            sType: 'jump'
        },
        move_j66: {
            sType: 'dash',
            uMove: {
                nX: 12 * 14,
                nLength: 14
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'move_2',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 8,
                    sFrame: 'move_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    },
                    oStatus: {
                        bReverse: true
                    }
                }
            ]
        },
        move_j44: {
            sType: 'dash',
            uMove: {
                nX: -12 * 14,
                nLength: 14
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 8,
                    sFrame: 'move_2',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'move_0',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    },
                    oStatus: {
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
                        bReverse: true,
                        bGuard: true
                    }
                },
                {
                    sFrame: 'guard_1',
                    oStatus: {
                        bReverse: true,
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
                    nFrame: 2,
                    aHitBox: {
                        nX: -1024,
                        nY: (-39 * 4) - 2,
                        nWidth: 2048,
                        nHeight: 40 * 4
                    }
                },
                {
                    sFrame: 'guard_2__0',
                    nFrame: 8
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
        
        launch_0: {
            // Extend via LOADING
            sType: 'hit'
        },
        launch_1: {
            sType: 'launch',
            aFrames: [
                {
                    sFrame: 'hit_3'
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
        launch_4: {
            // Extend via LOADING
            sType: 'recovery'
        },
        launch_5: {
            sType: 'recovery',
            aFrames: [
                {
                    nFrame: 6,
                    sFrame: 'move_2__0',
                    oStatus: {
                        bReverse: true,
                        bThrough: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'stand_1__0'
                }
            ]
        },
        launch_6: {
            // Extend via LOADING
            sType: 'recovery'
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
                    nFrame: 16
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
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    },
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_0_1'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_0_2'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_0_1'
                },
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    }
                }
            ]
        },
        attack_jB: {
            sType: 'action',
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'stand_1',
                    oPositionBox: {
                        nX: -22,
                        nY: -110,
                        nWidth: 68,
                        nHeight: 76
                    },
                    oStatus: {
                        bReverse: true
                    }
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
                    nFrame: 6,
                    sFrame: 'attack_1_3'
                },
                {
                    nFrame: 4,
                    sFrame: 'attack_1_2'
                },
                {
                    nFrame: 2,
                    sFrame: 'attack_1_4'
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
                    nFrame: 4,
                    sFrame: 'throw_1',
                    aHitBox: {
                        nX: 22,
                        nY: -110,
                        nWidth: 32,
                        nHeight: 112
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
            uMove: {
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
        attack_nD_2: [
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
                sFrame: 'attack_4_1'
            },
            {
                nFrame: 8,
                sFrame: 'attack_4_2'
            },
            {
                nFrame: 4,
                sFrame: 'attack_4_1'
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
                nLevel: 0,
                oHit: {
                    oStun: {
                        nStun: 36
                    },
                    oPushback: {
                        nLength: 18,
                        nX: -128,
                        bDivide: false
                    }
                },
                oGuard: {
                    oStun: {
                        nStun: 36
                    },
                    oPushback: {
                        nLength: 18,
                        nX: -128,
                        bDivide: false
                    }
                },
                oProperty: {
                    sCollisionBox: 'oPositionBox',
                    bCantCounter: true
                },
                oGatling: {
                    sCheck: 'bGuard',
                    nCost: 10,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['D']
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
                aEffect: [
                    {
                        sType: 'dark',
                        nLength: 14
                    },
                    {
                        sType: 'freeze',
                        nLength: 14,
                        bIgnore: true
                    }
                ]
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
                    sCollisionBox: 'oPositionBox',
                    bCantCounter: true
                },
                oGatling: {
                    sCheck: 'bThrow',
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['D']
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
                aEffect: [
                    {
                        sType: 'dark',
                        nLength: 14
                    },
                    {
                        sType: 'freeze',
                        nLength: 14,
                        bIgnore: true
                    }
                ],

                nLevel: 0,
                oHit: {
                    oStun: {
                        nStun: 12
                    },
                    oPushback: {
                        nLength: 6,
                        nX: -128,
                        bDivide: false
                    }
                }
            }
        ],
        aRecovery: [
            {
                sCod: 'launch_6',
                sAnimation: 'launch_6',
                oList: {
                    sName: 'Forward Recovery',
                    bHidden: true
                },
                oProperty: {
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 10
                    }
                },
                oGatling: {
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['FW'],
                        bLast: true
                    }
                }
            },
            {
                sCod: 'launch_4',
                sAnimation: 'launch_4',
                oList: {
                    sName: 'Backward Recovery',
                    bHidden: true
                },
                oProperty: {
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 10
                    }
                },
                oGatling: {
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['BW'],
                        bLast: true
                    }
                }
            },
            {
                sCod: 'launch_5',
                sAnimation: 'launch_5',
                oList: {
                    sName: 'Recovery',
                    bHidden: true
                },
                oProperty: {
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 10
                    }
                },
                oGatling: {
                    oManipulation: {
                        bLast: true
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
                    sCancelCod: 'dash',
                    oManipulation: {
                        nMaxLengthFrame: 12,
                        aButtons: ['NT', 'FW', 'NT', 'FW']
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
                oProperty: {
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 6
                    }
                },
                oGatling: {
                    sCancelCod: 'dash',
                    oManipulation: {
                        nMaxLengthFrame: 12,
                        aButtons: ['NT', 'BW', 'NT', 'BW']
                    }
                }
            },
            {
                sCod: 'move_9',
                sAnimation: 'move_9',
                oList: {
                    sName: 'Forward Jump',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCancelCod: 'jump',
                    oManipulation: {
                        bStay: true,
                        nMaxLengthFrame: 1,
                        aButtons: ['UF']
                    }
                }
            },
            {
                sCod: 'move_7',
                sAnimation: 'move_7',
                oList: {
                    sName: 'Backward Jump',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCancelCod: 'jump',
                    oManipulation: {
                        bStay: true,
                        nMaxLengthFrame: 1,
                        aButtons: ['UB']
                    }
                }
            },
            {
                sCod: 'move_8',
                sAnimation: 'move_8',
                oList: {
                    sName: 'Neutral Jump',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCancelCod: 'jump',
                    oManipulation: {
                        bStay: true,
                        nMaxLengthFrame: 1,
                        aButtons: ['UP']
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
                    sCollisionBox: 'oPositionBox',
                    bCantCounter: true
                },
                oGatling: {
                    sCancelCod: 'throw',
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['FW+D'],
                        bLast: true
                    }
                },
                nLevel: 0,
                oHit: {
                    oStun: {
                        nStun: 36,
                        sAnimation: 'hit_D'
                    }
                },
                oFollowUp: {
                    sCheck: true,
                    sCod: 'attack_6D_1',
                    sAnimation: 'attack_nD_2',
                    oProperty: {
                        bLaunch: true
                    },
                    oGatling: {
                        sCancelCod: 'throw',
                        oCancel: {
                            cancel: true,
                            attack: true,
                            special: true,
                            super: true,
                            jump: true
                        },
                        oManipulation: {
                            bLast: true
                        }
                    },
                    nLevel: 3,
                    oHit: {
                        oDamage: {
                            nScaling: 20
                        }
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
                    sCollisionBox: 'oPositionBox',
                    bCantCounter: true
                },
                oGatling: {
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['BW+D'],
                        bLast: true
                    }
                },
                nLevel: 0,
                oHit: {
                    oStun: {
                        nStun: 36,
                        sAnimation: 'hit_D'
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
                    },
                    oFollowUp: {
                        sCod: 'attack_4D_2',
                        sAnimation: 'attack_nD_2',
                        oProperty: {
                            bLaunch: true
                        },
                        oGatling: {
                            sCancelCod: 'throw',
                            oCancel: {
                                cancel: true,
                                attack: true,
                                special: true,
                                super: true,
                                jump: true
                            },
                            oManipulation: {
                                bLast: true
                            }
                        },
                        nLevel: 3,
                        oHit: {
                            oDamage: {
                                nScaling: 20
                            }
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
                    sCancelCod: 'cancel',
                    nCost: 20,
                    bReset: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['DN+D'],
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
                aEffect: [
                    {
                        sType: 'dark',
                        nLength: 30
                    },
                    {
                        sType: 'freeze',
                        nLength: 30,
                        bIgnore: true
                    }
                ]
            }
        ],
        aAerial: [
            {
                sCod: 'move_jnn', // Same code B.Dash
                sAnimation: 'move_j66',
                oList: {
                    sName: 'Forward Air Dash',
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCancelCod: 'dash',
                    oManipulation: {
                        nMaxLengthFrame: 12,
                        aButtons: [
                            ['NT', 'FW', 'NT', 'FW'],
                            ['NT', 'UF', 'NT', 'FW']
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
                            nFrameStart: 1
                        }
                    ]
                }
            },
            {
                sCod: 'move_jnn', // Same code F.Dash
                sAnimation: 'move_j44',
                oList: {
                    sName: 'Backward Air Dash',
                    bHidden: true
                },
                oProperty: {
                    oInvulnerable: {
                        sType: 'All',
                        nStart: 1,
                        nLength: 6
                    }
                },
                oGatling: {
                    sCancelCod: 'dash',
                    oManipulation: {
                        nMaxLengthFrame: 12,
                        aButtons: [
                            ['NT', 'BW', 'NT', 'BW'],
                            ['NT', 'UB', 'NT', 'BW']
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
                
                nLevel: 2,
                oHit: {
                    oStun: {
                        nStun: 21
                    }
                },
                oGuard: {
                    oStun: {
                        nStun: 16
                    }
                },

                oProperty: {},
                oGatling: {
                    sCancelCod: 'attack',
                    oCancel: {
                        cancel: true,
                        attack: true,
                        special: true,
                        super: true
                    },
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['B'],
                        bLast: true
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
                
                nLevel: 1,
                oHit: {
                    oStun: {
                        nStun: 18
                    }
                },
                oGuard: {
                    oStun: {
                        nStun: 14
                    }
                },

                oProperty: {},
                oGatling: {
                    sCancelCod: 'attack',
                    oCancel: {
                        cancel: true,
                        attack: true,
                        special: true,
                        super: true
                    },
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['A'],
                        bLast: true
                    }
                }
            }
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */