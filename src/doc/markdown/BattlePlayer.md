# BattlePlayer


_System :_ GAME  
_File source :_ [game/_battle/_entity/_player.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/game/_battle/_entity/_player.js)

## Constructor

BattlePlayer is a child class of [BattleCharacter](BattleCharacter.md).
### BattlePlayer()

```javascript
new BattlePlayer(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer);
```


## Instance properties
_Properties inherited :_ [BattleCharacter.prototype](BattleCharacter.md#instance-properties)

### this.nPlayer

```javascript
this.nPlayer = null;
```

### this.oStatus

```javascript
this.oStatus = {
        bReverse: false, // Possibilité de se retourner : stand, tp, etc
        bThrough: false, // Possibilité de traverser
        bCounter: false, // Possibilité de se faire counter
        bGuard: false, // Possibilité de guarder : backdash, block
        bThrow: false, // Possibilité de TechThrow : hit_throw
        bAerial: false, // Personnage en l'air : jump, launch, fall, etc
        bLaunch: false // Personnage en l'air via un coup : launch
    };
```

### this.oInputBuffer

```javascript
this.oInputBuffer = null;
```

### this.oMemory

```javascript
this.oMemory = {
        sType: null,
        oAnimation: null,
        oMove: null
    };
```

### this.oGatling

```javascript
this.oGatling = null;
```

### this.oDamage

```javascript
this.oDamage = null;
```

### this.nKi

```javascript
this.nKi = 0;
```


## Instance methods
_Methods inherited :_ [BattleCharacter.prototype](BattleCharacter.md#instance-methods) 

### BattlePlayer.prototype.init()

```javascript
this.init(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer);
```

### BattlePlayer.prototype.update()

```javascript
this.update(oEngine);
```

### BattlePlayer.prototype.// destroy()

```javascript
this.// destroy();
```

### BattlePlayer.prototype.canBeMoved()

```javascript
this.canBeMoved();
```

### BattlePlayer.prototype.addKi()

```javascript
this.addKi(nKi);
```

### BattlePlayer.prototype.isState()

```javascript
this.isState(sState);
```

### BattlePlayer.prototype.getCommandData()

```javascript
this.getCommandData();
```

### BattlePlayer.prototype.canCommand()

```javascript
this.canCommand();
```

### BattlePlayer.prototype.useCommand()

```javascript
this.useCommand(oCommand);
```

### BattlePlayer.prototype.render()

```javascript
this.render();
```

### BattlePlayer.prototype.setAnimation()

```javascript
this.setAnimation(sAnimation, bUpdate, bReverse);
```

### BattlePlayer.prototype.setStance()

```javascript
this.setStance(sMovement, bUpdate, bReverse);
```

### BattlePlayer.prototype.setHurt()

```javascript
this.setHurt(sHurt, nFramesLength, bReverse);
```

### BattlePlayer.prototype.setMovement()

```javascript
this.setMovement(oMove, bReverse);
```

### BattlePlayer.prototype.setPushback()

```javascript
this.setPushback(oPushback, bReverse, bDivide);
```

### BattlePlayer.prototype.setFall()

```javascript
this.setFall(uMovement);
```

### BattlePlayer.prototype.updateAnimation()

```javascript
this.updateAnimation(oForce);
```

### BattlePlayer.prototype.updateStatus()

```javascript
this.updateStatus(oForce);
```

### BattlePlayer.prototype.isInvulnerable()

```javascript
this.isInvulnerable(oEntityHit);
```

### BattlePlayer.prototype.isCounterState()

```javascript
this.isCounterState();
```

### BattlePlayer.prototype.takeHit()

```javascript
this.takeHit(oEntity, oCommandData, oEngine);
```

### BattlePlayer.prototype.confirmHit()

```javascript
this.confirmHit(oEntityHurt, oCommandData, bGuard);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)