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

    this.nHitting = 0;
    
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
            this.oLayer.resetPosition();

            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oKeyboard = oKeyboard;
            this.oInputBuffer = new BattleInputBuffer(this.oKeyboard);
            this.oGatling = new BattleGatling(this.oInputBuffer, this.oCharacter.aCommands);

            // init en STAND
            this.createDeathAnimation();
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

            // Ajout de 10 FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GAME.oSettings.oLuncher.nLength + 10; nIndex++ ){
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
                    this.nHitting = 0;
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
function BattleEngine(bDeath, aPlayer, oArea){
    this.bDeath = false;
    this.aPlayer = null;
    this.oArea = null;

    this.init(bDeath, aPlayer, oArea);
}

Object.assign(
    BattleEngine.prototype, {
        init: function(bDeath, aPlayer, oArea) {
            this.bDeath = bDeath;
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
                        const nDamage = oHurt.oCommand.nDamage || 1;
                        oHurt.oOpponent.nKi += nDamage;
                        oHurt.oOpponent.nLife -= nDamage;
                        oHurt.oOpponent.nHitting += nDamage;

                        const bLunch = (oHurt.oCommand.oStun.bLunch && !oHurt.oOpponent.oLunch ) || ( this.bDeath && oHurt.oOpponent.nLife <= 0 );
                        oHurt.oOpponent.setHurt(
                            bLunch ? 'lunch' : oHurt.oCommand.oStun.sHitAnimation,
                            oHurt.oCommand.oStun.nHit,
                            true
                        );
                    }
                } );
                
                // Gestion PushBack
                this.movePushback(aPriority, Math.max.apply(Math, aPushback));

                // Gestion hit freeze
                this.aPlayer.forEach( oPlayer => {
                    oPlayer.oAnimation.setFreeze(GAME.oSettings.nFreeze);
                } );
            }

            // Gestion Super Freeze
            for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                const oPlayer = this.aPlayer[nIndex];
                if( oPlayer.oGatling.needFreeze() ){
                    oPlayer.oGatling.bFreeze = true;
                    this.aPlayer[ oPlayer.nPlayer == 1 ? 1 : 0 ].oAnimation.setFreeze(oPlayer.oGatling.oCurrent.oStun.nFreeze);
                    GAME.oScene.oCurrent.oInfo.add( {
                        sImg: GAME.oSettings.oPath.oCharacter.sFace + '/' + oPlayer.oCharacter.sCod + '.png',
                        sText: oPlayer.oGatling.oCurrent.sName + ' !'
                    } );
                    break;
                }
            }
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
                if( this.bDeath && oPlayer.nLife <= 0 ){
                    GAME.oScene.oCurrent.endBattle( oPlayer.nPlayer );
                }
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