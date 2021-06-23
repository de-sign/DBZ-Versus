# DBZ-Versus

Jeu de versus en 2D basé sur l'univers de __DragonBall__ utilisant les ASSETS du jeu GameBoy Color __Dragon Ball Z : les guerriers légendaires__.

Utilise un moteur de jeu fait maison et FOX Website :

<br/>
<br/>
<div align="center">
    <a href="https://fox-website.netlify.app" target="_blank">
        <img style="background-color: #333; padding: 25px; border-radius: 5px;" height="144" width="144" src="https://fox-website.netlify.app/assets/favicons/android-chrome-144x144.png">
    </a>
</div>
<div align="center">
    <h1>
        FOX Website<br/>
        Simple Node.js project for develop<br/>
        your static website
    </h1>
</div>
<br/>
<br/>

## Documentation
Une documentation technique est disponnible ici : [References.md](https://github.com/de-sign/DBZ-Versus/blob/master/src/doc/markdown/References.md)

## TODO
__BUG__
* Problème de LOOP avec GKU et attack_C ?

__Menu__
* Ajout du ONLINE ?

__Setting__
<br/>*N/A*

__Input__
<br/>*N/A*

__Side__
<br/>*N/A*

__Select__
* Faire des SWAP COLOR

__Stage__
<br/>*N/A*

__Battle__
* Gestion du ONLINE ROLLBACK ? ( avec ou sans INPUT DELAY ? )

__Training__
* Refonte Menu
    * Dummy settings
        * Controller
            * Dummy, Keyboard2 [ ... Liste des controllers ]
        * Stance
            * Stand, Jump, Forward Jump, Backward Jump
        * Guard
            * No guard, After 1st hit, Only 1st hit, All, Reflect, Random
        * Tech throw
            * No, Yes
        * Counter
            * No counter, A [ ... Liste des commandes ]
        * Reversal
            * No reversal, Forward, Backward
        * Record ?
    * Command list

__General__
* Méchaniques de jeu
    * Attack :
        * Guard Break ?
    * Defense :
        * Guard Cancel ?
        * Burst ?

* Faire une API ELECTRON ?
    * Paramétrages globaux
    * Ajouter CHARACTER
    * Générer SPRITE
    * Générer ANIMATION
    * Générer COMMAND

* Commenter le Code afin de générer la DOC
    * ENGINE ( A finir )
    * GAME

* Optimisation du Code
    * Séparer les CLASS ENTITY par fichier
    * Classe BATTLEINPUTBUFFER avec pour enfant LOCAL et DUMMY ( et AI ? )

* Paramétrages
    * Animations
    * HurtBox
    * HitBox
    * StartUp
    * Active
    * Recovery
    * Cancel
    * Pushback
    * HitStun
    * BlockStun
    * Cost
    * Damage