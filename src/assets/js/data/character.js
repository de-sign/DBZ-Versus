GAME.oData.oEntity.oCharacter = {
    oFrames: {
        // Surcharger par "_CHAR.js", complété via "gulp extra"
        stand: {
            sPath: 'stand.png'
        },
        blur: {
            sPath: 'blur.png'
        },
        backward: {
            sPath: 'backward.png',
            nZIndex: 10
        },
        forward: {
            sPath: 'forward.png',
            nZIndex: 20
        },
        forward_inverse: {
            sPath: 'forward_inverse.png',
            nZIndex: 20
        },
        jump: {
            sPath: 'jump.png',
            nZIndex: 30
        },
        fall: {
            sPath: 'fall.png',
            nZIndex: 30
        },
        recovery: {
            sPath: 'recovery.png',
            nZIndex: 10,
            oStatus: {
                bInvul: true
            }
        },
        // Hurt
        guard: {
            sPath: 'guard.png',
            nZIndex: 10
        },
        reflect: {
            sPath: 'reflect.png',
            nZIndex: 40,
            aHitBox: {
                nX: -1024,
                nY: (-39 * 4) - 2,
                nWidth: 2048,
                nHeight: 40 * 4
            }
        },
        burst: {
            sPath: 'burst.png',
            nZIndex: 40
        },
        hit_light: {
            sPath: 'hit_light.png',
            nZIndex: 10
        },
        hit_heavy: {
            sPath: 'hit_heavy.png',
            nZIndex: 10
        },
        hit_luncher: {
            sPath: 'hit_luncher.png',
            nZIndex: 10
        },
        hit_fall: {
            sPath: 'hit_fall.png',
            nZIndex: 10
        },
        down: {
            sPath: 'down.png',
            nZIndex: 10,
            oStatus: {
                bInvul: true
            }
        },
        // Command
        light_first: {
            sPath: 'light_first.png',
            nZIndex: 30
        },
        light_first_active: {
            sPath: 'light_first_active.png',
            nZIndex: 30
        },
        light_second: {
            sPath: 'light_second.png',
            nZIndex: 30
        },
        light_second_active: {
            sPath: 'light_second_active.png',
            nZIndex: 30
        },
        light_third: {
            sPath: 'light_third.png',
            nZIndex: 30
        },
        light_third_active: {
            sPath: 'light_third_active.png',
            nZIndex: 30
        },
        heavy: {
            sPath: 'heavy.png',
            nZIndex: 30
        },
        heavy_active: {
            sPath: 'heavy_active.png',
            nZIndex: 30
        },
        tracker: {
            sPath: 'tracker.png',
            nZIndex: 30
        },
        tracker_active: {
            sPath: 'tracker_active.png',
            nZIndex: 30
        },
        luncher: {
            sPath: 'luncher.png',
            nZIndex: 30
        },
        luncher_active: {
            sPath: 'luncher_active.png',
            nZIndex: 30
        },
        kikoha: {
            sPath: 'kikoha.png',
            nZIndex: 80
        },
        ki_beam: {
            sPath: 'ki_beam.png',
            nZIndex: 80
        },
        // Super
        super_first: {
            sPath: 'super_first.png',
            nZIndex: 80,
            oStatus: {
                bInvul: true
            }
        },
        super_second: {
            sPath: 'super_second.png',
            nZIndex: 80
        },
        super_third: {
            sPath: 'super_third.png',
            nZIndex: 80
        },
        super_fourth: {
            sPath: 'super_fourth.png',
            nZIndex: 80
        },
        // Command List
        list_first: {
            sPath: 'list_first.png'
        },
        list_second: {
            sPath: 'list_second.png'
        },
        list_third: {
            sPath: 'list_third.png'
        },
        list_fourth: {
            sPath: 'list_fourth.png'
        },
        list_beam: {
            sPath: 'list_beam.png'
        }
    },
    oAnimations: {
        // Movement
        stand: [
            {
                sFrame: 'stand',
                oStatus: {
                    bReverse: true,
                }
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
        forward: {
            oMove: {
                nX: 6
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur',
                    oStatus: {
                        bReverse: true,
                    }
                },
                {
                    sFrame: 'forward',
                    oStatus: {
                        bReverse: true,
                    }
                }
            ]
        },
        backward: {
            oMove: {
                nX: -6
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur',
                    oStatus: {
                        bReverse: true,
                        bGuard: true
                    }
                },
                {
                    sFrame: 'backward',
                    oStatus: {
                        bReverse: true,
                        bGuard: true
                    }
                }
            ]
        },
        // Hurt
        guard: [
            {
                nFrame: 1,
                sFrame: 'guard_filter',
                oStatus: {
                    bGuard: true
                }
            },
            {
                sFrame: 'guard',
                oStatus: {
                    bGuard: true
                }
            }
        ],
        reflect: [
            {
                sFrame: 'blur_invul',
                nFrame: 2
            },
            {
                sFrame: 'reflect_invul',
                nFrame: 10
            },
            {
                sFrame: 'blur_invul',
                nFrame: 2
            }
        ],
        hit_light: [
            {
                nFrame: 1,
                sFrame: 'hit_light_filter'
            },
            {
                sFrame: 'hit_light'
            }
        ],
        hit_heavy: [
            {
                nFrame: 1,
                sFrame: 'hit_heavy_filter'
            },
            {
                sFrame: 'hit_heavy'
            }
        ],
        hit_luncher: [
            {
                nFrame: 1,
                sFrame: 'hit_luncher_filter'
            },
            {
                sFrame: 'hit_luncher'
            }
        ],
        hit_throw: [
            {
                nFrame: 6,
                sFrame: 'hit_light_throw',
                oStatus: {
                    bThrow: true
                }
            },
            {
                sFrame: 'hit_light'
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
                sFrame: 'recovery',
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 7,
                sFrame: 'recovery'
            },
            {
                nFrame: 2,
                sFrame: 'blur_invul'
            }
        ],
        teleport: {
            oMove: {
                nDelay: 4,
                nLength: 1,
                nX: 84
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 5,
                    sFrame: 'burst',
                    oStatus: {
                        bReverse: true
                    }
                },
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    nFrame: 1,
                    sFrame: 'blur',
                    oStatus: {
                        bCancel: true
                    }
                }
            ]
        },
        // List
        super_list: [
            {
                nFrame: 2,
                sFrame: 'blur_invul'
            },
            {
                nFrame: 30,
                sFrame: 'super_first'
            },
            {
                nFrame: 10,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'list_first'
            },
            {
                nFrame: 2,
                sFrame: 'list_second'
            },
            {
                nFrame: 36,
                sFrame: 'list_third'
            },
            {
                nFrame: 2,
                sFrame: 'list_second'
            },
            {
                nFrame: 2,
                sFrame: 'list_first'
            },
            {
                nFrame: 20,
                sFrame: 'super_second'
            },
            {
                nFrame: 2,
                sFrame: 'blur'
            }
        ],
        // Choppe
        throw: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 6,
                sFrame: 'reflect',
                aHitBox: null
            },
            {
                nFrame: 3,
                sFrame: 'guard'
            },
            {
                nFrame: 3,
                sFrame: 'guard',
                aHitBox: {
                    nX: 22,
                    nY: -110,
                    nWidth: 32,
                    nHeight: 112
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
    oCommands: {
        aDefense: [
            {
                sCod: 'tech_throw',
                sAnimation: 'reflect',
                sCheck: 'bThrow',
                nDamage: 0,
                sCollisionBox: 'oPositionBox',
                oStun: {},
                oPushback: {
                    nLength: 4,
                    nX: -192
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 2,
                    aButtons: [
                        { A: false, B: true }
                    ]
                }
            },
            {
                sCod: 'reflect',
                sAnimation: 'reflect',
                sCheck: 'bGuard',
                nCost: 4,
                nDamage: 0,
                sCollisionBox: 'oPositionBox',
                oStun: {},
                oPushback: {
                    nLength: 4,
                    nX: -192
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 2,
                    aButtons: [
                        { B: false, C: true }
                    ]
                }
            }
        ],
        aOffense: [
            {
                sCod: 'back_throw',
                sAnimation: 'throw',
                nDamage: 0,
                bUnblockable: true,
                bOnlyOnGround: true,
                sCollisionBox: 'oPositionBox',
                oStun: {
                    nHit: 30,
                    sHitAnimation: 'hit_throw'
                },
                oPushback: {},
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 5,
                    aButtons: [
                        { BW: false, A: false, B: true }
                    ]
                },
                oFollowUp: {
                    sCod: 'throw_teleport',
                    sAnimation: 'teleport',
                    bFollowOnlyOnHurt: true,
                    oStun: {},
                    oPushback: {},
                    bLast: true
                }
            },
            {
                sCod: 'throw',
                sAnimation: 'throw',
                nDamage: 0,
                bUnblockable: true,
                bOnlyOnGround: true,
                sCollisionBox: 'oPositionBox',
                oStun: {
                    nHit: 30,
                    sHitAnimation: 'hit_throw'
                },
                oPushback: {},
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 5,
                    aButtons: [
                        { A: false, B: true }
                    ]
                }
            }
        ]
    }
};