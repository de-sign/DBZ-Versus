# OutputChannel


_System :_ ENGINE  
_File source :_ [engine/_output/_audio/_channel.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_audio/_channel.js)

## Constructor

OutputChannel is a child class of [OutputAudioElement](OutputAudioElement.md).
### OutputChannel()

```javascript
new OutputChannel(sId, nDefaultGain);
```


## Instance properties
_Properties inherited :_ [OutputAudioElement.prototype](OutputAudioElement.md#instance-properties)

### this.sId

```javascript
this.sId = sId;
```

### this.oSource

```javascript
this.oSource = {};
```

### this.sCurrentSource

```javascript
this.sCurrentSource = null;
```


## Instance methods
_Methods inherited :_ [OutputAudioElement.prototype](OutputAudioElement.md#instance-methods) 

### OutputChannel.prototype.init()

```javascript
this.init(nDefaultGain);
```

### OutputChannel.prototype.add()

```javascript
this.add(oElm);
```

### OutputChannel.prototype.remove()

```javascript
this.remove(oElm);
```

### OutputChannel.prototype.use()

```javascript
this.use(sCod);
```

### OutputChannel.prototype.play()

```javascript
this.play(sCod, bRestart, bLoop);
```

### OutputChannel.prototype.pause()

```javascript
this.pause();
```

### OutputChannel.prototype.setGain()

```javascript
this.setGain(nGain);
```

### OutputChannel.prototype.setGainAtStep()

```javascript
this.setGainAtStep(nStep);
```

### OutputChannel.prototype.getStepGain()

```javascript
this.getStepGain();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)