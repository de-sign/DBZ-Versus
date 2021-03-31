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
                    this.oKeyboard.ifPressedNow( {
                        // Gestion validation
                        A: () => {
                            let oMenuSelected = this.oMenu.getSelected();
                            switch( oMenuSelected.sId ){
                                case 'LAY__Training_Menu_Parameters_Life_1':
                                    this.oEngine.changeStat(0, 'Life');
                                    break;
                                case 'LAY__Training_Menu_Parameters_Life_2':
                                    this.oEngine.changeStat(1, 'Life');
                                    break;
                                case 'LAY__Training_Menu_Parameters_Ki_1':
                                    this.oEngine.changeStat(0, 'Ki');
                                    break;
                                case 'LAY__Training_Menu_Parameters_Ki_2':
                                    this.oEngine.changeStat(1, 'Ki');
                                    break;
                                case 'LAY__Training_Menu_Parameters_RegenLife_1':
                                    this.oEngine.changeRegen(0, 'Life');
                                    break;
                                case 'LAY__Training_Menu_Parameters_RegenLife_2':
                                    this.oEngine.changeRegen(1, 'Life');
                                    break;
                                case 'LAY__Training_Menu_Parameters_RegenKi_1':
                                    this.oEngine.changeRegen(0, 'Ki');
                                    break;
                                case 'LAY__Training_Menu_Parameters_RegenKi_2':
                                    this.oEngine.changeRegen(1, 'Ki');
                                    break;
                                case 'LAY__Training_Menu_Parameters_Return':
                                    sRedirection = 'return';
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
                },
                display: function(){
                    this.aLayer.forEach( (oLayer, nIndex) => {
                        const oParam = this.oEngine.aParam[nIndex];
                        for( let sType in oLayer){
                            if( sType.indexOf('bRegen') == -1 ){
                                oLayer[sType].aChildElement[0].setText( oParam[sType] / 2 );
                            } else {
                                oLayer[sType].aChildElement[0].setText( oParam[sType] ? 'Yes' : 'No' );
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

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.aParam.push( {
                        nLife: GAME.oSettings.nLife,
                        nKi: GAME.oSettings.nKi,
                        bRegenLife: true,
                        bRegenKi: true
                    } );
                    this.setStat(nIndex, 'Life');
                    this.setStat(nIndex, 'Ki');
                } );
            },
            update: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    const oParam = this.aParam[nIndex];
                    if( oPlayer.oAnimation.sType == 'movement' && oPlayer.oAnimation.nCurrentFrame == 1 ){
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

            // onOpen: function(){},
            onClose: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.setStat(nIndex, 'Life');
                    this.setStat(nIndex, 'Ki');
                } );
            },

            changeStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex],
                    oMinStat = {
                        nLife: 1,
                        nKi: 0
                    };
                sStat = 'n' + sStat;
                oParam[sStat] = oParam[sStat] == oMinStat[sStat] ? GAME.oSettings[sStat] : oParam[sStat] - 1;
            },
            setStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex];
                sStat = 'n' + sStat;
                this.oScene.aPlayer[nIndex][sStat] = oParam[sStat];
            },
            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];
            }
        }
    }
);
