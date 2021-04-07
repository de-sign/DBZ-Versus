// Store
function GameStore(){}

Object.assign(
    GameStore, {
        oData: {},
        init: function(){
            for( let nIndex = 0; nIndex < localStorage.length; nIndex++ ){
                const sKey = localStorage.key(nIndex),
                    sData = localStorage.getItem(sKey);
                this.oData[sKey] = sData ? JSON.parse(sData) : null;
            }
        },
        update: function(sKey, uData){
            this.oData[sKey] = uData;
            localStorage.setItem( sKey, JSON.stringify(uData) );
        },
        get: function(sKey){
            return this.oData[sKey];
        }
    }
)