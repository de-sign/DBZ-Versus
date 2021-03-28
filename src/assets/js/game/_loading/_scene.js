function LoadingAssetsManager(fCallback){
    this.nLoading = 0;
    this.aLoading = [];
    this.fCallback = null;

    this.init(fCallback);
}

Object.assign(
    LoadingAssetsManager.prototype, {
        constructor: LoadingAssetsManager,
        init: function(fCallback){
            this.fCallback = fCallback;
        },
        update: function(){
            if( this.aLoading.length == this.nLoading ){
                this.fCallback();
            }
        },
        destroy: function(){
        },

        add: function(sSrc){
            let oImg = new Image;
            this.aLoading.push(oImg);

            oImg.addEventListener('load', () => this.nLoading++, false);
            oImg.src = sSrc;
        }
    }
);

function LoadingScene(){
	this.oContext = null;
    this.oLayer = null;
    this.oAssetManager = null;

    this.sCurrent = null;
    this.aStep = null;
    this.nStep = 0;
    this.bStepEnd = false;

    this.sRedirection = '';
}

Object.assign(
    LoadingScene, {
        nStepPrint: 6,

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: LoadingScene,
				init: function( oLastData, oOptions ){
					GAME.oOutput.useContext('CTX__Loading');
					this.oContext = GAME.oOutput.getElement('CTX__Loading');
					this.oLayer = GAME.oOutput.getElement('LAY__LoadingStep');
                    this.oLayer.clean();

                    this.aStep = oOptions.aStep;
                    this.sRedirection = oOptions.sRedirection;

                    this.oAssetManager = new LoadingAssetsManager( () => {
                        this.bStepEnd = true;
                    } );

                    this.oData = oLastData;
				},
				update: function(){
                    if( !this.sCurrent ){
                        this.sCurrent = this.aStep[this.nStep];
                        if( this.sCurrent ){
                            this[this.sCurrent]();
                        } else {
                            GAME.oScene.change( new window[ this.sRedirection + 'Scene']() );
                        }
                    }
                    else if( this.bStepEnd ){
                        this.bStepEnd = false;
                        this.nStep++;
                        this.sCurrent = null;
                    }

                    this.oAssetManager.update();
				},
                destroy: function(){
                    return this.oData;
                },

                addStepText: function(sText){
                    if( LoadingScene.nStepPrint == this.oLayer.aChildElement.length ){
                        this.oLayer.delete( this.oLayer.aChildElement[0] );
                    }
                    this.oLayer.add( new GAME.oOutput.OutputText(sText) );
                }
            }
        )
    }
);