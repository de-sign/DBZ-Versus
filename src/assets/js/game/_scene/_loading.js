/* Loading */
function LoadingScene(){
	this.oContext = null;
    this.oData = null;

    this.nLoading = 0;
    this.aLoading = [];
}

Object.assign(
    LoadingScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: LoadingScene,
				init: function( oLastData ){
                    // oLastData: sStageSelected, sTypeBattle, bAllPlayerActive, aCharacterSelected, aColorSelected

					GAME.oOutput.useContext('CTX__Loading');
					this.oContext = GAME.oOutput.getElement('CTX__Loading');

                    this.loadStage( oLastData.sStageSelected );
                    this.loadCharacter( oLastData.aCharacterSelected, oLastData.aColorSelected );
                    this.oData = oLastData;
				},
				update: function(){
                    if( this.aLoading.length == this.nLoading ){
                        GAME.oScene.change( new window[ this.oData.sTypeBattle + 'Scene' ]() );
                    }
				},
                destroy: function(){
                    return this.oData;
                },

                loadStage: function(sCod){
                    this.add(GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png');
                },
                loadCharacter: function(aCharacter, aColor){
                    aCharacter.forEach( (sChar, nIndex) => {
                        const oChar = GAME.oData.oCharacter[sChar],
                            sColor = oChar.aColor[ aColor[nIndex] ].sCod;
                        for( let sFrame in oChar.oFrames ){
                            this.add(oChar.oPath[sColor].sFrames + '/' + oChar.oFrames[sFrame].sPath);
                        }
                    } );
                },
                add: function(sSrc){
                    let oImg = new Image;
                    oImg.addEventListener('load', () => this.nLoading++, false);
                    oImg.src = sSrc;

                    this.aLoading.push(oImg);
                }
            }
        )
    }
);