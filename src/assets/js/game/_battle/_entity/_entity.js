/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function BattleEntity(/*oData, oPosition, bReverse, oParent, oCommandData*/) {
    /* ----- START PROPERTIES ----- */
    this.aLink = [];
    this.oCheck = null;
    this.oPositionPoint = null;
    this.oCommandData = null;

    this.oMovement = new BattleMovementManager();

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
                canBeMoved: function(){
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
                                        bReverse: oCommandEntity.bReverse ?
                                            !this.bReverse :
                                            this.bReverse,
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
                    let oSet = false;
                    if( typeof bForce != 'boolean' ){
                        bReverse = bUpdate;
                        bUpdate = sAnimation;
                        sAnimation = bForce;
                        bForce = false;
                    }

                    if( BattleElement.prototype.setAnimation.call(this, bForce, sAnimation, false) ){
                        const oAnim = this.oData.oAnimations[sAnimation];
                        this.killLink();
                        oSet = {
                            oAnimation: this.oAnimation,
                            oMovement: this.setMovement(
                                oAnim.oMove,
                                bReverse == null ?
                                    this.bReverse :
                                    bReverse
                            )
                        };
                        bUpdate && this.updateAnimation();
                        this.aHit = [];;
                    }
                    return oSet;
                },
                updateAnimation: function(){
                    BattleElement.prototype.updateAnimation.call(this);
                    this.oMovement.update();
                    this.move();
                },

                setMovement: function(oMove, bReverse){
                    return this.oMovement.set(oMove, bReverse);
                },
                setPushback: function(oPushback, bReverse, bDivide){
                    if( this.oCheck.bPushback ){
                        const oNewPushback = Object.assign({}, oPushback);
                        bDivide && (oNewPushback.nLength /= 2);
                        this.oMovement.parallel(oNewPushback, bReverse);
                    }
                    this.aLink.forEach( oLinkEntity => oLinkEntity.setPushback(oPushback, bReverse, bDivide) );
                },
                move: function(){
                    this.oMovement.forEach( oMovement => {
                        if( oMovement.oMove ){
                            if( oMovement.oMove.nX ){
                                this.oLayer.oPosition.nX += oMovement.oMove.nX * (oMovement.bReverse ? -1 : 1);
                            }
                            if( oMovement.oMove.nY ){
                                this.oLayer.oPosition.nY += oMovement.oMove.nY;
                            }
                        }
                    } );
                },

                setFreeze: function(nFreeze){
                    BattleElement.prototype.setFreeze.call(this, nFreeze);
                    this.oMovement.setFreeze(nFreeze);
                },
                unFreeze: function(){
                    BattleElement.prototype.unFreeze.call(this);
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