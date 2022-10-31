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
                            switch( this.oMenu.getSelected().sId ){
                                case 'TXT__Training_Menu_Gauges_Return':
                                    sRedirection = 'return';
                                    break;
                                case 'TXT__Training_Menu_Gauges_Reset':
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

                            const oText = oLayer[sType].aChildElement[0],
                                bChange = oParam[sType] != TrainingEngineGauges.oDefault[sType];

                            if( sType.indexOf('bRegen') != -1 ){
                                oText.setText( oParam[sType] ? 'Yes' : 'No' );
                            }
                            else if( sType == 'nKi' ) {
                                oText.setText( oParam[sType] / GameSettings.oKi.nBar );
                            }
                            else if( sType == 'nLife' ) {
                                oText.setText( oParam[sType] );
                            }
                            oText.hElement.classList[ bChange ? 'add' : 'remove' ]('--change');
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
    this.aLast = [];
    this.init(oScene);
}

Object.assign(
    TrainingEngineGauges, {

        oDefault: {
            nLife: GameSettings.oBattleElement.Player.nLife,
            nKi: GameSettings.oKi.nMax,
            bRegenLife: true,
            bRegenKi: true
        },

        prototype: {
            constructor: TrainingEngineGauges,
            init: function(oScene){
                this.oScene = oScene;

                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    this.aParam.push( Object.assign( {}, TrainingEngineGauges.oDefault, StoreEngine.get('TNG__Gauges_' + nIndex) ) );
                    this.setStat(nIndex, 'Life');
                    this.setStat(nIndex, 'Ki');
                } );
            },
            update: function(){
                this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                    const oParam = this.aParam[nIndex],
                        oOpponent = this.oScene.aPlayer[ oPlayer.nPlayer % 2 ];

                    if(
                        (
                            oPlayer.nLife <= 0
                            || (
                                oParam.bRegenLife
                                && oPlayer.nLife < oParam.nLife
                            )
                        )
                        && oPlayer.oAnimation.is('movement') && oPlayer.oAnimation.nTick == 1
                    ){
                        this.setStat(nIndex, 'Life');
                    }

                    if( oParam.bRegenKi ){
                        if(
                            oPlayer.nKi < oParam.nKi
                            && (
                                !oOpponent.oDamage.nFrameStart
                                || this.aLast[nIndex] != oOpponent.oDamage.nFrameStart
                            )
                        ){
                            this.setStat(nIndex, 'Ki');
                        }
                        this.aLast[nIndex] = oOpponent.oDamage.nFrameStart;
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
                        nLife: 10 * GameSettings.oBattleElement.Player.nLife / 60,
                        nKi: 0
                    },
                    oMaxStat = {
                        nLife: GameSettings.oBattleElement.Player.nLife,
                        nKi: GameSettings.oKi.nMax
                    },
                    oRatio = {
                        nLife: 10 * GameSettings.oBattleElement.Player.nLife / 60,
                        nKi: GameSettings.oKi.nBar
                    };

                oParam[sStat] += nChange * oRatio[sStat];
                if( oParam[sStat] > oMaxStat[sStat] ){
                    oParam[sStat] = oMinStat[sStat];
                }
                else if( oParam[sStat] < oMinStat[sStat] ){
                    oParam[sStat] = oMaxStat[sStat];
                }

                StoreEngine.update('TNG__Gauges_' + nIndex, oParam);
            },
            setStat: function(nIndex, sStat){
                const oParam = this.aParam[nIndex];
                sStat = 'n' + sStat;
                this.oScene.aPlayer[nIndex][sStat] = oParam[sStat];
            },

            changeRegen: function(nIndex, sRegen){
                sRegen = 'bRegen' + sRegen;
                this.aParam[nIndex][sRegen] = !this.aParam[nIndex][sRegen];

                StoreEngine.update('TNG__Gauges_' + nIndex, this.aParam[nIndex]);
            },

            reset: function(){
                for( let nIndex = 0; nIndex < this.aParam.length; nIndex++ ){
                    this.aParam[nIndex] = Object.assign( {}, TrainingEngineGauges.oDefault);
                    StoreEngine.update('TNG__Gauges_' + nIndex, this.aParam[nIndex]);
                }
            }
        }
    }
);
