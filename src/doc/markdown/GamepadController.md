# GamepadController


_System :_ ENGINE  
_File source :_ [engine/_input/_gamepad.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_gamepad.js)

## Static properties
### GamepadController.nAxePressed

```javascript
GamepadController.nAxePressed = 0.5;
```

### GamepadController.aGamepad

```javascript
GamepadController.aGamepad = [];
```

### GamepadController.oIndexCreate

```javascript
GamepadController.oIndexCreate = {};
```

### GamepadController.oIndexRecovered

```javascript
GamepadController.oIndexRecovered = {};
```


## Static methods
### GamepadController.update()

```javascript
GamepadController.update();
```

### GamepadController.recover()

```javascript
GamepadController.recover(oGamepad, oDefault);
```

### GamepadController.getButtonText()

```javascript
GamepadController.getButtonText(sCode, oController);
```


## Constructor

GamepadController is a child class of [Controller](Controller.md).
### GamepadController()

```javascript
new GamepadController(oBtn, nIndex);
```


## Instance properties
_Properties inherited :_ [Controller.prototype](Controller.md#instance-properties)

### this.sName

```javascript
this.sName = 'Gamepad #';
```

### this.sType

```javascript
this.sType = 'gamepad';
```

### this.oGamepad

```javascript
this.oGamepad = null;
```

### this.nIndex

```javascript
this.nIndex = -1;
```

### this.nIndexStore

```javascript
this.nIndexStore = -1;
```


## Instance methods
_Methods inherited :_ [Controller.prototype](Controller.md#instance-methods) 

### GamepadController.prototype.init()

```javascript
this.init(oBtn, nIndex);
```

### GamepadController.prototype.update()

```javascript
this.update();
```

### GamepadController.prototype.updateButton()

```javascript
this.updateButton(sBtn, oButton);
```

### GamepadController.prototype.getAnyButtonsPressed()

```javascript
this.getAnyButtonsPressed();
```

### GamepadController.prototype.store()

```javascript
this.store();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)