/* Gestion Player */
function SelectPlayer(nPlayer, oKeyboard, oMenu){
    this.nPlayer = nPlayer;
    this.nCursor = nPlayer - 1;
    this.oLayer = null;
    
    this.oKeyboard = null;
    this.oMenu = null;
    this.bReady = false;
    this.bLeave = false;

    this.init(oKeyboard, oMenu);
}

Object.assign(
    SelectPlayer.prototype, {
        init: function(oKeyboard, oMenu) {
            this.oLayer = GAME.oOutput.getElement('LAY__Select_Player_' + this.nPlayer);
            this.oKeyboard = oKeyboard;
            this.oMenu = oMenu;
        },
        update: function() {
            this.oKeyboard && this.oKeyboard.ifPressedNow( {
                // Gestion validation
                A: () => {
                    this.bReady = true;
                    this.bLeave = false;
                },
                B: () => {
                    if( this.bReady ){
                        this.bReady = false;
                    } else {
                        this.bLeave = true;
                    }
                },
                // Gestion Select Character
                LEFT: () => {
                    this.oMenu.oCharacter.prev(this.nCursor);
                    this.bReady = false;
                    this.bLeave = false;
                },
                RIGHT: () => {
                    this.oMenu.oCharacter.next(this.nCursor);
                    this.bReady = false;
                    this.bLeave = false;
                },
                // Gestion Select Stage
                UP: () => {
                    this.oMenu.oStage.prev();
                    this.bLeave = false;
                },
                DOWN: () => {
                    this.oMenu.oStage.next();
                    this.bLeave = false;
                }
            } );

            for( let sMenu in this.oMenu ){
                this.oMenu[sMenu].update();
            }
            
            GAME.oOutput.getElement('SPT__Select_Character_' + this.nPlayer)
                .setSource( GAME.oSettings.oPath.oCharacter.sPreview + '/' + this.oMenu.oCharacter.getSelected(this.nCursor).__oData.sCod + '.png' );
            GAME.oOutput.getElement('TXT__Select_Character_' + this.nPlayer)
                .setText( this.oMenu.oCharacter.getSelected(this.nCursor).__oData.sName );
            GAME.oOutput.getElement('TXT__Select_Player_' + this.nPlayer).setText( this.bReady || !this.oKeyboard ? 'Waiting ...' : 'Player #' + this.nPlayer );
        }
    }
);

/* Stage Menu : One cursor ONLY for 2 Keyboard ! */
function SelectStageMenu(){
    GameMenu.apply(this, arguments);
}

Object.assign(
    SelectStageMenu, {
        prototype: Object.assign(
            Object.create(GameMenu.prototype), {
                constructor: SelectStageMenu,
                update: function() {
                    if( GameMenu.prototype.update.call(this) ){
                        GAME.oOutput.getElement('TXT__Select_Stage').setText( this.getSelected().__oData.sName );

                        this.oLayer.addTickUpdate( () => {
                            for( let nIndex = 0; nIndex < this.oLayer.aChildElement.length; nIndex++ ){
                                const oMenu = this.oLayer.aChildElement[nIndex];
                                oMenu.hElement.classList.remove('Menu__cursor_prev', 'Menu__cursor_next', 'Menu__cursor_hide');
                                if( nIndex == this.getIndex( this.aCursor[0].nIndexCurrent - 1 ) ){
                                    oMenu.hElement.classList.add('Menu__cursor_prev');
                                } else if( nIndex == this.getIndex( this.aCursor[0].nIndexCurrent + 1 ) ){
                                    oMenu.hElement.classList.add('Menu__cursor_next');
                                } else if( nIndex != this.aCursor[0].nIndexCurrent ){
                                    oMenu.hElement.classList.add('Menu__cursor_hide');
                                }
                            }
                        } );
                    }
                }
            }
        )
    }
);

/* Select */
function SelectScene(){
    this.sType = null;
    
    this.oMenu = null;
    this.aPlayer = [];

    this.nFrameCreated = 0;
}

Object.assign(
    SelectScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SelectScene,
				init: function( oLastData ){
					GAME.oOutput.useContext('CTX__Select');

                    const aName = [ 'Versus', 'Training' ];
                    GAME.oOutput.getElement('TXT__Select_Name').setText( this.sType = aName[oLastData.nLastIndexMenu] );

                    this.nFrameCreated = GAME.oTimer.nFrames;

                    // Character List Init
                    this.oMenu = {
                        oCharacter: new GameMenu('LAY__Select_Character', [0, -1]),
                        oStage: new SelectStageMenu('LAY__Select_Stage')
                    };

                    // Players init
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        let nPlayer = nIndex + 1;
                        this.aPlayer.push( new SelectPlayer(
                            nPlayer,
                            this.sType == 'Training' && nIndex ? null : GAME.oInput.getController('IC_' + nPlayer ),
                            this.oMenu
                        ) );
                    }
				},
				update: function(){
                    // Gestion activation P2
                    this.checkPlayerActivation();
                    this.aPlayer.forEach( oPlayer => oPlayer.update() );
                    this.updateStatus();
                    
                    if( this.oStatus.bSwitch ) {
                        this.switchKeyboard();
                    } else if( this.oStatus.bLeave ) {
                        GAME.oScene.change( new MenuScene() );
                    } else if( this.oStatus.bSubmit ) {
                        // GAME.oScene.change( new BattleScene() );
                        GAME.oScene.change( new LoadingScene() );
                    }
				},
                destroy: function(){
                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].destroy();
                    }

                    const aCharacterSelected = [];
                    this.aPlayer.forEach( oPlayer => {
                        aCharacterSelected.push( this.oMenu.oCharacter.getSelected(oPlayer.nCursor).__oData.sCod )
                    } );

                    return Object.assign(GAME.oScene.oLastData, {
                        sStageSelected: this.oMenu.oStage.getSelected().__oData.sCod,
                        sTypeBattle: this.sType,
                        bAllPlayerActive: this.allPlayerActive(),
                        aCharacterSelected
                    } );
                },

                updateStatus: function(){

                    this.oStatus = {
                        bLeave: false,
                        bSubmit: true,
                        bSwitch: false
                    };

                    // Seulement si P2 est inactif
                    if( !this.allPlayerActive() ){
                        // Gestion Validation P1
                        if( this.aPlayer[0].bReady && this.aPlayer[0].oKeyboard ){
                            this.oStatus.bSwitch = true;
                        }
                        // Gestion Retour P1
                        else if( this.aPlayer[1].bLeave && this.aPlayer[1].oKeyboard ){
                            this.oStatus.bSwitch = true;
                            this.aPlayer[0].bReady = false;
                            this.aPlayer[1].bLeave = false;
                        }
                    }
                    
                    this.aPlayer.forEach( oPlayer => {
                        this.oStatus.bSubmit && ( this.oStatus.bSubmit = oPlayer.bReady );
                        this.oStatus.bLeave || ( this.oStatus.bLeave = oPlayer.bLeave );
                    } );
                },

                allPlayerActive: function(){
                    return this.aPlayer[0].oKeyboard && this.aPlayer[1].oKeyboard;
                },
                checkPlayerActivation: function(){
                    if( !this.allPlayerActive() && GAME.oInput.getController('IC_2').nFrameLastEvent > this.nFrameCreated ){
                        this.aPlayer.forEach( oPlayer => oPlayer.oKeyboard = GAME.oInput.getController('IC_' + oPlayer.nPlayer ) )
                    }
                },
                switchKeyboard: function(){
                    const oKeyboard = this.aPlayer[0].oKeyboard;
                    this.aPlayer[0].oKeyboard = this.aPlayer[1].oKeyboard;
                    this.aPlayer[1].oKeyboard = oKeyboard;
                }
            }
        )
    }
);