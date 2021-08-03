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

    attack_4_0: false,
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
        oMove: {
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
        oMove: {
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
    aOffense: [
        // GHS
        {
            sCod: 'attack_236C',
            oList: {
                sName: 'Masenko',
                sGroup: 'ki',
                sAnimation: 'list_236C'
            },

            sAnimation: 'attack_236C',
            nCost: 30,
            nDamage: 300,
            nMinimumReduce: 40,
            nGatlingLevel: 3,
            sCheck: 'bGround',
            oFreeze: {
                bInfo: true,
                nLength: 45
            },
            aEntity: [
                {
                    sType: 'text',
                    sText: '魔',
                    nFrameStart: 1
                },
                {
                    sType: 'text',
                    sText: '魔閃',
                    nFrameStart: 22
                },
                {
                    sType: 'text',
                    sText: '魔閃光',
                    nFrameStart: 43,
                    nLength: 36
                },
                {
                    sType: 'beam',
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
            ],
            oStun: {
                nBlock: 36,
                nHit: 36,
                bLaunch: true,
                sHitAnimation: 'hit_1',
                sImpactText: 'ブーム'
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
            oList: {
                sName: 'Kikoha',
                sGroup: 'ki'
            },

            sAnimation: 'attack_C',
            nCost: 10,
            nGatlingLevel: 2,
            nDamage: 100,
            sCheck: 'bGround',
            aEntity:  [
                {
                    sType: 'text',
                    sText: '気功波',
                    nLength: 40,
                    nFrameStart: 1
                },
                {
                    sType: 'projectile',
                    sSFX: 'ADO__Projectile',
                    sAnimation: 'kikoha',
                    nFrameStart: 10,
                    oPosition: {
                        nX: 58,
                        nY: -28
                    }
                }
            ],
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
            oList: {
                sName: 'Launcher',
                sInfo: 'Aerial invulnerable',
                sGroup: 'command'
            },

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
            sCod: 'attack_6A_0',
            oList: {
                sName: 'Tracker',
                sGroup: 'command'
            },

            sAnimation: 'attack_6A_0',
            nDamage: 75,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oFollowUp: {
                sCod: 'attack_6A_1',
                sAnimation: 'attack_6A_1',
                bFollowOnlyOnHurt: true,
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 18,
                    sHitAnimation: 'hit_0'
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { A: true }
                    ]
                }
            },
            oStun: {
                nBlock: 12,
                nHit: 18,
                sHitAnimation: 'hit_1'
            },
            oPushback: {
                nLength: 4,
                nX: -36
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
            oList: {
                sName: 'Heavy',
                sGroup: 'normal'
            },

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
            oList: {
                sName: 'Light',
                sGroup: 'normal'
            },

            sAnimation: 'attack_A_0',
            nDamage: 25,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oFollowUp: {
                sCod: 'attack_A_1',
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
                }
            },
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
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)