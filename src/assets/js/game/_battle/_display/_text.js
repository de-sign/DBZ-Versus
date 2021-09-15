/* ----- BattleDisplayTextEntity ----- */
function BattleDisplayTextEntity(oText){
    GameTimer.call(this);

    this.oText = null;
    this.aStep = [];
    this.init(oText);
}

Object.assign(
    BattleDisplayTextEntity,
    {
        oDefault: {
            nLength: 60,
            nChar: 1,
            nFrameStep: 2
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleDisplayTextEntity,
                init: function(oText){
                    oText = Object.assign( {}, BattleDisplayTextEntity.oDefault, oText );
                    GameTimer.prototype.init.call(this, oText.nLength, oText.nDelay);
                    
                    if( oText.nFrameStep && oText.nChar ){
                        const aText = oText.sText.match( new RegExp('.{1,' + oText.nChar + '}', 'g') );

                        aText.forEach( (sStepText, nIndex) => {
                            const sText =  oText.sText.substring(0, nIndex * oText.nChar) + sStepText.toUpperCase();
                            this.aStep.push(
                                Object.assign( {}, oText, {
                                    sText,
                                    nFrame: oText.nFrameStep
                                } )
                            );
                        } );

                        this.aStep.push(
                            Object.assign( {}, oText, {
                                sText: oText.sText,
                                nFrame: oText.nLength - aText.length * oText.nFrameStep
                            } )
                        );
                    }
                    else {
                        this.aStep.push( {
                            sText: oText.sText,
                            nLength: oText.nLength
                        } );
                    }
                },
                update: function(){
                    let bUpdate = GameTimer.prototype.update.call(this);

                    if( bUpdate ){
                        let nFrameMax = 0,
                            oText = null;

                        for( let nIndex = 0; nIndex < this.aStep.length; nIndex++ ){
                            oText = this.aStep[nIndex];
                            if( oText.nFrame ){
                                nFrameMax += oText.nFrame;
                                if( this.nTick <= nFrameMax ){
                                    break;
                                }
                            } else {
                                break;
                            }   
                        }

                        if( this.oText != oText ){
                            this.oText = oText;
                            bUpdate = true;
                        }
                    }

                    return bUpdate;
                }
            }
        )
    }
);

/* ----- BattleDisplayText ----- */
function BattleDisplayText(oScene){
    this.oContext = null;
    this.aPlayer = null;
    this.oImg = null;
    this.oText = null;

    this.aText = [];
    this.oCurrent = 0;

    this.init(oScene);
}

Object.assign(
    BattleDisplayText.prototype,
    {
        constructor: BattleDisplayText,
        init: function(oScene) {
            this.oContext = oScene.oContext;
            this.aPlayer = oScene.aPlayer;
            
            this.oImg = OutputManager.getElement('SPT__Battle_Info_Sprite');
            this.oText = OutputManager.getElement('TXT__Battle_Info_Text');
        },
        update: function(){

            if( this.oCurrent ){
                const bUpdate = this.oCurrent.oEntity.update();
                if( this.oCurrent.oEntity.isEnd() ){
                    this.hide();
                }
                else if( bUpdate ){
                    this.oText.setText(this.oCurrent.oEntity.oText.sText);
                }
            }
            
            if( !this.oCurrent && this.aText.length ){
                this.show( this.aText.shift() );
                this.update();
            }
        },
        destroy: function(){
            this.aText = [];
            this.hide(true);
            this.oContext.update();
        },

        add: function(){
            [...arguments].forEach( oOptions => {
                this.aText.push( {
                    oEntity: new BattleDisplayTextEntity(oOptions),
                    oOptions: Object.assign(
                        {
                            sImg: null,
                            sDirection: 'center',
                            fCallback: null
                        },
                        oOptions
                    )
                } );
            } );
        },
        show: function(oText){
            this.oCurrent = oText;
            // Image
            if( oText.oOptions.sImg ){
                this.oImg.setSource(oText.oOptions.sImg);
                this.oImg.setStyle( { display: null } );
            } else {
                this.oImg.setStyle( { display: 'none' } );
            }
            // Show
            this.oContext.addTickUpdate( () => {
                this.oContext.hElement.classList.remove('--text-left', '--text-center', '--text-right');
                this.oContext.hElement.classList.add('--text', '--text-' + oText.oOptions.sDirection);
            } );
        },
        hide: function(bDestroy){
            // Hide
            if( this.oCurrent || bDestroy ){
                let fCallback = null;
                if( this.oCurrent ){
                    fCallback = !bDestroy && this.oCurrent.oOptions.fCallback;
                }
                this.oCurrent = null;
                
                this.oContext.addTickUpdate( () => {
                    this.oContext.hElement.classList.remove('--text');
                    fCallback && fCallback();
                } );
            }
        }
    }
);