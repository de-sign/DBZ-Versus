/* ----- BattleText ----- */
function BattleText(sText, oPosition, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleText, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sText, oPosition, oParent){
                    BattleEntity.prototype.init.call(this, 'text', { sText }, null, oPosition || GameSettings.oPositionEffect.text, false, oParent);
                },
                update: function(){
                    // Destruction après 1s pour prévention du ROLLBACK
                    if( this.isDead() ) {
                        this.oDeadTimer.update();
                        if( this.oDeadTimer.isEnd() ){
                            this.destroy();
                        }
                    } else {
                        if( this.nLife > 0 ){
                            this.nLife--;
                        } else {
                            this.die();
                        }
                    }
                },
                // destroy: function(){}

                createLayer: function(){
                    this.oLayer = new OutputManager.OutputText(
                        this.oData.sText,
                        {
                            class: [
                                'Battle__Entity',
                                'Battle__' + this.sType[0].toUpperCase() + this.sType.slice(1),
                                '--font-japan'
                            ]
                        }
                    );
                    
                    const oArea = OutputManager.getElement('LAY__Battle_Area');
                    oArea.add(this.oLayer);
                    oArea.update();
            
                    this.oLayer.enableAutoPositioning();

                    return this.oLayer;
                },
                render: function(){}
            }
        )
    }
);