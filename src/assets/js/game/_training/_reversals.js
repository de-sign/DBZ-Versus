/* TrainingMenu - Reversals */
function TrainingMenuReversals(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuReversals, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuReversals,
                /*
                init: function(){ },
                update: function(){ },
                destroy: function(){ },
                */
                
                controls: function(){
                    let sRedirection = null;
                    const nIndexMenu = this.oMenu.aCursor[0].nIndexCurrent;

                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            switch( this.oMenu.getSelected().sId ){
                                case 'TXT__Training_Menu_Reversals_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Reversals_Reset':
                                    this.oEngine.reset();
                                    break;
                                default:
                                    this.oEngine.change(nIndexMenu, 1);
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
                        UP: () => {
                            this.oMenu.prev();
                        },
                        DOWN: () => {
                            this.oMenu.next();
                        },
                        LEFT: () => {
                            this.oEngine.change(nIndexMenu, -1);
                        },
                        RIGHT: () => {
                            this.oEngine.change(nIndexMenu, 1);
                        }
                    } );

                    return sRedirection;
                },
                display: function(){
                    Object.keys(this.oEngine.oReversals).forEach( (sParam, nIndex) => {
                        
                        const sReversal = this.oEngine.oReversals[sParam],
                            oText = this.oMenu.oLayer.aChildElement[nIndex].aChildElement[0],
                            bChange = sReversal;
                        
                        oText.hElement.classList[ bChange ? 'add' : 'remove' ]('--change');
                        oText.setText( sReversal ? this.oEngine.oData[sReversal] : 'No reversal' );
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineReversals ----- */
function TrainingEngineReversals(oScene){
    this.oScene = null;
    this.oReversals = {};
    this.oData = {};
    this.init(oScene);
}

Object.assign(
    TrainingEngineReversals, {

        oDefault: {
            sRestart: null,
            sBlock: null,
            sHit: null,
            sRecovery: null
        },

        prototype: {
            constructor: TrainingEngineReversals,
            init: function(oScene){
                this.oScene = oScene;
                Object.assign( this.oReversals, TrainingEngineReversals.oDefault, StoreEngine.get('TNG__Reversals') || {});
                this.initData();

                for( let sType in this.oReversals ){
                    if( !this.oData[ this.oReversals[sType] ] ){
                        this.oReversals[sType] = null;
                    }
                }
            },
            update: function(){ },
            destroy: function(){ },

            onInit: function(){
                this.oScene.oTraining.oDummyOptions.oReversals = this.oReversals;
            },
            // onOpen: function(){},
            // onClose: function(){},

            reset: function(){
                Object.assign( this.oReversals, TrainingEngineReversals.oDefault);
                StoreEngine.update('TNG__Reversals', this.oReversals);
            },

            initData: function(){
                const aCommands = this.oScene.aPlayer[1].oData.oCommands.aGround;
                for( let nIndex = aCommands.length - 1; nIndex >= 0; nIndex-- ){
                    const oCommand = aCommands[nIndex];
                    if( oCommand.sAnimation != 'attack_2D' ){
                        this.oData[oCommand.sCod] = oCommand.oList.sName;
                    }
                }

                Object.keys(TrainingEngineRecords.oDefault).forEach( (sRecord, nIndex) => {
                    this.oData[sRecord] = 'Record #' + ( nIndex + 1 );
                } );
            },

            change: function(nProp, nChange){
                const aCommand = [ null, ...Object.keys(this.oData) ],
                    sProp = Object.keys(TrainingEngineReversals.oDefault)[nProp];

                nIndex = aCommand.indexOf(this.oReversals[sProp]) + nChange;
                if( nIndex >= aCommand.length ){
                    nIndex = 0;
                } else if( nIndex < 0 ){
                    nIndex = aCommand.length - 1;
                }
                this.oReversals[sProp] = aCommand[nIndex];
                StoreEngine.update('TNG__Reversals', this.oReversals);
            }
        }
    }
);
