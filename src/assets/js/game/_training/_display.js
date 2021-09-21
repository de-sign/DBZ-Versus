/* TrainingMenu - Display */
function TrainingMenuDisplay(){
    this.oLayer = {};
    TrainingMenu.apply(this, arguments);
}

Object.assign(
    TrainingMenuDisplay, {
        prototype: Object.assign(
            Object.create(TrainingMenu.prototype), {
                constructor: TrainingMenuDisplay,
                init: function(){
                    TrainingMenu.prototype.init.apply(this, arguments);
                    this.oLayer = {
                        bData: OutputManager.getElement('LAY__Training_Menu_Display_Data'),
                        bHistory: OutputManager.getElement('LAY__Training_Menu_Display_Input'),
                        bBox: OutputManager.getElement('LAY__Training_Menu_Display_Box'),

                        oFrameRate: OutputManager.getElement('LAY__Training_Menu_Display_Framerate')
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
                            if( this.oMenu.getSelected().sId == 'TXT__Training_Menu_Display_Return' ){
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
                    let oMenuSelected = this.oMenu.getSelected();
                    switch( oMenuSelected.sId ){
                        case 'LAY__Training_Menu_Display_Data':
                            this.oEngine.toogle('bData');
                            break;
                        case 'LAY__Training_Menu_Display_Input':
                            this.oEngine.toogle('bHistory');
                            break;
                        case 'LAY__Training_Menu_Display_Box':
                            this.oEngine.toogle('bBox');
                            break;
                        case 'LAY__Training_Menu_Display_Framerate':
                            this.oEngine.changeFrame(nChange);
                            break;
                    }
                    OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                },
                display: function(){
                    for( let sType in this.oLayer){
                        if( sType == 'oFrameRate' ){
                            this.oLayer[sType].aChildElement[0].setText( this.oEngine.getFrameRate() + 'fps' );
                        } else {
                            this.oLayer[sType].aChildElement[0].setText( this.oEngine.oParameters[sType] ? 'Show' : 'Hide' );
                        }
                    }
                }
            }
        )
    }
);

/* ----- TrainingEngineDisplay ----- */
function TrainingEngineDisplay(oScene){
    this.oScene = null;
    
    this.aBox = [];
    this.aHistory = [];
    this.aAnimation = [];
    this.aData = [];

    this.oParameters = {
        nFrameRate: 3,
        bData: true,
        bHistory: true,
        bBox: true
    };

    this.init(oScene);
}

Object.assign(
    TrainingEngineDisplay, {

        aShow: [ 'bData', 'bHistory', 'bBox' ],
        nHistory: 20,
        oSymbolHistory: {
            oNormal: {
                DB: '&#8601;',
                DN: '&#8595;',
                DF: '&#8600;',
                BW: '&#8592;',
                NT: '',
                FW: '&#8594;',
                UB: '&#8598;',
                UP: '&#8593;',
                UF: '&#8599;',
                A: 'A',
                B: 'B',
                C: 'C',
                D: 'D'
            },
            oReverse: {
                DB: '&#8600;',
                DN: '&#8595;',
                DF: '&#8601;',
                BW: '&#8594;',
                NT: '',
                FW: '&#8592;',
                UB: '&#8599;',
                UP: '&#8593;',
                UF: '&#8598;',
                A: 'A',
                B: 'B',
                C: 'C',
                D: 'D'
            }
        },

        aFrameRate: [ 6, 15, 30, 60 ],

        aDataInfo: [
            {
                sType: 'damages',
                sPattern: '<span class="--pattern">Real ( Scaling %, Base )</span>',
                sBlank: '- ( -%, - )'
            },
            {
                sType: 'combo',
                sPattern: '<span class="--pattern">Current ( Max. )</span>',
                sBlank: '- ( - )'
            },
            {
                sType: 'frames',
                sPattern: '<span class="--pattern">S.Up + Act. + Rcv. ( Tot. )</span>',
                sBlank: '- + - + - ( - )'
            },
            {
                sType: 'invulnerable',
                sPattern: '<span class="--pattern">Type ( Frame start ~ end )</span>',
                sBlank: '- ( - ~ - )'
            },
            {
                sType: 'entity',
                sPattern: '<span class="--pattern">Type : Act. ( Spawn frame )</span>',
                sBlank: '- : - ( - )'
            },
            {
                sType: 'advantage',
                sPattern: '<span class="--pattern">Advantage ( Frame on hit )</span>',
                sBlank: '- ( - )'
            },
        ],
        aDataAnimation: ['action', 'dash', 'guard', 'hit', 'launch', 'down', 'recovery'],
        aHurtAnimation: ['guard', 'hit', 'launch', 'down', 'recovery'],
        aFallAnimation: ['launch', 'down', 'recovery'],

        prototype: {
            init: function(oScene){
                this.oScene = oScene;

                Object.assign( this.oParameters, StoreEngine.get('TNG_Display') );

                oScene.aPlayer.forEach( oPlayer => {
                    const oHistory = OutputManager.getElement('LAY__Training_History_' + oPlayer.nPlayer),
                        oAnim = OutputManager.getElement('LAY__Training_Animation_' + oPlayer.nPlayer),
                        oData = OutputManager.getElement('LAY__Training_Data_' + oPlayer.nPlayer);

                    this.aHistory.push( oHistory );
                    this.aData.push( {
                        oLayer: oData,
                        oLast: {
                            damages: {},
                            combo: {},
                            frames: {},
                            invulnerable: {
                                oInvulnerable: true
                            },
                            entity: {},
                            advantage: {}
                        }
                    } );
                    this.aAnimation.push( {
                        oLayer: oAnim,
                        oLast: null
                    } );

                    oHistory.clean();
                    oAnim.hElement.innerHTML = '';
                    for( let nInfo = 0; nInfo < TrainingEngineDisplay.aDataInfo.length; nInfo++ ){
                        oData.aChildElement[nInfo + 1].setText( TrainingEngineDisplay.aDataInfo[nInfo].sPattern );
                    }
                } );

                TrainingEngineDisplay.aShow.forEach( sType => {
                    if( this.oParameters[sType] ){
                        this.show(sType);
                    }
                } );
                this.setFrameRate();
            },
            update: function(){
                this.updateHistory();
                this.updateBox();
                this.updateData();
            },
            destroy: function(){
                TrainingEngineDisplay.aShow.forEach( sType => {
                    this.hide(sType);
                } );
                this.setFrameRate(60);
                this.oScene.oContext.update();
            },

            // onInit: function(){}
            onOpen: function(){
                this.setFrameRate(60);
            },
            onClose: function(){
                this.setFrameRate();
            },

            // History
            updateHistory: function(){
                if( this.oParameters.bHistory ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        let nHistory = Math.max(0, oPlayer.oInputBuffer.aHistory.length - TrainingEngineDisplay.nHistory);
                        for( ; nHistory < oPlayer.oInputBuffer.aHistory.length; nHistory++ ){
                            const oHistory = oPlayer.oInputBuffer.aHistory[nHistory],
                                aBtn = Object.keys( oHistory.oButtons ),
                                oBtn = { A: true, B: true, C: true },
                                oSymbol = TrainingEngineDisplay.oSymbolHistory[ oHistory.bReverse ? 'oReverse' : 'oNormal' ];
                                
                            let oTextHist = this.aHistory[nIndex].aChildElement[oPlayer.oInputBuffer.aHistory.length - nHistory - 1],
                                sText = '',
                                sFrame = '';
                            
                            nIndex || aBtn.unshift( aBtn.pop() );
                            aBtn.forEach( sBtn => {
                                if( oSymbol[sBtn] ){
                                    sText += '<b class="Training__InputButton ' + ( oBtn[sBtn] ? '--btn' : '--dir' ) +  '">' + oSymbol[sBtn] + '</b>';
                                }
                            } );
                            
                            if( nHistory == oPlayer.oInputBuffer.aHistory.length - 1 ){
                                sFrame = '<i>' + ( TimerEngine.nFrames - oHistory.nFrame + 1 ) + '</i>';
                            } else {
                                sFrame = '<i>' + ( oPlayer.oInputBuffer.aHistory[ nHistory + 1 ].nFrame - oHistory.nFrame ) + '</i>';
                            }
                            nIndex ? (sText = sFrame + sText) : (sText += sFrame);
                            
                            if( oTextHist ){
                                oTextHist.setText(sText);
                            } else {
                                oTextHist = new OutputManager.OutputText(sText);
                                this.aHistory[nIndex].add(oTextHist);
                            }
                        }
                    } );
                }
            },
            cleanHistory: function(){
                this.aHistory.forEach( oHistory => oHistory.clean() );
            },

            // Box
            updateBox: function(){
                if( this.oParameters.bBox ){
                    BattleEntity.get().forEach( oEntity => {
                        if( !oEntity.isDead() ){
                            ['oPositionBox', 'aHurtBox', 'aHitBox'].forEach( sBox => {
                                const aBox = oEntity.getBox(sBox, true),
                                    oLayer = OutputManager.getElement('LAY__Training_' + sBox.slice(1) + '_' + oEntity.sId),
                                    nMaxElement = Math.max( oLayer.hElement.children.length, aBox.length );
                                
                                oLayer.addTickUpdate( () => {
                                    for( let nElement = 0; nElement < nMaxElement; nElement++ ){
                                        const oBox = aBox[nElement],
                                            hElement = this.getBox(oLayer, nElement);

                                        Object.assign(
                                            hElement.style,
                                            oBox ? 
                                                {
                                                    display: null,
                                                    left: ( oEntity.oPositionPoint.nX + oBox.nX ) + 'px',
                                                    top: ( oEntity.oPositionPoint.nY + oBox.nY ) + 'px',
                                                    width: oBox.nWidth + 'px',
                                                    height: oBox.nHeight + 'px'
                                                } :
                                                {
                                                    display: 'none'
                                                }
                                        );
                                    }
                                } );
                            } );
                        }
                    } );
                }
            },
            getBox: function(oLayer, nIndex){
                let hBox = oLayer.hElement.children[nIndex];
                if( !hBox ){
                    oLayer.hElement.appendChild( hBox = document.createElement('div') );
                }
                return hBox;
            },

            // Data
            updateData: function(){
                if( this.oParameters.bData ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        if( TrainingEngineDisplay.aDataAnimation.indexOf( oPlayer.oAnimation.sType ) != -1 ){
                            this.showData(oPlayer, nIndex);
                            this.showAnimation(oPlayer, nIndex);
                        }
                    } );
                }
            },
            showData: function(oPlayer, nIndex){
                // Data
                const oShowData = this.aData[nIndex],
                    oOpponent = this.oScene.aPlayer[ oPlayer.nPlayer % 2 ],

                    bAction = oPlayer.oAnimation.sType == 'action',

                    oCommandData = oPlayer.getCommandData(),
                    bHurt = TrainingEngineDisplay.aHurtAnimation.indexOf( oPlayer.oAnimation.sType ) != -1,

                    nHitting = oOpponent.oDamage.nHitting,
                    bChangeHitting = nHitting ? nHitting != oShowData.oLast.nHitting : true,

                    oNewData = {
                        damages: {
                            oCommandData,
                            bHit: oCommandData && oCommandData.sHurt == 'bHit',
                            bRecovery: oPlayer.oAnimation.getStep() == 'nRecovery'
                        },
                        combo: {
                            nDamage: oOpponent.oDamage.nDamage
                        },
                        frames: {
                            oAnimation: oPlayer.oAnimation
                        },
                        invulnerable: {
                            oInvulnerable: oCommandData && oCommandData.oProperty.oInvulnerable
                        },
                        entity: {
                            oAnimation: oPlayer.oAnimation,
                            oEntity: oPlayer.aEntity.length ? oPlayer.aEntity[ oPlayer.aEntity.length - 1 ] : null
                        },
                        advantage: {
                            oAnimation: oPlayer.oAnimation,
                            bHit: oCommandData && !!oCommandData.sHurt,
                            bHurt
                        }
                    };
                
                oShowData.oLast.nMax = Math.max(oOpponent.oDamage.nDamage, oShowData.oLast.nMax || 0);

                for( let nInfo = 0; nInfo < TrainingEngineDisplay.aDataInfo.length; nInfo++ ){

                    const oText = oShowData.oLayer.aChildElement[nInfo + 1],
                        oInfo = TrainingEngineDisplay.aDataInfo[nInfo],
                        oData = oNewData[oInfo.sType];

                    if( this.compareLastData(oShowData.oLast[oInfo.sType], oData) ){

                        switch( oInfo.sType ){
                            case 'damages':
                                if( bAction ){
                                    const oTakeDamage = oOpponent.oDamage.aHistory[ oOpponent.oDamage.aHistory.length - 1 ],
                                        oDamage = oData.oCommandData.oHit && oData.oCommandData.oHit.oDamage;

                                    if( oData.bHit && oTakeDamage ){
                                        oText.setText( oTakeDamage.nDamage + ' ( ' + oTakeDamage.nScaling + '%, ' + oTakeDamage.nBase + ' )' );
                                    }
                                    else if( bChangeHitting || oData.bRecovery ) {
                                        oText.setText( '- ( -%, ' + ( oDamage ? oDamage.nDamage : '-' ) + ' )' );
                                    }
                                } else {
                                    oText.setText(oInfo.sBlank);
                                }
                                break;
                                
                            case 'combo':
                                if( oData.nDamage ){
                                    oText.setText( oData.nDamage + ' ( ' + ( oShowData.oLast.nMax || '-' ) + ' )' );
                                }
                                else {
                                    oText.setText( '- ( ' + ( oShowData.oLast.nMax || '-' ) + ' )' );
                                }
                                break;
                                
                            case 'frames':
                                if( !bHurt ){
                                    const aText = [];
                                    ['nStartUp', 'nActive', 'nRecovery'].forEach( sStep => {
                                        aText.push( oData.oAnimation.oData[sStep] || '-' );
                                    } );
                                    oText.setText( aText.join(' + ') + ' ( ' + oData.oAnimation.nLength + ' )' );
                                }
                                else {
                                    oText.setText( oData.oAnimation.nLength + ' + - + - ( ' + oData.oAnimation.nLength + ' )' );
                                }
                                break;
                                
                            case 'invulnerable':
                                if( oData.oInvulnerable ){
                                    oText.setText( oData.oInvulnerable.sType + ' ( ' + oData.oInvulnerable.nStart + ' ~ ' + ( oData.oInvulnerable.nStart + oData.oInvulnerable.nLength - 1 ) + ' )' );
                                } else {
                                    oText.setText(oInfo.sBlank);
                                }
                                break;
                                
                            case 'entity':
                                if( oData.oEntity ){
                                    oText.setText( oData.oEntity.sType + ' : ' + oData.oEntity.oAnimation.nLength + ' ( ' + ( oData.oAnimation.nTick - oData.oEntity.oAnimation.nTick + 1 ) + ' )' );
                                }
                                else if( oData.oAnimation != oShowData.oLast[oInfo.sType].oAnimation ){
                                    oText.setText(oInfo.sBlank);
                                }
                                break;
                                
                            case 'advantage':
                                const oPlayerFrame = oPlayer.oAnimation.nLength - oPlayer.oAnimation.nTick + 1,
                                    oOpponentFrame = ( oData.bHurt || oData.bHit ) && oOpponent.oAnimation.nLength ?
                                        oOpponent.oAnimation.nLength - oOpponent.oAnimation.nTick + 1 :
                                        0,
                                    nText = oOpponentFrame - oPlayerFrame;
                                oText.setText( (nText < 0 ? nText : '+' + nText) + ' ( ' + ( oData.bHit ? oPlayer.oAnimation.nTick : '-' ) + ' )' );
                                break;
                        }

                        oShowData.oLast[oInfo.sType] = oData;
                    }
                }

                oShowData.oLast.nHitting = oOpponent.oDamage.nHitting;
            },
            compareLastData: function(oData, oNewData){
                let bChange = false;
                for( let sProp in oNewData ){
                    if( oData[sProp] != oNewData[sProp] ){
                        bChange = true;
                        break;
                    }
                }
                return bChange;
            },
            showAnimation: function(oPlayer, nIndex){
                // Animation
                const oAnimation = this.aAnimation[nIndex];
                if( oPlayer.oAnimation != oAnimation.oLast ){
                    oAnimation.oLast = oPlayer.oAnimation;
                    oAnimation.oLayer.hElement.innerHTML = '';
                }
                let sClass = '--' + oPlayer.oAnimation.sType;
                if( oPlayer.oAnimation.oFrame.bFreeze ){
                    sClass = '--freeze';
                } else if( oPlayer.oStatus.bGuard ){
                    sClass = '--guard';
                } else if( oPlayer.oAnimation.oFrame.aHitBox ){
                    sClass = '--damage';
                } else if( oPlayer.isInvulnerable(true) ){
                    sClass = '--invulnerable';
                }
                oAnimation.oLayer.hElement.innerHTML += '<span class="' + sClass + '"></span>';
            },

            // Gestion Affichage
            show: function(sType){
                if( TrainingEngineDisplay.aShow.indexOf(sType) != -1 ){
                    this.oParameters[sType] = true;
                    this.oScene.oContext.addTickUpdate( () => {
                        this.oScene.oContext.hElement.classList.add('--' + sType);
                    } );
                }
            },
            hide: function(sType){
                if( TrainingEngineDisplay.aShow.indexOf(sType) != -1 ){
                    this.oParameters[sType] = false;
                    this.oScene.oContext.addTickUpdate( () => {
                        this.oScene.oContext.hElement.classList.remove('--' + sType);
                    } );
                }
            },
            toogle: function(sType){
                if( TrainingEngineDisplay.aShow.indexOf(sType) != -1 ){
                    this[ this.oParameters[sType] ? 'hide' : 'show' ](sType);
                    StoreEngine.update('TNG_Display', this.oParameters);
                }
            },

            // FrameRate
            changeFrame: function(nChange){
                this.oParameters.nFrameRate += nChange;
                if( this.oParameters.nFrameRate >= TrainingEngineDisplay.aFrameRate.length ){
                    this.oParameters.nFrameRate = 0;
                }
                else if( this.oParameters.nFrameRate < 0 ){
                    this.oParameters.nFrameRate = TrainingEngineDisplay.aFrameRate.length - 1;
                }
                StoreEngine.update('TNG_Display', this.oParameters);
            },
            setFrameRate: function(nFrameRate){
                if( nFrameRate ){
                    TimerEngine.setFPS(nFrameRate);
                } else {
                    const nFPS = this.getFrameRate(),
                        oText = this.oScene.oDisplay.oModule.oText.oCurrent;
                    if( oText && oText.nLastFPS ){
                        TimerEngine.setFPS(nFPS / oText.nSlow);
                        oText.nLastFPS = nFPS;
                    } else {
                        TimerEngine.setFPS(nFPS);
                    }
                }
            },
            getFrameRate: function(){
                return TrainingEngineDisplay.aFrameRate[ this.oParameters.nFrameRate ];
            }
        }
    }
);