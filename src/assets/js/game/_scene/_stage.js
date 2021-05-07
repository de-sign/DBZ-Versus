/* Stage Menu : One cursor ONLY for 2 Controller ! */
function StageBGMMenu(){
    GameMenu.apply(this, arguments);
}

Object.assign(
    StageBGMMenu, {
        prototype: Object.assign(
            Object.create(GameMenu.prototype), {
                constructor: StageBGMMenu,
                update: function() {
                    if( GameMenu.prototype.update.call(this) ){
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

/* Stage */
function StageScene(){
    this.oMenu = null;
}

Object.assign(
    StageScene, {
        aHelper: [
            {
                aButton: ['LEFT', 'RIGHT'],
                sText: 'Select stage'
            },
            {
                aButton: ['UP', 'DOWN'],
                sText: 'Select sound'
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
                aButton: ['START'],
                sText: 'Quit'
            }
        ],

        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: StageScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Stage');
                    OutputManager.getElement('TXT__Stage_Name').setText( SceneManager.oTransverseData.BTL__sType );

                    // Menu Init
                    this.oMenu = {
                        oStage: new GameMenu('LAY__Stage_Stage', SceneManager.oTransverseData.STG__nStageIndex || Math.floor(Object.keys(GameData.oStage).length / 2)),
                        oBGM: new StageBGMMenu('LAY__Stage_BGM', SceneManager.oTransverseData.STG__nBGMIndex)
                    };
                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].update();
                    }

                    GameHelper.set(StageScene.aHelper, SceneManager.oTransverseData.MNU__aController.filter( oController => oController ));
				},
				update: function(){
                    GameHelper.update();
                    this.changeMenu();
				},
                destroy: function(){
                    let sStage = this.oMenu.oStage.getSelected().__oData.sCod;
                    if( sStage == 'RNG' ){
                        const aStage = Object.keys(GameData.oStage).filter( sValue => sValue != 'RNG' ),
                        nRNG = Math.floor(Math.random() * aStage.length);
                        sStage = aStage[nRNG];
                    }

                    let sBGM = this.oMenu.oBGM.getSelected().__oData.sCod;
                    switch( sBGM ){
                        case 'RNG':
                            const aBGM = Object.values(GameData.oBGM).filter( sValue => sValue != 'RNG' || sValue != 'AUTO' ),
                                nRNG = Math.floor(Math.random() * aBGM.length);
                            sBGM = aBGM[nRNG].sCod;
                            break;
                        case 'AUTO':
                            sBGM = GameData.oBGM[sStage].sCod;
                            break;
                    }
                    
                    GameHelper.destroy();

                    return {
                        BTL__sStage: sStage,
                        BTL__sBGM: sBGM,
                        STG__nStageIndex: this.oMenu.oStage.destroy()[0],
                        STG__nBGMIndex: this.oMenu.oBGM.destroy()[0],
                    };
                },

                changeMenu: function(){

                    let bChange = false,
                        sSFX = null;

                    for( let nIndex in SceneManager.oTransverseData.MNU__aController ){
                        const oController = SceneManager.oTransverseData.MNU__aController[nIndex];
                        oController && oController.ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                SceneManager.change( new PreBattleScene() );
                                sSFX = 'ADO__Validate';
                                bChange = true;
                            },
                            B: () => {
                                SceneManager.change( new SelectScene() );
                                sSFX = 'ADO__Cancel';
                                bChange = true;
                            },
                            START: () => {
                                SceneManager.change( new MenuScene() );
                                sSFX = 'ADO__Cancel';
                                bChange = true;
                            },
                            // Gestion Select Stage
                            LEFT: () => {
                                this.oMenu.oStage.prev();
                                bChange = true;
                            },
                            RIGHT: () => {
                                this.oMenu.oStage.next();
                                bChange = true;
                            },
                            // Gestion Select BGM
                            UP: () => {
                                this.oMenu.oBGM.prev();
                                bChange = true;
                            },
                            DOWN: () => {
                                this.oMenu.oBGM.next();
                                bChange = true;
                            }
                        } );

                        if( bChange ){
                            break;
                        }
                    }

                    sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);
        
                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].update();
                    }

                    OutputManager.getElement('TXT__Stage_Stage_Name')
                        .setText( this.oMenu.oStage.getSelected().__oData.sName );
                }
            }
        )
    }
);