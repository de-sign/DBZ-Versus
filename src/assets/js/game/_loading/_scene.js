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

        add: function(sType, sSrc, fCallback){
            let oAsset = null,
                sEvent = '';
            const fListener = () => {
                if( fCallback ){
                    fCallback(oAsset).then( () => this.nLoading++ );
                } else {
                    this.nLoading++;
                }
                oAsset.removeEventListener(sEvent, fListener, false);
            };

            switch( sType ){
                case 'image':
                    oAsset = new Image();
                    sEvent = 'load';
                    oAsset.src = sSrc;
                    break;
                case 'audio':
                    oAsset = new Audio();
                    sEvent = 'canplaythrough';
                    oAsset.src = sSrc;
                    break;
                default:
                    oAsset = new XMLHttpRequest();
                    oAsset.open('GET', sSrc, true);
                    oAsset.responseType = sType;
                    sEvent = 'load';
                    oAsset.send();
                    break;
            }

            this.aLoading.push(oAsset);
            oAsset.addEventListener(sEvent, fListener, false);
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
				init: function( oOptions ){
                    Scene.prototype.init.call(this, 'CTX__Loading');
					this.oLayer = OutputManager.getElement('LAY__LoadingStep');
                    this.oLayer.clean();

                    this.aStep = oOptions.aStep;
                    this.sRedirection = oOptions.sRedirection;

                    this.oAssetManager = new LoadingAssetsManager( () => {
                        this.bStepEnd = true;
                    } );
				},
				update: function(){
                    if( !this.sCurrent ){
                        this.sCurrent = this.aStep[this.nStep];
                        if( this.sCurrent ){
                            this[this.sCurrent]();
                        } else {
                            SceneManager.change( new window[ this.sRedirection + 'Scene']() );
                        }
                    }
                    else if( this.bStepEnd ){
                        this.bStepEnd = false;
                        this.nStep++;
                        this.sCurrent = null;
                    }

                    this.sCurrent && this.oAssetManager.update();
				},

                addStepText: function(sText){
                    if( LoadingScene.nStepPrint == this.oLayer.aChildElement.length ){
                        this.oLayer.delete( this.oLayer.aChildElement[0] );
                    }
                    this.oLayer.add( new OutputManager.OutputText(sText) );
                }
            }
        )
    }
);