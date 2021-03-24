function InitializeScene(){
	this.oContext = null;
    this.oData = null;

    this.bEnd = false;

    this.nLoading = 0;
    this.aLoading = [];
}

Object.assign(
    InitializeScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: InitializeScene,
				init: function(){
					GAME.oOutput.useContext('CTX__Initialize');
					this.oContext = GAME.oOutput.getElement('CTX__Initialize');

                    this.loadStages();
                    this.loadCharacters();
				},
				update: function(){
                    this.bEnd && GAME.oScene.change( new MenuScene() );
				},
                destroy: function(){
                },

                loadStages: function(){
                    // this.addImage(GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png');
                },
                loadCharacters: function(){
                    /*
                    const aUniqueChar = aCharacter.filter( (item, pos) => {
                        return aCharacter.indexOf(item) == pos;
                    } );
                    aUniqueChar.forEach( sCod => {
                        const oChar = GAME.oData.oCharacter[sCod];
                        for( let sFrame in oChar.oFrames ){
                            this.addImage(GAME.oSettings.oPath.oCharacter.sFrames + '/' + oChar.sCod + '/' + oChar.oFrames[sFrame].sPath);
                        }
                    } );
                    */
                },
                addImage: function(sSrc){
                    let oImg = new Image;
                    oImg.addEventListener('load', () => this.nLoading++, false);
                    oImg.src = sSrc;

                    this.aLoading.push(oImg);
                }
            }
        )
    }
);