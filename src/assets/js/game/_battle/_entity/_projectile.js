/* ----- BattleProjectile ----- */
function BattleProjectile(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleProjectile, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
                    BattleEntity.prototype.init.call(this, 'projectile', GameData.oProjectile[sEntity][sColor], sAnimation, oPosition, bReverse, oParent);
                    this.nLife = oHitData.nDamage || 1;
                    this.oHitData = oHitData;
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
                takeHit: function(oEntity, oData){
                    this.nLife -= oData.nDamage == null ? 1 : oData.nDamage;
                    oEntity.confirmHit(this, oData, false, true);
                    return aNewEntity = [
                        {
                            sType: 'effect',
                            sAnimation: oData.oStun.sImpactAnimation || 'impact_hit',
                            oPosition: GameSettings.oPositionEffect,
                            bReverse: !this.bReverse,
                            oParent: this
                        }
                    ];
                },
                confirmHit: function(oEntityHurt, oData, bGuard, bNotDestroy){
                    BattleEntity.prototype.confirmHit.call(this, oEntityHurt, oData, bGuard);
                    bNotDestroy || (this.nLife = 0);
                }
            }
        )
    }
);