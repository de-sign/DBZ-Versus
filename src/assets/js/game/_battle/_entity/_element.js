/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleElement(/*oData, oPosition, bReverse, oParent*/) {
    /* ----- START PROPERTIES ----- */
    this.sId = '';
    this.sType = '';
    this.oDeadTimer = null;
    this.oParent = null;
    
    this.oData = null;
    this.oLayer = null;
    this.oSprite = null;
    this.oAnimation = null;
    this.bReverse = false;

    /* ----- END PROPERTIES ----- */
    this.init.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleElement, {
        /* ----- START SINGLETON ----- */
        /* ----- START PROPERTIES ----- */
        nId: 0,
        oInstance: {},
        oInstanceByConstructor: {},
        oPattern: null,
        /* ----- END PROPERTIES ----- */

        /* ----- START METHODS ----- */
        add: function(oEntity) {
            const sId = 'BE_' + (++this.nId);
            this.oInstanceByConstructor[oEntity.constructor.name] || ( this.oInstanceByConstructor[oEntity.constructor.name] = {} );
            this.oInstance[sId] = this.oInstanceByConstructor[oEntity.constructor.name][sId] = oEntity;
            return sId;
        },
        get: function(sId){
            return sId ? this.oInstance[sId] : Object.values(this.oInstance);
        },
        getByConstructor: function(sConstructor, sId){
            let aResult = [];
            if( this.oInstanceByConstructor[sConstructor] ){
                if( sId ){
                    aResult.push( this.oInstanceByConstructor[sConstructor][sId] );
                } else {
                    aResult = Object.values(this.oInstanceByConstructor[sConstructor]);
                }
            }
            return sId ? aResult[0] : aResult;
        },
        remove: function(oEntity) {
            delete this.oInstance[oEntity.sId];
            delete this.oInstanceByConstructor[oEntity.constructor.name][oEntity.sId];
            return oEntity;
        },
        init: function(sId){
            this.oPattern = OutputManager.getElement(sId);
            this.oPattern.oParentElement.delete(this.oPattern);
            return this.oPattern;
        },
        getType: function(oEntity){
            return oEntity.constructor.name.substring(6); // 'Battle'.length
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */

        prototype: {
            constructor: BattleElement,
            /* ----- START PROTOTYPE ----- */
            /* ----- START METHODS ----- */
            init: function(oData, sAnimation, oPosition, bReverse, oParent){
                this.sId = BattleElement.add(this);
                this.sType = BattleElement.getType(this);
                
                this.oData = oData;
                this.bReverse = bReverse;
                this.oParent = oParent;

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
                }
                else {
                    // Debut TIMER pour destruction
                    if( this.oAnimation.isEnd() ){
                        this.die();
                    } else {
                        this.updateAnimation();
                    }
                }
            },
            destroy: function(){
                BattleElement.remove(this);
                this.oParent && this.oParent.remove(this);
                this.oLayer.oParentElement.delete(this.oLayer);
            },

            die: function(){
                this.oDeadTimer = new GameTimer();
                this.oDeadTimer.init( GameSettings.nDie );
                this.oLayer.addTickUpdate( () => {
                    this.oLayer.hElement.classList.add('--dead');
                } );
            },
            isDead: function(){
                return this.oDeadTimer;
            },

            getRootParent: function(){
                return this.oParent ?
                    this.oParent.getRootParent() :
                    this;
            },
            isLinked: function(){
                return this.oParent && this.oParent.hasLink(this);
            },

            createLayer: function(){
                let hLayer = BattleElement.oPattern.hElement.cloneNode(true);
                hLayer.id += this.sId;
                hLayer.classList.add('Battle__' + this.sType);
                hLayer.classList.remove(OutputManager.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += this.sId;
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );
                
                this.oLayer = new OutputManager.OutputLayer(hLayer);
                
                const oArea = OutputManager.getElement('LAY__Battle_Area_Wrapper');
                oArea.add(this.oLayer);
                oArea.update();
           
                this.oLayer.enableAutoPositioning();
                this.oSprite = OutputManager.getElement('SPT__Battle_Entity_Sprite_' + this.sId);

                return this.oLayer;
            },
            moveLayer: function(oPosition){
                const aRatio = this.oParent ? [-1, 1] : [1, -1],
                    oRefPos = this.oParent ? this.oParent.oLayer.oPosition : this.oLayer.oPosition,
                    oPos = {
                        nX: oRefPos.nX,
                        nY: oRefPos.nY
                    };

                if( oPosition.nX ){
                    oPos.nX += oPosition.nX * aRatio[this.bReverse ? 0 : 1];
                }
                if( oPosition.nY ){
                    oPos.nY += oPosition.nY;
                }
            
                this.oLayer.setPosition(oPos);
            },
            render: function(){
                let bRender = false;
                if( !this.isDead() ){
                    bRender = true;
                    this.oLayer.setPosition( { scaleX: this.bReverse ? -1 : 1 } );
                    this.oAnimation.oFrame.nZIndex && this.oLayer.setStyle( { zIndex: this.oAnimation.oFrame.nZIndex } );
                    this.oSprite.setSource( this.oData.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
                }
                return bRender;
            },
            
            setAnimation: function(bForce, sAnimation, bUpdate){
                let bSet = false;
                if( typeof bForce != 'boolean' ){
                    bUpdate = sAnimation;
                    sAnimation = bForce;
                    bForce = false;
                }
                
                const oAnim = this.oData.oAnimations[sAnimation];

                if(
                    bForce
                    || !this.oAnimation
                    || this.oAnimation.sName != sAnimation
                    || ( oAnim.bRepeat && this.oAnimation.isEnd() )
                ){
                    this.oAnimation = new GameAnimation(
                        sAnimation,
                        oAnim.sType,
                        this.oData.oFrames,
                        oAnim.aFrames,
                        oAnim.oData
                    );
                    bUpdate && this.updateAnimation();
                    bSet = true;
                }
                return bSet;
            },
            updateAnimation: function(){
                return this.oAnimation.update();
            },
            setFreeze: function(nFreeze){
                this.oAnimation.setFreeze(nFreeze);
            },
            unFreeze: function(){
                this.oAnimation.unFreeze();
            }
            /* ----- END METHODS ----- */
            /* ----- END PROTOTYPE ----- */
        }
    }
);
/* ----- END CLASS ----- */