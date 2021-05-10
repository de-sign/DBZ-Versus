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
        oEntity: {},
        /* ----- DETAILS Données des personnages  ----- */
        oCharacter: {},
        /* ----- DETAILS Données des projectiles ----- */
        oProjectile: {},
        /* ----- DETAILS Données des rayons ----- */
        oBeam: {},
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