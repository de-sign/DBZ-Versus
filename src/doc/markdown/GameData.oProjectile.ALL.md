# GameData.oProjectile.ALL

Définition de l'entité général possédant toutes les informations des projectiles comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oProjectile](GameData.oEntity.oProjectile.md).


_System :_ DATA  
_File source :_ [data/_projectiles/_ALL.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_projectiles/_ALL.js)

## Properties
### GameData.oProjectile.ALL.sEntity

Code technique de l'entité.  Les rayons ne possède qu'une seule entité, ALL, contrairement aux personnages.

```javascript
GameData.oProjectile.ALL.sEntity = 'ALL';
```

### GameData.oProjectile.ALL.aColor

Liste des couleurs de l'entité. 

```javascript
GameData.oProjectile.ALL.aColor = [
    {
        sColor: 'BLU',
        sName: 'Blue kikoha'
    },
    {
        sColor: 'ORG',
        sName: 'Orange kikoha'
    },
    {
        sColor: 'PNK',
        sName: 'Pink kikoha'
    },
    {
        sColor: 'PRP',
        sName: 'Purple kikoha'
    }
];
```

### GameData.oProjectile.ALL.oFrames

Données des FRAMES. 

```javascript
GameData.oProjectile.ALL.oFrames = {
    kikoha: {
        aHurtBox: [
            {
                nX: -16,
                nY: -82,
                nWidth: 40,
                nHeight: 40
            }
        ],
        aHitBox: [
            {
                nX: -16,
                nY: -82,
                nWidth: 40,
                nHeight: 40
            }
        ]
    },

    death_first: {
        aHurtBox: [
            {
                nX: -38,
                nY: -94,
                nWidth: 72,
                nHeight: 72
            }
        ],
        aHitBox: [
            {
                nX: -38,
                nY: -94,
                nWidth: 72,
                nHeight: 72
            }
        ]
    },
    death_second: {
        aHurtBox: [
            {
                nX: -70,
                nY: -130,
                nWidth: 136,
                nHeight: 136
            }
        ],
        aHitBox: [
            {
                nX: -70,
                nY: -130,
                nWidth: 136,
                nHeight: 136
            }
        ]
    },

    ball_first: {
        aHurtBox: [
            {
                nX: -52,
                nY: -114,
                nWidth: 104,
                nHeight: 104
            }
        ],
        aHitBox: [
            {
                nX: -52,
                nY: -114,
                nWidth: 104,
                nHeight: 104
            }
        ]
    },
    ball_second: {
        aHurtBox: [
            {
                nX: -98,
                nY: -158,
                nWidth: 196,
                nHeight: 196
            }
        ],
        aHitBox: [
            {
                nX: -98,
                nY: -158,
                nWidth: 196,
                nHeight: 196
            }
        ]
    }
};
```

### GameData.oProjectile.ALL.oAnimations

Données des animations. 

```javascript
GameData.oProjectile.ALL.oAnimations = {
    kikoha: {
        uMove: {
            nX: 12
        },
        aFrames: [
            {
                sFrame: 'kikoha',
                nFrame: 90
            }
        ]
    },

    death: {
        uMove: {
            nDelay: 30,
            nX: 16,
            nY: 4
        },
        aFrames: [
            {
                sFrame: 'death_first',
                nFrame: 15,
                aHitBox: null
            },
            {
                sFrame: 'death_second',
                nFrame: 15,
                aHitBox: null
            },
            {
                sFrame: 'death_second',
                nFrame: 105
            }
        ]
    },

    ball: {
        uMove: {
            nDelay: 30,
            nX: 16,
            nY: 6
        },
        aFrames: [
            {
                sFrame: 'ball_first',
                nFrame: 15,
                aHitBox: null
            },
            {
                sFrame: 'ball_second',
                nFrame: 15,
                aHitBox: null
            },
            {
                sFrame: 'ball_second',
                nFrame: 90
            }
        ]
    },

    flash: {
        aFrames: [
            {
                sFrame: 'ball_second',
                nFrame: 6,
                aHurtBox: null,
                aHitBox: null
            }
        ]
    }
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)