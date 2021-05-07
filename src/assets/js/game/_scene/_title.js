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

                    this.nController = ControllerManager.nController;
                    this.nFrameCreated = TimerEngine.nFrames;
				},
				update: function(){
                    let bPress = false;
                    if( this.nController < ControllerManager.nController ){
                        bPress = true;
                    } else {
                        for( let sController in ControllerManager.oController ){
                            const oController = ControllerManager.getController(sController);
                            if( this.nFrameCreated < oController.nFrameChange ){
                                bPress = true;
                                break;
                            }
                        }
                    }

                    if( bPress ){
                        OutputManager.oAudio.resume();
                        OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                        SceneManager.change( new MenuScene() );
                    }
				}
            }
        )
    }
);