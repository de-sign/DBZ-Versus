/*  ----- TrainingMenu - Settings ----- */
function TrainingMenuSettings(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuSettings, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuSettings,
                controls: function(){
                    let sRedirection = null;
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected(),
                                sMenu = oMenuSelected.sId.split('_').pop();

                            if( sMenu == 'Return' ){
                                sRedirection = 'return';
                            } else {
                                sRedirection = 'o' + sMenu;
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