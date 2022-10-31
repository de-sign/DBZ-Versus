/*  ----- TrainingMenu - Opponent ----- */
function TrainingMenuOpponent(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuOpponent, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuOpponent,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    this.oLayer = OutputManager.getElement('LAY__Training_Menu_Opponent');
                },
                controls: function(){
                    let sRedirection = null;
                    const oMenuSelected = this.oMenu.getSelected();
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            switch(oMenuSelected.sId){
                                case 'TXT__Training_Menu_Opponent_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Opponent_Reset':
                                    this.oEngine.reset();
                                    break;
                                default:
                                    this.change(1);
                                    break;
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
                        },
                        C: () => {
                            this.oEngine.reset();
                        },
                        // Gestion changement
                        LEFT: () => {
                            this.change(-1);
                        },
                        RIGHT: () => {
                            this.change(1);
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

                change: function(nChange){
                    let oMenuSelected = this.oMenu.getSelected(),
                        sType = oMenuSelected.sId.split('_').pop();

                    this.oEngine.change(sType, nChange);
                    OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                },
                display: function(){
                    Object.keys(this.oEngine.oOpponent).forEach( (sParam, nIndex) => {

                        const uParam = this.oEngine.oOpponent[sParam],
                            oText = this.oLayer.aChildElement[nIndex].aChildElement[0],
                            bChange = uParam != TrainingEngineOpponent.oDefault[sParam];

                        oText.hElement.classList[ bChange ? 'add' : 'remove' ]('--change');

                        switch( sParam ){
                            case 'sController':
                                oText.setText( uParam ? GameEngine.oInput.getController(uParam).sName : 'Opponent' );
                                break;
                            default:
                                oText.setText( TrainingEngineOpponent.oParameter[sParam][uParam] );
                                break;
                        }
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineOpponent ----- */
function TrainingEngineOpponent(oScene){
    this.oScene = null;
    this.oSourceBuffer = {
        oPlayer: null,
        oLocal: new BattleInputSourceBufferLocal(null),
        oOpponent: null
    };

    this.oOpponent = {};

    this.init(oScene);
}

Object.assign(
    TrainingEngineOpponent, {

        oDefault: {
            sController: null,
            nStance: 0,
            nCounter: 0,
            nGuard: 0,
            nTechThrow: 0,
            nRecovery: 0
        },

        oParameter: {
            nStance: ['Stand', 'Jump', 'Forward Jump', 'Backward Jump'],
            nCounter: ['Normaly', 'Forced', 'Random'],
            nGuard: ['No guard', 'After 1st hit', 'Only 1st hit', 'All', 'Reflect', 'Random'],
            nTechThrow: ['No tech throw', 'Tech throw', 'Random'],
            nRecovery: ['No recovery', 'Forward', 'Backward', 'Random']
        },

        prototype: {
            constructor: TrainingEngineOpponent,
            init: function(oScene){
                this.oScene = oScene;
                Object.assign( this.oOpponent, TrainingEngineOpponent.oDefault, StoreEngine.get('TNG__Opponent') || {} );
            },
            update: function(){},
            destroy: function(){},

            onInit: function(){
                // Source
                this.oSourceBuffer.oPlayer = this.oScene.aPlayer[0].oInputBuffer.oSource;
                this.oSourceBuffer.oOpponent = new BattleInputSourceBufferDummy(this.oScene.aPlayer[1], this.oScene.oTraining.oDummyOptions);
                this.setSource(SceneManager.oTransverseData.MNU__aController[1]);

                // Dummy Options
                this.oScene.oTraining.oDummyOptions.oOpponent = this.oOpponent;
            },
            // onOpen: function(){},
            // onClose: function(){},

            change: function(sType, nChange){

                let nIndex = -1;
                switch( sType ){
                    case 'Controller':
                        const aController = [null, ...Object.keys(GameEngine.oInput.oController)]
                            .filter( sController => sController != SceneManager.oTransverseData.MNU__aController[0].sId );

                        nIndex = aController.indexOf(this.oOpponent.sController) + nChange;
                        if( nIndex >= aController.length ){
                            nIndex = 0;
                        } else if( nIndex < 0 ){
                            nIndex = aController.length - 1;
                        }
                        this.oOpponent.sController = aController[nIndex];
                        this.setSource( GameEngine.oInput.getController(this.oOpponent.sController) );
                        break;

                    default:
                        sType = 'n' + sType;
                        this.oOpponent[sType] += nChange;
                        if( this.oOpponent[sType] >= TrainingEngineOpponent.oParameter[sType].length ){
                            this.oOpponent[sType] = 0;
                        }
                        else if( this.oOpponent[sType] < 0 ){
                            this.oOpponent[sType] = TrainingEngineOpponent.oParameter[sType].length - 1;
                        }
                        break;
                }

                StoreEngine.update('TNG__Opponent', this.oOpponent);
            },
            reset: function(){
                Object.assign( this.oOpponent, TrainingEngineOpponent.oDefault );
                StoreEngine.update('TNG__Opponent', this.oOpponent);
            },

            setSource: function(oController){
                if( oController ){
                    this.oOpponent.sController = oController.sId;
                    this.oSourceBuffer.oLocal.init(oController);
                    this.oScene.aPlayer[1].oInputBuffer.init(this.oSourceBuffer.oLocal);
                } else {
                    this.oOpponent.sController = null;
                    this.oScene.aPlayer[1].oInputBuffer.init(this.oSourceBuffer.oOpponent);
                }
            },
            switchSource: function(bStart){
                const sIndex = bStart ? 'start' : 'stop',
                    oIndex = {
                        start: [1, 0],
                        stop: [0, 1]
                    };

                this.oScene.aPlayer[ oIndex[sIndex][0] ].oInputBuffer.init(this.oSourceBuffer.oPlayer);
                this.oScene.aPlayer[ oIndex[sIndex][1] ].oInputBuffer.init(
                    bStart ?
                        null :
                        this.oSourceBuffer[ this.oOpponent.sController ? 'oLocal' : 'oOpponent' ]
                );
            }
        }
    }
);