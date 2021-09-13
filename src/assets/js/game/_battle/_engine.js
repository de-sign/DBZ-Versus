/* ----- BattleEngine ----- */
function BattleEngine(oScene){
    this.aPlayer = null;
    this.oArea = null;
    this.oDisplay = null;

    this.init(oScene);
}

Object.assign(
    BattleEngine.prototype, {
        init: function(oScene) {
            this.aPlayer = oScene.aPlayer;
            this.oArea = oScene.oArea;
            this.oDisplay = oScene.oDisplay;
        },
        update: function(){
            // Entity
            BattleElement.get().forEach( oEntity => oEntity.update(this) );

            // Gestion Fin de partie
            const oEndGame = this.checkEnd(),
                aEntity = BattleEntity.get().filter( oEntity => !oEntity.isDead() ),
                oCollapse = {};

            // Gestion PositionBox / Area
            aEntity.forEach( (oEntity, nIndex) => {
                if( oEntity.oCheck.bCollapse ){
                    const oReferent = this.aPlayer[ oEntity.getRootParent().nPlayer == 1 ? 1 : 0 ];
                    oCollapse[oEntity.sId] = {
                        nIndex,
                        oEntity,
                        nPriority: this.stayInArea(oEntity),
                        nOrientation: this.getOrientation(oEntity, oReferent)
                    };
                }
            } );

            // Gestion Reverse
            this.aPlayer.forEach( oPlayer => {
                if( oPlayer.oStatus.bReverse && oCollapse[oPlayer.sId] ){
                    if( oCollapse[oPlayer.sId].nOrientation ){
                        oPlayer.bReverse = oCollapse[oPlayer.sId].nOrientation == 1;
                    } else {
                        oCollapse[oPlayer.sId].nOrientation = oPlayer.bReverse ? 1 : 0;
                    }
                }
            } );
            
            // Gestion PositionBox / Entity
            this.moveCollapsed(oCollapse);

            if( !oEndGame.bEnd ){
                // Gestion Hitbox
                this.checkHit(aEntity, oCollapse);
            }

            return oEndGame;
        },
        destroy: function(){},
        
        getCollisionBox: function(oEntity, sBox){
            if( sBox == 'oPositionBox' ){
                oEntity = oEntity.getRootParent();
            }

            const aBox = oEntity.getBox(sBox);
            aBox.length && aBox.forEach( oBox => {
                oBox.nX += oEntity.oLayer.oPosition.nX;
                oBox.nY += oEntity.oLayer.oPosition.nY;
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
            return oEntityA.getRootParent().sId == oEntityB.getRootParent().sId;
        },

        checkEnd: function(){
            const oEndGame = {
                bEnd: false,
                bTimer: false,
                oPlayerWin: null
            };
                
            if( this.oDisplay.oModule.oTimer.isEnd() ){
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
                        case 'Sound':
                            OutputManager.getChannel('CHN__SFX').play(oEffect.sEntity);
                            break;
                        
                        // sEntity, sColor, sAnimation, oPosition, bReverse, oCommandData, oParent, bLink
                        case 'Projectile':
                        case 'Beam':
                        case 'Character':
                            oEntity = new window['Battle' + oEffect.sType](
                                oEffect.sEntity,
                                oEffect.sColor,
                                oEffect.sAnimation,
                                oEffect.oPosition,
                                oEffect.bReverse,
                                oEffect.oParent,
                                oEffect.oCommandData
                            );
                            oEffect.oParent.add(oEntity, oEffect.bLink ? oEffect.oPosition : null);
                            break;

                        // sAnimation, oPosition, bReverse, oParent
                        case 'Effect':
                            oEntity = new BattleEffect( null, oEffect.sAnimation, oEffect.oPosition, oEffect.bReverse, oEffect.oParent );
                            break;

                        // sText, oPosition, oParent
                        case 'Text':
                            oEntity = new BattleText( oEffect.sText, oEffect.nLength, oEffect.oPosition, oEffect.oParent );
                            break;
                    }
                    
                    if(oEntity){
                        oEntity.update();
                        aEntity.push(oEntity);
                    }
                } );
            }
            return aEntity;
        },
        
        // ENTITY dans AREA : LEFT, RIGHT et DOWN
        stayInArea: function(oEntity){
            // Check
            const oParent = oEntity.getRootParent(),
                oDelta = oParent.oLink[oEntity.sId] ?
                    oParent.oLink[oEntity.sId].oPosition :
                    { nX: 0, nY: 0 };
            let oBoxEntity = oParent.getBox('oPositionBox')[0],
                sMove = null,
                nPriority = oEntity.oAnimation.sType == 'action' ?
                    2 :
                    (
                        oEntity.canBeMoved() ?
                            0 :
                            1
                    );

            if( oBoxEntity ){
                
                const nLeft = this.oArea.oPosition.nX - this.oArea.oPosition.originX,
                    nRight = this.oArea.oPosition.nX + this.oArea.oPosition.width - this.oArea.oPosition.originX;

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
                        oEntity.oLayer.setPosition( {
                            nX: nLeft - oBoxEntity.nX + oDelta.nX
                        } );
                        break;
                    case 'right':
                        oEntity.oLayer.setPosition( {
                            nX: nRight - ( oBoxEntity.nX + oBoxEntity.nWidth ) + oDelta.nX
                        } );
                        break;
                }

                // Trop en bas
                if( oEntity.oCheck.bLaunch ){
                    const nDown = this.oArea.oPosition.nY + (this.oArea.oPosition.height - this.oArea.oPosition.originY) - oEntity.oPositionPoint.nGapY;
                    if( nDown < oEntity.oLayer.oPosition.nY ){
                        oEntity.oStatus && ( oEntity.oStatus.bAerial = false );
                        if( oEntity.nLife > 0 ){
                            oEntity.setStance( oEntity.oDamage.takeDamage() ? 'launch_2' : 'move_0', true);
                        } else {
                            oEntity.setStance('anim_death', true);
                        }
                        oBoxEntity = oEntity.getBox('oPositionBox')[0];
                        oEntity.oLayer.setPosition( {
                            nY: nDown - ( oBoxEntity.nY + oBoxEntity.nHeight ) + oDelta.nY
                        } );
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
                        
                        if(
                            !(
                                oCheck[sCheck]
                                || this.hasSameParent(oCollapseA.oEntity, oCollapseB.oEntity)
                                || oCollapseA.oEntity.isState('Through')
                                || oCollapseB.oEntity.isState('Through')
                            )
                        ){

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
                                    nLeft = oLeft.oEntity.oLayer.oPosition.nX + oBoxRight.nX;
                                let nDiff = Math.min(nRight - nLeft, oRight.oEntity.oPositionPoint.nGapX || Infinity),
                                    nDemiDiff = Math.ceil(nDiff / 2);

                                // Separation Egal
                                if( oLeft.nPriority == oRight.nPriority ){
                                    oLeft.oEntity.oLayer.setPosition( {
                                        nX: oLeft.oEntity.oLayer.oPosition.nX - nDemiDiff
                                    } );
                                    oRight.oEntity.oLayer.setPosition( {
                                        nX: oRight.oEntity.oLayer.oPosition.nX + nDemiDiff
                                    } );
                                }
                                // Movement RIGHT
                                else if( oLeft.nPriority > oRight.nPriority ) {
                                    oRight.oEntity.oLayer.setPosition( {
                                        nX: oRight.oEntity.oLayer.oPosition.nX + nDiff
                                    } );
                                }
                                // Movement LEFT
                                else {
                                    oLeft.oEntity.oLayer.setPosition( {
                                        nX: oLeft.oEntity.oLayer.oPosition.nX - nDiff
                                    } );
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
                if( oCommandData ){

                    aEntity.forEach( oEntityHurt => {
                        if(
                            !this.hasSameParent(oEntityHit, oEntityHurt)
                            && oEntityHurt.nLife > 0
                            && oEntityHurt.oCheck.oHurt[ oEntityHit.sType ]
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
                                                oCommandData: oCommandData,
                                                oPriority: {
                                                    nHit: oCollapse[oEntityHit.sId] ? oCollapse[oEntityHit.sId].nPriority : 2,
                                                    nHurt: oCollapse[oEntityHurt.sId] ? oCollapse[oEntityHurt.sId].nPriority : 0
                                                },
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
                let bCounter = false;
                aHurt.forEach( (oHurt, nIndex) => {
                    // Gestion Hurt
                    const oHit = oHurt.oEntityHurt.takeHit(oHurt.oEntityHit, oHurt.oCommandData, this),
                        oPushback = oHurt.oCommandData[ oHit.bGuard ? 'oGuard' : 'oHit' ].oPushback;

                    // Gestion Pushback
                    if( oPushback && !oPushback.bEmpty ){
                        if( oHurt.oPriority.nHit < oHurt.oPriority.nHurt && oPushback.oDirection.nX <= 0 ){
                            this.pushbackEntity( oHurt.oEntityHit, oPushback, oHurt.oEntityHit.bReverse, oPushback.bDivide );
                        } else {
                            this.pushbackEntity( oHurt.oEntityHurt, oPushback, !oHurt.oEntityHit.bReverse, false );
                        }
                    }

                    // Gestion counter
                    if( oHit.bCounter ){
                        bCounter = true;
                        // Effect
                        this.oDisplay.addEffect.apply(
                            this.oDisplay,
                            GameSettings.oCounter.aEffect
                        );
                        // Text
                        this.oDisplay.showText.apply(
                            this.oDisplay,
                            GameSettings.oCounter.aText.map( oText => {
                                oText.sDirection = oHurt.oEntityHit.nPlayer == '1' ? 'left' : 'right';
                                return oText;
                            } )
                        );
                    }
                } );
                
                // Gestion hit freeze
                this.oDisplay.addEffect( {
                    sType: 'freeze',
                    nLength: bCounter ? GameSettings.oCounter.nFreeze : GameSettings.nFreeze
                } );
            }
        },

        pushbackEntity: function(oEntity, oData, bReverse, bDivide){
            // PUSHBACK du parent
            const oRootEntity = oEntity.isLinked() ? oEntity.getRootParent() : oEntity;
            oRootEntity.setPushback(oData, bReverse, bDivide);
        }
    }
);