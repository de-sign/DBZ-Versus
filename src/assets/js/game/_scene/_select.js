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
            this.oLayer = OutputManager.getElement('LAY__Select_Player_' + this.nPlayer);
            this.oController = oController;
            this.oMenu = oMenu;
            this.nColor = SceneManager.oTransverseData.SLC__aColor ? SceneManager.oTransverseData.SLC__aColor[ this.nPlayer - 1 ] : 0;

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

                sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);
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

            OutputManager.getElement('SPT__Select_Character_' + this.nPlayer)
                .setSource( oCharColor.oPath.sPreview );
            OutputManager.getElement('TXT__Select_Character_' + this.nPlayer)
                .setText( oCharColor.sName + '<i>' + ( this.nColor + 1 ) + '/' + this.oCharacter.aColor.length + ' - ' + oCharColor.sColorName + '</i>' );
            OutputManager.getElement('TXT__Select_Player_' + this.nPlayer)
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
        if( !this.allPlayerActive() && SceneManager.oTransverseData.MNU__aController.indexOf(oController) == -1 ){
            this.oContext.addTickUpdate( () => {
                const nIndex = SceneManager.oTransverseData.MNU__aController.indexOf(null);
                SceneManager.oTransverseData.MNU__aController[nIndex] = oController;
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

                    OutputManager.getElement('TXT__Select_Name').setText( SceneManager.oTransverseData.BTL__sType );

                    // Character List Init
                    this.oMenu = new GameMenu('LAY__Select_Character', SceneManager.oTransverseData.SLC__aIndex || [0, -1]);

                    // Players init
                    for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                        let nPlayer = nIndex + 1;
                        this.aPlayer.push( new SelectPlayer(
                            nPlayer,
                            SceneManager.oTransverseData.MNU__aController[nIndex],
                            this.oMenu
                        ) );
                    }
                    ControllerManager.on('create addEvent', this.fCheckNewController);

                    // Helper
                    GameHelper.set(SelectScene.aHelper, SceneManager.oTransverseData.MNU__aController.filter( oController => oController ));
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
                    } else if( this.oStatus.bQuit || ( this.oStatus.bReturn && SceneManager.oTransverseData.BTL__sType == 'Training' ) ) {
                        SceneManager.change( new MenuScene() );
                    } else if( this.oStatus.bReturn ) {
                        SceneManager.change( new SideScene() );
                    } else if( this.oStatus.bReady ) {
                        SceneManager.change( new StageScene() );
                    }

                    GameHelper.update();
				},
                destroy: function(){
                    ControllerManager.off('create addEvent', this.fCheckNewController);
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
                    SceneManager.oTransverseData.MNU__aController.forEach( (oController, nIndex) => {
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
                    SceneManager.oTransverseData.MNU__aController.forEach( oController => {
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