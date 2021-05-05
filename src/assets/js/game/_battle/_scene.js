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
				init: function( oOptions ){
                    /*
                        oLastData: BTL__sStage, sTypeBattle, aController, BTL__aCharacterSelected, BTL__aColor
                        oOptions: aController, sContextClass
                    */
                    Scene.prototype.init.call(this, 'CTX__Battle');
                    this.oContext.hElement.classList.add( oOptions.sContextClass );

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.oArea.enableAutoPositioning();
                    this.setBackground( GAME.oScene.oTransverseData.BTL__sStage );
                    GAME.oOutput.getChannel('CHN__BGM').play('ADO__' + GAME.oScene.oTransverseData.BTL__sBGM, false, true);

                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        const nPlayer = nIndex + 1,
                            oPlayer = new BattlePlayer(
                                nPlayer,
                                GAME.oScene.oTransverseData.BTL__aCharacter[nIndex],
                                GAME.oScene.oTransverseData.BTL__aColor[nIndex],
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
                    // Entity
                    const aNewEntity = [];
                    BattleEntity.get().forEach( oEntity => {
                        const aEntity = oEntity.update();
                        aEntity && [].push.apply(aNewEntity, aEntity);
                    } );
                    this.oEngine.generateEntity(aNewEntity);
                    // Engine
                    this.endBattle( this.oEngine.update() );
                    // Display
                    BattleEntity.get().forEach( oEntity => oEntity.render() );
                    this.oInfo.update();
                    this.aHUD.forEach( oHUD => oHUD.update() );
                    this.oCombo.update();
				},
                destroy: function(){
                    BattleEntity.get().forEach( oEntity => oEntity.destroy() );
                    this.oInfo.destroy();
                },

                endBattle: function(aPlayerWin){},
                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GAME.oData.oStage[sCod].oPath.sBackground + '")'
                    } );
                }
            }
        )
    }
);