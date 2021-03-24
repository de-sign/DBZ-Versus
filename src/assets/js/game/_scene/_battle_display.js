/* ----- BattleHUD ----- */
function BattleHUD(oPlayer){
    this.oLayer = null;
    this.oPlayer = null;

    this.nLife = 0;
    this.nKi = 0;

    this.init(oPlayer);
}

Object.assign(
    BattleHUD.prototype, {
        init: function(oPlayer) {
            this.oPlayer = oPlayer;
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_' + this.oPlayer.nPlayer);

            this.oLayer.addTickUpdate( () => {
                GAME.oOutput.getElement('SPT__Battle_HUD_Sprite_' + this.oPlayer.nPlayer)
                    .setSource( GAME.oSettings.oPath.oCharacter.sFace + '/' + this.oPlayer.oCharacter.sCod + '.png' );
                GAME.oOutput.getElement('TXT__Battle_HUD_Name_' + this.oPlayer.nPlayer)
                    .setText( this.oPlayer.oCharacter.sName );
                GAME.oOutput.getElement('TXT__Battle_HUD_Number_' + this.oPlayer.nPlayer)
                    .setText( 'Player #' + this.oPlayer.nPlayer );

                this.createBars();
            } );
        },
        update: function(){
            if( this.nLife != this.oPlayer.nLife || this.nKi != this.oPlayer.nKi ){
                this.oLayer.addTickUpdate( () => {
                    this.nLife = this.oPlayer.nLife;
                    this.nKi = this.oPlayer.nKi;
                    
                    const oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_Bar_' + this.oPlayer.nPlayer);
                    for( let nIndex = 0; nIndex < oLayer.aChildElement.length; nIndex++ ){
                        const oBar = oLayer.aChildElement[nIndex];
                        oBar.hElement.classList.remove('Battle__HUD_Bar_Life', 'Battle__HUD_Bar_Ki');
                        if( nIndex < this.nLife ){
                            oBar.hElement.classList.add('Battle__HUD_Bar_Life');
                        } else if( nIndex >= oLayer.aChildElement.length - this.nKi ){
                            oBar.hElement.classList.add('Battle__HUD_Bar_Ki');
                        }
                    }
                } );
            }
        },
        destroy: function(){
        },

        createBars: function(){
            const oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_Bar_' + this.oPlayer.nPlayer);
            if( oLayer.aChildElement.length != GAME.oSettings.nLife ){
                const nMax = Math.max(oLayer.aChildElement.length, GAME.oSettings.nLife);
                for( let nIndex = 0; nIndex < nMax; nIndex++ ){
                    if( nIndex >= oLayer.aChildElement.length ){
                        oLayer.add( new GAME.oOutput.OutputText() );
                    }
                    else if( nIndex >= GAME.oSettings.nLife ){
                        oLayer.addTickUpdate(
                            (oElm => {
                                return () => oLayer.remove(oElm);
                            } )( oLayer.aChildElement[nIndex] )
                        );
                    }
                }
            }
        }
    }
);

/* ----- BattleInfo ----- */
function BattleInfo(oContext, aPlayer){
    this.oContext = null;
    this.aPlayer = null;
    this.oImg = null;
    this.oText = null;

    this.aInfo = [];
    this.oCurrent = 0;

    this.init(oContext, aPlayer);
}

Object.assign(
    BattleInfo,
    {
        nLength: 60,
        
        prototype: {
            constructor: BattleInfo,
            init: function(oContext, aPlayer) {
                this.oContext = oContext;
                this.aPlayer = aPlayer;
                this.oImg = GAME.oOutput.getElement('SPT__Battle_Info_Sprite');
                this.oText = GAME.oOutput.getElement('TXT__Battle_Info_Text');
            },
            update: function(){
                if( this.oCurrent ){
                    if( this.oCurrent.nFrames <= this.oCurrent.nLength ){
                        this.oCurrent.nFrames++;
                    } else {
                        this.hide();
                    }
                }
                this.show();
            },
            destroy: function(){
            },

            add: function(){
                [...arguments].forEach( oOptions => {
                    this.aInfo.push( {
                        nFrames: 1,
                        nLength: oOptions.nLength || BattleInfo.nLength,
                        sImg: oOptions.sImg || null,
                        sText: oOptions.sText || '',
                        bFreeze: oOptions.bFreeze || false,
                        fCallback: oOptions.fCallback || null
                    } );
                } );
            },
            show: function(){
                if( !this.oCurrent && this.aInfo.length ){
                    this.oCurrent = this.aInfo.shift();
                    // Image
                    if( this.oCurrent.sImg ){
                        this.oImg.setSource(this.oCurrent.sImg);
                        this.oImg.setStyle( { display: null } );
                    } else {
                        this.oImg.setStyle( { display: 'none' } );
                    }
                    // Text
                    this.oText.setText(this.oCurrent.sText);
                    // Freeze
                    if( this.oCurrent.bFreeze ){
                        this.aPlayer.forEach( oPlayer => {
                            oPlayer.oAnimation.setFreeze(this.oCurrent.nLength);
                        } );
                    }
                    // Show
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.add('--info');
                    } );
                }
            },
            hide: function(){
                // Hide
                this.oContext.addTickUpdate( () => {
                    this.oContext.hElement.classList.remove('--info');
                    // Callback
                    this.oCurrent.fCallback && this.oCurrent.fCallback();
                    this.oCurrent = null;
                } );
            }
        }
    }
);

/* ----- BattleCombo ----- */
function BattleCombo(aPlayer){
    this.aPlayer = null;
    this.aText = [];
    this.aLast = [];

    this.init(aPlayer);
}

Object.assign(
    BattleCombo.prototype, {
        constructor: BattleCombo,
        init: function(aPlayer) {
            this.aPlayer = aPlayer;
            this.aPlayer.forEach( oPlayer => {
                this.aText.push( GAME.oOutput.getElement('TXT__Battle_Combo_Text_' + oPlayer.nPlayer) );
                this.aLast.push(0);
            } );
        },
        update: function(){
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( this.aLast[nIndex] != oPlayer.nHitting ){
                    this[ oPlayer.nHitting > 1 ? 'show' : 'hide' ](nIndex, oPlayer.nHitting);
                    this.aLast[nIndex] = oPlayer.nHitting;
                }
            } );
        },
        destroy: function(){
        },

        show: function(nIndex, nHit){
            const oText = this.aText[nIndex];
            oText.setText( nHit + ' hits !' );
            oText.addTickUpdate( () => {
                oText.hElement.classList.add('--show');
                oText.hElement.classList.remove('--hide');
            } );
        },
        hide: function(nIndex){
            const oText = this.aText[nIndex];
            oText.addTickUpdate( () => {
                oText.hElement.classList.remove('--show');
                oText.hElement.classList.add('--hide');
            } );
        }
    }
);

/* ----- BattleTraining ----- */
function BattleTraining(aPlayer){
    this.aPlayer = null;
    
    this.bInit = false;
    this.aBox = [];
    this.aHistory = [];
    this.aAnimation = [];

    this.init(aPlayer);
}

Object.assign(
    BattleTraining, {

        oSymbolHistory: {
            oNormal: {
                DB: '&#8665;',
                DN: '&#8659;',
                DF: '&#8664;',
                BW: '&#8656;',
                NT: '',
                FW: '&#8658;',
                UB: '&#8662;',
                UP: '&#8657;',
                UF: '&#8663;',
                A: 'A',
                B: 'B',
                C: 'C'
            },
            oReverse: {
                DB: '&#8664;',
                DN: '&#8659;',
                DF: '&#8665;',
                BW: '&#8658;',
                NT: '',
                FW: '&#8656;',
                UB: '&#8663;',
                UP: '&#8657;',
                UF: '&#8662;',
                A: 'A',
                B: 'B',
                C: 'C'
            }
        },

        prototype: {
            init: function(aPlayer){
                this.aPlayer = aPlayer;

                aPlayer.forEach( oPlayer => {
                    oPlayer.oLayer.addTickUpdate( () => {
                        this.aHistory.push( GAME.oOutput.getElement('LAY__Battle_History_' + oPlayer.nPlayer) );
                        this.aBox.push( {
                            oPositionBox: GAME.oOutput.getElement('LAY__Battle_Character_PositionBox_' + oPlayer.nPlayer),
                            oHurtBox: GAME.oOutput.getElement('LAY__Battle_Character_HurtBox_' + oPlayer.nPlayer),
                            oHitBox: GAME.oOutput.getElement('LAY__Battle_Character_HitBox_' + oPlayer.nPlayer)
                        } );
                        this.aAnimation.push( {
                            oLayer: GAME.oOutput.getElement('LAY__Battle_HUD_Animation_' + oPlayer.nPlayer),
                            oLast: null
                        } );
                    } );
                } );
            },
            update: function(){
                this.aPlayer.forEach( (oPlayer, nIndex) => {
                    // History
                    if( this.aHistory.length ){
                        oPlayer.oInputBuffer.aHistory.forEach( (oHistory, nHistory, aHistory) => {
                            const aBtn = Object.keys( oHistory.oButtons ),
                                oSymbol = BattleTraining.oSymbolHistory[ oPlayer.nPlayer == 1 ? 'oNormal' : 'oReverse' ];

                            let oTextHist = this.aHistory[nIndex].aChildElement[nHistory],
                                sText = '';

                            nIndex || aBtn.unshift( aBtn.pop() );
                            aBtn.forEach( sBtn => {
                                if( oSymbol[sBtn] ){
                                    sText += '<b>' + oSymbol[sBtn] + '</b>';
                                }
                            } );

                            if( nHistory == aHistory.length - 1 ){
                                sText += '<i>' + ( GAME.oTimer.nFrames - oHistory.nFrame + 1 ) + '</i>';
                            } else {
                                sText += '<i>' + ( aHistory[ nHistory + 1 ].nFrame - oHistory.nFrame ) + '</i>';
                            }

                            if( oTextHist ){
                                oTextHist.setText(sText);
                            } else {
                                oTextHist = new GAME.oOutput.OutputText(sText);
                                this.aHistory[nIndex].add(oTextHist);
                            }
                        } );
                    }

                    // Box
                    if( this.aBox.length ){
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
                    if( this.aAnimation.length ){
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

            }
        }
    }
);