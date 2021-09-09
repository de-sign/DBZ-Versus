/* ----- BattleDisplayText ----- */
function BattleDisplayText(oScene, oOptions){
    this.oContext = null;
    this.aPlayer = null;
    this.oImg = null;
    this.oText = null;

    this.aText = [];
    this.oCurrent = 0;

    this.init(oScene, oOptions);
}

Object.assign(
    BattleDisplayText,
    {
        nLength: 60,
        
        prototype: {
            constructor: BattleDisplayText,
            init: function(oScene, oOptions) {
                this.oContext = oScene.oContext;
                this.aPlayer = oScene.aPlayer;
                
                this.oImg = OutputManager.getElement('SPT__Battle_Info_Sprite');
                this.oText = OutputManager.getElement('TXT__Battle_Info_Text');
                
                this.oView = OutputManager.getElement('LAY__Battle_Area');
                this.oView.enableAutoPositioning();
            },
            update: function(){
                if( this.oCurrent ){
                    if( this.oCurrent.nFrames <= this.oCurrent.nLength ){
                        this.oCurrent.nFrames++;
                    } else {
                        this.hide();
                    }
                }
                this.show();
            },
            destroy: function(){
                this.aText = [];
                this.hide(true);
                this.oContext.update();
            },

            add: function(){
                [...arguments].forEach( oOptions => {
                    this.aText.push( {
                        nFrames: 1,
                        nLength: oOptions.nLength || BattleDisplayText.nLength,
                        sImg: oOptions.sImg || null,
                        sText: oOptions.sText || '',
                        sDirection: oOptions.sDirection || 'center',
                        nSlow: oOptions.nSlow || null,
                        nZoom: oOptions.nZoom || 0,
                        oFocus: oOptions.oFocus || {
                            nX: 0,
                            nY: 0
                        },
                        bFreeze: oOptions.bFreeze || false,
                        fCallback: oOptions.fCallback || null
                    } );
                } );
            },
            show: function(){
                if( !this.oCurrent && this.aText.length ){
                    this.oCurrent = this.aText.shift();
                    // Image
                    if( this.oCurrent.sImg ){
                        this.oImg.setSource(this.oCurrent.sImg);
                        this.oImg.setStyle( { display: null } );
                    } else {
                        this.oImg.setStyle( { display: 'none' } );
                    }
                    // Text
                    this.oText.setText(this.oCurrent.sText);
                    // Freeze
                    if( this.oCurrent.bFreeze ){
                        BattleElement.get().forEach( oEntity => {
                            oEntity.setFreeze(this.oCurrent.nLength);
                        } );
                    }
                    // Slow
                    if( this.oCurrent.nSlow ){
                        this.oCurrent.nLastFPS = TimerEngine.nFPS;
                        TimerEngine.setFPS( Math.floor(TimerEngine.nFPS / this.oCurrent.nSlow) );
                    }
                    // Zoom
                    if( this.oCurrent.nZoom ){
                        this.oView.setPosition( {
                            scaleX: this.oCurrent.nZoom,
                            scaleY: this.oCurrent.nZoom,
                            originX: this.oCurrent.oFocus.nX + this.oView.oPosition.originX,
                            originY: this.oCurrent.oFocus.nY + this.oView.oPosition.originY
                        } );
                    }
                    // Show
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--info-left', '--info-center', '--info-right', '--info-blank');
                        this.oContext.hElement.classList.add('--info', '--info-' + this.oCurrent.sDirection, this.oCurrent.sText ? '--info-text' : '--info-blank');
                    } );
                }
            },
            hide: function(bDestroy){
                // Hide
                if( this.oCurrent || bDestroy ){
                    let fCallback = null,
                        nFPS = null;

                    if( this.oCurrent ){
                        fCallback = !bDestroy && this.oCurrent.fCallback;
                        nFPS = this.oCurrent.nLastFPS;
                    }
                    this.oCurrent = null;
                    
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--info');
                        nFPS && TimerEngine.setFPS(nFPS);
                        this.oView.resetPosition();
                        fCallback && fCallback();
                    } );
                }
            }
        }
    }
);