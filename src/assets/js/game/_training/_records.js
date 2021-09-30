/* TrainingMenu - Records */
function TrainingMenuRecords(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuRecords, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuRecords,
                /*
                init: function(){ },
                update: function(){ },
                destroy: function(){ },
                */
                
                controls: function(){
                    let sRedirection = null;

                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            switch( this.oMenu.getSelected().sId ){
                                case 'TXT__Training_Menu_Records_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Records_Reset':
                                    this.oEngine.reset();
                                    break;
                                default:
                                    this.oEngine.nRecord = this.oMenu.aCursor[0].nIndexCurrent;
                                    sRedirection = 'record';
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
                    } );

                    return sRedirection;
                },
                display: function(){
                    this.oEngine.aRecords.forEach( (aRecord, nIndex) => {
                        const oText = this.oMenu.oLayer.aChildElement[nIndex].aChildElement[0],
                            bChange = aRecord;
                        
                        oText.hElement.classList[ bChange ? 'add' : 'remove' ]('--change');
                        oText.setText( bChange ? aRecord[ aRecord.length - 1 ].nFrame + ' frames' : 'Empty' );
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineRecords ----- */
function TrainingEngineRecords(oScene){
    this.oScene = null;
    this.nRecord = null;
    this.aRecords = [null, null, null, null, null];
    this.init(oScene);
}

Object.assign(
    TrainingEngineRecords, {

        prototype: {
            constructor: TrainingEngineRecords,
            init: function(oScene){
                this.oScene = oScene;

                const aRecords = StoreEngine.get('TNG_Records');
                if( aRecords ){
                    this.aRecords = aRecords;
                } else {
                    this.reset();
                }
            },
            update: function(){ },
            destroy: function(){ },

            // onInit: function(){},
            // onOpen: function(){},
            // onClose: function(){},

            reset: function(){
                this.aRecords = [null, null, null, null, null];
                StoreEngine.update('TNG_Records', this.aRecords);
            },

            saveRecord: function(){
                let nFrame = 0;
                const aRecord = [];

                this.oScene.aPlayer[1].oInputBuffer.aHistory.forEach( (oHistory, nIndex) => {

                    let oCopy = Object.assign( {}, oHistory );

                    // Suppréssion du NEUTRAL superflux en début et fin
                    // TODO DEL DOWN + START ?
                    if( nIndex == 0 || ( nIndex == this.oScene.aPlayer[1].oInputBuffer.aHistory.nLength - 1 ) ){
                        const aBtn = Object.keys(oHistory.oButtons);
                        if( aBtn.length == 1 && aBtn[0] == 'NT' ){
                            oCopy = null;
                        }
                    }

                    if( oCopy ){
                        nFrame || ( nFrame = oHistory.nFrame );
                        oCopy.nFrame -= nFrame - 1;
                        for( let sBtn in oCopy.oButtons ){
                            oCopy.oButtons[sBtn] = Math.max(0, oCopy.oButtons[sBtn] - nFrame);
                        }
                        aRecord.push(oCopy);
                    }
                } );

                this.aRecords[ this.nRecord ] = aRecord;
                StoreEngine.update('TNG_Records', this.aRecords);
            }
        }
    }
);
