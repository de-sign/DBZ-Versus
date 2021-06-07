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
            // ACTION
            // undefined: 'action' 
            dash: 'dash',

            // MOVEMENT
            stand: 'stand',
            block: 'stand',
            backward: 'movement',
            forward: 'movement',
            jump_backward: 'jump',
            jump_neutral: 'jump',
            jump_forward: 'jump',
            landing: 'landing',

            // HURT
            guard: 'guard',
            hit_light: 'hit',
            hit_heavy: 'hit',
            hit_luncher: 'hit',
            hit_throw: 'hit',
            lunch: 'lunch',
            fall: 'lunch',

            // DOWN
            down: 'down',
            recovery: 'recovery'
        },
        aAllType: ['action', 'movement', 'jump', 'dash', 'guard', 'hit', 'lunch', 'down', 'recovery'],
        aTypeHurt: ['guard', 'hit', 'lunch'],
        aTypeMove: ['stand', 'movement', 'jump'],
        aTypeStack: ['action', 'dash', 'landing'],

        getType: function(sName){
            return GameAnimation.oType[sName] || 'action';
        },
        isTypeHurt: function(sName){
            return this.aTypeHurt.indexOf( this.getType(sName) ) != -1;
        },
        isTypeMove: function(sName){
            return this.aTypeMove.indexOf( this.getType(sName) ) != -1;
        },
        isTypeStack: function(sName){
            return this.aTypeStack.indexOf( this.getType(sName) ) != -1;
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
                },
                isMovement: function(){
                    return GameAnimation.isTypeMove(this.sName);
                },
                isStack: function(){
                    return GameAnimation.isTypeStack(this.sName);
                }
            }
        )
    }
);