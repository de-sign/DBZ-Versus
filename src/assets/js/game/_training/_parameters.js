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
                        nSide: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_Side')
                    } );

                    this.oScene.aPlayer.forEach( oPlayer => {
                        this.aLayer.push( {
                            nLife: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_Life_' + oPlayer.nPlayer),
                            nKi: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_Ki_' + oPlayer.nPlayer),
                            bRegenLife: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_RegenLife_' + oPlayer.nPlayer),
                            bRegenKi: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_RegenKi_' + oPlayer.nPlayer)
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
                    GAME.oOutput.getChannel('OA_SFX').play('validate');
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
                                oLayer[sType].aChildElement[0].setText( GAME.oSettings.oSide.aSide[oParam[sType]].sName );
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

                this.aParam.push( GameStore.get('Parameters') || {
                    nSide: GAME.oSettings.oSide.nDefault
                } );

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    nIndex++;
                    this.aParam.push( GameStore.get('Parameters_' + nIndex) || {
                        nLife: GAME.oSettings.oLife.player,
                        nKi: GAME.oSettings.nKi,
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
                    if( oPlayer.oAnimation.sType == 'movement' && oPlayer.oAnimation.nTick == 1 ){
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

            onInit: function(){
                this.oScene.oTraining.restart = this.restart.bind(this);
            },
            // onOpen: function(){},
            onClose: function(){
                this.oScene.bRestart && this.restart();
                this.oScene.bRestart = false;
            },

            changeStat: function(nIndex, sStat, nChange){
                sStat = 'n' + sStat;
                const oParam = this.aParam[nIndex],
                    oMinStat = {
                        nLife: 1,
                        nKi: 0
                    },
                    oMaxStat = {
                        nLife: GAME.oSettings.oLife.player,
                        nKi: GAME.oSettings.nKi
                    };

                oParam[sStat] += nChange;
                if( oParam[sStat] > oMaxStat[sStat] ){
                    oParam[sStat] = oMinStat[sStat];
                }
                else if( oParam[sStat] < oMinStat[sStat] ){
                    oParam[sStat] = oMaxStat[sStat];
                }

                GameStore.update('Parameters_' + nIndex, oParam);
            },
            setStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex];
                sStat = 'n' + sStat;
                this.oScene.aPlayer[nIndex - 1][sStat] = oParam[sStat];
            },

            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];

                GameStore.update('Parameters_' + nIndex, this.aParam[nIndex]);
            },

            changeSide: function(nChange){
                const oParam = this.aParam[0];
                oParam.nSide += nChange;

                if( oParam.nSide >= GAME.oSettings.oSide.aSide.length ){
                    oParam.nSide = 0;
                }
                else if( oParam.nSide < 0 ){
                    oParam.nSide = GAME.oSettings.oSide.aSide.length - 1;
                }

                GameStore.update('Parameters', oParam);
            },
            setPosition: function(nIndex){
                const oPlayer = this.oScene.aPlayer[nIndex];
                oPlayer.bReverse = oPlayer.nPlayer == 2;
                oPlayer.oLayer.resetPosition();
                oPlayer.moveLayer( GAME.oSettings.oSide.aSide[ this.aParam[0].nSide ].fPosition(this.oScene.oArea, nIndex) );
            },

            restart: function(){
                // Entity
                BattleEntity.get().forEach( oEntity => {
                    if( oEntity.constructor != BattlePlayer ){
                        oEntity.destroy();
                    }
                } );

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    nIndex++;

                    // Bars
                    this.setStat(nIndex, 'Life');
                    this.setStat(nIndex, 'Ki');

                    // Perso
                    oPlayer.oLunch = null;
                    oPlayer.setStance('stand', true);
                    this.setPosition(nIndex - 1);
                } );
            }
        }
    }
);
