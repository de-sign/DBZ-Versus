//=include _components/_store.js
//=include _components/_timer.js
//=include _components/_animation.js
//=include _components/_helper.js
//=include _components/_menu.js

//=include _loading/_scene.js
//=include _scene/_initialize.js
//=include _loading/_data.js
//=include _loading/_side.js
//=include _loading/_select.js
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
//=include _scene/_setting.js
//=include _scene/_input.js

/* Init */
window.addEventListener('load', oEvent => {
	// Store
	GameStore.init();
	// Input
	for( let nPlayer = 0; nPlayer < GAME.oSettings.nPlayer; nPlayer++ ){
		KeyboardController.recover('IC_' + ( nPlayer + 1 ), GAME.oSettings.oController.aKeyboard[nPlayer]);
	}
	// Output
	for( let sChannel in GAME.oSettings.oAudio.oChannel ){
		GAME.oOutput.oAudio.add( new GAME.oOutput.OutputChannel('CHN__' + sChannel, GAME.oSettings.oAudio.oChannel[sChannel]) );
	}
	// Scene
	GAME.oScene.set( new window[ GAME.oSettings.sStartScene ]() );
	// Start
	GAME.start();
}, false);