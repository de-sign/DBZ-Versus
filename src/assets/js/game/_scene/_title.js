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
				init: function( oLastData ){
					GAME.oOutput.useContext('CTX__Title');
					this.oContext = GAME.oOutput.getElement('CTX__Title');

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

                    bPress && GAME.oScene.change( new MenuScene() );
				},
                destroy: function(){}
            }
        )
    }
);