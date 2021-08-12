function VersusScene() {
    BattleScene.call(this);
    // 0: Battle, 1: SlowMotion, 2: Victory, 3: Menu
    this.nStep = 0;
    this.oMenu = null;
}

Object.assign(
    VersusScene, {

        oStep: {
            Battle: 0,    
            SlowMotion: 1,    
            Victory: 2,    
            Rematch: 3
        },

        aHelper: 
            [ {
                aButton: ['UP', 'DOWN'],
                sText: 'Move'
            },
            {
                aButton: ['A'],
                sText: 'Validate'
            },
            {
                aButton: ['START'],
                sText: 'Quit'
            } ],

        prototype: Object.assign(
            Object.create(BattleScene.prototype), {
                constructor: VersusScene,
                init: function(){
                    // __SUPER
                    BattleScene.prototype.init.call(
                        this,
                        {
                            sContextClass: '--versus',
                            aSourceBuffer: [],
                            sAnimation: 'anim_open',
                            nTimer: GameSettings.nTimer,
                            aRound: SceneManager.oTransverseData.BTL__aRound
                        }
                    );

                    this.oMenu = new GameMenu('LAY__Battle_Menu');

                    // Texte début de match
                    this.oDisplay.show(
                        {
                            sText: 'Ready ?',
                            fCallback: () => {
                                this.oDisplay.start();
                                this.aPlayer.forEach( (oPlayer, nIndex) => {
                                    oPlayer.oInputBuffer.init( new BattleInputSourceBufferLocal(SceneManager.oTransverseData.MNU__aController[nIndex]) );
                                } );
                            }
                        },
                        {
                            sText: 'Fight !',
                            nLength: 30
                        }
                    );
                },
                update: function(){
                    if( this.isStep('Rematch') ){
                        SceneManager.oTransverseData.MNU__aController[0].ifPressedNow( {
                            // Gestion validation
                            A: () => {
                                let sMenuSelected = this.oMenu.getSelected().sId;
                                OutputManager.getChannel('CHN__SFX').play('ADO__Validate');
                                switch( sMenuSelected ){
                                    case 'TXT__Battle_Menu_Rematch':
                                        SceneManager.change( new VersusScene() );
                                        break;
                                    case 'TXT__Battle_Menu_Select':
                                        SceneManager.change( new SelectScene() );
                                        break;
                                    case 'TXT__Battle_Menu_Stage':
                                        SceneManager.change( new StageScene() );
                                        break;
                                    case 'TXT__Battle_Menu_Quit':
                                        SceneManager.change( new MenuScene() );
                                        break;
                                }
                            },
                            // Gestion déplacement
                            UP: () => {
                                this.oMenu.prev();
                            },
                            DOWN: () => {
                                this.oMenu.next();
                            },
                            START: () => {
                                SceneManager.change( new MenuScene() );
                            }
                        } );
    
                        this.oMenu.update();
                        GameHelper.update();
                    } else {
                        BattleScene.prototype.update.call(this);
                    }
                },
                destroy: function(){
                    this.oMenu.destroy();
                    GameHelper.destroy();
                    this.oContext.hElement.classList.remove('--menu');
                    BattleScene.prototype.destroy.call(this);
                    return {
                        BTL__aRound: this.isStep('Rematch') ?
                            [0, 0] :
                            SceneManager.oTransverseData.BTL__aRound
                    }
                },
  
                endBattle: function(oEndGame){
                    if( oEndGame.bEnd && !this.isStep('Victory') ){

                        this.oDisplay.pause();
                        if( !this.isStep('SlowMotion') ){
                            this.nStep++;
                            this.aPlayer.forEach( oPlayer => oPlayer.oInputBuffer.destroy() );

                            if( oEndGame.bTimer ){
                                this.oDisplay.show( {
                                    sText: 'Time Up !',
                                    nLength: 120,
                                    fCallback: () => {
                                        this.showEndBattle(oEndGame);
                                    }
                                } );
                            }
                            else {
                                TimerEngine.setFPS(30);
                                this.oDisplay.show( {
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

                    let sText = oEndGame.oPlayerWin ?
                        oEndGame.oPlayerWin.oData.sName + ' win !':
                            ( oEndGame.bTimer ?
                                'Nobody wins !' :
                                'Double K.O. !' );

                    oEndGame.oPlayerWin && oEndGame.oPlayerWin.nRound++;
                    this.nStep++;
                    this.aPlayer.forEach( oPlayer => {
                        if( oEndGame.oPlayerWin == oPlayer ){
                            oPlayer.setStance('anim_victory', true);
                        } else {
                            if( oPlayer.oAnimation.sType != 'animation' ){
                                oPlayer.setStance('anim_lose', true);
                            }
                        }
                    } );

                    this.oDisplay.show( {
                        sText: sText,
                        nLength: 120,
                        fCallback: this.checkEndBattle(oEndGame.oPlayerWin)
                    } );
                    OutputManager.getChannel('CHN__BGM').play('ADO__Victory', true, false);
                },

                checkEndBattle: function(oWinner){
                    let bMenu = false;
                    if( oWinner ){
                        const nRoundWin = ++SceneManager.oTransverseData.BTL__aRound[ oWinner.nPlayer == 1 ? 0 : 1 ];
                        if( nRoundWin >= (StoreEngine.get('BTL__Rounds') || GameSettings.oRound.nDefault) ){
                            bMenu = true;
                        }
                    }

                    if( bMenu ){
                        return () => {
                            this.nStep++;
                            GameHelper.set(VersusScene.aHelper, SceneManager.oTransverseData.MNU__aController[0]);
                            this.oContext.addTickUpdate( () => {
                                this.oContext.hElement.classList.add('--menu');
                            } );
                        };
                    }
                    else {
                        return () => {
                            SceneManager.change( new VersusScene() );
                        };
                    }
                },

                isStep: function(sStep, bStrict){
                    return bStrict ?
                        VersusScene.oStep[sStep] == this.nStep :
                        VersusScene.oStep[sStep] <= this.nStep;
                }
            }
        )
    }
);
