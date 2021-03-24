/* ----- BattleScene ----- */
function BattleScene(){
	this.oContext = null;
    this.oInfo = null;
	this.oArea = null;
    
	this.oPattern = null;
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

                    this.getPattern();
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        let nPlayer = nIndex + 1;
                        this.createPlayer(nPlayer);
                        const oPlayer = new BattlePlayer(
                            nPlayer,
                            oLastData.aCharacterSelected[nIndex],
                            bTraining ? GAME.oInput.getController('IC_' + nPlayer ) : null,
                            false
                        );
                        this.aPlayer.push(oPlayer);
                        
                        // HUD init
                        this.createHUDPlayer(nPlayer);
                        this.aHUD.push( new BattleHUD(oPlayer) );
                    }
                    this.oContext.addTickUpdate( () => {
                        this.oContext.updateChildAutoPositioning();
                    } );

                    // Engine init
                    this.oInfo = new BattleInfo(this.oContext, this.aPlayer);
                    this.oCombo = new BattleCombo(this.aPlayer);
                    this.oEngine = new BattleEngine(!bTraining, this.aPlayer, this.oArea);

                    // Training init
                    if( bTraining ){
                        this.oTraining = new BattleTraining( this.aPlayer );
                    } else {
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
                },
                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png")'
                    } );
                },
                getPattern: function(){
                    this.oPattern = {
                        oHUD: GAME.oOutput.getElement('LAY__Battle_HUD_'),
                        oPlayer: GAME.oOutput.getElement('LAY__Battle_Character_')
                    };

                    for( let sPattern in this.oPattern ){
                        this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
                    }
                },
                createPlayer: function(nPlayer){
                    let oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + nPlayer);
                    if( !oLayer && this.oPattern.oPlayer ){

                        // Clone du LAYER
                        let hLayer = this.oPattern.oPlayer.hElement.cloneNode(true);
                        hLayer.id += nPlayer;
                        hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += nPlayer;
                                hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                            }
                        );

                        // Ajout dans l'arène
                        this.oArea.add(new GAME.oOutput.OutputLayer(hLayer));
                    }
                },
                createHUDPlayer: function(nPlayer){
                    let oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_' + nPlayer);
                    if( !oLayer && this.oPattern.oHUD ){

                        // Clone du LAYER
                        let hLayer = this.oPattern.oHUD.hElement.cloneNode(true);
                        hLayer.id += nPlayer;
                        hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += nPlayer;
                                hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                            }
                        );

                        // Ajout dans le context
                        this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Battle__HUDs');
                    }
                }
            }
        )
    }
);