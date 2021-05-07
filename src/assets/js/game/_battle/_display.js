/* ----- BattleHUD ----- */
function BattleHUD(oPlayer){
    this.oLayer = null;
    this.oPlayer = null;

    this.nLife = -1;
    this.nHitting = -1;
    this.nKi = -1;

    this.init(oPlayer);
}

Object.assign(
    BattleHUD.prototype, {
        init: function(oPlayer) {
            this.oPlayer = oPlayer;
            this.oLayer = OutputManager.getElement('LAY__Battle_HUD_' + this.oPlayer.nPlayer);

            this.oLayer.addTickUpdate( () => {
                OutputManager.getElement('SPT__Battle_HUD_Sprite_' + this.oPlayer.nPlayer)
                    .setSource( this.oPlayer.oData.oPath.sFace );
                OutputManager.getElement('TXT__Battle_HUD_Name_' + this.oPlayer.nPlayer)
                    .setText( this.oPlayer.oData.sName );
                OutputManager.getElement('TXT__Battle_HUD_Number_' + this.oPlayer.nPlayer)
                    .setText( 'Player #' + this.oPlayer.nPlayer );
            } );
        },
        update: function(){
            if( this.nLife != this.oPlayer.nLife || this.nHitting != this.oPlayer.nHitting ){
                this.oLayer.addTickUpdate( () => {
                    const oLayer = OutputManager.getElement('LAY__Battle_HUD_Life_' + this.oPlayer.nPlayer);
                    this.nLife = this.oPlayer.nLife;
                    this.nHitting = this.oPlayer.nHitting;

                    for( let nIndex = 0; nIndex < oLayer.aChildElement.length; nIndex++ ){
                        const oBar = oLayer.aChildElement[nIndex];
                        oBar.hElement.classList.remove('Battle__HUD_Bar_Life', 'Battle__HUD_Bar_Lose');
                        if( nIndex < this.nLife ){
                            oBar.hElement.classList.add('Battle__HUD_Bar_Life');
                        } else if( nIndex < this.nLife + this.nHitting ){
                            oBar.hElement.classList.add('Battle__HUD_Bar_Lose');
                        }
                    }
                } );
            }
            if( this.nKi != this.oPlayer.nKi ){
                const oLayer = OutputManager.getElement('LAY__Battle_HUD_Ki_' + this.oPlayer.nPlayer);
                this.nKi = this.oPlayer.nKi;

                for( let nIndex = 0; nIndex < oLayer.aChildElement.length; nIndex++ ){
                    const oBar = oLayer.aChildElement[nIndex];
                    oBar.hElement.classList.remove('Battle__HUD_Bar_Ki');
                    if( nIndex < this.nKi ){
                        oBar.hElement.classList.add('Battle__HUD_Bar_Ki');
                    }
                }
            }
        },
        destroy: function(){
        }
    }
);

/* ----- BattleInfo ----- */
function BattleInfo(oContext, aPlayer){
    this.oContext = null;
    this.aPlayer = null;
    this.oImg = null;
    this.oText = null;

    this.aInfo = [];
    this.oCurrent = 0;

    this.init(oContext, aPlayer);
}

Object.assign(
    BattleInfo,
    {
        nLength: 60,
        
        prototype: {
            constructor: BattleInfo,
            init: function(oContext, aPlayer) {
                this.oContext = oContext;
                this.aPlayer = aPlayer;
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
                this.hide();
                this.oContext.update();
            },

            add: function(){
                [...arguments].forEach( oOptions => {
                    this.aInfo.push( {
                        nFrames: 1,
                        nLength: oOptions.nLength || BattleInfo.nLength,
                        sImg: oOptions.sImg || null,
                        sText: oOptions.sText || '',
                        bFreeze: oOptions.bFreeze || false,
                        fCallback: oOptions.fCallback || null
                    } );
                } );
            },
            show: function(){
                if( !this.oCurrent && this.aInfo.length ){
                    this.oCurrent = this.aInfo.shift();
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
                        BattleEntity.get().forEach( oEntity => {
                            oEntity.setFreeze(this.oCurrent.nLength);
                        } );
                    }
                    // Show
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.add('--info');
                    } );
                }
            },
            hide: function(){
                // Hide
                if( this.oCurrent ){
                    const fCallback = this.oCurrent && this.oCurrent.fCallback;
                    this.oCurrent = null;
                    
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--info');
                        fCallback && fCallback();
                    } );
                }
            }
        }
    }
);

/* ----- BattleCombo ----- */
function BattleCombo(aPlayer){
    this.aPlayer = null;
    this.aText = [];
    this.aLast = [];

    this.init(aPlayer);
}

Object.assign(
    BattleCombo.prototype, {
        constructor: BattleCombo,
        init: function(aPlayer) {
            this.aPlayer = aPlayer;
            this.aPlayer.forEach( oPlayer => {
                this.aText.push( OutputManager.getElement('TXT__Battle_Combo_Text_' + oPlayer.nPlayer) );
                this.aLast.push(0);
            } );
        },
        update: function(){
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( this.aLast[nIndex] != oPlayer.nHitting ){
                    this[ oPlayer.nHitting > 1 ? 'show' : 'hide' ](nIndex, oPlayer.nHitting);
                    this.aLast[nIndex] = oPlayer.nHitting;
                }
            } );
        },
        destroy: function(){
        },

        show: function(nIndex, nHit){
            const oText = this.aText[nIndex];
            oText.setText( nHit + ' hits !' );
            oText.addTickUpdate( () => {
                oText.hElement.classList.add('--show');
                oText.hElement.classList.remove('--hide');
            } );
        },
        hide: function(nIndex){
            const oText = this.aText[nIndex];
            oText.addTickUpdate( () => {
                oText.hElement.classList.remove('--show');
                oText.hElement.classList.add('--hide');
            } );
        }
    }
);