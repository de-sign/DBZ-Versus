function InitializeData(){
    this.init();
}

Object.assign(
    InitializeData.prototype, {

        init: function(){
            this.oData = GAME.oData.oDefaultCharacter;
            for( let sChar in GAME.oData.oCharacter ){
                const oChar = GAME.oData.oCharacter[sChar];
                this.createColor(oChar);
                this.createFrames(oChar);
                this.createAnimations(oChar);
                this.createLunch(oChar);
                this.createRecovery(oChar);
                this.createCommands(oChar);
            }
        },

        isPlainObject: function(uData){
            return Object.prototype.toString.call(uData) === '[object Object]';
        },

        createColor: function(oChar){
            oChar.oPath = {};
            oChar.aColor.forEach( oColor => {
                oChar.sColor || (oChar.sColor = oColor.sCod);
                oChar.oPath[oColor.sCod] = {
                    sFace: 'assets/images/characters/face/' + oChar.sCod + '/' + oColor.sCod + '.png',
                    sFrames: 'assets/images/characters/frames/' + oChar.sCod + '/' + oColor.sCod,
                    sPreview: 'assets/images/characters/preview/' + oChar.sCod + '/' + oColor.sCod + '.png'
                };
            } );
        },

        createFrames: function(oChar){
            const oFrames = {};
            if( oChar.bActive ){
                [
                    ...Object.keys(this.oData.oFrames),
                    ...Object.keys(oChar.oFrames)
                ]
                .filter( (uValue, nIndex, aSelf) => {
                    return aSelf.indexOf(uValue) === nIndex;
                } )
                .forEach( sFrame => {
                    if( oChar.oFrames[sFrame] ){
                        oFrames[sFrame] = Object.assign({}, this.oData.oFrames[sFrame], oChar.oFrames[sFrame] || {});
                        for( let sProp in oFrames[sFrame] ){
                            if( this.isPlainObject(this.oData.oFrames[sFrame][sProp]) && this.isPlainObject(oChar.oFrames[sFrame][sProp]) ){
                                Object.assign(oFrames[sFrame][sProp], this.oData.oFrames[sFrame][sProp], oChar.oFrames[sFrame][sProp]);
                            }
                        }
                    }
                } );
            } else {
                Object.assign(oFrames, this.oData.oFrames);
            }
            oChar.oFrames = oFrames;
        },

        createAnimations: function(oChar){
            oChar.oAnimations = Object.assign({}, this.oData.oAnimations, oChar.oAnimations);
        },

        createLunch: function(oChar){
            let nLastY = 0,
                oLastFrame = null;

            const aAnim = [],
                nDemiLength = (GAME.oSettings.oLuncher.nLength - 1) / 2,
                nX = GAME.oSettings.oLuncher.oMove.nX / GAME.oSettings.oLuncher.nLength;

            // Ajout de 10 FRAMES supplémentaire pour gérer le DOWN
            for( let nIndex = 1; nIndex <= GAME.oSettings.oLuncher.nLength + 10; nIndex++ ){
                let nParabolX = (nIndex - 1 - nDemiLength) / nDemiLength,
                    nParabolY = -1 * (nParabolX * nParabolX - 1),
                    nTargetY = Math.round(nParabolY * GAME.oSettings.oLuncher.oMove.nY),
                    nY = nTargetY - nLastY,
                    sFrame = nIndex <= GAME.oSettings.oLuncher.nLength / 2 ? 'hit_luncher' : 'hit_fall';

                if( oLastFrame && oLastFrame.oMove.nY == nY && oLastFrame.sFrame == sFrame ){
                    oLastFrame.nFrame++;
                } else {
                    aAnim.push( oLastFrame = {
                        nFrame: 1,
                        sFrame,
                        oMove: { nX, nY }
                    } );
                    if( GAME.oSettings.oLuncher.nInvulnerable >= nIndex){
                        oLastFrame.aHurtBox = null;
                    }
                }
                nLastY = nTargetY;
            }
            oChar.oAnimations.lunch = aAnim;
        },

        createRecovery: function(oChar){
            const aRecovery = oChar.oAnimations.recovery;
            ['forward', 'backward'].forEach( sType => {
                const aAnim = [];
                aRecovery.forEach( oFrame => {
                    aAnim.push( Object.assign({}, oFrame) );
                } );
                aAnim[0].oMove = {
                    nX: GAME.oSettings.nRecovery * ( sType == 'forward' ? 1 : -1 )
                };
                oChar.oAnimations['recovery_' + sType] = aAnim;
            } );
        },

        createCommands: function(oChar){
            const oCommands = {};
            if( oChar.bActive ){
                for( let sType in this.oData.oCommands ){
                    oCommands[sType] = [
                        ...this.oData.oCommands[sType],
                        ...(oChar.oCommands[sType] || [])
                    ];
                }
            } else {
                Object.assign(oCommands, this.oData.oCommands);
            }
            oChar.oCommands = oCommands;
        }
    }
);

InitializeScene.prototype.stepData = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create data Character' );
            new InitializeData();
            this.bStepEnd = true;
        }
    )
};