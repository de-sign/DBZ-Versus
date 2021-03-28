GAME.oData.oDefaultCharacter = {
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
        guard_reject: {
            sPath: 'guard_reject.png',
            nZIndex: 10,
            oPositionBox: {
                nX: (-7 * 4) - 2,
                nY: (-27 * 4) - 2,
                nWidth: 15 * 4,
                nHeight: 28 * 4
            },
            aHitBox: {
                nX: -1024,
                nY: (-43 * 4) - 2,
                nWidth: 2048,
                nHeight: 44 * 4
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
        }
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
        guard_reject: [
            {
                sFrame: 'blur',
                nFrame: 2,
                aHurtBox: null,
            },
            {
                sFrame: 'guard_reject',
                nFrame: 10
            },
            {
                sFrame: 'blur',
                nFrame: 2,
                aHurtBox: null,
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
        ]
    },
    oCommands: {
        aDefense: [
            {
                sName: 'guard_reject',
                sAnimation: 'guard_reject',
                bGuard: true,
                nCost: 3,
                nDamage: 0,
                oStun: {
                    nPushback: 48 * 4
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { B: false, C: true }
                    ]
                }
            }
        ],
        aOffense: []
    }
};