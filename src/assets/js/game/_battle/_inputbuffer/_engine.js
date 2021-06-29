/* ----- BattleInputBuffer ----- */
function BattleInputBuffer(oSource){
    this.oSource = null;

    this.nDirection = 5;
    this.bReverse = false;
    this.aHistory = [];
    this.nFrameLastUpdate = 0;

    this.init(oSource);
}

Object.assign(
    BattleInputBuffer,
    {
        nLengthHistory: 100,
        oMapDirection: {
            aNormal: ['DB', 'DN', 'DF', 'BW', 'NT', 'FW', 'UB', 'UP', 'UF'],
            aReverse: ['DF', 'DN', 'DB', 'FW', 'NT', 'BW', 'UF', 'UP', 'UB']
        },
        getDirection: function(nDirection, bReverse){
            return this.oMapDirection[ bReverse ? 'aReverse' : 'aNormal' ][nDirection - 1];
        },
        
        prototype: {
            constructor: BattleInputBuffer,
            init: function(oSource) {
                this.oSource = oSource;
            },
            update: function(bReverse){
                
                const bChangeReverse = bReverse != this.bReverse;
                this.bReverse = bReverse;

                if( this.oSource ){
                    const aHistory = this.oSource.update(bReverse, bChangeReverse);
                    if( aHistory ){
                        this.nFrameLastUpdate = TimerEngine.nFrames;
                        ( Array.isArray(aHistory) ? aHistory : [aHistory] ).forEach( oHistory => {
                            this.nDirection = oHistory.nDirection;
                            this.aHistory.length >= BattleInputBuffer.nLengthHistory && this.aHistory.shift();
                            this.aHistory.push(oHistory);
                        } );
                    }
                }
            },
            destroy: function(){
                this.reset();
                this.oSource = null;
            },

            reset: function(){
                this.nDirection = 5;
                this.aHistory = [];
                this.oSource && this.oSource.reset();
            },
            getDirection: function(){
                return BattleInputBuffer.getDirection(this.nDirection, this.bReverse);
            },
            checkManipulation: function(nFrameCheck, oManip){
                const nManipButtons = oManip.aButtons.length;

                let nIndexHistory = this.aHistory.length,
					nIndexButtons = nManipButtons - 1,
					bFCheck = true,
                    bNotCheck = false,
					nButtonsCheck = 0, 
					oHistory;

                while( oHistory = this.aHistory[--nIndexHistory] ){

                    const oManipButtons = oManip.aButtons[nIndexButtons];
                    let bButtonCheck = true;

                    if( oManipButtons ){
                        for(let sButton in oManipButtons){
                            if(
                                ( bFCheck && oManipButtons[sButton] && oHistory.oButtons[sButton] != oHistory.nFrame )
                                ||
                                ( !oManipButtons[sButton] && !oHistory.oButtons[sButton] )
                            ){
                                bButtonCheck = false;
                                break;
                            }
                        }
                    } else {
                        bNotCheck = true;
                    }

                    if(bFCheck){
                        if(bButtonCheck){
                            if(oManipButtons){
                                bNotCheck = false;
                            }
                            bFCheck = false;
                            nButtonsCheck++;
                        } else if(!bNotCheck){
                            break;
                        }
                    }

                    if( !oManipButtons || ( !bFCheck && !bButtonCheck ) ){
                        bFCheck = true;
                        nIndexButtons--;
                        nIndexHistory++;
                    } else {
                        let nButtonDiff = nFrameCheck - oHistory.nFrame + 1;
                        if(	nButtonDiff >= oManip.nMaxLengthFrame || nButtonsCheck == nManipButtons || ( !bNotCheck && !nIndexButtons ) ){
                            break;
                        }
                    }
                }

                return nButtonsCheck == nManipButtons;
            }
        }
    }
);

/* ----- BattleInputBuffer - Source ----- */
function BattleInputSourceBuffer(){
    this.init.apply(this, arguments);
}

Object.assign(
    BattleInputSourceBuffer.prototype, {
        constructor: BattleInputSourceBuffer,
        init: function(){ },
        update: function(){ },
        destroy: function(){ },

        reset: function(){ }
    }
);