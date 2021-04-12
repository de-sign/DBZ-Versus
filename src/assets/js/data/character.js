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
            nZIndex: 10
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
            nZIndex: 10
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
            nZIndex: 80,
            aHitBox: {
                nWidth: 1024
            }
        },
        // Super
        super_first: {
            sPath: 'super_first.png',
            nZIndex: 80
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
        forward: {
            oMove: {
                nX: 6
            },
            aFrames: [
                {
                    nFrame: 2,
                    sFrame: 'blur'
                },
                {
                    sFrame: 'forward'
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
                        bGuard: true
                    }
                },
                {
                    sFrame: 'backward',
                    oStatus: {
                        bGuard: true
                    }
                }
            ]
        },
        // Hurt
        guard: [
            {
                sFrame: 'guard',
                oStatus: {
                    bGuard: true
                }
            }
        ],
        reflect: [
            {
                sFrame: 'blur',
                nFrame: 2,
                aHurtBox: null,
            },
            {
                sFrame: 'reflect',
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
                sFrame: 'recovery'
            },
            {
                nFrame: 7,
                sFrame: 'recovery'
            },
            {
                nFrame: 2,
                sFrame: 'blur',
                aHurtBox: null
            }
        ],
        // List
        super_list: [
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
                sFrame: 'list_first',
                aHurtBox: null
            },
            {
                nFrame: 2,
                sFrame: 'list_second',
                aHurtBox: null
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
            },
        ]
    },
    oCommands: {
        aDefense: [
            {
                sName: 'reflect',
                sAnimation: 'reflect',
                bGuard: true,
                nCost: 4,
                nDamage: 0,
                oStun: {},
                oPushback: {
                    nLength: 4,
                    nX: -192
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