/* Loading */
function PreDevScene(){
    this.oPattern = {};
    this.aCharacter = [];
    this.nCharacter = 0;
    LoadingScene.apply(this, arguments);
}

Object.assign(
    PreDevScene, {
        prototype: Object.assign(
            Object.create(LoadingScene.prototype), {
                constructor: PreDevScene,
				init: function(){
                    this.aCharacter = Object.keys(GameData.oCharacter).sort();
                    this.getPattern();

                    const aStep = ['step_Menu'];
                    this.aCharacter.forEach( sChar => {
                        aStep.push('stepLayer_Frames');
                    } );

                    LoadingScene.prototype.init.call(
                        this,
                        {
                            sRedirection: 'Dev',
                            aStep
                        }
                    );

                    this.addStepText('Loading Dev');
				},
                /*
				update: function(){},
                destroy: function(){},
                */

                getPattern: function(){
                    this.oPattern = {
                        oFrame: OutputManager.getElement('LAY__Dev_Frame_'),
                        oFrameEntity: OutputManager.getElement('LAY__Dev_Frame_Entity_')
                    };

                    for( let sPattern in this.oPattern ){
                        this.oPattern[sPattern] && this.oPattern[sPattern].oParentElement.delete( this.oPattern[sPattern] );
                    }
                },

                createFrame_Layer: function(sChar){
                    const oContent = OutputManager.getElement('LAY__Dev_Content'),
                        oCharacter = GameData.oCharacter[sChar];

                    // Clone du LAYER
                    let hLayer = this.oPattern.oFrame.hElement.cloneNode(true);
                    hLayer.id += sChar;
                    hLayer.classList.remove(OutputManager.oConfig.class.created);
                    [].forEach.call(
                        hLayer.querySelectorAll('.--change'),
                        hElement => {
                            hElement.id += sChar;
                            hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                        }
                    );

                    // Ajout dans le context
                    oContent.add(new OutputManager.OutputLayer(hLayer));
                    oContent.update();

                    // Gestion COLOR
                    const oMenu = OutputManager.getElement('LAY__Dev_Frame_Colors_' + sChar);
                    oCharacter.aColor.forEach( oDataColor => {
                        const oColor = oCharacter[oDataColor.sColor],
                            oText = new OutputManager.OutputText(oDataColor.sColor, { tag: 'li', class: 'Dev__Frame_Color' });
                        oText.__oData = oDataColor;
                        oMenu.add(oText, 'ul');
                    } );
                },

                createFrame_Entity: function(sChar){
                    const oContent = OutputManager.getElement('LAY__Dev_Frame_' + sChar),
                        oCharacter = GameData.oCharacter[sChar],
                        oDefaultColor = oCharacter[ oCharacter.sDefaultColor ];

                    let sPrefixFrame = null,
                        oLayerWrapper = null;

                    Object.keys(oDefaultColor.oFrames).sort().forEach( sFrame => {

                        // Wrapper
                        if( !sPrefixFrame || sFrame.indexOf(sPrefixFrame) != 0 ) {
                            const aFrameName = sFrame.split('_');
                            aFrameName.pop();
                            sPrefixFrame = aFrameName.join('_');

                            oLayerWrapper = new OutputManager.OutputLayer();
                            oContent.add(oLayerWrapper);
                            oContent.update();
                        }

                        const oFrame = oDefaultColor.oFrames[sFrame],
                            sId = sChar + '_' + sFrame;

                        // Clone du LAYER
                        let hLayer = this.oPattern.oFrameEntity.hElement.cloneNode(true);
                        hLayer.id += sId;
                        hLayer.classList.add('--' + sFrame.split('_')[0]);
                        hLayer.classList.remove(OutputManager.oConfig.class.created);
                        [].forEach.call(
                            hLayer.querySelectorAll('.--change'),
                            hElement => {
                                hElement.id += sId;
                                hElement.classList.remove('--change', OutputManager.oConfig.class.created);
                            }
                        );

                        const oLayer = new OutputManager.OutputLayer(hLayer);
                        // Name
                        oLayer.add( new OutputManager.OutputText(sFrame, { class: 'Dev__Frame_Entity_Name' }) );
                        // Sprite
                        oCharacter.aColor.forEach( oDataColor => {
                            const oColor = oCharacter[oDataColor.sColor];
                            oLayer.add(
                                new OutputManager.OutputSprite(
                                    oColor.oPath.sFrames + '/' + oFrame.sPath,
                                    {
                                        class: [
                                            'Dev__Frame_Entity_Sprite',
                                            '--color_' + oDataColor.sColor
                                        ]
                                    }
                                ) 
                            );
                        } );
    
                        // Ajout dans le context
                        oLayerWrapper.add(oLayer);
                        oLayerWrapper.update();

                        // Box
                        ['oPositionBox', 'aHurtBox', 'aHitBox'].forEach( sBox => {
                            const oLayer = OutputManager.getElement('LAY__Dev_Frame_Entity_' + sBox.slice(1) + '_' + sId);

                            this.getBox(oFrame, sBox).forEach( oBox => {
                                const hElement = document.createElement('div');
                                    oLayer.hElement.appendChild(hElement);

                                Object.assign(
                                    hElement.style,
                                    {
                                        left: ( GameSettings.oBattleElement.Player.oPositionPoint.nX + oBox.nX ) + 'px',
                                        top: ( GameSettings.oBattleElement.Player.oPositionPoint.nY + oBox.nY ) + 'px',
                                        width: oBox.nWidth + 'px',
                                        height: oBox.nHeight + 'px'
                                    }
                                );
                            } );
                        } );
                    } );
                },
                
                getBox: function(oFrame, sBox){
                    let aBox = oFrame[sBox];
                    if( aBox ){
                        Array.isArray(aBox) || ( aBox = [aBox] );
                        aBox = aBox.map( oBox => {
                            return Object.assign(
                                {},
                                oBox
                            );
                        } );
                    } else {
                        aBox = [];
                    }
                    return aBox;
                },

                stepReset: function(){
                    setTimeout(
                        () => {
                            this.nCharacter = 0;
                            this.bStepEnd = true;
                        }
                    );
                },

                step_Menu: function(){
                    setTimeout(
                        () => {
                            this.addStepText( 'Create menu' );
                            const oMenu = OutputManager.getElement('LAY__Dev_Menu');
                            this.aCharacter.forEach( sChar => {
                                const oMenuChar = new OutputManager.OutputText(sChar, { tag: 'li' });
                                oMenuChar.__oData = GameData.oCharacter[sChar];
                                oMenu.add( oMenuChar, 'ul' );
                            } );
                            this.bStepEnd = true;
                        }
                    );
                },
                
                stepLayer_Frames: function(){
                    setTimeout(
                        () => {
                            const sChar = this.aCharacter[this.nCharacter];

                            this.addStepText( 'Create layer frame ' + sChar );
                            this.createFrame_Layer(sChar);
                            this.createFrame_Entity(sChar);
                            this.nCharacter++;
                            this.bStepEnd = true;
                        }
                    );
                }
            }
        )
    }
);