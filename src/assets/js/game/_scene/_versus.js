function VersusScene() {
    BattleScene.call(this);
}

Object.assign(
    VersusScene, {
        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: VersusScene,
                init: function(oLastData){
                    // __SUPER
                    BattleScene.prototype.init.call(
                        this,
                        oLastData,
                        {
                            sContextClass: '--versus',
                            aController: []
                        }
                    );

                    // Texte début de match
                    this.oInfo.add(
                        {
                            sText: 'Ready ?',
                            bFreeze: true,
                            fCallback: () => {
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    oPlayer.oInputBuffer.init( oLastData.aController[nIndex] );
                                } );
                            }
                        },
                        {
                            sText: 'Fight !',
                            nLength: 30
                        }
                    );
                },
                endBattle: function(aPlayerWin){
                    if( aPlayerWin.length ){
                        this.oInfo.add( {
                            sText: aPlayerWin.length == 2 ?
                                'Double KO !' :
                                aPlayerWin[0].oData.sName + ' win !',
                            bFreeze: true,
                            nLength: 120,
                            fCallback: () => {
                                GAME.oScene.change( new MenuScene() );
                            }
                        } );
                        GAME.oOutput.getChannel('CHN__BGM').play('ADO__Victory', true, false);
                    }
                }
            }
        )
    }
);