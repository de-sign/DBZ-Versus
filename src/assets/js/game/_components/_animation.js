// Animations
function GameAnimation(sName, oFrameData, aStep){
    GameTimer.call(this);

    this.sName = null;
    this.sType = null;
    this.oFrameData = null;

    this.aStep = [];
    this.oFrame = null;

    this.init(sName, oFrameData, aStep);
}

Object.assign(
    GameAnimation, {
        
        oType: {
            // undefined: 'action' 
            // MOVEMENT
            stand: 'movement',
            block: 'movement',
            forward: 'movement',
            backward: 'movement',
            // GUARD
            guard: 'guard',
            reflect: 'guard',
            // HIT
            hit_light: 'hit',
            hit_heavy: 'hit',
            hit_luncher: 'hit',
            lunch: 'hit',
            // DOWN
            down: 'down',
            recovery: 'recovery'
        },
        aAllType: ['action', 'movement','guard', 'hit', 'down', 'recovery'],
        aTypeHurt: ['guard', 'hit'],

        getType: function(sName){
            return GameAnimation.oType[sName] || 'action';
        },
        isTypeHurt: function(sName){
            return this.aTypeHurt.indexOf( this.getType(sName) ) != -1;
        },

        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: GameAnimation,
                init: function(sName, oFrameData, aStep){
                    GameTimer.prototype.init.call(this, aStep.reduce( (nResult, oFrame) => nResult + (oFrame.nFrame || 0), 0));

                    this.sName = sName;
                    this.sType = GameAnimation.getType(sName);
                    this.oFrameData = oFrameData;
                    this.aStep = aStep;
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

                setLength: function(nLength){
                    if( nLength && this.isHurt() ){
                        this.nLength = nLength;
                    }
                },
                isHurt: function(){
                    return GameAnimation.isTypeHurt(this.sName);
                }
            }
        )
    }
);