# GamepadController
_System :_ ENGINE  
_File source :_ [engine/_input/_gamepad.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_gamepad.js)

## Static properties
**GamepadController.aGamepad**

```javascript
aGamepad: []
```
**GamepadController.nAxePressed**

```javascript
nAxePressed: 0.5
```
**GamepadController.oIndexCreate**

```javascript
oIndexCreate: {}
```
**GamepadController.oIndexRecovered**

```javascript
oIndexRecovered: {}
```

## Static methods
**GamepadController.update()**
```javascript
GamepadController.update()
```
**GamepadController.recover()**
```javascript
GamepadController.recover(oGamepad, oDefault)
```
**GamepadController.getButtonText()**
```javascript
GamepadController.getButtonText(sCode, oController)
```

## Constructor
**GamepadController()**
```javascript
new GamepadController(oBtn, nIndex);
```
## Inheritance
GamepadController is a child class of [Controller](Controller.md).

## Instance properties
_Properties inherited :_ [Controller.prototype](Controller.md#instance-properties)

**GamepadController.prototype.nIndex**
```javascript
this.nIndex = -1;
```
**GamepadController.prototype.nIndexStore**
```javascript
this.nIndexStore = -1;
```
**GamepadController.prototype.oGamepad**
```javascript
this.oGamepad = null;
```
**GamepadController.prototype.sName**
```javascript
this.sName = 'Gamepad #';
```
**GamepadController.prototype.sType**
```javascript
this.sType = 'gamepad';
```

## Instance methods
_Methods inherited :_ [Controller.prototype](Controller.md#instance-methods) 

**GamepadController.prototype.init()**
```javascript
this.init(oBtn, nIndex)
```
**GamepadController.prototype.update()**
```javascript
this.update()
```
**GamepadController.prototype.updateButton()**
```javascript
this.updateButton(sBtn, oButton)
```
**GamepadController.prototype.getAnyButtonsPressed()**
```javascript
this.getAnyButtonsPressed()
```
**GamepadController.prototype.store()**
```javascript
this.store()
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)