function BattleEntity(/*sType, oData, oPosition, bReverse, oParent*/) {
    this.sType = '';
    this.sId = '';
    this.oParent = null;
    this.oLink = {
        beam: [],
        character: [],
        projectile: [],
        effect: [],
        text: []
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

    this.oStatus = {
        bReverse: false, // Possibilité de se retourner : stand, tp, etc
        bGuard: false, // Possibilité de guarder : backdash, block
        bThrow: false, // Possibilité de TechThrow : hit_throw
        bInvul: false, // Impossibilité de prendre un coup : launch
        bAerialInvul: false, // Impossibilité de prendre un coup aérien : launcher
        bCancel: false, // Coup cancellable : ligth, etc
        bAerial: false, // Personnage en l'air : jump, launch, fall, etc
        bLaunch: false // Personnage en l'air via un coup : launch
    };
    this.bReverse = false;
    this.nLife = 0;
    this.aHit = [];

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
                bLaunch: true,
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
            this.oPattern = OutputManager.getElement(sId);
            this.oPattern.oParentElement.delete(this.oPattern);
            return this.oPattern;
        },

        prototype: {
            constructor: BattleEntity,
            init: function(sType, oData, sAnimation, oPosition, bReverse, oParent){
                this.sId = BattleEntity.add(this);
                this.sType = sType;
                this.oCheck = BattleEntity.oCheck[sType];
                this.oPositionPoint = GameSettings.oPositionPoint[sType];
                
                this.oData = oData;
                this.bReverse = bReverse;
                this.oParent = oParent;

                this.nLife = GameSettings.oLife[sType];
                this.createLayer();
                this.moveLayer(oPosition || {});

                sAnimation && this.setAnimation(sAnimation);
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
                this.oDeadTimer.init( GameSettings.nDie );
                this.oLayer.addTickUpdate( () => {
                    this.oLayer.hElement.classList.add('--dead');
                } );
            },

            createLayer: function(){
                let hLayer = BattleEntity.oPattern.hElement.cloneNode(true);
                hLayer.id += this.sId;
                hLayer.classList.add('Battle__' + this.sType[0].toUpperCase() + this.sType.slice(1));
                hLayer.classList.remove(OutputManager.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += this.sId;
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );
                
                this.oLayer = new OutputManager.OutputLayer(hLayer);
                
                const oArea = OutputManager.getElement('LAY__Battle_Area');
                oArea.add(this.oLayer);
                oArea.update();
           
                this.oLayer.enableAutoPositioning();
                this.oSprite = OutputManager.getElement('SPT__Battle_Entity_Sprite_' + this.sId);

                return this.oLayer;
            },
            moveLayer: function(oPosition){
                const oPos = Object.assign({}, this.oParent ? this.oParent.oLayer.oPosition : this.oLayer.oPosition ),
                    aRatio = this.oParent ? [-1, 1] : [1, -1];

                if( oPosition.nX ){
                    oPos.nX += oPosition.nX * aRatio[this.bReverse ? 0 : 1];
                }
                if( oPosition.nY ){
                    oPos.nY += oPosition.nY;
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
                    
                    // Animation Float en MOVEMENT
                    this.oLayer.hElement.classList.remove('--float_up', '--float_down');
                    if( this.oAnimation.sType == 'movement' ){
                        const nPart = Math.floor((this.oAnimation.nTick % 32) / 8),
                            aClass = [null, '--float_up', null, '--float_down'];
                        aClass[nPart] && this.oLayer.hElement.classList.add( aClass[nPart] );
                    }

                    // Type
                    DOMTokenList.prototype.remove.apply( this.oLayer.hElement.classList, GameAnimation.aAllType.map( sType => '--' + sType ) );
                    this.oLayer.hElement.classList.add('--' + this.oAnimation.sType);
                    this.oLayer.hElement.classList[ this.oStatus.bGuard ? 'add' : 'remove' ]('--guard');
                    
                    // Frame
                    this.oAnimation.oFrame.nZIndex && this.oLayer.setStyle( { zIndex: this.oAnimation.oFrame.nZIndex } );
                    this.oSprite.setSource( this.oData.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                }
            },
            
            takeHit: function(oEntity, oData){
                this.nLife -= oData.nDamage == null ? 1 : oData.nDamage;
                oEntity.confirmHit(this, oData);
            },
            generateEntity: function(sType, oParent, uData, oEngine){
                const aNewEntity = [];

                switch(sType) {
                    case 'hit':
                        if( uData.oStun.sImpactAnimation !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: uData.oStun.sImpactAnimation || 'impact_hit',
                                bReverse: !oParent.bReverse,
                                oParent: oParent
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'text',
                            sText: uData.oStun.sImpactText || 'パフ', // PAF
                            oParent: oParent
                        } );
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Hit'
                        } );
                        break;
                        
                    case 'guard':
                        if( uData.oStun.sImpactAnimation !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: uData.oStun.sImpactAnimation || 'impact_guard',
                                bReverse: !oParent.bReverse,
                                oParent: oParent
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'text',
                            sText: uData.oStun.sImpactText || 'バム', // BAM
                            oParent: oParent
                        } );
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Guard'
                        } );
                        break;
                        
                    case 'command':
                        if( uData.length ){
                            uData.forEach( oCommandEntity => {
                                aNewEntity.push( {
                                    sType: oCommandEntity.sType,
                                    bLink: oCommandEntity.bLink,

                                    sEntity: oCommandEntity.sEntity || 'ALL',
                                    sColor: oCommandEntity.sColor || oParent.oData.sEntityColor,
                                    sAnimation: oCommandEntity.sAnimation,
                                    oPosition: oCommandEntity.oPosition,
                                    bReverse: oParent.bReverse,
                                    oHitData: oParent.oGatling.oCurrent,
                                    oParent: oParent
                                } );

                                oCommandEntity.sText && aNewEntity.push( {
                                    sType: 'text',
                                    sText: oCommandEntity.sText,
                                    oParent: oParent
                                } );

                                oCommandEntity.sSFX && aNewEntity.push( {
                                    sType: 'sound',
                                    sEntity: oCommandEntity.sSFX
                                } );
                            } );
                        }
                        break;
                }
                
                aNewEntity.length && oEngine.generateEntity(aNewEntity);
            },
            setAnimation: function(sAnimation, bUpdate, bReverse){
                let sSet = false;
                if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                    this.killLink();
                    this.oAnimation = new GameAnimation(
                        sAnimation,
                        this.oData.oFrames,
                        this.oData.oAnimations[sAnimation].aFrames
                    );
                    this.setMovement(
                        this.oData.oAnimations[sAnimation].oMove,
                        bReverse == null ?
                            this.bReverse :
                            bReverse
                    );
                    bUpdate && this.updateAnimation();
                    this.aHit = [];
                    sSet = true;
                }
                return sSet;
            },
            setMovement: function(oMove, bReverse){
                this.oMovement = oMove ?
                    new BattleMovement(oMove.nDelay, oMove, oMove.nLength, bReverse) :
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
                let aBox = this.oAnimation && this.oAnimation.oFrame[sBox];
                if( aBox ){
                    Array.isArray(aBox) || ( aBox = [aBox] );
                    aBox = aBox.map( oBox => {
                        return Object.assign(
                            {},
                            oBox,
                            this.bReverse ? { nX: -(oBox.nWidth + oBox.nX - 4) } : {}
                        );
                    } );
                }
                return aBox || [];
            },
            getHitData: function(){
                return this.oHitData;
            },
            isInvulnerable: function(){
                return this.oStatus.bInvul || !this.oAnimation.oFrame.aHurtBox;
            },

            isDead: function(){
                return this.oDeadTimer;
            },
            canMove: function(){
                return this.oCheck.bCollapse && this.oCheck.bReverse;
            },
            canReverse: function(){
                return this.oStatus.bReverse;
            },

            updateStatus: function(oForce){
                this.oStatus = Object.assign(
                    {
                        bReverse: false, // Possibilité de se retourner : stand, tp, etc
                        bGuard: false, // Possibilité de guarder : backdash, block
                        bThrow: false, // Possibilité de TechThrow : hit_throw
                        bInvul: false, // Impossibilité de prendre un coup : launch
                        bAerialInvul: false, // Impossibilité de prendre un coup aérien : launcher
                        bCancel: false, // Coup cancellable : ligth, etc
                        bAerial: this.oStatus.bAerial, // Personnage en l'air : jump, launch, fall, etc
                        bLaunch: this.oStatus.bLaunch // Personnage en l'air via un coup : launch
                    },
                    this.oAnimation.oFrame.oStatus,
                    oForce || {}
                );
            },
            updateAnimation: function(){
                this.oAnimation.update();
                this.oMovement.update();
                this.updateStatus();
                this.move();
            },
            move: function(){
                if( this.oMovement.oMove ){
                    if( this.oMovement.oMove.nX ){
                        this.oLayer.oPosition.nX += this.oMovement.oMove.nX * (this.oMovement.bReverse ? -1 : 1);
                    }
                    if( this.oMovement.oMove.nY ){
                        this.oLayer.oPosition.nY += this.oMovement.oMove.nY;
                    }
                }
            },
            confirmHit: function(oEntityHurt, oData, bGuard){
                this.aHit.push(oEntityHurt.sId);
                this.oParent && this.oParent.confirmHit(oEntityHurt, oData, bGuard);
            },
            pushBack: function(oPushback, bReverse, bDivide){
                oPushback = Object.assign({}, oPushback);
                bDivide && (oPushback.nX /= 2);
                this.setMovement(oPushback, bReverse);
            }
        }
    }
);