/*  ----- TrainingMenu ----- */
function TrainingMenu(sLayer, oEngine, oScene){
    this.oMenu = null;
    this.oEngine = null;
    this.oScene = null;

    this.init(sLayer, oEngine, oScene);
}

Object.assign(
    TrainingMenu, {
        prototype: {
            constructor: TrainingMenu,
            init: function(sLayer, oEngine, oScene){
                this.oMenu = new GameMenu(sLayer, 0);
                this.oEngine = oEngine;
                this.oScene = oScene;
            },
            update: function(){
                const sRedirection = this.controls();
                this.display();
                this.oMenu.update();
                return sRedirection;
            },
            destroy: function(){
                this.oMenu.destroy();
            },

            controls: function(){
                return null;
            },
            display: function(){
            },
            show: function(){
                this.oMenu.oLayer.hElement.classList.add('--show');
            },
            hide: function(){
                this.oMenu.oLayer.hElement.classList.remove('--show');
            }
        }
    }
);

/* ----- Training ----- */
function TrainingEngine(oScene){
    this.oScene = null;

    this.aHelperController = [];
    this.oModule = {};
    this.oMenu = {
        oLast: null,
        oCurrent: null,
        oReturn: {}
    };

    this.init(oScene);
}

Object.assign(
    TrainingEngine, {
        aModule: [
            'Principal',
            'Settings',
            'Gauges',
            'Dummy',
            'Restart',
            'Display',
            'List'
        ],

        prototype: {
            constructor: TrainingEngine,
            init: function(oScene){
                this.oScene = oScene;

                TrainingEngine.aModule.forEach( sModule => {
                    const oEngine = window['TrainingEngine' + sModule] ? new window['TrainingEngine' + sModule](this.oScene) : null,
                        oMenu = new window['TrainingMenu' + sModule]('LAY__Training_Menu_' + sModule, oEngine, this.oScene);

                    this.oModule[ oMenu.sCod = 'o' + sModule ] = {
                        oMenu,
                        oEngine
                    };
                } );
            },
            update: function(){
                if( this.oMenu.oCurrent ) {
                    let sSFX = null;
                    const sRedir = this.oMenu.oCurrent.update();
                    switch( sRedir ){
                        case 'return':
                            const sMenu = this.oMenu.oReturn[ this.oMenu.oCurrent.sCod ];
                            sSFX = 'ADO__Cancel';
                            this[ sMenu ? 'open' : 'close' ](sMenu);
                            break;
                        case 'restart':
                            sSFX = 'ADO__Validate';
                            this.close();
                            this.restart();
                            break;
                        case 'record':
                            sSFX = 'ADO__Validate';
                            this.close();
                            this.startRecord();
                            break;
                        case 'select':
                            sSFX = 'ADO__Validate';
                            SceneManager.change( new SelectScene() );
                            break;
                        case 'stage':
                            sSFX = 'ADO__Validate';
                            SceneManager.change( new StageScene() );
                            break;
                        case 'quit':
                            sSFX = 'ADO__Cancel';
                            SceneManager.change( new MenuScene() );
                            break;
                        case null:
                            break;
                        default:
                            sSFX = 'ADO__Validate';
                            this.open(sRedir);
                            break;
                    }
                    sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);
                }
                else {
                    for( let sModule in this.oModule ){
                        const oModule = this.oModule[sModule];
                        oModule.oEngine && oModule.oEngine.update();
                    }
                }
            },
            destroy: function(){
                this.close();
                for( let sModule in this.oModule ){
                    const oModule = this.oModule[sModule];
                    oModule.oEngine && oModule.oEngine.destroy();
                    oModule.oMenu.destroy();
                }
            },

            open: function(sMenu){
                let oMenu = null;
                if( sMenu ){
                    oMenu = this.oModule[sMenu].oMenu;
                }
                else {
                    oMenu = this.oMenu.oLast || this.oModule.oPrincipal.oMenu;
                    this.oScene.aPlayer.forEach( oPlayer => {
                        oPlayer.setFreeze();
                    } );
                    this.oScene.oContext.addTickUpdate( () => {
                        this.oScene.oContext.hElement.classList.add('--menu', '--training');
                    } );
                    this.trigger('onOpen');
                
                    this.aHelperController = GameHelper.aController;
                    GameHelper.set(TrainingScene.oHelper.aMenu, this.oScene.oController);
                    OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                }

                this.oMenu.oLast = this.oMenu.oCurrent;
                this.oMenu.oCurrent = oMenu;
                if( this.oMenu.oReturn[oMenu.sCod] == null ){
                    this.oMenu.oReturn[oMenu.sCod] = this.oMenu.oLast ?
                        this.oMenu.oLast.sCod :
                        false;
                }
                this.oScene.oContext.addTickUpdate( () => {
                    this.oMenu.oLast && this.oMenu.oLast.hide();
                    this.oMenu.oCurrent.show();
                } );
            },
            close: function(){
                const oCurrent = this.oMenu.oCurrent;
                this.oMenu.oLast = oCurrent;
                this.oMenu.oCurrent = null;
                this.oScene.aPlayer.forEach( oPlayer => {
                    oPlayer.unFreeze();
                } );
                this.oScene.oContext.addTickUpdate( () => {
                    oCurrent.hide();
                    this.oScene.oContext.hElement.classList.remove('--menu', '--training');
                } );
                this.trigger('onClose');
                GameHelper.set(TrainingScene.oHelper.aBattle, this.aHelperController);
            },
            toggle: function(){
                const bOpen = this.isOpen();
                this[ bOpen ? 'close' : 'open' ]();
            },
            isOpen: function(){
                return this.oMenu.oCurrent ? true : false;
            },

            trigger: function(sEvent){
                for( let sModule in this.oModule ){
                    const oModule = this.oModule[sModule];
                    oModule.oEngine && oModule.oEngine[sEvent] && oModule.oEngine[sEvent]();
                }
            },

            restart: function(){
                // Entity
                BattleElement.get().forEach( oEntity => {
                    if( oEntity.constructor != BattlePlayer ){
                        oEntity.destroy();
                    }
                } );
                this.oScene.oInfo.destroy();

                const oGauges = this.oModule.oGauges.oEngine,
                    oRestart = this.oModule.oRestart.oEngine;

                this.oModule.oDisplay.oEngine.cleanHistory()

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    // Bars
                    oGauges.setStat(nIndex, 'Life');
                    oGauges.setStat(nIndex, 'Ki');

                    // Perso
                    oPlayer.setStance('move_0', true);
                    oPlayer.oPushback = BattleMovement.empty();
                    oPlayer.oInputBuffer.reset();
                    oRestart.setPosition(nIndex);
                } );
            },

            startRecord: function(){
                this.oScene.bRecord = true;
                this.oModule.oDummy.oEngine.switchSource(true);
                this.restart();
                
                this.oScene.oInfo.add( {
                    nLength: 60 * 10,
                    sText: 'Recording ...',
                    fCallback: () => {
                        this.stopRecord();
                    }
                } );
                GameHelper.set(TrainingScene.oHelper.aRecord);
            },

            stopRecord: function(){
                if( this.oScene.bRecord ){
                    this.oScene.bRecord = false;
                    this.oModule.oDummy.oEngine.saveRecord();
                    
                    this.oScene.oInfo.destroy();
                    GameHelper.set(TrainingScene.oHelper.aBattle);
                }
            }
        }
    }
);
