//=include _components/_animation.js
//=include _components/_helper.js
//=include _components/_menu.js

//=include _loading/_scene.js
//=include _scene/_initialize.js
//=include _loading/_data.js
//=include _loading/_settings.js
//=include _loading/_select.js
//=include _loading/_battle.js
//=include _scene/_prebattle.js

//=include _battle/_scene.js
//=include _battle/_display.js
//=include _battle/_player.js
//=include _battle/_engine.js
//=include _scene/_versus.js

//=include _training/_engine.js
//=include _training/_parameters.js
//=include _training/_display.js
//=include _training/_list.js
//=include _scene/_training.js

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