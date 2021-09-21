/* ----- BattleDisplayEffectEntity ----- */
function BattleDisplayEffectEntity(sType, oOptions, oLayer){
    GameTimer.call(this);

    this.sType = '';
    this.oOptions = null;
    this.oLayer = null;

    this.init(sType, oOptions, oLayer);
}

Object.assign(
    BattleDisplayEffectEntity,
    {
        prototype: Object.assign(
            Object.create(GameTimer.prototype), {
                constructor: BattleDisplayEffectEntity,
                init: function(sType, oOptions, oLayer){
                    this.sType = sType;
                    this.oOptions = oOptions;
                    this.oLayer = oLayer;

                    this.oLayer = OutputManager.getElement('LAY__Battle_Area');

                    GameTimer.prototype.init.call(this, oOptions.nLength, oOptions.nDelay);
                },
                update: function(){
                    let sFunction = null;
                    const bUpdate = GameTimer.prototype.update.call(this);

                    if( !this.isFreeze() && this.nTick == 1 ){
                        sFunction = 'apply';
                    } else if( this.isEnd() ){
                        sFunction = 'destroy';
                    }

                    if( sFunction ){
                        this.oLayer.addTickUpdate( () => this[sFunction]() );
                    }
                },

                apply: function(){
                    switch( this.sType ){
                        case 'freeze':
                            BattleElement.get().forEach( oEntity => {
                                if( !this.oOptions.aIgnore || this.oOptions.aIgnore.indexOf(oEntity.sId) == -1 ){
                                    oEntity.setFreeze(this.oOptions.nLength);
                                }
                            } );
                            break;
                        case 'slow':
                            this.nLastFPS = TimerEngine.nFPS;
                            TimerEngine.setFPS( Math.floor(TimerEngine.nFPS / this.oOptions.nSlow) );
                            break;
                        case 'zoom':
                            this.oLayer.setPosition( {
                                scaleX: this.oOptions.nZoom,
                                scaleY: this.oOptions.nZoom,
                                originX: this.oOptions.oPosition.nX + this.oLayer.oPosition.originX,
                                originY: this.oOptions.oPosition.nY + this.oLayer.oPosition.originY
                            } );
                            break;
                        case 'dark':
                            break;
                    }
                    this.oLayer.hElement.classList.add('--' + this.sType);
                },
                destroy: function(){
                    switch( this.sType ){
                        case 'freeze':
                            break;
                        case 'slow':
                            this.nLastFPS && TimerEngine.setFPS(this.nLastFPS);
                            break;
                        case 'zoom':
                            this.oLayer.resetPosition();
                            break;
                        case 'dark':
                            break;
                    }
                    this.oLayer.hElement.classList.remove('--' + this.sType);
                }
            }
        )
    }
);

/* ----- BattleDisplayEffect ----- */
function BattleDisplayEffect(){
    this.oLayer = null;
    this.oEffect = {};

    this.init();
}

Object.assign(
    BattleDisplayEffect.prototype, {
        init: function(){
            this.oLayer = OutputManager.getElement('LAY__Battle_Area');
            this.oLayer.enableAutoPositioning();
        },
        update: function(){
            for( let sEffect in this.oEffect ){
                this.oEffect[sEffect].update();
                if( this.oEffect[sEffect].isEnd() ){
                    delete this.oEffect[sEffect];
                }
            }
        },
        destroy: function(){
            for( let sEffect in this.oEffect ){
                this.oEffect[sEffect].destroy();
            }
        },

        add: function(){
            [...arguments].forEach( oEffect => {
                if( this.oEffect[ oEffect.sType ] ){
                    this.oEffect[ oEffect.sType ].destroy();
                }
                this.oEffect[ oEffect.sType ] = new BattleDisplayEffectEntity(oEffect.sType, oEffect, this.oLayer);
            } );
        }
    }
);