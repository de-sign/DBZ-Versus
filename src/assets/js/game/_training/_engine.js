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

/*  ----- TrainingMenu - Principal ----- */
function TrainingMenuPrincipal(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuPrincipal, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuPrincipal,
                controls: function(){
                    let sRedirection = null;
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                case 'TXT__Training_Menu_Parameters':
                                    sRedirection = 'oParameters';
                                    break;
                                case 'TXT__Training_Menu_Display':
                                    sRedirection = 'oDisplay';
                                    break;
                                case 'TXT__Training_Menu_List':
                                    sRedirection = 'oList';
                                    break;
                                case 'TXT__Training_Menu_Restart':
                                    sRedirection = 'restart';
                                    break;
                                case 'TXT__Training_Menu_Continue':
                                    sRedirection = 'close';
                                    break;
                                case 'TXT__Training_Menu_Quit':
                                    sRedirection = 'quit';
                                    break;
                            }
                        },
                        B: () => {
                            sRedirection = 'close';
                        },
                        // Gestion déplacement
                        UP: () => {
                            this.oMenu.prev();
                        },
                        DOWN: () => {
                            this.oMenu.next();
                        }
                    } );

                    return sRedirection;
                }
            }
        )
    }
);

/* ----- Training ----- */
function TrainingEngine(oScene){
    this.oScene = null;

    this.aHelperController = [];
    this.oModule = {};
    this.oMenu = {
        oLast: null,
        oCurrent: null
    };

    this.init(oScene);
}

Object.assign(
    TrainingEngine, {
        aModule: [
            'Principal',
            'Parameters',
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
                            sSFX = 'ADO__Cancel';
                            this.open(this.oMenu.oLast.sCod);
                            break;
                        case 'restart':
                            sSFX = 'ADO__Validate';
                            this.oScene.bRestart = true;
                            this.close();
                            break;
                        case 'close':
                            sSFX = 'ADO__Cancel';
                            this.close();
                            break;
                        case 'quit':
                            sSFX = 'ADO__Cancel';
                            GAME.oScene.change( new MenuScene() );
                            break;
                        case null:
                            break;
                        default:
                            sSFX = 'ADO__Validate';
                            this.open(sRedir);
                            break;
                    }
                    sSFX && GAME.oOutput.getChannel('CHN__SFX').play(sSFX);
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
                    oMenu = this.oModule.oPrincipal.oMenu;
                    this.oScene.aPlayer.forEach( oPlayer => {
                        oPlayer.setFreeze();
                    } );
                    this.oScene.oContext.addTickUpdate( () => {
                        this.oScene.oContext.hElement.classList.add('--menu');
                    } );
                    this.trigger('onOpen');
                
                    this.aHelperController = GameHelper.aController;
                    GameHelper.set(this.oScene.oController, TrainingScene.oHelper.aMenu );
                    GAME.oOutput.getChannel('CHN__SFX').play('ADO__Validate');
                }

                this.oMenu.oLast = this.oMenu.oCurrent;
                this.oMenu.oCurrent = oMenu;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oMenu.oLast && this.oMenu.oLast.hide();
                    this.oMenu.oCurrent.show();
                } );
            },
            close: function(){
                const oCurrent = this.oMenu.oCurrent;
                this.oMenu = {
                    oLast: null,
                    oCurrent: null
                };
                this.oScene.aPlayer.forEach( oPlayer => {
                    oPlayer.unFreeze();
                } );
                this.oScene.oContext.addTickUpdate( () => {
                    oCurrent.hide();
                    this.oScene.oContext.hElement.classList.remove('--menu');
                } );
                this.trigger('onClose');
                GameHelper.set(this.aHelperController, TrainingScene.oHelper.aBattle );
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
            }
        }
    }
);
