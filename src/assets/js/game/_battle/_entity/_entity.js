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
    
    this.oCommandData = null;
    this.oDeadTimer = null;
    this.oAnimation = null;
    this.oMovement = BattleMovement.empty();
    this.oPushback = BattleMovement.empty();

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

                this.nLife = (oData && oData.nLife) || GameSettings.oLife[sType];
                this.createLayer();
                this.moveLayer(oPosition || {});

                sAnimation && this.setAnimation(sAnimation);
            },
            update: function(){
                // Destruction après n Frames pour prévention du ROLLBACK
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

                    const oClass = {
                        // Reverse
                        reverse: this.bReverse,
                        // Freeze
                        freeze_pair: false,
                        freeze_impair: false,
                        // Float
                        float_up: false,
                        float_down: false
                    };
                    
                    // Animation Freeze en HURT
                    if( this.oAnimation.is('hurt') && this.oAnimation.oFrame.bFreeze ){
                        oClass[this.oAnimation.nFreeze % 2 ? 'freeze_pair' : 'freeze_impair'] = true;
                    }
                    
                    // Animation Float en MOVEMENT
                    if( this.oAnimation.sType == 'movement' ){
                        const nPart = Math.floor((this.oAnimation.nTick % 32) / 8),
                            aClass = [null, '--float_up', null, '--float_down'];
                        aClass[nPart] && (oClass[ aClass[nPart] ] = true);
                    }

                    // Type
                    GameSettings.oAnimations.oType.aAll.forEach( sType => oClass[sType] = false );
                    oClass[ this.oAnimation.sType ] = true;
                    oClass.guard = this.oStatus.bGuard;

                    for( let sClass in oClass ){
                        this.oLayer.hElement.classList[ oClass[sClass] ? 'add' : 'remove' ]('--' + sClass);
                    }
                    
                    // Frame
                    this.oAnimation.oFrame.nZIndex && this.oLayer.setStyle( { zIndex: this.oAnimation.oFrame.nZIndex } );
                    this.oSprite.setSource( this.oData.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                }
            },
            
            takeHit: function(oEntity, oCommandData, oEngine, bGuard){
                this.nLife -= oCommandData[ bGuard ? 'oGuard' : 'oHit' ].oDamage.nDamage;
                oEntity.confirmHit(this, oCommandData, bGuard);
                return bGuard;
            },
            generateEntity: function(sType, oParent, uData, oEngine){
                const aNewEntity = [];

                switch(sType) {
                    case 'hit':
                        if( uData.sImpact !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: uData.sImpact || 'impact_hit',
                                bReverse: !oParent.bReverse,
                                oParent: oParent
                            }, {
                                sType: 'text',
                                sText: uData.sText || 'パフ', // PAF
                                oParent: oParent
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Hit'
                        } );
                        break;
                        
                    case 'guard':
                        if( uData.sImpact !== false ){
                            aNewEntity.push( {
                                sType: 'effect',
                                sAnimation: uData.sImpact || 'impact_guard',
                                bReverse: !oParent.bReverse,
                                oParent: oParent
                            }, {
                                sType: 'text',
                                sText: uData.sText || 'バム', // BAM
                                oParent: oParent
                            } );
                        }
                        aNewEntity.push( {
                            sType: 'sound',
                            sEntity: 'ADO__Guard'
                        } );
                        break;
                        
                    case 'command':
                        if( uData.length ){
                            uData.forEach( oCommandEntity => {
                                aNewEntity.push( {
                                    // Entity Common
                                    sType: oCommandEntity.sType,
                                    bLink: oCommandEntity.bLink,
                                    oPosition: oCommandEntity.oPosition,
                                    oCommandData: oParent.getCommandData(),
                                    oParent: oParent,
                                    // Entity Sprite
                                    sEntity: oCommandEntity.sEntity || 'ALL',
                                    sColor: oCommandEntity.sColor || oParent.oData.sEntityColor,
                                    sAnimation: oCommandEntity.sAnimation,
                                    bReverse: oCommandEntity.bReverse == null ?
                                        oParent.bReverse :
                                        oCommandEntity.bReverse,
                                    // Entity Text
                                    sText: oCommandEntity.sText,
                                    nLength: oCommandEntity.nLength
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
                let bSet = false;
                if(
                    !this.oAnimation
                    || this.oAnimation.sName != sAnimation
                    || GameAnimation.getCategory( this.oData.oAnimations[sAnimation] ) == 'hurt'
                ){
                    const oAnim = this.oData.oAnimations[sAnimation];
                    this.killLink();
                    this.oAnimation = new GameAnimation(
                        sAnimation,
                        oAnim.sType,
                        this.oData.oFrames,
                        oAnim.aFrames
                    );
                    this.setMovement(
                        oAnim.oMove,
                        bReverse == null ?
                            this.bReverse :
                            bReverse
                    );
                    bUpdate && this.updateAnimation();
                    this.aHit = [];
                    bSet = true;
                }
                return bSet;
            },
            setMovement: function(oMove, bReverse){
                this.oMovement = oMove ?
                    new BattleMovement(oMove.nDelay, oMove, oMove.nLength, bReverse) :
                    BattleMovement.empty();
            },
            setFreeze: function(nFreeze){
                this.oAnimation.setFreeze(nFreeze);
                ['oMovement', 'oPushback'].forEach( sProp => this[sProp].setFreeze(nFreeze) );
            },
            unFreeze: function(){
                this.oAnimation.unFreeze();
                ['oMovement', 'oPushback'].forEach( sProp => this[sProp].unFreeze() );
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
            getCommandData: function(){
                return this.oCommandData;
            },
            isInvulnerable: function(oEntityHit){
                let bInvul = this.oStatus.bInvul || !this.oAnimation.oFrame.aHurtBox;

                if( !bInvul && oEntityHit ){
                    // TODO Faire via oStatus.sInvul avec gestion plus complète : aerial, projectile, beam, phisical, ki, etc
                    // Gestion coups aérien contre ANTI AIR
                    bInvul = this.oStatus.bAerialInvul && oEntityHit.oStatus.bAerial;
                }
                return bInvul;
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
                ['oMovement', 'oPushback'].forEach( sProp => this[sProp].update() );
                this.updateStatus();
                this.move();
            },
            move: function(){
                ['oMovement', 'oPushback'].forEach( sProp => {
                    if( this[sProp].oMove ){
                        if( this[sProp].oMove.nX ){
                            this.oLayer.oPosition.nX += this[sProp].oMove.nX * (this[sProp].bReverse ? -1 : 1);
                        }
                        if( this[sProp].oMove.nY ){
                            this.oLayer.oPosition.nY += this[sProp].oMove.nY;
                        }
                    }
                } );
            },
            confirmHit: function(oEntityHurt, oCommandData, bGuard){
                this.aHit.push(oEntityHurt.sId);
                this.oParent && this.oParent.confirmHit(oEntityHurt, oCommandData, bGuard);
            },
            setPushback: function(oPushback, bReverse, bDivide){
                oPushback = Object.assign({}, oPushback);
                bDivide && (oPushback.nX /= 2);
                this.oPushback = new BattleMovement(oPushback.nDelay, oPushback, oPushback.nLength, bReverse);
            }
        }
    }
);