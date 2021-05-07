function VersusScene() {
    BattleScene.call(this);
    this.bEnd = false;
}

Object.assign(
    VersusScene, {
        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: VersusScene,
                init: function(){
                    // __SUPER
                    BattleScene.prototype.init.call(
                        this,
                        {
                            sContextClass: '--versus',
                            aController: [],
                            sAnimation: 'opening'
                        }
                    );

                    // Texte début de match
                    this.oInfo.add(
                        {
                            sText: 'Ready ?',
                            fCallback: () => {
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    oPlayer.oInputBuffer.init( SceneManager.oTransverseData.MNU__aController[nIndex] );
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
                    if( !this.bEnd && aPlayerWin.length ){
                        this.bEnd = true;
                        this.oInfo.add( {
                            sText: aPlayerWin.length == 2 ?
                                'Double KO !' :
                                aPlayerWin[0].oData.sName + ' win !',
                            bFreeze: true,
                            nLength: 120,
                            fCallback: () => {
                                SceneManager.change( new MenuScene() );
                            }
                        } );
                        OutputManager.getChannel('CHN__BGM').play('ADO__Victory', true, false);
                    }
                }
            }
        )
    }
);