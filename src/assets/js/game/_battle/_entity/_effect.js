/* ----- BattleEffect ----- */
function BattleEffect(sAnimation, oPosition, bReverse, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleEffect, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sAnimation, oPosition, bReverse, oParent){
                    BattleEntity.prototype.init.call(this, 'effect', GameData.oEntity.oEffect, sAnimation, GameSettings.oPositionEffect.effect || {}, bReverse, oParent);
                },
                /*
                update: function(){},
                destroy: function(){}
                */
            }
        )
    }
);