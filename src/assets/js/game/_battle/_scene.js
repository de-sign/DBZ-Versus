/* ----- BattleScene ----- */
function BattleScene(){
	this.oContext = null;

    this.oArea = null;
    this.aPlayer = [];

    this.oTimer = null;
    this.oEngine = null;
    this.oDisplay = null;
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

					this.oArea = OutputManager.getElement('LAY__Battle_Area_Wrapper');
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
                                oOptions.aSourceBuffer[nIndex]
                            );
                        this.aPlayer.push(oPlayer);
                    }

                    // Engine init
                    this.oDisplay = new BattleDisplay(this, oOptions);
                    this.oEngine = new BattleEngine(this);
				},
				update: function(){
                    // Engine / Entity
                    BattleElement.get().forEach( oEntity => oEntity.update(this.oEngine) );
                    const oEndGame = this.oEngine.update();
                    // Display
                    BattleElement.get().forEach( oEntity => oEntity.render() );
                    this.oDisplay.update();
                    // Check END
                    this.endBattle(oEndGame);
				},
                destroy: function(){
                    BattleElement.get().forEach( oEntity => oEntity.destroy() );
                    this.oDisplay.destroy();
                },

                endBattle: function(oEndGame){},
                setBackground: function(sCod){
                    OutputManager.getElement('LAY__Battle_Area').setStyle( {
                        backgroundColor: GameData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GameData.oStage[sCod].oPath.sBackground + '")'
                    } );
                }
            }
        )
    }
);