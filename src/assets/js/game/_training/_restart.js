/* TrainingMenu - Restart */
function TrainingMenuRestart(){
    this.oLayer = {};
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuRestart, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuRestart,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);

                    this.oLayer = {
                        nPosition: OutputManager.getElement('LAY__Training_Menu_Restart_Position'),
                        nSide: OutputManager.getElement('LAY__Training_Menu_Restart_Side')
                    };
                },
                /*
                udpate: function(){ },
                destroy: function(){ },
                */
                controls: function(){
                    let sRedirection = null;
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                case 'TXT__Training_Menu_Restart_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Restart_Restart':
                                    sRedirection = 'restart';
                                    break;
                                case 'TXT__Training_Menu_Restart_Reset':
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
                    const oMenuSelected = this.oMenu.getSelected(),
                        sType = oMenuSelected.sId.split('_').pop();

                    this.oEngine.change('n' + sType, nChange);
                    OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                },
                display: function(){
                    const oParam = this.oEngine.oParam;
                    for( let sType in this.oLayer){

                        const oText = this.oLayer[sType].aChildElement[0],
                            bChange = oParam[sType] != TrainingEngineRestart.oDefault[sType];

                        if( sType == 'nPosition' ) {
                            oText.setText( GameSettings.oSide.aSide[ oParam[sType] ].sName );
                        }
                        else if( sType == 'nSide' ) {
                            oText.setText( oParam[sType] ? 'Reverse' : 'Normal' );
                        }
                        oText.hElement.classList[ bChange ? 'add' : 'remove' ]('--change');
                    }
                }
            }
        )
    }
);

/* ----- TrainingEngineRestart ----- */
function TrainingEngineRestart(oScene){
    this.oScene = null;
    
    this.oParam = {};
    this.init(oScene);
}

Object.assign(
    TrainingEngineRestart, {

        oDefault: {
            nPosition: GameSettings.oSide.nDefault,
            nSide: 0
        },

        prototype: {
            constructor: TrainingEngineRestart,
            init: function(oScene){
                this.oScene = oScene;

                Object.assign( this.oParam, TrainingEngineRestart.oDefault, StoreEngine.get('TNG_Restart') || {} );

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.setPosition(nIndex);
                } );
            },
            update: function(){},
            destroy: function(){},

            // onInit: function(){},
            // onOpen: function(){},
            // onClose: function(){},

            change: function(sType, nChange){
                const oMax = {
                    nPosition: GameSettings.oSide.aSide.length - 1,
                    nSide: 1
                };

                this.oParam[sType] += nChange;
                if( this.oParam[sType] > oMax[sType] ){
                    this.oParam[sType] = 0;
                }
                else if( this.oParam[sType] < 0 ){
                    this.oParam[sType] = oMax[sType];
                }

                StoreEngine.update('TNG_Restart', this.oParam);
            },
            setPosition: function(nIndex){
                const oPlayer = this.oScene.aPlayer[nIndex];
                oPlayer.bReverse = oPlayer.nPlayer == 2;
                oPlayer.oLayer.resetPosition();
                oPlayer.moveLayer(
                    GameSettings.oSide.aSide[ this.oParam.nPosition ].fPosition(
                        nIndex,
                        this.oParam.nSide,
                        this.oScene.oArea
                    )
                );
            },

            reset: function(){
                Object.assign( this.oParam, TrainingEngineRestart.oDefault);
                StoreEngine.update('TNG_Restart', this.oParam);
            }
        }
    }
);