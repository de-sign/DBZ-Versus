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
                    this.oSprite = OutputManager.getElement('SPT__Training_Menu_List');
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
                            if( this.oMenu.getSelected().sId.indexOf('TXT__Training_Menu_List_Return') == 0){
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
                    this.oAnimation && this.oSprite.setSource( this.oEngine.oList.oData.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                },
                show: function(){
                    this.oLastLayer.hElement.classList.add('--show');
                },
                hide: function(){
                    this.oLastLayer.hElement.classList.remove('--show');
                },

                changeAnimation: function(){
                    const oMenu = this.oMenu.getSelected();
                    let nLength = 30,
                        sAnimation = 'move_5';

                    if( oMenu && oMenu.__oData ){
                        switch( oMenu.__oData.sCheck ){
                            case 'bThrow':
                                sAnimation = 'hit_D';
                                break;
                            case 'bGuard':
                                sAnimation = 'defense_4';
                                break;
                            case 'bAerial':
                                sAnimation = 'list_8';
                                break;
                        }
                        if( this.oAnimation ){
                            if( this.oAnimation.is('movement') || this.oAnimation.is('hurt') ){
                                if( this.oAnimation.sName == sAnimation && this.oAnimation.isEnd() ){
                                    sAnimation = oMenu.__oData.oList.sAnimation || oMenu.__oData.sAnimation;
                                    nLength = 0;
                                }
                            }
                            else if( !this.oAnimation.isEnd() ){
                                sAnimation = null;
                            }
                        }
                    }

                    sAnimation && this.setAnimation(sAnimation, nLength);
                },
                setAnimation: function(sAnimation, nLength){
                    if( !this.oAnimation || this.oAnimation.sName != sAnimation ){
                        this.oAnimation = new GameAnimation(
                            sAnimation,
                            this.oEngine.oList.oData.oAnimations[sAnimation].sType,
                            this.oEngine.oList.oData.oFrames,
                            this.oEngine.oList.oData.oAnimations[sAnimation].aFrames
                        );
                        nLength && (this.oAnimation.nLength = nLength);
                    }
                }
            }
        )
    }
);

/* ----- TrainingEngineList ----- */
function TrainingEngineList(oScene){
    this.oScene = null;
    this.oList = {
        nCurrent: -1,
        aData: [],
        oData: null
    };
    this.init(oScene);
}

Object.assign(
    TrainingEngineList, {

        prototype: {
            constructor: TrainingEngineList,
            init: function(oScene){
                this.oScene = oScene;
                this.oList.aData.push( Object.assign( {}, GameData.oCharacter.GKU_SSJ.CTM_SSJ, { sCod: 'ALL' }) );
                this.oScene.aPlayer.forEach( oPlayer => {
                    this.oList.aData.push( oPlayer.oData );
                } );
            },
            update: function(){
            },
            destroy: function(){
            },
            
            // onInit: function(){}
            onOpen: function(){
                if( this.oList.nCurrent == -1 ){
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
                    oLastLayer = this.oList.nCurrent == -1 ? null : oMenu.oLayer;
                this.oList.nCurrent == -1 || oMenu.destroy();

                this.oList.nCurrent += nChange;
                if( this.oList.nCurrent > this.oList.aData.length - 1 ){
                    this.oList.nCurrent = 0;
                } else if( this.oList.nCurrent < 0 ) {
                    this.oList.nCurrent = this.oList.aData.length - 1;
                }
                this.oList.oData = this.oList.aData[this.oList.nCurrent];

                oMenu.aCursor = [];
                oMenu.init('LAY__Training_Menu_List_Character_' + this.oList.oData.sCod, [0]);
                oMenu.update();
                oMenu.oLayer.addTickUpdate( () => {
                    oLastLayer && oLastLayer.hElement.classList.remove('--show');
                    oMenu.oLayer.hElement.classList.add('--show');
                } );
                OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
            },
            getMenu: function(){
                return this.oScene.oTraining.oModule.oList.oMenu.oMenu;
            }
        }
    }
);
