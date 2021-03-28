GAME.oData.oCharacter.GKU = {
    sCod: 'GKU',
    bActive: true,
    aColor: [
        {
            sCod: 'SSJ',
            sName: 'Gokū SSJ'
        },
        {
            sCod: 'TRN',
            sName: 'Gokū'
        }
    ],
   
    oFrames: {
        // Movement
        stand: {
            sPath: 'stand.png',
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 46 * 4
            }
        },
        blur: {
            sPath: 'blur.png',
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-14 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 30 * 4,
                nHeight: 46 * 4
            }
        },
        backward: {
            sPath: 'backward.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-15 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 46 * 4
            }
        },
        forward: {
            sPath: 'forward.png',
            nZIndex: 20,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 32 * 4,
                nHeight: 43 * 4
            }
        },
        jump: {
            sPath: 'jump.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-5 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-14 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 29 * 4,
                nHeight: 44 * 4
            }
        },
        fall: {
            sPath: 'fall.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-5 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-10 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 23 * 4,
                nHeight: 46 * 4
            }
        },
        teleport_vertical: {
            sPath: 'teleport_vertical.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            }
        },
        // Hurt
        guard: {
            sPath: 'guard.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-10 * 4) - 2,
                nY: (-45 * 4) - 2,
                nWidth: 23 * 4,
                nHeight: 46 * 4
            }
        },
        hit_light: {
            sPath: 'hit_light.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 30 * 4,
                nHeight: 44 * 4
            }
        },
        hit_heavy: {
            sPath: 'hit_heavy.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-15 * 4) - 2,
                nY: (-38 * 4) - 2,
                nWidth: 32 * 4,
                nHeight: 39 * 4
            }
        },
        hit_luncher: {
            sPath: 'hit_luncher.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-14 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 30 * 4,
                nHeight: 43 * 4
            }
        },
        hit_fall: {
            sPath: 'hit_fall.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 23 * 4
            },
            aHurtBox: {
                nX: (-17 * 4) - 2,
                nY: (-36 * 4) - 2,
                nWidth: 37 * 4,
                nHeight: 32 * 4
            }
        },
        down: {
            sPath: 'down.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-14 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 15 * 4
            }
        },
        // Command
        light_first: {
            sPath: 'light_first.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 44 * 4
            }
        },
        light_first_active: {
            sPath: 'light_first_active.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 44 * 4
            },
            aHitBox: {
                nX: (8 * 4) + 2,
                nY: (-24 * 4) - 2,
                nWidth: 11 * 4,
                nHeight: 8 * 4
            }
        },
        light_second: {
            sPath: 'light_second.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 32 * 4,
                nHeight: 44 * 4
            }
        },
        light_second_active: {
            sPath: 'light_second_active.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 32 * 4,
                nHeight: 44 * 4
            },
            aHitBox: {
                nX: (9 * 4) + 2,
                nY: (-23 * 4) - 2,
                nWidth: 11 * 4,
                nHeight: 8 * 4
            }
        },
        heavy: {
            sPath: 'heavy.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 18 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-44 * 4) - 2,
                nWidth: 39 * 4,
                nHeight: 45 * 4
            }
        },
        heavy_active: {
            sPath: 'heavy_active.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 18 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-13 * 4) - 2,
                nY: (-44 * 4) - 2,
                nWidth: 39 * 4,
                nHeight: 45 * 4
            },
            aHitBox: {
                nX: (10 * 4) + 2,
                nY: (-25 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 11 * 4
            }
        },
        tracker: {
            sPath: 'tracker.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-40 * 4) - 2,
                nWidth: 34 * 4,
                nHeight: 41 * 4
            }
        },
        tracker_active: {
            sPath: 'tracker_active.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-40 * 4) - 2,
                nWidth: 34 * 4,
                nHeight: 41 * 4
            },
            aHitBox: {
                nX: (7 * 4) + 2,
                nY: (-22 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 10 * 4
            }
        },
        luncher: {
            sPath: 'luncher.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-5 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 44 * 4
            }
        },
        luncher_active: {
            sPath: 'luncher_active.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-5 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 17 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-43 * 4) - 2,
                nWidth: 28 * 4,
                nHeight: 44 * 4
            },
            aHitBox: {
                nX: (6 * 4) + 2,
                nY: (-38 * 4) - 2,
                nWidth: 10 * 4,
                nHeight: 26 * 4
            }
        },
        // Kameha
        super_first: {
            sPath: 'super_first.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            }
        },
        super_second: {
            sPath: 'super_second.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            }
        },
        super_third: {
            sPath: 'super_third.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            }/*,
            aHitBox: {
                nX: (8 * 4) + 2,
                nY: (-27 * 4) - 2,
                nWidth: (300 - 33) * 4,
                nHeight: 12 * 4
            }*/
        },
        super_fourth: {
            sPath: 'super_fourth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            }
        },
        super_fifth: {
            sPath: 'super_fifth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            },
            aHitBox: {
                nX: (8 * 4) + 2,
                nY: (-34 * 4) - 2,
                nWidth: (300 - 33) * 4,
                nHeight: 26 * 4
            }
        }
        /*
        super_fourth_beam: {
            sPath: 'super_fourth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            },
            aHitBox: {
                nX: (8 * 4) + 2,
                nY: (-27 * 4) - 2,
                nWidth: (300 - 33) * 4,
                nHeight: 12 * 4
            }
        },
        super_fourth_circle: {
            sPath: 'super_fourth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            },
            aHitBox: {
                nX: (21 * 4) + 2,
                nY: (-41 * 4) - 2,
                nWidth: 42 * 4,
                nHeight: 40 * 4
            }
        },
        super_fifth_beam: {
            sPath: 'super_fifth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            },
            aHitBox: {
                nX: (8 * 4) + 2,
                nY: (-34 * 4) - 2,
                nWidth: (300 - 33) * 4,
                nHeight: 26 * 4
            }
        },
        super_fifth_circle: {
            sPath: 'super_fifth.png',
            nZIndex: 30,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 16 * 4,
                nHeight: 28 * 4
            },
            aHurtBox: {
                nX: (-11 * 4) - 2,
                nY: (-42 * 4) - 2,
                nWidth: 31 * 4,
                nHeight: 43 * 4
            },
            aHitBox: {
                nX: (19 * 4) + 2,
                nY: (-50 * 4) - 2,
                nWidth: 58 * 4,
                nHeight: 58 * 4
            }
        }
        */
    },
    oAnimations: {
        // Movement
        stand: [
            {
                sFrame: 'stand'
            }
        ],
        block: [
            {
                sFrame: 'stand',
                oStatus: {
                    bGuard: true
                }
            }
        ],
        forward: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oMove: {
                    nX: 6
                }
            },
            {
                sFrame: 'forward',
                oMove: {
                    nX: 6
                }
            }
        ],
        backward: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oMove: {
                    nX: -6
                },
                oStatus: {
                    bGuard: true
                }
            },
            {
                sFrame: 'backward',
                oMove: {
                    nX: -6
                },
                oStatus: {
                    bGuard: true
                }
            }
        ],
        // Hurt
        guard: [
            {
                sFrame: 'guard',
                oStatus: {
                    bGuard: true
                }
            }
        ],
        hit_light: [
            {
                sFrame: 'hit_light'
            }
        ],
        hit_heavy: [
            {
                sFrame: 'hit_heavy'
            }
        ],
        hit_luncher: [
            {
                sFrame: 'hit_luncher'
            }
        ],
        down: [
            {
                nFrame: 20,
                sFrame: 'down'
            }
        ],
        recovery: [
            {
                nFrame: 1,
                sFrame: 'teleport_vertical'
            },
            {
                nFrame: 7,
                sFrame: 'teleport_vertical'
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                aHurtBox: null
            }
        ],

        // Command
        // 4, 4, 6
        light_first: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 2,
                sFrame: 'light_first',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 4,
                sFrame: 'light_first_active',
                oStatus: {
                    bCancel: true
                }
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
                sFrame: 'blur',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 2,
                sFrame: 'light_second',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 4,
                sFrame: 'light_second_active',
                oStatus: {
                    bCancel: true
                }
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
        // 6, 4, 8
        heavy: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 4,
                sFrame: 'heavy',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 4,
                sFrame: 'heavy_active',
                oStatus: {
                    bCancel: true
                }
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
        ],
        // 8, 6, 10
        tracker: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 4,
                sFrame: 'forward',
                oMove: {
                    nX: 8
                },
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 2,
                sFrame: 'tracker',
                oMove: {
                    nX: 8
                },
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 6,
                sFrame: 'tracker_active',
                oMove: {
                    nX: 8
                },
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'tracker',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'forward',
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
        // 10, 8, 12
        luncher: [
            {
                nFrame: 2,
                sFrame: 'blur',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 6,
                sFrame: 'jump',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 2,
                sFrame: 'luncher',
                oStatus: {
                    bCancel: false
                }
            },
            {
                nFrame: 8,
                sFrame: 'luncher_active',
                oStatus: {
                    bCancel: true
                }
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
        // Kameha
        // 46, 36, 26
        super: [
            {
                nFrame: 2,
                sFrame: 'blur',
                aHurtBox: null
            },
            {
                nFrame: 30,
                sFrame: 'super_first'
            },
            {
                nFrame: 10,
                sFrame: 'super_second',
                aHurtBox: null
            },
            {
                nFrame: 2,
                sFrame: 'super_third',
                aHurtBox: null
            },
            {
                nFrame: 2,
                sFrame: 'super_fourth',
                aHurtBox: null
            },
            {
                nFrame: 36,
                sFrame: 'super_fifth'
            },
            {
                nFrame: 2,
                sFrame: 'super_fourth'
            },
            {
                nFrame: 2,
                sFrame: 'super_third'
            },
            {
                nFrame: 20,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'blur'
            },
        ]
    },
    oCommands: {
        aOffense: [
            {
                sName: 'kamehameha',
                sAnimation: 'super',
                nCost: 6,
                nDamage: 5,
                oStun: {
                    nFreeze: 46,
                    nBlock: 36,
                    nHit: 36,
                    bLunch: true,
                    nPushback: 48 * 4,
                    sHitAnimation: 'hit_heavy'
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
                sName: 'luncher',
                sAnimation: 'luncher',
                oStun: {
                    nBlock: 8,
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
                sName: 'tracker',
                sAnimation: 'tracker',
                oStun: {
                    nBlock: 8,
                    nHit: 18,
                    sHitAnimation: 'hit_heavy'
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
                sName: 'heavy',
                sAnimation: 'heavy',
                oStun: {
                    nBlock: 6,
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
                sName: 'light',
                sAnimation: 'light_first',
                aSelfCancel: ['light_second'],
                oStun: {
                    nBlock: 8,
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
    }
};