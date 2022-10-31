# Scene

Classe de définition ayant pour unique but d'être mère des classes scenes du jeu. 


_System :_ ENGINE  
_File source :_ [engine/_scene/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_scene/_manager.js)

## Constructor
### Scene()

```javascript
new Scene();
```


## Instance properties
### Utilitary properties

Les propriétés suivantes sont destinées à être utilisé par le système ou par un développeur

#### this.oContext

Context de sortie visuel de la scene : [OutputHTMLContext](OutputHTMLContext.md). 

```javascript
this.oContext = null;
```

#### this.nFrameCreated

FRAME de l'horloge interne lors de son initialisation : [TimerEngine.nFrames](TimerEngine.md). 

```javascript
this.nFrameCreated = 0;
```


## Instance methods
### Technical methods

Les méthodes suivantes sont purement technique et ne devrait être utilisé principalement que par le système.  Elles sont vouées à être surcharger et utilisées par une class fille créée par le développeur.

#### Scene.prototype.init()

Utilise le context transmis si défini et récupère la FRAME de l'horloge interne :- [OutputViewport.useContext()](OutputViewport.md)- [TimerEngine.nFrames](TimerEngine.md)

```javascript
this.init(sUseContext, sUseLayout);
```

#### Scene.prototype.update()

Fonction de mise à jour de la scène, vouée à être surcharger. 

```javascript
this.update();
```

#### Scene.prototype.destroy()

Fonction de destruction de la scène, vouée à être surcharger.    Si elle retourne un objet, ce dernier est utilisé pour surcharger les données transvères du gestionnaire de scene : [SceneManager.oTransverseData](SceneManager.md)

```javascript
this.destroy();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)