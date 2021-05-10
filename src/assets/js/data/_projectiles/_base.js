/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS
Constante avec les données de base des projectiles.  
Prévue pour être étendu et formaté.
<style>#constructor, #constructor+*, #constructor+*+*, #inheritance, #inheritance+*{ display: none; }</style>
----- */
// function GameData.oEntity.oProjectile(){}
/* ----- END CONSTRUCTOR ----- */

GameData.oEntity.oProjectile = {};

Object.assign(
    GameData.oEntity.oProjectile,
    {
        /* ----- START EXTENDS ----- */
        /*
        Object.create(GameData.prototype), {
        */
        /* ----- END EXTENDS ----- */

        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* ----- DETAILS Données des FRAMES ----- */
        oFrames: {
            kikoha: {
                sPath: 'kikoha.png'
            },
            death_first: {
                sPath: 'death_first.png'
            },
            death_second: {
                sPath: 'death_second.png'
            },
            ball_first: {
                sPath: 'ball_first.png'
            },
            ball_second: {
                sPath: 'ball_second.png'
            }
        },
        /* ----- DETAILS Données des animations ----- */
        oAnimations: {},
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */