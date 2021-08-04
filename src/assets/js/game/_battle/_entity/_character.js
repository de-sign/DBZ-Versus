/* ----- BattleCharacter ----- */
function BattleCharacter(sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent){
    this.bCustomAnimation = false;
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleCharacter, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent){
                    BattleEntity.prototype.init.call(this, 'character', GameData.oCharacter[sEntity][sColor], null, oPosition, bReverse, oParent);
                    this.oCommandData = oCommandData;

                    this.bCustomAnimation = this.generateAnimation(sAnimation, oPosition);
                    this.setAnimation(sAnimation + ( this.bCustomAnimation ? '_' + this.sId : '' ) );
                },
                /*
                update: function(){},
                */
                destroy: function(){
                    if( this.bCustomAnimation ){
                        delete this.oData.oAnimations[ this.oAnimation.sName ];
                    }
                    BattleEntity.prototype.destroy.call(this);
                },
                // Animations UNIQUE afin de ne pas sortir de l'écran en cas de PUSHBACK
                generateAnimation: function(sAnimation, oPosition){
                    let bGenerate = false;
                    const oPositionBox = Object.assign( {}, this.oParent.oAnimation.oFrame.oPositionBox ),
                        oAnim = Object.assign( {}, this.oData.oAnimations[sAnimation], { aFrames: [] } );

                    if( oPosition.nX ){
                        oPositionBox.nX -= oPosition.nX;
                    }
                    if( oPosition.nY ){
                        oPositionBox.nY -= oPosition.nY;
                    }

                    this.oData.oAnimations[sAnimation].aFrames.forEach( oFrame => {
                        if( !oFrame.oPositionBox ){
                            oAnim.aFrames.push( Object.assign( {}, oFrame, { oPositionBox } ) );
                            bGenerate = true;
                        }
                    } );

                    if( bGenerate ){
                        this.oData.oAnimations[ sAnimation + '_' + this.sId ] = oAnim;
                    }

                    return bGenerate;
                }
            }
        )
    }
);