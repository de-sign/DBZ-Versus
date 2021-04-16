Object.assign(
    GAME,
    {
        oSettings: {
            
            // Technique
            nPlayer: 2,
            sStartScene: 'InitializeScene',
            oPath: {
                oCharacter: {
                    sRoot: 'assets/images/characters',
                    sFace: 'assets/images/characters/face',
                    sFrames: 'assets/images/characters/frames',
                    sPreview: 'assets/images/characters/preview'
                },
                oProjectile: {
                    sRoot: 'assets/images/projectiles',
                    sFrames: 'assets/images/projectiles'
                },
                oBeam: {
                    sRoot: 'assets/images/beams',
                    sFrames: 'assets/images/beams'
                },
                oStage: {
                    sRoot: 'assets/images/stages',
                    sBackground: 'assets/images/stages/background',
                    sPreview: 'assets/images/stages/preview'
                },
                oController: {
                    sRoot: 'assets/images/controllers',
                    sFrames: 'assets/images/controllers'
                }
            },
            oPositionPoint: {
                character: {
                    nX: 98,
                    nY: 182,
                    nGapY: 200 - 182 - 2
                },
                projectile: {
                    nX: 64,
                    nY: 126
                },
                beam: {
                    nX: 98,
                    nY: 232
                }
            },

            // Game
            nDistance: 256,
            nFreeze: 6,
            oPushback: {
                nLength: 4,
                nX: -24
            },
            // ENTITY
            nDie: 60,
            oLife: {
                player: 30,
                character: 0,
                projectile: 1,
                beam: 0
            },
            // CHARACTER
            nKi: 20,
            oLuncher: {
                nLength: 36,
                nInvulnerable: 8,
                oMove: {
                    nX: -63 * 4,
                    nY: -54 * 4
                },
                oFrames: {
                    sLunch: 'hit_luncher',
                    sFall: 'hit_fall'
                }
            },
            oRecovery: {
                backward: {
                    nLength: 1,
                    nX: -192
                },
                forward: {
                    nLength: 1,
                    nX: 192
                }
            },
            // INPUT
            oController: {
                aOrderButtons: ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B', 'C', 'START'],
                aKeyboard: [
                    {
                        UP: 'KeyW',
                        DOWN: 'KeyS',
                        LEFT: 'KeyA',
                        RIGHT: 'KeyD',
                        A: 'KeyU',
                        B: 'KeyI',
                        C: 'KeyO',
                        START: 'Enter'
                    },
                    {
                        UP: 'ArrowUp',
                        DOWN: 'ArrowDown',
                        LEFT: 'ArrowLeft',
                        RIGHT: 'ArrowRight',
                        A: 'Numpad1',
                        B: 'Numpad2',
                        C: 'Numpad3',
                        START: 'Numpad0'
                    }
                ],
                oGamepad: {
                    /*
                    UP: 'Axe-1',
                    DOWN: 'Axe+1',
                    LEFT: 'Axe-0',
                    RIGHT: 'Axe+0',
                    */
                    UP: 'Button12',
                    DOWN: 'Button13',
                    LEFT: 'Button14',
                    RIGHT: 'Button15',
                    A: 'Button2',
                    B: 'Button3',
                    C: 'Button1',
                    START: 'Button9'
                }
            }
        },

        oData: {
            oEntity: {},
            oCharacter: {},
            oProjectile: {},
            oBeam: {},
            oStage: {
                GZA: {
                    sCod: 'GZA',
                    sName: 'Gizādo Arano',
                    sColor: '#90D0F8'
                },
                NMK: {
                    sCod: 'NMK',
                    sName: 'Namekku-sei',
                    sColor: '#A8D880'
                },
                STH: {
                    sCod: 'STH',
                    sName: 'Seishin to Toki no Heya',
                    sColor: '#F8F8F8'
                },
                KSK: {
                    sCod: 'KSK',
                    sName: 'Kaiōshin-kai',
                    sColor: '#F098F8'
                }
            }
        }
    }
);

//=include projectile.js
//=include _projectiles/_ALL.js

//=include beam.js
//=include _beams/_ALL.js

//=include character.js
//=include _characters/_GKU.js
//=include _characters/_BJT.js
//=include _characters/_GHA.js
//=include _characters/_GHC.js
//=include _characters/_FRZ.js
//=include _characters/_SRU.js
//=include _characters/_BUU.js