# GameData.oCharacter.GKU

**Goku**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_GKU.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_GKU.js)

## Properties
### GameData.oCharacter.GKU.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.GKU.sEntity = 'GKU';
```

### GameData.oCharacter.GKU.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.GKU.aColor = [
    {
        sName: 'Goku',
        sColor: 'CTM_TRN',
        sColorName: 'Custom color',
        sEntityColor: 'BLU',
    },
    {
        sName: 'Goku Kaioken',
        sColor: 'CTM_KOK',
        sColorName: 'Custom color',
        sEntityColor: 'BLU',
    },
    {
        sName: 'Goku',
        sColor: 'LSW_TRN',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'BLU',
    },
    {
        sName: 'Ginyu',
        sColor: 'LSW_GNU',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'PRP',
    }
];
```

### GameData.oCharacter.GKU.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.GKU.oFrames = {
    stand_0: {
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
            nY: -98,
            nWidth: 60,
            nHeight: 32
        }]
    },
    attack_2_1: {
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
            nY: -98,
            nWidth: 60,
            nHeight: 32
        }],
        aHitBox: {
            nX: 18,
            nY: -98,
            nWidth: 64,
            nHeight: 32
        }
    },
    attack_2_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 68,
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
            nWidth: 68,
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
            nX: -34,
            nY: -142,
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
            nX: -34,
            nY: -142,
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
            nX: 22,
            nY: -154,
            nWidth: 44,
            nHeight: 104
        }, {
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 124
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
            nX: 22,
            nY: -154,
            nWidth: 44,
            nHeight: 104
        }, {
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 124
        }],
        aHitBox: {
            nX: 22,
            nY: -154,
            nWidth: 44,
            nHeight: 104
        }
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
            nY: -126,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -6,
            nY: -90,
            nWidth: 100,
            nHeight: 40
        }, {
            nX: -38,
            nY: -54,
            nWidth: 76,
            nHeight: 56
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
            nY: -126,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -6,
            nY: -90,
            nWidth: 100,
            nHeight: 40
        }, {
            nX: -38,
            nY: -54,
            nWidth: 76,
            nHeight: 56
        }],
        aHitBox: {
            nX: 46,
            nY: -90,
            nWidth: 48,
            nHeight: 40
        }
    },
    attack_5_3: false,

    attack_6_0: {
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
    attack_6_1: {
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
    attack_6_2: {
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
        }],
    },

    ki_0_0: {
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
            nY: -110,
            nWidth: 64,
            nHeight: 40
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
        }
    },
    ki_1_2: {
        nZIndex: 80,
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
    }
};
```

### GameData.oCharacter.GKU.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.GKU.oAnimations = {
    // Command
    // 4, 4, 6
    attack_A_0: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
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
            sFrame: 'stand_1'
        }
    ],
    // 4, 4, 6
    attack_A_1: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
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
            sFrame: 'stand_1'
        }
    ],
    attack_A_2: [
        {
            sFrame: 'stand_1',
            nFrame: 2,
            oStatus: {
                bReverse: true
            }
        },
        {
            sFrame: 'guard_0',
            nFrame: 2
        },
        {
            sFrame: 'guard_2',
            nFrame: 2
        },
        {
            sFrame: 'guard_2',
            nFrame: 4,
            aHitBox: {
                nX: -128,
                nY: (-39 * 4) - 2,
                nWidth: 256,
                nHeight: 40 * 4
            }
        },
        {
            sFrame: 'guard_2',
            nFrame: 6,
            oStatus: {
                bCancel: true
            }
        },
        {
            sFrame: 'stand_1',
            nFrame: 2
        }
    ],
    // 6, 4, 8
    attack_B: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
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
            sFrame: 'stand_1'
        }
    ],
    // 8, 6, 10
    attack_6A: {
        uMove: {
            nDelay: 2,
            nLength: 12,
            nX: 96
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
                nFrame: 4,
                sFrame: 'attack_5_0',
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
                sFrame: 'attack_5_3'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },
    // 10, 8, 12
    attack_2B: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
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
            sFrame: 'attack_4_1',
            oStatus: {
                bCancel: true
            }
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
    
    attack_C: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'attack_6_0'
        },
        {
            nFrame: 6,
            sFrame: 'attack_6_1'
        },
        {
            nFrame: 6,
            sFrame: 'attack_6_2'
        },
        {
            nFrame: 8,
            sFrame: 'attack_6_1'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
    ],
    // Kameha
    // 58, 36, 26
    attack_236C: {
        uMove: {
            nDelay: 8,
            nMove: 1,
            nLength: 100,
            nX: -96,
            nY: -96
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bInvul: true,
                    bReverse: true
                }
            },
            {
                nFrame: 12,
                sFrame: 'move_3__0',
                oStatus: {
                    bAerial: true
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
                nFrame: 48,
                sFrame: 'ki_1_2'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    }
};
```

### GameData.oCharacter.GKU.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.GKU.oCommands = {
    aGround: [
        {
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Genki-dama',
                sGroup: 'ki'
            },
            oProperty: {
                bLaunch: true,
                oInvulnerable: {
                    sType: 'All',
                    nStart: 1,
                    nLength: 58
                }
            },
            oGatling: {
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
                        sType: 'Text',
                        sText: '元気',
                        nFrameStart: 25,
                        nLength: 30
                    },
                    {
                        sType: 'Text',
                        sText: '玉',
                        nFrameStart: 55,
                        nLength: 36
                    },
                    {
                        sType: 'Projectile',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'aerial_ball',
                        nFrameStart: 25,
                        oPosition: {
                            nX: 0,
                            nY: -256
                        }
                    }
                ]
            },
            aEffect: [
                {
                    sType: 'dark',
                    nLength: 57
                },
                {
                    sType: 'freeze',
                    nLength: 57,
                    bIgnore: true
                },
                {
                    sType: 'zoom',
                    nLength: 57,
                    nZoom: 1.5,
                    oPosition: {
                        nX: -96,
                        nY: -96
                    }
                }
            ],
            oHit: {
                oDamage: {
                    nDamage: 400,
                    nMinimumReduce: 40
                },
                oStun: {
                    nStun: 36,
                    sAnimation: 'hit_1',
                    sImpact: 'explode_heavy',
                    sText: 'ブーム'
                },
                oPushback: {
                    nLength: 4,
                    nX: -192
                }
            },
            oGuard: {
                oDamage: {
                    nDamage: 0
                },
                oStun: {
                    nStun: 36,
                    sAnimation: 'defense_4',
                    sImpact: 'explode_heavy',
                    sText: 'ブーム'
                },
                oPushback: {
                    nLength: 4,
                    nX: -192
                }
            }
        },
        {
            sCod: 'attack_C',
            sAnimation: 'attack_C',
            oList: {
                sName: 'Taiyoken',
                sGroup: 'ki'
            },
            oProperty: {},
            oGatling: {
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
                        sType: 'Text',
                        sText: '太陽',
                        nLength: 40,
                        nFrameStart: 1
                    },
                    {
                        sType: 'Beam',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'flash',
                        sColor: 'ORG',
                        nFrameStart: 7,
                        bLink: true,
                        oPosition: {
                            nX: -22,
                            nY: -60
                        }
                    }
                ]
            },
            oHit: {
                oDamage: {
                    nDamage: 0,
                    nScaling: 20,
                    nProration: 20
                },
                oStun: {
                    nStun: 26,
                    sAnimation: 'hit_0'
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
            sCod: 'attack_2B',
            sAnimation: 'attack_2B',
            oList: {
                sName: 'Launcher',
                sInfo: 'Aerial invulnerable',
                sGroup: 'command'
            },
            oProperty: {
                bLaunch: true,
                oInvulnerable: {
                    sType: 'Aerial',
                    nStart: 9,
                    nLength: 14
                }
            },
            oGatling: {
                nLevel: 1,
                bJumpCancellable: true,
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
                    sAnimation: 'hit_2'
                }
            },
            oGuard: {
                oDamage: {
                    nDamage: 0
                },
                oStun: {
                    nStun: 12,
                    sAnimation: 'defense_4'
                }
            }
        },
        {
            sCod: 'attack_6A',
            sAnimation: 'attack_6A',
            oList: {
                sName: 'Tracker',
                sGroup: 'command'
            },
            oProperty: {},
            oGatling: {
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
        },
        {
            sCod: 'attack_B',
            sAnimation: 'attack_B',
            oList: {
                sName: 'Heavy',
                sGroup: 'normal'
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
                    nStun: 16,
                    sAnimation: 'hit_1'
                }
            },
            oGuard: {
                oDamage: {
                    nDamage: 0
                },
                oStun: {
                    nStun: 10,
                    sAnimation: 'defense_4'
                }
            }
        },
        {
            sCod: 'attack_A_0',
            sAnimation: 'attack_A_0',
            oList: {
                sName: 'Light',
                sGroup: 'normal'
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
                    nStun: 13,
                    sAnimation: 'hit_0'
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
            },
            oFollowUp: {
                sCod: 'attack_A_1',
                sAnimation: 'attack_A_1',
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
                        nStun: 13,
                        sAnimation: 'hit_0'
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
                },
                oFollowUp: {
                    sCod: 'attack_A_2',
                    sAnimation: 'attack_A_2',
                    oProperty: {},
                    oGatling: {
                        nLevel: 1,
                        oManipulation: {
                            nMaxLengthFrame: 1,
                            aButtons: [
                                { A: true }
                            ],
                            bLast: true
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
                    oHit: {
                        oDamage: {
                            nDamage: 50
                        },
                        oStun: {
                            nStun: 16,
                            sAnimation: 'hit_1',
                            sImpact: false
                        }
                    },
                    oGuard: {
                        oDamage: {
                            nDamage: 0
                        },
                        oStun: {
                            nStun: 10,
                            sAnimation: 'defense_4'
                        }
                    }
                }
            }
        }
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)