# StoreEngine

Le système de stockage d'informations persistantes.     Utilise l'API WEB [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)


_System :_ ENGINE  
_File source :_ [engine/_components/_store.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_components/_store.js)

## Static properties
### StoreEngine.oData

Contient les données stocké dans le localStorage.    **A mettre à jour via la fonction StoreEngine.update() !**

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