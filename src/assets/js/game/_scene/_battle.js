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
                    .setSource( GAME.oData.oPath.oCharacter.sFace + '/' + this.oPlayer.oCharacter.sCod + '.png' );
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
            if( oLayer.aChildElement.length != GAME.oData.oSettings.nLife ){
                const nMax = Math.max(oLayer.aChildElement.length, GAME.oData.oSettings.nLife);
                for( let nIndex = 0; nIndex < nMax; nIndex++ ){
                    if( nIndex >= oLayer.aChildElement.length ){
                        oLayer.add( new GAME.oOutput.OutputText() );
                    }
                    else if( nIndex >= GAME.oData.oSettings.nLife ){
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

function BattleTraining(aPlayer){
    this.aPlayer = null;
    
    this.bInit = false;
    this.aBox = [];
    this.aHistory = [];

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

                        const oPositionPoint = GAME.oData.oPositionPoint[ oPlayer.bReverse ? 'oReverse' : 'oNormal' ];
                        ['oPositionBox', 'oHurtBox', 'oHitBox'].forEach( sBox => {
                            const oBox = oPlayer.getCharacterBox(sBox)
                            if( oBox ){
                                this.aBox[nIndex][sBox].setStyle( {
                                    display: null,
                                    left: ( oPositionPoint.nX + oBox.nX ) + 'px',
                                    top: ( oPositionPoint.nY + oBox.nY ) + 'px',
                                    width: oBox.nWidth + 'px',
                                    height: oBox.nHeight + 'px'
                                } );
                            } else {
                                this.aBox[nIndex][sBox].setStyle( { display: 'none' } );
                            }
                        } );
                    }
                } );
            },
            destroy: function(){

            }
        }
    }
);

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
                        bFChk = true;
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

function BattlePlayer(nPlayer, sChar, oKeyboard, bBox){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;

    this.oCharacter = null;
    this.oKeyboard = null;
    this.oInputBuffer = null;

    this.oFrameUsed = null;
    this.oAnimation = null;
    this.oCommand = null;
    this.oGatling = null;
    
    this.bReverse = false;
    this.nLife = GAME.oData.oSettings.nLife;
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
            this.oInputBuffer = new BattleInputBuffer( this.oKeyboard = oKeyboard );

            // init en STAND
            this.resetGatling();
            this.setAnimation('stand');
        },
        // Gestion des INPUTs
        updateInput: function(){
            this.oInputBuffer.update(this.oReverse);

            // Si pas stun par Animation
            const nCanAction = this.canAction(); // 1: MOVEMENT, 2: END ANIM, 3: CANCEL, 4: GATLING
            if( nCanAction ){

                // Gestion MANIP
                let bManipFind = false;
                const aCommand = this.getEnterCommands();
                for( let nIndex = 0; nIndex < aCommand.length; nIndex++ ){
                    const oCommand = aCommand[nIndex];
                    if( this.canUseCommand(oCommand) ){
                        if( nCanAction == 4 ){
                            this.oGatling.oNextCommand = {
                                nFrame: GAME.oTimer.nFrames,
                                oCommand: oCommand
                            };
                            this.oFrameUsed = this.getFrameUsed();
                        } else {
                            this.setCommand(oCommand);
                        }
                        bManipFind = true;
                        break;
                    }
                }

                // Gestion Gatling Buffer
                if( !bManipFind && this.oGatling.oNextCommand && nCanAction != 4 ){
                    this.setCommand(this.oGatling.oNextCommand.oCommand);
                    bManipFind = true;
                }
                // Reset GATLING en END ANIM
                else if( nCanAction == 2 ){
                    this.resetGatling();
                }

                // Gestion DIR
                if( !bManipFind && this.canMove(nCanAction) ){
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
                } else {
                    this.oFrameUsed = this.getFrameUsed();
                }
            } else {
                this.oFrameUsed = this.getFrameUsed();
            }

            // Deplacement via animation
            if( this.oFrameUsed.oMove ){
                if( !this.oAnimation.nFrameFreeze || GAME.oTimer.nFrames - this.oAnimation.nFrameFreeze > GAME.oData.nLengthFreeze ){
                    if( this.oFrameUsed.oMove.nX ){
                        this.oLayer.oPosition.nX += this.oFrameUsed.oMove.nX * (this.oReverse ? -1 : 1);
                    }
                    if( this.oFrameUsed.oMove.nY ){
                        this.oLayer.oPosition.nY += this.oFrameUsed.oMove.nY;
                    }
                }
            }
        },
        // Gestion de OUTPUT
        updateOutput: function(){
            // Reverse
            this.oLayer.hElement.classList[ this.oReverse ? 'add' : 'remove' ]('--reverse');
            // Animation Freeze on HURT
            if( this.oAnimation.sType == 'guard' || this.oAnimation.sType == 'hit' ){
                let nFreeze = this.oAnimation.nFrameFreeze ? GAME.oTimer.nFrames - this.oAnimation.nFrameFreeze : 0;
                if( nFreeze < GAME.oData.nLengthFreeze ){
                    this.oLayer.hElement.classList.add(nFreeze % 2 ? '--freeze_impair' : '--freeze_pair');
                    this.oLayer.hElement.classList.remove(nFreeze % 2 ? '--freeze_pair' : '--freeze_impair');
                } else {
                    this.oLayer.hElement.classList.remove('--freeze_pair', '--freeze_impair');
                }
            }

            // Type
            if( !this.oLayer.hElement.classList.contains('--' + this.oAnimation.sType) ){
                DOMTokenList.prototype.remove.apply( this.oLayer.hElement.classList, GAME.oData.oTypeAnimation.aAll.map( sType => '--' + sType ) );
                this.oLayer.hElement.classList.add('--' + this.oAnimation.sType);
            }
            this.oLayer.hElement.classList[ this.oFrameUsed.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
            
            // Frame
            this.oFrameUsed.nZIndex && this.oLayer.setStyle(  {
                zIndex: this.oFrameUsed.nZIndex
            } );
            this.oSprite && this.oSprite.setSource( GAME.oData.oPath.oCharacter.sFrames + '/' + this.oCharacter.sCod + '/' + this.oFrameUsed.sPath );
        },
        destroy: function(){
        },

        canAction: function(){
            let nCanAction = 0;
            // Gestion MOVEMENT
            if( this.oAnimation.sType == 'movement' ){
                nCanAction = 1;
            }
            // Gestion END ANIMATION
            else if( this.oAnimation.nStartFrame + this.oAnimation.nFramesLength <= GAME.oTimer.nFrames){
                nCanAction = 2;
            }
            // Gestion ACTION en HIT
            else if( this.oCommand && this.oCommand.bHit ) {
                nCanAction = this.oFrameUsed.oStatus.bCancel ? 3 : 4;
            }
            return nCanAction;
        },
        canMove: function(nCanAction){
            nCanAction || ( nCanAction = this.canAction() );
            return nCanAction < 3;
        },
        getEnterCommands: function(){
            const aCommand = [],
                nFrameCheck = GAME.oTimer.nFrames; // TODO hit freeze

            if( this.oKeyboard.nFrameLastEvent >= nFrameCheck ){
                for( let nIndex = 0; nIndex < this.oCharacter.aCommands.length; nIndex++ ){
                    const oCommand = this.oCharacter.aCommands[nIndex];
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
        canUseCommand: function(oCommand){
            let bCanUse = false;
            // TODO Gestion KI
            if( true ){
                // Gestion GATLING
                if( this.oGatling.oCommandUsed[oCommand.sName] ){
                    // Gestion REDA CANCEL
                    if( this.oCommand && this.oCommand.sName == oCommand.sName && oCommand.aSelfCancel ){
                        for( let nIndex = 0; nIndex < oCommand.aSelfCancel.length; nIndex++ ){
                            if( !this.oGatling.oCommandUsed[ oCommand.aSelfCancel[nIndex] ] ){
                                oCommand.sName = oCommand.sAnimation = oCommand.aSelfCancel[nIndex];
                                oCommand.bHit = false;
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
        getCharacterBox: function(sBox){
            return this.oFrameUsed[sBox] ?
                Object.assign(
                    {},
                    this.oFrameUsed[sBox],
                    this.oReverse ? { nX: -(this.oFrameUsed[sBox].nWidth + this.oFrameUsed[sBox].nX - 4) } : {}
                ) :
                null;
        },
        setAnimation: function(sAnimation){
            let bSet = false;
            const aFrames = this.oCharacter.oAnimations[sAnimation],
                sType = GAME.oData.oTypeAnimation[sAnimation] || 'action';

            if( aFrames ){
                if( !this.oAnimation || sType == 'guard' || sType == 'hit' || this.oAnimation.sCod != sAnimation ){
                    this.oAnimation = {
                        sCod: sAnimation,
                        nStartFrame: GAME.oTimer.nFrames,
                        aFrames: aFrames,
                        nFramesLength: aFrames.reduce( (nResult, oFrame) => nResult + oFrame.nFrame, 0),
                        sType: sType,
                        nFrameFreeze: null
                    };
                }
                this.oFrameUsed = this.getFrameUsed();
                bSet = true;
            } else {
                console.log('TODO Create animation ' + sAnimation + ' - ' + GAME.oTimer.nFrames);
            }
            return bSet;
        },
        getFrameUsed: function(){
            let nFrameMax = this.oAnimation.nStartFrame,
                oFrameUsed = null,
                bFreeze = false;

            for( let nIndex = 0; nIndex < this.oAnimation.aFrames.length; nIndex++ ){
                const oFrame = this.oAnimation.aFrames[nIndex];
                if( oFrame.nFrame ){
                    nFrameMax += oFrame.nFrame;
                    if( !bFreeze && this.oAnimation.nFrameFreeze && this.oAnimation.nFrameFreeze < nFrameMax ){
                        nFrameMax += GAME.oData.nLengthFreeze;
                    }
                    if( nFrameMax >= GAME.oTimer.nFrames ){
                        oFrameUsed = oFrame;
                        break;
                    }
                } else {
                    oFrameUsed = oFrame;
                    break;
                }   
            }

            return Object.assign(
                { oStatus: {} },
                this.oCharacter.oFrames[ oFrameUsed.sFrame ],
                oFrameUsed
            );
        },
        setCommand: function(oCommand){
            if( this.setAnimation( oCommand.sAnimation ) ){
                this.oCommand = Object.assign({}, oCommand);
                this.oGatling.oCommandUsed[ oCommand.sName ] = true;
                this.oGatling.oNextCommand = null;
            }
        },
        setMovement: function(sMovement){
            this.resetGatling();
            this.oCommand = null;
            this.setAnimation( sMovement );
        },
        setHurt: function(sHurt, nFramesLength){
            this.resetGatling();
            this.oCommand = null;
            this.setAnimation( sHurt );
            this.oAnimation.nFramesLength = nFramesLength;
        },
        resetGatling: function(){
            this.oGatling = {
                oNextCommand: null,
                oCommandUsed: {}
            };
        }
    }
);

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
                // Gestion Reverse
                oPlayer.canMove() && this.updateReverse(oPlayer, oOpponent);
                // Gestion PositionBox / Area
                aPriority[nIndex] = this.stayInArea(oPlayer) || ( oPlayer.oFrameUsed.oHitBox ? 1 : 0 );
            } );
            
            // Gestion PositionBox / Player
            this.moveCollapsedPlayer(aPriority);

            // Gestion Hitbox
            const aHurt = [];
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( oPlayer.oCommand && !oPlayer.oCommand.bHit ){
                    const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ],
                        oHitBox = this.getCharacterCollisionBox(oPlayer, 'oHitBox'),
                        oHurtBox = this.getCharacterCollisionBox(oOpponent, 'oHurtBox');

                    if( oHitBox && oHurtBox && this.checkCollision(oHitBox, oHurtBox) ){
                        aHurt.push( {
                            oPlayer,
                            oOpponent 
                        } );
                    }
                }
            } );

            // Gestion Hurt Freeze
            if( aHurt.length ){
                aHurt.forEach( oHurt => {
                    const oCommand = oHurt.oPlayer.oCommand;
                    oCommand.bHit = true;
                    if( oHurt.oOpponent.oFrameUsed.oStatus.bGuard ){
                        oHurt.oOpponent.setHurt('guard', oCommand.oStun.nBlock);
                    } else {
                        oHurt.oOpponent.setHurt(oCommand.oStun.sHitAnimation, oCommand.oStun.nHit);
                        oHurt.oOpponent.nKi++;
                        oHurt.oOpponent.nLife--;
                    }
                    // Gestion PushBack
                } );

                //Gestion hit freeze
                this.aPlayer.forEach( oPlayer => {
                    oPlayer.oAnimation.nFramesLength += GAME.oData.nLengthFreeze;
                    oPlayer.oAnimation.nFrameFreeze = GAME.oTimer.nFrames;
                } );
            }
        },
        destroy: function(){
        },

        updateReverse: function(oPlayer, oOpponent){
            if( oPlayer.oLayer.oPosition.nX < oOpponent.oLayer.oPosition.nX ){
                oPlayer.oReverse = false;
            } else if( oPlayer.oLayer.oPosition.nX > oOpponent.oLayer.oPosition.nX ){
                oPlayer.oReverse = true;
            }
        },
        stayInArea: function(oPlayer){
            // Check
            const oBoxArea = this.oArea.getBox(),
                oBoxPlayer = oPlayer.getCharacterBox('oPositionBox'),
                nLeft = this.oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX),
                nRight = this.oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

            let nPriority = 0,
                sMove = null;

            // Trop à gauche
            if( nLeft >= oPlayer.oLayer.oPosition.nX + oBoxPlayer.nX ){
                nPriority = oPlayer.oReverse ? 2 : 3;
                sMove = 'left';
            }
            // Trop à droite
            else if( nRight <= oPlayer.oLayer.oPosition.nX + ( oBoxPlayer.nX + oBoxPlayer.nWidth ) ){
                nPriority = oPlayer.oReverse ? 3 : 2;
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

            return nPriority;
        },
        moveCollapsedPlayer: function(aPriority){
            let oPlayer = this.aPlayer[0],
                oOpponent = this.aPlayer[1];

            if( this.aPlayer[0].oReverse ){
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

/* Battle */
function BattleScene(){
	this.oContext = null;
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

					this.oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                    this.setBackground( oLastData.sStageSelected );

                    this.getPattern();
                    for( let nIndex = 0; nIndex < GAME.oData.oSettings.nPlayer; nIndex++ ){
                        
                        // Players init
                        let nPlayer = nIndex + 1;
                        this.createPlayer(nPlayer);
                        const oPlayer = new BattlePlayer(
                            nPlayer,
                            oLastData.aCharacterSelected[nIndex],
                            /*oLastData.bAllPlayerActive ? null : */GAME.oInput.getController('IC_' + nPlayer ),
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

                    this.oTraining && this.oTraining.update();
				},
                destroy: function(){
                },

                setBackground: function(sCod){
                    this.oContext.setStyle( {
                        backgroundColor: GAME.oData.oStage[sCod].sColor,
                        backgroundImage:'url("' + GAME.oData.oPath.oStage.sBackground + '/' + sCod + '.png")'
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