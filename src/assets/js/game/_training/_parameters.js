/* TrainingMenu - Parameters */
function TrainingMenuParameters(){
    this.aLayer = [];
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuParameters, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuParameters,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);

                    this.aLayer.push( {
                        nSide: OutputManager.getElement('LAY__Training_Menu_Parameters_Side')
                    } );

                    this.oScene.aPlayer.forEach( oPlayer => {
                        this.aLayer.push( {
                            nLife: OutputManager.getElement('LAY__Training_Menu_Parameters_Life_' + oPlayer.nPlayer),
                            nKi: OutputManager.getElement('LAY__Training_Menu_Parameters_Ki_' + oPlayer.nPlayer),
                            bRegenLife: OutputManager.getElement('LAY__Training_Menu_Parameters_RegenLife_' + oPlayer.nPlayer),
                            bRegenKi: OutputManager.getElement('LAY__Training_Menu_Parameters_RegenKi_' + oPlayer.nPlayer)
                        } );
                    } );
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
                            if( this.oMenu.getSelected().sId == 'LAY__Training_Menu_Parameters_Return' ){
                                sRedirection = 'return';
                            } else if( this.oMenu.getSelected().sId == 'LAY__Training_Menu_Parameters_Side' ){
                                sRedirection = 'restart';
                            } else {
                                this.change(1);
                            }
                        },
                        B: () => {
                            sRedirection = 'return';
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
                    let oMenuSelected = this.oMenu.getSelected();
                    switch( oMenuSelected.sId ){
                        case 'LAY__Training_Menu_Parameters_Life_1':
                            this.oEngine.changeStat(1, 'Life', nChange);
                            break;
                        case 'LAY__Training_Menu_Parameters_Life_2':
                            this.oEngine.changeStat(2, 'Life', nChange);
                            break;
                        case 'LAY__Training_Menu_Parameters_Ki_1':
                            this.oEngine.changeStat(1, 'Ki', nChange);
                            break;
                        case 'LAY__Training_Menu_Parameters_Ki_2':
                            this.oEngine.changeStat(2, 'Ki', nChange);
                            break;
                        case 'LAY__Training_Menu_Parameters_RegenLife_1':
                            this.oEngine.changeRegen(1, 'Life');
                            break;
                        case 'LAY__Training_Menu_Parameters_RegenLife_2':
                            this.oEngine.changeRegen(2, 'Life');
                            break;
                        case 'LAY__Training_Menu_Parameters_RegenKi_1':
                            this.oEngine.changeRegen(1, 'Ki');
                            break;
                        case 'LAY__Training_Menu_Parameters_RegenKi_2':
                            this.oEngine.changeRegen(2, 'Ki');
                            break;
                        case 'LAY__Training_Menu_Parameters_Side':
                            this.oEngine.changeSide(nChange);
                            break;
                    }
                    OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                },
                display: function(){
                    this.aLayer.forEach( (oLayer, nIndex) => {
                        const oParam = this.oEngine.aParam[nIndex];
                        for( let sType in oLayer){
                            if( sType.indexOf('bRegen') != -1 ){
                                oLayer[sType].aChildElement[0].setText( oParam[sType] ? 'Yes' : 'No' );
                            }
                            else if( sType == 'nKi' ) {
                                oLayer[sType].aChildElement[0].setText( oParam[sType] / 2 );
                            }
                            else if( sType == 'nLife' ) {
                                oLayer[sType].aChildElement[0].setText( oParam[sType] );
                            }
                            else if( sType == 'nSide' ) {
                                oLayer[sType].aChildElement[0].setText( GameSettings.oSide.aSide[oParam[sType]].sName );
                            }
                        }
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineParameters ----- */
function TrainingEngineParameters(oScene){
    this.oScene = null;
    
    this.aParam = [];
    this.init(oScene);
}

Object.assign(
    TrainingEngineParameters, {

        prototype: {
            constructor: TrainingEngineParameters,
            init: function(oScene){
                this.oScene = oScene;

                this.aParam.push( StoreEngine.get('Parameters') || {
                    nSide: GameSettings.oSide.nDefault
                } );

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    nIndex++;
                    this.aParam.push( StoreEngine.get('Parameters_' + nIndex) || {
                        nLife: GameSettings.oLife.player,
                        nKi: GameSettings.nKi,
                        bRegenLife: true,
                        bRegenKi: true
                    } );
                    this.setStat(nIndex, 'Life');
                    this.setStat(nIndex, 'Ki');

                    this.setPosition(nIndex - 1);
                } );
            },
            update: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    nIndex++;
                    const oParam = this.aParam[nIndex];
                    if( oPlayer.oAnimation.isMovement() && oPlayer.oAnimation.nTick == 1 ){
                        if( oPlayer.nLife <= 0 || ( oParam.bRegenLife && oPlayer.nLife < oParam.nLife ) ){
                            this.setStat(nIndex, 'Life');
                        }
                        if( oParam.bRegenKi && oPlayer.nKi < oParam.nKi ){
                            this.setStat(nIndex, 'Ki');
                        }
                    }
                } );
            },
            destroy: function(){
            },

            // onInit: function(){},
            // onOpen: function(){},
            // onClose: function(){},

            changeStat: function(nIndex, sStat, nChange){
                sStat = 'n' + sStat;
                const oParam = this.aParam[nIndex],
                    oMinStat = {
                        nLife: 1,
                        nKi: 0
                    },
                    oMaxStat = {
                        nLife: GameSettings.oLife.player,
                        nKi: GameSettings.nKi
                    };

                oParam[sStat] += nChange;
                if( oParam[sStat] > oMaxStat[sStat] ){
                    oParam[sStat] = oMinStat[sStat];
                }
                else if( oParam[sStat] < oMinStat[sStat] ){
                    oParam[sStat] = oMaxStat[sStat];
                }

                StoreEngine.update('Parameters_' + nIndex, oParam);
            },
            setStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex];
                sStat = 'n' + sStat;
                this.oScene.aPlayer[nIndex - 1][sStat] = oParam[sStat];
            },

            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];

                StoreEngine.update('Parameters_' + nIndex, this.aParam[nIndex]);
            },

            changeSide: function(nChange){
                const oParam = this.aParam[0];
                oParam.nSide += nChange;

                if( oParam.nSide >= GameSettings.oSide.aSide.length ){
                    oParam.nSide = 0;
                }
                else if( oParam.nSide < 0 ){
                    oParam.nSide = GameSettings.oSide.aSide.length - 1;
                }

                StoreEngine.update('Parameters', oParam);
            },
            setPosition: function(nIndex){
                const oPlayer = this.oScene.aPlayer[nIndex];
                oPlayer.bReverse = oPlayer.nPlayer == 2;
                oPlayer.oLayer.resetPosition();
                oPlayer.moveLayer( GameSettings.oSide.aSide[ this.aParam[0].nSide ].fPosition(this.oScene.oArea, nIndex) );
            }
        }
    }
);
