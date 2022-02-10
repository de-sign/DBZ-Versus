# GameData.oCharacter.GKU_SSJ

**Goku SSJ**  Définition du personnage possédant toutes les informations comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md).


_System :_ DATA  
_File source :_ [data/_characters/_GKU_SSJ.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_GKU_SSJ.js)

## Properties
### GameData.oCharacter.GKU_SSJ.sEntity

Code technique de l'entité. 

```javascript
GameData.oCharacter.GKU_SSJ.sEntity = 'GKU_SSJ';
```

### GameData.oCharacter.GKU_SSJ.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oCharacter.GKU_SSJ.aColor = [
    {
        sName: 'Goku SSJ',
        sColor: 'CTM_SSJ',
        sColorName: 'Custom color',
        sEntityColor: 'BLU'
    },
    {
        sName: 'Burakku SSJR',
        sColor: 'CTM_BRK',
        sColorName: 'Custom color',
        sEntityColor: 'PRP'
    },
    {
        sName: 'Goku SSJ',
        sColor: 'LSW_SSJ',
        sColorName: 'Legendary Super Warrior color',
        sEntityColor: 'BLU'
    }
];
```

### GameData.oCharacter.GKU_SSJ.oFrames

Données des FRAMES. 

```javascript
GameData.oCharacter.GKU_SSJ.oFrames = {

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
    /*
    stand_0_1: {
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
    stand_0_2: {
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
    stand_0_3: {
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
    */
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
    attack_1_2: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 76
        },
        aHurtBox: [{
            nX: -42,
            nY: -114,
            nWidth: 108,
            nHeight: 72
        },
        {
            nX: -10,
            nY: -78,
            nWidth: 64,
            nHeight: 56
        }]
    },
    attack_1_3: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 76
        },
        aHurtBox: [{
            nX: -42,
            nY: -114,
            nWidth: 108,
            nHeight: 72
        },
        {
            nX: -10,
            nY: -78,
            nWidth: 64,
            nHeight: 56
        }],
        aHitBox: [{
            nX: -10,
            nY: -78,
            nWidth: 64,
            nHeight: 56
        }, 
        {
            nX: 38,
            nY: -138,
            nWidth: 28,
            nHeight: 96
        }]
    },
    attack_1_4: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 76
        },
        aHurtBox: [{
            nX: -42,
            nY: -114,
            nWidth: 96,
            nHeight: 72
        },
        {
            nX: -10,
            nY: -78,
            nWidth: 64,
            nHeight: 56
        }]
    },
    attack_1_5: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 76
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

    attack_2_0: {
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
            nY: -98,
            nWidth: 60,
            nHeight: 32
        }]
    },
    attack_2_1: {
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
            nY: -98,
            nWidth: 60,
            nHeight: 32
        }]
    },

    attack_2_3: {
        nZIndex: 30,
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
    attack_2_4: {
        nZIndex: 30,
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
    attack_2_5: {
        nZIndex: 30,
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
    attack_3_2: {
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

    attack_3_3: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -10,
            nY: -146,
            nWidth: 52,
            nHeight: 60
        }, {
            nX: -22,
            nY: -98,
            nWidth: 52,
            nHeight: 100
        }]
    },
    attack_3_4: {
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
    attack_3_5: {
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
    attack_3_6: {
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

    attack_4_0: false,
    attack_4_1: {
        oPositionBox: {
            nX: -26,
            nY: -110,
            nWidth: 68,
            nHeight: 112
        },
        aHurtBox: [{
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 124
        }, {
            nX: 38,
            nY: -138,
            nWidth: 48,
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
        aHurtBox: [{
            nX: -22,
            nY: -138,
            nWidth: 60,
            nHeight: 124
        }, {
            nX: 38,
            nY: -138,
            nWidth: 48,
            nHeight: 108
        }],
        aHitBox: [{
            nX: 38,
            nY: -138,
            nWidth: 48,
            nHeight: 108
        }, {
            nX: 18,
            nY: -154,
            nWidth: 48,
            nHeight: 44
        }]
    },
    attack_4_3: {
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
    attack_4_4: {
        nZIndex: 30,
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
    attack_5_3: {
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
    attack_5_4: {
        nZIndex: 30,
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
    ki_0_1: {
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

### GameData.oCharacter.GKU_SSJ.oAnimations

Données des animations. 

```javascript
GameData.oCharacter.GKU_SSJ.oAnimations = {
    /*
    move_5: {
        sType: 'stand',
        bRepeat: true,
        aFrames: [
            {
                nFrame: 24,
                sFrame: 'stand_0',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false
                }
            },
            {
                nFrame: 8,
                sFrame: 'stand_0_1',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false
                }
            },
            {
                nFrame: 24,
                sFrame: 'stand_0_2',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false
                }
            },
            {
                nFrame: 8,
                sFrame: 'stand_0_3',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false
                }
            }
        ]
    },
    move_1: {
        sType: 'stand',
        bRepeat: true,
        aFrames: [
            {
                nFrame: 24,
                sFrame: 'stand_0',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false,
                    bGuard: true
                }
            },
            {
                nFrame: 8,
                sFrame: 'stand_0_1',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false,
                    bGuard: true
                }
            },
            {
                nFrame: 24,
                sFrame: 'stand_0_2',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false,
                    bGuard: true
                }
            },
            {
                nFrame: 8,
                sFrame: 'stand_0_3',
                oStatus: {
                    bReverse: true,
                    bAerial: false,
                    bLaunch: false,
                    bGuard: true
                }
            }
        ]
    },
    */
    // Command
    attack_jB: {
        sType: 'action',
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oPositionBox: {
                    nX: -22,
                    nY: -110,
                    nWidth: 68,
                    nHeight: 76
                },
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'attack_1_1'
            },
            {
                nFrame: 2,
                sFrame: 'attack_1_2'
            },
            {
                nFrame: 6,
                sFrame: 'attack_1_3'
            },
            {
                nFrame: 4,
                sFrame: 'attack_1_4'
            },
            {
                nFrame: 2,
                sFrame: 'attack_1_5'
            }
        ]
    },

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
            sFrame: 'attack_2_2'
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
            sFrame: 'attack_2_3'
        },
        {
            nFrame: 4,
            sFrame: 'attack_2_4'
        },
        {
            nFrame: 4,
            sFrame: 'attack_2_5'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 6, 4, 8
    attack_B_0: [
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
            sFrame: 'attack_3_2'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    // 6, 4, 8
    attack_B_1: {
        uMove: {
            nLength: 6,
            nX: 36
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
                sFrame: 'attack_3_3'
            },
            {
                nFrame: 4,
                sFrame: 'attack_3_5'
            },
            {
                nFrame: 6,
                sFrame: 'attack_3_4'
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
                sFrame: 'attack_5_3'
            },
            {
                nFrame: 6,
                sFrame: 'attack_5_4'
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
            sFrame: 'attack_4_3'
        },
        {
            nFrame: 6,
            sFrame: 'attack_4_4'
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    
    attack_C: {
        sType: 'dash',
        uMove: {
            nDelay: 11,
            nLength: 1,
            nX: 12 * 11
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
                sFrame: 'ki_0_1'
            },
            {
                nFrame: 10,
                sFrame: 'move_2__0',
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 4,
                sFrame: 'ki_0_1',
                oStatus: {
                    bCancel: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            }
        ]
    },

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
    ],

    anim_GHN_SSJT: [
        {
            nFrame: 8,
            sFrame: 'move_2',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 10,
            sFrame: 'ki_1_0',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 10,
            sFrame: 'ki_1_1',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 44,
            sFrame: 'ki_1_2',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 10,
            sFrame: 'ki_1_1',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 2,
            sFrame: 'stand_1',
            oPositionBox: null,
            oHurtBox: null
        },
        {
            nFrame: 8,
            sFrame: 'move_2',
            oPositionBox: null,
            oHurtBox: null
        }
    ]
};
```

### GameData.oCharacter.GKU_SSJ.oCommands

Données des commandes. 

```javascript
GameData.oCharacter.GKU_SSJ.oCommands = {
    aGround: [
        {
            sCod: 'attack_236C',
            sAnimation: 'attack_236C',
            oList: {
                sName: 'Cho Kamehameha',
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
                        sText: '超か',
                        nFrameStart: 1
                    },
                    {
                        sType: 'Text',
                        sText: '超かめは',
                        nFrameStart: 22
                    },
                    {
                        sType: 'Text',
                        sText: '超かめはめ波',
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
                sName: 'Shunkan ido',
                sGroup: 'ki'
            },
            oProperty: {},
            oGatling: {
                nCost: 10,
                sCancelCod: 'special',
                oCancel: {
                    cancel: true,
                    attack: true,
                    super: true
                },
                bReset: true,
                oManipulation: {
                    nMaxLengthFrame: 1,
                    aButtons: ['C'],
                    bLast: true
                },
                aEntity: [
                    {
                        sType: 'Text',
                        sText: '瞬間移動',
                        nLength: 14,
                        nFrameStart: 5
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
            sCod: 'attack_B_0',
            sAnimation: 'attack_B_0',
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
            },
            oFollowUp: {
                sCod: 'attack_B_1',
                sAnimation: 'attack_B_1',
                nLevel: 2,
                oProperty: {},
                oGatling: {
                    sCancelCod: 'attack',
                    oCancel: {
                        cancel: true,
                        attack: true,
                        special: true,
                        super: true
                    }
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