/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleProjectile(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
    BattleEntity.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleProjectile, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleEntity.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattleProjectile,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
                    BattleEntity.prototype.init.call(
                        this,
                        Object.assign(
                            { nLife: oCommandData.oHit.oDamage.nDamage },
                            GameData.oProjectile[sEntity][sColor]
                        ),
                        sAnimation,
                        oPosition,
                        bReverse,
                        oParent,
                        oCommandData
                    );
                },
                update: function(){
                    if( this.nLife > 0 || this.isDead() ){
                        BattleEntity.prototype.update.call(this);
                    } else {
                        this.die();
                    }
                },
                // destroy: function(){}

                takeHit: function(oEntity, oCommandData, oEngine){
                    this.nLife -= oCommandData.oHit.oDamage.nDamage;
                    oEntity.confirmHit(this, oCommandData, false, true);
                    this.generateEntity('hit', oCommandData, oEngine);
                },
                confirmHit: function(oEntityHurt, oCommandData, bGuard, bNotDestroy){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oCommandData, bGuard);
                    bNotDestroy || (this.nLife = 0);
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */