function InitializeData(){
    this.init();
}

Object.assign(
    InitializeData.prototype, {

        init: function(){
            this.oData = GAME.oData.oEntity;
            for( let sType in this.oData ){
                for( let sCod in GAME.oData[sType] ){
                    const oEntity = GAME.oData[sType][sCod];
    
                    this.createColor(sType, oEntity);
                    this.createFrames(sType, oEntity);
                    this.createAnimations(sType, oEntity);

                    if( sType == 'oCharacter' ){
                        this.createLunch(oEntity);
                        this.createRecovery(oEntity);
                        this.createCommands(oEntity);
                    }
                }
            }
        },

        isPlainObject: function(uData){
            return Object.prototype.toString.call(uData) === '[object Object]';
        },

        // ENTITY
        createColor: function(sType, oEntity){
            oEntity.aColor.forEach( (oColor, nIndex) => {
                oEntity.oDefaultColor || (oEntity.oDefaultColor = oColor);
                oColor.oPath = {
                    sFrames: GAME.oSettings.oPath[sType].sFrames ?
                        GAME.oSettings.oPath[sType].sFrames + '/' + oEntity.sCod + '/' + oColor.sCod :
                        null,
                    sFace: GAME.oSettings.oPath[sType].sFace ?
                        GAME.oSettings.oPath[sType].sFace + '/' + oEntity.sCod + '/' + oColor.sCod + '.png' :
                        null,
                    sPreview: GAME.oSettings.oPath[sType].sPreview ?
                        GAME.oSettings.oPath[sType].sPreview + '/' + oEntity.sCod + '/' + oColor.sCod + '.png' :
                        null
                };
            } );
        },

        createFrames: function(sType, oEntity){
            const oFrames = {};
            if( oEntity.bActive ){
                [
                    ...Object.keys(this.oData[sType].oFrames),
                    ...Object.keys(oEntity.oFrames)
                ]
                .filter( (uValue, nIndex, aSelf) => {
                    return aSelf.indexOf(uValue) === nIndex;
                } )
                .forEach( sFrame => {
                    if( oEntity.oFrames[sFrame] != null ){
                        oFrames[sFrame] = Object.assign({}, this.oData[sType].oFrames[sFrame], oEntity.oFrames[sFrame] || {});
                        for( let sProp in oFrames[sFrame] ){
                            if( this.isPlainObject(this.oData[sType].oFrames[sFrame][sProp]) ){
                                if( this.isPlainObject(oEntity.oFrames[sFrame][sProp]) ){
                                    Object.assign(oFrames[sFrame][sProp], this.oData[sType].oFrames[sFrame][sProp], oEntity.oFrames[sFrame][sProp]);
                                }
                                else if( this.oData[sType].oFrames[sFrame][sProp].bDelete && oEntity.oFrames[sFrame][sProp] == null ){
                                    delete oFrames[sFrame][sProp];
                                }
                            }
                        }
                    }
                } );
            } else {
                Object.assign(oFrames, this.oData[sType].oFrames);
            }
            oEntity.oFrames = oFrames;
        },

        createAnimations: function(sType, oEntity){
            oEntity.oAnimations = Object.assign({}, this.oData[sType].oAnimations, oEntity.oAnimations);
            for( let sAnim in oEntity.oAnimations ){
                if( Array.isArray(oEntity.oAnimations[sAnim]) ){
                    oEntity.oAnimations[sAnim] = {
                        aFrames: oEntity.oAnimations[sAnim]
                    };
                }
            }
        },

        createLunch: function(oChar){
            let nLastY = 0,
                oLastFrame = null;

            const aAnim = [],
                aMove = [],
                nDemiLength = (GAME.oSettings.oLuncher.nLength - 1) / 2,
                nX = GAME.oSettings.oLuncher.oMove.nX / GAME.oSettings.oLuncher.nLength;

            // Ajout de 10 FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GAME.oSettings.oLuncher.nLength + 10; nIndex++ ){
                const nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GAME.oSettings.oLuncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    sFrame = nIndex <= GAME.oSettings.oLuncher.nLength / 2 ? 'hit_luncher' : 'hit_fall',
                    bInvulnerable = GAME.oSettings.oLuncher.nInvulnerable >= nIndex;

                if(
                    oLastFrame
                    && oLastFrame.sFrame == sFrame
                    && (bInvulnerable ? !oLastFrame.aHurtBox : oLastFrame.aHurtBox)
                ){
                    oLastFrame.nFrame++;
                } else {
                    aAnim.push( oLastFrame = {
                        nFrame: 1,
                        sFrame
                    } );
                    if( bInvulnerable ){
                        oLastFrame.aHurtBox = null;
                    }
                }
                aMove.push( { nX, nY } );
                nLastY = nTargetY;
            }

            oChar.oAnimations.lunch = {
                oMove: aMove,
                aFrames: aAnim
            };
        },

        // CHARACTER
        createRecovery: function(oChar){
            const aRecovery = oChar.oAnimations.recovery.aFrames;
            ['forward', 'backward'].forEach( sType => {
                const aAnim = [];
                aRecovery.forEach( oFrame => {
                    aAnim.push( Object.assign({}, oFrame) );
                } );
                oChar.oAnimations['recovery_' + sType] = {
                    oMove: GAME.oSettings.oRecovery[sType],
                    aFrames: aAnim
                };
            } );
        },

        createCommands: function(oChar){
            const oCommands = {};
            if( oChar.bActive ){
                for( let sType in this.oData.oCharacter.oCommands ){
                    oCommands[sType] = [
                        ...this.oData.oCharacter.oCommands[sType],
                        ...(oChar.oCommands[sType] || [])
                    ];
                }
            } else {
                Object.assign(oCommands, this.oData.oCharacter.oCommands);
            }
            oChar.oCommands = oCommands;
        }
    }
);

InitializeScene.prototype.stepData = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create data Entity' );
            new InitializeData();
            this.bStepEnd = true;
        }
    )
};