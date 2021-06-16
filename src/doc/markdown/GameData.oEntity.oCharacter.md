# GameData.oEntity.oCharacter

Constante avec les données de base des personnages.  Prévue pour être étendu et formaté par les informations contenues dans chaque fichier personnages :- [GameData.oCharacter.BJT](GameData.oCharacter.BJT.md)- [GameData.oCharacter.BUU](GameData.oCharacter.BUU.md)- [GameData.oCharacter.FRZ](GameData.oCharacter.FRZ.md)- [GameData.oCharacter.GHN](GameData.oCharacter.GHN.md)- [GameData.oCharacter.GKU](GameData.oCharacter.GKU.md)- [GameData.oCharacter.GKU_SSJ](GameData.oCharacter.GKU_SSJ.md)- [GameData.oCharacter.KID_GHN](GameData.oCharacter.KID_GHN.md)- [GameData.oCharacter.MJN_BUU](GameData.oCharacter.MJN_BUU.md)


_System :_ DATA  
_File source :_ [data/_characters/_base.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_characters/_base.js)

## Properties
### GameData.oEntity.oCharacter.oFrames

Données des FRAMES 

```javascript
GameData.oEntity.oCharacter.oFrames = {
    // Surcharger par "_CHAR.js", complété via "gulp extra"
    stand_0: {},
    stand_1: {
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

    move_0: {
        nZIndex: 10,
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
    move_1: {
        nZIndex: 20,
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
    move_2: {
        nZIndex: 10,
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        }
    },
    move_3: {
        nZIndex: 40,
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 60,
            nHeight: 112
        }
    },

    jump_0: {
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
    jump_1: {
        nZIndex: 30,
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
    jump_2: {
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
    jump_3: {
        nZIndex: 30,
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
    jump_4: {
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

    // Hurt
    guard_0: {
        nZIndex: 10,
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
    guard_1: {
        nZIndex: 10,
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
    guard_2: {
        nZIndex: 40,
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
    
    hit_0: {
        nZIndex: 10,
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
    hit_1: {
        nZIndex: 10,
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
    hit_2: {
        nZIndex: 10,
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
    hit_3: {
        nZIndex: 10,
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
    hit_4: {
        nZIndex: 10,
        oPositionBox: {
            nX: -30,
            nY: -58,
            nWidth: 60,
            nHeight: 60
        }
    },
    hit_5: {
        nZIndex: 10,
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
    hit_6: {
        nZIndex: 10,
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

    // Command
    throw_0: {
        nZIndex: 30,
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
    throw_1: {
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
    throw_2: {
        nZIndex: 30,
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
    throw_3: {
        nZIndex: 30,
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

    attack_0_0: {
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
    attack_0_1: {
        nZIndex: 30,
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
    attack_0_2: {
        nZIndex: 30,
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
    attack_0_3: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
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
    attack_0_4: {
        oPositionBox: {
            nX: -30,
            nY: -110,
            nWidth: 72,
            nHeight: 112
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
    attack_0_5: {
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

    attack_1_0: {
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
    attack_1_1: {
        nZIndex: 30,
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
    attack_1_2: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 112
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
            nWidth: 52,
            nHeight: 56
        }]
    },
    attack_1_3: {
        nZIndex: 30,
        oPositionBox: {
            nX: -22,
            nY: -110,
            nWidth: 68,
            nHeight: 112
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
            nWidth: 52,
            nHeight: 56
        }],
        aHitBox: [{
            nX: -10,
            nY: -78,
            nWidth: 52,
            nHeight: 56
        }]
    },
    attack_1_4: {
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

    attack_4_0: {
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
    attack_4_3: {
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

    attack_5_0: {
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
    attack_5_1: {
        nZIndex: 30
    },
    attack_5_2: {
        nZIndex: 30
    },
    attack_5_3: {
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

    attack_6_0: {
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
    attack_6_1: {
        nZIndex: 30
    },
    attack_6_2: {
        nZIndex: 30
    },
    attack_6_3: {
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
        nZIndex: 80
    },
    ki_0_1: {
        nZIndex: 80
    },

    // Super
    ki_1_0: {
        nZIndex: 80,
        oStatus: {
            bInvul: true
        }
    },
    ki_1_1: {
        nZIndex: 80
    },
    ki_1_2: {
        nZIndex: 80
    },

    // Command List
    list_0: {},
    list_1: {},
    list_2: {},
    list_3: {},
    list_4: {}
};
```

### GameData.oEntity.oCharacter.oAnimations

Données des animations 

```javascript
GameData.oEntity.oCharacter.oAnimations = {
    // Stand
    move_0: [
        {
            nFrame: 2,
            sFrame: 'jump_4',
            oStatus: {
                bAerial: false,
                bLaunch: false
            }
        },
        {
            nFrame: 2,
            sFrame: 'stand_1'
        }
    ],
    move_5: [
        {
            sFrame: 'stand_0',
            oStatus: {
                bReverse: true,
                bAerial: false
            }
        }
    ],
    move_1: [
        {
            sFrame: 'stand_0',
            oStatus: {
                bReverse: true,
                bGuard: true
            }
        }
    ],

    // Move
    move_6: {
        oMove: {
            nX: 6
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
                sFrame: 'move_1',
                oStatus: {
                    bReverse: true
                }
            }
        ]
    },
    move_4: {
        oMove: {
            nX: -6
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1',
                oStatus: {
                    bReverse: true,
                    bGuard: true
                }
            },
            {
                sFrame: 'move_0',
                oStatus: {
                    bReverse: true,
                    bGuard: true
                }
            }
        ]
    },
    move_66: {
        oMove: {
            nX: 12
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 2,
                sFrame: 'move_2'
            },
            {
                nFrame: 10,
                sFrame: 'move_1'
            }
        ]
    },
    move_44: {
        oMove: {
            nX: -12
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 8,
                sFrame: 'move_2'
            },
            {
                nFrame: 4,
                sFrame: 'move_0'
            }
        ]
    },

    // Hurt
    defense_4: [
        {
            nFrame: 1,
            sFrame: 'guard_0__2',
            oStatus: {
                bGuard: true
            }
        },
        {
            sFrame: 'guard_0',
            oStatus: {
                bGuard: true
            }
        }
    ],
    defense_AB: [
        {
            sFrame: 'stand_1__0',
            nFrame: 2
        },
        {
            sFrame: 'guard_0__0',
            nFrame: 4
        },
        {
            sFrame: 'guard_2__0',
            nFrame: 6,
            aHitBox: {
                nX: -1024,
                nY: (-39 * 4) - 2,
                nWidth: 2048,
                nHeight: 40 * 4
            }
        },
        {
            sFrame: 'stand_1__0',
            nFrame: 2
        }
    ],
    defense_BC: [
        {
            sFrame: 'stand_1__0',
            nFrame: 2
        },
        {
            sFrame: 'guard_0__0',
            nFrame: 4
        },
        {
            sFrame: 'guard_2__0',
            nFrame: 6,
            aHitBox: {
                nX: -1024,
                nY: (-39 * 4) - 2,
                nWidth: 2048,
                nHeight: 40 * 4
            }
        },
        {
            sFrame: 'stand_1__0',
            nFrame: 2
        }
    ],

    hit_0: [
        {
            nFrame: 1,
            sFrame: 'hit_0__1'
        },
        {
            sFrame: 'hit_0'
        }
    ],
    hit_1: [
        {
            nFrame: 1,
            sFrame: 'hit_1__1'
        },
        {
            sFrame: 'hit_1'
        }
    ],
    hit_2: [
        {
            nFrame: 1,
            sFrame: 'hit_2__1'
        },
        {
            sFrame: 'hit_2'
        }
    ],
    hit_AB: [
        {
            nFrame: 6,
            sFrame: 'hit_0__3',
            oStatus: {
                bThrow: true
            }
        },
        {
            sFrame: 'hit_0'
        }
    ],
    
    launch_2: [
        {
            nFrame: 20,
            sFrame: 'hit_4__0',
            oStatus: {
                bAerial: false,
                bLaunch: false
            }
        }
    ],
    launch_5: [
        {
            nFrame: 6,
            sFrame: 'move_3__0',
            oStatus: {
                bReverse: true
            }
        },
        {
            nFrame: 4,
            sFrame: 'stand_1__0'
        }
    ],
    
    attack_66: {
        oMove: {
            nX: 12
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 2,
                sFrame: 'move_2'
            },
            {
                nFrame: 10,
                sFrame: 'move_1'
            }
        ]
    },
    attack_jA: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 2,
            sFrame: 'attack_0_1'
        },
        {
            nFrame: 6,
            sFrame: 'attack_0_2'
        },
        {
            nFrame: 4,
            sFrame: 'attack_0_1',
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
    attack_jB: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
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
            nFrame: 8,
            sFrame: 'attack_1_3'
        },
        {
            nFrame: 4,
            sFrame: 'attack_1_2',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 2,
            sFrame: 'attack_1_4',
            oStatus: {
                bCancel: true
            }
        }
    ],

    // Choppe
    attack_AB: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 6,
            sFrame: 'throw_0'
        },
        {
            nFrame: 3,
            sFrame: 'throw_1'
        },
        {
            nFrame: 3,
            sFrame: 'throw_1',
            aHitBox: {
                nX: 22,
                nY: -110,
                nWidth: 32,
                nHeight: 112
            }
        },
        {
            nFrame: 1,
            sFrame: 'throw_1',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 6,
            sFrame: 'throw_2'
        },
        {
            nFrame: 6,
            sFrame: 'throw_3'
        },
        {
            nFrame: 6,
            sFrame: 'throw_2'
        }
    ],
    attack_4AB_0: [
        {
            nFrame: 2,
            sFrame: 'stand_1'
        },
        {
            nFrame: 6,
            sFrame: 'throw_0'
        },
        {
            nFrame: 3,
            sFrame: 'throw_1'
        },
        {
            nFrame: 3,
            sFrame: 'throw_1',
            aHitBox: {
                nX: 22,
                nY: -110,
                nWidth: 32,
                nHeight: 112
            }
        },
        {
            nFrame: 1,
            sFrame: 'throw_1',
            oStatus: {
                bCancel: true
            }
        },
        {
            nFrame: 6,
            sFrame: 'throw_2'
        },
        {
            nFrame: 6,
            sFrame: 'throw_3'
        },
        {
            nFrame: 6,
            sFrame: 'throw_2'
        }
    ],
    attack_4AB_1: {
        oMove: {
            nDelay: 4,
            nLength: 1,
            nX: 84
        },
        aFrames: [
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 5,
                sFrame: 'move_3',
                oStatus: {
                    bReverse: true
                }
            },
            {
                nFrame: 2,
                sFrame: 'stand_1'
            },
            {
                nFrame: 1,
                sFrame: 'stand_1',
                oStatus: {
                    bCancel: true
                }
            }
        ]
    },

    // List
    list_C: [
        {
            nFrame: 2,
            sFrame: 'move_1'
        },
        {
            nFrame: 10,
            sFrame: 'ki_0_0'
        },
        {
            nFrame: 8,
            sFrame: 'list_4'
        },
        {
            nFrame: 10,
            sFrame: 'ki_0_0'
        },
        {
            nFrame: 2,
            sFrame: 'move_1'
        }
    ],
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
            nFrame: 36,
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
        }
    ],

    // Animation
    anim_open: [
        // TP
        {
            nFrame: 8,
            sFrame: 'move_3'
        },
        // FORWARD
        {
            nFrame: 8,
            sFrame: 'move_1'
        },
        // REFLECT
        {
            sFrame: 'stand_1',
            nFrame: 2
        },
        {
            sFrame: 'guard_0',
            nFrame: 12
        },
        {
            sFrame: 'guard_2',
            nFrame: 16,
            aHitBox: null
        },
        // STAND
        {
            sFrame: 'stand_1',
            nFrame: 2
        },
        {
            sFrame: 'stand_0'
        }
    ]
};
```

### GameData.oEntity.oCharacter.oCommands

Données des commandes 

```javascript
GameData.oEntity.oCharacter.oCommands = {
    aDefense: [
        {
            sCod: 'defense_AB',
            sAnimation: 'defense_AB',
            sCheck: 'bThrow',
            nDamage: 0,
            sCollisionBox: 'oPositionBox',
            oStun: {
                nHit: 12,
                sHitAnimation: 'hit_0',
                sImpactAnimation: false
            },
            oKi: {
                oAttack: {
                    nHit: 0,
                    nGuard: 0
                },
                oDefend: {
                    nHit: 0,
                    nGuard: 0
                }
            },
            oPushback: {
                nLength: 4,
                nX: -98,
                bNotDivide: true
            },
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 2,
                aButtons: [
                    { A: false, B: true }
                ]
            }
        },
        {
            sCod: 'defence_BC',
            sAnimation: 'defence_BC',
            sCheck: 'bGuard',
            nCost: 10,
            nDamage: 0,
            sCollisionBox: 'oPositionBox',
            oStun: {
                sImpactAnimation: false
            },
            oKi: {
                oAttack: {
                    nHit: 0,
                    nGuard: 0
                },
                oDefend: {
                    nHit: 0,
                    nGuard: 0
                }
            },
            oPushback: {
                nLength: 4,
                nX: -192,
                bNotDivide: true
            },
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 2,
                aButtons: [
                    { B: false, C: true }
                ]
            }
        }
    ],
    aOffense: [
        {
            sCod: 'move_66',
            sAnimation: 'move_66',
            bNotInCommandList: true,
            nGatlingLevel: 0,
            sCheck: 'bGround',
            oStun: {},
            oPushback: {},
            oManipulation: {
                nMaxLengthFrame: 15,
                aButtons: [
                    { FW: false },
                    { NT: false },
                    { FW: false }
                ]
            }
        },
        {
            sCod: 'move_44',
            sAnimation: 'move_44',
            bNotInCommandList: true,
            nGatlingLevel: 0,
            sCheck: 'bGround',
            oStun: {},
            oPushback: {},
            oManipulation: {
                nMaxLengthFrame: 15,
                aButtons: [
                    { BW: false },
                    { NT: false },
                    { BW: false }
                ]
            }
        },
        {
            // Même code que DASH pour ne pas dash_cancel un dash
            sCod: 'move_66', // dash_cancel
            sAnimation: 'attack_66',
            bNotInCommandList: true,
            nCost: 20,
            bResetGatling: true,
            nGatlingLevel: 1,
            sCheck: 'bGround',
            oStun: {},
            oPushback: {},
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 15,
                aButtons: [
                    { FW: false },
                    { NT: false },
                    { FW: false }
                ]
            }
        },
        {
            sCod: 'attack_4AB_0',
            sAnimation: 'attack_4AB_0',
            nDamage: 0,
            bUnblockable: true,
            bOnlyOnGround: true,
            bNotInCommandList: true,
            sCheck: 'bGround',
            sCollisionBox: 'oPositionBox',
            oStun: {
                nHit: 30,
                sHitAnimation: 'hit_AB'
            },
            oKi: {
                oAttack: {
                    nHit: 0,
                    nGuard: 0
                },
                oDefend: {
                    nHit: 0,
                    nGuard: 0
                }
            },
            oPushback: {},
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 5,
                aButtons: [
                    { BW: false, A: false, B: true }
                ]
            },
            oFollowUp: {
                sCod: 'attack_4AB_1',
                sAnimation: 'attack_4AB_1',
                bFollowOnlyOnHurt: true,
                oStun: {},
                oPushback: {},
                bLast: true
            }
        },
        {
            sCod: 'attack_AB',
            sAnimation: 'attack_AB',
            nDamage: 0,
            bUnblockable: true,
            bOnlyOnGround: true,
            bNotInCommandList: true,
            sCheck: 'bGround',
            sCollisionBox: 'oPositionBox',
            oStun: {
                nHit: 30,
                sHitAnimation: 'hit_AB'
            },
            oKi: {
                oAttack: {
                    nHit: 0,
                    nGuard: 0
                },
                oDefend: {
                    nHit: 0,
                    nGuard: 0
                }
            },
            oPushback: {},
            bLast: true,
            oManipulation: {
                nMaxLengthFrame: 5,
                aButtons: [
                    { A: false, B: true }
                ]
            }
        },
        {
            sCod: 'attack_jB',
            sName: 'Jump attack heavy',
            sAnimation: 'attack_jB',
            nDamage: 50,
            nGatlingLevel: 1,
            sCheck: 'bAerial',
            oStun: {
                nBlock: 16,
                nHit: 20,
                sHitAnimation: 'hit_1'
            },
            oManipulation: {
                nMaxLengthFrame: 1,
                aButtons: [
                    { B: true }
                ]
            }
        },
        {
            sCod: 'attack_jA',
            sName: 'Jump attack light',
            sAnimation: 'attack_jA',
            nDamage: 25,
            nGatlingLevel: 1,
            sCheck: 'bAerial',
            oStun: {
                nBlock: 12,
                nHit: 16,
                sHitAnimation: 'hit_1'
            },
            oManipulation: {
                nMaxLengthFrame: 1,
                aButtons: [
                    { A: true }
                ]
            }
        },
    ]
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)