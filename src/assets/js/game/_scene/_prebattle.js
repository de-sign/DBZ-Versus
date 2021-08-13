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
                            sRedirection: SceneManager.oTransverseData.BTL__sType,
                            aStep: [
                                'stepImage_Stage',
                                'stepImage_Character',
                                'stepImage_Character',
                                'stepImage_Entity',

                                'stepOutput_Audio'
                            ]
                        }
                    );

                    this.addStepText('Loading ' + SceneManager.oTransverseData.BTL__sType);
				},
                /*
				update: function(){},
                destroy: function(){},
                */
                
                // Image
                stepImage_Stage: function(){
                    this.addStepText( 'Loading background stage' );
                    this.oAssetManager.add('image', GameData.oStage[SceneManager.oTransverseData.BTL__sStage].oPath.sBackground );
                },
                stepImage_Character: function(){
                    const oChar = GameData.oCharacter[ SceneManager.oTransverseData.BTL__aCharacter[this.nCharacter] ][ SceneManager.oTransverseData.BTL__aColor[this.nCharacter] ];
                    this.addStepText( 'Loading frames ' + oChar.sName );
                    for( let sFrame in oChar.oFrames ){
                        if(oChar.oFrames[sFrame].sPath){
                            this.oAssetManager.add('image', oChar.oPath.sFrames + '/' + oChar.oFrames[sFrame].sPath);
                        } else {
                            console.log(sFrame, 'Impossible de charger une image sans chemin !', oChar, oChar.oFrames[sFrame]);
                        }
                    }
                    this.nCharacter++;
                },
                stepImage_Entity: function(){
                    this.addStepText( 'Loading frames Entity' );

                    // Effects
                    for( let sFrame in GameData.oEntity.oEffect.oFrames ){
                        this.oAssetManager.add('image', GameData.oEntity.oEffect.oPath.sFrames + '/' + GameData.oEntity.oEffect.oFrames[sFrame].sPath);
                    }

                    // Characters
                    SceneManager.oTransverseData.BTL__aCharacter.forEach( (sChar, nIndex) => {
                        const oChar = GameData.oCharacter[sChar][ SceneManager.oTransverseData.BTL__aColor[nIndex] ];

                        for( let sCommandType in oChar.oCommands ){
                            oChar.oCommands[sCommandType].forEach( oCommand => {
                                if( oCommand.oGatling && oCommand.oGatling.aEntity ){
                                    oCommand.oGatling.aEntity.forEach( oCommandEntity => {
                                        if( GameSettings.oBattleElement[ oCommandEntity.sType ].bPreload ){
                                            const oEntity = GameData[ 'o' + oCommandEntity.sType[0].toUpperCase() + oCommandEntity.sType.slice(1) ][ oCommandEntity.sEntity || 'ALL' ][ oCommandEntity.sColor || oChar.sEntityColor ];
                                            for( let sFrame in oEntity.oFrames ){
                                                this.oAssetManager.add('image', oEntity.oPath.sFrames + '/' + oEntity.oFrames[sFrame].sPath);
                                            }
                                        }
                                    } );
                                }
                            } );
                        }
                    } );
                },

                // Audio
                stepOutput_Audio: function(){
                    this.addStepText( 'Loading audio' );
                    for( let sChannel in GameSettings.oAudio.oPreBattle ){
                        const oChannel = OutputManager.getChannel('CHN__' + sChannel),
                            aAudio = [...GameSettings.oAudio.oPreBattle[sChannel]];
                            
                        if( sChannel == 'BGM' ){
                            aAudio.push( SceneManager.oTransverseData.BTL__sBGM );
                        }

                        aAudio.forEach( sAudio => {
                            switch( sChannel ){
                                case 'BGM':
                                    this.oAssetManager.add(
                                        'audio',
                                        GameSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
                                        oAudio => {
                                            oChannel.add( new OutputManager.OutputSourceAudio('ADO__' + sAudio, oAudio) );
                                            return Promise.resolve();
                                        }
                                    );
                                    break;
                                case 'SFX':
                                    this.oAssetManager.add(
                                        'arraybuffer',
                                        GameSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
                                        oEvent => {
                                            return new Promise( fResolve => {
                                                OutputManager.OutputAudioElement.oAudioContext.decodeAudioData(
                                                    oEvent.response, 
                                                    oBuffer => {
                                                        oChannel.add( new OutputManager.OutputSourceBuffer('ADO__' + sAudio, oBuffer) );
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