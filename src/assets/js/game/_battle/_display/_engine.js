/* ----- Display ----- */
function BattleDisplay(oScene, oOptions){
    this.oScene = null;
    this.oModule = {};

    this.init(oScene, oOptions);
}

Object.assign(
    BattleDisplay, {
        aModule: [
            'HUD',
            'Text',
            'Timer',
            'Effect'
        ],

        prototype: {
            constructor: BattleDisplay,
            init: function(oScene, oOptions){
                this.oScene = oScene;

                this.setBackground();
                BattleDisplay.aModule.forEach( sModule => {
                    this.oModule['o' + sModule] = window['BattleDisplay' + sModule] ?
                        new window['BattleDisplay' + sModule](this.oScene, oOptions) :
                        null;
                } );
            },
            update: function(bRender){
                // Effect
                this.commandEffect();
                // Render
                if( bRender ){
                    // Entity
                    BattleElement.get().forEach( oEntity => oEntity.render() );
                    // Display
                    for( let sModule in this.oModule ){
                        const oModule = this.oModule[sModule];
                        oModule && oModule.update();
                    }
                }
            },
            destroy: function(){
                for( let sModule in this.oModule ){
                    const oModule = this.oModule[sModule];
                    oModule && oModule.destroy();
                }
            },

            setBackground: function(){
                const sCod = SceneManager.oTransverseData.BTL__sStage;
                OutputManager.getElement('LAY__Battle_Area').setStyle( {
                    backgroundColor: GameData.oStage[sCod].sColor,
                    backgroundImage: 'url("' + GameData.oStage[sCod].oPath.sBackground + '")'
                } );
            },
            commandEffect: function(){
                for( let nIndex = 0; nIndex < this.oScene.aPlayer.length; nIndex++ ){
                    const oPlayer = this.oScene.aPlayer[nIndex],
                        aCommandEffect = oPlayer.oGatling.getEffect(),
                        aEffect = [];
    
                    if( aCommandEffect ){
                        aCommandEffect.forEach( oEffect => {
                            oEffect = Object.assign({}, oEffect);
                            if( oEffect.oPosition ){
                                if( oEffect.oPosition === true ){
                                    oEffect.oPosition = oPlayer.oLayer.oPosition;
                                } else {
                                    oEffect.oPosition = {
                                        nX: oPlayer.oLayer.oPosition.nX + (oEffect.oPosition.nX || 0),
                                        nY: oPlayer.oLayer.oPosition.nY + (oEffect.oPosition.nY || 0)
                                    };
                                }
                            }
                            if( oEffect.bIgnore ){
                                oEffect.aIgnore = [oPlayer.sId];
                            }
                            aEffect.push(oEffect);
                        } );

                        this.addEffect.apply(this, aEffect);

                        break;
                    }
                }
            },

            // Text
            showText: function(){
                const oText = this.oModule.oText;
                oText.add.apply(oText, arguments);
            },
            hideText: function(){
                this.oModule.oText.hide();
            },

            // Timer
            startTimer: function(){
                this.oModule.oTimer.start();
            },
            pauseTimer: function(){
                this.oModule.oTimer.pause();
            },

            // Effect
            addEffect: function(){
                const oEffect = this.oModule.oEffect;
                this.oModule.oEffect.add.apply(oEffect, arguments);
            }
        }
    }
);