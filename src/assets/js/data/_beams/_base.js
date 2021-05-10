/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS
Constante avec les données de base des rayons.  
Prévue pour être étendu et formaté.
<style>#constructor, #constructor+*, #constructor+*+*, #inheritance, #inheritance+*{ display: none; }</style>
----- */
// function GameData.oEntity.oBeam(){}
/* ----- END CONSTRUCTOR ----- */

GameData.oEntity.oBeam = {};

Object.assign(
    GameData.oEntity.oBeam,
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
            beam: {
                sPath: 'beam.png'
            },
            
            zigzag: {
                sPath: 'zigzag.png'
            },
            
            circle_first: {
                sPath: 'circle_first.png'
            },
            circle_second: {
                sPath: 'circle_second.png'
            },
            
            triangle_first: {
                sPath: 'triangle_first.png'
            },
            triangle_second: {
                sPath: 'triangle_second.png'
            },
            triangle_third: {
                sPath: 'triangle_third.png'
            }
        },
        /* ----- DETAILS Données des animations ----- */
        oAnimations: {},
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */