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
                            oLifeKi: GAME.oOutput.getElement('LAY__Training_Menu_Parameters_LifeKi_' + oPlayer.nPlayer),
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
                                case 'LAY__Training_Menu_Parameters_LifeKi_1':
                                    this.oEngine.changeLifeKi(0);
                                    break;
                                case 'LAY__Training_Menu_Parameters_LifeKi_2':
                                    this.oEngine.changeLifeKi(1);
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
                            if( sType == 'oLifeKi' ){
                                oLayer[sType].aChildElement[0].setText( oParam.nLife + ' / ' + oParam.nKi );
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
                        nLife: 14,
                        nKi: GAME.oSettings.nLife - 14,
                        bRegenLife: false,
                        bRegenKi: true
                    } );
                    this.setLifeKi(nIndex);
                } );
            },
            update: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    const oParam = this.aParam[nIndex];
                    if( oPlayer.oAnimation.sType == 'movement' && oPlayer.oAnimation.nCurrentFrame == 1 ){
                        if( oPlayer.nLife <= 0 || ( oParam.bRegenLife && oPlayer.nLife < oParam.nLife ) ){
                            if( oPlayer.nKi > oParam.nKi ){
                                this.setLifeKi(nIndex);
                            } else {
                                oPlayer.nLife = oParam.nLife;
                            }
                        }
                        if( oParam.bRegenKi && oPlayer.nKi < oParam.nKi ){
                            oPlayer.nKi = oParam.nKi;
                        }
                    }
                } );
            },
            destroy: function(){
            },

            // onOpen: function(){},
            onClose: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.setLifeKi(nIndex);
                } );
            },

            changeLifeKi: function(nIndex){
                const oParam = this.aParam[nIndex];
                oParam.nLife = oParam.nLife == 1 ? GAME.oSettings.nLife : oParam.nLife - 1;
                oParam.nKi = GAME.oSettings.nLife - oParam.nLife;
            },
            setLifeKi: function(nIndex){
                const oParam = this.aParam[nIndex];
                this.oScene.aPlayer[nIndex].nLife = oParam.nLife;
                this.oScene.aPlayer[nIndex].nKi = oParam.nKi;
            },
            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];
            }
        }
    }
);
