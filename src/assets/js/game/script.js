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
//=include _loading/_training.js
//=include _loading/_setting.js
//=include _loading/_input.js
//=include _scene/_prebattle.js

//=include _battle/_scene.js
//=include _battle/_display.js
//=include _battle/_inputbuffer/_engine.js
//=include _battle/_inputbuffer/_local.js
//=include _battle/_inputbuffer/_dummy.js
//=include _battle/_components/_gatling.js
//=include _battle/_components/_movement.js
//=include _battle/_components/_timer.js
//=include _battle/_entity/_entity.js
//=include _battle/_entity/_player.js
//=include _battle/_entity/_beam.js
//=include _battle/_entity/_projectile.js
//=include _battle/_entity/_character.js
//=include _battle/_entity/_effect.js
//=include _battle/_engine.js
//=include _scene/_versus.js

//=include _training/_engine.js
//=include _training/_menu.js
//=include _training/_settings.js
//=include _training/_gauges.js
//=include _training/_dummy.js
//=include _training/_restart.js
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
	Object.keys(StoreEngine.oData).forEach( sKey => {

		// Modification du 23/06/2021
		const aKey = sKey.split('_');
		if( aKey[0] == 'Parameters' || aKey.length == 1 ){
			StoreEngine.remove(sKey);
		}
		// Modification du 07/05/2021
		else {
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
		}
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