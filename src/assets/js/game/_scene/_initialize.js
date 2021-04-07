function InitializeScene(){
    LoadingScene.apply(this, arguments);
}

Object.assign(
    InitializeScene, {
        prototype: Object.assign(
            Object.create(LoadingScene.prototype), {
                constructor: InitializeScene,
				init: function(oLastData){
                    LoadingScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sRedirection: 'Menu',
                            aStep: [
                                'stepData',
                    
                                'stepComponent_Helper',
                    
                                'stepContext_Settings',
                                'stepContext_Side',
                                'stepContext_Select',
                                'stepContext_Battle',
                    
                                'stepImage_Stage',
                                'stepImage_Face',
                                'stepImage_Character',

                                'stepInput_Gamepad'
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
                    for( let sStage in GAME.oData.oStage ){
                        this.oAssetManager.add( GAME.oSettings.oPath.oStage.sPreview + '/' + sStage + '.png' );
                    }
                },
                stepImage_Face: function(){
                    this.addStepText( 'Loading face characters' );
                    for( let sChar in GAME.oData.oCharacter ){
                        const oChar = GAME.oData.oCharacter[sChar];
                        oChar.aColor.forEach( oColor => {
                            this.oAssetManager.add( oColor.oPath.sFace );
                        } );
                    }
                },
                stepImage_Character: function(){
                    this.addStepText( 'Loading preview characters' );
                    for( let sChar in GAME.oData.oCharacter ){
                        const oChar = GAME.oData.oCharacter[sChar];
                        oChar.aColor.forEach( oColor => {
                            this.oAssetManager.add( oColor.oPath.sFace );
                        } );
                    }
                },

                // Gamepad
                stepInput_Gamepad: function(){
                    window.addEventListener('gamepadconnected', oEvent => {
                        if( !GamepadController.oIndexCreate[oEvent.gamepad.index] ){
                            if( oEvent.gamepad.mapping == 'standard' ){
                                const oGamepad = GamepadController.recover( oEvent.gamepad, GAME.oSettings.oController.oGamepad );
                                InitializeSettings.createController(oGamepad.sId);
                                InitializeSide.createController(oGamepad.sId);
                                console.log(oEvent.gamepad.id);
                            } else {
                                alert('Unable to set up new device detected "' + oEvent.gamepad.id + '"');
                                GamepadController.oIndexCreate[oEvent.gamepad.index];
                            }
                        }
                    }, false);
                }
            }
        )
    }
);