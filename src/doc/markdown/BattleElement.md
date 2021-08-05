# BattleElement


_System :_ GAME  
_File source :_ [game/_battle/_entity/_element.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/game/_battle/_entity/_element.js)

## Static properties
### BattleElement.nId

```javascript
BattleElement.nId = 0;
```

### BattleElement.oInstance

```javascript
BattleElement.oInstance = {};
```

### BattleElement.oInstanceByConstructor

```javascript
BattleElement.oInstanceByConstructor = {};
```

### BattleElement.oPattern

```javascript
BattleElement.oPattern = null;
```


## Static methods
### BattleElement.add()

```javascript
BattleElement.add(oEntity);
```

### BattleElement.get()

```javascript
BattleElement.get(sId);
```

### BattleElement.getByConstructor()

```javascript
BattleElement.getByConstructor(sConstructor, sId);
```

### BattleElement.remove()

```javascript
BattleElement.remove(oEntity);
```

### BattleElement.init()

```javascript
BattleElement.init(sId);
```

### BattleElement.getType()

```javascript
BattleElement.getType(oEntity);
```


## Constructor
### BattleElement()

```javascript
new BattleElement(/*oData, oPosition, bReverse, oParent*/);
```


## Instance properties
### this.sId

```javascript
this.sId = '';
```

### this.oDeadTimer

```javascript
this.oDeadTimer = null;
```

### this.oParent

```javascript
this.oParent = null;
```

### this.oData

```javascript
this.oData = null;
```

### this.oLayer

```javascript
this.oLayer = null;
```

### this.oSprite

```javascript
this.oSprite = null;
```

### this.oAnimation

```javascript
this.oAnimation = null;
```

### this.bReverse

```javascript
this.bReverse = false;
```


## Instance methods
### BattleElement.prototype.init()

```javascript
this.init(oData, sAnimation, oPosition, bReverse, oParent);
```

### BattleElement.prototype.update()

```javascript
this.update();
```

### BattleElement.prototype.destroy()

```javascript
this.destroy();
```

### BattleElement.prototype.die()

```javascript
this.die();
```

### BattleElement.prototype.isDead()

```javascript
this.isDead();
```

### BattleElement.prototype.getRootParent()

```javascript
this.getRootParent();
```

### BattleElement.prototype.isLinked()

```javascript
this.isLinked();
```

### BattleElement.prototype.createLayer()

```javascript
this.createLayer();
```

### BattleElement.prototype.moveLayer()

```javascript
this.moveLayer(oPosition);
```

### BattleElement.prototype.render()

```javascript
this.render();
```

### BattleElement.prototype.setAnimation()

```javascript
this.setAnimation(bForce, sAnimation, bUpdate);
```

### BattleElement.prototype.updateAnimation()

```javascript
this.updateAnimation();
```

### BattleElement.prototype.setFreeze()

```javascript
this.setFreeze(nFreeze);
```

### BattleElement.prototype.unFreeze()

```javascript
this.unFreeze();
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)