/* Loading */
function PreBattleScene(){
    this.nCharacter = 0;
    LoadingScene.apply(this, arguments);
}

Object.assign(
    PreBattleScene, {
        prototype: Object.assign(
            Object.create(LoadingScene.prototype), {
                constructor: PreBattleScene,
				init: function( oLastData ){
                    // oLastData: sStageSelected, sTypeBattle, bAllPlayerActive, aCharacterSelected, aColorSelected

                    LoadingScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sRedirection: oLastData.sTypeBattle,
                            aStep: [
                                'stepImage_Stage',
                                'stepImage_Character',
                                'stepImage_Character'
                            ]
                        }
                    );

                    this.addStepText('Loading ' + this.oData.sTypeBattle);
				},
                /*
				update: function(){},
                destroy: function(){},
                */
                
                // Image
                stepImage_Stage: function(){
                    this.addStepText( 'Loading background stage' );
                    this.oAssetManager.add( GAME.oSettings.oPath.oStage.sBackground + '/' + this.oData.sStageSelected + '.png' );
                },
                stepImage_Character: function(){
                    const oChar = GAME.oData.oCharacter[ this.oData.aCharacterSelected[this.nCharacter] ],
                        oColor = oChar.aColor[ this.oData.aColorSelected[this.nCharacter] ];
                    
                    this.addStepText( 'Loading frames ' + oColor.sName );
                    for( let sFrame in oChar.oFrames ){
                        this.oAssetManager.add(oChar.oPath[oColor.sCod].sFrames + '/' + oChar.oFrames[sFrame].sPath);
                    }
                    this.nCharacter++;
                }
            }
        )
    }
);