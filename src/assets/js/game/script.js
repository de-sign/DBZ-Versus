//=include _components/_timer.js
//=include _components/_animation.js
//=include _components/_helper.js
//=include _components/_menu.js

//=include _loading/_scene.js
//=include _scene/_initialize.js
//=include _loading/_data.js
//=include _loading/_side.js
//=include _loading/_select.js
//=include _loading/_stage.js
//=include _loading/_battle.js
//=include _loading/_setting.js
//=include _loading/_input.js
//=include _scene/_prebattle.js

//=include _battle/_scene.js
//=include _battle/_display.js
//=include _battle/_components.js
//=include _battle/_entity.js
//=include _battle/_player.js
//=include _battle/_engine.js
//=include _scene/_versus.js

//=include _training/_engine.js
//=include _training/_parameters.js
//=include _training/_display.js
//=include _training/_list.js
//=include _scene/_training.js

//=include _scene/_title.js
//=include _scene/_menu.js
//=include _scene/_side.js
//=include _scene/_select.js
//=include _scene/_stage.js
//=include _scene/_setting.js
//=include _scene/_input.js

//=include _dev/_loading.js
//=include _dev/_scene.js

/* Init */
window.addEventListener('load', oEvent => {
	// Store
	StoreEngine.init();
	/* ----- START PATCH ----- */
	// Modification du 07/05/2021
	Object.keys(StoreEngine.oData).forEach( sKey => {
		let aData = StoreEngine.get(sKey),
			bSet = false;
		const bArray = Array.isArray(aData),
			aNewData = [];
		(bArray ? aData : [aData]).forEach( oData => {
			if( (oData.sType == 'keyboard' || oData.sType == 'gamepad') && !oData.aOrder ){
				bSet = true;
				aNewData.push(Object.assign( { aOrder: GameSettings.oController.aOrderButtons }, oData ));
			};
		} );
		bSet && StoreEngine.update( sKey, bArray ? aNewData : aNewData[0] );
	} );
	/* ----- END PATCH ----- */

	// Input
	for( let nPlayer = 0; nPlayer < GameSettings.nPlayer; nPlayer++ ){
		KeyboardController.recover('IC_' + ( nPlayer + 1 ), GameSettings.oController.aKeyboard[nPlayer]);
	}
	// Output
	for( let sChannel in GameSettings.oAudio.oChannel ){
		OutputManager.oAudio.add( new OutputManager.OutputChannel('CHN__' + sChannel, GameSettings.oAudio.oChannel[sChannel]) );
	}
	// Scene
	SceneManager.set( new window[ GameSettings.sStartScene ]() );
	// Start
	GameEngine.start();
}, false);