# GameEngine
**Le moteur de jeu.** Il possède tout : l'horloge, le stockage d'information technique, le managers des entrées, des scenes, des sorties.

_System :_ ENGINE  
_File source :_ [engine/_engine.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_engine.js)

## Static properties
**GameEngine.oInput**

```javascript
oInput: ControllerManager
```
**GameEngine.oOutput**

```javascript
oOutput: OutputManager
```
**GameEngine.oScene**

```javascript
oScene: SceneManager
```
**GameEngine.oStore**

```javascript
oStore: StoreEngine
```
**GameEngine.oTimer**
L'horlorge du moteur de jeu : [TimerEngine](TimerEngine.md)


```javascript
oTimer: TimerEngine
```

## Static methods
**GameEngine.start()**
```javascript
GameEngine.start()
```
**GameEngine.update()**
```javascript
GameEngine.update()
```
**GameEngine.stop()**
```javascript
GameEngine.stop()
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)