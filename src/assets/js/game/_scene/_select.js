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
            this.nColor = GAME.oScene.oTransverseData.SLC__aColor ? GAME.oScene.oTransverseData.SLC__aColor[ this.nPlayer - 1 ] : 0;

            this.oMenu.update();
            this.oCharacter = this.oMenu.getSelected(this.nCursor).__oData;
        },
        update: function(oLock) {
            this.checkColor(oLock);

            if( this.oController ){
                let sSFX = false;
                
                this.oController.ifPressedNow( {
                    // Gestion validation
                    A: () => {
                        sSFX = 'ADO__Validate';
                        this.bReady = true;
                        this.bReturn = false;
                        this.bQuit = false;
                    },
                    B: () => {
                        sSFX = 'ADO__Cancel';
                        if( this.bReady ){
                            this.bReady = false;
                        } else {
                            this.bReturn = true;
                        }
                        this.bQuit = false;
                    },
                    C: () => {
                        sSFX = 'ADO__Move';
                        this.changeColor(oLock);
                        this.bReturn = false;
                        this.bReady = false;
                        this.bQuit = false;
                    },
                    START: () => {
                        sSFX = 'ADO__Cancel';
                        this.bReturn = false;
                        this.bReady = false;
                        this.bQuit = true;
                    },
                    // Gestion Select Character
                    LEFT: () => {
                        this.oMenu.prev(this.nCursor);
                        this.bReady = false;
                        this.bReturn = false;
                        this.bQuit = false;
                        this.nColor = 0;
                    },
                    RIGHT: () => {
                        this.oMenu.next(this.nCursor);
                        this.bReady = false;
                        this.bReturn = false;
                        this.bQuit = false;
                        this.nColor = 0;
                    }
                } );

                sSFX && GAME.oOutput.getChannel('CHN__SFX').play(sSFX);
            }

            this.oMenu.update();

            this.oCharacter = this.oMenu.getSelected(this.nCursor).__oData;
            const oCharColor = this.oCharacter[ this.oCharacter.aColor[this.nColor].sColor ];
            let sText = 'Player #' + this.nPlayer;
            if( this.bReady ){
                sText = 'Ready !';
            } else if(!this.oController){
                sText = 'Waiting ...';
            }

            GAME.oOutput.getElement('SPT__Select_Character_' + this.nPlayer)
                .setSource( oCharColor.oPath.sPreview );
            GAME.oOutput.getElement('TXT__Select_Character_' + this.nPlayer)
                .setText( oCharColor.sName + '<i>' + oCharColor.sColorName + '</i>' );
            GAME.oOutput.getElement('TXT__Select_Player_' + this.nPlayer)
                .setText( sText );
        },

        checkColor: function(oLock){
            if( oLock && this.oCharacter.sEntity == oLock.sChar && this.nColor == oLock.nColor ){
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

/* Select */
function SelectScene(){
    this.oMenu = null;
    this.aPlayer = [];
    this.aColorLock = [];
    this.oStatus = {};

    this.fCheckNewController = oController => {
        if( !this.allPlayerActive() && GAME.oScene.oTransverseData.MNU__aController.indexOf(oController) == -1 ){
            this.oContext.addTickUpdate( () => {
                const nIndex = GAME.oScene.oTransverseData.MNU__aController.indexOf(null);
                GAME.oScene.oTransverseData.MNU__aController[nIndex] = oController;
                this.aPlayer[nIndex].oController = oController;
                GameHelper.aController.push(oController);
            } );
        }
    };
}

Object.assign(
    SelectScene, {
        aHelper: [
            {
                aButton: ['LEFT', 'RIGHT'],
                sText: 'Select'
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
                aButton: ['START'],
                sText: 'Quit'
            }
        ],

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SelectScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Select');

                    GAME.oOutput.getElement('TXT__Select_Name').setText( GAME.oScene.oTransverseData.BTL__sType );

                    // Character List Init
                    this.oMenu = new GameMenu('LAY__Select_Character', GAME.oScene.oTransverseData.SLC__aIndex || [0, -1]);

                    // Players init
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        let nPlayer = nIndex + 1;
                        this.aPlayer.push( new SelectPlayer(
                            nPlayer,
                            GAME.oScene.oTransverseData.MNU__aController[nIndex],
                            this.oMenu
                        ) );
                    }
                    GAME.oInput.on('create addEvent', this.fCheckNewController);

                    // Helper
                    GameHelper.set(SelectScene.aHelper, GAME.oScene.oTransverseData.MNU__aController.filter( oController => oController ));
				},
				update: function(){
                    this.aPlayer.forEach( (oPlayer, nIndex) => {
                        this.aColorLock[nIndex] = oPlayer.bReady ?
                            {
                                sChar: oPlayer.oCharacter.sEntity,
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
                        GAME.oScene.change( new StageScene() );
                    }

                    GameHelper.update();
				},
                destroy: function(){
                    GAME.oInput.off('create addEvent', this.fCheckNewController);
                    GameHelper.destroy();

                    const aCharacterSelected = [],
                        aColorSelected = []
                        aColor = [];
                    this.aPlayer.forEach( oPlayer => {
                        aColor.push(oPlayer.nColor);
                        aCharacterSelected.push( oPlayer.oCharacter.sEntity );
                        aColorSelected.push( oPlayer.oCharacter.aColor[oPlayer.nColor].sColor );
                    } );

                    return {
                        SLC__aColor: aColor,
                        SLC__aIndex: this.oMenu.destroy(),
                        BTL__aCharacter: aCharacterSelected,
                        BTL__aColor: aColorSelected
                    };
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
                    GAME.oScene.oTransverseData.MNU__aController.forEach( (oController, nIndex) => {
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
                    GAME.oScene.oTransverseData.MNU__aController.forEach( oController => {
                        !oController && ( bAllActive = false );
                    } );
                    return bAllActive;
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