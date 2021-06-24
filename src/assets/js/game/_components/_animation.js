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
            move_44: 'dash',
            move_66: 'dash',
            attack_66: 'dash',

            // MOVEMENT
            move_5: 'stand',
            move_1: 'stand',
            move_4: 'movement',
            move_6: 'movement',
            move_7: 'jump',
            move_8: 'jump',
            move_9: 'jump',
            move_fall_4: 'jump',
            move_fall_6: 'jump',
            list_8: 'jump',
            move_0: 'landing',

            // HURT
            defense_4: 'guard',
            hit_0: 'hit',
            hit_1: 'hit',
            hit_2: 'hit',
            hit_AB: 'hit',
            launch_0: 'launch',
            launch_1: 'launch',

            // DOWN
            launch_2: 'down',
            launch_4: 'recovery',
            launch_5: 'recovery',
            launch_6: 'recovery',

            // Animation
            anim_open: 'animation',
            anim_death: 'animation',
            anim_victory: 'animation'
        },

        aAllType: ['action', 'movement', 'stand', 'jump', 'landing', 'dash', 'guard', 'hit', 'launch', 'down', 'recovery'],
        aTypeHurt: ['guard', 'hit', 'launch'],
        aTypeMove: ['stand', 'movement', 'jump'],
        aTypeStack: ['dash', 'landing', 'recovery'],
        aTypeTraining: ['action', 'dash', 'guard', 'hit', 'launch', 'down', 'recovery'],
        aTypeCommand: ['action', 'dash'],

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
        isTypeTraining: function(sName){
            return this.aTypeTraining.indexOf( this.getType(sName) ) != -1;
        },
        isTypeCommand: function(sName){
            return this.aTypeCommand.indexOf( this.getType(sName) ) != -1;
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
                },
                isTraining: function(){
                    return GameAnimation.isTypeTraining(this.sName);
                },
                isCommand: function(){
                    return GameAnimation.isTypeCommand(this.sName);
                }
            }
        )
    }
);