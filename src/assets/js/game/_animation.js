// Animations
function GameAnimation(sName, oFrameData, aStep){
    this.sName = null;
    this.sType = null;
    this.oFrameData = null;

    this.aStep = [];
    this.nCurrentFrame = 0;
    this.oFrame = null;
    
    this.nFreeze = 0;
    this.nLength = 0;

    this.init(sName, oFrameData, aStep);
}

Object.assign(
    GameAnimation, {
        
        oType: {
            // undefined: 'action' 
            // MOVEMENT
            stand: 'movement',
            forward: 'movement',
            backward: 'movement',
            // GUARD
            guard: 'guard',
            // HIT
            hit_light: 'hit',
            hit_heavy: 'hit',
            hit_luncher: 'hit',
            lunch: 'hit',
            // DOWN
            down: 'down'
        },
        aAllType: ['action', 'movement','guard', 'hit'],
        aTypeHurt: ['guard', 'hit'],

        getType: function(sName){
            return GameAnimation.oType[sName] || 'action';
        },
        isTypeHurt: function(sName){
            return this.aTypeHurt.indexOf( this.getType(sName) ) != -1;
        },

        prototype: {
            constructor: GameAnimation,
            init: function(sName, oFrameData, aStep){
                this.sName = sName;
                this.sType = GameAnimation.getType(sName);
                this.oFrameData = oFrameData;
                this.aStep = aStep;
                this.nLength = aStep.reduce( (nResult, oFrame) => nResult + (oFrame.nFrame || 0), 0);
            },
            update: function(){
                let bUpdate = true;
                if( this.nFreeze ){
                    this.oFrame.bFreeze = true;
                    this.nFreeze--;
                    bUpdate = false;
                } else {
                    this.nCurrentFrame++;

                    let nFrameMax = 0,
                        oFrame = null;
                    for( let nIndex = 0; nIndex < this.aStep.length; nIndex++ ){
                        oFrame = this.aStep[nIndex];
                        if( oFrame.nFrame ){
                            nFrameMax += oFrame.nFrame;
                            if( this.nCurrentFrame <= nFrameMax ){
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
                }
                return bUpdate;
            },
            destroy: function(){

            },

            setLength: function(nLength){
                if( nLength && this.isHurt() ){
                    this.nLength = nLength;
                }
            },
            setFreeze: function(nFreeze){
                this.nFreeze += nFreeze;
            },
            reset: function(){
                this.nCurrentFrame = 0;
                this.nFreeze = 0;
            },
            isEnd: function(){
                return this.nCurrentFrame >= this.nLength;
            },
            isHurt: function(){
                return GameAnimation.isTypeHurt(this.sName);
            }
        }
    }
);