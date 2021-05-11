# OutputManager
_System :_ ENGINE  
_File source :_ [engine/_output/_manager.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_output/_manager.js)

## Static properties
**OutputManager.oAudio**

```javascript
oAudio: new OutputAudioContext()
```
**OutputManager.oConfig**

```javascript
oConfig: {
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
}
```
**OutputManager.OutputAudioContext**

```javascript
OutputAudioContext: OutputAudioContext
```
**OutputManager.OutputAudioElement**

```javascript
OutputAudioElement: OutputAudioElement
```
**OutputManager.OutputChannel**

```javascript
OutputChannel: OutputChannel
```
**OutputManager.OutputElement**

```javascript
OutputElement: OutputElement
```
**OutputManager.OutputHTMLContext**

```javascript
OutputHTMLContext: OutputHTMLContext
```
**OutputManager.OutputHTMLElement**

```javascript
OutputHTMLElement: OutputHTMLElement
```
**OutputManager.OutputLayer**

```javascript
OutputLayer: OutputLayer
```
**OutputManager.OutputSourceAudio**

```javascript
OutputSourceAudio: OutputSourceAudio
```
**OutputManager.OutputSourceBuffer**

```javascript
OutputSourceBuffer: OutputSourceBuffer
```
**OutputManager.OutputSprite**

```javascript
OutputSprite: OutputSprite
```
**OutputManager.OutputText**

```javascript
OutputText: OutputText
```
**OutputManager.OutputViewport**

```javascript
OutputViewport: OutputViewport
```
**OutputManager.oViewport**

```javascript
oViewport: null
```

## Static methods
**OutputManager.init()**
```javascript
OutputManager.init()
```
**OutputManager.update()**
```javascript
OutputManager.update()
```
**OutputManager.getElement()**
```javascript
OutputManager.getElement(sCod)
```
**OutputManager.getChannel()**
```javascript
OutputManager.getChannel(sCod)
```
**OutputManager.getContext()**
```javascript
OutputManager.getContext(sCod)
```

<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)