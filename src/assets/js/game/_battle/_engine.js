/* ----- BattleEngine ----- */
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
            // Gestion Fin de partie
            const aPlayerWin = [];
            this.aPlayer.forEach( (oPlayer, nIndex) => {
                if( oPlayer.nLife <= 0 && oPlayer.oAnimation.sType == 'down' ){
                    aPlayerWin.push( this.aPlayer[ nIndex ? 0 : 1 ] );
                }
            } );

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
                let bLunch = false,
                    nDividePushback = -1;
                const aHurt = [],
                    aPushback = [];

                this.aPlayer.forEach( (oPlayer, nIndex) => {
                    if( !oPlayer.oGatling.isHit() ){
                        const oOpponent = this.aPlayer[ nIndex ? 0 : 1 ];
                        if( oOpponent.nLife > 0 ){
                            let bHit = false;
                            const aHitBox = this.getCharacterCollisionBox(oPlayer, 'aHitBox'),
                                aHurtBox = this.getCharacterCollisionBox(oOpponent, 'aHurtBox');
                            
                            if( aHitBox.length && aHurtBox.length ){
                                for( let nHitBox = 0; nHitBox < aHitBox.length; nHitBox++ ){
                                    for( let nHurtBox = 0; nHurtBox < aHurtBox.length; nHurtBox++ ){
                                        if( this.checkCollision(aHitBox[nHitBox], aHurtBox[nHurtBox]) ){
                                            aHurt.push( {
                                                oCommand: oPlayer.oGatling.oCurrent,
                                                oPlayer,
                                                oOpponent
                                            } );
                                            aPriority[nIndex]++;
                                            aPushback[nIndex] = oPlayer.oGatling.oCurrent.oPushback;
                                            bHit = true;
                                            break;
                                        }
                                    }
                                    if( bHit ){
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } );

                // Gestion Hurt
                if( aHurt.length ){
                    aHurt.forEach( oHurt => {
                        oHurt.oCommand.bHit = true;
                        if( oHurt.oOpponent.oAnimation.oFrame.oStatus.bGuard ){
                            oHurt.oOpponent.setHurt('guard', oHurt.oCommand.oStun.nBlock, true);
                        } else {
                            const nDamage = oHurt.oCommand.nDamage == null ? 1 : oHurt.oCommand.nDamage;
                            oHurt.oCommand.nCost || ( oHurt.oPlayer.addKi(nDamage) );
                            oHurt.oOpponent.addKi( 2 * nDamage );
                            oHurt.oOpponent.nLife -= nDamage;
                            oHurt.oOpponent.nHitting += nDamage;

                            if( nDamage ){
                                const bLunch = oHurt.oCommand.oStun.bLunch && !oHurt.oOpponent.oLunch,
                                    bDeath = oHurt.oOpponent.nLife <= 0;
                                    
                                oHurt.oOpponent.setHurt(
                                    bLunch || bDeath ? 'lunch' : oHurt.oCommand.oStun.sHitAnimation,
                                    oHurt.oCommand.oStun.nHit,
                                    true
                                );
                            }
                        }
                    } );
                    
                    // Gestion PushBack
                    this.movePushback(aPriority, aPushback);

                    // Gestion hit freeze
                    this.aPlayer.forEach( oPlayer => {
                        oPlayer.setFreeze(GAME.oSettings.nFreeze);
                    } );
                }

                // Gestion Super Freeze
                for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                    const oPlayer = this.aPlayer[nIndex];
                    if( oPlayer.oGatling.needFreeze() ){
                        const sName = oPlayer.oGatling.oCurrent.oName ?
                            oPlayer.oGatling.oCurrent.oName[ oPlayer.oColor.sCod ] :
                            oPlayer.oGatling.oCurrent.sName;

                        oPlayer.oGatling.bFreeze = true;
                        this.aPlayer[ oPlayer.nPlayer == 1 ? 1 : 0 ].setFreeze(oPlayer.oGatling.oCurrent.oStun.nFreeze);
                        GAME.oScene.oCurrent.oInfo.add( {
                            sImg: oPlayer.oColor.oPath.sFace,
                            sText: sName + '&nbsp;!'
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
            let oBoxPlayer = oPlayer.getCharacterBox('oPositionBox')[0];
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
                oPlayer.setStance('down', true);
                oBoxPlayer = oPlayer.getCharacterBox('oPositionBox')[0];
                oPlayer.oLayer.oPosition.nY = nDown - ( oBoxPlayer.nY + oBoxPlayer.nHeight );
            }

            return nPriority;
        },
        moveCollapsedPlayer: function(aPriority){
            const nIndexPlayer = this.aPlayer[0].bReverse ? 1 : 0,
                nIndexOpponent = nIndexPlayer ? 0 : 1,
                oPlayer = this.aPlayer[nIndexPlayer],
                oOpponent = this.aPlayer[nIndexOpponent];

            const oBoxPlayer = this.getCharacterCollisionBox(oPlayer, 'oPositionBox')[0],
                oBoxOpponent = this.getCharacterCollisionBox(oOpponent, 'oPositionBox')[0];

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
                else if( aPriority[nIndexPlayer] > aPriority[nIndexOpponent] ) {
                    oOpponent.oLayer.oPosition.nX += nDiff;
                }
                // Movement Player
                else {
                    oPlayer.oLayer.oPosition.nX -= nDiff;
                }
            }
        },
        movePushback: function(aPriority, aPushback){
            const oPlayer = this.aPlayer[0],
                oOpponent = this.aPlayer[1];

            // Double touch NEUTRAL
            if( aPushback[0] && aPushback[1] ){
                oPlayer.pushBack(aPushback[1]);
                oOpponent.pushBack(aPushback[0]);
            }
            // Movement Opponent
            else if( aPriority[0] > aPriority[1] ) {
                oOpponent.pushBack(aPushback[0] || aPushback[1], aPushback[1]);
            }
            // Movement Player
            else {
                oPlayer.pushBack(aPushback[0] || aPushback[1], aPushback[0]);
            }
        },
        getCharacterCollisionBox: function(oPlayer, sBox){
            const aBox = oPlayer.getCharacterBox(sBox);
            aBox.length && aBox.forEach( oBox => {
                oBox.nX += oPlayer.oLayer.oPosition.nX;
                oBox.nY += oPlayer.oLayer.oPosition.nY;
            } );
            return aBox;
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