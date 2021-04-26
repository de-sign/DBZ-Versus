/* Title */
function TitleScene(){
	this.oContext = null;
    this.oPress = null;
    this.nController = 0;
    this.nFrameCreated = 0;
}

Object.assign(
    TitleScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: TitleScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Title');

                    this.nController = GAME.oInput.nController;
                    this.nFrameCreated = GAME.oTimer.nFrames;
				},
				update: function(){
                    let bPress = false;
                    if( this.nController < GAME.oInput.nController ){
                        bPress = true;
                    } else {
                        for( let sController in ControllerManager.oController ){
                            const oController = GAME.oInput.getController(sController);
                            if( this.nFrameCreated < oController.nFrameChange ){
                                bPress = true;
                                break;
                            }
                        }
                    }

                    if( bPress ){
                        GAME.oOutput.oAudio.resume();
                        GAME.oOutput.getChannel('CHN__SFX').play('ADO__Validate');
                        GAME.oScene.change( new MenuScene() );
                    }
				}
            }
        )
    }
);