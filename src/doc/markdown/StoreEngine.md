# StoreEngine

Le système de stockage d'informations persistantes.     


_System :_ ENGINE  
_File source :_ [engine/_components/_store.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_components/_store.js)

## Static properties
### StoreEngine.oData

Contient les données stocké dans le localStorage.    

```javascript
StoreEngine.oData = {};
```


## Static methods
### StoreEngine.init()

Récupère toutes les informations stocker dans le localStorage. 

```javascript
StoreEngine.init();
```

### StoreEngine.update()

Mets à jour les données du localStorage de la clef transmise. 

```javascript
StoreEngine.update(sKey, uData);
```

### StoreEngine.get()

Donne les données de la clef transmise récupéré du localStorage. 

```javascript
StoreEngine.get(sKey);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)