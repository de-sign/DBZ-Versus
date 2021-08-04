/* ----- BattleProjectile ----- */
function BattleProjectile(sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleProjectile, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent){
                    BattleEntity.prototype.init.call(this, 'projectile', GameData.oProjectile[sEntity][sColor], sAnimation, oPosition, bReverse, oParent);
                    this.nLife = oCommandData.oHit.oDamage.nDamage;
                    this.oCommandData = oCommandData;
                },
                update: function(){
                    let aNewEntity = null;
                    if( this.isDead() || this.nLife > 0 ){
                        BattleEntity.prototype.update.call(this);
                    } else {
                        this.die();
                    }
                    return aNewEntity;
                },
                // destroy: function(){}

                takeHit: function(oEntity, oCommandData, oEngine, bGuard){
                    this.nLife -= oCommandData[ bGuard ? 'oGuard' : 'oHit' ].oDamage.nDamage;
                    oEntity.confirmHit(this, oCommandData, false, true);
                    this.generateEntity('hit', this, oCommandData, oEngine);
                },
                confirmHit: function(oEntityHurt, oCommandData, bGuard, bNotDestroy){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oCommandData, bGuard);
                    bNotDestroy || (this.nLife = 0);
                }
            }
        )
    }
);