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
        bGuard: false, // Possibilité de guarder : backdash, block
        bThrow: false, // Possibilité de TechThrow : hit_throw
        bInvul: false, // Impossibilité de prendre un coup : launch
        bAerialInvul: false, // Impossibilité de prendre un coup aérien : launcher
        bCancel: false, // Coup cancellable : ligth, etc
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

### this.nHitting

```javascript
this.nHitting = 0;
```

### this.nKi

```javascript
this.nKi = 0;
```


## Instance methods
_Methods inherited :_ [BattleCharacter.prototype](BattleCharacter.md#instance-methods) 

### BattlePlayer.prototype.init()

```javascript
this.init(nPlayer, sChar, sColor, sAnimation, oPosition, bReverse, oSourceBuffer, nRound);
```

### BattlePlayer.prototype.update()

```javascript
this.update(oEngine);
```

### BattlePlayer.prototype.// destroy()

```javascript
this.// destroy();
```

### BattlePlayer.prototype.updateStatus()

```javascript
this.updateStatus(oForce);
```

### BattlePlayer.prototype.setMemory()

```javascript
this.setMemory(sAnimation);
```

### BattlePlayer.prototype.updateMemory()

```javascript
this.updateMemory();
```

### BattlePlayer.prototype.getCommandData()

```javascript
this.getCommandData();
```

### BattlePlayer.prototype.canAction()

```javascript
this.canAction();
```

### BattlePlayer.prototype.canMove()

```javascript
this.canMove();
```

### BattlePlayer.prototype.addKi()

```javascript
this.addKi(nKi);
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

### BattlePlayer.prototype.updateAnimation()

```javascript
this.updateAnimation();
```

### BattlePlayer.prototype.setPushback()

```javascript
this.setPushback(oPushback, bReverse, bDivide);
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