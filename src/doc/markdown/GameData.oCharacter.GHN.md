# GameData.oCharacter.GHN

**Gohan SNS**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_GHN.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_GHN.js)

## Properties
### GameData.oCharacter.GHN.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.GHN.sEntity = 'GHN';
```

### GameData.oCharacter.GHN.sEntityColor

Couleur utilisée pour les projectiles, rayons, etc. 

```javascript
GameData.oCharacter.GHN.sEntityColor = 'ORG';
```

### GameData.oCharacter.GHN.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.GHN.aColor = [
    {
        sName: 'Gohan SNS',
        sColor: 'LSW_SNS',
        sColorName: 'Legendary Super Warrior color'
    },
    {
        sName: 'Gohan SSJ',
        sColor: 'LSW_SSJ',
        sColorName: 'Legendary Super Warrior color'
    }
];
```

### GameData.oCharacter.GHN.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.GHN.oFrames = {

    list_0: false,
    list_1: false,
    list_2: false,

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

    attack_0_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 76
        },
        aHurtBox: [{
            nX: -30,
            nY: -142,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 26,
            nY: -122,
            nWidth: 80,
            nHeight: 72
        }, {
            nX: 26,
            nY: -86,
            nWidth: 80,
            nHeight: 36
        }, {
            nX: -10,
            nY: -70,
            nWidth: 44,
            nHeight: 64
        }]
    },
    attack_0_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 76
        },
        aHurtBox: [{
            nX: -30,
            nY: -142,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 26,
            nY: -122,
            nWidth: 80,
            nHeight: 72
        }, {
            nX: 26,
            nY: -86,
            nWidth: 80,
            nHeight: 36
        }, {
            nX: -10,
            nY: -70,
            nWidth: 44,
            nHeight: 64
        }],
        aHitBox: [{
            nX: 26,
            nY: -122,
            nWidth: 80,
            nHeight: 72
        }, {
            nX: 26,
            nY: -86,
            nWidth: 80,
            nHeight: 36
        }]
    },
    attack_0_3: {
        nZIndex: 30,
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 76
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
            nY: -94,
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
            nY: -94,
            nWidth: 60,
            nHeight: 32
        }],
        aHitBox: {
            nX: 18,
            nY: -94,
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
            nY: -98,
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

    attack_4_0: {
        nZIndex: 30,
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
    attack_4_1: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -146,
            nWidth: 60,
            nHeight: 148
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
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -146,
            nWidth: 60,
            nHeight: 148
        }],
        aHitBox: {
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }
    },
    attack_4_3: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -146,
            nWidth: 60,
            nHeight: 148
        }]
    },
    attack_4_4: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -146,
            nWidth: 60,
            nHeight: 148
        }],
        aHitBox: {
            nX: 34,
            nY: -170,
            nWidth: 36,
            nHeight: 80
        }
    },
    attack_4_5: {
        nZIndex: 30,
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

    attack_5_0: false,
    attack_5_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -138,
            nWidth: 60,
            nHeight: 52
        }, {
            nX: 18,
            nY: -122,
            nWidth: 56,
            nHeight: 56
        }, {
            nX: -26,
            nY: -110,
            nWidth: 64,
            nHeight: 112
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
            nX: -14,
            nY: -138,
            nWidth: 60,
            nHeight: 52
        }, {
            nX: 18,
            nY: -122,
            nWidth: 56,
            nHeight: 56
        }, {
            nX: -26,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        }],
        aHitBox: {
            nX: 18,
            nY: -122,
            nWidth: 56,
            nHeight: 56
        }
    },
    attack_5_3: {
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
    attack_5_4: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: 18,
            nY: -122,
            nWidth: 20,
            nHeight: 40
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }]
    },
    attack_5_5: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: 18,
            nY: -122,
            nWidth: 20,
            nHeight: 40
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }],
        aHitBox: {
            nX: 18,
            nY: -122,
            nWidth: 48,
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
            nY: -146,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: 22,
            nY: -122,
            nWidth: 56,
            nHeight: 40
        }, {
            nX: -30,
            nY: -98,
            nWidth: 64,
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
            nX: -10,
            nY: -134,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -114,
            nWidth: 104,
            nHeight: 44
        }, {
            nX: -38,
            nY: -74,
            nWidth: 68,
            nHeight: 76
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
            nX: -10,
            nY: -134,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -114,
            nWidth: 104,
            nHeight: 44
        }, {
            nX: -38,
            nY: -74,
            nWidth: 68,
            nHeight: 76
        }]
    }
};
```

### GameData.oCharacter.GHN.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.GHN.oAnimations = {
    attack_jA: {
        sType: 'action',
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 2,
                sFrame: 'attack_0_3'
            },
            {
                nFrame: 2,
                sFrame: 'attack_0_1'
            },
            {
                nFrame: 4,
                sFrame: 'attack_0_2'
            },
            {
                nFrame: 2,
                sFrame: 'attack_0_1',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'attack_0_3',
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
    attack_A_0: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
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
    ],
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
    // 6, 4, 8
    attack_B: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
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
            sFrame: 'stand_1',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 8, 6, 10
    attack_6A_0: {
        uMove: {
            nDelay: 2,
            nLength: 8,
            nX: 72
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_0'
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
                sFrame: 'attack_5_0',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_0',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },
    // 8, 6, 10
    attack_6A_1: {
        uMove: {
            nDelay: 2,
            nLength: 4,
            nX: 24
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_0',
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_3',
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_4'
            },
            {
                nFrame: 6,
                sFrame: 'attack_5_5'
            },
            {
                nFrame: 8,
                sFrame: 'attack_5_4',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_0',
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
            sFrame: 'attack_4_3',
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
    attack_2B_0: {
        uMove: {
            nDelay: 6,
            nLength: 8,
            nX: 48
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 4,
                sFrame: 'move_1'
            },
            {
                nFrame: 2,
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
                nFrame: 6,
                sFrame: 'attack_4_2',
                oStatus: {
                    bAerialInvul: true
                }
            },
            {
                nFrame: 6,
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
            },
        ]
    },
    attack_2B_1: {
        uMove: {
            nLength: 22,
            nMove: 12,
            nY: -120,
            nX: 80
        },
        aFrames: [
            {
                nFrame: 4,
                sFrame: 'attack_4_3',
                oStatus: {
                    bAerial: true
                }
            },
            {
                nFrame: 10,
                sFrame: 'attack_4_4'
            },
            {
                nFrame: 2,
                sFrame: 'attack_4_3',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_4_5',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },

    attack_C: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 28,
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

    // Masenko
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
    ]
};
```

### GameData.oCharacter.GHN.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.GHN.oCommands = {
    aGround: [
        {
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Masenko',
                sGroup: 'ki',
                sAnimation: 'list_236C'
            },
            oProperty: {
                bLaunch: true
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
                        sText: '魔',
                        nFrameStart: 1
                    },
                    {
                        sType: 'Text',
                        sText: '魔閃',
                        nFrameStart: 22
                    },
                    {
                        sType: 'Text',
                        sText: '魔閃光',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'Beam',
                        sSFX: 'ADO__Beam',
                        sText: '魔閃光',
                        sAnimation: 'triangle',
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
                    sAnimation: 'hit_1',
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
                sName: 'Kiai',
                sGroup: 'ki'
            },
            oProperty: {},
            oGatling: {
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
                        sType: 'Text',
                        sText: '気合い',
                        nLength: 40,
                        nFrameStart: 1
                    },
                    {
                        sType: 'Effect',
                        sAnimation: 'impact_hit',
                        oPosition: {
                            nX: 78,
                            nY: -16
                        },
                        bReverse: false,
                        nFrameStart: 13
                    },
                    {
                        sType: 'Beam',
                        sSFX: 'ADO__Projectile',
                        sAnimation: 'kiai',
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
                    sAnimation: 'hit_1',
                    sImpact: false
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
            sCod: 'attack_2B_0',
            sAnimation: 'attack_2B_0',
            oList: {
                sName: 'Ryushoken',
                sInfo: 'Aerial invulnerable',
                sGroup: 'command'
            },
            oProperty: {
                bLaunch: true
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
            },
            oFollowUp: {
                sCheck: true,
                sCod: 'attack_2B_1',
                sAnimation: 'attack_2B_1',
                oProperty: {
                    bLaunch: true
                },
                oGatling: {
                    nLevel: 1,
                    oManipulation: {
                        nMaxLengthFrame: 1,
                        aButtons: [
                            { DN: false, B: true }
                        ],
                        bLast: true
                    },
                    aEntity: [
                        {
                            sType: 'Text',
                            sText: '龍翔拳',
                            nLength: 40,
                            nFrameStart: 1
                        }
                    ]
                },
                oHit: {
                    oDamage: {
                        nDamage: 50
                    },
                    oStun: {
                        nStun: 6,
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
            }
        },
        {
            sCod: 'attack_6A_0',
            sAnimation: 'attack_6A_0',
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
                    sAnimation: 'defense_4'
                }
            },
            oFollowUp: {
                sCheck: true,
                sCod: 'attack_6A_1',
                sAnimation: 'attack_6A_1',
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
                        nDamage: 50
                    },
                    oStun: {
                        nStun: 20,
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
                }
            }
        }
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)