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
function BattleInfo(oContext){
    this.oContext = null;
    this.oImg = null;
    this.oText = null;

    this.aInfo = [];
    this.oCurrent = 0;

    this.init(oContext);
}

Object.assign(
    BattleInfo,
    {
        nLength: 60,
        
        prototype: {
            constructor: BattleInfo,
            init: function(oContext) {
                this.oContext = oContext;
                this.oImg = GAME.oOutput.getElement('SPT__Battle_Info_Sprite');
                this.oText = GAME.oOutput.getElement('TXT__Battle_Info_Text');
            },
            update: function(){
                if( this.oCurrent ){
                    if( this.oCurrent.nLength <= BattleInfo.nLength ){
                        this.oCurrent.nLength++;
                    } else {
                        this.hide();
                    }
                }
                this.show();
            },
            destroy: function(){
            },

            add: function(sImg, sText, bFreeze){
                this.aInfo.push( {
                    nLength: 1,
                    sImg,
                    sText,
                    bFreeze
                } );
            },
            show: function(){
                if( !this.oCurrent && this.aInfo.length ){
                    this.oCurrent = this.aInfo.shift();
                    if( this.oCurrent.sImg ){
                        this.oImg.setSource(this.oCurrent.sImg);
                        this.oImg.setStyle( { display: null } );
                    } else {
                        this.oImg.setStyle( { display: 'none' } );
                    }
                    this.oText.setText(this.oCurrent.sText);
                    this.oContext.addTickUpdate( () => {
                        this.oContext.hElement.classList.add('--info');
                    } );
                }
            },
            hide: function(){
                this.oCurrent = null;
                this.oContext.addTickUpdate( () => {
                    this.oContext.hElement.classList.remove('--info');
                } );
            }
        }
    }
);

/* ----- BattleCombo ----- */
function BattleCombo(aPlayer){
    this.aPlayer = [];

    this.init(aPlayer);
}

Object.assign(
    BattleCombo,
    {
        nLength: 60,
        
        prototype: {
            constructor: BattleCombo,
            init: function(aPlayer) {
            },
            update: function(){
            },
            destroy: function(){
            },

            getPattern: function(){

            },
            createLayer: function(){

            }
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

/* ----- BattleInputBuffer ----- */
function BattleInputBuffer(oKeyboard){
    this.oKeyboard = null;

    this.nDirection = 5;
    this.bReverse = false;
    this.aHistory = [];

    this.init(oKeyboard);
}

Object.assign(
    BattleInputBuffer,
    {
        nLengthHistory: 20,
        oButtonsDirection: {
            UP: 3,
            DOWN: -3,
            LEFT: -1,
            RIGHT: 1
        },
        oMapDirection: {
            aNormal: ['DB', 'DN', 'DF', 'BW', 'NT', 'FW', 'UB', 'UP', 'UF'],
            aReverse: ['DF', 'DN', 'DB', 'FW', 'NT', 'BW', 'UF', 'UP', 'UB']
        },
        prototype: {
            constructor: BattleInputBuffer,
            init: function(oKeyboard) {
                this.oKeyboard = oKeyboard;
            },
            update: function(bReverse){
                this.bReverse = bReverse;
                if( this.oKeyboard.nFrameLastEvent == GAME.oTimer.nFrames ){
                    this.updateDirection();

                    this.aHistory.length >= BattleInputBuffer.nLengthHistory && this.aHistory.shift();
                    this.aHistory.push( {
                        nFrame: GAME.oTimer.nFrames,
                        oButtons: this.getButtonsPressed()
                    } );
                }
            },
            destroy: function(){
            },

            updateDirection: function(){
                this.nDirection = 5;
                for (sBtn in BattleInputBuffer.oButtonsDirection) {
                    if ( this.oKeyboard.oButtons[sBtn].bPressed ) {
                        this.nDirection += BattleInputBuffer.oButtonsDirection[sBtn];
                    }
                }
            },
            getButtonsPressed: function(){
                const oBtns = {},
                    aFrameDir = [];

                // Gestion BTN
                for( let sBtn in this.oKeyboard.oButtons ){
                    if( BattleInputBuffer.oButtonsDirection[sBtn] ){
                        aFrameDir.push( this.oKeyboard.oButtons[sBtn].nFrameChanged );
                    } else if( this.oKeyboard.oButtons[sBtn].bPressed ){
                        oBtns[sBtn] = this.oKeyboard.oButtons[sBtn].nFrameChanged;
                    }
                }

                // Gestion DIR
                oBtns[ this.getDirection() ] = Math.max.apply(Math, aFrameDir);

                return oBtns;
            },
            getDirection: function(){
                return BattleInputBuffer.oMapDirection[ this.bReverse ? 'aReverse' : 'aNormal' ][this.nDirection - 1];
            },
            checkManipulation: function(nFrameCheck, oManip){
                const nManipButtons = oManip.aButtons.length;

                let nIndexHistory = this.aHistory.length,
					nIndexButtons = nManipButtons - 1,
					bFCheck = true,
                    bNotCheck = false,
					nButtonsCheck = 0, 
					oHistory;

                while( oHistory = this.aHistory[--nIndexHistory] ){

                    const oManipButtons = oManip.aButtons[nIndexButtons];
                    let bButtonCheck = true;

                    if( oManipButtons ){
                        for(let sButton in oManipButtons){
                            if(
                                ( bFCheck && oManipButtons[sButton] && oHistory.oButtons[sButton] != oHistory.nFrame )
                                ||
                                ( !oManipButtons[sButton] && !oHistory.oButtons[sButton] )
                            ){
                                bButtonCheck = false;
                                break;
                            }
                        }
                    } else {
                        bNotCheck = true;
                    }

                    if(bFCheck){
                        if(bButtonCheck){
                            if(oManipButtons){
                                bNotCheck = false;
                            }
                            bFCheck = false;
                            nButtonsCheck++;
                        } else if(!bNotCheck){
                            break;
                        }
                    }

                    if( !oManipButtons || ( !bFCheck && !bButtonCheck ) ){
                        bFCheck = true;
                        nIndexButtons--;
                        nIndexHistory++;
                    } else {
                        let nButtonDiff = nFrameCheck - oHistory.nFrame + 1;
                        if(	nButtonDiff >= oManip.nMaxLengthFrame || nButtonsCheck == nManipButtons || ( !bNotCheck && !nIndexButtons ) ){
                            break;
                        }
                    }
                }

                return nButtonsCheck == nManipButtons;
            }
        }
    }
);

/* ----- BattleGatling ----- */
function BattleGatling(oInputBuffer, aCommandData){
    this.oInputBuffer = null;
    this.aCommandData = null;

    this.oCurrent = null;
    this.bFreeze = false;
    this.oNext = null;
    this.oUsed = {};

    this.init(oInputBuffer, aCommandData);
}

Object.assign(
    BattleGatling.prototype, {
        init: function(oInputBuffer, aCommandData){
            this.oInputBuffer = oInputBuffer;
            this.aCommandData = aCommandData;
        },
        update: function(nKi, bUse){
            let bFind = false;
            const aCommand = this.getEnterCommands();

            for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                const oCommand = aCommand[nIndex];
                if( this.canUseCommand(nKi, oCommand) ){
                    bUse ?
                        this.use(oCommand) :
                        this.oNext = oCommand;
                    bFind = true;
                    break;
                }
            }

            // Gestion Gatling Buffer
            if( !bFind && this.oNext && bUse ){
                this.use(this.oNext);
                bFind = true;
            }

            return bFind ? this.oCurrent : null;

        },
        destroy: function(){
        },

        reset: function(){
            this.oCurrent = null;
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed = {};
        },
        use: function(oCommand){
            this.oCurrent = Object.assign({ nFrameStart: GAME.oTimer.nFrames }, oCommand);
            this.bFreeze = false;
            this.oNext = null;
            this.oUsed[oCommand.sName] = true;
        },
        getEnterCommands: function(){
            const aCommand = [],
                nFrameCheck = GAME.oTimer.nFrames;

            if( this.oInputBuffer.oKeyboard.nFrameLastEvent >= nFrameCheck ){
                for( let nIndex = 0; nIndex < this.aCommandData.length; nIndex++ ){
                    const oCommand = this.aCommandData[nIndex];
                    if( this.oInputBuffer.checkManipulation(nFrameCheck, oCommand.oManipulation) ){
                        aCommand.push( Object.assign({ bHit: false }, oCommand) );
                        if( oCommand.bLast ){
                            break;
                        }
                    }
                }
            }
            return aCommand;
        },
        canUseCommand: function(nKi, oCommand){
            let bCanUse = false;
            // Gestion KI
            if( !oCommand.nCost || nKi >= oCommand.nCost ){
                // Gestion GATLING
                if( this.oUsed[oCommand.sName] ){
                    // Gestion REDA CANCEL
                    if( this.oCurrent && this.oCurrent.sName == oCommand.sName && oCommand.aSelfCancel ){
                        for( let nIndex = 0; nIndex < oCommand.aSelfCancel.length; nIndex++ ){
                            if( !this.oUsed[ oCommand.aSelfCancel[nIndex] ] ){
                                oCommand.sName = oCommand.sAnimation = oCommand.aSelfCancel[nIndex];
                                bCanUse = true;
                            }
                        }
                    }
                } else {
                    bCanUse = true;
                }
            }
            return bCanUse;
        },
        isHit: function(){
            return this.oCurrent && this.oCurrent.bHit;
        },
        needFreeze: function(){
            return this.oCurrent && this.oCurrent.oStun.nFreeze && !this.bFreeze;
        }
    }
);

/* ----- BattlePlayer ----- */
function BattlePlayer(nPlayer, sChar, oKeyboard){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;

    this.oCharacter = null;
    this.oKeyboard = null;
    this.oInputBuffer = null;

    this.oAnimation = null;
    this.oLunch = null;
    this.oGatling = null;

    this.nHit = 0;
    
    this.bReverse = false;
    this.nLife = GAME.oSettings.nLife;
    this.nKi = 0;

    this.init(sChar, oKeyboard);
}

Object.assign(
    BattlePlayer.prototype, {
        init: function(sChar, oKeyboard) {
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + this.nPlayer);
            this.oLayer.addTickUpdate( () => {
                this.oSprite = GAME.oOutput.getElement('SPT__Battle_Character_Sprite_' + this.nPlayer);
            } );
            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oKeyboard = oKeyboard;
            this.oInputBuffer = new BattleInputBuffer(this.oKeyboard);
            this.oGatling = new BattleGatling(this.oInputBuffer, this.oCharacter.aCommands);

            // init en STAND
            this.createLunchAnimation();
            this.setAnimation('stand', true);
        },
        // Gestion des INPUTs
        updateInput: function(){
            this.oInputBuffer.update(this.bReverse);

            // Si pas stun par Animation
            const nCanAction = this.canAction(); // 0: NONE, 1: MOVEMENT, 2: END ANIM, 3: CANCEL, 4: GATLING
            if( nCanAction ){
                // Gestion MANIP
                const oCommand = this.oGatling.update(this.nKi, nCanAction != 4);
                if( oCommand ){
                    oCommand.nCost && (this.nKi -= oCommand.nCost);
                    this.setAnimation(oCommand.sAnimation);
                }
                // Gestion DIR
                else if( this.canMove(nCanAction) ){
                    if( this.oLunch ){
                        this.oAnimation = this.oLunch;                
                    } else {
                        switch( this.oInputBuffer.getDirection() ){
                            case 'DB':
                            case 'DN':
                            case 'DF':
                            case 'NT':
                            case 'UB':
                            case 'UP':
                            case 'UF':
                                this.setMovement('stand');
                                break;
                            case 'BW':
                                this.setMovement('backward');
                                break;
                            case 'FW':
                                this.setMovement('forward');
                                break;
                        }
                    }
                }
            }

            this.oAnimation.update();

            // Deplacement via animation
            if( this.oAnimation.oFrame.oMove && !this.oAnimation.oFrame.bFreeze ){
                if( this.oAnimation.oFrame.oMove.nX ){
                    this.oLayer.oPosition.nX += this.oAnimation.oFrame.oMove.nX * (this.bReverse ? -1 : 1);
                }
                if( this.oAnimation.oFrame.oMove.nY ){
                    this.oLayer.oPosition.nY += this.oAnimation.oFrame.oMove.nY;
                }
            }
        },
        // Gestion de OUTPUT
        updateOutput: function(){
            // Reverse
            this.oLayer.hElement.classList[ this.bReverse ? 'add' : 'remove' ]('--reverse');
            // Animation Freeze en HURT
            if( this.oAnimation.isHurt() ){
                if( this.oAnimation.oFrame.bFreeze ){
                    this.oLayer.hElement.classList.add(this.oAnimation.nFreeze % 2 ? '--freeze_pair' : '--freeze_impair');
                    this.oLayer.hElement.classList.remove(this.oAnimation.nFreeze % 2 ? '--freeze_impair' : '--freeze_pair');
                } else {
                    this.oLayer.hElement.classList.remove('--freeze_pair', '--freeze_impair');
                }
            }

            // Type
            if( !this.oLayer.hElement.classList.contains('--' + this.oAnimation.sType) ){
                DOMTokenList.prototype.remove.apply( this.oLayer.hElement.classList, GameAnimation.aAllType.map( sType => '--' + sType ) );
                this.oLayer.hElement.classList.add('--' + this.oAnimation.sType);
            }
            this.oLayer.hElement.classList[ this.oAnimation.oFrame.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
            
            // Frame
            this.oAnimation.oFrame.nZIndex && this.oLayer.setStyle( { zIndex: this.oAnimation.oFrame.nZIndex } );
            this.oSprite && this.oSprite.setSource( GAME.oSettings.oPath.oCharacter.sFrames + '/' + this.oCharacter.sCod + '/' + this.oAnimation.oFrame.sPath );

            this.nHit && console.log(this.nPlayer, this.nHit);
        },
        destroy: function(){
        },

        // Fonction technique
        getCharacterBox: function(sBox){
            return this.oAnimation.oFrame[sBox] ?
                Object.assign(
                    {},
                    this.oAnimation.oFrame[sBox],
                    this.bReverse ? { nX: -(this.oAnimation.oFrame[sBox].nWidth + this.oAnimation.oFrame[sBox].nX - 4) } : {}
                ) :
                null;
        },
        createLunchAnimation: function(){
            let nLastY = 0,
                oLastFrame = null;
            const aAnim = [],
                nDemiLength = (GAME.oSettings.oLuncher.nLength - 1) / 2,
                nX = GAME.oSettings.oLuncher.oMove.nX / GAME.oSettings.oLuncher.nLength;

            // Ajout d'un FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GAME.oSettings.oLuncher.nLength + 1; nIndex++ ){
                let nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GAME.oSettings.oLuncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    sFrame = nIndex <= GAME.oSettings.oLuncher.nLength / 2 ? 'hit_luncher' : 'hit_fall';

                if( oLastFrame && oLastFrame.oMove.nY == nY && oLastFrame.sFrame == sFrame ){
                    oLastFrame.nFrame++;
                } else {
                    aAnim.push( oLastFrame = {
                        nFrame: 1,
                        sFrame,
                        oMove: { nX, nY }
                    } );
                    if( GAME.oSettings.oLuncher.nInvulnerable >= nIndex){
                        oLastFrame.oHurtBox = null;
                    }
                }
                nLastY = nTargetY;
            }
            this.oCharacter.oAnimations.lunch = aAnim;
        },

        // Fonction INPUT
        canAction: function(){
            let nCanAction = 0;
            // Gestion MOVEMENT
            if( this.oAnimation.sType == 'movement' ){
                nCanAction = 1;
            }
            // Gestion END ANIMATION
            else if( this.oAnimation.isEnd() ){
                nCanAction = 2;
            }
            // Gestion ACTION en HIT
            else if( this.oGatling.isHit() ){
                nCanAction = this.oAnimation.oFrame.oStatus.bCancel && !this.oAnimation.oFrame.bFreeze ? 3 : 4;
            }
            return nCanAction;
        },
        canMove: function(nCanAction){
            nCanAction || ( nCanAction = this.canAction() );
            return !this.oAnimation.oFrame.bFreeze && nCanAction && nCanAction < 3;
        },

        // Fonction OUTPUT
        setAnimation: function(sAnimation, bUpdate){
            if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                this.oAnimation = new GameAnimation(
                    sAnimation,
                    this.oCharacter.oFrames,
                    this.oCharacter.oAnimations[sAnimation]
                );
                if( !this.oAnimation.isHurt() || this.oAnimation.sName == 'guard' ){
                    this.nHit = 0;
                }
            }
            bUpdate && this.oAnimation.update();
        },
        setMovement: function(sMovement, bUpdate){
            this.oGatling.reset();
            this.setAnimation(sMovement, bUpdate);
        },
        setHurt: function(sHurt, nFramesLength, bUpdate){
            this.setMovement(sHurt, bUpdate);
            if( this.oAnimation.sName == 'lunch' ){
                this.oLunch = this.oAnimation;
            } else {
                this.oAnimation.setLength(nFramesLength);
            }
        }
    }
);

/* ----- BattleEngine ----- */
function BattleEngine(aPlayer, oArea){
    this.aPlayer = null;
    this.oArea = null;

    this.nStartFreeze = null;

    this.init(aPlayer, oArea);
}

Object.assign(
    BattleEngine.prototype, {
        init: function(aPlayer, oArea) {
            this.aPlayer = aPlayer;
            this.oArea = oArea;
        },
        update: function(){
            const aPriority = [];

            // Gestion Reverse / Area
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ];
                // Gestion PositionBox / Area
                aPriority[nIndex] = this.stayInArea(oPlayer);
                // Gestion Reverse
                oPlayer.canMove() && this.updateReverse(oPlayer, oOpponent);
            } );
            
            // Gestion PositionBox / Player
            this.moveCollapsedPlayer(aPriority);

            // Gestion Hitbox
            let bLunch = false;
            const aHurt = [],
                aPushback = [];

            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( !oPlayer.oGatling.isHit() ){
                    const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ],
                        oHitBox = this.getCharacterCollisionBox(oPlayer, 'oHitBox'),
                        oHurtBox = this.getCharacterCollisionBox(oOpponent, 'oHurtBox');

                    if( oHitBox && oHurtBox && this.checkCollision(oHitBox, oHurtBox) ){
                        aHurt.push( {
                            oCommand: oPlayer.oGatling.oCurrent,
                            oOpponent
                        } );
                        aPriority[nIndex]++;
                    }
                }
            } );

            // Gestion Hurt Freeze
            if( aHurt.length ){
                aHurt.forEach( oHurt => {
                    oHurt.oCommand.bHit = true;
                    aPushback.push( oHurt.oCommand.oStun.nPushback || GAME.oSettings.nPushback );
                    if( oHurt.oOpponent.oAnimation.oFrame.oStatus.bGuard ){
                        oHurt.oOpponent.setHurt('guard', oHurt.oCommand.oStun.nBlock, true);
                    } else {
                        oHurt.oOpponent.setHurt(
                            oHurt.oCommand.oStun.bLunch && !oHurt.oOpponent.oLunch ?
                                'lunch' :
                                oHurt.oCommand.oStun.sHitAnimation,
                            oHurt.oCommand.oStun.nHit,
                            true
                        );

                        let nDamage = oHurt.oCommand.nDamage || 1;
                        oHurt.oOpponent.nKi += nDamage;
                        oHurt.oOpponent.nLife -= nDamage;
                        oHurt.oOpponent.nHit += nDamage;
                    }
                } );
                
                // Gestion PushBack
                this.movePushback(aPriority, Math.max.apply(Math, aPushback));

                // Gestion hit freeze
                this.aPlayer.forEach( oPlayer => {
                    oPlayer.oAnimation.setFreeze(GAME.oSettings.nFreeze, !bLunch);
                } );
            }

            // Gestion Super Freeze
            for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                const oPlayer = this.aPlayer[nIndex];
                if( oPlayer.oGatling.needFreeze() ){
                    oPlayer.oGatling.bFreeze = true;
                    this.aPlayer[ oPlayer.nPlayer == 1 ? 1 : 0 ].oAnimation.setFreeze(oPlayer.oGatling.oCurrent.oStun.nFreeze, true);
                    GAME.oScene.oCurrent.oInfo.add(
                        GAME.oSettings.oPath.oCharacter.sFace + '/' + oPlayer.oCharacter.sCod + '.png',
                        oPlayer.oGatling.oCurrent.sName + ' !'
                    );
                    break;
                }
            };
        },
        destroy: function(){
        },

        updateReverse: function(oPlayer, oOpponent){
            if( oPlayer.oLayer.oPosition.nX < oOpponent.oLayer.oPosition.nX ){
                oPlayer.bReverse = false;
            } else if( oPlayer.oLayer.oPosition.nX > oOpponent.oLayer.oPosition.nX ){
                oPlayer.bReverse = true;
            }
        },
        stayInArea: function(oPlayer){
            // Check
            let oBoxPlayer = oPlayer.getCharacterBox('oPositionBox');
            const oBoxArea = this.oArea.getBox(),
                nLeft = this.oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX),
                nRight = this.oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX),
                nDown = this.oArea.oPosition.nY + (oBoxArea.bottom - oBoxArea.originY) - GAME.oSettings.oPositionPoint.nGapY;

            let nPriority = oPlayer.oGatling.oCurrent ? 1 : 0,
                sMove = null;

            // Trop à gauche
            if( nLeft >= oPlayer.oLayer.oPosition.nX + oBoxPlayer.nX ){
                nPriority = oPlayer.bReverse ? 3 : 4;
                sMove = 'left';
            }
            // Trop à droite
            else if( nRight <= oPlayer.oLayer.oPosition.nX + ( oBoxPlayer.nX + oBoxPlayer.nWidth ) ){
                nPriority = oPlayer.bReverse ? 4 : 3;
                sMove = 'right';
            }

            switch( sMove ){
                case 'left':
                    oPlayer.oLayer.oPosition.nX = nLeft - oBoxPlayer.nX;
                    break;
                case 'right':
                    oPlayer.oLayer.oPosition.nX = nRight - ( oBoxPlayer.nX + oBoxPlayer.nWidth );
                    break;
            }

            // Trop en bas
            if( nDown < oPlayer.oLayer.oPosition.nY + ( oBoxPlayer.nY + oBoxPlayer.nHeight ) ){
                oPlayer.oLunch = null;
                oPlayer.setMovement('down', true);
                oBoxPlayer = oPlayer.getCharacterBox('oPositionBox');
                oPlayer.oLayer.oPosition.nY = nDown - ( oBoxPlayer.nY + oBoxPlayer.nHeight );
            }

            return nPriority;
        },
        moveCollapsedPlayer: function(aPriority){
            let oPlayer = this.aPlayer[0],
                oOpponent = this.aPlayer[1];

            if( this.aPlayer[0].bReverse ){
                oPlayer = this.aPlayer[1];
                oOpponent = this.aPlayer[0];
            }

            const oBoxPlayer = this.getCharacterCollisionBox(oPlayer, 'oPositionBox'),
                oBoxOpponent = this.getCharacterCollisionBox(oOpponent, 'oPositionBox');

            if( this.checkCollision(oBoxPlayer, oBoxOpponent) ){
                const nRight = oPlayer.oLayer.oPosition.nX + ( oBoxPlayer.nX + oBoxPlayer.nWidth ),
                    nLeft = oPlayer.oLayer.oPosition.nX + oBoxOpponent.nX,
                    nDiff = nRight - nLeft;

                // Separation Egal
                if( aPriority[0] == aPriority[1] ){
                    oPlayer.oLayer.oPosition.nX -= nDiff / 2;
                    oOpponent.oLayer.oPosition.nX += nDiff / 2;
                }
                // Movement Opponent
                else if( aPriority[ oPlayer.nPlayer - 1 ] > aPriority[ oOpponent.nPlayer - 1 ] ) {
                    oOpponent.oLayer.oPosition.nX += nDiff;
                }
                // Movement Player
                else {
                    oPlayer.oLayer.oPosition.nX -= nDiff;
                }
            }
        },
        movePushback: function(aPriority, nPushback){
            let oPlayer = this.aPlayer[0],
                oOpponent = this.aPlayer[1];

            if( this.aPlayer[0].bReverse ){
                oPlayer = this.aPlayer[1];
                oOpponent = this.aPlayer[0];
            }

            // Separation Egal
            if( aPriority[0] == aPriority[1] ){
                oPlayer.oLayer.oPosition.nX -= nPushback;
                oOpponent.oLayer.oPosition.nX += nPushback;
            }
            // Movement Opponent
            else if( aPriority[ oPlayer.nPlayer - 1 ] > aPriority[ oOpponent.nPlayer - 1 ] ) {
                oOpponent.oLayer.oPosition.nX += nPushback;
            }
            // Movement Player
            else {
                oPlayer.oLayer.oPosition.nX -= nPushback;
            }
        },
        getCharacterCollisionBox: function(oPlayer, sBox){
            const oBox = oPlayer.getCharacterBox(sBox);
            if( oBox ){
                oBox.nX += oPlayer.oLayer.oPosition.nX;
                oBox.nY += oPlayer.oLayer.oPosition.nY;
            }
            return oBox;
        },
        checkCollision: function(oBoxA, oBoxB){
            return !(
                (oBoxB.nX >= oBoxA.nX + oBoxA.nWidth)     // trop à droite
	            || (oBoxB.nX + oBoxB.nWidth <= oBoxA.nX) // trop à gauche
	            || (oBoxB.nY >= oBoxA.nY + oBoxA.nHeight) // trop en bas
	            || (oBoxB.nY + oBoxB.nHeight <= oBoxA.nY) // trop en haut
            );
        }
    }
);

/* ----- BattleScene ----- */
function BattleScene(){
	this.oContext = null;
    this.oInfo = null;
	this.oArea = null;
    
	this.oPattern = null;
    this.aPlayer = [];
    this.aHUD = [];

    this.oEngine = null;
    this.oTraining = null;
}

Object.assign(
    BattleScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: BattleScene,
				init: function( oLastData ){
                    // oLastData: sStageSelected, sTypeBattle, bAllPlayerActive, aCharacterSelected
					GAME.oOutput.useContext('CTX__Battle');
					this.oContext = GAME.oOutput.getElement('CTX__Battle');
                    this.oInfo = new BattleInfo(this.oContext);

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.setBackground( oLastData.sStageSelected );

                    this.getPattern();
                    for( let nIndex = 0; nIndex < GAME.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        let nPlayer = nIndex + 1;
                        this.createPlayer(nPlayer);
                        const oPlayer = new BattlePlayer(
                            nPlayer,
                            oLastData.aCharacterSelected[nIndex],
                            GAME.oInput.getController('IC_' + nPlayer ),
                            false
                        );
                        this.aPlayer.push(oPlayer);
                        
                        // HUD init
                        this.createHUDPlayer(nPlayer);
                        this.aHUD.push( new BattleHUD(oPlayer) );
                    }
                    this.oContext.addTickUpdate( () => {
                        this.oContext.updateChildAutoPositioning();
                    } );

                    // Engine init
                    this.oEngine = new BattleEngine(this.aPlayer, this.oArea);

                    // Training init
                    if( oLastData.sTypeBattle == 'Training' ){
                        this.oTraining = new BattleTraining( this.aPlayer );
                    }
				},
				update: function(){
                    this.aPlayer.forEach( oPlayer => oPlayer.updateInput() );
                    this.oEngine.update();
                    this.aPlayer.forEach( oPlayer => oPlayer.updateOutput() );
                    this.aHUD.forEach( oHUD => oHUD.update() );

                    this.oInfo.update();
                    this.oTraining && this.oTraining.update();
				},
                destroy: function(){
                },

                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage: 'url("' + GAME.oSettings.oPath.oStage.sBackground + '/' + sCod + '.png")'
                    } );
                },
                getPattern: function(){
                    this.oPattern = {
                        oHUD: GAME.oOutput.getElement('LAY__Battle_HUD_'),
                        oPlayer: GAME.oOutput.getElement('LAY__Battle_Character_')
                    };

                    for( let sPattern in this.oPattern ){
                        this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.remove( this.oPattern[sPattern] );
                    }
                },
                createPlayer: function(nPlayer){
                    let oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + nPlayer);
                    if( !oLayer && this.oPattern.oPlayer ){

                        // Clone du LAYER
                        let hLayer = this.oPattern.oPlayer.hElement.cloneNode(true);
                        hLayer.id += nPlayer;
                        hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += nPlayer;
                                hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                            }
                        );

                        // Ajout dans l'arène
                        this.oArea.add(new GAME.oOutput.OutputLayer(hLayer));
                    }
                },
                createHUDPlayer: function(nPlayer){
                    let oLayer = GAME.oOutput.getElement('LAY__Battle_HUD_' + nPlayer);
                    if( !oLayer && this.oPattern.oHUD ){

                        // Clone du LAYER
                        let hLayer = this.oPattern.oHUD.hElement.cloneNode(true);
                        hLayer.id += nPlayer;
                        hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += nPlayer;
                                hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                            }
                        );

                        // Ajout dans le context
                        this.oContext.add(new GAME.oOutput.OutputLayer(hLayer), '.Battle__HUDs');
                    }
                }
            }
        )
    }
);