# OutputAudioElement
_System :_ ENGINE  
_File source :_ [engine/_output/_audio/_element.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_audio/_element.js)

## Static properties
**OutputAudioElement.oAudioContext**

```javascript
oAudioContext: new AudioContext()
```

## Constructor
**OutputAudioElement()**
```javascript
new OutputAudioElement();
```
## Inheritance
OutputAudioElement is a child class of [OutputElement](OutputElement.md).

## Instance properties
_Properties inherited :_ [OutputElement.prototype](OutputElement.md#instance-properties)

**OutputAudioElement.prototype.oNode**
```javascript
this.oNode = {
        oInput: null,
        oOutput: null
    };
```

## Instance methods
_Methods inherited :_ [OutputElement.prototype](OutputElement.md#instance-methods) 

**OutputAudioElement.prototype.init()**
```javascript
this.init()
```
**OutputAudioElement.prototype.setNode()**
```javascript
this.setNode(oInput, oOutput)
```
**OutputAudioElement.prototype.connect()**
```javascript
this.connect(oElm)
```
**OutputAudioElement.prototype.disconnect()**
```javascript
this.disconnect(oElm)
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)