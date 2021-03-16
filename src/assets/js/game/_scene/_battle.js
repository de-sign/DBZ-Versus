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

                    this.aHistory.length >= BattleInputBuffer.nLengthHistory && this.aHistory.pop();
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
            }
        }
    }
);

function BattlePlayer(nPlayer, sChar, oKeyboard, bBox){
    this.nPlayer = nPlayer;
    this.oLayer = null;
    this.oSprite = null;
    this.oBox = null;

    this.oCharacter = null;
    this.oKeyboard = null;

    this.nLife = GAME.oData.oSettings.nLife;
    this.nKi = 0;

    this.oInputBuffer = null;
    this.oFrameUsed = null;
    this.oAnimation = null;

    this.oStatus = {
        bStun: false,
        bCancel: false,
        bGuard: false,
        bReverse: false
    };

    this.init(sChar, oKeyboard, bBox);
}

Object.assign(
    BattlePlayer.prototype, {
        init: function(sChar, oKeyboard, bBox) {
            this.oLayer = GAME.oOutput.getElement('LAY__Battle_Character_' + this.nPlayer);
            this.oLayer.addTickUpdate( () => {
                this.oSprite = GAME.oOutput.getElement('SPT__Battle_Character_Sprite_' + this.nPlayer);
                if( bBox ) {
                    this.oBox = {
                        oPositionBox: GAME.oOutput.getElement('LAY__Battle_Character_PositionBox_' + this.nPlayer),
                        oHurtBox: GAME.oOutput.getElement('LAY__Battle_Character_HurtBox_' + this.nPlayer),
                        oHitBox: GAME.oOutput.getElement('LAY__Battle_Character_HitBox_' + this.nPlayer)
                    };
                }
            } );
            this.oCharacter = GAME.oData.oCharacter[sChar];
            this.oInputBuffer = new BattleInputBuffer( this.oKeyboard = oKeyboard );
        },
        updateInput: function(){
            // Gestion des INPUTs
            this.oInputBuffer.update(this.oStatus.bReverse);

            // Si pas stun par Animation
            if( !this.oStatus.bStun ){
                const sManip = this.getManipulation();
                if( sManip ){
                    // TODO Animation
                } else {
                    // Gestion DIR
                    switch( this.oInputBuffer.getDirection() ){
                        case 'NT':
                        case 'UP':
                        case 'DN':
                            this.setAnimation('stand');
                            this.oStatus.bGuard = false;
                            break;
                        case 'BW':
                        case 'UB':
                        case 'DB':
                            this.setAnimation('backward');
                            this.oStatus.bGuard = true;
                            break;
                        case 'FW':
                        case 'UF':
                        case 'DF':
                            this.setAnimation('forward');
                            this.oStatus.bGuard = false;
                            break;
                    }
                }
            }

            // Deplacement via animation
            this.oFrameUsed = this.getFrameUsed();
            if( this.oFrameUsed.oMove ){
                if( this.oFrameUsed.oMove.nX ){
                    this.oLayer.oPosition.nX += this.oFrameUsed.oMove.nX * (this.oStatus.bReverse ? -1 : 1);
                }
                if( this.oFrameUsed.oMove.nY ){
                    this.oLayer.oPosition.nY += this.oFrameUsed.oMove.nY;
                }
            }
        },
        updateOutput: function(){
            // Gestion de OUTPUT
            // Reverse
            this.oLayer.hElement.classList[ this.oStatus.bReverse ? 'add' : 'remove' ]('--reverse');
            this.oLayer.hElement.classList[ this.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
            // Frame
            this.oFrameUsed.nZIndex && this.oLayer.setStyle(  {
                zIndex: this.oFrameUsed.nZIndex
            } );
            this.oSprite && this.oSprite.setSource( GAME.oData.oPath.oCharacter.sFrames + '/' + this.oCharacter.sCod + '/' + this.oFrameUsed.sPath );

            // Gestion BOX
            if( this.oBox ){
                const oPositionPoint = GAME.oData.oPositionPoint[ this.bReverse ? 'oReverse' : 'oNormal' ];
                ['oPositionBox', 'oHurtBox', 'oHitBox'].forEach( sBox => {
                    if( this.oFrameUsed[sBox] ){
                        const oBox = this.getCharacterBox(sBox);
                        this.oBox[sBox].setStyle( {
                            display: null,
                            left: ( oPositionPoint.nX + oBox.nX ) + 'px',
                            top: ( oPositionPoint.nY + oBox.nY ) + 'px',
                            width: oBox.nWidth + 'px',
                            height: oBox.nHeight + 'px'
                        } );
                    } else {
                        this.oBox[sBox].setStyle( { display: 'none' } );
                    }
                } );
            }
        },
        destroy: function(){
        },

        getManipulation: function(){
            return null; // TODO
        },
        getCharacterBox: function(sBox){
            return Object.assign(
                {},
                this.oFrameUsed[sBox],
                this.oStatus.bReverse ? { nX: -(this.oFrameUsed[sBox].nWidth + this.oFrameUsed[sBox].nX - 4) } : {}
            );
        },
        setAnimation: function(sAnimation){
            if( !this.oAnimation || this.oAnimation.sCod != sAnimation ){
                this.oAnimation = {
                    sCod: sAnimation,
                    nStartFrame: GAME.oTimer.nFrames,
                    aFrames: this.oCharacter.oAnimations[sAnimation]
                };
            }
        },
        getFrameUsed: function(){
            let nFrameMax = this.oAnimation.nStartFrame,
                oFrameUsed = null;

            for( let nIndex = 0; nIndex < this.oAnimation.aFrames.length; nIndex++ ){
                const oFrame = this.oAnimation.aFrames[nIndex];
                if( oFrame.nFrame ){
                    nFrameMax += oFrame.nFrame;
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
                {},
                this.oCharacter.oFrames[ oFrameUsed.sFrame ],
                oFrameUsed
            );
        }
    }
);

function BattleEngine(aPlayer, oArea){
    this.aPlayer = null;
    this.oArea = null;

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

            this.aPlayer.forEach( (oPlayer, nIndex) => {
                const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ];
                // Gestion Reverse
                oPlayer.oStatus.bStun || this.updateReverse(oPlayer, oOpponent);
                // Gestion PositionBox / Area
                aPriority[nIndex] = this.stayInArea(oPlayer) || ( oPlayer.oFrameUsed.oHitBox ? 1 : 0 );
            } );
            
            // Gestion PositionBox / Player
            this.moveCollapsedPlayer(aPriority);

            // Gestion Hitbox

        },
        destroy: function(){
        },

        updateReverse: function(oPlayer, oOpponent){
            if( oPlayer.oLayer.oPosition.nX < oOpponent.oLayer.oPosition.nX ){
                oPlayer.oStatus.bReverse = false;
            } else if( oPlayer.oLayer.oPosition.nX > oOpponent.oLayer.oPosition.nX ){
                oPlayer.oStatus.bReverse = true;
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
                nPriority = oPlayer.oStatus.bReverse ? 2 : 3;
                sMove = 'left';
            }
            // Trop à droite
            else if( nRight <= oPlayer.oLayer.oPosition.nX + ( oBoxPlayer.nX + oBoxPlayer.nWidth ) ){
                nPriority = oPlayer.oStatus.bReverse ? 3 : 2;
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

            if( this.aPlayer[0].oStatus.bReverse ){
                oPlayer = this.aPlayer[1];
                oOpponent = this.aPlayer[0];
            }

            const oBoxPlayer = this.getCharacterCollisionBox(oPlayer),
                oBoxOpponent = this.getCharacterCollisionBox(oOpponent);

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
        getCharacterCollisionBox: function(oPlayer){
            const oBox = oPlayer.getCharacterBox('oPositionBox');
            oBox.nX += oPlayer.oLayer.oPosition.nX;
            oBox.nY += oPlayer.oLayer.oPosition.nY;
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
                            oLastData.bAllPlayerActive ? null : GAME.oInput.getController('IC_' + nPlayer ),
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
				},
				update: function(){
                    this.aPlayer.forEach( oPlayer => oPlayer.updateInput() );
                    this.oEngine.update();
                    this.aPlayer.forEach( oPlayer => oPlayer.updateOutput() );
                    this.aHUD.forEach( oHUD => oHUD.update() );
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