/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oCharacter ----- */
/* ----- DETAILS
**GohanS SSJT**  
Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  
Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).
----- */
GameData.oCharacter.KID_GHN = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Code technique de l'entité. ----- */
    sEntity: 'KID_GHN',
    /* ----- DETAILS Liste des couleurs de l'entité. ----- */
    aColor: [
        {
            sName: 'Gohan SSJT',
            sColor: 'LSW_SSJT',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'BLU'
        },
        {
            sName: 'Gohan',
            sColor: 'LSW_TRN',
            sColorName: 'Legendary Super Warrior color',
            sEntityColor: 'ORG',
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
        pre_jump: {
            sPath: 'pre_jump.png',
            snZIndex: 30,
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
        super_first: {
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            }
        },
        light_first: {
            sPath: 'light_first.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -130,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }, {
                nX: 22,
                nY: -86,
                nWidth: 60,
                nHeight: 28
            }]
        },
        light_first_active: {
            sPath: 'light_first_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 22,
                nY: -86,
                nWidth: 60,
                nHeight: 28
            },
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -130,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }, {
                nX: 22,
                nY: -86,
                nWidth: 60,
                nHeight: 28
            }]
        },
        light_second: {
            sPath: 'light_second.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -130,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }, {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }]
        },
        light_second_active: {
            sPath: 'light_second_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            },
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -14,
                nY: -130,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }, {
                nX: 22,
                nY: -94,
                nWidth: 64,
                nHeight: 32
            }]
        },
        light_third: {
            sPath: 'light_third.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -130,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: 22,
                nY: -114,
                nWidth: 44,
                nHeight: 44
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }]
        },
        light_third_active: {
            sPath: 'light_third_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 22,
                nY: -114,
                nWidth: 44,
                nHeight: 44
            },
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 60,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -22,
                nY: -130,
                nWidth: 60,
                nHeight: 60
            }, {
                nX: 22,
                nY: -114,
                nWidth: 44,
                nHeight: 44
            }, {
                nX: -30,
                nY: -94,
                nWidth: 56,
                nHeight: 96
            }]
        },
        heavy: {
            sPath: 'heavy.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -138,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -14,
                nY: -106,
                nWidth: 48,
                nHeight: 108
            }, {
                nX: 30,
                nY: -90,
                nWidth: 76,
                nHeight: 44
            }]
        },
        heavy_active: {
            sPath: 'heavy_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 30,
                nY: -90,
                nWidth: 76,
                nHeight: 44
            },
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -26,
                nY: -138,
                nWidth: 60,
                nHeight: 52
            }, {
                nX: -14,
                nY: -106,
                nWidth: 48,
                nHeight: 108
            }, {
                nX: 30,
                nY: -90,
                nWidth: 76,
                nHeight: 44
            }]
        },
        tracker: {
            sPath: 'tracker.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -130,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -90,
                nWidth: 68,
                nHeight: 40
            }, {
                nX: -10,
                nY: -58,
                nWidth: 44,
                nHeight: 60
            }]
        },
        tracker_active: {
            sPath: 'tracker_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 22,
                nY: -90,
                nWidth: 68,
                nHeight: 40
            },
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -130,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -90,
                nWidth: 68,
                nHeight: 40
            }, {
                nX: -10,
                nY: -58,
                nWidth: 44,
                nHeight: 60
            }]
        },
        tracker_second: {
            sPath: 'tracker_second.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -130,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -114,
                nWidth: 68,
                nHeight: 40
            }, {
                nX: 22,
                nY: -78,
                nWidth: 72,
                nHeight: 36
            }, {
                nX: -10,
                nY: -58,
                nWidth: 44,
                nHeight: 60
            }]
        },
        tracker_second_active: {
            sPath: 'tracker_second_active.png',
            nZIndex: 30,
            aHitBox: [{
                nX: 22,
                nY: -114,
                nWidth: 68,
                nHeight: 40
            }, {
                nX: 22,
                nY: -78,
                nWidth: 72,
                nHeight: 36
            }],
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 72,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -34,
                nY: -130,
                nWidth: 60,
                nHeight: 76
            }, {
                nX: 22,
                nY: -114,
                nWidth: 68,
                nHeight: 40
            }, {
                nX: 22,
                nY: -78,
                nWidth: 72,
                nHeight: 36
            }, {
                nX: -10,
                nY: -58,
                nWidth: 44,
                nHeight: 60
            }]
        },
        luncher: {
            sPath: 'luncher.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 26,
                nY: -150,
                nWidth: 36,
                nHeight: 80
            }, {
                nX: -22,
                nY: -130,
                nWidth: 60,
                nHeight: 132
            }]
        },
        luncher_active: {
            sPath: 'luncher_active.png',
            nZIndex: 30,
            aHitBox: {
                nX: 26,
                nY: -150,
                nWidth: 36,
                nHeight: 80
            },
            oPositionBox: {
                nX: -26,
                nY: -110,
                nWidth: 68,
                nHeight: 112
            },
            aHurtBox: [{
                nX: 26,
                nY: -150,
                nWidth: 36,
                nHeight: 80
            }, {
                nX: -22,
                nY: -130,
                nWidth: 60,
                nHeight: 132
            }]
        },
        kikoha: {
            sPath: 'kikoha.png',
            nnZIndex: 80,
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
        },
        super_second: {
            sPath: 'super_second.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -10,
                nY: -126,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -22,
                nY: -106,
                nWidth: 96,
                nHeight: 64
            }, {
                nX: -38,
                nY: -54,
                nWidth: 84,
                nHeight: 56
            }]
        },
        super_third: {
            sPath: 'super_third.png',
            nZIndex: 30,
            oPositionBox: {
                nX: -30,
                nY: -110,
                nWidth: 64,
                nHeight: 112
            },
            aHurtBox: [{
                nX: -10,
                nY: -126,
                nWidth: 60,
                nHeight: 56
            }, {
                nX: -22,
                nY: -106,
                nWidth: 96,
                nHeight: 64
            }, {
                nX: -38,
                nY: -54,
                nWidth: 84,
                nHeight: 56
            }]
        },
        list_first: false,
        list_second: false,
        list_third: false
    },
    /* ----- DETAILS Données des animations. ----- */
    oAnimations: {
        // 4, 4, 6
        light_first: [
            {
                nFrame: 2,
                sFrame: 'blur'
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
        ],
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
        light_third: {
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
            ]
        },
        // 6, 4, 8
        heavy: {
            
            oMove: {
                nDelay: 2,
                nLength: 2,
                nX: 16
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 4,
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
        // 10, 6, 8
        tracker_first: {
            oMove: {
                nDelay: 2,
                nLength: 18,
                nX: 96
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 2,
                    sFrame: 'forward',
                },
                {
                    nFrame: 4,
                    sFrame: 'pre_jump'
                },
                {
                    nFrame: 2,
                    sFrame: 'tracker'
                },
                {
                    nFrame: 6,
                    sFrame: 'tracker_active'
                },
                {
                    nFrame: 4,
                    sFrame: 'tracker',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
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
            ]
        },
        // 8, 6, 10
        tracker_second: {
            oMove: {
                nLength: 4,
                nX: 24
            },
            aFrames: [
                {
                    nFrame: 4,
                    sFrame: 'tracker',
                },
                {
                    nFrame: 4,
                    sFrame: 'tracker_second',
                },
                {
                    nFrame: 6,
                    sFrame: 'tracker_second_active'
                },
                {
                    nFrame: 2,
                    sFrame: 'tracker_second',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 4,
                    sFrame: 'tracker',
                    oStatus: {
                        bCancel: true
                    }
                },
                {
                    nFrame: 2,
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
        
        // Kameha
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
        ]
    },
    /* ----- DETAILS Données des commandes. ----- */
    oCommands: {
        aOffense: [
            {
                aFilter: ['LSW_SSJT'],
                sCod: 'super',
                sName: 'Oyako Kamehameha',
                sAnimation: 'super',
                sListAnimation: 'super_list',
                nCost: 12,
                nDamage: 4,
                nGatlingLevel: 3,
                aEntity: [
                    {
                        sType: 'beam',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'circle',
                        nFrameStart: 43,
                        bLink: true,
                        oPosition: {
                            nX: -4,
                            nY: 12
                        }
                    },
                    {
                        sType: 'character',
                        sEntity: 'GKU_SSJ',
                        sColor: 'LSW_SSJ',
                        sAnimation: 'GHN_SSJT_super',
                        nFrameStart: 13,
                        bLink: true,
                        oPosition: {
                            nX: -52,
                            nY: 0
                        }
                    }
                ],
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
                aFilter: ['LSW_TRN'],
                sCod: 'super',
                sName: 'Masenkō',
                sAnimation: 'super',
                sListAnimation: 'super_list',
                nCost: 12,
                nDamage: 4,
                nGatlingLevel: 3,
                aEntity:  {
                    sType: 'beam',
                    sSFX: 'ADO__Beam',
                    sAnimation: 'triangle',
                    nFrameStart: 43,
                    bLink: true,
                    oPosition: {
                        nX: -8,
                        nY: 8
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
                        nY: -24
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
                sCod: 'tracker_first',
                sName: 'Tracker',
                sAnimation: 'tracker_first',
                nGatlingLevel: 1,
                oFollowUp: {
                    sCod: 'tracker_second',
                    sName: '2nd',
                    sAnimation: 'tracker_second',
                    nGatlingLevel: 1,
                    oStun: {
                        nBlock: 12,
                        nHit: 18,
                        sHitAnimation: 'hit_light'
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
                    nHit: 18,
                    sHitAnimation: 'hit_heavy'
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
                oFollowUp: {
                    sCod: 'light_second',
                    sName: '2nd',
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
                        sCod: 'light_third',
                        sName: '3rd',
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
                },
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
        ]
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */