/*  ----- TrainingMenu - Dummy ----- */
function TrainingMenuDummy(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuDummy, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuDummy,
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
                                console.log('TODO');
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