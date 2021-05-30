# TimerEngine

L'horlorge du moteur de jeu, avec une possibilité de paramétrage du FPS 


_System :_ ENGINE  
_File source :_ [engine/_components/_timer.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_components/_timer.js)

## Static properties
### TimerEngine.dStart

TIMESTAMP du démarage de l'horloge : [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now) 

```javascript
TimerEngine.dStart = null;
```

### TimerEngine.dUpdate

TIMESTAMP du début de mise à jour du moteur de jeu :- [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now)- [GameEngine](GameEngine.md)

```javascript
TimerEngine.dUpdate = null;
```

### TimerEngine.dLastUpdate

TIMESTAMP de la fin de mise à jour du moteur de jeu :- [Date.now()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now)- [GameEngine](GameEngine.md)

```javascript
TimerEngine.dLastUpdate = null;
```

### TimerEngine.nFrames

Nombre de FRAMES mise à jour depuis le démarage de l'horloge 

```javascript
TimerEngine.nFrames = 0;
```

### TimerEngine.nFramesToSkip

Nombre de FRAMES à _éviter_ avant la mise à jour de la suivante afin de respecter le FPS défini. 

```javascript
TimerEngine.nFramesToSkip = 0;
```

### TimerEngine.nFramesSkip

Nombre de FRAMES _évité_ depuis la dernière FRAME mise à jour afin de respecter le FPS défini. 

```javascript
TimerEngine.nFramesSkip = 0;
```


## Static methods
### TimerEngine.tick()

Mise à jour de l'horloge interne.    Mets à jours les FRAMES évités. Si la FRAME courante doit être mise à jour, change les TIMESTAMP et mets à jour le moteur de jeu : [GameEngine](GameEngine.md).    Utilise l'API WEB [requestAnimationFrame()](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame).

```javascript
TimerEngine.tick();
```

### TimerEngine.run()

Démarre l'horloge si ce n'est pas le cas 

```javascript
TimerEngine.run();
```

### TimerEngine.stop()

Arrete l'horloge si ce n'est pas le cas 

```javascript
TimerEngine.stop();
```

### TimerEngine.isStarted()

Indique si l'horloge tourne 

```javascript
TimerEngine.isStarted();
```

### TimerEngine.setFPS()

Défini le FPS en modifiant le nombre de FRAMES à _éviter_.    Ne peux pas être supérieur à 60 FPS puisque l'horloge utilise l'API WEB [requestAnimationFrame()](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame).

```javascript
TimerEngine.setFPS(nFps);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)