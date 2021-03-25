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
				init: function( oLastData ){
                    // oLastData: sStageSelected, sTypeBattle, bAllPlayerActive, aCharacterSelected
                    const bTraining = oLastData.sTypeBattle == 'Training';
					GAME.oOutput.useContext('CTX__Battle');
					this.oContext = GAME.oOutput.getElement('CTX__Battle');

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.setBackground( oLastData.sStageSelected );

                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        const nPlayer = nIndex + 1,
                            oPlayer = new BattlePlayer(
                                nPlayer,
                                oLastData.aCharacterSelected[nIndex],
                                bTraining ? GAME.oInput.getController('IC_' + nPlayer ) : null,
                                false
                            );
                        this.aPlayer.push(oPlayer);
                        
                        // HUD init
                        this.aHUD.push( new BattleHUD(oPlayer) );
                    }

                    // Optimisation AUTO POSITIONING
                    this.oArea.updateChildAutoPositioning();

                    // Engine init
                    this.oInfo = new BattleInfo(this.oContext, this.aPlayer);
                    this.oCombo = new BattleCombo(this.aPlayer);
                    this.oEngine = new BattleEngine(!bTraining, this.aPlayer, this.oArea);

                    // Training init
                    if( bTraining ){
                        this.oTraining = new BattleTraining( this.aPlayer );
                        this.oContext.hElement.classList.add('--training');
                    } else {
                        this.oContext.hElement.classList.add('--versus');
                        this.oInfo.add(
                            {
                                sText: 'Ready ?',
                                bFreeze: true,
                                fCallback: () => {
                                    this.aPlayer.forEach( oPlayer => {
                                        oPlayer.oInputBuffer.init( GAME.oInput.getController('IC_' + oPlayer.nPlayer ) );
                                    } );
                                }
                            },
                            {
                                sText: 'Fight !',
                                nLength: 30
                            }
                        );
                    }
				},
				update: function(){
                    this.aPlayer.forEach( oPlayer => oPlayer.updateInput() );
                    this.endBattle( this.oEngine.update() );
                    this.aPlayer.forEach( oPlayer => oPlayer.updateOutput() );

                    this.oInfo.update();
                    this.aHUD.forEach( oHUD => oHUD.update() );
                    this.oCombo.update();
                    
                    this.oTraining && this.oTraining.update();
				},
                destroy: function(){
                },

                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png")'
                    } );
                },
                endBattle: function(aPlayerWin){
                    if( aPlayerWin.length ){
                        this.oInfo.add( {
                            sText: aPlayerWin.length == 2 ?
                                'Double KO !' :
                                aPlayerWin[0].oCharacter.sName + ' win !',
                            bFreeze: true,
                            nLength: 120,
                            fCallback: () => {
                                GAME.oScene.change( new MenuScene() );
                            }
                        } );
                    }
                }
            }
        )
    }
);