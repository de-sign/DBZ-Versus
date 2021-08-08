/*  ----- TrainingMenu - Dummy ----- */
function TrainingMenuDummy(){
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuDummy, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuDummy,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    this.oLayer = OutputManager.getElement('LAY__Training_Menu_Dummy');
                },
                controls: function(){
                    let sRedirection = null;
                    const oMenuSelected = this.oMenu.getSelected();
                    this.oScene.oController.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            switch(oMenuSelected.sId){
                                case 'TXT__Training_Menu_Dummy_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'LAY__Training_Menu_Dummy_Record':
                                    sRedirection = 'record';
                                    break;
                                default:
                                    this.change(1);
                                    break;
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
                        },
                        // Gestion changement
                        LEFT: () => {
                            if( oMenuSelected.sId != 'LAY__Training_Menu_Dummy_Record' ){
                                this.change(-1);
                            }
                        },
                        RIGHT: () => {
                            if( oMenuSelected.sId != 'LAY__Training_Menu_Dummy_Record' ){
                                this.change(1);
                            }
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
                    Object.keys(this.oEngine.oParam).forEach( (sParam, nIndex) => {
                        const uParam = this.oEngine.oParam[sParam],
                            oText = this.oLayer.aChildElement[nIndex].aChildElement[0];

                        switch( sParam ){
                            case 'sController':
                                oText.setText( uParam ? GameEngine.oInput.getController(uParam).sName : 'Dummy' );
                                break;
                            case 'bTechThrow':
                                oText.setText( uParam ? 'Yes' : 'No' );
                                break;
                            case 'sCounter':
                                oText.setText( uParam ? this.oEngine.oCounter[uParam] : 'No counter' );
                                break;
                            case 'aRecord':
                                oText.setText( uParam ? 'Record found' : 'No record' );
                                break;
                            default:
                                oText.setText( TrainingEngineDummy.oParameter[sParam][uParam] );
                                break;
                        }
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineDummy ----- */
function TrainingEngineDummy(oScene){
    this.oScene = null;
    this.oSourceBuffer = {
        oPlayer: null,
        oLocal: new BattleInputSourceBufferLocal(null),
        oDummy: null
    };

    this.oParam = {};
    this.oCounter = {
        'record': 'Play record'
    };

    this.init(oScene);
}

Object.assign(
    TrainingEngineDummy, {

        oParameter: {
            nStance: ['Stand', 'Play record', 'Jump', 'Forward Jump', 'Backward Jump'],
            nGuard: ['No guard', 'After 1st hit', 'Only 1st hit', 'All', 'Reflect', 'Random'],
            nReversal: ['No reversal', 'Forward', 'Backward']
        },

        prototype: {
            constructor: TrainingEngineDummy,
            init: function(oScene){
                this.oScene = oScene;

                Object.assign(
                    this.oParam,
                    {
                        sController: null,
                        nStance: 0,
                        nGuard: 0,
                        bTechThrow: false,
                        sCounter: null,
                        nReversal: 0,
                        aRecord: null
                    },
                    StoreEngine.get('TNG_Dummy') || {}
                );

                this.oSourceBuffer.oPlayer = this.oScene.aPlayer[0].oInputBuffer.oSource;
                this.oSourceBuffer.oDummy = new BattleInputSourceBufferDummy(this.oScene.aPlayer[1], this.oParam);

                this.initCounter();
                this.setSource(SceneManager.oTransverseData.MNU__aController[1]);
            },
            update: function(){},
            destroy: function(){},

            // onInit: function(){},
            // onOpen: function(){},
            // onClose: function(){},

            change: function(sType, nChange){

                let nIndex = -1;
                switch( sType ){
                    case 'Controller':
                        const aController = [null, ...Object.keys(GameEngine.oInput.oController)]
                            .filter( sController => sController != SceneManager.oTransverseData.MNU__aController[0].sId );

                        nIndex = aController.indexOf(this.oParam.sController) + nChange;
                        if( nIndex >= aController.length ){
                            nIndex = 0;
                        } else if( nIndex < 0 ){
                            nIndex = aController.length - 1;
                        }
                        this.oParam.sController = aController[nIndex];
                        this.setSource( GameEngine.oInput.getController(this.oParam.sController) );
                        break;

                    case 'TechThrow':
                        this.oParam.bTechThrow = !this.oParam.bTechThrow;
                        break;

                    case 'Counter':
                        const aCommand = [ null, ...Object.keys(this.oCounter) ];
                        nIndex = aCommand.indexOf(this.oParam.sCounter) + nChange;
                        if( nIndex >= aCommand.length ){
                            nIndex = 0;
                        } else if( nIndex < 0 ){
                            nIndex = aCommand.length - 1;
                        }
                        this.oParam.sCounter = aCommand[nIndex];
                        break;

                    default:
                        sType = 'n' + sType;
                        this.oParam[sType] += nChange;
                        if( this.oParam[sType] >= TrainingEngineDummy.oParameter[sType].length ){
                            this.oParam[sType] = 0;
                        }
                        else if( this.oParam[sType] < 0 ){
                            this.oParam[sType] = TrainingEngineDummy.oParameter[sType].length - 1;
                        }
                        break;
                }

                StoreEngine.update('TNG_Dummy', this.oParam);
            },

            initCounter: function(){
                const aCommands = this.oScene.aPlayer[1].oData.oCommands.aGround;
                for( let nIndex = aCommands.length - 1; nIndex >= 0; nIndex-- ){
                    const oCommand = aCommands[nIndex];
                    if( oCommand.sAnimation != 'attack_2D' ){
                        this.oCounter[oCommand.sCod] = oCommand.oList.sName;
                    }
                }
                if( !this.oCounter[ this.oParam.sCounter ] ){
                    this.oParam.sCounter = null;
                }
            },
            setSource: function(oController){
                if( oController ){
                    this.oParam.sController = oController.sId;
                    this.oSourceBuffer.oLocal.init(oController);
                    this.oScene.aPlayer[1].oInputBuffer.init(this.oSourceBuffer.oLocal);
                } else {
                    // TODO DUMMY
                    this.oParam.sController = null;
                    this.oScene.aPlayer[1].oInputBuffer.init(this.oSourceBuffer.oDummy);
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
                        this.oSourceBuffer[ this.oParam.sController ? 'oLocal' : 'oDummy' ]
                );
            },

            saveRecord: function(){
                let nFrame = 0;
                this.oParam.aRecord = [];
                this.oScene.aPlayer[1].oInputBuffer.aHistory.forEach( (oHistory, nIndex) => {

                    let oCopy = Object.assign( {}, oHistory );

                    // Suppréssion du NEUTRAL superflux en début et fin
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
                        this.oParam.aRecord.push(oCopy);
                    }
                } );
                StoreEngine.update('TNG_Dummy', this.oParam);
                this.switchSource();
            }
        }
    }
);