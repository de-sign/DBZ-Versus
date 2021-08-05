/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleBeam(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
    BattleEntity.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleBeam, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleEntity.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattleBeam,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
                    BattleEntity.prototype.init.call(
                        this,
                        GameData.oBeam[sEntity][sColor],
                        sAnimation,
                        oPosition,
                        bReverse,
                        oParent,
                        oCommandData
                    );
                },
                /*
                update: function(){},
                destroy: function(){},
                */
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */