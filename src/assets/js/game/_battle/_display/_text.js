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
                    // Show
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--text-left', '--text-center', '--text-right');
                        this.oContext.hElement.classList.add('--text', '--text-' + this.oCurrent.sDirection);
                    } );
                }
            },
            hide: function(bDestroy){
                // Hide
                if( this.oCurrent || bDestroy ){
                    let fCallback = null;
                    if( this.oCurrent ){
                        fCallback = !bDestroy && this.oCurrent.fCallback;
                    }
                    this.oCurrent = null;
                    
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--text');
                        fCallback && fCallback();
                    } );
                }
            }
        }
    }
);