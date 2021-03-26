/*  ----- TrainingMenu ----- */
function TrainingMenu(sLayer, oEngine, oKeyboard){
    this.oMenu = null;
    this.oEngine = null;
    this.oKeyboard = null;

    this.init(sLayer, oEngine, oKeyboard);
}

Object.assign(
    TrainingMenu, {
        prototype: {
            constructor: TrainingMenu,
            init: function(sLayer, oEngine, oKeyboard){
                this.oMenu = new GameMenu(sLayer, 0);
                this.oEngine = oEngine;
                this.oKeyboard = oKeyboard;
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
            open: function(){
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
                    this.oKeyboard.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                case 'TXT__Training_Menu_Display':
                                    sRedirection = 'oDisplay';
                                    break;
                                case 'TXT__Training_Menu_Continue':
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
            'Display'
        ],

        prototype: {
            constructor: TrainingEngine,
            init: function(oScene){
                this.oScene = oScene;

                TrainingEngine.aModule.forEach( sModule => {
                    const oEngine = window['TrainingEngine' + sModule] ? new window['TrainingEngine' + sModule](this.oScene) : null,
                        oMenu = new window['TrainingMenu' + sModule]('LAY__Training_Menu_' + sModule, oEngine, this.oScene.oKeyboard);

                    this.oModule[ oMenu.sCod = 'o' + sModule ] = {
                        oMenu,
                        oEngine
                    };
                } );
            },
            update: function(){
                if( this.oMenu.oCurrent ) {
                    const sRedir = this.oMenu.oCurrent.update();
                    switch( sRedir ){
                        case 'return':
                            this.open(this.oMenu.oLast.sCod);
                            break;
                        case 'close':
                            this.close();
                            break;
                        case null:
                            break;
                        default:
                            this.open(sRedir);
                            break;
                    }
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
                        oPlayer.oAnimation.setFreeze();
                    } );
                    this.oScene.oContext.addTickUpdate( () => {
                        this.oScene.oContext.hElement.classList.add('--menu');
                    } );
                    this.trigger('onOpen');
                }

                this.oMenu.oLast = this.oMenu.oCurrent;
                this.oMenu.oCurrent = oMenu;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oMenu.oLast && this.oMenu.oLast.oMenu.oLayer.hElement.classList.remove('--show');
                    this.oMenu.oCurrent.oMenu.oLayer.hElement.classList.add('--show');
                } );
            },
            close: function(){
                const oCurrent = this.oMenu.oCurrent;
                this.oMenu = {
                    oLast: null,
                    oCurrent: null
                };
                this.oScene.aPlayer.forEach( oPlayer => {
                    oPlayer.oAnimation.unFreeze();
                } );
                this.oScene.oContext.addTickUpdate( () => {
                    oCurrent.oMenu.oLayer.hElement.classList.remove('--show');
                    this.oScene.oContext.hElement.classList.remove('--menu');
                } );
                this.trigger('onClose');
            },
            toggle: function(){
                this[ this.isOpen() ? 'close' : 'open' ]();
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
