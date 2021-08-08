# BattleEntity


_System :_ GAME  
_File source :_ [game/_battle/_entity/_entity.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/game/_battle/_entity/_entity.js)

## Static methods
### BattleEntity.get()

```javascript
BattleEntity.get(sId);
```


## Constructor

BattleEntity is a child class of [BattleElement](BattleElement.md).
### BattleEntity()

```javascript
new BattleEntity(/*oData, oPosition, bReverse, oParent, oCommandData*/);
```


## Instance properties
_Properties inherited :_ [BattleElement.prototype](BattleElement.md#instance-properties)

### this.aLink

```javascript
this.aLink = [];
```

### this.oCheck

```javascript
this.oCheck = null;
```

### this.oPositionPoint

```javascript
this.oPositionPoint = null;
```

### this.oCommandData

```javascript
this.oCommandData = null;
```

### this.oMovement

```javascript
this.oMovement = new BattleMovementManager();
```

### this.nLife

```javascript
this.nLife = 0;
```

### this.aHit

```javascript
this.aHit = [];
```


## Instance methods
_Methods inherited :_ [BattleElement.prototype](BattleElement.md#instance-methods) 

### BattleEntity.prototype.init()

```javascript
this.init(oData, sAnimation, oPosition, bReverse, oParent, oCommandData);
```

### BattleEntity.prototype.update()

```javascript
this.update();
```

### BattleEntity.prototype.canBeMoved()

```javascript
this.canBeMoved();
```

### BattleEntity.prototype.canReverse()

```javascript
this.canReverse();
```

### BattleEntity.prototype.add()

```javascript
this.add(oEntity);
```

### BattleEntity.prototype.remove()

```javascript
this.remove(oEntity);
```

### BattleEntity.prototype.hasLink()

```javascript
this.hasLink(oLinkEntity);
```

### BattleEntity.prototype.killLink()

```javascript
this.killLink();
```

### BattleEntity.prototype.generateEntity()

```javascript
this.generateEntity(sType, uData, oEngine);
```

### BattleEntity.prototype.setAnimation()

```javascript
this.setAnimation(bForce, sAnimation, bUpdate, bReverse);
```

### BattleEntity.prototype.updateAnimation()

```javascript
this.updateAnimation();
```

### BattleEntity.prototype.setMovement()

```javascript
this.setMovement(oMove, bReverse);
```

### BattleEntity.prototype.setPushback()

```javascript
this.setPushback(oPushback, bReverse, bDivide);
```

### BattleEntity.prototype.move()

```javascript
this.move();
```

### BattleEntity.prototype.setFreeze()

```javascript
this.setFreeze(nFreeze);
```

### BattleEntity.prototype.unFreeze()

```javascript
this.unFreeze();
```

### BattleEntity.prototype.getBox()

```javascript
this.getBox(sBox);
```

### BattleEntity.prototype.isInvulnerable()

```javascript
this.isInvulnerable();
```

### BattleEntity.prototype.takeHit()

```javascript
this.takeHit(oEntity, oCommandData);
```

### BattleEntity.prototype.confirmHit()

```javascript
this.confirmHit(oEntityHurt, oCommandData, bGuard);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)