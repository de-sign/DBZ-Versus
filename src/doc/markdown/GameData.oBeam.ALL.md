# GameData.oBeam.ALL
Définition de l'entité général possédant toutes les informations des rayons comme les couleurs, les FRAMES, les animations, etc  Prévue pour compléter les informations contenues dans [GameData.oEntity.oBeam](GameData.oEntity.oBeam.md).<style>#constructor, #constructor+*, #constructor+*+*, #inheritance, #inheritance+*{ display: none; }</style>

_System :_ DATA  
_File source :_ [data/_beams/_ALL.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_beams/_ALL.js)

## Static properties
**GameData.oBeam.ALL.aColor**
Liste des couleurs de l'entité.


```javascript
aColor: [
    {
        sColor: 'BLU',
        sName: 'Blue beams'
    },
    {
        sColor: 'ORG',
        sName: 'Orange beams'
    },
    {
        sColor: 'PNK',
        sName: 'Pink beams'
    },
    {
        sColor: 'PRP',
        sName: 'Purple beams'
    }
]
```
**GameData.oBeam.ALL.oAnimations**
Données des animations.


```javascript
oAnimations: {
    beam: [
        {
            nFrame: 8,
            sFrame: 'beam'
        }
    ],

    zigzag: [
        {
            nFrame: 2,
            sFrame: 'beam',
            aHitBox: null
        },
        {
            nFrame: 40,
            sFrame: 'zigzag'
        },
        {
            nFrame: 2,
            sFrame: 'beam'
        }
    ],

    circle: [
        {
            nFrame: 2,
            sFrame: 'beam',
            aHitBox: null
        },
        {
            nFrame: 2,
            sFrame: 'circle_first',
            aHitBox: null
        },
        {
            nFrame: 36,
            sFrame: 'circle_second'
        },
        {
            nFrame: 2,
            sFrame: 'circle_first'
        },
        {
            nFrame: 2,
            sFrame: 'beam'
        }
    ],

    triangle: [
        {
            nFrame: 2,
            sFrame: 'beam',
            aHitBox: null
        },
        {
            nFrame: 2,
            sFrame: 'triangle_first',
            aHitBox: null
        },
        {
            nFrame: 36,
            sFrame: 'triangle_second'
        },
        {
            nFrame: 2,
            sFrame: 'triangle_first'
        },
        {
            nFrame: 2,
            sFrame: 'beam'
        }
    ],
    big_triangle: [
        {
            nFrame: 2,
            sFrame: 'beam',
            aHitBox: null
        },
        {
            nFrame: 2,
            sFrame: 'triangle_first',
            aHitBox: null
        },
        {
            nFrame: 2,
            sFrame: 'triangle_second',
            aHitBox: null
        },
        {
            nFrame: 32,
            sFrame: 'triangle_third'
        },
        {
            nFrame: 2,
            sFrame: 'triangle_second'
        },
        {
            nFrame: 2,
            sFrame: 'triangle_first'
        },
        {
            nFrame: 2,
            sFrame: 'beam'
        }
    ]
}
```
**GameData.oBeam.ALL.oFrames**
Données des FRAMES.


```javascript
oFrames: {
    beam: {
        aHitBox:  {
            nX: 30,
            nY: -98,
            nHeight: 24,
            nWidth: 1024
        }
    },

    zigzag: {
        aHitBox:  {
            nX: 30,
            nY: -110,
            nHeight: 48,
            nWidth: 1024
        }
    },

    circle_first: {
        aHitBox:  {
            nX: 30,
            nY: -110,
            nHeight: 48,
            nWidth: 1024
        }
    },
    circle_second: {
        aHitBox: {
            nX: 30,
            nY: -142,
            nHeight: 112,
            nWidth: 1024
        }
    },

    triangle_first: {
        aHitBox:  {
            nX: 30,
            nY: -118,
            nHeight: 64,
            nWidth: 1024
        }
    },
    triangle_second: {
        aHitBox: {
            nX: 30,
            nY: -126,
            nHeight: 80,
            nWidth: 1024
        }
    },
    triangle_third: {
        aHitBox: {
            nX: 30,
            nY: -142,
            nHeight: 112,
            nWidth: 1024
        }
    }
}
```
**GameData.oBeam.ALL.sEntity**
Code technique de l'entité.  Les rayons ne possède qu'une seule entité, ALL, contrairement aux personnages.


```javascript
sEntity: 'ALL'
```

## Constructor
**GameData.oBeam.ALL()**
```javascript
new GameData.oBeam.ALL();
```
## Inheritance
GameData.oBeam.ALL is a child class of [GameData](GameData.md).

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)