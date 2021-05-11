# OutputElement
_System :_ ENGINE  
_File source :_ [engine/_output/_element.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_element.js)

## Static properties
**OutputElement.nId**

```javascript
nId: 0
```
**OutputElement.oInstance**

```javascript
oInstance: {}
```
**OutputElement.oInstanceByConstructor**

```javascript
oInstanceByConstructor: {}
```

## Static methods
**OutputElement.add()**
```javascript
OutputElement.add(oElm)
```
**OutputElement.remove()**
```javascript
OutputElement.remove(oElm)
```

## Constructor
**OutputElement()**
```javascript
new OutputElement();
```
## Instance properties
**OutputElement.prototype.aTickUpdate**
```javascript
this.aTickUpdate = [];
```
**OutputElement.prototype.oParentElement**
```javascript
this.oParentElement = null;
```
**OutputElement.prototype.sId**
```javascript
this.sId = this.sId || '';
```

## Instance methods
**OutputElement.prototype.update()**
```javascript
this.update()
```
**OutputElement.prototype.addTickUpdate()**
```javascript
this.addTickUpdate(fUpd)
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)