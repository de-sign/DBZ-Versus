# ControllerManager

Le gestionnaire des controlleurs avec un système d'écouteurs. 


_System :_ ENGINE  
_File source :_ [engine/_input/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_manager.js)

## Static properties
### Technical properties

Les propriétés suivantes sont purement technique et ne devrait être utilisé principalement que par le système

#### ControllerManager.KeyboardController

La classe du controlleur clavier : [KeyboardController](KeyboardController.md). 

```javascript
ControllerManager.KeyboardController = KeyboardController;
```

#### ControllerManager.GamepadController

La classe du controlleur manette : [GamepadController](GamepadController.md). 

```javascript
ControllerManager.GamepadController = GamepadController;
```

#### ControllerManager.oKeyMap

Objet technique permettant la mise à jour d'un controlleurs en fonction de la touche du clavier appuyé. 

```javascript
ControllerManager.oKeyMap = {};
```

#### ControllerManager.oListeners

Objet technique listant les écouteurs d'évènement du gestionnaire mis en place via les fonctions `ControllerManager.on()` et `ControllerManager.off()`. 

```javascript
ControllerManager.oListeners = {};
```


### Utilitary properties

Les propriétés suivantes sont destinées à être utilisé par le système ou par un développeur

#### ControllerManager.oController

Objet contenant tous les controlleurs avec leur code d'identification pour clef : [Controller.sId](Controller.md) 

```javascript
ControllerManager.oController = {};
```

#### ControllerManager.nController

Nombre de controlleur disponible dans `ControllerManager.oController`. 

```javascript
ControllerManager.nController = 0;
```


## Static methods
### Technical methods

Les méthodes suivantes sont purement technique et ne devrait être utilisé principalement que par le système

#### ControllerManager.init()

Initialise le gestionnaire en ajoutant des écouteurs d'évènements pour la gestion des controlleurs claviers :- [KeyboardEvent](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent) (`keydown` et `keyup`)- [KeyboardController](KeyboardController.md)

```javascript
ControllerManager.init();
```

#### ControllerManager.update()

Mets à jours tous les controlleurs présent dans `ControllerManager.oController` :- [GamepadController.update()](GamepadController.md)- [Controller.prototype.update()](Controller.md)

```javascript
ControllerManager.update();
```

#### ControllerManager.addController()

Ajoute le controlleur transmis dans `ControllerManager.oController`.  Si le controlleur est un clavier, modifie `ControllerManager.oKeyMap` en fonction du paramétrages des bouttons afin de pouvoir mettre à jour ce dernier : [Controller.oKeyMap](Controller.md)

```javascript
ControllerManager.addController(oCtrl);
```

#### ControllerManager.removeController()

Supprime le controlleur transmis de `ControllerManager.oController`.  Si le controlleur est un clavier, modifie `ControllerManager.oKeyMap` en fonction du paramétrages des bouttons afin de ne plus mettre à jour ce dernier : [Controller.oKeyMap](Controller.md)

```javascript
ControllerManager.removeController(oCtrl);
```

#### ControllerManager.addEvent()

Supprime le controlleur transmis de `ControllerManager.oController`.  Si le controlleur est un clavier, modifie `ControllerManager.oKeyMap` en fonction du paramétrages des bouttons afin de ne plus mettre à jour ce dernier : [Controller.addEvent()](Controller.md)

```javascript
ControllerManager.addEvent(oEvent);
```


### Utilitary methods

Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur

#### ControllerManager.create()

```javascript
ControllerManager.create(sType, oBtn, nIndex);
```

#### ControllerManager.updateController()

```javascript
ControllerManager.updateController(oCtrl);
```

#### ControllerManager.getController()

```javascript
ControllerManager.getController(sCod);
```

#### ControllerManager.on()

```javascript
ControllerManager.on(uEvent, uCallback);
```

#### ControllerManager.off()

```javascript
ControllerManager.off(uEvent, uCallback);
```

#### ControllerManager.trigger()

```javascript
ControllerManager.trigger(sEvent);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)