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
            C: 'C',
            D: 'D'
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

                const aCommonRows = [
                    ...GameData.oEntity.oCharacter.oCommands.aDefense,
                    ...GameData.oEntity.oCharacter.oCommands.aOffense
                ];

                // Base 
                this.createCommandWindows( {
                    sId: 'ALL',
                    sName: 'Common commands',
                    aRows: aCommonRows
                } );

                // Character
                for( let sChar in GameData.oCharacter ){
                    const oChar = GameData.oCharacter[sChar];
                    oChar.aColor.forEach( oColor => {

                        const oCharColor = oChar[oColor.sColor];
                        if( oCharColor.oCommands.aOffense && oCharColor.oCommands.aOffense.length ){
                            this.createCommandWindows( {
                                sId: oCharColor.sCod,
                                sName: oCharColor.sName,
                                aRows: oCharColor.oCommands.aOffense,
                                aExclude: aCommonRows.reduce( (aAccu, oRow) => {
                                    aAccu.push( oRow.sCod );
                                    return aAccu;
                                }, [] )
                            } );
                        }
                    } );

                    this.oContext.update();
                }
            },

            createCommandWindows: function(oOptions){

                // Clone du LAYER CHAR
                const hLayer = this.oPattern.oList.hElement.cloneNode(true);
                hLayer.id += oOptions.sId;
                hLayer.classList.remove(OutputManager.oConfig.class.created);
                hLayer.querySelector('.Training__Menu_List_Name').innerHTML = oOptions.sName;
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += oOptions.sId;
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );

                const oLayer = new OutputManager.OutputLayer(hLayer),
                    oGroup = {};

                // Création des groupes
                for( let nIndex = oOptions.aRows.length - 1; nIndex >= 0; nIndex-- ){
                    let oRow = oOptions.aRows[nIndex];
                    const sGroup = oRow.oList.sGroup,
                        aRow = [];

                    if(
                        oOptions.aExclude ?
                            oOptions.aExclude.indexOf( oRow.sCod ) == -1 :
                            !oRow.oList.bHidden 
                    ){
                        do {
                            aRow.push(oRow);
                            oRow = oRow.oFollowUp;
                        }
                        while( oRow );

                        oGroup[sGroup] || ( oGroup[sGroup] = [] );
                        oGroup[sGroup].push(aRow);
                    }
                }
                
                // Affichage des groupes
                GameSettings.oList.aOrder.forEach( sGroup => {
                    if( oGroup[sGroup] ){
                        // Ajout du TITLE
                        oLayer.addTickUpdate( () => {
                            const hLi = document.createElement('li');
                            hLi.classList.add('Menu__Title');
                            hLi.innerHTML = GameSettings.oList.oGroup[sGroup];
                            oLayer.hElement.querySelector('.Training__Menu_List_Character_Command').appendChild(hLi);
                        } );

                        // Ajjout des commandes
                        oGroup[sGroup].forEach( aRow => {
                            const oListCommand = this.createCommandRow(aRow);
                            oListCommand.__oData = aRow[ aRow.length - 1 ];
                            oLayer.add(oListCommand, '.Training__Menu_List_Character_Command');
                        } );
                    }
                } );

                // Ajout au menu
                OutputManager.getElement('LAY__Training_Menu_List').add(oLayer);
            },

            createCommandRow: function(aCommand){
                const oCommand = aCommand[0], 
                    oBtn = { A: true, B: true, C: true },
                    hCommand = this.oPattern.oCommand.hElement.cloneNode(true);

                hCommand.removeAttribute('id');
                hCommand.classList.remove(OutputManager.oConfig.class.created);

                hCommand.querySelector('.Training__Menu_List_Command').innerHTML = oCommand.oList.sName + (
                    oCommand.oList.sInfo ?
                        '<span class="--cancel"> - ' + oCommand.oList.sInfo + '</span>' :
                        ''
                );

                let sButtons = '';
                aCommand.forEach( oStepCommand => {
                    oStepCommand.oManipulation && oStepCommand.oManipulation.aButtons.forEach( oButton => {
                        Object.keys(oButton).forEach( sBtn => {
                            if( InitializeTraining.oSymbol[sBtn] ){
                                sButtons += '<b class="Training__InputButton ' + ( ( oBtn[sBtn] ? '--btn' : '--dir' ) )  + '">' + InitializeTraining.oSymbol[sBtn] + '</b>';
                            }
                        } );
                    } );
                } );
                hCommand.querySelector('.Training__Menu_List_Button').innerHTML = sButtons;

                hCommand.querySelector('.Training__Menu_List_Ki').innerHTML = oCommand.nCost ? ( oCommand.nCost / GameSettings.oKi.nBar ) + ' Ki' : '';

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