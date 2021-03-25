function InitializeAssetsManager(fCallback){
    this.nLoading = 0;
    this.aLoading = [];
    this.fCallback = null;

    this.init(fCallback);
}

Object.assign(
    InitializeAssetsManager.prototype, {
        constructor: InitializeAssetsManager,
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

function InitializeScene(){
	this.oContext = null;
    this.oLayer = null;

    this.sCurrent = null;
    this.nStep = 0;
    this.bStepEnd = false;
}

Object.assign(
    InitializeScene, {

        aStep: [
            'stepContext_Settings',
            'stepContext_Select',
            'stepContext_Battle',

            'stepImage_Stage',
            'stepImage_Face',
            'stepImage_Character'
        ],
        nStepPrint: 5,

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: InitializeScene,
				init: function(){
					GAME.oOutput.useContext('CTX__Initialize');
					this.oContext = GAME.oOutput.getElement('CTX__Initialize');
					this.oLayer = GAME.oOutput.getElement('LAY__InitializeStep');

                    this.aAssetManager = new InitializeAssetsManager( () => {
                        this.bStepEnd = true;
                    } );
				},
				update: function(){
                    if( !this.sCurrent ){
                        this.sCurrent = InitializeScene.aStep[this.nStep];
                        if( this.sCurrent ){
                             this[this.sCurrent]();
                        } else {
                            GAME.oScene.change( new MenuScene() );
                        }
                    }
                    else if( this.bStepEnd ){
                        this.bStepEnd = false;
                        this.nStep++;
                        this.sCurrent = null;
                    }

                    this.aAssetManager.update();
				},
                destroy: function(){
                },

                addStepText: function(sText){
                    if( InitializeScene.nStepPrint == this.oLayer.aChildElement.length ){
                        this.oLayer.delete( this.oLayer.aChildElement[0] );
                    }
                    this.oLayer.add( new GAME.oOutput.OutputText(sText) );
                },

                // Image
                stepImage_Stage: function(){
                    this.addStepText( 'Loading preview stages' );
                    for( let sStage in GAME.oData.oStage ){
                        this.aAssetManager.add( GAME.oSettings.oPath.oStage.sPreview + '/' + sStage + '.png' );
                    }
                },
                stepImage_Face: function(){
                    this.addStepText( 'Loading face characters' );
                    for( let sChar in GAME.oData.oCharacter ){
                        this.aAssetManager.add( GAME.oSettings.oPath.oCharacter.sFace + '/' + sChar + '.png' );
                    }
                },
                stepImage_Character: function(){
                    this.addStepText( 'Loading preview characters' );
                    for( let sChar in GAME.oData.oCharacter ){
                        this.aAssetManager.add( GAME.oSettings.oPath.oCharacter.sPreview + '/' + sChar + '.png' );
                    }
                }
            }
        )
    }
);