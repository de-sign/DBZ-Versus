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
                    // oLastData: sStageSelected, sTypeBattle, aCharacterSelected, aColorSelected
                    LoadingScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sRedirection: oLastData.sTypeBattle,
                            aStep: [
                                'stepImage_Stage',
                                'stepImage_Character',
                                'stepImage_Character',
                                'stepImage_Entity'
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
                    const oChar = GAME.oData.oCharacter[ this.oData.aCharacterSelected[this.nCharacter] ][ this.oData.aColorSelected[this.nCharacter] ];
                    this.addStepText( 'Loading frames ' + oChar.sName );
                    for( let sFrame in oChar.oFrames ){
                        this.oAssetManager.add(oChar.oPath.sFrames + '/' + oChar.oFrames[sFrame].sPath);
                    }
                    this.nCharacter++;
                },
                stepImage_Entity: function(){
                    this.addStepText( 'Loading frames Entity' );
                    this.oData.aCharacterSelected.forEach( (sChar, nIndex) => {
                        const oChar = GAME.oData.oCharacter[sChar][ this.oData.aColorSelected[nIndex] ];

                        oChar.oCommands.aOffense.forEach( oCommand => {
                            if( oCommand.oEntity ){
                                const oEntity = GAME.oData['o' + oCommand.oEntity.sType][oCommand.oEntity.sEntity || 'ALL'][oChar.sEntityColor];
                                for( let sFrame in oEntity.oFrames ){
                                    this.oAssetManager.add(oEntity.oPath.sFrames + '/' + oEntity.oFrames[sFrame].sPath);
                                }
                            }
                        } );
                    } );
                }
            }
        )
    }
);