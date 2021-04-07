/* Gestion Player */
function SelectPlayer(nPlayer, oController, oMenu){
    this.nPlayer = nPlayer;
    this.nCursor = nPlayer - 1;
    this.oLayer = null;
    
    this.oController = null;
    this.oMenu = null;
    this.bReady = false;
    this.bReturn = false;
    this.bQuit = false;

    this.oCharacter = null;
    this.nColor = 0;

    this.init(oController, oMenu);
}

Object.assign(
    SelectPlayer.prototype, {
        init: function(oController, oMenu) {
            this.oLayer = GAME.oOutput.getElement('LAY__Select_Player_' + this.nPlayer);
            this.oController = oController;
            this.oMenu = oMenu;

            this.oMenu.oCharacter.update();
            this.oCharacter = this.oMenu.oCharacter.getSelected(this.nCursor).__oData;
        },
        update: function(oLock) {
            this.checkColor(oLock);

            this.oController && this.oController.ifPressedNow( {
                // Gestion validation
                A: () => {
                    this.bReady = this.oCharacter.bActive;
                    this.bReturn = false;
                    this.bQuit = false;
                },
                B: () => {
                    if( this.bReady ){
                        this.bReady = false;
                    } else {
                        this.bReturn = true;
                    }
                    this.bQuit = false;
                },
                C: () => {
                    this.changeColor(oLock);
                    this.bReturn = false;
                    this.bReady = false;
                    this.bQuit = false;
                },
                START: () => {
                    this.bReturn = false;
                    this.bReady = false;
                    this.bQuit = true;
                },
                // Gestion Select Character
                LEFT: () => {
                    this.oMenu.oCharacter.prev(this.nCursor);
                    this.bReady = false;
                    this.bReturn = false;
                    this.bQuit = false;
                    this.nColor = 0;
                },
                RIGHT: () => {
                    this.oMenu.oCharacter.next(this.nCursor);
                    this.bReady = false;
                    this.bReturn = false;
                    this.bQuit = false;
                    this.nColor = 0;
                },
                // Gestion Select Stage
                UP: () => {
                    this.oMenu.oStage.prev();
                    this.bReturn = false;
                    this.bQuit = false;
                },
                DOWN: () => {
                    this.oMenu.oStage.next();
                    this.bReturn = false;
                    this.bQuit = false;
                }
            } );

            for( let sMenu in this.oMenu ){
                this.oMenu[sMenu].update();
            }

            this.oCharacter = this.oMenu.oCharacter.getSelected(this.nCursor).__oData;
            const sColor = this.oCharacter.aColor[this.nColor].sCod;
            let sText = 'Player #' + this.nPlayer;
            if( this.bReady ){
                sText = 'Ready !';
            } else if(!this.oController){
                sText = 'Waiting ...';
            } else if( !this.oCharacter.bActive ){
                sText = 'Unavailable';
            }  

            GAME.oOutput.getElement('SPT__Select_Character_' + this.nPlayer)
                .setSource( this.oCharacter.oPath[sColor].sPreview );
            GAME.oOutput.getElement('TXT__Select_Character_' + this.nPlayer)
                .setText( this.oCharacter.aColor[this.nColor].sName );
            GAME.oOutput.getElement('TXT__Select_Player_' + this.nPlayer)
                .setText( sText );
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

/* Stage Menu : One cursor ONLY for 2 Controller ! */
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
    this.oData = null;
    
    this.oMenu = null;
    this.aPlayer = [];
    this.aColorLock = [];
    this.oStatus = {};

    this.nFrameCreated = 0;
}

Object.assign(
    SelectScene, {
        aHelper: [
            {
                aButton: ['LEFT', 'RIGHT'],
                sText: 'Select character'
            },
            {
                aButton: ['A'],
                sText: 'Validate'
            },
            {
                aButton: ['B'],
                sText: 'Cancel / Return'
            },
            {
                aButton: ['C'],
                sText: 'Change color'
            },
            {
                aButton: ['UP', 'DOWN'],
                sText: 'Select stage'
            },
            {
                aButton: ['START'],
                sText: 'Quit'
            }
        ],

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SelectScene,
				init: function( oLastData ){
                    this.oData = oLastData;
					GAME.oOutput.useContext('CTX__Select');

                    const aName = [ 'Versus', 'Training' ];
                    GAME.oOutput.getElement('TXT__Select_Name').setText( this.sType = aName[oLastData.nLastIndexMenu] );

                    this.nFrameCreated = GAME.oTimer.nFrames;

                    // Character List Init
                    this.oMenu = {
                        oCharacter: new GameMenu('LAY__Select_Character', [0, -1]),
                        oStage: new SelectStageMenu('LAY__Select_Stage')
                    };

                    // Evite le sautillement
                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].update();
                    }

                    // Players init
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        let nPlayer = nIndex + 1;
                        this.aPlayer.push( new SelectPlayer(
                            nPlayer,
                            oLastData.aController[nIndex],
                            this.oMenu
                        ) );
                    }

                    // Helper
                    const aController = [];
                    oLastData.aController.forEach( oController => {
                        oController && aController.push(oController);
                    } );
                    GameHelper.set( aController, SelectScene.aHelper );
				},
				update: function(){
                    // Gestion activation Player
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
                        this.switchController();
                    } else if( this.oStatus.bQuit ) {
                        GAME.oScene.change( new MenuScene() );
                    } else if( this.oStatus.bReturn ) {
                        GAME.oScene.change( new SideScene() );
                    } else if( this.oStatus.bReady ) {
                        GAME.oScene.change( new PreBattleScene() );
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
                        aController: this.oData.aController,
                        aCharacterSelected,
                        aColorSelected
                    } );
                },

                updateStatus: function(){

                    this.oStatus = {
                        bReturn: false,
                        bQuit: false,
                        bReady: true,
                        bSwitch: false
                    };

                    // Seulement si un PLAYER est inactif
                    if( !this.allPlayerActive() ){
                        const oInfoByState = this.getPlayerInformations();

                        // Gestion Validation PLAYER actif
                        if( oInfoByState.oActive.oPlayer.bReady && oInfoByState.oActive.oPlayer.oController ){
                            this.oStatus.bSwitch = true;
                        }
                        // Gestion changement selection PLAYER actif
                        else if( oInfoByState.oDisable.oPlayer.bReturn && oInfoByState.oDisable.oPlayer.oController ){
                            this.oStatus.bSwitch = true;
                            oInfoByState.oActive.oPlayer.bReady = false;
                            oInfoByState.oDisable.oPlayer.bReturn = false;
                            oInfoByState.oDisable.oPlayer.bQuit = false;
                        }
                    }
                    
                    this.aPlayer.forEach( oPlayer => {
                        this.oStatus.bReady && ( this.oStatus.bReady = oPlayer.bReady );
                        this.oStatus.bReturn || ( this.oStatus.bReturn = oPlayer.bReturn );
                        this.oStatus.bQuit || ( this.oStatus.bQuit = oPlayer.bQuit );
                    } );
                },

                getPlayerInformations: function(){
                    const oPlayer = {
                        oActive: null,
                        oDisable: null
                    };
                    this.oData.aController.forEach( (oController, nIndex) => {
                        oPlayer[ oController ? 'oActive' : 'oDisable'] = {
                            oPlayer: this.aPlayer[nIndex],
                            oOriginalController: oController,
                            nIndex: nIndex
                        };
                    } );
                    return oPlayer;
                },
                allPlayerActive: function(){
                    let bAllActive = true;
                    this.oData.aController.forEach( oController => {
                        !oController && ( bAllActive = false );
                    } );
                    return bAllActive;
                },
                checkPlayerActivation: function(){
                    if( !this.allPlayerActive() ){
                        const oPlayerByState = this.getPlayerInformations();
                        for( let sController in ControllerManager.oController ){
                            const oController = GAME.oInput.getController(sController);
                            if( oPlayerByState.oActive.oOriginalController.sId != oController.sId && oController.nFrameChange > this.nFrameCreated ){
                                this.oData.aController[ this.oData.aController.indexOf(null) ] = oController;
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    oPlayer.oController = this.oData.aController[nIndex];
                                    GameHelper.aController.push(oPlayer.oController);
                                } );
                                break;
                            }
                        }
                    }
                },
                switchController: function(){
                    const oController = this.aPlayer[0].oController;
                    this.aPlayer[0].oController = this.aPlayer[1].oController;
                    this.aPlayer[1].oController = oController;
                }
            }
        )
    }
);