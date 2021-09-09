# OutputHTMLElement


_System :_ ENGINE  
_File source :_ [engine/_output/_html/_element.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_html/_element.js)

## Constructor

OutputHTMLElement is a child class of [OutputElement](OutputElement.md).
### OutputHTMLElement()

```javascript
new OutputHTMLElement(hElm);
```


## Instance properties
_Properties inherited :_ [OutputElement.prototype](OutputElement.md#instance-properties)

### this.hElement

```javascript
this.hElement = null;
```

### this.bElementCreate

```javascript
this.bElementCreate = false;
```

### this.sId

```javascript
this.sId = null;
```

### this.bAutoPositioning

```javascript
this.bAutoPositioning = false;
```

### this.oPosition

```javascript
this.oPosition = {};
```

### this.oReferencePosition

```javascript
this.oReferencePosition = {};
```

### this.oStyle

```javascript
this.oStyle = {};
```


## Instance methods
_Methods inherited :_ [OutputElement.prototype](OutputElement.md#instance-methods) 

### OutputHTMLElement.prototype.init()

```javascript
this.init(hElm);
```

### OutputHTMLElement.prototype.update()

```javascript
this.update();
```

### OutputHTMLElement.prototype.createHTML()

```javascript
this.createHTML(sTyp, oHCfg);
```

### OutputHTMLElement.prototype.autoCreateChildElement()

```javascript
this.autoCreateChildElement();
```

### OutputHTMLElement.prototype.calculatePositionBox()

```javascript
this.calculatePositionBox();
```

### OutputHTMLElement.prototype.setPosition()

```javascript
this.setPosition(oPos);
```

### OutputHTMLElement.prototype.resetPosition()

```javascript
this.resetPosition();
```

### OutputHTMLElement.prototype.enableAutoPositioning()

```javascript
this.enableAutoPositioning();
```

### OutputHTMLElement.prototype.disableAutoPositioning()

```javascript
this.disableAutoPositioning();
```

### OutputHTMLElement.prototype.setStyle()

```javascript
this.setStyle(oCss);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)