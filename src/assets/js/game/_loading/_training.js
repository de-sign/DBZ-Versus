function InitializeTraining(){
	this.oContext = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeTraining,
    {
        oSymbol: {
            DB: '&#8601;',
            DN: '&#8595;',
            DF: '&#8600;',
            BW: '&#8592;',
            NT: '',
            FW: '&#8594;',
            UB: '&#8598;',
            UP: '&#8593;',
            UF: '&#8599;',
            A: 'A',
            B: 'B',
            C: 'C'
        },

        prototype: {

            init: function(){
                this.oContext = OutputManager.getElement('CTX__Battle');

                this.getPattern();
                for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                    const nPlayer = nIndex + 1;
                    this.createTrainingData(nPlayer);
                    this.createTrainingGauges(nPlayer);
                }
                this.createTrainingList();

                this.oContext.update();
            },

            getPattern: function(){
                this.oPattern = {
                    oData: OutputManager.getElement('LAY__Training_Data_'),
                    oGauges: OutputManager.getElement('LAY__Training_Menu_Gauges_Player'),
                    oCommand: OutputManager.getElement('LAY__Training_Menu_List_Command_'),
                    oList: OutputManager.getElement('LAY__Training_Menu_List_Character_')
                };

                for( let sPattern in this.oPattern ){
                    this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
                }
            },

            createTrainingData: function(nPlayer){
                // Clone du LAYER
                let hLayer = this.oPattern.oData.hElement.cloneNode(true);
                hLayer.id += nPlayer;
                hLayer.classList.remove(OutputManager.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id && (hElement.id += nPlayer);
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );

                // Ajout dans le context
                this.oContext.add(new OutputManager.OutputLayer(hLayer), '.Training__Data');
                this.oContext.update();
            },

            createTrainingGauges: function(nPlayer){
                // Clone du LAYER
                let hLayer = this.oPattern.oGauges.hElement.cloneNode(true);
                hLayer.removeAttribute('id');
                hLayer.removeAttribute('class');
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id && (hElement.id += nPlayer);
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );
                hLayer.querySelector('.Training__Menu_Gauges_Number').innerHTML += nPlayer;

                // Ajout dans le context
                const oLayer = OutputManager.getElement('LAY__Training_Menu_Gauges');
                oLayer.hElement.insertBefore(
                    hLayer,
                    oLayer.hElement.querySelector('.Training__Menu_Gauges_Return')
                );
                if( nPlayer == 2 ){
                    [].forEach.call(
                        oLayer.hElement.querySelectorAll('.--uncreate'),
                        hElement => {
                            hElement.classList.remove('--uncreate', OutputManager.oConfig.class.created);
                        }
                    );
                }
                oLayer.autoCreateChildElement();
                oLayer.update();
            },

            createTrainingList: function(){
                for( let sChar in GameData.oCharacter ){
                    const oChar = GameData.oCharacter[sChar];
                    oChar.aColor.forEach( oColor => {

                        const oCharColor = oChar[oColor.sColor];
                        if( oCharColor.oCommands.aOffense && oCharColor.oCommands.aOffense.length ){

                            // Clone du LAYER CHAR
                            const hLayer = this.oPattern.oList.hElement.cloneNode(true);
                            hLayer.id += oCharColor.sCod;
                            hLayer.classList.remove(OutputManager.oConfig.class.created);
                            hLayer.querySelector('.Training__Menu_List_Name').innerHTML = oCharColor.sName;
                            [].forEach.call(
                                hLayer.querySelectorAll('.--change'),
                                hElement => {
                                    hElement.id += oCharColor.sCod;
                                    hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                                }
                            );
                            const oLayer = new OutputManager.OutputLayer(hLayer);

                            for( let nIndex = oCharColor.oCommands.aOffense.length - 1; nIndex >= 0; nIndex-- ){
                                const aCommand = [];
                                let oCommand = oCharColor.oCommands.aOffense[nIndex];

                                if( !oCommand.bNotInCommandList ){
                                    do {
                                        aCommand.push(oCommand);
                                        oCommand = oCommand.oFollowUp;
                                    }
                                    while( oCommand );
                                    
                                    aCommand.forEach( (oCommand, nDeep) => {
                                        const oListCommand = this.createCommandList(oCommand, nDeep);
                                        oListCommand.__oData = oCommand;
                                        oLayer.add(oListCommand, '.Training__Menu_List_Character_Command');
                                    } );
                                }
                            }

                            // Ajout au menu
                            OutputManager.getElement('LAY__Training_Menu_List').add(oLayer);
                        }
                    } );
                    this.oContext.update();
                }
            },
            createCommandList: function(oCommand, nDeep){
                const oBtn = { A: true, B: true, C: true },
                    hCommand = this.oPattern.oCommand.hElement.cloneNode(true);

                hCommand.removeAttribute('id');
                hCommand.classList.remove(OutputManager.oConfig.class.created);

                hCommand.querySelector('.Training__Menu_List_Ki').innerHTML = oCommand.nCost ? ( oCommand.nCost / GameSettings.oKi.nBar ) + ' Ki' : '';

                const hListCommand = hCommand.querySelector('.Training__Menu_List_Command');
                let sName = oCommand.sName;
                if( nDeep ){
                    sName = '- ' + sName;
                    for( let nIndexDeep = 0; nIndexDeep < nDeep; nIndexDeep++ ){
                        sName = '&nbsp;' + sName;
                    }
                    hListCommand.classList.add('--cancel');
                }
                hListCommand.innerHTML = sName;

                let sButtons = '';
                oCommand.oManipulation && oCommand.oManipulation.aButtons.forEach( oButton => {
                    Object.keys(oButton).forEach( sBtn => {
                        sButtons += '<b class="Training__InputButton ' + ( ( oBtn[sBtn] ? '--btn' : '--dir' ) )  + '">' + InitializeTraining.oSymbol[sBtn] + '</b>';
                    } );
                } );
                hCommand.querySelector('.Training__Menu_List_Button').innerHTML = sButtons;

                return new OutputManager.OutputLayer(hCommand);
            }
        }
    }
);

InitializeScene.prototype.stepContext_Training = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Training' );
            new InitializeTraining();
            this.bStepEnd = true;
        }
    )
};