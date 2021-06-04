# GameData.oCharacter.MJN_BUU

**Majin Buu**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_MJN_BUU.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_MJN_BUU.js)

## Properties
### GameData.oCharacter.MJN_BUU.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.MJN_BUU.sEntity = 'MJN_BUU';
```

### GameData.oCharacter.MJN_BUU.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.MJN_BUU.aColor = [
    {
        sColor: 'LSW_MJB',
        sName: 'Majin Buu',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'PNK'
    },
    {
        sColor: 'LSW_PKR',
        sName: 'Pikkoro Junia', 
        sColorName: 'Legendary Super Warrior color', 
        sEntityColor: 'ORG'
    }
];
```

### GameData.oCharacter.MJN_BUU.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.MJN_BUU.oFrames = {
    stand: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -14,
            nY: -142,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -34,
            nY: -102,
            nWidth: 76,
            nHeight: 104
        }]
    },
    blur: {
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
    backward: {
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
    forward: {
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
    jump: {
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -26,
            nY: -138,
            nWidth: 60,
            nHeight: 84
        }, {
            nX: -18,
            nY: -70,
            nWidth: 64,
            nHeight: 72
        }]
    },
    fall: {
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
    guard: {
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
    reflect: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        }
    },
    burst: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        }
    },
    hit_light: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -34,
            nY: -142,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -34,
            nY: -102,
            nWidth: 72,
            nHeight: 104
        }]
    },
    hit_heavy: {
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
    },
    hit_luncher: {
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
            nHeight: 48
        }, {
            nX: -22,
            nY: -102,
            nWidth: 64,
            nHeight: 104
        }]
    },
    hit_fall: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 92
        },
        aHurtBox: [{
            nX: -38,
            nY: -114,
            nWidth: 60,
            nHeight: 52
        }, {
            nX: -26,
            nY: -114,
            nWidth: 84,
            nHeight: 92
        }]
    },
    down: {
        oPositionBox: {
            nX: -30,
            nY: -58,
            nWidth: 60,
            nHeight: 60
        }
    },
    recovery: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        }
    },
    light_first: {
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
    light_first_active: {
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
            nX: 18,
            nY: -94,
            nWidth: 68,
            nHeight: 32
        }
    },
    light_second: {
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
            nY: -90,
            nWidth: 60,
            nHeight: 32
        }]
    },
    light_second_active: {
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
            nY: -90,
            nWidth: 60,
            nHeight: 32
        }],
        aHitBox: {
            nX: 22,
            nY: -90,
            nWidth: 60,
            nHeight: 32
        }
    },
    heavy: {
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
            nY: -94,
            nWidth: 76,
            nHeight: 44
        }]
    },
    heavy_active: {
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
            nY: -94,
            nWidth: 76,
            nHeight: 44
        }],
        aHitBox: {
            nX: 30,
            nY: -94,
            nWidth: 76,
            nHeight: 44
        }
    },
    luncher: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 22,
            nY: -154,
            nWidth: 40,
            nHeight: 84
        }, {
            nX: -30,
            nY: -134,
            nWidth: 60,
            nHeight: 136
        }]
    },
    luncher_active: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: 22,
            nY: -154,
            nWidth: 40,
            nHeight: 84
        }, {
            nX: -30,
            nY: -134,
            nWidth: 60,
            nHeight: 136
        }],
        aHitBox: {
            nX: 22,
            nY: -154,
            nWidth: 40,
            nHeight: 84
        }
    },
    tracker: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -6,
            nY: -134,
            nWidth: 60,
            nHeight: 64
        }, {
            nX: -22,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }, {
            nX: 30,
            nY: -94,
            nWidth: 68,
            nHeight: 32
        }]
    },
    tracker_second: {
        sPath: 'tracker_second.png',
        nZIndex: 30,
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
    kikoha: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
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
    super_first: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
        },
        aHurtBox: {
            nX: -34,
            nY: -146,
            nWidth: 68,
            nHeight: 148
        }
    },
    super_second: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: {
            nX: -34,
            nY: -146,
            nWidth: 68,
            nHeight: 148
        }
    },
    super_third: {
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
            nHeight: 64
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 36
        }, {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 36
        }]
    },
    tracker_1: {
        sPath: 'tracker_1.png',
        nZIndex: 30,
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -6,
            nY: -134,
            nWidth: 60,
            nHeight: 64
        }, {
            nX: 50,
            nY: -102,
            nWidth: 48,
            nHeight: 32
        }, {
            nX: -22,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }, {
            nX: 94,
            nY: -94,
            nWidth: 40,
            nHeight: 28
        }, {
            nX: 124,
            nY: -86,
            nWidth: 56,
            nHeight: 32
        }]
    },
    tracker_2: {
        sPath: 'tracker_2.png',
        nZIndex: 30,
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -6,
            nY: -134,
            nWidth: 60,
            nHeight: 64
        }, {
            nX: 198,
            nY: -106,
            nWidth: 48,
            nHeight: 32
        }, {
            nX: 50,
            nY: -102,
            nWidth: 64,
            nHeight: 32
        }, {
            nX: -22,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }, {
            nX: 110,
            nY: -94,
            nWidth: 92,
            nHeight: 32
        }]
    },
    tracker_active: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -6,
            nY: -134,
            nWidth: 60,
            nHeight: 64
        }, {
            nX: 198,
            nY: -106,
            nWidth: 48,
            nHeight: 32
        }, {
            nX: 50,
            nY: -102,
            nWidth: 64,
            nHeight: 32
        }, {
            nX: -22,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }, {
            nX: 110,
            nY: -94,
            nWidth: 92,
            nHeight: 32
        }],
        aHitBox: [{
            nX: 198,
            nY: -106,
            nWidth: 48,
            nHeight: 32
        }, {
            nX: 50,
            nY: -102,
            nWidth: 64,
            nHeight: 32
        }, {
            nX: 110,
            nY: -94,
            nWidth: 92,
            nHeight: 32
        }]
    },
    tracker_second_active: {
        sPath: 'tracker_second_active.png',
        nZIndex: 30,
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
            nWidth: 224,
            nHeight: 32
        }],
        aHitBox: {
            nX: 22,
            nY: -94,
            nWidth: 224,
            nHeight: 32
        }
    },
    tracker_second_2: {
        sPath: 'tracker_second_2.png',
        nZIndex: 30,
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
            nWidth: 224,
            nHeight: 32
        }]
    },
    tracker_second_1: {
        sPath: 'tracker_second_1.png',
        nZIndex: 30,
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
            nX: 42,
            nY: -106,
            nWidth: 52,
            nHeight: 32
        }, {
            nX: -30,
            nY: -98,
            nWidth: 56,
            nHeight: 100
        }, {
            nX: 90,
            nY: -98,
            nWidth: 40,
            nHeight: 28
        }, {
            nX: 110,
            nY: -90,
            nWidth: 56,
            nHeight: 32
        }]
    }
};
```

### GameData.oCharacter.MJN_BUU.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.MJN_BUU.oAnimations = {
    // Command
    // 4, 4, 6
    light_first: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 2,
            sFrame: 'light_first'
        },
        {
            nFrame: 4,
            sFrame: 'light_first_active'
        },
        {
            nFrame: 4,
            sFrame: 'light_first',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 4, 4, 6
    light_second: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 2,
            sFrame: 'light_second'
        },
        {
            nFrame: 4,
            sFrame: 'light_second_active'
        },
        {
            nFrame: 4,
            sFrame: 'light_second',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 6, 4, 8
    heavy: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 4,
            sFrame: 'heavy'
        },
        {
            nFrame: 4,
            sFrame: 'heavy_active'
        },
        {
            nFrame: 6,
            sFrame: 'heavy',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 8, 6, 10
    tracker: {
        oMove: {
            nLength: 2,
            nX: 8
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 2,
                sFrame: 'tracker_second',
            },
            {
                nFrame: 4,
                sFrame: 'tracker_second_1',
            },
            {
                nFrame: 4,
                sFrame: 'tracker_second_2'
            },
            {
                nFrame: 6,
                sFrame: 'tracker_second_active'
            },
            {
                nFrame: 4,
                sFrame: 'tracker_2',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'tracker_1'
            },
            {
                nFrame: 2,
                sFrame: 'tracker',
            },
            {
                nFrame: 2,
                sFrame: 'blur'
            }
        ]
    },
    tracker_second: [
        {
            nFrame: 4,
            sFrame: 'tracker_2'
        },
        {
            nFrame: 6,
            sFrame: 'tracker_active'
        },
        {
            nFrame: 4,
            sFrame: 'tracker_2',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 4,
            sFrame: 'tracker_1',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'tracker',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        }
    ],
    // 10, 8, 12
    luncher: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 6,
            sFrame: 'jump'
        },
        {
            nFrame: 2,
            sFrame: 'luncher',
            oStatus: {
                bAerialInvul: true
            }
        },
        {
            nFrame: 8,
            sFrame: 'luncher_active',
            oStatus: {
                bAerialInvul: true
            }
        },
        {
            nFrame: 4,
            sFrame: 'luncher',
            oStatus: {
                bAerialInvul: true,
                bCancel: true
            }
        },
        {
            nFrame: 6,
            sFrame: 'jump',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        }
    ],
    kikoha: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 20,
            sFrame: 'kikoha',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bCancel: true
            }
        },
    ],
    // 46, 36, 26
    super: [
        {
            nFrame: 2,
            sFrame: 'blur',
            oStatus: {
                bInvul: true
            }
        },
        {
            nFrame: 30,
            sFrame: 'super_first',
            oStatus: {
                bInvul: true
            }
        },
        {
            nFrame: 10,
            sFrame: 'super_second',
            oStatus: {
                bInvul: true
            }
        },
        {
            nFrame: 4,
            sFrame: 'super_third',
            oStatus: {
                bInvul: true
            }
        },
        {
            nFrame: 60,
            sFrame: 'super_third'
        },
        {
            nFrame: 2,
            sFrame: 'blur'
        }
    ]
};
```

### GameData.oCharacter.MJN_BUU.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.MJN_BUU.oCommands = {
    aOffense: [
        {
            aFilter: ['LSW_MJB'],
            sCod: 'super',
            sName: 'Puranetto Bāsuto',
            sAnimation: 'super',
            nCost: 12,
            nDamage: 4,
            nGatlingLevel: 3,
            sCheck: 'bGround',
            aEntity: {
                sType: 'projectile',
                sSFX: 'ADO__Beam',
                sAnimation: 'ball',
                nFrameStart: 13,
                oPosition: {
                    nX: -48,
                    nY: -256
                }
            },
            oStun: {
                nFreeze: 46,
                nBlock: 36,
                nHit: 36,
                bLunch: true,
                sHitAnimation: 'hit_heavy',
                sImpactAnimation: 'explode_heavy'
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
            
            aFilter: ['LSW_PKR'],
            sCod: 'super',
            sName: 'Makūhōidan',
            sAnimation: 'super',
            nCost: 12,
            nDamage: 4,
            nGatlingLevel: 3,
            sCheck: 'bGround',
            aEntity: {
                sType: 'projectile',
                sSFX: 'ADO__Beam',
                sAnimation: 'death',
                nFrameStart: 13,
                oPosition: {
                    nX: 0,
                    nY: -230
                }
            },
            oStun: {
                nFreeze: 46,
                nBlock: 36,
                nHit: 36,
                bLunch: true,
                sHitAnimation: 'hit_heavy',
                sImpactAnimation: 'explode_heavy'
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
            sCod: 'kikoha',
            sName: 'Kikoha',
            sAnimation: 'kikoha',
            nCost: 4,
            nGatlingLevel: 2,
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
                sHitAnimation: 'hit_light',
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
            sCod: 'luncher',
            sName: 'Luncher',
            sAnimation: 'luncher',
            nGatlingLevel: 1,
            sCheck: 'bGround',
            bJumpCancellable: true,
            oStun: {
                nBlock: 12,
                nHit: 22,
                bLunch: true,
                sHitAnimation: 'hit_luncher'
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
            sCod: 'tracker',
            sName: 'Tracker',
            sAnimation: 'tracker',
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {
                nBlock: 12,
                nHit: 18,
                sHitAnimation: 'hit_heavy'
            },
            oPushback: {},
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 1,
                aButtons: [
                    { FW: false, A: true }
                ]
            },
            oFollowUp: {
                sCod: 'tracker_second',
                sName: '2nd',
                sAnimation: 'tracker_second',
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 24,
                    sHitAnimation: 'hit_light'
                },
                oPushback: {
                    nLength: 16,
                    nX: 128
                },
                bLast: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: [
                        { A: true }
                    ]
                }
            },
        },
        {
            sCod: 'heavy',
            sName: 'Heavy',
            sAnimation: 'heavy',
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {
                nBlock: 10,
                nHit: 18,
                sHitAnimation: 'hit_heavy'
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
            sCod: 'light_first',
            sName: 'Light',
            sAnimation: 'light_first',
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oFollowUp: {
                sCod: 'light_second',
                sName: '2nd',
                sAnimation: 'light_second',
                nGatlingLevel: 1,
                sCheck: 'bGround',
                oStun: {
                    nBlock: 12,
                    nHit: 13,
                    sHitAnimation: 'hit_light'
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
                sHitAnimation: 'hit_light'
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