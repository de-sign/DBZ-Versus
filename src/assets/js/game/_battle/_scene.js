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
					this.oContext = GAME.oOutput.oViewport.useContext('CTX__Battle');
                    this.oContext.hElement.classList.add( oOptions.sContextClass );

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.oArea.enableAutoPositioning();
                    this.setBackground( oLastData.sStageSelected );
                    GAME.oOutput.getChannel('CHN__BGM').play('ADO__' + oLastData.sStageSelected, false, true);

                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        const nPlayer = nIndex + 1,
                            oPlayer = new BattlePlayer(
                                nPlayer,
                                oLastData.aCharacterSelected[nIndex],
                                oLastData.aColorSelected[nIndex],
                                GAME.oSettings.oSide.aSide[ GAME.oSettings.oSide.nDefault ].fPosition(this.oArea, nIndex),
                                !!nIndex,
                                oOptions.aController[nIndex]
                            );
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