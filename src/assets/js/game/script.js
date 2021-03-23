//=include _menu.js
//=include _animation.js

//=include _scene/_loading.js
//=include _scene/_menu.js
//=include _scene/_select.js
//=include _scene/_battle.js
//=include _scene/_settings.js

/* Init */
window.addEventListener('load', oEvent => {
	// Input
	GAME.oSettings.aKeyboard.forEach( oButtons => GAME.oInput.create( oButtons ) );
	// Output
	GAME.oOutput.bAutoPositioning = true;
	// Scene
	GAME.oScene.set( new window[ GAME.oSettings.sStartScene ]() );
	// Start
	// .oTimer.setFPS(6);
	GAME.start();
}, false);