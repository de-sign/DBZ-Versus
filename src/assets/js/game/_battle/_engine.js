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
                const aEntity = BattleEntity.get().filter( oEntity => !oEntity.isDead() ),
                    oCollapse = {};

                // Gestion Reverse / Area
                aEntity.forEach( (oEntity, nIndex) => {
                    // Gestion PositionBox / Area
                    if( oEntity.oCheck.bCollapse ){
                        oCollapse[oEntity.sId] = {
                            nIndex,
                            oEntity,
                            nPriority: this.stayInArea(oEntity)
                        };
                    }
                    // Gestion Reverse
                    if( oEntity.oCheck.bReverse ){
                        const oReferent = this.aPlayer[ (oEntity.oParent || oEntity).nPlayer == 1 ? 1 : 0 ];
                        oEntity.canMove() && this.updateReverse(oEntity, oReferent);
                    }
                } );
                
                // Gestion PositionBox / Entity
                this.moveCollapsed(oCollapse);

                // Gestion Hitbox
                this.checkHit(aEntity, oCollapse);

                // Gestion Super Freeze
                for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                    const oPlayer = this.aPlayer[nIndex];
                    if( oPlayer.oGatling.needFreeze() ){
                        const sName = oPlayer.oGatling.oCurrent.oName ?
                            oPlayer.oGatling.oCurrent.oName[ oPlayer.oColor.sCod ] :
                            oPlayer.oGatling.oCurrent.sName;

                        oPlayer.oGatling.bFreeze = true;
                        aEntity.forEach( oEntity => {
                            oEntity.sId != oPlayer.sId && oEntity.setFreeze(oPlayer.oGatling.oCurrent.oStun.nFreeze);
                        } );
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
        destroy: function(){},
        
        getCollisionBox: function(oPlayer, sBox){
            const aBox = oPlayer.getBox(sBox);
            aBox.length && aBox.forEach( oBox => {
                oBox.nX += oPlayer.oLayer.oPosition.nX;
                oBox.nY += oPlayer.oLayer.oPosition.nY;
            } );
            return aBox;
        },
        getOrientation: function(oEntityA, oEntityB){
            return Math.min( Math.max(oEntityA.oLayer.oPosition.nX - oEntityB.oLayer.oPosition.nX, -1), 1);
        },

        checkCollision: function(oBoxA, oBoxB){
            return !(
                (oBoxB.nX >= oBoxA.nX + oBoxA.nWidth)     // trop à droite
	            || (oBoxB.nX + oBoxB.nWidth <= oBoxA.nX) // trop à gauche
	            || (oBoxB.nY >= oBoxA.nY + oBoxA.nHeight) // trop en bas
	            || (oBoxB.nY + oBoxB.nHeight <= oBoxA.nY) // trop en haut
            );
        },
        hasSameParent: function(oEntityA, oEntityB){
            return (oEntityA.oParent || oEntityA).sId == (oEntityB.oParent || oEntityB).sId;
        },

        // REVERSE en fonction d'un point
        updateReverse: function(oEntity, oReferent){
            switch( this.getOrientation(oEntity, oReferent) ){
                case -1:
                    oEntity.bReverse = false;
                    break;
                case 1:
                    oEntity.bReverse = true;
                    break;
            }
        },
        // ENTITY dans AREA : LEFT, RIGHT et DOWN
        stayInArea: function(oEntity){
            // Check
            let oBoxEntity = oEntity.getBox('oPositionBox')[0],
                nPriority = oEntity.canMove() ? 0 : 1,
                sMove = null;
                
            const oBoxArea = this.oArea.getBox(),
                nLeft = this.oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX),
                nRight = this.oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

            // Trop à gauche
            if( nLeft >= oEntity.oLayer.oPosition.nX + oBoxEntity.nX ){
                nPriority = oEntity.bReverse ? 3 : 4;
                sMove = 'left';
            }
            // Trop à droite
            else if( nRight <= oEntity.oLayer.oPosition.nX + ( oBoxEntity.nX + oBoxEntity.nWidth ) ){
                nPriority = oEntity.bReverse ? 4 : 3;
                sMove = 'right';
            }

            switch( sMove ){
                case 'left':
                    oEntity.oLayer.oPosition.nX = nLeft - oBoxEntity.nX;
                    break;
                case 'right':
                    oEntity.oLayer.oPosition.nX = nRight - ( oBoxEntity.nX + oBoxEntity.nWidth );
                    break;
            }

            // Trop en bas
            if( oEntity.oCheck.bLunch ){
                const nDown = this.oArea.oPosition.nY + (oBoxArea.bottom - oBoxArea.originY) - oEntity.oPositionPoint.nGapY;
                if( nDown < oEntity.oLayer.oPosition.nY + ( oBoxEntity.nY + oBoxEntity.nHeight ) ){
                    oBoxEntity = oEntity.getBox('oPositionBox')[0];
                    oEntity.oLayer.oPosition.nY = nDown - ( oBoxEntity.nY + oBoxEntity.nHeight );
                    oEntity.oLunch = null;
                    oEntity.setStance('down', true);
                }
            }

            return nPriority;
        },
        // ENTITY entre elle
        moveCollapsed: function(oCollapse){

            const oCheck = {};
            for( let sIdA in oCollapse ){
                for( let sIdB in oCollapse ){
                    if( sIdA != sIdB ){
                        const oCollapseA = oCollapse[sIdA],
                            oCollapseB = oCollapse[sIdB],
                            sCheck = oCollapseA.nIndex < oCollapseB.nIndex ?
                                oCollapseA.nIndex + '_' + oCollapseB.nIndex :
                                oCollapseB.nIndex + '_' + oCollapseA.nIndex;
                        
                        if( !oCheck[sCheck] && !this.hasSameParent(oCollapseA.oEntity, oCollapseB.oEntity) ){

                            let oLeft = oCollapseA,
                                oRight = oCollapseB;
                            if( this.getOrientation(oCollapseA.oEntity, oCollapseB.oEntity) > 0 ){
                                oLeft = oCollapseB;
                                oRight = oCollapseA;
                            }

                            const oBoxLeft = this.getCollisionBox(oLeft.oEntity, 'oPositionBox')[0],
                                oBoxRight = this.getCollisionBox(oRight.oEntity, 'oPositionBox')[0];

                            if( this.checkCollision(oBoxLeft, oBoxRight) ){
                                const nRight = oLeft.oEntity.oLayer.oPosition.nX + ( oBoxLeft.nX + oBoxLeft.nWidth ),
                                    nLeft = oLeft.oEntity.oLayer.oPosition.nX + oBoxRight.nX,
                                    nDiff = nRight - nLeft;

                                // Separation Egal
                                if( oLeft.nPriority == oRight.nPriority ){
                                    oLeft.oEntity.oLayer.oPosition.nX -= nDiff / 2;
                                    oRight.oEntity.oLayer.oPosition.nX += nDiff / 2;
                                }
                                // Movement RIGHT
                                else if( oLeft.nPriority > oRight.nPriority ) {
                                    oRight.oEntity.oLayer.oPosition.nX += nDiff;
                                }
                                // Movement LEFT
                                else {
                                    oLeft.oEntity.oLayer.oPosition.nX -= nDiff;
                                }
                            }

                            oCheck[sCheck] = true;
                        }
                    }
                }
            }
        },

        // HIT et HURT entre les ENTITY
        checkHit: function(aEntity, oCollapse){
            const aHurt = [],
                aPushback = [];

            // Gestion HIT
            aEntity.forEach( oEntityHit => {
                if( oEntityHit.oCheck.bHit && !oEntityHit.bHit ){
                    aEntity.forEach( oEntityHurt => {
                        if(
                            !this.hasSameParent(oEntityHit, oEntityHurt)
                            && oEntityHurt.oCheck.oHurt[ oEntityHit.sType ]
                            && oEntityHurt.nLife > 0
                        ){
                            let bHit = false;
                            const aHitBox = this.getCollisionBox(oEntityHit, 'aHitBox'),
                                aHurtBox = this.getCollisionBox(oEntityHurt, 'aHurtBox');
                            if( aHitBox.length && aHurtBox.length ){
                                for( let nHitBox = 0; nHitBox < aHitBox.length; nHitBox++ ){
                                    for( let nHurtBox = 0; nHurtBox < aHurtBox.length; nHurtBox++ ){
                                        if( this.checkCollision(aHitBox[nHitBox], aHurtBox[nHurtBox]) ){
                                            // HURT
                                            aHurt.push( {
                                                oEntityHit,
                                                oEntityHurt
                                            } );
                                            // PUSHBACK
                                            aPushback.push( {
                                                oPriority: {
                                                    nHit: oCollapse[oEntityHit.sId] ? oCollapse[oEntityHit.sId].nPriority + 1 : 1,
                                                    nHurt: oCollapse[oEntityHurt.sId] ? oCollapse[oEntityHurt.sId].nPriority : 0
                                                },
                                                oEntityHit,
                                                oEntityHurt,
                                                oData: oEntityHit.getHitData().oPushback
                                            } );
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
                    } );
                }
            } );

            if( aHurt.length ){
                // Gestion Hurt
                aHurt.forEach( oHurt => oHurt.oEntityHurt.takeHit(oHurt.oEntityHit) );
                // Gestion PushBack
                this.movePushback(aPushback, oCollapse);
                // Gestion hit freeze
                aEntity.forEach( oEntity => {
                    oEntity.setFreeze(GAME.oSettings.nFreeze);
                } );
            }
        },

        movePushback: function(aPushback, oCollapse){
            aPushback.forEach( oPushback => {
                // Movement Opponent
                if( oPushback.oPriority.nHit > oPushback.oPriority.nHurt ) {
                    if( oPushback.oEntityHurt.oCheck.bPushback ){
                        oPushback.oEntityHurt.pushBack(oPushback.oData, false);
                        const oParent = oPushback.oEntityHurt.oParent;
                        oParent && oParent.pushBack(oPushback.oData, false);
                    }
                }
                // Movement Player
                else if( oPushback.oEntityHit.oCheck.bPushback ){
                    oPushback.oEntityHit.pushBack(oPushback.oData, true);
                    const oParent = oPushback.oEntityHit.oParent;
                    oParent && oParent.pushBack(oPushback.oData, true);
                }
            } );
        }
    }
);