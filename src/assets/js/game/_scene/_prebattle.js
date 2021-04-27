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
				init: function(){
                    // oLastData: BTL__sStage, BTL__sType, BTL__aCharacter, BTL__aColor
                    LoadingScene.prototype.init.call(
                        this,
                        {
                            sRedirection: GAME.oScene.oTransverseData.BTL__sType,
                            aStep: [
                                'stepImage_Stage',
                                'stepImage_Character',
                                'stepImage_Character',
                                'stepImage_Entity',

                                'stepOutput_Audio'
                            ]
                        }
                    );

                    this.addStepText('Loading ' + GAME.oScene.oTransverseData.BTL__sType);
				},
                /*
				update: function(){},
                destroy: function(){},
                */
                
                // Image
                stepImage_Stage: function(){
                    this.addStepText( 'Loading background stage' );
                    this.oAssetManager.add('image', GAME.oData.oStage[GAME.oScene.oTransverseData.BTL__sStage].oPath.sBackground );
                },
                stepImage_Character: function(){
                    const oChar = GAME.oData.oCharacter[ GAME.oScene.oTransverseData.BTL__aCharacter[this.nCharacter] ][ GAME.oScene.oTransverseData.BTL__aColor[this.nCharacter] ];
                    this.addStepText( 'Loading frames ' + oChar.sName );
                    for( let sFrame in oChar.oFrames ){
                        this.oAssetManager.add('image', oChar.oPath.sFrames + '/' + oChar.oFrames[sFrame].sPath);
                    }
                    this.nCharacter++;
                },
                stepImage_Entity: function(){
                    this.addStepText( 'Loading frames Entity' );
                    GAME.oScene.oTransverseData.BTL__aCharacter.forEach( (sChar, nIndex) => {
                        const oChar = GAME.oData.oCharacter[sChar][ GAME.oScene.oTransverseData.BTL__aColor[nIndex] ];

                        oChar.oCommands.aOffense.forEach( oCommand => {
                            if( oCommand.oEntity ){
                                const oEntity = GAME.oData['o' + oCommand.oEntity.sType][oCommand.oEntity.sEntity || 'ALL'][oChar.sEntityColor];
                                for( let sFrame in oEntity.oFrames ){
                                    this.oAssetManager.add('image', oEntity.oPath.sFrames + '/' + oEntity.oFrames[sFrame].sPath);
                                }
                            }
                        } );
                    } );
                },

                // Audio
                stepOutput_Audio: function(){
                    this.addStepText( 'Loading audio' );
                    for( let sChannel in GAME.oSettings.oAudio.oPreBattle ){
                        const oChannel = GAME.oOutput.getChannel('CHN__' + sChannel),
                            aAudio = [...GAME.oSettings.oAudio.oPreBattle[sChannel]];
                            
                        if( sChannel == 'BGM' ){
                            aAudio.push( GAME.oScene.oTransverseData.BTL__sBGM );
                        }

                        aAudio.forEach( sAudio => {
                            switch( sChannel ){
                                case 'BGM':
                                    this.oAssetManager.add(
                                        'audio',
                                        GAME.oSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
                                        oAudio => {
                                            oChannel.add( new GAME.oOutput.OutputSourceAudio('ADO__' + sAudio, oAudio) );
                                            return Promise.resolve();
                                        }
                                    );
                                    break;
                                case 'SFX':
                                    this.oAssetManager.add(
                                        'arraybuffer',
                                        GAME.oSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
                                        oEvent => {
                                            return new Promise( fResolve => {
                                                GAME.oOutput.OutputAudioElement.oAudioContext.decodeAudioData(
                                                    oEvent.response, 
                                                    oBuffer => {
                                                        oChannel.add( new GAME.oOutput.OutputSourceBuffer('ADO__' + sAudio, oBuffer) );
                                                        fResolve();
                                                    },
                                                    () => fResolve()
                                                );
                                            } );
                                        }
                                    );
                                    break;
                            }
                        } );
                    }
                }
            }
        )
    }
);