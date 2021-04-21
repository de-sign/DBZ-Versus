function BattleEntity(sType, oData, oPosition, bReverse, oParent) {
    this.sType = '';
    this.sId = '';
    this.oParent = null;
    this.oLink = {
        beam: [],
        character: [],
        projectile: []
    };
    this.oCheck = null;
    this.oPositionPoint = null;

    this.oLayer = null;
    this.oSprite = null;
    this.oData = null;
    
    this.oHitData = null;
    this.oDeadTimer = null;
    this.oAnimation = null;
    this.oMovement = null;

    this.bReverse = false;
    this.nLife = 0;
    this.bHit = false;

    this.init.apply(this, arguments);
}

Object.assign(
    BattleEntity, {

        nId: 0,
        oInstance: {},
        oPattern: null,
        oCheck: {
            character: {
                bCollapse: true,
                bReverse: true,
                bHit: true,
                oHurt: {
                    character: true,
                    projectile: true,
                    beam: true
                },
                bLunch: true,
                bPushback: true
            },
            projectile: {
                bHit: true,
                oHurt: {
                    projectile: true,
                    beam: true
                }
            },
            beam: {
                bCollapse: true,
                bHit: true,
                oHurt: {},
                bPushback: true
            }
        },

        add: function(oEntity) {
            const sId = 'BE_' + (++this.nId);
            this.oInstance[sId] = oEntity;
            return sId;
        },
        get: function(sId){
            return sId ? this.oInstance[sId] : Object.values(this.oInstance);
        },
        remove: function(oEntity) {
            delete this.oInstance[oEntity.sId];
            return oEntity;
        },
        init: function(sId){
            this.oPattern = GAME.oOutput.getElement(sId);
            this.oPattern.oParentElement.delete( this.oPattern);
            return this.oPattern;
        },

        prototype: {
            constructor: BattleEntity,
            init: function(sType, oData, oPosition, bReverse, oParent){
                this.sId = BattleEntity.add(this);
                this.sType = sType;
                this.oCheck = BattleEntity.oCheck[sType];
                this.oPositionPoint = GAME.oSettings.oPositionPoint[sType];
                
                this.oData = oData;
                this.bReverse = bReverse;
                this.oParent = oParent;

                this.nLife = GAME.oSettings.oLife[sType];
                this.createLayer();
                this.moveLayer(oPosition || {});
            },
            update: function(){
                // Destruction après 1s pour prévention du ROLLBACK
                if( this.isDead() ) {
                    this.oDeadTimer.update();
                    if( this.oDeadTimer.isEnd() ){
                        this.destroy();
                    }
                } else {
                    // Debut TIMER pour destruction
                    if( this.oAnimation.isEnd() ){
                        this.die();
                    } else {
                        this.updateAnimation();
                    }
                }
            },
            destroy: function(){
                BattleEntity.remove(this);
                this.oParent && this.oParent.remove(this);
                this.oLayer.oParentElement.delete(this.oLayer);
            },

            add: function(oEntity){
                this.oLink[oEntity.sType].push(oEntity);
            },
            remove: function(oEntity){
                const nIndex = this.oLink[oEntity.sType].indexOf(oEntity);
                if( nIndex != -1 ){
                    this.oLink[oEntity.sType].splice(nIndex, 1);
                }
            },
            killLink: function(){
                for( let sType in this.oLink ){
                    this.oLink[sType].splice(0).forEach( oLinkEntity => oLinkEntity.die() );
                }
            },
            isLinked: function(){
                return this.oParent && this.oParent.oLink[this.sType].indexOf(this) != -1;
            },
            die: function(){
                this.oDeadTimer = new GameTimer();
                this.oDeadTimer.init( GAME.oSettings.nDie );
                this.oLayer.addTickUpdate( () => {
                    this.oLayer.hElement.classList.add('--dead');
                } );
            },

            createLayer: function(){
                let hLayer = BattleEntity.oPattern.hElement.cloneNode(true);
                hLayer.id += this.sId;
                hLayer.classList.add('Battle__' + this.sType[0].toUpperCase() + this.sType.slice(1));
                hLayer.classList.remove(GAME.oOutput.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += this.sId;
                        hElement.classList.remove('--change', GAME.oOutput.oConfig.class.created);
                    }
                );
                
                this.oLayer = new GAME.oOutput.OutputLayer(hLayer);
                
                const oArea = GAME.oOutput.getElement('LAY__Battle_Area');
                oArea.add(this.oLayer);
                oArea.update();
           
                this.oLayer.enableAutoPositioning();
                this.oSprite = GAME.oOutput.getElement('SPT__Battle_Entity_Sprite_' + this.sId);

                return this.oLayer;
            },
            moveLayer: function(oPosition){
                const oPos = Object.assign({}, this.oParent ? this.oParent.oLayer.oPosition : this.oLayer.oPosition );
                if( this.oParent ){
                    if( oPosition.nX ){
                        oPos.nX += oPosition.nX * (this.bReverse ? -1 : 1);
                    }
                    if( oPosition.nY ){
                        oPos.nY += oPosition.nY;
                    }
                } else {
                    if( oPosition.nX ){
                        oPos.nX += oPosition.nX * (this.bReverse ? 1 : -1);
                    }
                    if( oPosition.nY ){
                        oPos.nY += oPosition.nY;
                    }
                }
                this.oLayer.setPosition(oPos);
            },
            render: function(){
                if( !this.isDead() ){
                    // Reverse
                    this.oLayer.hElement.classList[ this.bReverse ? 'add' : 'remove' ]('--reverse');
                    
                    // Animation Freeze en HURT
                    if( this.oAnimation.isHurt() ){
                        if( this.oAnimation.oFrame.bFreeze ){
                            this.oLayer.hElement.classList.remove(this.oAnimation.nFreeze % 2 ? '--freeze_impair' : '--freeze_pair');
                            this.oLayer.hElement.classList.add(this.oAnimation.nFreeze % 2 ? '--freeze_pair' : '--freeze_impair');
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
                    this.oSprite.setSource( this.oData.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                }
            },
            
            takeHit: function(oEntity, oData){
                this.nLife -= oData.nDamage == null ? 1 : oData.nDamage;
                oEntity.confirmHit(oData);
            },
            setAnimation: function(sAnimation, bUpdate){
                let sSet = false;
                if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                    this.oAnimation = new GameAnimation(
                        sAnimation,
                        this.oData.oFrames,
                        this.oData.oAnimations[sAnimation].aFrames
                    );
                    this.setMovement( this.oData.oAnimations[sAnimation].oMove );
                    bUpdate && this.updateAnimation();
                    this.bHit = false;
                    sSet = true;
                }
                return sSet;
            },
            setMovement: function(oMove){
                this.oMovement = oMove ?
                    new BattleMovement(oMove.nDelay, oMove, oMove.nLength) :
                    BattleMovement.empty();
            },
            setFreeze: function(nFreeze){
                this.oAnimation.setFreeze(nFreeze);
                this.oMovement.setFreeze(nFreeze);
            },
            unFreeze: function(){
                this.oAnimation.unFreeze();
                this.oMovement.unFreeze();
            },

            getBox: function(sBox){
                let aBox = this.oAnimation.oFrame[sBox];
                if( aBox ){
                    Array.isArray(aBox) || ( aBox = [aBox] );
                    aBox = aBox.map( oBox => {
                        return Object.assign(
                            {},
                            oBox,
                            this.bReverse ? { nX: -(oBox.nWidth + oBox.nX - 4) } : {}
                        );
                    } );
                } else {
                    aBox = [];
                }
                return aBox;
            },
            getHitData: function(){
                return this.oHitData;
            },

            isDead: function(){
                return this.oDeadTimer;
            },
            canMove: function(){
                return this.oCheck.bCollapse && this.oCheck.bReverse;
            },

            updateAnimation: function(){
                this.oAnimation.update();
                this.oMovement.update();
                this.move();
            },
            move: function(){
                if( this.oMovement.oMove ){
                    if( this.oMovement.oMove.nX ){
                        this.oLayer.oPosition.nX += this.oMovement.oMove.nX * (this.bReverse ? -1 : 1);
                    }
                    if( this.oMovement.oMove.nY ){
                        this.oLayer.oPosition.nY += this.oMovement.oMove.nY;
                    }
                }
            },
            confirmHit: function(oData, bGuard){
                this.bHit = true;
                this.oParent && this.oParent.confirmHit(oData, bGuard);
            },
            pushBack: function(oPushback, bDivide){
                oPushback = Object.assign({}, oPushback || GAME.oSettings.oPushback);
                bDivide && (oPushback.nX /= 2);
                this.setMovement(oPushback);
            }
        }
    }
);

/* ----- BattleProjectile ----- */
function BattleProjectile(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleProjectile, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
                    BattleEntity.prototype.init.call(this, 'projectile', GAME.oData.oProjectile[sEntity][sColor], oPosition, bReverse, oParent);
                    this.bReverse = bReverse;
                    this.oHitData = oHitData;

                    this.setAnimation(sAnimation);
                },
                /*
                update: function(){},
                destroy: function(){}
                */
                takeHit: function(oEntity, oData){
                    if( oEntity ){
                        const nDamageEntity = oData.nDamage == null ? 1 : oData.nDamage,
                            nDamageSelf = this.oHitData.nDamage == null ? 1 : this.oHitData.nDamage;
                        if( nDamageEntity >= nDamageSelf ){
                            this.nLife -= nDamageEntity;
                            this.setAnimation(this.oHitData.oStun.sHitAnimation, true);
                        }
                    }
                    // Auto destruction après avoir HIT
                    else {
                        this.setAnimation(this.oHitData.oStun.sHitAnimation, true);
                    }
                },
                confirmHit: function(oData, bGuard){
                    BattleEntity.prototype.confirmHit.call(this, oData, bGuard);
                    this.nLife -= GAME.oSettings.oLife[this.sType];
                    this.takeHit(null, oData);
                }
            }
        )
    }
);

/* ----- BattleBeam ----- */
function BattleBeam(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleBeam, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
                    BattleEntity.prototype.init.call(this, 'beam', GAME.oData.oBeam[sEntity][sColor], oPosition, bReverse, oParent);
                    this.bReverse = bReverse;
                    this.oHitData = oHitData;

                    this.generateAnimation(sAnimation, oPosition);
                    this.setAnimation(sAnimation + '_' + this.sId);
                },
                /*
                update: function(){},
                */
                destroy: function(){
                    delete this.oData.oAnimations[ this.oAnimation.sName ];
                    BattleEntity.prototype.destroy.call(this);
                },
                // Animations UNIQUE afin de ne pas sortir de l'écran en cas de PUSHBACK
                generateAnimation: function(sAnimation, oPosition){
                    const oPositionBox = Object.assign( {}, this.oParent.oAnimation.oFrame.oPositionBox ),
                        oAnim = Object.assign( {}, this.oData.oAnimations[sAnimation], { aFrames: [] } );

                    if( oPosition.nX ){
                        oPositionBox.nX -= oPosition.nX;
                    }
                    if( oPosition.nY ){
                        oPositionBox.nY -= oPosition.nY;
                    }

                    this.oData.oAnimations[sAnimation].aFrames.forEach( oFrame => {
                        oAnim.aFrames.push( Object.assign( {}, oFrame, { oPositionBox } ) );
                    } );
                    this.oData.oAnimations[ sAnimation + '_' + this.sId ] = oAnim;
                }
            }
        )
    }
);

/* ----- BattleCharacter ----- */
function BattleCharacter(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
    this.bCustomAnimation = false;
    BattleEntity.apply(this, arguments);
}

Object.assign(
    BattleCharacter, {
        prototype: Object.assign(
            Object.create(BattleEntity.prototype), {
                constructor: BattleEntity,
                init: function(sEntity, sColor, sAnimation, oPosition, bReverse, oHitData, oParent){
                    BattleEntity.prototype.init.call(this, 'character', GAME.oData.oCharacter[sEntity][sColor], oPosition, bReverse, oParent);
                    this.bReverse = bReverse;
                    this.oHitData = oHitData;

                    this.bCustomAnimation = this.generateAnimation(sAnimation, oPosition);
                    this.setAnimation(sAnimation + ( this.bCustomAnimation ? '_' + this.sId : '' ) );
                },
                /*
                update: function(){},
                */
                destroy: function(){
                    if( this.bCustomAnimation ){
                        delete this.oData.oAnimations[ this.oAnimation.sName ];
                    }
                    BattleEntity.prototype.destroy.call(this);
                },
                // Animations UNIQUE afin de ne pas sortir de l'écran en cas de PUSHBACK
                generateAnimation: function(sAnimation, oPosition){
                    let bGenerate = false;
                    const oPositionBox = Object.assign( {}, this.oParent.oAnimation.oFrame.oPositionBox ),
                        oAnim = Object.assign( {}, this.oData.oAnimations[sAnimation], { aFrames: [] } );

                    if( oPosition.nX ){
                        oPositionBox.nX -= oPosition.nX;
                    }
                    if( oPosition.nY ){
                        oPositionBox.nY -= oPosition.nY;
                    }

                    this.oData.oAnimations[sAnimation].aFrames.forEach( oFrame => {
                        if( !oFrame.oPositionBox ){
                            oAnim.aFrames.push( Object.assign( {}, oFrame, { oPositionBox } ) );
                            bGenerate = true;
                        }
                    } );

                    if( bGenerate ){
                        this.oData.oAnimations[ sAnimation + '_' + this.sId ] = oAnim;
                    }

                    return bGenerate;
                }
            }
        )
    }
);