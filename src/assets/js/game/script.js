//=include _menu.js
//=include _animation.js

//=include _scene/_initialize.js
//=include _initialize/_settings.js
//=include _initialize/_select.js
//=include _initialize/_battle.js

//=include _battle/_scene.js
//=include _battle/_display.js
//=include _battle/_player.js
//=include _battle/_engine.js
//=include _scene/_versus.js

//=include _training/_engine.js
//=include _training/_parameters.js
//=include _training/_display.js
//=include _scene/_training.js

//=include _scene/_loading.js
//=include _scene/_menu.js
//=include _scene/_select.js
//=include _scene/_settings.js

/* Init */
window.addEventListener('load', oEvent => {
	// Input
	GAME.oSettings.aKeyboard.forEach( oButtons => GAME.oInput.create( oButtons ) );
	// Scene
	GAME.oScene.set( new window[ GAME.oSettings.sStartScene ]() );
	// Start
	// GAME.oTimer.setFPS(6);
	GAME.start();
}, false);