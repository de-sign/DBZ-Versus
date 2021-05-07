function InitializeScene(){
    LoadingScene.apply(this, arguments);
}

Object.assign(
    InitializeScene, {
        prototype: Object.assign(
            Object.create(LoadingScene.prototype), {
                constructor: InitializeScene,
				init: function(){
                    LoadingScene.prototype.init.call(
                        this,
                        {
                            sRedirection: 'Title',
                            aStep: [
                                'stepData',
                    
                                'stepComponent_Helper',
                    
                                'stepContext_Side',
                                'stepContext_Select',
                                'stepContext_Stage',
                                'stepContext_Battle',
                                'stepContext_Setting',
                                'stepContext_Input',
                    
                                'stepImage_Stage',
                                'stepImage_Face',
                                'stepImage_Character',

                                'stepInput_Gamepad',
                                'stepOutput_Audio'
                            ]
                        }
                    );

                    this.addStepText('Initialize Game');
				},
                /*
				update: function(){},
                destroy: function(){},
                */

                // Components
                stepComponent_Helper: function(){
                    setTimeout(
                        () => {
                            this.addStepText( 'Create component Helper' );
                            GameHelper.init('LAY__Helper');
                            this.bStepEnd = true;
                        }
                    )
                },

                // Image
                stepImage_Stage: function(){
                    this.addStepText( 'Loading preview stages' );
                    for( let sStage in GameData.oStage ){
                        this.oAssetManager.add('image', GameData.oStage[sStage].oPath.sPreview );
                    }
                },
                stepImage_Face: function(){
                    this.addStepText( 'Loading face characters' );
                    for( let sChar in GameData.oCharacter ){
                        const oChar = GameData.oCharacter[sChar];
                        oChar.aColor.forEach( oColor => {
                            this.oAssetManager.add('image', oChar[oColor.sColor].oPath.sFace );
                        } );
                    }
                },
                stepImage_Character: function(){
                    this.addStepText( 'Loading preview characters' );
                    for( let sChar in GameData.oCharacter ){
                        const oChar = GameData.oCharacter[sChar];
                        oChar.aColor.forEach( oColor => {
                            this.oAssetManager.add('image', oChar[oColor.sColor].oPath.sFace );
                        } );
                    }
                },

                // Gamepad
                stepInput_Gamepad: function(){
                    window.addEventListener('gamepadconnected', oEvent => {
                        if( !GamepadController.oIndexCreate[oEvent.gamepad.index] ){
                            if( oEvent.gamepad.mapping == 'standard' ){
                                const oGamepad = GamepadController.recover( oEvent.gamepad, GameData.oSettings.oController.oGamepad );
                                InitializeInput.createController(oGamepad.sId);
                                InitializeSide.createController(oGamepad.sId);
                                console.log(oEvent.gamepad.id);
                            } else {
                                alert('Unable to set up new device detected "' + oEvent.gamepad.id + '"');
                                GamepadController.oIndexCreate[oEvent.gamepad.index];
                            }
                        }
                    }, false);
                },

                // Gestion AUDIO
                stepOutput_Audio: function(){
                    this.addStepText( 'Loading audio' );
                    // LOADING BGM & SFX
                    for( let sChannel in GameData.oSettings.oAudio.oInitialize ){
                        const aAudio = GameData.oSettings.oAudio.oInitialize[sChannel],
                            oChannel = OutputManager.getChannel('CHN__' + sChannel);

                        aAudio.forEach( sAudio => {
                            switch( sChannel ){
                                case 'BGM':
                                    this.oAssetManager.add(
                                        'audio',
                                        GameData.oSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
                                        oAudio => {
                                            oChannel.add( new OutputManager.OutputSourceAudio('ADO__' + sAudio, oAudio) );
                                            return Promise.resolve();
                                        }
                                    );
                                    break;
                                case 'SFX':
                                    this.oAssetManager.add(
                                        'arraybuffer',
                                        GameData.oSettings.oPath.oAudio[ 's' + sChannel ] + '/' + sAudio + '.mp3',
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
                    // Gestion BLUR / FOCUS
                    window.addEventListener('visibilitychange', () => {
                        const oChannel = OutputManager.getChannel('CHN__BGM');
                        if( document.visibilityState == 'visible' ){
                            oChannel.play();
                        } else {
                            oChannel.pause();
                            oChannel.update();
                        }
                    }, false);
                }
            }
        )
    }
);