# OutputHTMLElement
_System :_ ENGINE  
_File source :_ [engine/_output/_html/_element.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_html/_element.js)

## Constructor
**OutputHTMLElement()**
```javascript
new OutputHTMLElement(hElm);
```
## Inheritance
OutputHTMLElement is a child class of [OutputElement](OutputElement.md).

## Instance properties
_Properties inherited :_ [OutputElement.prototype](OutputElement.md#instance-properties)

**OutputHTMLElement.prototype.bAutoPositioning**
```javascript
this.bAutoPositioning = false;
```
**OutputHTMLElement.prototype.bElementCreate**
```javascript
this.bElementCreate = false;
```
**OutputHTMLElement.prototype.hElement**
```javascript
this.hElement = null;
```
**OutputHTMLElement.prototype.oPosition**
```javascript
this.oPosition = {};
```
**OutputHTMLElement.prototype.oReferencePosition**
```javascript
this.oReferencePosition = {};
```
**OutputHTMLElement.prototype.oStyle**
```javascript
this.oStyle = {};
```
**OutputHTMLElement.prototype.sId**
```javascript
this.sId = null;
```

## Instance methods
_Methods inherited :_ [OutputElement.prototype](OutputElement.md#instance-methods) 

**OutputHTMLElement.prototype.init()**
```javascript
this.init(hElm)
```
**OutputHTMLElement.prototype.update()**
```javascript
this.update()
```
**OutputHTMLElement.prototype.createHTML()**
```javascript
this.createHTML(sTyp, oHCfg)
```
**OutputHTMLElement.prototype.autoCreateChildElement()**
```javascript
this.autoCreateChildElement()
```
**OutputHTMLElement.prototype.getBox()**
```javascript
this.getBox()
```
**OutputHTMLElement.prototype.setPosition()**
```javascript
this.setPosition(oPos)
```
**OutputHTMLElement.prototype.resetPosition()**
```javascript
this.resetPosition()
```
**OutputHTMLElement.prototype.getCalculatedPosition()**
```javascript
this.getCalculatedPosition()
```
**OutputHTMLElement.prototype.enableAutoPositioning()**
```javascript
this.enableAutoPositioning()
```
**OutputHTMLElement.prototype.disableAutoPositioning()**
```javascript
this.disableAutoPositioning()
```
**OutputHTMLElement.prototype.setStyle()**
```javascript
this.setStyle(oCss)
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)