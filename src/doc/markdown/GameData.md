# GameData
Singleton possedant toutes les données du jeu comme les informations des personnages, des stages, etc

_System :_ DATA  
_File source :_ [data/_data.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/data/_data.js)

## Static properties
**GameData.oBeam**
Données des rayons : [GameData.oBeam.ALL](GameData.oBeam.ALL.md)


```javascript
oBeam: {
    // Complete with data/_beams/_ALL.js
}
```
**GameData.oBGM**
Données des musique de fond


```javascript
oBGM: {
    AUTO: {
        sCod: 'AUTO',
        sName: 'Automatique <i>Selected stage\'s soundtrack</i>'
    },
    GZA: { 
        sCod: 'Title',
        sName: 'Title <i>Legendary Super Warrior soundtrack</i>'
    },
    NMK: {
        sCod: 'BattleTheme',
        sName: 'Battle Theme <i>Legendary Super Warrior soundtrack</i>'
    },
    STH: {
        sCod: 'Friendship',
        sName: 'Friendship <i>Legendary Super Warrior soundtrack</i>'
    },
    KSK: {
        sCod: 'FightingSpirit',
        sName: 'Fighting Spirit <i>Legendary Super Warrior soundtrack</i>'
    },
    MNU: {
        sCod: 'Menu',
        sName: 'Credits <i>Legendary Super Warrior soundtrack</i>'
    },
    RNG: {
        sCod: 'RNG',
        sName: 'Random <i>Select random soundtrack</i>'
    }
}
```
**GameData.oCharacter**
Données des personnages :- [GameData.oCharacter.BJT](GameData.oCharacter.BJT.md)- [GameData.oCharacter.BUU](GameData.oCharacter.BUU.md)- [GameData.oCharacter.FRZ](GameData.oCharacter.FRZ.md)- [GameData.oCharacter.GHN](GameData.oCharacter.GHN.md)- [GameData.oCharacter.GKU](GameData.oCharacter.GKU.md)- [GameData.oCharacter.GKU_SSJ](GameData.oCharacter.GKU_SSJ.md)- [GameData.oCharacter.KID_GHN](GameData.oCharacter.KID_GHN.md)- [GameData.oCharacter.MJN_BUU](GameData.oCharacter.MJN_BUU.md)


```javascript
oCharacter: {
    // Complete with data/_characters/_*.js files
}
```
**GameData.oEntity**
Données de base pour chaques entités :- [GameData.oEntity.oBeam](GameData.oEntity.oBeam.md)- [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md)- [GameData.oEntity.oEffect](GameData.oEntity.oEffect.md)- [GameData.oEntity.oProjectile](GameData.oEntity.oProjectile.md)


```javascript
oEntity: {
    /*
        Complete with :
            - data/_beams/_base.js
            - data/_characters/_base.js
            - data/_effects/_base.js
            - data/_projectiles/_base.js
    */
}
```
**GameData.oProjectile**
Données des projectiles : [GameData.oProjectile.ALL](GameData.oProjectile.ALL.md)


```javascript
oProjectile: {
    // Complete with data/_projectiless/_ALL.js
}
```
**GameData.oStage**
Données des stages


```javascript
oStage: {
    GZA: {
        sCod: 'GZA',
        sName: 'Gizādo Arano <i>Legendary Super Warrior background</i>',
        sColor: '#90D0F8'
    },
    NMK: {
        sCod: 'NMK',
        sName: 'Namekku-sei <i>Legendary Super Warrior background</i>',
        sColor: '#A8D880'
    },
    RNG: {
        sCod: 'RNG',
        sName: 'Random <i>Select random stage</i>'
    },
    STH: {
        sCod: 'STH',
        sName: 'Seishin to Toki no Heya <i>Legendary Super Warrior background</i>',
        sColor: '#F8F8F8'
    },
    KSK: {
        sCod: 'KSK',
        sName: 'Kaiōshin-kai <i>Legendary Super Warrior background</i>',
        sColor: '#F098F8'
    }
}
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)