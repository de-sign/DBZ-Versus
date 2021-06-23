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
                                case 'TXT__Training_Menu_Settings':
                                    sRedirection = 'oSettings';
                                    break;

                                case 'TXT__Training_Menu_List':
                                    sRedirection = 'oList';
                                    break;
                                case 'TXT__Training_Menu_Select':
                                    sRedirection = 'select';
                                    break;
                                case 'TXT__Training_Menu_Stage':
                                    sRedirection = 'stage';
                                    break;

                                case 'TXT__Training_Menu_Restart':
                                    sRedirection = 'restart';
                                    break;
                                case 'TXT__Training_Menu_Continue':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Quit':
                                    sRedirection = 'quit';
                                    break;
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
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