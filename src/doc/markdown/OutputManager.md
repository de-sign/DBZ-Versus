# OutputManager


_System :_ ENGINE  
_File source :_ [engine/_output/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_manager.js)

## Static properties
### OutputManager.OutputElement

```javascript
OutputManager.OutputElement = OutputElement;
```

### OutputManager.OutputAudioElement

```javascript
OutputManager.OutputAudioElement = OutputAudioElement;
```

### OutputManager.OutputAudioContext

```javascript
OutputManager.OutputAudioContext = OutputAudioContext;
```

### OutputManager.OutputChannel

```javascript
OutputManager.OutputChannel = OutputChannel;
```

### OutputManager.OutputSourceAudio

```javascript
OutputManager.OutputSourceAudio = OutputSourceAudio;
```

### OutputManager.OutputSourceBuffer

```javascript
OutputManager.OutputSourceBuffer = OutputSourceBuffer;
```

### OutputManager.OutputHTMLElement

```javascript
OutputManager.OutputHTMLElement = OutputHTMLElement;
```

### OutputManager.OutputLayer

```javascript
OutputManager.OutputLayer = OutputLayer;
```

### OutputManager.OutputViewport

```javascript
OutputManager.OutputViewport = OutputViewport;
```

### OutputManager.OutputHTMLContext

```javascript
OutputManager.OutputHTMLContext = OutputHTMLContext;
```

### OutputManager.OutputText

```javascript
OutputManager.OutputText = OutputText;
```

### OutputManager.OutputSprite

```javascript
OutputManager.OutputSprite = OutputSprite;
```

### OutputManager.oViewport

```javascript
OutputManager.oViewport = null;
```

### OutputManager.oAudio

```javascript
OutputManager.oAudio = new OutputAudioContext();
```

### OutputManager.oConfig

```javascript
OutputManager.oConfig = {
    selectors: {
        OutputViewport: '.outputViewport',
        OutputHTMLContext: '.outputContext',
        OutputLayer: '.outputLayer',
        OutputText: '.outputText',
        OutputSprite: '.outputSprite',

        toCreate: '.--outputScope {{elementSelector}}:not(.--outputCreated)'
    },

    class: {
        scope: '--outputScope',
        created: '--outputCreated',
        used: '--outputUsed',
        init: '--outputInitialize'
    },

    HTMLElements: {
        OutputHTMLContext: {
            tag: 'section',
            class: 'outputContext'
        },
        OutputLayer: {
            tag: 'div',
            class: 'outputLayer'
        },
        OutputText: {
            tag: 'span',
            class: 'outputText'
        },
        OutputSprite: {
            tag: 'img',
            class: 'outputSprite'
        }
    }
};
```


## Static methods
### OutputManager.init()

```javascript
OutputManager.init();
```

### OutputManager.update()

```javascript
OutputManager.update();
```

### OutputManager.getElement()

```javascript
OutputManager.getElement(sCod);
```

### OutputManager.getChannel()

```javascript
OutputManager.getChannel(sCod);
```

### OutputManager.getContext()

```javascript
OutputManager.getContext(sCod);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)