//=include _menu.js

//=include _scene/_menu.js
//=include _scene/_select.js
//=include _scene/_battle.js
//=include _scene/_settings.js

/* Init */
window.addEventListener('load', oEvent => {
	// Input
	GAME.oData.oSettings.aKeyboard.forEach( oButtons => GAME.oInput.create( oButtons ) );
	// Output
	GAME.oOutput.bAutoPositioning = true;
	// Scene
	GAME.oScene.set( new window[ GAME.oData.sStartScene ]() );
	// Start
	GAME.start()
}, false);