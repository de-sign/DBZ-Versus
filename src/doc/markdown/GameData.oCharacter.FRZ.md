# GameData.oCharacter.FRZ

**Furiza**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_FRZ.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_FRZ.js)

## Properties
### GameData.oCharacter.FRZ.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.FRZ.sEntity = 'FRZ';
```

### GameData.oCharacter.FRZ.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.FRZ.aColor = [
    {
        sName: 'Furiza',
        sColor: 'CTM_FRZ',
        sColorName: 'Custom color',
        sEntityColor: 'PRP'
    },
    {
        sName: 'Kura',
        sColor: 'CTM_KRA',
        sColorName: 'Custom color',
        sEntityColor: 'ORG'
    },
    {
        sName: 'Furiza',
        sColor: 'LSW_FRZ',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'PRP'
    },
    {
        sName: 'Frost',
        sColor: 'SWP_FRT',
        sColorName: 'Swap Legendary Super Warrior color',
        sEntityColor: 'PNK'
    }
    /*
    {
        sName: 'Metaru Kura',
        sColor: 'CTM_MKR',
        sColorName: 'Custom color',
        sEntityColor: 'ORG'
    }
    */
];
```

### GameData.oCharacter.FRZ.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.FRZ.oFrames = {

    stand_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -150,
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
            nWidth: 60,
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
            nWidth: 64,
            nHeight: 32
        }]
    },
    attack_2_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
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
            nWidth: 64,
            nHeight: 32
        }],
        aHitBox: {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 32
        }
    },
    attack_2_2: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 46,
            nY: -158,
            nWidth: 44,
            nHeight: 56
        }, {
            nX: 2,
            nY: -142,
            nWidth: 56,
            nHeight: 68
        }, {
            nX: -22,
            nY: -106,
            nWidth: 52,
            nHeight: 108
        }]
    },
    attack_2_3: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 46,
            nY: -158,
            nWidth: 44,
            nHeight: 56
        }, {
            nX: 2,
            nY: -142,
            nWidth: 56,
            nHeight: 68
        }, {
            nX: -22,
            nY: -106,
            nWidth: 52,
            nHeight: 108
        }],
        aHitBox: [{
            nX: 46,
            nY: -158,
            nWidth: 44,
            nHeight: 56
        }, {
            nX: 10,
            nY: -122,
            nWidth: 48,
            nHeight: 40
        }]
    },
    attack_2_4: {
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
            nY: -94,
            nWidth: 64,
            nHeight: 32
        }]
    },
    attack_2_5: {
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
            nX: -30,
            nY: -146,
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
            nX: -30,
            nY: -146,
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
    
    attack_4_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 84
        }, {
            nX: -34,
            nY: -70,
            nWidth: 72,
            nHeight: 72
        }]
    },
    attack_4_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 140
        },{
            nX: -6,
            nY: -174,
            nWidth: 52,
            nHeight: 104
        },{
            nX: 42,
            nY: -154,
            nWidth: 36,
            nHeight: 104
        }]
    },
    attack_4_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 140
        },{
            nX: -6,
            nY: -174,
            nWidth: 52,
            nHeight: 104
        },{
            nX: 42,
            nY: -154,
            nWidth: 36,
            nHeight: 104
        }],
        aHitBox: [{
            nX: -6,
            nY: -174,
            nWidth: 52,
            nHeight: 104
        },{
            nX: 42,
            nY: -154,
            nWidth: 36,
            nHeight: 104
        }]
    },
    attack_4_3: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 140
        }]
    },
    attack_4_4: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -150,
            nWidth: 80,
            nHeight: 56
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }]
    },
    attack_4_5: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -150,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }]
    },
    
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
            nY: -122,
            nWidth: 56,
            nHeight: 64
        }, {
            nX: 58,
            nY: -98,
            nWidth: 40,
            nHeight: 40
        }, {
            nX: -14,
            nY: -90,
            nWidth: 52,
            nHeight: 48
        }, {
            nX: -38,
            nY: -46,
            nWidth: 76,
            nHeight: 48
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
            nY: -122,
            nWidth: 56,
            nHeight: 64
        }, {
            nX: 58,
            nY: -98,
            nWidth: 40,
            nHeight: 40
        }, {
            nX: -14,
            nY: -90,
            nWidth: 52,
            nHeight: 48
        }, {
            nX: -38,
            nY: -46,
            nWidth: 76,
            nHeight: 48
        }],
        aHitBox: {
            nX: 46,
            nY: -98,
            nWidth: 52,
            nHeight: 40
        }
    },
    attack_5_3: false,

    attack_6_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 30,
            nY: -114,
            nWidth: 76,
            nHeight: 40
        }, {
            nX: -14,
            nY: -110,
            nWidth: 48,
            nHeight: 112
        }]
    },
    attack_6_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 30,
            nY: -114,
            nWidth: 76,
            nHeight: 40
        }, {
            nX: -14,
            nY: -110,
            nWidth: 48,
            nHeight: 112
        }],
        aHitBox: {
            nX: 30,
            nY: -114,
            nWidth: 76,
            nHeight: 40
        }
    },

    ki_0_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -150,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: 22,
            nY: -110,
            nWidth: 80,
            nHeight: 32
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }]
    },
    ki_0_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -150,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: 22,
            nY: -110,
            nWidth: 80,
            nHeight: 32
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
        },
        aHurtBox: {
            nX: -30,
            nY: -158,
            nWidth: 64,
            nHeight: 160
        }
    },
    ki_1_2: {
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
    }
};
```

### GameData.oCharacter.FRZ.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.FRZ.oAnimations = {
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
            sFrame: 'attack_2_0'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 4, 4, 6
    attack_A_1: {
        uMove: {
            nDelay: 2,
            nLength: 4,
            nX: 24
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
                nFrame: 2,
                sFrame: 'attack_2_2'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_3'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_2'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

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
            sFrame: 'attack_3_0'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],

    // 6, 4, 8
    attack_6B: {
        uMove: {
            nDelay: 2,
            nLength: 4,
            nX: 32
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
                sFrame: 'attack_6_0'
            },
            {
                nFrame: 4,
                sFrame: 'attack_6_1'
            },
            {
                nFrame: 6,
                sFrame: 'attack_6_0'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },
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
                sFrame: 'move_1',
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
                sFrame: 'attack_5_1'
            },
            {
                nFrame: 6,
                sFrame: 'move_1'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

    // 10, 8, 12
    attack_2B_0: [
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
    // 10, 8, 12
    attack_2B_1: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 10,
            sFrame: 'attack_4_4'
        },
        {
            nFrame: 4,
            sFrame: 'attack_4_5',
            aHitBox: [{
                nX: 80,
                nY: -256,
                nWidth: 160,
                nHeight: 32
            }]
        },
        {
            nFrame: 10,
            sFrame: 'attack_4_5'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],

    // 12, 4, 16
    attack_C: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
        },
        {
            nFrame: 10,
            sFrame: 'ki_0_0'
        },
        {
            nFrame: 4,
            sFrame: 'ki_0_1'
        },
        {
            nFrame: 4,
            sFrame: 'ki_0_1',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 10,
            sFrame: 'ki_0_0'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],

    // Death ball
    // 46, 36, 26
    attack_236C: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bInvul: true,
                bReverse: true
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
            nFrame: 60,
            sFrame: 'ki_1_2'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ]
};
```

### GameData.oCharacter.FRZ.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.FRZ.oCommands = {
    aGround: [
        {
            aFilter: ['CTM_FRZ', 'LSW_FRZ', 'SWP_FRT'],
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Desu Boru',
                sGroup: 'ki'
            },
            nLevel: 6,
            oProperty: {
                bLaunch: true,
                oInvulnerable: {
                    sType: 'All',
                    nStart: 1,
                    nLength: 46
                }
            },
            oGatling: {
                sCancelCod: 'super',
                nCost: 30,
                oManipulation: {
                    nMaxLengthFrame: 12,
                    aButtons: [
                        ['DN', 'DF', 'FW+C'],
                        ['DN', 'DF', 'FW', 'C']
                    ],
                    bLast: false
                },
                aEntity: [
                    {
                        sType: 'Text',
                        sText: 'デス',
                        nFrameStart: 13,
                        nLength: 30
                    },
                    {
                        sType: 'Text',
                        sText: 'ボール',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'Projectile',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'death',
                        nFrameStart: 13,
                        oPosition: {
                            nX: -24,
                            nY: -230
                        }
                    }
                ]
            },
            aEffect: [
                {
                    sType: 'dark',
                    nLength: 45
                },
                {
                    sType: 'freeze',
                    nLength: 45,
                    bIgnore: true
                },
                {
                    sType: 'zoom',
                    nLength: 45,
                    nZoom: 1.5,
                    oPosition: true
                }
            ]
        },
        {
            aFilter: ['CTM_KRA'],
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Supanova',
                sGroup: 'ki'
            },
            nLevel: 6,
            oProperty: {
                bLaunch: true,
                oInvulnerable: {
                    sType: 'All',
                    nStart: 1,
                    nLength: 46
                }
            },
            oGatling: {
                sCancelCod: 'super',
                nCost: 30,
                oManipulation: {
                    nMaxLengthFrame: 12,
                    aButtons: [
                        ['DN', 'DF', 'FW+C'],
                        ['DN', 'DF', 'FW', 'C']
                    ],
                    bLast: false
                },
                aEntity: [
                    {
                        sType: 'Text',
                        sText: 'スーパ',
                        nFrameStart: 13,
                        nLength: 30
                    },
                    {
                        sType: 'Text',
                        sText: 'ーノヴァ',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'Projectile',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'death',
                        nFrameStart: 13,
                        oPosition: {
                            nX: -24,
                            nY: -230
                        }
                    }
                ]
            },
            aEffect: [
                {
                    sType: 'dark',
                    nLength: 45
                },
                {
                    sType: 'freeze',
                    nLength: 45,
                    bIgnore: true
                },
                {
                    sType: 'zoom',
                    nLength: 45,
                    nZoom: 1.5,
                    oPosition: true
                }
            ]
        },
        {
            sCod: 'attack_C',
            sAnimation: 'attack_C',
            oList: {
                sName: 'Desubimu',
                sGroup: 'ki'
            },
            nLevel: 5,
            oHit: {
                oStun: {
                    sAnimation: 'hit_1'
                }
            },
            oProperty: {},
            oGatling: {
                sCancelCod: 'special',
                oCancel: {
                    cancel: true,
                    super: true
                },
                nCost: 10,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: ['C'],
                    bLast: true
                },
                aEntity: [
                    {
                        sType: 'Text',
                        sText: 'デスビーム',
                        nLength: 40,
                        nFrameStart: 1
                    },
                    {
                        sType: 'Beam',
                        sSFX: 'ADO__Projectile',
                        sAnimation: 'beam',
                        nFrameStart: 13,
                        bLink: true,
                        oPosition: {
                            nX: 16,
                            nY: -12
                        }
                    }
                ]
            }
        },
        {
            sCod: 'attack_2B_0',
            sAnimation: 'attack_2B_0',
            oList: {
                sName: 'Launcher',
                sInfo: 'Aerial invulnerable',
                sGroup: 'command'
            },
            nLevel: 4,
            oProperty: {
                bLaunch: true,
                oInvulnerable: {
                    sType: 'Aerial',
                    nStart: 9,
                    nLength: 14
                }
            },
            oGatling: {
                sCancelCod: 'attack',
                oCancel: {
                    cancel: true,
                    attack: true,
                    special: true,
                    super: true,
                    jump: true
                },
                bJumpCancellable: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: ['DN+B'],
                    bLast: true
                }
            },
            oFollowUp: {
                sCheck: 'bHit',
                sCod: 'attack_2B_1',
                sAnimation: 'attack_2B_1',
                nLevel: 2,
                oHit: {
                    oStun: {
                        sImpact: 'explode_heavy'
                    }
                },
                oProperty: {},
                oGatling: {
                    sCancelCod: 'attack',
                    oCancel: {
                        cancel: true,
                        attack: true,
                        special: true,
                        super: true,
                        jump: true
                    },
                    bJumpCancellable: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: ['DN+B'],
                        bLast: true
                    }
                }
            }
        },
        {
            sCod: 'attack_6B',
            sAnimation: 'attack_6B',
            oList: {
                sName: 'Palm',
                sGroup: 'command'
            },
            nLevel: 3,
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
                    aButtons: ['FW+B'],
                    bLast: true
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
            nLevel: 3,
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
                    aButtons: ['FW+A'],
                    bLast: true
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
            nLevel: 2,
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
            sCod: 'attack_A_0',
            sAnimation: 'attack_A_0',
            oList: {
                sName: 'Light',
                sGroup: 'normal'
            },
            nLevel: 1,
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
            },
            oFollowUp: {
                sCod: 'attack_A_1',
                sAnimation: 'attack_A_1',
                nLevel: 1,
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
        }
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)