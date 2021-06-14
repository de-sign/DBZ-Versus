# GameData.oCharacter.BJT

**Bejīta**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_BJT.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_BJT.js)

## Properties
### GameData.oCharacter.BJT.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.BJT.sEntity = 'BJT';
```

### GameData.oCharacter.BJT.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.BJT.aColor = [
    {
        sName: 'Bejīta SSJ',
        sColor: 'LSW_SSJ',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'ORG'
    },
    {
        sName: 'Bejīta',
        sColor: 'LSW_BAD',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'PRP'
    }
];
```

### GameData.oCharacter.BJT.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.BJT.oFrames = {

    list_0: false,
    list_1: false,
    list_2: false,
    list_3: false,

    stand_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -134,
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
            nX: -26,
            nY: -138,
            nWidth: 96,
            nHeight: 52
        }, {
            nX: -34,
            nY: -106,
            nWidth: 68,
            nHeight: 108
        }]
    },
    attack_2_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHitBox: {
            nX: 26,
            nY: -138,
            nWidth: 44,
            nHeight: 52
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 96,
            nHeight: 52
        }, {
            nX: -34,
            nY: -106,
            nWidth: 68,
            nHeight: 108
        }]
    },
    attack_2_2: {
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
    attack_2_3: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHitBox: {
            nX: 22,
            nY: -94,
            nWidth: 64,
            nHeight: 32
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
    attack_2_4: {
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
            nHeight: 32
        }, {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 32
        }]
    },
    attack_2_5: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHitBox: {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 32
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
            nHeight: 32
        }, {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 32
        }]
    },
    
    attack_3_0: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -50,
            nY: -130,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -34,
            nY: -98,
            nWidth: 76,
            nHeight: 100
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
    attack_3_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
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

    attack_4_0: false,
    attack_4_1: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 42,
            nY: -162,
            nWidth: 48,
            nHeight: 44
        }, {
            nX: 22,
            nY: -130,
            nWidth: 44,
            nHeight: 64
        }, {
            nX: -54,
            nY: -106,
            nWidth: 56,
            nHeight: 64
        }, {
            nX: -2,
            nY: -106,
            nWidth: 40,
            nHeight: 108
        }]
    },
    attack_4_2: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHitBox: [{
            nX: 42,
            nY: -162,
            nWidth: 48,
            nHeight: 44
        }, {
            nX: 22,
            nY: -130,
            nWidth: 44,
            nHeight: 64
        }],
        aHurtBox: [{
            nX: 42,
            nY: -162,
            nWidth: 48,
            nHeight: 44
        }, {
            nX: 22,
            nY: -130,
            nWidth: 44,
            nHeight: 64
        }, {
            nX: -54,
            nY: -106,
            nWidth: 56,
            nHeight: 64
        }, {
            nX: -2,
            nY: -106,
            nWidth: 40,
            nHeight: 108
        }]
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
        aHitBox: {
            nX: 46,
            nY: -98,
            nWidth: 52,
            nHeight: 40
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
    attack_5_3: false,
    
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
        },
        aHurtBox: [{
            nX: -38,
            nY: -138,
            nWidth: 68,
            nHeight: 140
        }, {
            nX: -38,
            nY: -118,
            nWidth: 68,
            nHeight: 40
        }]
    },
    ki_1_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -38,
            nY: -138,
            nWidth: 68,
            nHeight: 140
        }, {
            nX: -38,
            nY: -118,
            nWidth: 68,
            nHeight: 40
        }]
    }
};
```

### GameData.oCharacter.BJT.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.BJT.oAnimations = {
    // Command
    // 4, 4, 6
    attack_A_0: {
        oMove: {
            nDelay: 2,
            nLength: 4,
            nX: 24
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
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
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },
    // 4, 4, 6
    attack_A_1: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
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
            sFrame: 'stand_1',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 4, 4, 6
    attack_A_2: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 2,
            sFrame: 'attack_2_4'
        },
        {
            nFrame: 4,
            sFrame: 'attack_2_5'
        },
        {
            nFrame: 4,
            sFrame: 'attack_2_4',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bCancel: true
            }
        }
    ],

    // 6, 4, 8
    attack_B: {
        oMove: {
            nDelay: 2,
            nLength: 4,
            nX: -24
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 4,
                sFrame: 'attack_3_0',
            },
            {
                nFrame: 4,
                sFrame: 'attack_3_2'
            },
            {
                nFrame: 6,
                sFrame: 'attack_3_1',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },
    // 8, 6, 10
    attack_6A: {
        oMove: {
            nDelay: 2,
            nLength: 12,
            nX: 96
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_0',
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_1',
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
                sFrame: 'attack_5_3',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },
    // 10, 8, 12
    attack_2B: [
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
            sFrame: 'attack_4_1',
            oStatus: {
                bAerialInvul: true
            }
        },
        {
            nFrame: 8,
            sFrame: 'attack_4_2',
            oStatus: {
                bAerialInvul: true
            }
        },
        {
            nFrame: 4,
            sFrame: 'attack_4_1',
            oStatus: {
                bAerialInvul: true,
                bCancel: true
            }
        },
        {
            nFrame: 6,
            sFrame: 'attack_4_0',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bCancel: true
            }
        }
    ],
    
    attack_C: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 20,
            sFrame: 'ki_0_0',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bCancel: true
            }
        },
    ],
    // Final Flash / Garric Canon
    // 46, 36, 26
    attack_236C: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bInvul: true
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
            nFrame: 40,
            sFrame: 'ki_1_2'
        },
        {
            nFrame: 20,
            sFrame: 'ki_1_1'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],

    // List
    list_236C: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 30,
            sFrame: 'ki_1_0'
        },
        {
            nFrame: 10,
            sFrame: 'ki_1_1'
        },
        {
            nFrame: 2,
            sFrame: 'list_0'
        },
        {
            nFrame: 2,
            sFrame: 'list_1'
        },
        {
            nFrame: 2,
            sFrame: 'list_2'
        },
        {
            nFrame: 32,
            sFrame: 'list_3'
        },
        {
            nFrame: 2,
            sFrame: 'list_2'
        },
        {
            nFrame: 2,
            sFrame: 'list_1'
        },
        {
            nFrame: 2,
            sFrame: 'list_0'
        },
        {
            nFrame: 20,
            sFrame: 'ki_1_1'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
    ]
};
```

### GameData.oCharacter.BJT.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.BJT.oCommands = {
    aOffense: [
        {
            aFilter: ['LSW_SSJ'],
            sCod: 'attack_236C',
            sName: 'Fainaru Furasshu',
            sAnimation: 'attack_236C',
            sListAnimation: 'list_236C',
            nCost: 12,
            nDamage: 300,
            nGatlingLevel: 3,
            sCheck: 'bGround',
            aEntity: {
                sType: 'beam',
                sSFX: 'ADO__Beam',
                sAnimation: 'big_triangle',
                nFrameStart: 43,
                bLink: true,
                oPosition: {
                    nX: -32,
                    nY: -12
                }
            },
            oStun: {
                nFreeze: 46,
                nBlock: 36,
                nHit: 36,
                bLaunch: true,
                sHitAnimation: 'hit_1'
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
            aFilter: ['LSW_BAD'],
            sCod: 'attack_236C',
            sName: 'Gyarikku-hō',
            sAnimation: 'attack_236C',
            sListAnimation: 'list_236C',
            nCost: 12,
            nDamage: 300,
            nGatlingLevel: 3,
            sCheck: 'bGround',
            aEntity: {
                sType: 'beam',
                sSFX: 'ADO__Beam',
                sAnimation: 'triangle',
                nFrameStart: 43,
                bLink: true,
                oPosition: {
                    nX: -12,
                    nY: -12
                }
            },
            oStun: {
                nFreeze: 46,
                nBlock: 36,
                nHit: 36,
                bLaunch: true,
                sHitAnimation: 'hit_1'
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
            sCod: 'attack_C',
            sName: 'Kikoha',
            sAnimation: 'attack_C',
            nCost: 4,
            nGatlingLevel: 2,
            nDamage: 100,
            sCheck: 'bGround',
            aEntity: {
                sType: 'projectile',
                sSFX: 'ADO__Projectile',
                sAnimation: 'kikoha',
                nFrameStart: 10,
                oPosition: {
                    nX: 58,
                    nY: -28
                }
            },
            oStun: {
                nBlock: 12,
                nHit: 16,
                sHitAnimation: 'hit_0',
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
            sCod: 'attack_2B',
            sName: 'Launcher',
            sAnimation: 'attack_2B',
            nDamage: 100,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            bJumpCancellable: true,
            oStun: {
                nBlock: 12,
                nHit: 22,
                bLaunch: true,
                sHitAnimation: 'hit_2'
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
            sCod: 'attack_6A',
            sName: 'Tracker',
            sAnimation: 'attack_6A',
            nDamage: 75,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {
                nBlock: 12,
                nHit: 18,
                sHitAnimation: 'hit_1'
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
            sCod: 'attack_B',
            sName: 'Heavy',
            sAnimation: 'attack_B',
            nDamage: 50,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {
                nBlock: 10,
                nHit: 16,
                sHitAnimation: 'hit_1'
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
            sCod: 'attack_A_0',
            sName: 'Light',
            sAnimation: 'attack_A_0',
            nDamage: 25,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {
                nBlock: 12,
                nHit: 13,
                sHitAnimation: 'hit_0'
            },
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 1,
                aButtons: [
                    { A: true }
                ]
            },
            oFollowUp: {
                sCod: 'attack_A_1',
                sName: '2nd',
                sAnimation: 'attack_A_1',
                nDamage: 25,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 13,
                    sHitAnimation: 'hit_0'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { A: true }
                    ]
                },
                oFollowUp: {
                    sCod: 'attack_A_2',
                    sName: '3rd',
                    sAnimation: 'attack_A_2',
                    nDamage: 25,
                    nGatlingLevel: 1,
                    sCheck: 'bGround',
                    oStun: {
                        nBlock: 12,
                        nHit: 13,
                        sHitAnimation: 'hit_0'
                    },
                    bLast: true,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { A: true }
                        ]
                    }
                }
            }
        }
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)