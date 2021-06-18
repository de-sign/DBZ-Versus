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
                        bHistory: OutputManager.getElement('LAY__Training_Menu_Display_Input'),
                        bBox: OutputManager.getElement('LAY__Training_Menu_Display_Box'),
                        bAnimation: OutputManager.getElement('LAY__Training_Menu_Display_Animations'),

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
                            if( this.oMenu.getSelected().sId == 'LAY__Training_Menu_Display_Return' ){
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
                        case 'LAY__Training_Menu_Display_Input':
                            this.oEngine.toogle('bHistory');
                            break;
                        case 'LAY__Training_Menu_Display_Box':
                            this.oEngine.toogle('bBox');
                            break;
                        case 'LAY__Training_Menu_Display_Animations':
                            this.oEngine.toogle('bAnimation');
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
                            this.oLayer[sType].aChildElement[0].setText( this.oEngine.oParameters.oShow[sType] ? 'Show' : 'Hide' );
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

    this.oParameters = {
        nFrameRate: 0,
        oShow: {
            bHistory: true,
            bBox: true,
            bAnimation: true
        }
    };

    this.init(oScene);
}

Object.assign(
    TrainingEngineDisplay, {

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
                C: 'C'
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
                C: 'C'
            }
        },
        aFrameRate: [ 60, 30, 15, 6 ],

        prototype: {
            init: function(oScene){
                this.oScene = oScene;

                Object.assign( this.oParameters, StoreEngine.get('Display') );

                oScene.aPlayer.forEach( oPlayer => {
                    const oHistory = OutputManager.getElement('LAY__Training_History_' + oPlayer.nPlayer),
                        oAnim = OutputManager.getElement('LAY__Training_Animation_' + oPlayer.nPlayer);

                    this.aHistory.push( oHistory );
                    this.aAnimation.push( {
                        oLayer: oAnim,
                        oLast: null
                    } );

                    oHistory.clean();
                    oAnim.hElement.innerHTML = '';
                } );

                for( let sType in this.oParameters.oShow ){
                    if( this.oParameters.oShow[sType] ){
                        this.show(sType);
                    }
                }
                this.setFrameRate();
            },
            update: function(){
                this.updateHistory();
                this.updateBox();
                this.updateAnimation();
            },
            destroy: function(){
                for( let sType in this.oParameters.oShow ){
                    this.hide(sType);
                }
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
                if( this.oParameters.oShow.bHistory ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        oPlayer.oInputBuffer.aHistory.forEach( (oHistory, nHistory, aHistory) => {
                            const aBtn = Object.keys( oHistory.oButtons ),
                                oBtn = { A: true, B: true, C: true },
                                oSymbol = TrainingEngineDisplay.oSymbolHistory[ oPlayer.bReverse ? 'oReverse' : 'oNormal' ];
                                
                            let oTextHist = this.aHistory[nIndex].aChildElement[nHistory],
                                sText = '',
                                sFrame = '';
                            
                            nIndex || aBtn.unshift( aBtn.pop() );
                            aBtn.forEach( sBtn => {
                                if( oSymbol[sBtn] ){
                                    sText += '<b class="Training__InputButton ' + ( oBtn[sBtn] ? '--btn' : '--dir' ) +  '">' + oSymbol[sBtn] + '</b>';
                                }
                            } );
                            
                            if( nHistory == aHistory.length - 1 ){
                                sFrame = '<i>' + ( TimerEngine.nFrames - oHistory.nFrame + 1 ) + '</i>';
                            } else {
                                sFrame = '<i>' + ( aHistory[ nHistory + 1 ].nFrame - oHistory.nFrame ) + '</i>';
                            }
                            nIndex ? (sText = sFrame + sText) : (sText += sFrame);
                            
                            if( oTextHist ){
                                oTextHist.setText(sText);
                            } else {
                                oTextHist = new OutputManager.OutputText(sText);
                                this.aHistory[nIndex].add(oTextHist);
                            }
                        } );
                    } );
                }
            },
            // Box
            updateBox: function(){
                if( this.oParameters.oShow.bBox ){
                    BattleEntity.get().forEach( oEntity => {
                        ['oPositionBox', 'aHurtBox', 'aHitBox'].forEach( sBox => {
                            const aBox = oEntity.getBox(sBox),
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

            // Animation
            updateAnimation: function(){
                if( this.oParameters.oShow.bAnimation ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        const oAnimation = this.aAnimation[nIndex];
                        if( oPlayer.oAnimation.isTraining() ){
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
                            } else if( oPlayer.isInvulnerable() ){
                                sClass = '--invulnerable';
                            } else if( oPlayer.oStatus.bAerialInvul ){
                                sClass = '--aerial-invulnerable';
                            }
                            oAnimation.oLayer.hElement.innerHTML += '<span class="' + sClass + '"></span>';
                        }
                    } );
                }
            },
            // Gestion Affichage
            show: function(sType){
                this.oParameters.oShow[sType] = true;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oScene.oContext.hElement.classList.add('--' + sType);
                } );
            },
            hide: function(sType){
                this.oParameters.oShow[sType] = false;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oScene.oContext.hElement.classList.remove('--' + sType);
                } );
            },
            toogle: function(sType){
                this[ this.oParameters.oShow[sType] ? 'hide' : 'show' ](sType);
                StoreEngine.update('Display', this.oParameters);
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
                StoreEngine.update('Display', this.oParameters);
            },
            setFrameRate: function(nFrameRate){
                TimerEngine.setFPS(nFrameRate || this.getFrameRate());
            },
            getFrameRate: function(){
                return TrainingEngineDisplay.aFrameRate[ this.oParameters.nFrameRate ];
            }
        }
    }
);