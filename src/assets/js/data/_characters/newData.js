const oBefore = {
    // aFilter: undefined ( ALL ) | [ GameData.oCharacter.CHAR.sColor ]
    sCod: '',
    oList: {
        sName: '',
        // sInfo: ''
        sGroup: '', // GameSettings.oList.oGroup KEY
        // sAnimation: COMMAND_STRUCT.sAnimation
        // bHidden: false
    },
    sAnimation: '',
    // nGatlingLevel: undefined ( CANT gatling from/to if COMMAND_STRUCT.bIgnoreGatlingLevel = false ) | 0+, 
    // bResetGatling: true,
    // bIgnoreGatlingLevel: false,
    // bJumpCancellable: false,
    sCheck: 'bGround' | 'bAerial' | 'bGuard' | 'bThrow'
    // nCost: 0+,
    nDamage: 0+,
    // nMinimumReduce: GameSettings.oDamage.nMinimumReduce,
    // bUnblockable: false,
    // bOnlyOnGround: false,
    // sCollisionBox: 'oHurtBox' | 'oPositionBox' | 'oHitBox'
    aEntity: [
        {
            // Common Entity
            sType: 'sound' | 'projectile' | 'beam' | 'character' | 'effect' | 'text',
            bLink: false,
            oPosition: {
                nX: -0+,
                nY: -0+
            },

            // NOT sType: 'sound' | 'text'
            // sEntity: 'ALL',
            // sColor: GameData.oCharacter.CHAR.CLR.sEntityColor,
            sAnimation: '',
            // bReverse: PLAYER.bReverse,

            // FOR sType: 'text'
            sText: '',
            nLength: 1+
        }
    ],
    oFreeze: {
        nLength: 1+,
        // bInfo: false
    },
    oStun: {
        nHit: 0+,
        nBlock: 0+,
        // bLaunch: false,
        sHitAnimation: '',
        // sImpactAnimation: 'impact_hit' / 'impact_guard' | GameData.oEntity.oEffect.oAnimations KEY | false
        // sImpactText: 'パフ' / 'バム'
    },
    /*
    oKi: {
        oAttack: {
            nHit: 2,
            nGuard: 1
        },
        oDefend: {
            nHit: 1,
            nGuard: 1
        }
    },
    */
    /*
    oPushBack: {
        nLength: 4,
        nX: -24,
        // bNotDivide: false
    }
    */
    bLast: true,
    oManipulation: {
        nMaxLengthFrame: 2,
        aButtons: [
            { BTN: true }
        ]
    }
    /*
    oFollowUp: {
        COMMAND_STRUCT
        // bFollowOnlyOnHurt: false
    }
    */
};

const oAfter = {
    sCod: '',
    // aFilter: undefined ( ALL ) | [ GameData.oCharacter.CHAR.sColor ]
    sAnimation: '',

    oList: {
        sName: '',
        // sInfo: ''
        sGroup: '', // GameSettings.oList.oGroup KEY
        // sAnimation: COMMAND_STRUCT.sAnimation
        // bHidden: false
    },

    oProperty: {
        // bLaunch: false,
        // bJumpCancellable: false,
        // bUnblockable: false,
        // sOpponentCheck: false | 'bGround' | 'bAerial'
        // sCollisionBox: 'oHurtBox' | 'oPositionBox' | 'oHitBox'
    },

    oGatling: {
        sCheck: 'bGround' | 'bAerial' | 'bGuard' | 'bThrow'
        // nCost: 0+,
        // nLevel: undefined ( CANT gatling from/to if COMMAND_STRUCT.oGatling.bIgnoreLevel = false ) | -0+, 
        // bReset: true,
        // bIgnoreLevel: false,

        oManipulation: {
            bLast: true,
            nMaxLengthFrame: 2,
            aButtons: [
                { BTN: true }
            ]
        }
    },

    /*
    oFreeze: {
        nLength: 1+,
        // bInfo: false
    },
    */

    oHit: {
        oDamage: {
            // nDamage: GameSettings.oDamage.nDefault,
            // nMinimumReduce: GameSettings.oDamage.nMinimumReduce,
        },

        /*
        oKi: {
            nGain: 2,
            nGive: 1
        },
        */

        oStun: {
            nStun: 0+,
            sAnimation: '',
            // sImpact: 'impact_hit' | GameData.oEntity.oEffect.oAnimations KEY | false,
            // sText: 'パフ'
        },
        
        /*
        oPushBack: {
            nLength: 4,
            nX: -24,
            // bNotDivide: false
        }
        */
    },

    oGuard: {
        oDamage: {
            // nDamage: 0
        },

        /*
        oKi: {
            nGain: 4,
            nGive: 1
        },
        */

        oStun: {
            nStun: 0+,
            sAnimation: '',
            // sImpact: 'impact_guard' | GameData.oEntity.oEffect.oAnimations KEY | false,
            // sText: 'バム'
        },
        
        /*
        oPushBack: {
            nLength: 4,
            nX: -24,
            // bNotDivide: false
        }
        */
    },

    /*
    aFollowUp: [
        {
            COMMAND_STRUCT
            // bOnlyOnHurt: false
        }
    ],
    */

    // TODO ON ANIMATION
    aEntity: [
        {
            nFrameStart: 1+,

            // Common Entity
            sType: 'sound' | 'projectile' | 'beam' | 'character' | 'effect' | 'text',
            bLink: false,
            oPosition: {
                nX: -0+,
                nY: -0+
            },

            // NOT sType: 'sound' | 'text'
            // sEntity: 'ALL',
            // sColor: GameData.oCharacter.CHAR.CLR.sEntityColor,
            sAnimation: '',
            // bReverse: PLAYER.bReverse,

            // FOR sType: 'text'
            sText: '',
            nLength: 1+
        }
    ]
};

const oData = {
    base: {
        aDefense: [
            {
                sCod: "defense_4D",
                sAnimation: "defense_4D",
                oList: {
                    sName: "Reflect",
                    sInfo: "On guard",
                    sGroup: "defense"
                },
                oProperty: {
                    sCollisionBox: "oPositionBox"
                },
                oGatling: {
                    sCheck: "bGuard",
                    nCost: 10,
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { D: true }
                        ]
                    },
                    aEntity: [
                        {
                            sType: "effect",
                            sAnimation: "impact_hit",
                            oPosition: {
                                nX: 72
                            },
                            bReverse: true,
                            nFrameStart: 7
                        },
                        {
                            sType: "effect",
                            sAnimation: "impact_hit",
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
                    }
                },
                oGuard: {
                    oDamage: {},
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sImpact: false
                    }
                }
            },
            {
                sCod: "defense_D",
                sAnimation: "defense_D",
                oList: {
                    sName: "Tech Throw",
                    sInfo: "On throw",
                    sGroup: "defense"
                },
                oProperty: {
                    sCollisionBox: "oPositionBox"
                },
                oGatling: {
                    sCheck: "bThrow",
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            { D: true }
                        ]
                    },
                    aEntity: [
                        {
                            sType: "effect",
                            sAnimation: "impact_hit",
                            oPosition: {
                                nX: 72
                            },
                            bReverse: true,
                            nFrameStart: 7
                        },
                        {
                            sType: "effect",
                            sAnimation: "impact_hit",
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
                        sAnimation: "hit_0",
                        sImpact: false
                    }
                },
                oGuard: {
                    oDamage: {},
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sAnimation: "defense_4",
                        sImpact: false
                    }
                }
            }
        ],
        aOffense: [
            {
                sCod: "move_66",
                sAnimation: "move_66",
                oList: {
                    sName: "Forward Dash",
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { FW: false },
                            { NT: false },
                            { FW: false }
                        ]
                    }
                }
            },
            {
                sCod: "move_44",
                sAnimation: "move_44",
                oList: {
                    sName: "Backward Dash",
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { BW: false },
                            { NT: false },
                            { BW: false }
                        ]
                    }
                }
            },
            {
                sCod: "attack_4D_0",
                sAnimation: "attack_4D_0",
                oList: {
                    sName: "Backward Throw",
                    sGroup: "offense"
                },
                oProperty: {
                    bUnblockable: true,
                    sOpponentCheck: "bGround",
                    sCollisionBox: "oPositionBox"
                },
                oGatling: {
                    sCheck: "bGround",
                    oManipulation: {
                        nMaxLengthFrame: 2,
                        aButtons: [
                            {
                                BW: false,
                                D: true
                            }
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
                        sAnimation: "hit_D"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCheck: "bHurt",
                    sCod: "attack_4D_1",
                    sAnimation: "attack_4D_1",
                    oProperty: {},
                    oGatling: {
                        oManipulation: {
                            bLast: true
                        }
                    }
                }
            },
            {
                sCod: "attack_6D",
                sAnimation: "attack_6D",
                oList: {
                    sName: "Throw",
                    sGroup: "offense"
                },
                oProperty: {
                    bUnblockable: true,
                    sOpponentCheck: "bGround",
                    sCollisionBox: "oPositionBox"
                },
                oGatling: {
                    sCheck: "bGround",
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
                        sAnimation: "hit_D"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_D",
                sAnimation: "attack_D",
                oList: {
                    sName: "Freeze Cancel",
                    sGroup: "offense"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 20,
                    bReset: true,
                    bIgnoreLevel: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DW: false, D: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "effect",
                            sAnimation: "cancel",
                            oPosition: {},
                            nFrameStart: 9
                        }
                    ]
                },
                oFreeze: {
                    bInfo: false,
                    nLength: 30
                }
            },
            {
                sCod: "move_j66",
                sAnimation: "move_66",
                oList: {
                    sName: "Forward Air Dash",
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bAerial",
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { FW: false },
                            { NT: false },
                            { FW: false }
                        ]
                    }
                }
            },
            {
                sCod: "move_j44",
                sAnimation: "move_44",
                oList: {
                    sName: "Backward Air Dash",
                    bHidden: true
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bAerial",
                    nLevel: 0,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { BW: false },
                            { NT: false },
                            { BW: false }
                        ]
                    }
                }
            },
            {
                sCod: "attack_jB",
                sAnimation: "attack_jB",
                oList: {
                    sName: "Jump Heavy",
                    sGroup: "aerial"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bAerial",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { B: true }
                        ]
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 50
                    },
                    oStun: {
                        nStun: 20,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 16,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_jA",
                sAnimation: "attack_jA",
                oList: {
                    sName: "Jump Light",
                    sGroup: "aerial"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bAerial",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ]
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 25
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            }
        ]
    },

    GKU: {
        aOffense: [
            {
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Genki-dama",
                    sGroup: "ki"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "元気",
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: "text",
                            sText: "玉",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Beam",
                            sAnimation: "ball",
                            nFrameStart: 13,
                            oPosition: {
                                nX: 0,
                                nY: -256
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 400,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Taiyoken",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 1,
                    bReset: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "太陽",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "flash",
                            sColor: "ORG",
                            nFrameStart: 13,
                            oPosition: {
                                nX: 8,
                                nY: -64
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 0
                    },
                    oStun: {
                        nStun: 26,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 16,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_6A",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    GKU_SSJ: {
        aOffense: [
            {
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Cho Kamehameha",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "超か",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "超かめは",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "超かめはめ波",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "circle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: 0,
                                nY: 0
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -28
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_6A",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_B_0",
                sAnimation: "attack_B_0",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_B_1",
                    sAnimation: "attack_B_1",
                    oList: {
                        sAnimation: "list_attack_B_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
                        nLevel: 1,
                        oManipulation: {
                            bLast: true
                        }
                    },
                    oHit: {
                        oDamage: {
                            nDamage: 50
                        },
                        oStun: {
                            nStun: 16,
                            sAnimation: "hit_1"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 10,
                            sAnimation: "defense_4"
                        }
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    BJT: {
        aOffense: [
            {
                aFilter: [
                    CTM_SSJ,
                    LSW_SSJ
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Fainaru Furasshu",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "ファイ",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "ファイナルフラ",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "ファイナルフラッシュ",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "big_triangle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -32,
                                nY: -12
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                aFilter: [
                    CTM_BAD,
                    LSW_BAD
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Gyarikku-ho",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "ギャ",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "ギャリッ",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "ギャリック砲",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "triangle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -12,
                                nY: -12
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -28
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_6A",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    },
                    oFollowUp: {
                        sCod: "attack_A_2",
                        sAnimation: "attack_A_2",
                        oList: {
                            sAnimation: "list_attack_A_2"
                        },
                        oProperty: {},
                        oGatling: {
                            sCheck: "bGround",
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
                                nStun: 13,
                                sAnimation: "hit_0"
                            }
                        },
                        oGuard: {
                            oDamage: {},
                            oStun: {
                                nStun: 12,
                                sAnimation: "defense_4"
                            }
                        }
                    }
                }
            }
        ]
    },
    KID_GHN: {
        aOffense: [
            {
                aFilter: [
                    LSW_SSJT
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Oyako Kamehameha",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "親子",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "親子かめ",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "親子かめはめ波",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "circle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -4,
                                nY: 12
                            }
                        },
                        {
                            sType: "character",
                            sEntity: "GKU_SSJ",
                            sColor: "LSW_SSJ",
                            sAnimation: "anim_GHN_SSJT",
                            nFrameStart: 13,
                            bLink: true,
                            oPosition: {
                                nX: -52,
                                nY: 0
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                aFilter: [
                    LSW_TRN
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Masenko",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "魔",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "魔閃",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "魔閃光",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "triangle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -8,
                                nY: 8
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -24
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A_0",
                sAnimation: "attack_6A_0",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_6A_1",
                    sAnimation: "attack_6A_1",
                    oList: {
                        sAnimation: "list_attack_6A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
                        nLevel: 1,
                        oManipulation: {
                            bLast: true
                        }
                    },
                    oHit: {
                        oStun: {
                            nStun: 18,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    },
                    sCheck: "bHurt"
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    },
                    oFollowUp: {
                        sCod: "attack_A_2",
                        sAnimation: "attack_A_2",
                        oList: {
                            sAnimation: "list_attack_A_2"
                        },
                        oProperty: {},
                        oGatling: {
                            sCheck: "bGround",
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
                                nStun: 13,
                                sAnimation: "hit_0"
                            }
                        },
                        oGuard: {
                            oDamage: {},
                            oStun: {
                                nStun: 12,
                                sAnimation: "defense_4"
                            }
                        }
                    }
                }
            }
        ]
    },
    GHN: {
        aOffense: [
            {
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Masenko",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "魔",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "魔閃",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "魔閃光",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sText: "魔閃光",
                            sAnimation: "triangle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: 0,
                                nY: -8
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -28
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A_0",
                sAnimation: "attack_6A_0",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_6A_1",
                    sAnimation: "attack_6A_1",
                    oList: {
                        sAnimation: "list_attack_6A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                        oStun: {
                            nStun: 18,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    },
                    sCheck: "bHurt"
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    FRZ: {
        aOffense: [
            {
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Desu Boru",
                    sGroup: "ki"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "デス",
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: "text",
                            sText: "ボール",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Beam",
                            sAnimation: "death",
                            nFrameStart: 13,
                            oPosition: {
                                nX: -24,
                                nY: -230
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Desubimu",
                    sGroup: "ki",
                    sAnimation: "list_C"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "デスビーム",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Projectile",
                            sAnimation: "beam",
                            nFrameStart: 13,
                            bLink: true,
                            oPosition: {
                                nX: 16,
                                nY: -12
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6B",
                sAnimation: "attack_6B",
                oList: {
                    sName: "Palm",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_6A",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    SRU: {
        aOffense: [
            {
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Taiyokei Hakai K.",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "太陽系破",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "太陽系破壊かめ",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "太陽系破壊かめはめ波",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "circle",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: 0,
                                nY: 0
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Desubīmu",
                    sGroup: "ki",
                    sAnimation: "list_C"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "デスビーム",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Projectile",
                            sAnimation: "beam",
                            nFrameStart: 13,
                            bLink: true,
                            oPosition: {
                                nX: 16,
                                nY: -12
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "extra",
                sAnimation: "attack_6B",
                oList: {
                    sName: "Shoulder dash",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_2A",
                oList: {
                    sName: "Slide",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    BUU: {
        aOffense: [
            {
                aFilter: [
                    CTM_MBU,
                    LSW_MBU
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Cho Noryoku",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "超",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "超能",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "超能力",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "zigzag",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -16,
                                nY: -60
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                aFilter: [
                    LSW_SBU
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Cho Noryoku",
                    sGroup: "ki",
                    sAnimation: "list_236C"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "超",
                            nFrameStart: 1
                        },
                        {
                            sType: "text",
                            sText: "超能",
                            nFrameStart: 22
                        },
                        {
                            sType: "text",
                            sText: "超能力",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "beam",
                            sSFX: "ADO__Beam",
                            sAnimation: "zigzag",
                            nFrameStart: 43,
                            bLink: true,
                            oPosition: {
                                nX: -16,
                                nY: -72
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -24
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6B",
                sAnimation: "attack_6B",
                oList: {
                    sName: "Shoulder dash",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A_0",
                sAnimation: "attack_6A_0",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_6A_1",
                    sAnimation: "attack_6A_1",
                    oList: {
                        sAnimation: "list_attack_6A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
                        nLevel: 1,
                        oManipulation: {
                            bLast: true
                        }
                    },
                    oHit: {
                        oDamage: {
                            nDamage: 75
                        },
                        oStun: {
                            nStun: 18,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    },
                    sCheck: "bHurt"
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 16,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    },
    MJN_BUU: {
        aOffense: [
            {
                aFilter: [
                    LSW_MJB
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Puranetto Basuto",
                    sGroup: "ki"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "プラネット",
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: "text",
                            sText: "バスト",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Beam",
                            sAnimation: "ball",
                            nFrameStart: 13,
                            oPosition: {
                                nX: -48,
                                nY: -256
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                }
            },
            {
                aFilter: [
                    LSW_PKR
                ],
                sCod: "attack_236C",
                sAnimation: "attack_236C",
                oList: {
                    sName: "Makuhoidan",
                    sGroup: "ki"
                },
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nCost: 30,
                    nLevel: 3,
                    oManipulation: {
                        nMaxLengthFrame: 15,
                        aButtons: [
                            { DN: false },
                            { DF: false },
                            { FW: false, C: true }
                        ],
                        bLast: false
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "魔空包",
                            nFrameStart: 13,
                            nLength: 30
                        },
                        {
                            sType: "text",
                            sText: "魔空包囲弾",
                            nFrameStart: 43,
                            nLength: 36
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Beam",
                            sAnimation: "death",
                            nFrameStart: 13,
                            oPosition: {
                                nX: 0,
                                nY: -230
                            }
                        }
                    ]
                },
                oFreeze: {
                    bInfo: true,
                    nLength: 45
                },
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nStun: 36,
                        sAnimation: "hit_1",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 36,
                        sAnimation: "defense_4",
                        sImpact: "explode_heavy",
                        sText: "ブーム"
                    }
                }
            },
            {
                sCod: "attack_C",
                sAnimation: "attack_C",
                oList: {
                    sName: "Kikoha",
                    sGroup: "ki"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nCost: 10,
                    nLevel: 2,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { C: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: "text",
                            sText: "気功波",
                            nLength: 40,
                            nFrameStart: 1
                        },
                        {
                            sType: "projectile",
                            sSFX: "ADO__Projectile",
                            sText: "気功波",
                            sAnimation: "kikoha",
                            nFrameStart: 10,
                            oPosition: {
                                nX: 58,
                                nY: -28
                            }
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 16,
                        sAnimation: "hit_0",
                        sImpact: "explode_light"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4",
                        sImpact: "explode_light"
                    }
                }
            },
            {
                sCod: "attack_2B",
                sAnimation: "attack_2B",
                oList: {
                    sName: "Launcher",
                    sInfo: "Aerial invulnerable",
                    sGroup: "command"
                },
                oProperty: {
                    bLaunch: true,
                    bJumpCancellable: true
                },
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nStun: 22,
                        sAnimation: "hit_2"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_6A",
                sAnimation: "attack_6A_0",
                oList: {
                    sName: "Tracker",
                    sGroup: "command"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { FW: false, A: true }
                        ],
                        bLast: true
                    }
                },
                oHit: {
                    oDamage: {
                        nDamage: 75
                    },
                    oStun: {
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_6A_1",
                    sAnimation: "attack_6A_1",
                    oList: {
                        sAnimation: "list_attack_6A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nDamage: 75
                        },
                        oStun: {
                            nStun: 24,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            },
            {
                sCod: "attack_B",
                sAnimation: "attack_B",
                oList: {
                    sName: "Heavy",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 18,
                        sAnimation: "hit_1"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 10,
                        sAnimation: "defense_4"
                    }
                }
            },
            {
                sCod: "attack_A_0",
                sAnimation: "attack_A_0",
                oList: {
                    sName: "Light",
                    sGroup: "normal"
                },
                oProperty: {},
                oGatling: {
                    sCheck: "bGround",
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
                        nStun: 13,
                        sAnimation: "hit_0"
                    }
                },
                oGuard: {
                    oDamage: {},
                    oStun: {
                        nStun: 12,
                        sAnimation: "defense_4"
                    }
                },
                oFollowUp: {
                    sCod: "attack_A_1",
                    sAnimation: "attack_A_1",
                    oList: {
                        sAnimation: "list_attack_A_1"
                    },
                    oProperty: {},
                    oGatling: {
                        sCheck: "bGround",
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
                            nStun: 13,
                            sAnimation: "hit_0"
                        }
                    },
                    oGuard: {
                        oDamage: {},
                        oStun: {
                            nStun: 12,
                            sAnimation: "defense_4"
                        }
                    }
                }
            }
        ]
    }
}