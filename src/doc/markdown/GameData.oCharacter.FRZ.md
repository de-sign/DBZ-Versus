# GameData.oCharacter.FRZ

**Furīza**  


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
        sName: 'Furīza',
        sColor: 'LSW_FRZ',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'PRP'
    },
    {
        sName: 'Metaru Kūra',
        sColor: 'CTM_MKR',
        sColorName: 'Custom color',
        sEntityColor: 'ORG'
    }
];
```

### GameData.oCharacter.FRZ.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.FRZ.oFrames = {
    stand: {
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
        },
        aHurtBox: [{
            nX: -30,
            nY: -142,
            nWidth: 68,
            nHeight: 144
        }]
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
            nHeight: 32
        }, {
            nX: 22,
            nY: -98,
            nWidth: 64,
            nHeight: 32
        }]
    },
    light_first_active: {
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
            nHeight: 32
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
    light_second: {
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
    light_second_active: {
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
    light_third: {
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
    light_third_active: {
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
    heavy: {
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
    heavy_active: {
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
    tracker: {
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
    tracker_active: {
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
    luncher: {
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
    luncher_active: {
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
    kikoha: {
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
    ki_beam: {
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
    super_first: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 64,
            nHeight: 112
        }
    },
    super_second: {
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
    super_third: {
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
    list_beam: false
};
```

### GameData.oCharacter.FRZ.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.FRZ.oAnimations = {
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
    // 6, 4, 8
    heavy_tracker: {
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
                nFrame: 4,
                sFrame: 'light_third'
            },
            {
                nFrame: 4,
                sFrame: 'light_third_active'
            },
            {
                nFrame: 6,
                sFrame: 'light_third',
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
        ]
    },
    // 8, 6, 10
    tracker: {
        oMove: {
            nDelay: 2,
            nLength: 12,
            nX: 96
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'blur'
            },
            {
                nFrame: 4,
                sFrame: 'forward',
            },
            {
                nFrame: 2,
                sFrame: 'tracker'
            },
            {
                nFrame: 6,
                sFrame: 'tracker_active'
            },
            {
                nFrame: 2,
                sFrame: 'tracker',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 6,
                sFrame: 'forward',
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
        ]
    },
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
            sFrame: 'luncher'
        },
        {
            nFrame: 8,
            sFrame: 'luncher_active'
        },
        {
            nFrame: 4,
            sFrame: 'luncher',
            oStatus: {
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
    // 12, 4, 16
    death_beam: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 10,
            sFrame: 'kikoha'
        },
        {
            nFrame: 8,
            sFrame: 'ki_beam',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 10,
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
        }
    ],
    // Death ball
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
    ],
    // 12, 4, 16
    death_beam_list: [
        {
            nFrame: 2,
            sFrame: 'blur'
        },
        {
            nFrame: 10,
            sFrame: 'kikoha'
        },
        {
            nFrame: 8,
            sFrame: 'list_beam'
        },
        {
            nFrame: 10,
            sFrame: 'kikoha'
        },
        {
            nFrame: 2,
            sFrame: 'blur'
        }
    ]
};
```

### GameData.oCharacter.FRZ.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.FRZ.oCommands = {
    aOffense: [
        {
            sCod: 'super',
            oName: {
                LSW_FRZ: 'Desu Bōru',
                CTM_MTL_KRA: 'Sūpānova Kūra'
            },
            sAnimation: 'super',
            nCost: 12,
            nDamage: 4,
            nGatlingLevel: 3,
            aEntity: {
                sType: 'projectile',
                sSFX: 'ADO__Beam',
                sAnimation: 'death',
                nFrameStart: 13,
                oPosition: {
                    nX: -24,
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
            sCod: 'death_beam',
            sName: 'Desubīmu',
            sAnimation: 'death_beam',
            sListAnimation: 'death_beam_list',
            nCost: 4,
            nGatlingLevel: 2,
            aEntity: {
                sType: 'beam',
                sSFX: 'ADO__Projectile',
                sAnimation: 'beam',
                nFrameStart: 13,
                bLink: true,
                oPosition: {
                    nX: 16,
                    nY: -12
                }
            },
            oStun: {
                nBlock: 12,
                nHit: 18,
                sHitAnimation: 'hit_heavy'
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
            oStun: {
                nBlock: 12,
                nHit: 18,
                sHitAnimation: 'hit_heavy'
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
            sCod: 'heavy_tracker',
            sName: 'Palm',
            sAnimation: 'heavy_tracker',
            nGatlingLevel: 1,
            oStun: {
                nBlock: 10,
                nHit: 16,
                sHitAnimation: 'hit_heavy'
            },
            oPushback: {
                nLength: 4,
                nX: -96
            },
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 1,
                aButtons: [
                    { FW: false, B: true }
                ]
            }
        },
        {
            sCod: 'heavy',
            sName: 'Heavy',
            sAnimation: 'heavy',
            nGatlingLevel: 1,
            oStun: {
                nBlock: 10,
                nHit: 16,
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
            oFollowUp: {
                sName: '2nd',
                sCod: 'light_second',
                sAnimation: 'light_second',
                nGatlingLevel: 1,
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