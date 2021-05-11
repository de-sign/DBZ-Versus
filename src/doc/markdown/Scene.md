# Scene
Classe de définition ayant pas unique but d'être mère des classes scenes du jeu.

_System :_ ENGINE  
_File source :_ [engine/_scene/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_scene/_manager.js)

## Constructor
**Scene()**
```javascript
new Scene();
```
## Instance properties
**Scene.prototype.nFrameCreated**
```javascript
this.nFrameCreated = 0;
```
**Scene.prototype.oContext**
```javascript
this.oContext = null;
```
**Scene.prototype.oTransverseData**
```javascript
this.oTransverseData = null;
```

## Instance methods
**Scene.prototype.init()**
```javascript
this.init(sUseContext)
```
**Scene.prototype.update()**
```javascript
this.update()
```
**Scene.prototype.destroy()**
```javascript
this.destroy()
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)