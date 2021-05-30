# SceneManager

Le gestionnaire des scènes de jeu avec un stockage de données transverse. 


_System :_ ENGINE  
_File source :_ [engine/_scene/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_scene/_manager.js)

## Static properties
### SceneManager.oCurrent

Contient la scène en cours : [Scene](Scene.md) 

```javascript
SceneManager.oCurrent = null;
```

### SceneManager.oLast

Contient la scène gérer précédemment. 

```javascript
SceneManager.oLast = null;
```

### SceneManager.oTransverseData

Contient les données transvèrses des scenes.Est surchargé à chaque destruction d'une scene.

```javascript
SceneManager.oTransverseData = {};
```


## Static methods
### SceneManager.init()

Initialise la scène en cours : [Scene.prototype.update](Scene.md). 

```javascript
SceneManager.init();
```

### SceneManager.update()

Mets à jour la scène en cours. 

```javascript
SceneManager.update();
```

### SceneManager.destroy()

Détruit la scène en cours, la stock comme scène précédente et surchage les données transverse. 

```javascript
SceneManager.destroy();
```

### SceneManager.set()

Défini la scène transmise comme étant celle en cours. 

```javascript
SceneManager.set(oScn);
```

### SceneManager.change()

Détruit la scène en cours, défini la scène transmise comme courante et l'initialise. 

```javascript
SceneManager.change(oScn);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)