/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleCharacter(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
    BattleEntity.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleCharacter, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleEntity.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattleCharacter,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oParent, oCommandData){
                    BattleEntity.prototype.init.call(
                        this,
                        GameData.oCharacter[sEntity][sColor],
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

                render: function(){

                    if( BattleElement.prototype.render.call(this) ){
                        const oClass = {
                            // Freeze
                            freeze_pair: false,
                            freeze_impair: false,
                            // Float
                            float_up: false,
                            float_down: false
                        };
                        
                        // Animation Freeze en HURT
                        if( this.oAnimation.is('hurt') && this.oAnimation.oFrame.bFreeze ){
                            oClass[this.oAnimation.nFreeze % 2 ? 'freeze_pair' : 'freeze_impair'] = true;
                        }
                        
                        // Animation Float en MOVEMENT
                        if( this.oAnimation.sType == 'movement' ){
                            const nPart = Math.floor((this.oAnimation.nTick % 32) / 8),
                                aClass = [null, 'float_up', null, 'float_down'];
                            aClass[nPart] && (oClass[ aClass[nPart] ] = true);
                        }
    
                        // Type
                        GameSettings.oAnimations.oType.aAll.forEach( sType => oClass[sType] = false );
                        oClass[ this.oAnimation.sType ] = true;
    
                        for( let sClass in oClass ){
                            this.oLayer.hElement.classList[ oClass[sClass] ? 'add' : 'remove' ]('--' + sClass);
                        }
                    }
                },

                setAnimation: function(sAnimation, bUpdate, bReverse){
                    return BattleEntity.prototype.setAnimation.call(
                        this,
                        GameAnimation.getCategory( this.oData.oAnimations[sAnimation] ) == 'hurt',
                        sAnimation,
                        bUpdate, 
                        bReverse
                    );
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */