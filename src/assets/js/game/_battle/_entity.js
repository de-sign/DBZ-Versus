function BattleEntity(sType, oData, nColor) {
    this.sType = '';
    this.sId = '';

    this.oLayer = null;
    this.oSprite = null;
    this.oData = null;
    this.oColor = null;

    this.oAnimation = null;
    this.oMovement = null;

    this.bReverse = false;
    this.nLife = 0;

    this.init.apply(this, arguments);
}

Object.assign(
    BattleEntity, {

        nId: 0,
        oInstance: {},
        oPattern: null,

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
            init: function(sType, oData, nColor){
                this.sId = GameEntity.add(this);
                this.sType = sType;
                this.nLife = GAME.oSettings.oLife[sType];
                
                this.oData = oData;
                this.oColor = oData.aColor[nColor];

                this.createLayer();
            },
            update: function(){
                this.updateAnimation();
            },
            destroy: function(){
                GameEntity.remove(this);
            },

            createLayer: function(){
                let hLayer = this.oPattern.hElement.cloneNode(true);
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

                this.oLayer.resetPosition();
                this.oLayer.update();
                this.oSprite = this.oLayer.aChildElement[0];

                return this.oLayer;
            },
            render: function(){
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
                this.oSprite.setSource( this.oColor.oColor.oPath.sFrames + '/' + this.oAnimation.oFrame.sPath );
            },
            
            setAnimation: function(sAnimation, bUpdate){
                if( !this.oAnimation || GameAnimation.isTypeHurt(sAnimation) || this.oAnimation.sName != sAnimation ){
                    this.oAnimation = new GameAnimation(
                        sAnimation,
                        this.oData.oFrames,
                        this.oData.oAnimations[sAnimation].aFrames
                    );
                    this.setMovement( this.oData.oAnimations[sAnimation].oMove );
                    bUpdate && this.updateAnimation();
                }
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
            }
        }
    }
);