/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleEntity(/*oData, oPosition, bReverse, oParent, oCommandData*/) {
    /* ----- START PROPERTIES ----- */
    this.aLink = [];
    this.oCheck = null;
    this.oPositionPoint = null;
    this.oCommandData = null;

    this.oMovement = BattleMovement.empty();
    this.oPushback = BattleMovement.empty();

    this.nLife = 0;
    this.aHit = [];

    /* ----- END PROPERTIES ----- */
    this.init.apply(this, arguments);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    BattleEntity, {
        /* ----- START SINGLETON ----- */
        /* ----- START METHODS ----- */
        get: function(sId){
            const aResult = [];
            ['Beam', 'Projectile', 'Character', 'Player']
                .forEach( sConstructor => {
                    const aConstructorResult = BattleElement.getByConstructor( 'Battle' + sConstructor, sId );
                    aConstructorResult && [].push.apply(aResult, aConstructorResult);
                } );
            return sId ? aResult[0] : aResult;
        },
        /* ----- END METHODS ----- */
        /* ----- END SINGLETON ----- */

        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(BattleElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: BattleEntity,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(oData, sAnimation, oPosition, bReverse, oParent, oCommandData){
                    BattleElement.prototype.init.call(
                        this,
                        oData,
                        sAnimation,
                        oPosition || {},
                        bReverse,
                        oParent
                    );

                    const oSettings = GameSettings.oBattleElement[this.sType];
                    this.oCommandData = oCommandData;
                    this.oCheck = oSettings.oCheck;
                    this.oPositionPoint = oSettings.oPositionPoint;
                    this.nLife = oData.nLife || oSettings.nLife;
                },
                /*
                update: function(){ },
                destroy: function(){ },
                */

                getCommandData: function(){
                    return this.oCommandData;
                },
                canMove: function(){
                    return this.oCheck.bCollapse && this.oCheck.bReverse;
                },
                canReverse: function(){
                    return false;
                },

                add: function(oEntity){
                    this.aLink.push(oEntity);
                },
                remove: function(oEntity){
                    const nIndex = this.aLink.indexOf(oEntity);
                    if( nIndex != -1 ){
                        this.aLink.splice(nIndex, 1);
                    }
                },
                hasLink: function(oLinkEntity){
                    return this.aLink.indexOf(oLinkEntity) != -1;
                },
                killLink: function(){
                    this.aLink.forEach( oLinkEntity => oLinkEntity.die() );
                    this.aLink = [];
                },
                generateEntity: function(sType, uData, oEngine){
                    const aNewEntity = [];

                    switch(sType) {
                        case 'hit':
                            if( uData.sImpact !== false ){
                                aNewEntity.push( {
                                    sType: 'Effect',
                                    sAnimation: uData.sImpact || 'impact_hit',
                                    bReverse: !this.bReverse,
                                    oParent: this
                                }, {
                                    sType: 'Text',
                                    sText: uData.sText || 'パフ', // PAF
                                    oParent: this
                                } );
                            }
                            aNewEntity.push( {
                                sType: 'Sound',
                                sEntity: 'ADO__Hit'
                            } );
                            break;
                            
                        case 'guard':
                            if( uData.sImpact !== false ){
                                aNewEntity.push( {
                                    sType: 'Effect',
                                    sAnimation: uData.sImpact || 'impact_guard',
                                    bReverse: !this.bReverse,
                                    oParent: this
                                }, {
                                    sType: 'Text',
                                    sText: uData.sText || 'バム', // BAM
                                    oParent: this
                                } );
                            }
                            aNewEntity.push( {
                                sType: 'Sound',
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
                                        oCommandData: this.getCommandData(),
                                        oParent: this,
                                        // Entity Sprite
                                        sEntity: oCommandEntity.sEntity || 'ALL',
                                        sColor: oCommandEntity.sColor || this.oData.sEntityColor,
                                        sAnimation: oCommandEntity.sAnimation,
                                        bReverse: oCommandEntity.bReverse == null ?
                                            this.bReverse :
                                            oCommandEntity.bReverse,
                                        // Entity Text
                                        sText: oCommandEntity.sText,
                                        nLength: oCommandEntity.nLength
                                    } );

                                    oCommandEntity.sSFX && aNewEntity.push( {
                                        sType: 'Sound',
                                        sEntity: oCommandEntity.sSFX
                                    } );
                                } );
                            }
                            break;
                    }
                    
                    aNewEntity.length && oEngine.generateEntity(aNewEntity);
                },

                setAnimation: function(bForce, sAnimation, bUpdate, bReverse){
                    let bSet = false;
                    if( typeof bForce != 'boolean' ){
                        bReverse = bUpdate;
                        bUpdate = sAnimation;
                        sAnimation = bForce;
                        bForce = false;
                    }

                    if( BattleElement.prototype.setAnimation.call(this, bForce, sAnimation, bUpdate) ){
                        const oAnim = this.oData.oAnimations[sAnimation];
                        this.killLink();
                        this.setMovement(
                            oAnim.oMove,
                            bReverse == null ?
                                this.bReverse :
                                bReverse
                        );
                        this.aHit = [];
                        bSet = true;
                    }
                    return bSet;
                },
                updateAnimation: function(){
                    BattleElement.prototype.updateAnimation.call(this);
                    ['oMovement', 'oPushback'].forEach( sProp => this[sProp].update() );
                    this.move();
                },

                setMovement: function(oMove, bReverse){
                    this.oMovement = oMove ?
                        new BattleMovement(oMove.nDelay, oMove, oMove.nLength, bReverse) :
                        BattleMovement.empty();
                },
                setPushback: function(oPushback, bReverse, bDivide){
                    if( this.oCheck.bPushback ){
                        const oNewPushback = Object.assign({}, oPushback);
                        bDivide && (oNewPushback.nX /= 2);
                        this.oPushback = new BattleMovement(oNewPushback.nDelay, oNewPushback, oNewPushback.nLength, bReverse);
                    }
                    this.aLink.forEach( oLinkEntity => oLinkEntity.setPushback(oPushback, bReverse, bDivide) );
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

                setFreeze: function(nFreeze){
                    BattleElement.prototype.setFreeze.call(this, nFreeze);
                    ['oMovement', 'oPushback'].forEach( sProp => this[sProp].setFreeze(nFreeze) );
                },
                unFreeze: function(){
                    BattleElement.prototype.unFreeze.call(this);
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
                isInvulnerable: function(){
                    return !this.oAnimation.oFrame.aHurtBox;
                },
                
                takeHit: function(oEntity, oCommandData){
                    this.nLife -= oCommandData.oHit.oDamage.nDamage;
                    oEntity.confirmHit(this, oCommandData, bGuard);
                    return bGuard;
                },
                confirmHit: function(oEntityHurt, oCommandData, bGuard){
                    this.aHit.push(oEntityHurt.sId);
                    this.oParent && this.oParent.confirmHit(oEntityHurt, oCommandData, bGuard);
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */