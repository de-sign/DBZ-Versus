/* ----- BattleHUD ----- */
function BattleHUD(oPlayer){
    this.oLayer = null;
    this.oPlayer = null;

    this.nLife = -1;
    this.nLastLife = -1;
    this.nKi = -1;
    this.nRound = -1;

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
            const bResetLast = this.oPlayer.nHitting == 0 && this.nLastLife != this.nLife,
                nLife = Math.max(0, this.oPlayer.nLife);

            if( this.nLife != this.oPlayer.nLife || bResetLast ){
                this.nLife = this.oPlayer.nLife;
                bResetLast && (this.nLastLife = this.nLife);
                    
                OutputManager.getElement('LAY__Battle_HUD_Bar_Lose_' + this.oPlayer.nPlayer).setStyle( {
                    minWidth: ( (this.nLastLife - nLife) * 100 / GameSettings.oBattleElement.Player.nLife ) + '%'
                } );
                OutputManager.getElement('LAY__Battle_HUD_Bar_Life_' + this.oPlayer.nPlayer).setStyle( {
                    minWidth: ( nLife * 100 / GameSettings.oBattleElement.Player.nLife ) + '%'
                } );
            }

            if( this.nKi != this.oPlayer.nKi ){
                this.nKi = this.oPlayer.nKi;
                const nKiBar = (this.nKi % GameSettings.oKi.nBar),
                    nDisplayBar = nKiBar || (
                        this.nKi == GameSettings.oKi.nMax ?
                        GameSettings.oKi.nBar :
                        0
                    );

                OutputManager.getElement('TXT__Battle_HUD_Ki_Number_' + this.oPlayer.nPlayer).setText( Math.floor(this.nKi / GameSettings.oKi.nBar) );
                OutputManager.getElement('LAY__Battle_HUD_Ki_Bar_' + this.oPlayer.nPlayer).setStyle( {
                    minWidth: ( nDisplayBar * 100 / GameSettings.oKi.nBar ) + '%'
                } );
            }

            if( this.nRound != this.oPlayer.nRound ){
                OutputManager.getElement('LAY__Battle_HUD_Round_' + this.oPlayer.nPlayer).aChildElement.forEach(  (oText, nIndex) => {
                    oText.addTickUpdate( () => {
                        oText.hElement.classList[ nIndex < this.oPlayer.nRound ? 'add' : 'remove']('--show');
                    } );
                } );
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
                this.aInfo = [];
                this.hide(true);
                this.oContext.update();
            },

            add: function(){
                [...arguments].forEach( oOptions => {
                    this.aInfo.push( {
                        nFrames: 1,
                        nLength: oOptions.nLength || BattleInfo.nLength,
                        sImg: oOptions.sImg || null,
                        sText: oOptions.sText || '',
                        sDirection: oOptions.sDirection || 'center',
                        bFreeze: oOptions.bFreeze || false,
                        fCallback: oOptions.fCallback || null
                    } );
                } );
            },
            show: function(){
                if( !this.oCurrent && this.aInfo.length ){
                    const oCurrent = this.oCurrent = this.aInfo.shift();
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
                    // Show
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.remove('--info-left', '--info-center', '--info-right', '--info-blank');
                        this.oContext.hElement.classList.add('--info', '--info-' + oCurrent.sDirection, oCurrent.sText ? '--info-text' : '--info-blank');
                    } );
                }
            },
            hide: function(bDestroy){
                // Hide
                if( this.oCurrent || bDestroy ){
                    const fCallback = !bDestroy && this.oCurrent && this.oCurrent.fCallback;
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
                this.aLast.push( {
                    nHit: 0,
                    nLastLife: oPlayer.nLife
                } );
            } );
        },
        update: function(){
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( this.aLast[nIndex] != oPlayer.nHitting ){
                    oPlayer.nHitting || (this.aLast[nIndex].nLastLife = oPlayer.nLife);
                    this.aLast[nIndex].nHit = oPlayer.nHitting;
                    this[ oPlayer.nHitting ? 'show' : 'hide' ](nIndex);
                }
            } );
        },
        destroy: function(){
        },

        show: function(nIndex){
            const oText = this.aText[nIndex];
            oText.setText(
                this.aLast[nIndex].nHit + ' hits !'
                + '<i>' + ( this.aLast[nIndex].nLastLife - this.aPlayer[nIndex].nLife ) + ' damages</i>'
            );
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