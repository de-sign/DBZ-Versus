/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleText(sText, nLength, oPosition, oParent){
    BattleEffect.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleText, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleEffect.prototype), {
                /* ----- END EXTENDS ----- */
                constructor: BattleText,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(sText, nLength, oPosition, oParent){
                    BattleEffect.prototype.init.call(
                        this,
                        { sText },
                        null,
                        oPosition,
                        false,
                        oParent
                    );

                    this.oDeadTimer = new GameTimer();
                    this.oDeadTimer.init( GameSettings.nDie, nLength || GameSettings.oBattleElement.Text.nLength );
                },
                update: function(){
                    this.oDeadTimer.update();
                    if( this.oDeadTimer.isEnd() ){
                        this.destroy();
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
                render: function(){
                    if( this.isDead() == 1 ){
                        this.oLayer.addTickUpdate( () => {
                            this.oLayer.hElement.classList.add('--dead');
                        } );
                    }
                },

                setFreeze: function(){},
                unFreeze: function(){}
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */