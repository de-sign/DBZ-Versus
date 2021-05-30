# GameSettings

Singleton possedant toutes les paramètres du jeu, aussi bien figés que paramètrables, comme le chemin des ressources, la configuration des bouttons, la vie des entités, etc 


_System :_ DATA  
_File source :_ [data/_settings.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_settings.js)

## Static properties
## Static properties - Technical Settings

Données techniques figées des paramétrages, comme les chemins des ressources, les réglages audios par défaut, etc

### GameSettings.nPlayer

Constante du nombre de joueur 

```javascript
GameSettings.nPlayer = 2;
```

### GameSettings.sStartScene

Nom de la scene de départ 

```javascript
GameSettings.sStartScene = 'InitializeScene';
```

### GameSettings.oPath

Constante des chemins techniques de chaques entités 

```javascript
GameSettings.oPath = {
    oCharacter: {
        sRoot: 'assets/images/characters',
        sFrames: 'assets/images/characters',
        sFace: 'face.png',
        sPreview: 'stand.png'
    },
    oProjectile: {
        sRoot: 'assets/images/projectiles',
        sFrames: 'assets/images/projectiles'
    },
    oBeam: {
        sRoot: 'assets/images/beams',
        sFrames: 'assets/images/beams'
    },
    oEffect: {
        sRoot: 'assets/images/effects',
        sFrames: 'assets/images/effects'
    },
    oStage: {
        sRoot: 'assets/images/stages',
        sBackground: 'background.png',
        sPreview: 'preview.png'
    },
    oController: {
        sRoot: 'assets/images/controllers',
        sFrames: 'assets/images/controllers'
    },
    oAudio: {
        sRoot: 'assets/audios',
        sBGM: 'assets/audios/BGM',
        sSFX: 'assets/audios/SFX'
    }
};
```

### GameSettings.aFilter

Constante de filtre des effets visuels des SPRITES de personnage 

```javascript
GameSettings.aFilter = [
    {
        sSuffixe: 'invul',
        aFrames: ['blur', 'hit_luncher', 'recovery', 'reflect'],
        oData: {
            oStatus: {
                bInvul: true
            },
            aHurtBox: null
        }
    },
    {
        sSuffixe: 'throw',
        aFrames: ['hit_light'],
        oData: {}
    },
    {
        sSuffixe: 'filter',
        aFrames: ['hit_light', 'hit_heavy', 'hit_luncher', 'guard'],
        oData: {}
    }
];
```

### GameSettings.oPositionPoint

Constante des POSITION_POINT de chaque entité 

```javascript
GameSettings.oPositionPoint = {
    character: {
        nX: 98,
        nY: 182,
        nGapY: 200 - 182 - 2
    },
    projectile: {
        nX: 128,
        nY: 190
    },
    beam: {
        nX: 98,
        nY: 232
    },
    effect: {
        nX: 128,
        nY: 210
    }
};
```

### GameSettings.oSide

Constante des choix de position sur le terrain en TRAINING 

```javascript
GameSettings.oSide = {
    nDefault: 2,
    aSide: [
        {
            sName: 'Left',
            fPosition: (oArea, nIndex) => {
                const oBoxArea = oArea.getBox(),
                    nLeft = oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX);

                return {
                    nX: nIndex ? nLeft + 88 : -nLeft - 32
                };
            }
        },
        {
            sName: 'Left reverse',
            fPosition: (oArea, nIndex) => {
                const oBoxArea = oArea.getBox(),
                    nLeft = oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX);

                return {
                    nX: nIndex ? nLeft + 32 : -nLeft - 88 
                };
            }
        },
        {
            sName: 'Middle',
            fPosition: () => {
                return { nX: 192 };
            }
        },
        {
            sName: 'Middle reverse',
            fPosition: () => {
                return { nX: -192 };
            }
        },
        {
            sName: 'Right',
            fPosition: (oArea, nIndex) => {
                const oBoxArea = oArea.getBox(),
                    nRight = oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

                    return {
                        nX: nIndex ? nRight - 32 : -nRight + 88
                    };
            }
        },
        {
            sName: 'Right reverse',
            fPosition: (oArea, nIndex) => {
                const oBoxArea = oArea.getBox(),
                    nRight = oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

                    return {
                        nX: nIndex ? nRight - 88 : -nRight + 32
                    };
            }
        }
    ]
};
```

### GameSettings.oController

Configuration des différents périphériques d'entrées 

```javascript
GameSettings.oController = {
    aOrderButtons: ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B', 'C', 'START'],
    aKeyboard: [
        {
            UP: 'KeyW',
            DOWN: 'KeyS',
            LEFT: 'KeyA',
            RIGHT: 'KeyD',
            A: 'KeyU',
            B: 'KeyI',
            C: 'KeyO',
            START: 'Enter'
        },
        {
            UP: 'ArrowUp',
            DOWN: 'ArrowDown',
            LEFT: 'ArrowLeft',
            RIGHT: 'ArrowRight',
            A: 'Numpad1',
            B: 'Numpad2',
            C: 'Numpad3',
            START: 'Numpad0'
        }
    ],
    oGamepad: {
        /*
        UP: 'Axe-1',
        DOWN: 'Axe+1',
        LEFT: 'Axe-0',
        RIGHT: 'Axe+0',
        */
        UP: 'Button12',
        DOWN: 'Button13',
        LEFT: 'Button14',
        RIGHT: 'Button15',
        A: 'Button2',
        B: 'Button3',
        C: 'Button1',
        START: 'Button9'
    }
};
```

### GameSettings.oAudio

Constante du volume par défaut de chaque canal de sortie AUDIO 

```javascript
GameSettings.oAudio = {
    oChannel: {
        BGM: 5,
        SFX: 10
    },
    oInitialize: {
        BGM: ['Menu'],
        SFX: ['Move', 'Validate', 'Cancel']
    },
    oPreBattle: {
        BGM: ['Victory'/* BGM of STAGE */],
        SFX: ['Hit', 'Guard', 'Recovery', 'Beam', 'Projectile']
    }
};
```


## Static properties - Game Settings

Données paramétrables de jeu, comme la vie, le KI, etc

### GameSettings.nFreeze

Nombre de FRAME lors d'un HIT FREEZE 

```javascript
GameSettings.nFreeze = 6;
```

### GameSettings.oPushback

PUSHBACK par défault appliqué lors d'un coup 

```javascript
GameSettings.oPushback = {
    nLength: 4,
    nX: -24
};
```

### GameSettings.nDie

Temps avant suppression d'un entité pour futur ROLLBACK 

```javascript
GameSettings.nDie = 60;
```

### GameSettings.oLife

Nombre de point de vie pour chaque entité 

```javascript
GameSettings.oLife = {
    player: 30,
    character: 0,
    projectile: 1,
    beam: 0
};
```

### GameSettings.oPositionEffect

Position lors d'un effet visuel sur une entité 

```javascript
GameSettings.oPositionEffect = {
    nX: -24
};
```

### GameSettings.nKi

Nombre maximum de KI possible en combat 

```javascript
GameSettings.nKi = 20;
```

### GameSettings.oLuncher

Paramétrage de l'animation d'un personnage LUNCHER 

```javascript
GameSettings.oLuncher = {
    nLength: 36,
    nInvulnerable: 8,
    oMove: {
        nX: -63 * 4,
        nY: -54 * 4
    },
    oFrames: {
        sLunch: 'hit_luncher',
        sFall: 'hit_fall'
    }
};
```

### GameSettings.oRecovery

Paramètrage de la distance de déplacement lors d'une relevé d'un personnage mis au sol 

```javascript
GameSettings.oRecovery = {
    backward: {
        nLength: 1,
        nX: -192
    },
    forward: {
        nLength: 1,
        nX: 192
    }
};
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)