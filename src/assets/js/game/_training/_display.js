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
                        bHistory: GAME.oOutput.getElement('LAY__Training_Menu_Display_Input'),
                        bBox: GAME.oOutput.getElement('LAY__Training_Menu_Display_Box'),
                        bAnimation: GAME.oOutput.getElement('LAY__Training_Menu_Display_Animations'),

                        oFrameRate: GAME.oOutput.getElement('LAY__Training_Menu_Display_Framerate')
                    };
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
                },
                display: function(){
                    for( let sType in this.oLayer){
                        if( sType == 'oFrameRate' ){
                            this.oLayer[sType].aChildElement[0].setText( this.oEngine.getFrameRate() + 'fps' );
                        } else {
                            this.oLayer[sType].aChildElement[0].setText( this.oEngine.oShow[sType] ? 'Show' : 'Hide' );
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
    this.nFrameRate = 0;

    this.oShow = {
        bHistory: true,
        bBox: true,
        bAnimation: true
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

                oScene.aPlayer.forEach( oPlayer => {
                    const oHistory = GAME.oOutput.getElement('LAY__Training_History_' + oPlayer.nPlayer),
                        oAnim = GAME.oOutput.getElement('LAY__Training_Animation_' + oPlayer.nPlayer);

                    this.aHistory.push( oHistory );
                    
                    this.aBox.push( {
                        oPositionBox: GAME.oOutput.getElement('LAY__Training_PositionBox_' + oPlayer.nPlayer),
                        aHurtBox: GAME.oOutput.getElement('LAY__Training_HurtBox_' + oPlayer.nPlayer),
                        aHitBox: GAME.oOutput.getElement('LAY__Training_HitBox_' + oPlayer.nPlayer)
                    } );
                    this.aAnimation.push( {
                        oLayer: oAnim,
                        oLast: null
                    } );

                    oHistory.clean();
                    oAnim.hElement.innerHTML = '';
                } );

                for( let sType in this.oShow ){
                    if( this.oShow[sType] ){
                        this.show(sType);
                    }
                }
            },
            update: function(){
                this.updateHistory();
                this.updateBox();
                this.updateAnimation();
            },
            destroy: function(){
                for( let sType in this.oShow ){
                    this.hide(sType);
                }
                this.oScene.oContext.update();
            },

            onOpen: function(){
                this.setFrameRate(60);
            },
            onClose: function(){
                this.setFrameRate();
            },

            // History
            updateHistory: function(oPlayer){
                if( this.oShow.bHistory ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        oPlayer.oInputBuffer.aHistory.forEach( (oHistory, nHistory, aHistory) => {
                            const aBtn = Object.keys( oHistory.oButtons ),
                                oBtn = { A: true, B: true, C: true },
                                oSymbol = TrainingEngineDisplay.oSymbolHistory[ oPlayer.nPlayer == 1 ? 'oNormal' : 'oReverse' ];
                                
                                let oTextHist = this.aHistory[nIndex].aChildElement[nHistory],
                                sText = '',
                                sFrame = '';
                                
                                nIndex || aBtn.unshift( aBtn.pop() );
                                aBtn.forEach( sBtn => {
                                    if( oSymbol[sBtn] ){
                                        sText += '<b class="' + ( oBtn[sBtn] ? '--btn' : '--dir' ) +  '">' + oSymbol[sBtn] + '</b>';
                                    }
                                } );
                                
                                if( nHistory == aHistory.length - 1 ){
                                    sFrame = '<i>' + ( GAME.oTimer.nFrames - oHistory.nFrame + 1 ) + '</i>';
                                } else {
                                    sFrame = '<i>' + ( aHistory[ nHistory + 1 ].nFrame - oHistory.nFrame ) + '</i>';
                            }
                            nIndex ? (sText = sFrame + sText) : (sText += sFrame);
                            
                            if( oTextHist ){
                                oTextHist.setText(sText);
                            } else {
                                oTextHist = new GAME.oOutput.OutputText(sText);
                                this.aHistory[nIndex].add(oTextHist);
                            }
                        } );
                    } );
                }
            },
            // Box
            updateBox: function(oPlayer){
                if( this.oShow.bBox ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        ['oPositionBox', 'aHurtBox', 'aHitBox'].forEach( sBox => {
                            const aBox = oPlayer.getCharacterBox(sBox),
                                oLayer = this.aBox[nIndex][sBox],
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
                                                left: ( GAME.oSettings.oPositionPoint.nX + oBox.nX ) + 'px',
                                                top: ( GAME.oSettings.oPositionPoint.nY + oBox.nY ) + 'px',
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
            updateAnimation: function(oPlayer){
                if( this.oShow.bAnimation ){
                    this.oScene.aPlayer.forEach( (oPlayer, nIndex) => {
                        const oAnimation = this.aAnimation[nIndex];
                        if( oPlayer.oAnimation.sType != 'movement' ){
                            if( oPlayer.oAnimation != oAnimation.oLast ){
                                oAnimation.oLast = oPlayer.oAnimation;
                                oAnimation.oLayer.hElement.innerHTML = '';
                            }
                            let sClass = '--' + oPlayer.oAnimation.sType;
                            if( oPlayer.oAnimation.oFrame.bFreeze ){
                                sClass = '--freeze';
                            } else if( oPlayer.oAnimation.oFrame.oStatus.bGuard ){
                                sClass = '--guard';
                            } else if( oPlayer.oAnimation.oFrame.aHitBox ){
                                sClass = '--damage';
                            } else if( !oPlayer.oAnimation.oFrame.aHurtBox ){
                                sClass = '--invulnerable';
                            }
                            oAnimation.oLayer.hElement.innerHTML += '<span class="' + sClass + '"></span>';
                        }
                    } );
                }
            },
            // Gestion Affichage
            show: function(sType){
                this.oShow[sType] = true;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oScene.oContext.hElement.classList.add('--' + sType);
                } );
            },
            hide: function(sType){
                this.oShow[sType] = false;
                this.oScene.oContext.addTickUpdate( () => {
                    this.oScene.oContext.hElement.classList.remove('--' + sType);
                } );
            },
            toogle: function(sType){
                this[ this.oShow[sType] ? 'hide' : 'show' ](sType);
            },

            // FrameRate
            changeFrame: function(nChange){
                    
                this.nFrameRate += nChange;
                if( this.nFrameRate >= TrainingEngineDisplay.aFrameRate.length ){
                    this.nFrameRate = 0;
                }
                else if( this.nFrameRate < 0 ){
                    this.nFrameRate = TrainingEngineDisplay.aFrameRate.length - 1;
                }
            },
            setFrameRate: function(nFrameRate){
                GAME.oTimer.setFPS(nFrameRate || this.getFrameRate());
            },
            getFrameRate: function(){
                return TrainingEngineDisplay.aFrameRate[ this.nFrameRate ];
            },
        }
    }
);