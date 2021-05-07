/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function StoreEngine(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    StoreEngine, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        oData: {},
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        init: function(){
            for( let nIndex = 0; nIndex < localStorage.length; nIndex++ ){
                const sKey = localStorage.key(nIndex),
                    sData = localStorage.getItem(sKey);
                this.oData[sKey] = sData ? JSON.parse(sData) : null;
            }
        },
        update: function(sKey, uData){
            const sData = JSON.stringify(uData);
            localStorage.setItem(sKey, sData);
            this.oData[sKey] = JSON.parse(sData);
        },
        get: function(sKey){
            return this.oData[sKey];
        }
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */