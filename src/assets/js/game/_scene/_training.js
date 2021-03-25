function TrainingScene() {
    BattleScene.call(this);

    this.oCurrentMenu = null;
    this.oMenu = {};
    this.bMenu = false;
}

Object.assign(
    TrainingScene, {
        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: TrainingScene,
                init: function(oLastData){
                    this.oKeyboard = GAME.oInput.getController('IC_1');
                    BattleScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sContextClass: '--training',
                            aKeyboard: [
                                this.oKeyboard,
                                GAME.oInput.getController('IC_2')
                            ],
                            bDeath: false
                        }
                    );

                    this.oTraining = new BattleTraining( this.oContext, this.aPlayer );
                    this.oMenu = {
                        oPrincipal: new GameMenu('LAY__Training_Menu_Principal'),
                        // oParameters: null,
                        oDisplay: new GameMenu('LAY__Training_Menu_Display')
                    };
                },
                update: function(){
                    this.oKeyboard.ifPressedNow( {
                        START: () => {
                            this.toogleMenuPrincipal();
                        }
                    } );

                    if( this.bMenu ){
                        this.controlsMenu();
                        this.updateMenu();
                        this.oCurrentMenu.update();
                    } else {
                        BattleScene.prototype.update.call(this);
                        this.oTraining.update();
                    }
                },
                destroy: function(){
                    this.oTraining.destroy();
                    this.toogleMenuPrincipal(false);
                    for( let sMenu in this.oMenu ){
                        this.oMenu[sMenu].destroy();
                    }
                },

                toogleMenuPrincipal: function(bMenu){
                    this.bMenu = bMenu == null ? !this.bMenu : bMenu;
                    this.switchMenu('oPrincipal');
                    this.aPlayer.forEach( oPlayer => {
                        oPlayer.oAnimation[this.bMenu ? 'setFreeze' : 'unFreeze']();
                    } );
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList[this.bMenu ? 'add' : 'remove']('--menu');
                    } );
                },
                switchMenu: function(sMenu){
                    const oLast = this.oCurrentMenu;
                    this.oCurrentMenu = this.oMenu[sMenu];
                    this.oContext.addTickUpdate( () => {
                        oLast && oLast.oLayer.hElement.classList.remove('--show');
                        this.oCurrentMenu.oLayer.hElement.classList.add('--show');
                    } );
                },
                controlsMenu: function(){
                    this.oKeyboard.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oCurrentMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                // Principal
                                case 'TXT__Training_Menu_Display':
                                    this.switchMenu('oDisplay');
                                    break;
                                case 'TXT__Training_Menu_Continue':
                                    this.toogleMenuPrincipal();
                                    break;
                                case 'TXT__Training_Menu_Quit':
                                    GAME.oScene.change( new MenuScene() );
                                    break;

                                // Display
                                case 'LAY__Training_Menu_Display_Input':
                                    this.oTraining.oDisplay.toogle('bHistory');
                                    break;
                                case 'LAY__Training_Menu_Display_Box':
                                    this.oTraining.oDisplay.toogle('bBox');
                                    break;
                                case 'LAY__Training_Menu_Display_Animations':
                                    this.oTraining.oDisplay.toogle('bAnimation');
                                    break;
                                case 'LAY__Training_Menu_Display_Return':
                                    this.switchMenu('oPrincipal');
                                    break;
                            }
                        },
                        // Gestion déplacement
                        UP: () => {
                            this.oCurrentMenu.prev();
                        },
                        DOWN: () => {
                            this.oCurrentMenu.next();
                        }
                    } );
                },
                updateMenu: function(){
                    const oType = {
                        bHistory: 'LAY__Training_Menu_Display_Input',
                        bBox: 'LAY__Training_Menu_Display_Box',
                        bAnimation: 'LAY__Training_Menu_Display_Animations'
                    };
                    switch( this.oCurrentMenu.oLayer.sId ){
                        case 'LAY__Training_Menu_Display':
                            for( let sType in oType ){
                                GAME.oOutput.getElement(oType[sType]).aChildElement[0].setText(
                                    this.oTraining.oDisplay.oShow[sType] ?
                                        'Show' : 
                                        'Hide'
                                );
                            }
                            break;
                    }
                }
            }
        )
    }
);