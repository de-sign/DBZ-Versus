/* ----- START CLASS ----- */
/* ----- MENU GameEngine/System ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS
Le système de stockage d'informations persistantes.     
Utilise l'API WEB [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
----- */
function StoreEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    StoreEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Technical properties
        DETAILS Les propriétés suivantes sont purement technique et ne devrait être utilisé principalement que par le système
        ----- */
        /* ----- DETAILS
        Contient les données stocké dans le localStorage.    
        **A mettre à jour via la fonction `StoreEngine.update()` !**
        ----- */
        oData: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        /* -----
        SUBCATEGORY Utilitary methods
        DETAILS Les méthodes suivantes sont destinées à être utilisé par le système ou par un développeur
        ----- */
        /* ----- DETAILS Récupère toutes les informations stocker dans le localStorage. ----- */
        init: function(){
            for( let nIndex = 0; nIndex < localStorage.length; nIndex++ ){
                const sKey = localStorage.key(nIndex),
                    sData = localStorage.getItem(sKey);
                this.oData[sKey] = sData ? JSON.parse(sData) : null;
            }
        },
        /* ----- DETAILS Mets à jour les données du localStorage de la clef transmise. ----- */
        update: function(sKey, uData){
            const sData = JSON.stringify(uData);
            localStorage.setItem(sKey, sData);
            this.oData[sKey] = JSON.parse(sData);
        },
        /* ----- DETAILS Supprimer les données du localStorage de la clef transmise. ----- */
        remove: function(sKey){
            localStorage.removeItem(sKey);
            delete this.oData[sKey];
        },
        /* ----- DETAILS
        Donne les données de la clef transmise récupéré du localStorage.  
        Lors de l'appel des fonctions `StoreEngine.init()` et `StoreEngine.update()`, un nouvel objet `StoreEngine.oData` est créé !    
        **A utiliser avec abus !**
        ----- */
        get: function(sKey){
            return this.oData[sKey];
        }
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */