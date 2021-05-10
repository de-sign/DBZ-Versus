function InitializeBattle(){
	this.oContext = null;
	this.oArea = null;
    this.oPattern = null;

    this.init();
}

Object.assign(
    InitializeBattle,
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
                this.oArea = OutputManager.getElement('LAY__Battle_Area');

                this.getPattern();
                BattleEntity.init('LAY__Battle_Entity_');
                for( let nIndex = 0; nIndex < GameSettings.nPlayer; nIndex++ ){
                    const nPlayer = nIndex + 1;
                    this.createHUDPlayer(nPlayer);
                    this.createHUDLife(nPlayer);
                    this.createHUDKi(nPlayer);
                    this.createTrainingParameters(nPlayer);
                }
                this.createTrainingList();

                this.oContext.update();
            },

            getPattern: function(){
                this.oPattern = {
                    oHUD: OutputManager.getElement('LAY__Battle_HUD_'),
                    oParameters: OutputManager.getElement('LAY__Training_Menu_Parameters_Player'),
                    oCommand: OutputManager.getElement('LAY__Training_Menu_List_Command_'),
                    oList: OutputManager.getElement('LAY__Training_Menu_List_Character_')
                };

                for( let sPattern in this.oPattern ){
                    this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
                }
            },
            createHUDPlayer: function(nPlayer){
                // Clone du LAYER
                let hLayer = this.oPattern.oHUD.hElement.cloneNode(true);
                hLayer.id += nPlayer;
                hLayer.classList.remove(OutputManager.oConfig.class.created);
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id += nPlayer;
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );

                // Ajout dans le context
                this.oContext.add(new OutputManager.OutputLayer(hLayer), '.Battle__HUDs');
                this.oContext.update();
            },
            createHUDLife: function(nPlayer){
                const oLayer = OutputManager.getElement('LAY__Battle_HUD_Life_' + nPlayer);
                for( let nIndex = 0; nIndex < GameSettings.oLife.player; nIndex++ ){
                    oLayer.add( new OutputManager.OutputText() );
                }
            },
            createHUDKi: function(nPlayer){
                const oLayer = OutputManager.getElement('LAY__Battle_HUD_Ki_' + nPlayer);
                for( let nIndex = 0; nIndex < GameSettings.nKi; nIndex++ ){
                    oLayer.add( new OutputManager.OutputText() );
                }
            },
            createTrainingParameters: function(nPlayer){
                // Clone du LAYER
                let hLayer = this.oPattern.oParameters.hElement.cloneNode(true);
                hLayer.removeAttribute('id');
                hLayer.removeAttribute('class');
                [].forEach.call(
                    hLayer.querySelectorAll('.--change'),
                    hElement => {
                        hElement.id && (hElement.id += nPlayer);
                        hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                    }
                );
                hLayer.querySelector('.Training__Menu_Parameters_Number').innerHTML += nPlayer;

                // Ajout dans le context
                const oLayer = OutputManager.getElement('LAY__Training_Menu_Parameters');
                oLayer.hElement.insertBefore(
                    hLayer,
                    oLayer.hElement.querySelector('.Training__Menu_Parameters_All')
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

                                if( oCommand.sCod.indexOf('throw') == -1 ){
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

                hCommand.querySelector('.Training__Menu_List_Ki').innerHTML = oCommand.nCost ? ( oCommand.nCost / 2 ) + ' Ki' : '';

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
                        sButtons += '<b class="Training__InputButton ' + ( ( oBtn[sBtn] ? '--btn' : '--dir' ) )  + '">' + InitializeBattle.oSymbol[sBtn] + '</b>';
                    } );
                } );
                hCommand.querySelector('.Training__Menu_List_Button').innerHTML = sButtons;

                return new OutputManager.OutputLayer(hCommand);
            }
        }
    }
);

InitializeScene.prototype.stepContext_Battle = function(){
    setTimeout(
        () => {
            this.addStepText( 'Create context Battle' );
            new InitializeBattle();
            this.bStepEnd = true;
        }
    )
};