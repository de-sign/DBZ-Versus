function VersusScene() {
    BattleScene.call(this);
    this.bSlow = false;
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
                            sAnimation: 'anim_open',
                            nTimer: GameSettings.nTimer
                        }
                    );

                    // Texte début de match
                    this.oInfo.add(
                        {
                            sText: 'Ready ?',
                            fCallback: () => {
                                this.oTimer.start();
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
/*
                update: function(){
                    if( this.bEnd ){
                        this.oInfo.update();
                    } else {
                        BattleScene.prototype.update.call(this);
                    }
                },
*/
                endBattle: function(oEndGame){
                    if( oEndGame.bEnd && !this.bEnd ){

                        this.oTimer.pause();
                        if( !this.bSlow ){
                            this.bSlow = true;
                            this.aPlayer.forEach( oPlayer => oPlayer.oInputBuffer.destroy() );

                            if( oEndGame.bTimer ){
                                this.oInfo.add( {
                                    sText: 'Time Up !',
                                    nLength: 120,
                                    fCallback: () => {
                                        this.showEndBattle(oEndGame);
                                    }
                                } );
                            }
                            else {
                                TimerEngine.setFPS(30);
                                this.oInfo.add( {
                                    sText: 'K.O. !'
                                } );
                                setTimeout(
                                    () => {
                                        TimerEngine.setFPS(60);
                                    },
                                    1000
                                )
                            }
                        }

                        else {
                            let bDeath = false;
                            this.aPlayer.forEach( oPlayer => {
                                if( oPlayer.oAnimation.sType == 'animation' ){
                                    bDeath = true;
                                }
                            } );
                            bDeath && this.showEndBattle(oEndGame);
                        }
                    }
                },
                showEndBattle: function(oEndGame){

                    let sText = oEndGame.aPlayerWin.length ?
                            oEndGame.aPlayerWin[0].oData.sName + ' win !':
                            ( oEndGame.bTimer ?
                                'Nobody wins !' :
                                'Double K.O. !' );

                    this.bEnd = true;
                    this.aPlayer.forEach( oPlayer => {
                        if( oEndGame.aPlayerWin.indexOf(oPlayer) == -1 ){
                            if( oPlayer.oAnimation.sType != 'animation' ){
                                oPlayer.setStance('anim_lose', true);
                            }
                        } else {
                            oPlayer.setStance('anim_victory', true);
                        }
                    } );

                    this.oInfo.add( {
                        sText: sText,
                        nLength: 120,
                        fCallback: () => {
                            SceneManager.change( new MenuScene() );
                        }
                    } );
                    OutputManager.getChannel('CHN__BGM').play('ADO__Victory', true, false);
                }
            }
        )
    }
);