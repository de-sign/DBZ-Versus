// Animations
function GameAnimation(sName, sType, oFrameData, aStep, oData){
    GameTimer.call(this);

    this.sName = null;
    this.sType = null;
    this.oFrameData = null;

    this.aStep = [];
    this.oFrame = null;
    this.oData = null;

    this.init(sName, sType, oFrameData, aStep, oData);
}

Object.assign(
    GameAnimation, {

        getType: function(oAnim){
            return GameSettings.oAnimations.oType.oMap[oAnim.sName] || GameSettings.oAnimations.oType.sDefault;
        },
        getCategory: function(oAnim){
            const aCategory = GameSettings.oAnimations.oCategory.oMap[oAnim.sType];
            return Array.isArray(aCategory) ? aCategory : [aCategory];
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: GameAnimation,
                init: function(sName, sType, oFrameData, aStep, oData){
                    GameTimer.prototype.init.call(this, oData.nLength);

                    this.sName = sName;
                    this.oFrameData = oFrameData;
                    this.aStep = aStep;
                    this.oData = oData;
                    this.sType = sType || GameAnimation.getType(this);
                    this.aCategory = GameAnimation.getCategory(this);
                },
                update: function(){
                    const bUpdate = GameTimer.prototype.update.call(this);
                    if( bUpdate ){
                        let nFrameMax = 0,
                            oFrame = null;

                        for( let nIndex = 0; nIndex < this.aStep.length; nIndex++ ){
                            oFrame = this.aStep[nIndex];
                            if( oFrame.nFrame ){
                                nFrameMax += oFrame.nFrame;
                                if( this.nTick <= nFrameMax ){
                                    break;
                                }
                            } else {
                                break;
                            }   
                        }

                        this.oFrame = Object.assign(
                            { oStatus: {} },
                            this.oFrameData[ oFrame.sFrame ],
                            oFrame
                        );
                    } else {
                        this.oFrame.bFreeze = true;
                    }
                    return bUpdate;
                },
                
                is: function(sCategory){
                    return sCategory ? 
                        this.aCategory.indexOf(sCategory) != -1 :
                        this.aCategory;
                },
                
                canSetLength: function(){
                    let bReturn = false;
                    this.aCategory.forEach( sCategory => {
                        if( GameSettings.oAnimations.oCategory.aCanSetLength.indexOf(sCategory) != -1 ){
                            bReturn = true;
                        }
                    } );
                    return bReturn;
                },
                setLength: function(nLength){
                    if( nLength && this.canSetLength() ){
                        this.nLength = nLength;
                    }
                },
                getStep: function(nDelta, bAddDelay){
                    let sStep = null,
                        nFrame = 0,
                        aStep = ['nStartUp', 'nActive', 'nRecovery'];

                    for( let nIndex = 0; nIndex < aStep.length; nIndex++ ){
                        sStep = aStep[nIndex];
                        nFrame += this.oData[sStep];
                        if( this.nTick <= nFrame + ( nDelta || 0 ) + ( bAddDelay ? this.oData.nDelayCancel : 0 ) ){
                            break;
                        }
                    }
                    return sStep;
                }
            }
        )
    }
);