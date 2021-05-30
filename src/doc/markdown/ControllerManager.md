# ControllerManager


_System :_ ENGINE  
_File source :_ [engine/_input/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_manager.js)

## Static properties
### ControllerManager.KeyboardController

```javascript
ControllerManager.KeyboardController = KeyboardController;
```

### ControllerManager.GamepadController

```javascript
ControllerManager.GamepadController = GamepadController;
```

### ControllerManager.oController

```javascript
ControllerManager.oController = {};
```

### ControllerManager.oKeyMap

```javascript
ControllerManager.oKeyMap = {};
```

### ControllerManager.nController

```javascript
ControllerManager.nController = 0;
```

### ControllerManager.oListeners

```javascript
ControllerManager.oListeners = {};
```


## Static methods
### ControllerManager.init()

```javascript
ControllerManager.init();
```

### ControllerManager.update()

```javascript
ControllerManager.update();
```

### ControllerManager.create()

```javascript
ControllerManager.create(sType, oBtn, nIndex);
```

### ControllerManager.addController()

```javascript
ControllerManager.addController(oCtrl);
```

### ControllerManager.removeController()

```javascript
ControllerManager.removeController(oCtrl);
```

### ControllerManager.updateController()

```javascript
ControllerManager.updateController(oCtrl);
```

### ControllerManager.addEvent()

```javascript
ControllerManager.addEvent(oEvent);
```

### ControllerManager.getController()

```javascript
ControllerManager.getController(sCod);
```

### ControllerManager.on()

```javascript
ControllerManager.on(uEvent, uCallback);
```

### ControllerManager.off()

```javascript
ControllerManager.off(uEvent, uCallback);
```

### ControllerManager.trigger()

```javascript
ControllerManager.trigger(sEvent);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)