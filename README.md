# DBZ-Versus

Play the game : [https://dbz-versus.netlify.app](https://dbz-versus.netlify.app)

Jeu de versus en 2D basé sur l'univers de __DragonBall__ utilisant les ASSETS du jeu GameBoy Color __Dragon Ball Z : les guerriers légendaires__.

## TODO
__BUG__
* Problème controller en Training
* Tracker MBUU BUG AERIAL

__Game__
* Gestion de LAYOUT / CONFIG pour un CONTROLLER ?
    * Ajout de paramétrage possible pour MENU et BATTLE

* Améliorer menu en TRAINING
    * Améliorer le RECORDING ?
        * Revoir affichage
        * Bouton pour RECORD ?

* Faire les MODES visible dans le menu
    * How to play
    * Challenges

__Engine__
* Gestion du ONLINE ROLLBACK
    * Avec ou sans INPUT DELAY ?

* Optimisation du Code
    * Classe BATTLEINPUTBUFFER avec pour enfant AI ?

* Méchaniques de jeu
    * Attack :
        * Guard Break ?
    * Defense :
        * Burst ?

* Equilibrage
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
    * Proration

__Display__
* Faire des CUSTOM COLOR

* Animation lors de STAND

* Faire des SPRITES de mouvement pour fluidifier l'animation

* Faire des animations de début et fin de match stylé !

__Tools__
* Faire une API ELECTRON ?
    * Paramétrages globaux
    * Ajouter CHARACTER
    * Générer SPRITE
    * Générer ANIMATION
    * Générer COMMAND

* Commenter le Code afin de générer la DOC
    * ENGINE ( A finir )
    * GAME

## Documentation
Une documentation technique est disponible ici : [References.md](https://github.com/de-sign/DBZ-Versus/blob/master/src/doc/markdown/References.md)