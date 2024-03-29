//=include _components/_timer.js
//=include _components/_alert.js
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
//=include _battle/_inputbuffer/_engine.js
//=include _battle/_inputbuffer/_local.js
//=include _battle/_inputbuffer/_dummy.js
//=include _battle/_components/_damage.js
//=include _battle/_components/_gatling.js
//=include _battle/_components/_movement.js
//=include _battle/_entity/_element.js
//=include _battle/_entity/_effect.js
//=include _battle/_entity/_text.js
//=include _battle/_entity/_entity.js
//=include _battle/_entity/_beam.js
//=include _battle/_entity/_projectile.js
//=include _battle/_entity/_character.js
//=include _battle/_entity/_player.js
//=include _battle/_engine.js
//=include _battle/_display/_hud.js
//=include _battle/_display/_effect.js
//=include _battle/_display/_text.js
//=include _battle/_display/_timer.js
//=include _battle/_display/_engine.js
//=include _scene/_versus.js

//=include _training/_engine.js
//=include _training/_menu.js
//=include _training/_settings.js
//=include _training/_gauges.js
//=include _training/_opponent.js
//=include _training/_records.js
//=include _training/_restart.js
//=include _training/_reversals.js
//=include _training/_display.js
//=include _training/_list.js
//=include _scene/_training.js

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
	// Component
	StoreEngine.init();

	// Patch
	const nVersion = StoreEngine.get('SYS') ? StoreEngine.get('SYS').nVersion : 0;
	if( nVersion < 20221031 ){
		localStorage.clear();
		StoreEngine.update('SYS', { nVersion: 20221031 } );
	}

	// Input
	ControllerManager.setLayout('IPT__Menu');
	for( let nPlayer = 0; nPlayer < GameSettings.nPlayer; nPlayer++ ){
		KeyboardController.recover(nPlayer, GameSettings.oController.aKeyboard[nPlayer]);
	}
	window.addEventListener('gamepadconnected', oEvent => {
		if( !GamepadController.oIndexCreate[oEvent.gamepad.index] ){
			if( oEvent.gamepad.buttons.length >= GameSettings.oController.nNeededButtons ){
				GamepadController.recover( oEvent.gamepad, GameSettings.oController.oGamepad );
			} else {
				GameAlert.show( [
					'Unable to set up new device detected :',
					'"' + oEvent.gamepad.id + '" has ' + oEvent.gamepad.buttons.length + ' buttons and the game needs ' + GameSettings.oController.nNeededButtons + ' buttons at less.'
				], true);
				GamepadController.oIndexCreate[oEvent.gamepad.index];
			}
		}
	}, false);

	// Output
	for( let sChannel in GameSettings.oAudio.oChannel ){
		OutputManager.oAudio.add( new OutputManager.OutputChannel('CHN__' + sChannel, GameSettings.oAudio.oChannel[sChannel]) );
	}

	// Scene
	SceneManager.set( new window[ GameSettings.sStartScene ]() );

	// Start
	GameEngine.start();
	GameAlert.init();
}, false);

/* Error */
window.addEventListener('error', oEvent => {
	GameAlert.show(oEvent.error.stack);
}, false);