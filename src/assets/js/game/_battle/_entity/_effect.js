/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleEffect(oData, sAnimation, oPosition, bReverse, oParent){
    BattleElement.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleEffect, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattleEffect,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(oData, sAnimation, oPosition, bReverse, oParent){
                    BattleElement.prototype.init.call(
                        this,
                        oData || GameData.oEntity.oEffect,
                        sAnimation,
                        oPosition || GameSettings.oBattleElement[ BattleElement.getType(this) ].oPosition,
                        bReverse,
                        oParent
                    );
                },
                /*
                update: function(){},
                destroy: function(){}
                */
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */