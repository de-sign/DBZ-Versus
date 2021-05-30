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
### this.oContext

Context de sortie visuel de la scene : [OutputHTMLContext](OutputHTMLContext.md). 

```javascript
this.oContext = null;
```

### this.nFrameCreated

FRAME de l'horloge interne lors de son initialisation : [TimerEngine.nFrames](TimerEngine.md). 

```javascript
this.nFrameCreated = 0;
```


## Instance methods
### Scene.prototype.init()

Utilise le context transmis si défini et récupère la FRAME de l'horloge interne :- [OutputViewport.useContext()](OutputViewport.md)- [TimerEngine.nFrames](TimerEngine.md)

```javascript
this.init(sUseContext);
```

### Scene.prototype.update()

Fonction de mise à jour de la scène, voué à être surcharger. 

```javascript
this.update();
```

### Scene.prototype.destroy()

Fonction de destruction de la scène, voué à être surcharger.    Si elle retourne un objet, ce dernier est utilisé pour surcharger les données transvères du gestionnaire de scene : [SceneManager.oTransverseData](SceneManager.md)

```javascript
this.destroy();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)