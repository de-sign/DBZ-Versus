/* TrainingMenu - List */
function TrainingMenuList(){
    this.oSprite = null;
    this.oLastLayer = null;
    this.oAnimation = null;
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuList, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuList,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    this.oSprite = GAME.oOutput.getElement('SPT__Training_Menu_List');
                    this.oLastLayer = this.oMenu.oLayer;
                },
                update: function(){
                    const sRedir = TrainingMenu.prototype.update.apply(this, arguments);
                    this.changeAnimation();
                    this.oAnimation.update();
                    return sRedir;
                },
                /*
                destroy: function(){ },
                */
                
                controls: function(){
                    let sRedirection = null;
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            if( this.oMenu.getSelected().sId.indexOf('LAY__Training_Menu_List_Return') == 0){
                                sRedirection = 'return';
                            } else {
                                this.oEngine.change(1);
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
                        },
                        // Gestion changement
                        LEFT: () => {
                            this.oEngine.change(-1);
                        },
                        RIGHT: () => {
                            this.oEngine.change(1);
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
                },
                display: function(){
                    this.oAnimation && this.oSprite.setSource( this.oEngine.oPlayer.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                },
                show: function(){
                    this.oLastLayer.hElement.classList.add('--show');
                },
                hide: function(){
                    this.oLastLayer.hElement.classList.remove('--show');
                },

                changeAnimation: function(){
                    const oMenu = this.oMenu.getSelected();
                    if( oMenu && oMenu.__oData ){
                        if( !this.oAnimation ){
                            this.setAnimation('stand');
                        }
                        else if( !this.oAnimation.nLength || this.oAnimation.isEnd() ){
                            if( this.oAnimation.sName == 'stand' ){
                                this.setAnimation(oMenu.__oData.sAnimation);
                            } else {
                                this.setAnimation('stand');
                                this.oAnimation.nLength = 60;
                            }
                        }
                    } else {
                        this.setAnimation('stand');
                    }
                },
                setAnimation: function(sAnimation){
                    if( !this.oAnimation || this.oAnimation.sName != sAnimation ){
                        this.oAnimation = new GameAnimation(
                            sAnimation,
                            this.oEngine.oPlayer.oCharacter.oFrames,
                            this.oEngine.oPlayer.oCharacter.oAnimations[sAnimation].aFrames
                        );
                    }
                }
            }
        )
    }
);

/* ----- TrainingEngineList ----- */
function TrainingEngineList(oScene){
    this.oScene = null;
    
    this.nPlayer = -1;
    this.oPlayer = null;
    this.init(oScene);
}

Object.assign(
    TrainingEngineList, {

        prototype: {
            constructor: TrainingEngineList,
            init: function(oScene){
                this.oScene = oScene;
            },
            update: function(){
            },
            destroy: function(){
            },

            onOpen: function(){
                if( this.nPlayer == -1 ){
                    this.change(1);
                } else {
                    this.getMenu().oLayer.hElement.classList.add('--show');
                }
            },
            onClose: function(){
                this.getMenu().oLayer.hElement.classList.remove('--show');
            },

            change: function(nChange){
                const oMenu = this.getMenu(),
                    oLastLayer = this.nPlayer == -1 ? null : oMenu.oLayer;
                this.nPlayer == -1 || oMenu.destroy();

                this.nPlayer += nChange;
                if( this.nPlayer > this.oScene.aPlayer.length - 1 ){
                    this.nPlayer = 0;
                } else if( this.nPlayer < 0 ) {
                    this.nPlayer = this.oScene.aPlayer.length - 1;
                }
                this.oPlayer = this.oScene.aPlayer[this.nPlayer];

                oMenu.aCursor = [];
                oMenu.init('LAY__Training_Menu_List_Character_' + this.oPlayer.oCharacter.sCod + '_' + this.oPlayer.oColor.sCod, [0]);
                oMenu.update();
                oMenu.oLayer.addTickUpdate( () => {
                    oLastLayer && oLastLayer.hElement.classList.remove('--show');
                    oMenu.oLayer.hElement.classList.add('--show');
                } );
            },
            getMenu: function(){
                return this.oScene.oTraining.oModule.oList.oMenu.oMenu;
            }
        }
    }
);
