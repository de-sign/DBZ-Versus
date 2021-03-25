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
            // Gestion Fin de partie
            const aPlayerWin = [];
            if( this.bDeath ){
                this.aPlayer.forEach( (oPlayer, nIndex) => {
                    if( oPlayer.nLife <= 0 && oPlayer.oAnimation.sType == 'down' ){
                        aPlayerWin.push( this.aPlayer[ nIndex ? 0 : 1 ] );
                    }
                } );
            }

            if( !aPlayerWin.length ){
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
                        const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ];
                        if( !this.bDeath || oOpponent.nLife > 0 ){
                            const oHitBox = this.getCharacterCollisionBox(oPlayer, 'oHitBox'),
                                oHurtBox = this.getCharacterCollisionBox(oOpponent, 'oHurtBox');
                            
                            if( oHitBox && oHurtBox && this.checkCollision(oHitBox, oHurtBox) ){
                                aHurt.push( {
                                    oCommand: oPlayer.oGatling.oCurrent,
                                    oPlayer,
                                    oOpponent
                                } );
                                aPriority[nIndex]++;
                            }
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

                            const bLunch = oHurt.oCommand.oStun.bLunch && !oHurt.oOpponent.oLunch,
                                bDeath = this.bDeath && oHurt.oOpponent.nLife <= 0;
                            oHurt.oOpponent.setHurt(
                                bLunch || bDeath ? 'lunch' : oHurt.oCommand.oStun.sHitAnimation,
                                oHurt.oCommand.oStun.nHit,
                                true
                            );

                            bDeath && (oHurt.oPlayer.oInputBuffer.oKeyboard = null);
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
            }

            return aPlayerWin;
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