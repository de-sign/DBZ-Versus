# GameData.oEntity.oEffect
Constante avec les données des effets visuels déjà formatées.<style>#constructor, #constructor+*, #constructor+*+*, #inheritance, #inheritance+*{ display: none; }</style>

_System :_ DATA  
_File source :_ [data/_effects/_base.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_effects/_base.js)

## Static properties
**GameData.oEntity.oEffect.oAnimations**
Données des animations


```javascript
oAnimations: {
    explode_light: {
        aFrames: [
            {
                sFrame: 'explode_light_1',
                nFrame: 2
            },
            {
                sFrame: 'explode_light_2',
                nFrame: 6
            },
            {
                sFrame: 'explode_light_3',
                nFrame: 4
            },
            {
                sFrame: 'explode_light_4',
                nFrame: 2
            },
            {
                sFrame: 'explode_light_5',
                nFrame: 2
            }
        ]
    },
    explode_heavy: {
        aFrames: [
            {
                sFrame: 'explode_light_1',
                nFrame: 2
            },
            {
                sFrame: 'explode_heavy_1',
                nFrame: 2
            },
            {
                sFrame: 'explode_heavy_2',
                nFrame: 8
            },
            {
                sFrame: 'explode_heavy_3',
                nFrame: 6
            },
            {
                sFrame: 'explode_heavy_4',
                nFrame: 2
            },
            {
                sFrame: 'explode_heavy_5',
                nFrame: 2
            },
            {
                sFrame: 'explode_light_5',
                nFrame: 2
            }
        ]
    },
    impact_hit: {
        aFrames: [
            {
                sFrame: 'impact_hit_1',
                nFrame: 2
            },
            {
                sFrame: 'impact_hit_2',
                nFrame: 2
            },
            {
                sFrame: 'impact_hit_3',
                nFrame: 4
            },
            {
                sFrame: 'impact_hit_4',
                nFrame: 2
            }
        ]
    },
    impact_guard: {
        aFrames: [
            {
                sFrame: 'impact_guard_1',
                nFrame: 2
            },
            {
                sFrame: 'impact_guard_2',
                nFrame: 2
            },
            {
                sFrame: 'impact_guard_3',
                nFrame: 4
            },
            {
                sFrame: 'impact_guard_4',
                nFrame: 2
            }
        ]
    }
}
```
**GameData.oEntity.oEffect.oFrames**
Données des FRAMES


```javascript
oFrames: {
    explode_light_1: {
        sPath: 'explode_light_1.png'
    },
    explode_light_2: {
        sPath: 'explode_light_2.png'
    },
    explode_light_3: {
        sPath: 'explode_light_3.png'
    },
    explode_light_4: {
        sPath: 'explode_light_4.png'
    },
    explode_light_5: {
        sPath: 'explode_light_5.png'
    },

    explode_heavy_1: {
        sPath: 'explode_heavy_1.png'
    },
    explode_heavy_2: {
        sPath: 'explode_heavy_2.png'
    },
    explode_heavy_3: {
        sPath: 'explode_heavy_3.png'
    },
    explode_heavy_4: {
        sPath: 'explode_heavy_4.png'
    },
    explode_heavy_5: {
        sPath: 'explode_heavy_5.png'
    },

    impact_hit_1: {
        sPath: 'impact_hit_1.png'
    },
    impact_hit_2: {
        sPath: 'impact_hit_2.png'
    },
    impact_hit_3: {
        sPath: 'impact_hit_3.png'
    },
    impact_hit_4: {
        sPath: 'impact_hit_4.png'
    },

    impact_guard_1: {
        sPath: 'impact_guard_1.png'
    },
    impact_guard_2: {
        sPath: 'impact_guard_2.png'
    },
    impact_guard_3: {
        sPath: 'impact_guard_3.png'
    },
    impact_guard_4: {
        sPath: 'impact_guard_4.png'
    },
}
```
**GameData.oEntity.oEffect.oPath**
Chemin d'accès aux SPRITES des effets visuels


```javascript
oPath: GameSettings.oPath.oEffect
```

## Constructor
**GameData.oEntity.oEffect()**
```javascript
new GameData.oEntity.oEffect();
```
## Inheritance
GameData.oEntity.oEffect is a child class of [GameData](GameData.md).

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)