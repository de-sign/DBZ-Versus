/* ----- BattleDisplayHUD ----- */
function BattleDisplayHUD(oScene, oOptions){
    this.aPlayer = null;
    this.aElement = [];
    this.aData = [];

    this.init(oScene, oOptions);
}

Object.assign(
    BattleDisplayHUD.prototype, {
        init: function(oScene, oOptions) {
            this.aPlayer = oScene.aPlayer;
            this.aPlayer.forEach( (oPlayer, nIndex) => {

                this.aElement.push( {
                    // Life
                    oLife: {
                        oCurrent: OutputManager.getElement('LAY__Battle_HUD_Bar_Life_' + oPlayer.nPlayer),
                        oLose: OutputManager.getElement('LAY__Battle_HUD_Bar_Lose_' + oPlayer.nPlayer)
                    },
                    // KI
                    oKi: {
                        oNumber: OutputManager.getElement('TXT__Battle_HUD_Ki_Number_' + oPlayer.nPlayer),
                        oBar: OutputManager.getElement('LAY__Battle_HUD_Ki_Bar_' + oPlayer.nPlayer),
                        oIcon: OutputManager.getElement('LAY__Battle_HUD_Ki_Icon_' + oPlayer.nPlayer)
                    },
                    // COMBO
                    oCombo: OutputManager.getElement('TXT__Battle_Combo_Text_' + oPlayer.nPlayer)
                } );

                this.aData.push( {
                    nLastCombo: 0,
                    nLife: -1,
                    nLastLife: -1,
                    nKi: -1,
                    nHit: 0
                } );

                OutputManager.getElement('LAY__Battle_HUD_' + oPlayer.nPlayer)
                    .addTickUpdate( () => {
                        OutputManager.getElement('SPT__Battle_HUD_Sprite_' + oPlayer.nPlayer)
                            .setSource( oPlayer.oData.oPath.sFace );
                        OutputManager.getElement('TXT__Battle_HUD_Name_' + oPlayer.nPlayer)
                            .setText( oPlayer.oData.sName );
                        OutputManager.getElement('TXT__Battle_HUD_Number_' + oPlayer.nPlayer)
                            .setText( 'Player #' + oPlayer.nPlayer );
                        OutputManager.getElement('LAY__Battle_HUD_Round_' + oPlayer.nPlayer)
                            .aChildElement.forEach( (oText, nRoundIndex) => {
                                oText.hElement.classList[ nRoundIndex < oOptions.aRound[nIndex] ? 'add' : 'remove']('--show');
                            } );
                    } );
            } );

            
        },
        update: function(){

            this.aPlayer.forEach( (oPlayer, nIndex) => {
                const oElement = this.aElement[nIndex],
                    oData = this.aData[nIndex];

                // Update LIFE
                const bNewCombo = oData.nLastCombo != oPlayer.oDamage.nFrameStart,
                    bResetLast = ( bNewCombo || oPlayer.oDamage.nHitting == 0 ) && oData.nLastLife != oData.nLife,
                    nLife = Math.max(0, oPlayer.nLife);

                if( oData.nLife != oPlayer.nLife || bResetLast ){
                    oData.nLife = oPlayer.nLife;
                    bResetLast && (oData.nLastLife = oData.nLife);
                        
                    oElement.oLife.oLose.setStyle( {
                        minWidth: ( (oData.nLastLife - nLife) * 100 / GameSettings.oBattleElement.Player.nLife ) + '%'
                    } );
                    oElement.oLife.oCurrent.setStyle( {
                        minWidth: ( nLife * 100 / GameSettings.oBattleElement.Player.nLife ) + '%'
                    } );
                }
    
                // Update KI
                if( oData.nKi != oPlayer.nKi ){
                    oData.nKi = oPlayer.nKi;
                    const nBar = Math.floor(oData.nKi / GameSettings.oKi.nBar);
    
                    oElement.oKi.oNumber.setText( /*bMax*/ oData.nKi == GameSettings.oKi.nMax ? 'Max' : nBar );
                    oElement.oKi.oBar.setStyle( {
                        minWidth: ( oData.nKi * 100 / GameSettings.oKi.nMax ) + '%'
                    } );

                    oElement.oKi.oIcon.addTickUpdate( () => {
                        oElement.oKi.oIcon.hElement.classList.remove('--icon_0', '--icon_1', '--icon_2', '--icon_3');
                        oElement.oKi.oIcon.hElement.classList.add('--icon_' + Math.min(3, nBar) );
                    } );
                }
    
                // Update Combo
                if( bNewCombo || oData.nHit != oPlayer.oDamage.nHitting ){
                    oData.nLastCombo = oPlayer.oDamage.nFrameStart;
                    oData.nHit = oPlayer.oDamage.nHitting;
                    
                    if( oPlayer.oDamage.nHitting ){
                        oElement.oCombo.setText(
                            oPlayer.oDamage.nHitting + ' hits !'
                            + '<i>' + oPlayer.oDamage.nDamage + ' damages</i>'
                        );
                        oElement.oCombo.addTickUpdate( () => {
                            oElement.oCombo.hElement.classList.add('--show');
                            oElement.oCombo.hElement.classList.remove('--hide');
                        } );
                    }
                    else {
                        oElement.oCombo.addTickUpdate( () => {
                            oElement.oCombo.hElement.classList.remove('--show');
                            oElement.oCombo.hElement.classList.add('--hide');
                        } );
                    }
                }
            } );
        },
        destroy: function(){
        }
    }
);