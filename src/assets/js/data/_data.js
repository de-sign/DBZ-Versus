/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS Singleton possedant toutes les données du jeu comme les informations des personnages, des stages, etc ----- */
function GameData(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GameData,
    {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* ----- DETAILS
            Données de base pour chaques entités :
                - [GameData.oEntity.oBeam](GameData.oEntity.oBeam.md)
                - [GameData.oEntity.oCharacter](GameData.oEntity.oCharacter.md)
                - [GameData.oEntity.oEffect](GameData.oEntity.oEffect.md)
                - [GameData.oEntity.oProjectile](GameData.oEntity.oProjectile.md)
        ----- */
        oEntity: {
            /*
                Complete with :
                    - data/_beams/_base.js
                    - data/_characters/_base.js
                    - data/_effects/_base.js
                    - data/_projectiles/_base.js
            */
        },
        /* ----- DETAILS
            Données des personnages :
                - [GameData.oCharacter.BJT](GameData.oCharacter.BJT.md)
                - [GameData.oCharacter.BUU](GameData.oCharacter.BUU.md)
                - [GameData.oCharacter.FRZ](GameData.oCharacter.FRZ.md)
                - [GameData.oCharacter.GHN](GameData.oCharacter.GHN.md)
                - [GameData.oCharacter.GKU](GameData.oCharacter.GKU.md)
                - [GameData.oCharacter.GKU_SSJ](GameData.oCharacter.GKU_SSJ.md)
                - [GameData.oCharacter.KID_GHN](GameData.oCharacter.KID_GHN.md)
                - [GameData.oCharacter.MJN_BUU](GameData.oCharacter.MJN_BUU.md)
            ----- */
        oCharacter: {
            // Complete with data/_characters/_*.js files
        },
        /* ----- DETAILS Données des projectiles : [GameData.oProjectile.ALL](GameData.oProjectile.ALL.md) ----- */
        oProjectile: {
            // Complete with data/_projectiless/_ALL.js
        },
        /* ----- DETAILS Données des rayons : [GameData.oBeam.ALL](GameData.oBeam.ALL.md) ----- */
        oBeam: {
            // Complete with data/_beams/_ALL.js
        },
        /* ----- DETAILS Données des stages ----- */
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
        },
        /* ----- DETAILS Données des musique de fond ----- */
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
        },
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */