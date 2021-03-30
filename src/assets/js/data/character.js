GAME.oData.oDefaultCharacter = {
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
        ki_blast: {
            sPath: 'ki_blast.png',
            nZIndex: 30
        },
        // Super
        super_first: {
            sPath: 'super_first.png',
            nZIndex: 30
        },
        super_second: {
            sPath: 'super_second.png',
            nZIndex: 30
        },
        super_third: {
            sPath: 'super_third.png',
            nZIndex: 30
        },
        super_fourth: {
            sPath: 'super_fourth.png',
            nZIndex: 30
        },
        super_fifth: {
            sPath: 'super_fifth.png',
            nZIndex: 30,
            aHitBox: {
                nWidth: 1024
            }
        },
        super_sixth: {
            sPath: 'super_sixth.png',
            nZIndex: 30,
            aHitBox: {
                nWidth: 1024
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