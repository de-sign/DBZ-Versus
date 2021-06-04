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

                // Gestion PositionBox / Area
                aEntity.forEach( (oEntity, nIndex) => {
                    if( oEntity.oCheck.bCollapse ){
                        const oReferent = this.aPlayer[ (oEntity.oParent || oEntity).nPlayer == 1 ? 1 : 0 ];
                        oCollapse[oEntity.sId] = {
                            nIndex,
                            oEntity,
                            nOrientation: this.getOrientation(oEntity, oReferent),
                            nPriority: this.stayInArea(oEntity)
                        };
                    }
                } );

                // Gestion Reverse
                aEntity.forEach( (oEntity, nIndex) => {
                    if( oEntity.oCheck.bReverse && oEntity.canReverse() && oCollapse[oEntity.sId] ){
                        oEntity.bReverse = oCollapse[oEntity.sId].nOrientation == 1;
                    }
                } );
                
                // Gestion PositionBox / Entity
                this.moveCollapsed(oCollapse);

                // Gestion Hitbox
                this.checkHit(aEntity, oCollapse);

                // Gestion Super Freeze
                this.commandFreeze(aEntity);
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
                !oBoxA
                || !oBoxB
                || (oBoxB.nX >= oBoxA.nX + oBoxA.nWidth)     // trop à droite
	            || (oBoxB.nX + oBoxB.nWidth <= oBoxA.nX) // trop à gauche
	            || (oBoxB.nY >= oBoxA.nY + oBoxA.nHeight) // trop en bas
	            || (oBoxB.nY + oBoxB.nHeight <= oBoxA.nY) // trop en haut
            );
        },
        checkInvulnerable: function(oEntityHit, oEntityHurt){
            let bInvul = false;
            const oData = oEntityHit.getHitData();
            if( oData ){
                // Gestion INVULNERABLE
                if( oEntityHurt.isInvulnerable() ){
                    bInvul = true;
                }
                // Gestion THROW contre adversaire en l'air
                else if( oData.bOnlyOnGround && oEntityHurt.oStatus.bAerial ){
                    bInvul = true;
                }
                // Gestion courp aérien contre ANTI AIR
                else if( oEntityHit.oStatus.bAerial && oEntityHurt.oStatus.bAerialInvul ){
                    bInvul = true;
                }
            }
            return bInvul;
        },
        hasSameParent: function(oEntityA, oEntityB){
            return (oEntityA.oParent || oEntityA).sId == (oEntityB.oParent || oEntityB).sId;
        },

        generateEntity: function(aEffect){
            const aEntity = [];
            if( aEffect && aEffect.length ){
                aEffect.forEach( oEffect => {
                    let oEntity = null;
                    switch(oEffect.sType){
                        // sEntity
                        case 'sound':
                            OutputManager.getChannel('CHN__SFX').play(oEffect.sEntity);
                            break;
                        
                        // sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent, bLink
                        case 'projectile':
                        case 'beam':
                        case 'character':
                            oEntity = new window['Battle' + oEffect.sType[0].toUpperCase() + oEffect.sType.slice(1)]( oEffect.sEntity, oEffect.sColor, oEffect.sAnimation, oEffect.oPosition, oEffect.bReverse, oEffect.oHitData, oEffect.oParent );
                            oEffect.bLink && oEffect.oParent.add(oEntity);
                            oEntity.update();
                            break;

                        // sAnimation, oPosition, bReverse, oParent
                        case 'effect':
                            oEntity = new BattleEffect( oEffect.sAnimation, oEffect.oPosition, oEffect.bReverse, oEffect.oParent );
                            oEntity.update();
                            break;
                    }
                    oEntity && aEntity.push(oEntity);
                } );
            }
            return aEntity;
        },
        
        // ENTITY dans AREA : LEFT, RIGHT et DOWN
        stayInArea: function(oEntity){
            // Check
            let oBoxEntity = oEntity.getBox('oPositionBox')[0],
                nPriority = oEntity.oAnimation.sType == 'action' ? 2 :
                    ( oEntity.canMove() ? 0 : 1 ),
                sMove = null;
                
            const oBoxArea = this.oArea.getBox(),
                nLeft = this.oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX),
                nRight = this.oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

            if( oBoxEntity ){
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
                        oEntity.setStance( oEntity.oAnimation.sName == 'fall' ? 'down' : 'landing', true);
                        oBoxEntity = oEntity.getBox('oPositionBox')[0];
                        oEntity.oLayer.oPosition.nY = nDown - ( oBoxEntity.nY + oBoxEntity.nHeight );
                    }
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
                            if( oCollapseA.nOrientation > 0 ){
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
                if( oEntityHit.oCheck.bHit ){
                    aEntity.forEach( oEntityHurt => {
                        if(
                            !this.hasSameParent(oEntityHit, oEntityHurt)
                            && oEntityHurt.oCheck.oHurt[ oEntityHit.sType ]
                            && oEntityHurt.nLife > 0
                            && oEntityHit.aHit.indexOf(oEntityHurt.sId) == -1
                            && !this.checkInvulnerable(oEntityHit, oEntityHurt)
                        ){
                            let bHit = false;
                            const oData = oEntityHit.getHitData(),
                                aHitBox = this.getCollisionBox(oEntityHit, 'aHitBox'),
                                aHurtBox = this.getCollisionBox(oEntityHurt, ( oData && oData.sCollisionBox ) || 'aHurtBox');

                            if( aHitBox.length && aHurtBox.length ){
                                for( let nHitBox = 0; nHitBox < aHitBox.length; nHitBox++ ){
                                    for( let nHurtBox = 0; nHurtBox < aHurtBox.length; nHurtBox++ ){
                                        if( this.checkCollision(aHitBox[nHitBox], aHurtBox[nHurtBox]) ){
                                            // HURT
                                            aHurt.push( {
                                                oEntityHit,
                                                oEntityHurt,
                                                oData: oData
                                            } );
                                            // PUSHBACK
                                            aPushback.push( {
                                                oPriority: {
                                                    nHit: oCollapse[oEntityHit.sId] ? oCollapse[oEntityHit.sId].nPriority : 2,
                                                    nHurt: oCollapse[oEntityHurt.sId] ? oCollapse[oEntityHurt.sId].nPriority : 0
                                                },
                                                oEntityHit,
                                                oEntityHurt,
                                                oData: oData.oPushback || GameSettings.oPushback
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
                const aNewEntity = [];
                // Gestion Hurt
                aHurt.forEach( oHurt => {
                    const aEntity = oHurt.oEntityHurt.takeHit(oHurt.oEntityHit, oHurt.oData);
                    aEntity && [].push.apply(aNewEntity, aEntity);
                } );
                [].push.apply( aEntity, this.generateEntity(aNewEntity) );
                // Gestion PushBack
                this.movePushback(aPushback, oCollapse);
                // Gestion hit freeze
                aEntity.forEach( oEntity => {
                    oEntity.setFreeze(GameSettings.nFreeze);
                } );
            }
        },

        movePushback: function(aPushback, oCollapse){
            aPushback.forEach( oPushback => {
                if( oPushback.oPriority.nHit < oPushback.oPriority.nHurt && oPushback.oData.nX < 0 ){
                    this.pushbackEntity( oPushback.oEntityHit, oPushback.oData, oPushback.oEntityHit.bReverse, !oPushback.oData.bNotDivide );
                } else {
                    this.pushbackEntity( oPushback.oEntityHurt, oPushback.oData, !oPushback.oEntityHit.bReverse, false );
                }
            } );
        },
        pushbackEntity: function(oEntity, oData, bReverse, bDivide){
            if( oEntity.isLinked() ){
                oEntity.oParent.oCheck.bPushback && oEntity.oParent.pushBack(oData, bReverse, bDivide);
                for( let sType in oEntity.oParent.oLink ){
                    oEntity.oParent.oLink[sType].forEach( oLinkEntity => {
                        oLinkEntity.oCheck.bPushback && oLinkEntity.pushBack(oData, bReverse, bDivide);
                    } );
                }
            }
            else if( oEntity.oCheck.bPushback ){
                oEntity.pushBack(oData, bReverse, bDivide);
            }
        },

        commandFreeze: function(aEntity){
            for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                const oPlayer = this.aPlayer[nIndex];
                if( oPlayer.oGatling.needFreeze() ){
                    oPlayer.oGatling.bFreeze = true;

                    // Freeze
                    aEntity.forEach( oEntity => {
                        oEntity.sId != oPlayer.sId && oEntity.setFreeze(oPlayer.oGatling.oCurrent.oStun.nFreeze);
                    } );

                    // Texte
                    SceneManager.oCurrent.oInfo.add( {
                        sImg: oPlayer.oData.oPath.sFace,
                        sText: oPlayer.oGatling.oCurrent.sName + '&nbsp;!'
                    } );
                    break;
                }
            }
        }
    }
);