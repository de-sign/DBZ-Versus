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


## Constructor
### Controller()

```javascript
new Controller();
```


## Instance properties
### this.oLayouts

```javascript
this.oLayouts = {};
```

### this.nIndex

```javascript
this.nIndex = -1;
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
this.init(nIndex, oLayouts);
```

### Controller.prototype.update()

```javascript
this.update();
```

### Controller.prototype.destroy()

```javascript
this.destroy();
```

### Controller.prototype.normalizeButtons()

```javascript
this.normalizeButtons(oButtons);
```

### Controller.prototype.getButton()

```javascript
this.getButton(sButton, sLayout);
```

### Controller.prototype.getLayout()

```javascript
this.getLayout(sLayout);
```

### Controller.prototype.hasPressedNow()

```javascript
this.hasPressedNow(sButton);
```

### Controller.prototype.isPressed()

```javascript
this.isPressed(sButton);
```

### Controller.prototype.getLastPress()

```javascript
this.getLastPress(sButton);
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