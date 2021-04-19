/* Side Controller */
function SideController(sController, nSide){
    this.oController = null;
    this.oLayer = null;

    // 0: NONE, N: PLAYER #N
    this.nSide = 0;

    this.bReady = false;
    this.bReturn = false;
    this.bQuit = false;

    this.init(sController, nSide);
}

Object.assign(
    SideController.prototype, {
        constructor: SideController,
        init: function(sController, nSide) {
            this.oController = GAME.oInput.getController(sController);
            this.oLayer = GAME.oOutput.getElement('LAY__Side_Controller_' + sController);
            this.nSide = nSide || 0;
            this.changeSide('same');
        },
        update: function(aLock){
            const bConnected = this.oController.sType == 'keyboard' || this.oController.oGamepad;
            if( bConnected ){
                let sSFX = null
                this.checkSide(aLock);

                this.oController.ifPressedNow( {
                    // Gestion validation
                    A: () => {
                        sSFX = 'validate';
                        if( this.nSide ){
                            this.bReady = true;
                        }
                        this.bReturn = false;
                        this.bQuit = false;
                    },
                    B: () => {
                        sSFX = 'cancel';
                        if( this.nSide ){
                            this.changeSide();
                            this.bReady = false;
                        } else {
                            this.bReturn = true;
                        }
                        this.bQuit = false;
                    },
                    // Gestion Select Player
                    LEFT: () => {
                        sSFX = 'move';
                        this.changeSide('left', aLock);
                        this.bReady = false;
                        this.bReturn = false;
                        this.bQuit = false;
                    },
                    RIGHT: () => {
                        sSFX = 'move';
                        this.changeSide('right', aLock);
                        this.bReady = false;
                        this.bReturn = false;
                        this.bQuit = false;
                    }
                } );
                
                sSFX && GAME.oOutput.getChannel('OA_SFX').play(sSFX);
            }
            else {
                this.changeSide();
                this.bReady = false;
                this.bReturn = false;
                this.bQuit = false;
            }

            if( this.bReady && this.nSide ) {
                GAME.oOutput.getElement('TXT__Side_Player_State_' + this.nSide).setText('Ready !');
            }
            GAME.oOutput.getElement('TXT__Side_Controller_' + this.oController.sId)
                .setText(bConnected ? this.oController.sName : 'Disconnected&nbsp;!' );
        },
        destroy: function(){
        },

        checkSide: function(aLock){
            if( aLock && aLock[this.nSide] && aLock[this.nSide].sId != this.oController.sId ){
                this.changeSide();
            }
        },
        changeSide: function(sChange, aLock){
            const oParent = this.oLayer.oParentElement;
            if( oParent ){
                oParent.remove( this.oLayer );
                oParent.update();
            }

            switch( sChange ){
                case 'left':
                    if( this.nSide == 0 ) {
                        this.nSide = GAME.oSettings.nPlayer - 1;
                    } else if( this.nSide == 1 ) {
                        this.nSide = GAME.oSettings.nPlayer;
                    } else if( this.nSide == GAME.oSettings.nPlayer ){
                        this.nSide = 0;
                    } else {
                        this.nSide--;
                    }
                    break;

                case 'right':
                    if( this.nSide == 0 ) {
                        this.nSide = GAME.oSettings.nPlayer;
                    } else if( this.nSide == GAME.oSettings.nPlayer ){
                        this.nSide = 1;
                    } else if( this.nSide == GAME.oSettings.nPlayer - 1 ){
                        this.nSide = 0;
                    } else {
                        this.nSide++;
                    }
                    break;
                    
                case 'same':
                    break;
                default:
                    this.nSide = 0;
            }

            this.checkSide(aLock);
            GAME.oOutput.getElement( this.nSide ? 'LAY__Side_Player_' + this.nSide : 'LAY__Side_Empty' ).add(this.oLayer);
        }
    }
);

/* Side */
function SideScene(){
    this.oData = null;
	this.oContext = null;
    this.sType = null;

    this.aController = [];
    this.aSideLock = [];

    this.nFrameCreated = 0;
}

Object.assign(
    SideScene, {
        aHelper: [
            {
                aButton: ['LEFT', 'RIGHT'],
                sText: 'Move'
            },
            {
                aButton: ['A'],
                sText: 'Validate'
            },
            {
                aButton: ['B'],
                sText: 'Cancel / Return'
            },
            {
                aButton: ['START'],
                sText: 'Quit'
            }
        ],
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: SideScene,
				init: function( oLastData ){
                    this.oData = oLastData;
					GAME.oOutput.useContext('CTX__Side');
					this.oContext = GAME.oOutput.getElement('CTX__Side');

                    this.nFrameCreated = GAME.oTimer.nFrames;

                    const aName = [ 'Versus', 'Training' ],
                        aController = oLastData.aController ?
                            oLastData.aController.reduce( (aAccu, oCtrl) => {
                                return [...aAccu, oCtrl && oCtrl.sId]
                            }, [] ) :
                            [];

                    for( let sController in ControllerManager.oController ){
                        const nIndex = aController.indexOf(sController);
                        this.aController.push( new SideController(sController, nIndex == -1 ? 0 : nIndex + 1) );
                    }

                    GAME.oOutput.getElement('TXT__Side_Name').setText( this.sType = aName[oLastData.nLastIndexMenu] );
                    GameHelper.set( Object.values(ControllerManager.oController), SideScene.aHelper );
				},
				update: function(){
                    this.addNewController();

                    // Update
                    const aLock = this.getPlayerController();
                    this.aController.forEach( oController => {
                        oController.update(aLock);
                    } );

                    this.getPlayerController(true).forEach( (oController, nSide) => {
                        if( !oController && nSide ){
                            GAME.oOutput.getElement('TXT__Side_Player_State_' + nSide).setText('Waiting ...');
                        }
                    } );

                    this.updateStatus();
                    if( this.oStatus.bReturn || this.oStatus.bQuit ) {
                        GAME.oScene.change( new MenuScene() );
                    } else if( this.oStatus.bReady ) {
                        GAME.oScene.change( new SelectScene() );
                    }
                    
                    GameHelper.update();
				},
                destroy: function(){
                    let aController = this.getPlayerController(true);
                    aController.shift();
                    
                    GameHelper.destroy();
                    return Object.assign(
                        this.oData,
                        {
                            aController: aController
                        }
                    );
                },

                addNewController: function(){
                    if( this.aController.length < GAME.oInput.nController ){
                        const aOldController = this.aController.reduce(
                            (aAccu, oCtrl) => {
                                return [...aAccu, oCtrl.oController.sId]
                            }, []
                        );
                        
                        for( let sController in GAME.oInput.oController ){
                            if( aOldController.indexOf(sController) == -1 ){
                                this.aController.push( new SideController(sController) );
                                GameHelper.aController.push( GAME.oInput.getController(sController) );
                            }
                        }
                    }
                },
                getPlayerController: function(bReady){
                    let aLock = [];
                    aLock.length = GAME.oSettings.nPlayer + 1;
                    aLock = aLock.fill(null);

                    this.aController.forEach( oController => {
                        if( oController.nSide && ( !bReady || oController.bReady ) ){
                            aLock[ oController.nSide ] = oController.oController;
                        }
                    } );
                    return aLock;
                },
                updateStatus: function(){

                    let nReady = 0,
                        nNeedReady = GAME.oSettings.nPlayer,
                        nSide = 0;

                    this.oStatus = {
                        bReturn: false,
                        bQuit: false,
                        bReady: false
                    };
                    
                    this.aController.forEach( oCustomer => {
                        oCustomer.bReady && nReady++;
                        this.oStatus.bReturn || ( this.oStatus.bReturn = oCustomer.bReturn );
                        this.oStatus.bQuit || ( this.oStatus.bQuit = oCustomer.bQuit );
                        oCustomer.nSide && nSide++;
                    } );

                    if( this.sType == 'Training' && nSide != nNeedReady ){
                        let nChange = 0;
                        for( let sController in GAME.oInput.oController ){
                            const oController = GAME.oInput.getController(sController);
                            if( oController.nFrameChange > this.nFrameCreated ){
                                nChange++;
                            }
                        }
                        if( nChange < nNeedReady ){
                            nNeedReady = 1;
                        }
                    }

                    this.oStatus.bReady = nReady == nNeedReady;
                }
            }
        )
    }
);