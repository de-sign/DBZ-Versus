/* TrainingMenu - List */
function TrainingMenuList(){
    this.sCurrentCod = null;
    this.oParentLayer = null;

    this.oCharacterList = null;
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuList, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuList,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    
                    this.oParentLayer = this.oMenu.oLayer;
                    this.oMenu.destroy();
                    this.oMenu = new GameMenu('LAY__Training_Menu_List_Menu', 0);
                },
                /*
                update: function(){ },
                destroy: function(){ },
                */
                
                controls: function(){
                    let sRedirection = null,
                        sSFX = null;

                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            if( this.oMenu.getSelected().sId == 'TXT__Training_Menu_List_Return' ){
                                sRedirection = 'return';
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
                        },
                        // Gestion changement
                        UP: () => {
                            this.oMenu.prev();
                            sSFX = 'ADO__Validate';
                        },
                        DOWN: () => {
                            this.oMenu.next();
                            sSFX = 'ADO__Validate';
                        },
                    } );

                    sSFX && OutputManager.getChannel('CHN__SFX').play(sSFX);

                    return sRedirection;
                },
                display: function(){
                    const sCod = this.oEngine.aList[ this.oMenu.aCursor[0].nIndexCurrent ];
                    if( sCod && sCod != this.sCurrentCod ){
                        const oLastLayer = this.oCharacterList ?
                            this.oCharacterList :
                            null;

                        this.sCurrentCod = sCod;
                        this.oCharacterList = OutputManager.getElement('LAY__Training_Menu_List_Character_' + sCod);

                        this.hideList(oLastLayer);
                        this.showList();
                    }
                },
                show: function(){
                    this.oParentLayer.hElement.classList.add('--show');
                },
                hide: function(){
                    this.oParentLayer.hElement.classList.remove('--show');
                },

                showList: function(){
                    this.oCharacterList && this.oCharacterList.hElement.classList.add('--show');
                },
                hideList: function(oLayer){
                    oLayer || ( oLayer = this.oCharacterList );
                    oLayer && oLayer.hElement.classList.remove('--show');
                }
            }
        )
    }
);

/* ----- TrainingEngineList ----- */
function TrainingEngineList(oScene){
    this.oScene = null;
    this.aList = [];
    this.init(oScene);
}

Object.assign(
    TrainingEngineList, {

        prototype: {
            constructor: TrainingEngineList,
            init: function(oScene){
                this.oScene = oScene;
                this.aList.push('ALL');
                this.oScene.aPlayer.forEach( oPlayer => {
                    this.aList.push( oPlayer.oData.sCod );
                    OutputManager.getElement('TXT__Training_Menu_List_Menu_' + oPlayer.nPlayer).setText( oPlayer.oData.sName );
                } );
            },
            update: function(){
            },
            destroy: function(){
            },
            
            // onInit: function(){}
            onOpen: function(){
                this.getMenu().showList();
            },
            onClose: function(){
                this.getMenu().hideList();
            },

            getMenu: function(){
                return this.oScene.oTraining.oModule.oList.oMenu;
            }
        }
    }
);
