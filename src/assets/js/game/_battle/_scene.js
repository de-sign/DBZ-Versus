/* ----- BattleScene ----- */
function BattleScene(){
	this.oContext = null;
    this.oInfo = null;
	this.oArea = null;
    this.oTimer = null;
    
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
				init: function( oOptions ){
                    /*
                        oLastData: BTL__sStage, sTypeBattle, aController, BTL__aCharacterSelected, BTL__aColor
                        oOptions: aSourceBuffer, sContextClass, sAnimation, nTimer
                    */
                    Scene.prototype.init.call(this, 'CTX__Battle');
                    this.oContext.hElement.classList.add( oOptions.sContextClass );

					this.oArea = OutputManager.getElement('LAY__Battle_Area');
                    this.oArea.enableAutoPositioning();
                    this.setBackground( SceneManager.oTransverseData.BTL__sStage );
                    OutputManager.getChannel('CHN__BGM').play('ADO__' + SceneManager.oTransverseData.BTL__sBGM, false, true);

                    for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        const nPlayer = nIndex + 1,
                            oPlayer = new BattlePlayer(
                                nPlayer,
                                SceneManager.oTransverseData.BTL__aCharacter[nIndex],
                                SceneManager.oTransverseData.BTL__aColor[nIndex],
                                oOptions.sAnimation,
                                GameSettings.oSide.aSide[ GameSettings.oSide.nDefault ].fPosition(nIndex, false, this.oArea),
                                !!nIndex,
                                oOptions.aSourceBuffer[nIndex],
                                SceneManager.oTransverseData.BTL__aRound[nIndex]
                            );
                        this.aPlayer.push(oPlayer);
                        
                        // HUD init
                        this.aHUD.push( new BattleHUD(oPlayer) );
                    }

                    // Engine init
                    this.oInfo = new BattleInfo(this.oContext, this.aPlayer);
                    this.oCombo = new BattleCombo(this.aPlayer);
                    this.oTimer = new BattleTimer(oOptions.nTimer);
                    this.oEngine = new BattleEngine(this.aPlayer, this.oArea, this.oTimer);
				},
				update: function(){
                    // Entity
                    const aNewEntity = [];
                    BattleEntity.get().forEach( oEntity => oEntity.update(this.oEngine) );
                    // Engine
                    this.endBattle( this.oEngine.update() );
                    // Display
                    BattleEntity.get().forEach( oEntity => oEntity.render() );
                    this.aHUD.forEach( oHUD => oHUD.update() );
                    this.oTimer.update();
                    this.oInfo.update();
                    this.oCombo.update();
				},
                destroy: function(){
                    BattleEntity.get().forEach( oEntity => oEntity.destroy() );
                    this.oInfo.destroy();
                },

                endBattle: function(oEndGame){},
                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GameData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GameData.oStage[sCod].oPath.sBackground + '")'
                    } );
                }
            }
        )
    }
);