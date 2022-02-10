# GameData.oCharacter.SRU

**Perfect Seru**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_SRU.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_SRU.js)

## Properties
### GameData.oCharacter.SRU.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.SRU.sEntity = 'SRU';
```

### GameData.oCharacter.SRU.sEntityColor

Couleur utilisée pour les projectiles, rayons, etc. 

```javascript
GameData.oCharacter.SRU.sEntityColor = 'BLU';
```

### GameData.oCharacter.SRU.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.SRU.aColor = [
    {
        sName: 'Perfect Seru',
        sColor: 'LSW_PFC',
        sColorName: 'Legendary Super Warrior color'
    },
    {
        sName: 'Seru',
        sColor: 'LSW_SRU',
        sColorName: 'Legendary Super Warrior color'
    }
];
```

### GameData.oCharacter.SRU.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.SRU.oFrames = {

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
            nHeight: 32
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
            nHeight: 32
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
            nX: -14,
            nY: -110,
            nWidth: 48,
            nHeight: 112
        }, {
            nX: 30,
            nY: -102,
            nWidth: 76,
            nHeight: 40
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
            nX: -14,
            nY: -110,
            nWidth: 48,
            nHeight: 112
        }, {
            nX: 30,
            nY: -102,
            nWidth: 76,
            nHeight: 40
        }],
        aHitBox: {
            nX: 30,
            nY: -102,
            nWidth: 76,
            nHeight: 40
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
            nY: -166,
            nWidth: 44,
            nHeight: 104
        }, {
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 140
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
            nY: -166,
            nWidth: 44,
            nHeight: 104
        }, {
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 140
        }],
        aHitBox: {
            nX: 22,
            nY: -166,
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
            nX: -38,
            nY: -146,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -26,
            nY: -98,
            nWidth: 52,
            nHeight: 100
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
            nX: -38,
            nY: -146,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -26,
            nY: -98,
            nWidth: 52,
            nHeight: 100
        }],
        aHitBox: {
            nX: -14,
            nY: -38,
            nWidth: 52,
            nHeight: 40
        }
    },
    attack_5_3: false,

    attack_6_0: false,
    attack_6_1: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: {
            nX: -14,
            nY: -126,
            nWidth: 72,
            nHeight: 112
        }
    },
    attack_6_2: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: {
            nX: -14,
            nY: -126,
            nWidth: 72,
            nHeight: 112
        },
        aHitBox: {
            nX: 6,
            nY: -102,
            nWidth: 56,
            nHeight: 84
        }
    },
    attack_6_3: false,

    ki_0_0: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -154,
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
            nY: -154,
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
        aHurtBox: [{
            nX: -10,
            nY: -138,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -118,
            nWidth: 104,
            nHeight: 64
        }, {
            nX: -38,
            nY: -58,
            nWidth: 84,
            nHeight: 60
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
            nY: -138,
            nWidth: 60,
            nHeight: 56
        }, {
            nX: -22,
            nY: -118,
            nWidth: 104,
            nHeight: 64
        }, {
            nX: -38,
            nY: -58,
            nWidth: 84,
            nHeight: 60
        }]
    }
};
```

### GameData.oCharacter.SRU.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.SRU.oAnimations = {
    // Command
    // 4, 3, 7
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
            nFrame: 3,
            sFrame: 'attack_2_1'
        },
        {
            nFrame: 5,
            sFrame: 'attack_2_0'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 4, 3, 7
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
            nFrame: 3,
            sFrame: 'attack_2_3'
        },
        {
            nFrame: 5,
            sFrame: 'attack_2_2'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 6, 3, 11
    attack_B: {
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
                sFrame: 'attack_3_0'
            },
            {
                nFrame: 3,
                sFrame: 'attack_3_1'
            },
            {
                nFrame: 9,
                sFrame: 'attack_3_0'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

    // 9, 4, 13
    attack_2A: {
        uMove: {
            nDelay: 2,
            nLength: 12,
            nX: 128
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
                nFrame: 3,
                sFrame: 'attack_5_0',
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_1',
            },
            {
                nFrame: 4,
                sFrame: 'attack_5_2'
            },
            {
                nFrame: 8,
                sFrame: 'attack_5_1'
            },
            {
                nFrame: 3,
                sFrame: 'attack_5_0'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

    // 9, 4, 15
    attack_6B: {
        
        uMove: {
            nDelay: 2,
            nLength: 6,
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
                nFrame: 3,
                sFrame: 'attack_6_0',
            },
            {
                nFrame: 4,
                sFrame: 'attack_6_1',
            },
            {
                nFrame: 4,
                sFrame: 'attack_6_2'
            },
            {
                nFrame: 10,
                sFrame: 'attack_6_1'
            },
            {
                nFrame: 3,
                sFrame: 'attack_6_3'
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },
    // 10, 6, 17
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
            nFrame: 6,
            sFrame: 'attack_4_2'
        },
        {
            nFrame: 11,
            sFrame: 'attack_4_1'
        },
        {
            nFrame: 4,
            sFrame: 'attack_4_3'
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
        },
    ]
};
```

### GameData.oCharacter.SRU.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.SRU.oCommands = {
    aGround: [
        {
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Taiyokei Hakai K.',
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
                        sText: '太陽系破',
                        nFrameStart: 1
                    },
                    {
                        sType: 'Text',
                        sText: '太陽系破壊かめ',
                        nFrameStart: 22
                    },
                    {
                        sType: 'Text',
                        sText: '太陽系破壊かめはめ波',
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
                            nX: 0,
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
            sCod: 'attack_C',
            sAnimation: 'attack_C',
            oList: {
                sName: 'Desubīmu',
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
                    nStart: 1,
                    nLength: 16
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
            sCod: 'attack_6B',
            sAnimation: 'attack_6B',
            oList: {
                sName: 'Shoulder dash',
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
            sAnimation: 'attack_2A',
            oList: {
                sName: 'Slide',
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
                    aButtons: ['DN+A'],
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