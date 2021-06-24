/* ----- BattleBeam ----- */
function BattleBeam(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleBeam, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
                    BattleEntity.prototype.init.call(this, 'beam', GameData.oBeam[sEntity][sColor], null, oPosition, bReverse, oParent);
                    this.oHitData = oHitData;

                    this.generateAnimation(sAnimation, oPosition);
                    this.setAnimation(sAnimation + '_' + this.sId);
                },
                /*
                update: function(){},
                */
                destroy: function(){
                    delete this.oData.oAnimations[ this.oAnimation.sName ];
                    BattleEntity.prototype.destroy.call(this);
                },
                // Animations UNIQUE afin de ne pas sortir de l'écran en cas de PUSHBACK
                generateAnimation: function(sAnimation, oPosition){
                    const oPositionBox = Object.assign( {}, this.oParent.oAnimation.oFrame.oPositionBox ),
                        oAnim = Object.assign( {}, this.oData.oAnimations[sAnimation], { aFrames: [] } );

                    if( oPosition.nX ){
                        oPositionBox.nX -= oPosition.nX;
                    }
                    if( oPosition.nY ){
                        oPositionBox.nY -= oPosition.nY;
                    }

                    this.oData.oAnimations[sAnimation].aFrames.forEach( oFrame => {
                        oAnim.aFrames.push( Object.assign( {}, oFrame, { oPositionBox } ) );
                    } );
                    this.oData.oAnimations[ sAnimation + '_' + this.sId ] = oAnim;
                }
            }
        )
    }
);