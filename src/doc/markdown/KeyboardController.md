# KeyboardController
_System :_ ENGINE  
_File source :_ [engine/_input/_keyboard.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_keyboard.js)

## Static properties
**KeyboardController.oButtonText**

```javascript
oButtonText: {
    KEYW: 'W / Z',
    KEYA: 'A / Q'
}
```

## Static methods
**KeyboardController.getButtonText()**
```javascript
KeyboardController.getButtonText(sCode)
```
**KeyboardController.recover()**
```javascript
KeyboardController.recover(sId, oDefault)
```

## Constructor
**KeyboardController()**
```javascript
new KeyboardController(oBtn);
```
## Inheritance
KeyboardController is a child class of [Controller](Controller.md).

## Instance properties
_Properties inherited :_ [Controller.prototype](Controller.md#instance-properties)

**KeyboardController.prototype.aEvents**
```javascript
this.aEvents = [];
```
**KeyboardController.prototype.sName**
```javascript
this.sName = 'Keyboard #';
```
**KeyboardController.prototype.sType**
```javascript
this.sType = 'keyboard';
```

## Instance methods
_Methods inherited :_ [Controller.prototype](Controller.md#instance-methods) 

**KeyboardController.prototype.update()**
```javascript
this.update()
```
**KeyboardController.prototype.addEvent()**
```javascript
this.addEvent(oEvent)
```
**KeyboardController.prototype.store()**
```javascript
this.store()
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)