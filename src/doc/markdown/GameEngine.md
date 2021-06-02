# GameEngine

**Le moteur de jeu.** Il possède tout : l'horloge, le stockage d'informations persistantes, le managers des entrées, des scenes, des sorties. 


_System :_ ENGINE  
_File source :_ [engine/_engine.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_engine.js)

## Static properties
### Utilitary properties

Les properties suivantes sont destinées à être utilisé par le système ou par un développeur

#### GameEngine.oTimer

L'horlorge du moteur de jeu : [TimerEngine](TimerEngine.md) 

```javascript
GameEngine.oTimer = TimerEngine;
```

#### GameEngine.oStore

Le système de stockage d'informations persistantes : [StoreEngine](StoreEngine.md) 

```javascript
GameEngine.oStore = StoreEngine;
```

#### GameEngine.oInput

Le gestionnaire des entrées : [ControllerManager](ControllerManager.md) 

```javascript
GameEngine.oInput = ControllerManager;
```

#### GameEngine.oScene

Le gestionnaire des scènes de jeu : [SceneManager](SceneManager.md) 

```javascript
GameEngine.oScene = SceneManager;
```

#### GameEngine.oOutput

Le gestionnaire des sorties : [OutputManager](OutputManager.md) 

```javascript
GameEngine.oOutput = OutputManager;
```


## Static methods
### Technical methods

Les méthodes suivantes sont purement technique et ne devrait être utilisé principalement que par le système

#### GameEngine.update()

Mets à jours les gestionnaires dans l'ordre suivant :- [ControllerManager.update()](ControllerManager.md)- [SceneManager.update()](SceneManager.md)- [OutputManager.update()](OutputManager.md)

```javascript
GameEngine.update();
```


### Utilitary methods

Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur

#### GameEngine.start()

Si l'horloge n'est pas en route, initialise les gestionnaires et démarre l'horloge 

```javascript
GameEngine.start();
```

#### GameEngine.stop()

Arrete l'horloge et detruit la scène en cours 

```javascript
GameEngine.stop();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)