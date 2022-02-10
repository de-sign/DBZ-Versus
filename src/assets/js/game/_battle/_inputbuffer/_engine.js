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
        nLengthHistory: 20,
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
            getOptions: function(){
                return this.oSource && this.oSource.getOptions();
            },
            checkManipulation: function(nFrameCheck, oManip){
                let bReturn = false;
                for( let nIndex = 0; nIndex < oManip.aButtons.length; nIndex++ ){
                    if( this.checkButtons(nFrameCheck, oManip.aButtons[nIndex], oManip.nMaxLengthFrame || 1, oManip.bStay) ){
                        bReturn = true;
                        break;
                    }
                }
                return bReturn;
            },
            checkButtons: function(nFrameCheck, aManipButtons, nMaxLengthFrame, bStay){
                const oUsed = {};
                let nIndexHistory = this.aHistory.length,
					nIndexButtons = aManipButtons.length - 1,
                    nFrameStart = nFrameCheck,
                    bFirst = true,
                    oHistory;
                
                // Pour chaque ligne dans INPUT BUFFER
                while( oHistory = this.aHistory[--nIndexHistory] ){

                    // Check si c'est bien le dernier bouton appuyé, sauf si contre indication (bStay)
                    if ( !bStay && bFirst && nFrameCheck > oHistory.nFrame ){
                        break;
                    }

                    else {

                        let bButtonsCheck = true,
                            oTempUsed = {};

                        // Check si tous les boutons de la ligne de manip sont bien appuyés
                        aManipButtons[nIndexButtons].split('+').forEach( sButton => {
                            // Pour chaque boutons de la ligne de manip
                            const bDirection = BattleInputBuffer.oMapDirection.aNormal.indexOf( sButton ) != -1,
                                sKeyButton = sButton + '_' + oHistory.oButtons[sButton];
                            if(
                                // Si boutons pas appuyé
                                !oHistory.oButtons[sButton]
                                // Ou déjà pris en compte
                                || oUsed[sKeyButton]
                                // Ou si pour la première ligne de manip, le bouton n'a pas été appuyé à cette FRAME, sauf si contre indication (bStay)
                                || ( !bStay && !bDirection && bFirst && oHistory.oButtons[sButton] != oHistory.nFrame )
                            ){
                                // Bouton qui n'est pas validé
                                bButtonsCheck = false;
                            } else {
                                // Stock bouton temporairement used
                                oTempUsed[sKeyButton] = true;
                            }
                        } );
    
                        // Si boutons validés
                        if( bButtonsCheck ){
                            // Si première ligne de manip
                            if( bFirst ){
                                // Assignation frame de départ
                                nFrameStart = oHistory.nFrame;
                            }
                            // Stock boutons déjà used
                            Object.assign(oUsed, oTempUsed);
                            // Passage à la ligne de manip suivante
                            nIndexButtons--;
                            bFirst = false;
                        }
    
                        // Si la manip est OK ou que le temps de manip max est dépassé
                        if( nIndexButtons < 0 || ( nFrameStart - oHistory.nFrame + 1 >= nMaxLengthFrame ) ){
                            break;
                        }
                    }
                }

                // Si la manip est OK
                return nIndexButtons < 0;
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

        reset: function(){ },
        getOptions: function(){ }
    }
);