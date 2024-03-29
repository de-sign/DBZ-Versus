# GameData.oCharacter.KID_GHN

**GohanS SSJT**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_KID_GHN.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_KID_GHN.js)

## Properties
### GameData.oCharacter.KID_GHN.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.KID_GHN.sEntity = 'KID_GHN';
```

### GameData.oCharacter.KID_GHN.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.KID_GHN.aColor = [
    {
        sName: 'Gohan SSJT',
        sColor: 'LSW_SSJT',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'BLU'
    },
    {
        sName: 'Gohan',
        sColor: 'LSW_TRN',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'ORG',
    }
];
```

### GameData.oCharacter.KID_GHN.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.KID_GHN.oFrames = {
    
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
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
        }]
    },
    attack_0_2: {
        aHitBox: [{
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        }],
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
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
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -130,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
        }, {
            nX: 22,
            nY: -86,
            nWidth: 60,
            nHeight: 28
        }]
    },
    attack_2_1: {
        aHitBox: {
            nX: 22,
            nY: -86,
            nWidth: 60,
            nHeight: 28
        },
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -130,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
        }, {
            nX: 22,
            nY: -86,
            nWidth: 60,
            nHeight: 28
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
            nY: -130,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
        }, {
            nX: 22,
            nY: -94,
            nWidth: 64,
            nHeight: 32
        }]
    },
    attack_2_3: {
        aHitBox: {
            nX: 22,
            nY: -94,
            nWidth: 64,
            nHeight: 32
        },
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -130,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
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
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -130,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: 22,
            nY: -114,
            nWidth: 44,
            nHeight: 44
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
        }]
    },
    attack_2_5: {
        aHitBox: {
            nX: 22,
            nY: -114,
            nWidth: 44,
            nHeight: 44
        },
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -130,
            nWidth: 60,
            nHeight: 60
        }, {
            nX: 22,
            nY: -114,
            nWidth: 44,
            nHeight: 44
        }, {
            nX: -30,
            nY: -94,
            nWidth: 56,
            nHeight: 96
        }]
    },

    attack_3_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 52
        }, {
            nX: -14,
            nY: -106,
            nWidth: 48,
            nHeight: 108
        }, {
            nX: 30,
            nY: -90,
            nWidth: 76,
            nHeight: 44
        }]
    },
    attack_3_1: {
        aHitBox: {
            nX: 30,
            nY: -90,
            nWidth: 76,
            nHeight: 44
        },
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 52
        }, {
            nX: -14,
            nY: -106,
            nWidth: 48,
            nHeight: 108
        }, {
            nX: 30,
            nY: -90,
            nWidth: 76,
            nHeight: 44
        }]
    },

    attack_4_0: false,
    attack_4_1: {
        nZIndex: 30,
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 26,
            nY: -150,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -130,
            nWidth: 60,
            nHeight: 132
        }]
    },
    attack_4_2: {
        nZIndex: 30,
        aHitBox: {
            nX: 26,
            nY: -150,
            nWidth: 36,
            nHeight: 80
        },
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 26,
            nY: -150,
            nWidth: 36,
            nHeight: 80
        }, {
            nX: -22,
            nY: -130,
            nWidth: 60,
            nHeight: 132
        }]
    },
    attack_4_3: false,
    
    attack_5_0: {
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
    attack_5_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
        }]
    },
    attack_5_2: {
        aHitBox: {
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        },
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -90,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
        }]
    },
    attack_5_3: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -114,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: 22,
            nY: -78,
            nWidth: 72,
            nHeight: 36
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
        }]
    },
    attack_5_4: {
        aHitBox: [{
            nX: 22,
            nY: -114,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: 22,
            nY: -78,
            nWidth: 72,
            nHeight: 36
        }],
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -130,
            nWidth: 60,
            nHeight: 76
        }, {
            nX: 22,
            nY: -114,
            nWidth: 68,
            nHeight: 40
        }, {
            nX: 22,
            nY: -78,
            nWidth: 72,
            nHeight: 36
        }, {
            nX: -10,
            nY: -58,
            nWidth: 44,
            nHeight: 60
        }]
    },
    attack_5_5: {
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -146,
            nWidth: 56,
            nHeight: 60
        }, {
            nX: -26,
            nY: -102,
            nWidth: 64,
            nHeight: 104
        }]
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
            nY: -102,
            nWidth: 64,
            nHeight: 36
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
            nX: -10,
            nY: -126,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -106,
            nWidth: 96,
            nHeight: 64
        }, {
            nX: -38,
            nY: -54,
            nWidth: 84,
            nHeight: 56
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
            nY: -126,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -106,
            nWidth: 96,
            nHeight: 64
        }, {
            nX: -38,
            nY: -54,
            nWidth: 84,
            nHeight: 56
        }]
    }
};
```

### GameData.oCharacter.KID_GHN.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.KID_GHN.oAnimations = {
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
            sFrame: 'attack_2_2'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 4, 4, 6
    attack_A_2: {
        uMove: {
            nDelay: 2,
            nLength: 4,
            nX: 48
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
                sFrame: 'attack_2_4'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_5'
            },
            {
                nFrame: 4,
                sFrame: 'attack_2_4'
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
    // 10, 6, 8
    attack_6A_0: {
        uMove: {
            nDelay: 8,
            nLength: 12,
            nX: 160
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
                nFrame: 6,
                sFrame: 'attack_5_0'
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_1',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_5_2',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_1',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_5'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },
    // 10, 6, 8
    attack_6A_1: {
        uMove: {
            nDelay: 8,
            nLength: 12,
            nX: 160
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
                nFrame: 6,
                sFrame: 'attack_5_0'
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_1',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'attack_5_2',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_1',
                oStatus: {
                    bThrough: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'attack_5_5'
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
    
    attack_C: [
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oStatus: {
                bReverse: true
            }
        },
        {
            nFrame: 8,
            sFrame: 'ki_0_0'
        },
        {
            nFrame: 12,
            sFrame: 'ki_0_0',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
    ],
    
    // Kameha
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

### GameData.oCharacter.KID_GHN.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.KID_GHN.oCommands = {
    aGround: [
        {
            aFilter: ['LSW_SSJT'],
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Oyako Kamehameha',
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
                        sText: '親子',
                        nFrameStart: 1
                    },
                    {
                        sType: 'Text',
                        sText: '親子かめ',
                        nFrameStart: 22
                    },
                    {
                        sType: 'Text',
                        sText: '親子かめはめ波',
                        nFrameStart: 43,
                        nLength: 36
                    },
                    {
                        sType: 'Beam',
                        sSFX: 'ADO__Beam',
                        sAnimation: 'circle',
                        nFrameStart: 43,
                        bLink: true,
                        oPosition: {
                            nX: -4,
                            nY: 12
                        }
                    },
                    {
                        sType: 'Character',
                        sEntity: 'GKU_SSJ',
                        sColor: 'LSW_SSJ',
                        sAnimation: 'anim_GHN_SSJT',
                        nFrameStart: 13,
                        bLink: true,
                        oPosition: {
                            nX: -52,
                            nY: 0
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
            aFilter: ['LSW_TRN'],
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Masenko',
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
                        sAnimation: 'triangle',
                        nFrameStart: 43,
                        bLink: true,
                        oPosition: {
                            nX: -8,
                            nY: 8
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
                sName: 'Kikoha',
                sGroup: 'ki'
            },
            nLevel: 5,
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
                        sText: '気功波',
                        nLength: 40,
                        nFrameStart: 1
                    },
                    {
                        sType: 'Projectile',
                        sSFX: 'ADO__Projectile',
                        sAnimation: 'kikoha',
                        nFrameStart: 10,
                        oPosition: {
                            nX: 58,
                            nY: -24
                        }
                    }
                ]
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
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: ['DN+B'],
                    bLast: true
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
            nLevel: 3,
            oHit: {
                oPushback: false
            },
            oGuard: {
                oPushback: false
            },
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
            },
            oFollowUp: {
                sCheck: true,
                sCod: 'attack_6A_1',
                sAnimation: 'attack_6A_1',
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
                        aButtons: ['FW+A'],
                        bLast: true
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
                },
                oFollowUp: {
                    sCod: 'attack_A_2',
                    sAnimation: 'attack_A_2',
                    nLevel: 2,
                    oHit: {
                        oStun: {
                            sAnimation: 'hit_0'
                        }
                    },
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
        }
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)