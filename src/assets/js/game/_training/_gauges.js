/* TrainingMenu - Gauges */
function TrainingMenuGauges(){
    this.aLayer = [];
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuGauges, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuGauges,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    
                    this.oScene.aPlayer.forEach( oPlayer => {
                        this.aLayer.push( {
                            nLife: OutputManager.getElement('LAY__Training_Menu_Gauges_Life_' + oPlayer.nPlayer),
                            nKi: OutputManager.getElement('LAY__Training_Menu_Gauges_Ki_' + oPlayer.nPlayer),
                            bRegenLife: OutputManager.getElement('LAY__Training_Menu_Gauges_Regen_Life_' + oPlayer.nPlayer),
                            bRegenKi: OutputManager.getElement('LAY__Training_Menu_Gauges_Regen_Ki_' + oPlayer.nPlayer)
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
                            if( this.oMenu.getSelected().sId == 'TXT__Training_Menu_Gauges_Return' ){
                                sRedirection = 'return';
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
                    const oMenuSelected = this.oMenu.getSelected(),
                        aMenu = oMenuSelected.sId.split('_'),
                        nPlayer = parseInt( aMenu.pop() ) - 1,
                        sType = aMenu.pop(),
                        bRegen = oMenuSelected.sId.indexOf('_Regen_') != -1;

                    this.oEngine[ bRegen ? 'changeRegen' : 'changeStat' ](nPlayer, sType, nChange);
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
                                oLayer[sType].aChildElement[0].setText( oParam[sType] / GameSettings.oKi.nBar );
                            }
                            else if( sType == 'nLife' ) {
                                oLayer[sType].aChildElement[0].setText( oParam[sType] );
                            }
                        }
                    } );
                }
            }
        )
    }
);

/* ----- TrainingEngineGauges ----- */
function TrainingEngineGauges(oScene){
    this.oScene = null;
    
    this.aParam = [];
    this.init(oScene);
}

Object.assign(
    TrainingEngineGauges, {

        prototype: {
            constructor: TrainingEngineGauges,
            init: function(oScene){
                this.oScene = oScene;

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.aParam.push( StoreEngine.get('TNG_Gauges_' + nIndex) || {
                        nLife: GameSettings.oLife.player,
                        nKi: GameSettings.oKi.nMax,
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
                        nLife: 10 * GameSettings.oLife.player / 100,
                        nKi: 0
                    },
                    oMaxStat = {
                        nLife: GameSettings.oLife.player,
                        nKi: GameSettings.oKi.nMax
                    },
                    oRatio = {
                        nLife: 10 * GameSettings.oLife.player / 100,
                        nKi: GameSettings.oKi.nBar
                    };

                oParam[sStat] += nChange * oRatio[sStat];
                if( oParam[sStat] > oMaxStat[sStat] ){
                    oParam[sStat] = oMinStat[sStat];
                }
                else if( oParam[sStat] < oMinStat[sStat] ){
                    oParam[sStat] = oMaxStat[sStat];
                }

                StoreEngine.update('TNG_Gauges_' + nIndex, oParam);
            },
            setStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex];
                sStat = 'n' + sStat;
                this.oScene.aPlayer[nIndex][sStat] = oParam[sStat];
            },

            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];

                StoreEngine.update('TNG_Gauges_' + nIndex, this.aParam[nIndex]);
            }
        }
    }
);
