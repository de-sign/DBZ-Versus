/* Gestion Player */
function SelectPlayer(nPlayer, oKeyboard, oMenu){
    this.nPlayer = nPlayer;
    this.nCursor = nPlayer - 1;
    this.oLayer = null;
    
    this.oKeyboard = null;
    this.oMenu = null;
    this.bReady = false;
    this.bLeave = false;

    this.oCharacter = null;
    this.nColor = 0;

    this.init(oKeyboard, oMenu);
}

Object.assign(
    SelectPlayer.prototype, {
        init: function(oKeyboard, oMenu) {
            this.oLayer = GAME.oOutput.getElement('LAY__Select_Player_' + this.nPlayer);
            this.oKeyboard = oKeyboard;
            this.oMenu = oMenu;

            this.oMenu.oCharacter.update();
            this.oCharacter = this.oMenu.oCharacter.getSelected(this.nCursor).__oData;
        },
        update: function(oLock) {
            this.checkColor(oLock);

            this.oKeyboard && this.oKeyboard.ifPressedNow( {
                // Gestion validation
                A: () => {
                    this.bReady = this.oCharacter.bActive;
                    this.bLeave = false;
                },
                B: () => {
                    if( this.bReady ){
                        this.bReady = false;
                    } else {
                        this.bLeave = true;
                    }
                },
                C: () => {
                    this.changeColor(oLock);
                },
                // Gestion Select Character
                LEFT: () => {
                    this.oMenu.oCharacter.prev(this.nCursor);
                    this.bReady = false;
                    this.bLeave = false;
                    this.nColor = 0;
                },
                RIGHT: () => {
                    this.oMenu.oCharacter.next(this.nCursor);
                    this.bReady = false;
                    this.bLeave = false;
                    this.nColor = 0;
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

            this.oCharacter = this.oMenu.oCharacter.getSelected(this.nCursor).__oData;
            const sColor = this.oCharacter.aColor[this.nColor].sCod;
            GAME.oOutput.getElement('SPT__Select_Character_' + this.nPlayer)
                .setSource( this.oCharacter.oPath[sColor].sPreview );
            GAME.oOutput.getElement('TXT__Select_Character_' + this.nPlayer)
                .setText( this.oCharacter.aColor[this.nColor].sName );
            GAME.oOutput.getElement('TXT__Select_Player_' + this.nPlayer)
                .setText(
                    this.bReady || !this.oKeyboard ?
                        'Waiting ...' :
                        this.oCharacter.bActive ?
                            'Player #' + this.nPlayer :
                            'Unavailable'
                );
        },

        checkColor: function(oLock){
            if( oLock && this.oCharacter.sCod == oLock.sChar && this.nColor == oLock.nColor ){
                this.changeColor();
            }
        },
        changeColor: function(oLock){
            if( this.nColor == this.oCharacter.aColor.length - 1 ){
                this.nColor = 0;
            } else {
                this.nColor++;
            }
            this.checkColor(oLock);
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
    this.aColorLock = [];

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

                    // Helper
                    GameHelper.set( [
                            GAME.oInput.getController('IC_1'),
                            GAME.oInput.getController('IC_2'),
                        ],
                        [ {
                            aButton: ['LEFT', 'RIGHT'],
                            sText: 'Select character'
                        },
                        {
                            aButton: ['A'],
                            sText: 'Validate'
                        },
                        {
                            aButton: ['B'],
                            sText: 'Return'
                        },
                        {
                            aButton: ['C'],
                            sText: 'Change color'
                        },
                        {
                            aButton: ['UP', 'DOWN'],
                            sText: 'Select stage'
                        } ]
                    );
				},
				update: function(){
                    // Gestion activation P2
                    this.checkPlayerActivation();
                    this.aPlayer.forEach( (oPlayer, nIndex) => {
                        this.aColorLock[nIndex] = oPlayer.bReady ?
                            {
                                sChar: oPlayer.oCharacter.sCod,
                                nColor: oPlayer.nColor
                            } :
                            null;
                    } );
                    this.aPlayer.forEach( oPlayer => oPlayer.update( this.aColorLock[ oPlayer.nPlayer == 2 ? 0 : 1 ] ) );
                    this.updateStatus();
                    
                    if( this.oStatus.bSwitch ) {
                        this.switchKeyboard();
                    } else if( this.oStatus.bLeave ) {
                        GAME.oScene.change( new MenuScene() );
                    } else if( this.oStatus.bSubmit ) {
                        GAME.oScene.change( new LoadingScene() );
                    }

                    GameHelper.update();
				},
                destroy: function(){
                    GameHelper.destroy();

                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].destroy();
                    }

                    const aCharacterSelected = [],
                        aColorSelected = [];
                    this.aPlayer.forEach( oPlayer => {
                        aCharacterSelected.push( oPlayer.oCharacter.sCod );
                        aColorSelected.push( oPlayer.nColor );
                    } );

                    return Object.assign(GAME.oScene.oLastData, {
                        sStageSelected: this.oMenu.oStage.getSelected().__oData.sCod,
                        sTypeBattle: this.sType,
                        bAllPlayerActive: this.allPlayerActive(),
                        aCharacterSelected,
                        aColorSelected
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