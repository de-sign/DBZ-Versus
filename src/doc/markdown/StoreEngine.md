# StoreEngine

Le système de stockage d'informations persistantes.     Utilise l'API WEB [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)


_System :_ ENGINE  
_File source :_ [engine/_components/_store.js](https://github.com/de-sign/DBZ-Versus/blob/master/src/assets/js/engine/_components/_store.js)

## Static properties
### Technical properties

Les propriétés suivantes sont purement technique et ne devrait être utilisé principalement que par le système

#### StoreEngine.oData

Contient les données stocké dans le localStorage.    **A mettre à jour via la fonction `StoreEngine.update()` !**

```javascript
StoreEngine.oData = {};
```


## Static methods
### Utilitary methods

Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur

#### StoreEngine.init()

Récupère toutes les informations stocker dans le localStorage. 

```javascript
StoreEngine.init();
```

#### StoreEngine.update()

Mets à jour les données du localStorage de la clef transmise. 

```javascript
StoreEngine.update(sKey, uData);
```

#### StoreEngine.get()

Donne les données de la clef transmise récupéré du localStorage.  Lors de l'appel des fonctions `StoreEngine.init()` et `StoreEngine.update()`, un nouvel objet `StoreEngine.oData` est créé !    **A utiliser avec abus !**

```javascript
StoreEngine.get(sKey);
```


<link rel="stylesheet" href="../_doc.css" />

[&#8251; Return to Class references](References.md)