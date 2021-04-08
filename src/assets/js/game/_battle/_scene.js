/* ----- BattleScene ----- */
function BattleScene(){
	this.oContext = null;
    this.oInfo = null;
	this.oArea = null;
    
    this.aPlayer = [];
    this.aHUD = [];

    this.oEngine = null;
    this.oTraining = null;
}

Object.assign(
    BattleScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: BattleScene,
				init: function( oLastData, oOptions ){
                    /*
                        oLastData: sStageSelected, sTypeBattle, aController, aCharacterSelected, aColorSelected
                        oOptions: aController, sContextClass
                    */
					GAME.oOutput.useContext('CTX__Battle');
					this.oContext = GAME.oOutput.getElement('CTX__Battle');
                    this.oContext.hElement.classList.add( oOptions.sContextClass );

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.oArea.enableAutoPositioning();
                    this.setBackground( oLastData.sStageSelected );

                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        const nPlayer = nIndex + 1,
                            oPlayer = new BattlePlayer(
                                nPlayer,
                                oLastData.aCharacterSelected[nIndex],
                                oLastData.aColorSelected[nIndex],
                                oOptions.aController[nIndex],
                                false
                            );
                        oPlayer.oLayer.oPosition.nX += GAME.oSettings.nDistance * (nIndex ? 1 : -1)
                        this.aPlayer.push(oPlayer);
                        
                        // HUD init
                        this.aHUD.push( new BattleHUD(oPlayer) );
                    }

                    // Engine init
                    this.oInfo = new BattleInfo(this.oContext, this.aPlayer);
                    this.oCombo = new BattleCombo(this.aPlayer);
                    this.oEngine = new BattleEngine(this.aPlayer, this.oArea);
				},
				update: function(){
                    BattleEntity.get().forEach( oEntity => oEntity.update() );
                    this.endBattle( this.oEngine.update() );
                    BattleEntity.get().forEach( oEntity => oEntity.render() );

                    this.oInfo.update();
                    this.aHUD.forEach( oHUD => oHUD.update() );
                    this.oCombo.update();
				},
                destroy: function(){
                    BattleEntity.get().forEach( oEntity => oEntity.destroy() );
                },

                endBattle: function(aPlayerWin){
                },
                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png")'
                    } );
                }
            }
        )
    }
);