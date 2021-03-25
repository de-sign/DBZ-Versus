/* ----- BattleTrainingDisplay ----- */
function BattleTrainingDisplay(oContext, aPlayer){
    this.aPlayer = null;
    
    this.bInit = false;
    this.aBox = [];
    this.aHistory = [];
    this.aAnimation = [];

    this.oShow = {
        bHistory: false,
        bBox: false,
        bAnimation: false
    };

    this.init(oContext, aPlayer);
}

Object.assign(
    BattleTrainingDisplay, {

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

        prototype: {
            init: function(oContext, aPlayer){
                this.oContext = oContext;
                this.aPlayer = aPlayer;

                aPlayer.forEach( oPlayer => {
                    this.aHistory.push( GAME.oOutput.getElement('LAY__Training_History_' + oPlayer.nPlayer) );
                    this.aBox.push( {
                        oPositionBox: GAME.oOutput.getElement('LAY__Training_PositionBox_' + oPlayer.nPlayer),
                        oHurtBox: GAME.oOutput.getElement('LAY__Training_HurtBox_' + oPlayer.nPlayer),
                        oHitBox: GAME.oOutput.getElement('LAY__Training_HitBox_' + oPlayer.nPlayer)
                    } );
                    this.aAnimation.push( {
                        oLayer: GAME.oOutput.getElement('LAY__Training_Animation_' + oPlayer.nPlayer),
                        oLast: null
                    } );
                } );
            },
            update: function(){
                this.aPlayer.forEach( (oPlayer, nIndex) => {

                    // History
                    if( this.oShow.bHistory ){
                        oPlayer.oInputBuffer.aHistory.forEach( (oHistory, nHistory, aHistory) => {
                            const aBtn = Object.keys( oHistory.oButtons ),
                                oBtn = { A: true, B: true, C: true },
                                oSymbol = BattleTrainingDisplay.oSymbolHistory[ oPlayer.nPlayer == 1 ? 'oNormal' : 'oReverse' ];
                                
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
                    }

                    // Box
                    if( this.oShow.bBox ){
                        ['oPositionBox', 'oHurtBox', 'oHitBox'].forEach( sBox => {
                            const oBox = oPlayer.getCharacterBox(sBox)
                            if( oBox ){
                                this.aBox[nIndex][sBox].setStyle( {
                                    display: null,
                                    left: ( GAME.oSettings.oPositionPoint.nX + oBox.nX ) + 'px',
                                    top: ( GAME.oSettings.oPositionPoint.nY + oBox.nY ) + 'px',
                                    width: oBox.nWidth + 'px',
                                    height: oBox.nHeight + 'px'
                                } );
                            } else {
                                this.aBox[nIndex][sBox].setStyle( { display: 'none' } );
                            }
                        } );
                    }

                    // Animation
                    if( this.oShow.bAnimation ){
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
                            } else if( oPlayer.oAnimation.oFrame.oHitBox ){
                                sClass = '--damage';
                            } else if( !oPlayer.oAnimation.oFrame.oHurtBox ){
                                sClass = '--invulnerable';
                            }
                            oAnimation.oLayer.hElement.innerHTML += '<span class="' + sClass + '"></span>'
                        }
                    }
                } );
            },
            destroy: function(){
                for( let sType in this.oShow ){
                    this.hide(sType);
                }
                this.oContext.update();
            },

            show: function(sType){
                this.oShow[sType] = true;
                this.oContext.addTickUpdate( () => {
                    this.oContext.hElement.classList.add('--' + sType);
                } );
            },
            hide: function(sType){
                this.oShow[sType] = false;
                this.oContext.addTickUpdate( () => {
                    this.oContext.hElement.classList.remove('--' + sType);
                } );
            },
            toogle: function(sType){
                this[ this.oShow[sType] ? 'hide' : 'show' ](sType);
            }
        }
    }
);

/* ----- BattleTraining ----- */
function BattleTraining(oContext, aPlayer){
    this.oDisplay = null;

    this.init(oContext, aPlayer);
}

Object.assign(
    BattleTraining, {
        prototype: {
            constructor: BattleTraining,
            init: function(oContext, aPlayer){
                this.oDisplay = new BattleTrainingDisplay(oContext, aPlayer);
            },
            update: function(){
                this.oDisplay.update();
            },
            destroy: function(){
                this.oDisplay.destroy();
            }
        }
    }
);