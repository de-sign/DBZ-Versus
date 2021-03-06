# Controller


_System :_ ENGINE  
_File source :_ [engine/_input/_controller.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_input/_controller.js)

## Static properties
### Controller.nId

```javascript
Controller.nId = 0;
```

### Controller.oInstance

```javascript
Controller.oInstance = {};
```


## Static methods
### Controller.add()

```javascript
Controller.add(oKCtrl);
```

### Controller.createDataStore()

```javascript
Controller.createDataStore(oController, oStore);
```

### Controller.getDataStore()

```javascript
Controller.getDataStore(oStore);
```


## Constructor
### Controller()

```javascript
new Controller();
```


## Instance properties
### this.oButtons

```javascript
this.oButtons = {};
```

### this.oKeyMap

```javascript
this.oKeyMap = {};
```

### this.nFrameChange

```javascript
this.nFrameChange = 0;
```

### this.dTimestampChange

```javascript
this.dTimestampChange = 0;
```


## Instance methods
### Controller.prototype.init()

```javascript
this.init(oBtn);
```

### Controller.prototype.update()

```javascript
this.update();
```

### Controller.prototype.destroy()

```javascript
this.destroy();
```

### Controller.prototype.addButtons()

```javascript
this.addButtons(oBtns);
```

### Controller.prototype.removeButtons()

```javascript
this.removeButtons(oBtns);
```

### Controller.prototype.updateButtons()

```javascript
this.updateButtons(oBtns);
```

### Controller.prototype.hasPressedNow()

```javascript
this.hasPressedNow(sBtn);
```

### Controller.prototype.isPressed()

```javascript
this.isPressed(sBtn);
```

### Controller.prototype.getLastPress()

```javascript
this.getLastPress(sBtn);
```

### Controller.prototype.ifPressedNow()

```javascript
this.ifPressedNow(oCallback, bOnlyFirst = true);
```

### Controller.prototype.ifPressed()

```javascript
this.ifPressed(oCallback, bOnlyFirst = true);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)