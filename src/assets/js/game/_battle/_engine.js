/* ----- BattleEngine ----- */
function BattleEngine(aPlayer, oArea, oTimer){
    this.aPlayer = null;
    this.oArea = null;
    this.oTimer = null;

    this.init(aPlayer, oArea, oTimer);
}

Object.assign(
    BattleEngine.prototype, {
        init: function(aPlayer, oArea, oTimer) {
            this.aPlayer = aPlayer;
            this.oArea = oArea;
            this.oTimer = oTimer;
        },
        update: function(){
            // Gestion Fin de partie
            const oEndGame = this.checkEnd(),
                aEntity = BattleEntity.get().filter( oEntity => oEntity.oCheck && !oEntity.isDead() ),
                oCollapse = {};

            // Gestion PositionBox / Area
            aEntity.forEach( (oEntity, nIndex) => {
                if( oEntity.oCheck.bCollapse ){
                    const oReferent = this.aPlayer[ (oEntity.oParent || oEntity).nPlayer == 1 ? 1 : 0 ];
                    oCollapse[oEntity.sId] = {
                        nIndex,
                        oEntity,
                        nPriority: this.stayInArea(oEntity),
                        nOrientation: this.getOrientation(oEntity, oReferent)
                    };
                }
            } );

            // Gestion Reverse
            aEntity.forEach( (oEntity, nIndex) => {
                if( oEntity.oCheck.bReverse && oEntity.canReverse() && oCollapse[oEntity.sId] ){
                    if( oCollapse[oEntity.sId].nOrientation ){
                        oEntity.bReverse = oCollapse[oEntity.sId].nOrientation == 1;
                    } else {
                        oCollapse[oEntity.sId].nOrientation = oEntity.bReverse ? 1 : 0;
                    }
                }
            } );
            
            // Gestion PositionBox / Entity
            this.moveCollapsed(oCollapse);

            if( !oEndGame.bEnd ){
                // Gestion Hitbox
                this.checkHit(aEntity, oCollapse);
                // Gestion Super Freeze
                this.commandFreeze(aEntity);
            }

            return oEndGame;
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
            // Gestion INVULNERABLE contre COMMAND
            if( oEntityHurt.isInvulnerable(oEntityHit) ){
                bInvul = true;
            }
            else {
                // Gestion COMMAND contre adversaire
                const oData = oEntityHit.getCommandData();
                if( oData && oData.oProperty.sOpponentCheck ){
                    switch( oData.oProperty.sOpponentCheck ){
                        case 'bGround':
                            bInvul = oEntityHurt.bAerial;
                            break;
                        case 'bAerial':
                            bInvul = !oEntityHurt.bAerial;
                            break;
                    }
                }
            }
            return bInvul;
        },
        hasSameParent: function(oEntityA, oEntityB){
            return (oEntityA.oParent || oEntityA).sId == (oEntityB.oParent || oEntityB).sId;
        },

        checkEnd: function(){
            const oEndGame = {
                bEnd: false,
                bTimer: false,
                oPlayerWin: null
            };
                
            if( this.oTimer.isEnd() ){
                oEndGame.bTimer = true;
                if( this.aPlayer[0].nLife != this.aPlayer[1].nLife ){
                    oEndGame.oPlayerWin = this.aPlayer[ this.aPlayer[0].nLife > this.aPlayer[1].nLife ? 0 : 1 ];
                }
            }
            else {
                this.aPlayer.forEach( (oPlayer, nIndex) => {
                    if( oPlayer.nLife <= 0 ){
                        oEndGame.oPlayerWin =  this.aPlayer[ nIndex ? 0 : 1 ];
                    }
                } );
            }
            oEndGame.bEnd = oEndGame.bTimer || oEndGame.oPlayerWin;

            return oEndGame;
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
                        
                        // sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent, bLink
                        case 'projectile':
                        case 'beam':
                        case 'character':
                            oEntity = new window['Battle' + oEffect.sType[0].toUpperCase() + oEffect.sType.slice(1)]( oEffect.sEntity, oEffect.sColor, oEffect.sAnimation, oEffect.oPosition, oEffect.bReverse, oEffect.oCommandData, oEffect.oParent );
                            oEffect.bLink && oEffect.oParent.add(oEntity);
                            oEntity.update();
                            break;

                        // sAnimation, oPosition, bReverse, oParent
                        case 'effect':
                            oEntity = new BattleEffect( oEffect.sAnimation, oEffect.oPosition, oEffect.bReverse, oEffect.oParent );
                            oEntity.update();
                            break;

                        // sText, oPosition, oParent
                        case 'text':
                            oEntity = new BattleText( oEffect.sText, oEffect.nLength, oEffect.oPosition, oEffect.oParent );
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
                if( oEntity.oCheck.bLaunch ){
                    const nDown = this.oArea.oPosition.nY + (oBoxArea.bottom - oBoxArea.originY) - oEntity.oPositionPoint.nGapY;
                    if( nDown < oEntity.oLayer.oPosition.nY /* + ( oBoxEntity.nY + oBoxEntity.nHeight )*/ ){
                        if( oEntity.nLife > 0 ){
                            oEntity.setStance( oEntity.oAnimation.sName == 'launch_1' ? 'launch_2' : 'move_0', true);
                        } else {
                            oEntity.setStance('anim_death', true);
                        }
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
                                    oRight.oEntity.oLayer.oPosition.nX +=
                                        oRight.oEntity.oPositionPoint.nGapX && oRight.oEntity.oPositionPoint.nGapX < nDiff ?
                                            Math.ceil(nDiff / 2) :
                                            nDiff;
                                }
                                // Movement LEFT
                                else {
                                    oLeft.oEntity.oLayer.oPosition.nX -= 
                                        oLeft.oEntity.oPositionPoint.nGapX && oLeft.oEntity.oPositionPoint.nGapX < nDiff ?
                                            Math.ceil(nDiff / 2) :
                                            nDiff;
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
                const oCommandData = oEntityHit.getCommandData();
                if( oEntityHit.oCheck.bHit && oCommandData ){

                    aEntity.forEach( oEntityHurt => {
                        if(
                            !this.hasSameParent(oEntityHit, oEntityHurt)
                            && oEntityHurt.oCheck.oHurt[ oEntityHit.sType ]
                            && oEntityHurt.nLife > 0
                            && oEntityHit.aHit.indexOf(oEntityHurt.sId) == -1
                            && !this.checkInvulnerable(oEntityHit, oEntityHurt)
                        ){
                            let bHit = false;
                            const aHitBox = this.getCollisionBox(oEntityHit, 'aHitBox'),
                                aHurtBox = this.getCollisionBox(oEntityHurt, oCommandData.oProperty.sCollisionBox || 'aHurtBox');

                            if( aHitBox.length && aHurtBox.length ){
                                for( let nHitBox = 0; nHitBox < aHitBox.length; nHitBox++ ){
                                    for( let nHurtBox = 0; nHurtBox < aHurtBox.length; nHurtBox++ ){
                                        if( this.checkCollision(aHitBox[nHitBox], aHurtBox[nHurtBox]) ){
                                            // HURT
                                            aHurt.push( {
                                                oEntityHit,
                                                oEntityHurt,
                                                oCommandData: oCommandData
                                            } );
                                            // PUSHBACK
                                            aPushback.push( {
                                                oPriority: {
                                                    nHit: oCollapse[oEntityHit.sId] ? oCollapse[oEntityHit.sId].nPriority : 2,
                                                    nHurt: oCollapse[oEntityHurt.sId] ? oCollapse[oEntityHurt.sId].nPriority : 0
                                                },
                                                oEntityHit,
                                                oEntityHurt,
                                                oCommandData: oCommandData,
                                                sType: null
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
                aHurt.forEach( (oHurt, nIndex) => {
                    const bGuard = oHurt.oEntityHurt.takeHit(oHurt.oEntityHit, oHurt.oCommandData, this);
                    aPushback[nIndex].sType = bGuard ? 'oGuard' : 'oHit';
                } );
                // Gestion Pushback
                this.movePushback(aPushback, oCollapse);
                // Gestion hit freeze
                aEntity.forEach( oEntity => {
                    oEntity.setFreeze(GameSettings.nFreeze);
                } );
            }
        },

        movePushback: function(aPushback, oCollapse){
            aPushback.forEach( oPushback => {
                const oData = oPushback.oCommandData[ oPushback.sType ].oPushback;
                if( oPushback.oPriority.nHit < oPushback.oPriority.nHurt && oData.nX < 0 ){
                    this.pushbackEntity( oPushback.oEntityHit, oData, oPushback.oEntityHit.bReverse, oData.bDivide );
                }
                else {
                    this.pushbackEntity( oPushback.oEntityHurt, oData, !oPushback.oEntityHit.bReverse, false );
                }
            } );
        },
        pushbackEntity: function(oEntity, oData, bReverse, bDivide){
            // PUSHBACK du parent
            const oRootEntity = oEntity.isLinked() ? oEntity.oParent : oEntity;
            if( oRootEntity.oCheck.bPushback ){
                oRootEntity.setPushback(oData, bReverse, bDivide);
            }

            // PUSHBACK des LINKS
            for( let sType in oRootEntity.oLink ){
                oRootEntity.oLink[sType].forEach( oLinkEntity => {
                    if( oLinkEntity.oCheck.bPushback ){
                        oLinkEntity.setPushback(oData, bReverse, bDivide);
                    }
                } );
            }
        },

        commandFreeze: function(aEntity){
            for( let nIndex = 0; nIndex < this.aPlayer.length; nIndex++ ){
                const oPlayer = this.aPlayer[nIndex],
                    oCommandData = oPlayer.getCommandData();

                if( oPlayer.oGatling.needFreeze() ){
                    oCommandData.bFreeze = true;

                    // Freeze
                    aEntity.forEach( oEntity => {
                        oEntity.sId != oPlayer.sId && oEntity.setFreeze(oCommandData.oFreeze.nLength);
                    } );

                    // Texte
                    SceneManager.oCurrent.oInfo.add(
                        oCommandData.oFreeze.bInfo ?
                            {
                                nLength: oCommandData.oFreeze.nLength,
                                sImg: oPlayer.oData.oPath.sFace,
                                sText: oCommandData.oList.sName + '&nbsp;!',
                                sDirection: oPlayer.nPlayer == '1' ? 'left' : 'right',
                            } :
                            {
                                nLength: oCommandData.oFreeze.nLength
                            }
                    );
                    break;
                }
            }
        }
    }
);