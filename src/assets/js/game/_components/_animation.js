// Animations
function GameAnimation(sName, sType, oFrameData, aStep){
    GameTimer.call(this);

    this.sName = null;
    this.sType = null;
    this.oFrameData = null;

    this.aStep = [];
    this.oFrame = null;

    this.init(sName, sType, oFrameData, aStep);
}

Object.assign(
    GameAnimation, {

        getType: function(oAnim){
            return GameSettings.oAnimations.oType.oMap[oAnim.sName] || GameSettings.oAnimations.oType.sDefault;
        },
        getCategory: function(oAnim){
            return GameSettings.oAnimations.oCategory.oMap[oAnim.sType];
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: GameAnimation,
                init: function(sName, sType, oFrameData, aStep){
                    GameTimer.prototype.init.call(this, aStep.reduce( (nResult, oFrame) => nResult + (oFrame.nFrame || 0), 0));

                    this.sName = sName;
                    this.oFrameData = oFrameData;
                    this.aStep = aStep;
                    this.sType = sType || GameAnimation.getType(this);
                    this.sCategory = GameAnimation.getCategory(this);
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
                    return this.sCategory == sCategory;
                },
                
                canSetLength: function(){
                    return GameSettings.oAnimations.oCategory.aCanSetLength.indexOf(this.sCategory) != -1;
                },
                setLength: function(nLength){
                    if( nLength && this.canSetLength() ){
                        this.nLength = nLength;
                    }
                }
            }
        )
    }
);