/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
/* ----- DETAILS Singleton possedant toutes les paramètres du jeu, aussi bien figés que paramètrables, comme le chemin des ressources, la configuration des bouttons, la vie des entités, etc ----- */
function GameSettings(){}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    GameSettings,
    {
        /* ----- START SINGLETON ----- */

        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Technical Settings
        DETAILS Données techniques figées des paramétrages, comme les chemins des ressources, les réglages audios par défaut, etc
        ----- */

        /* ----- DETAILS Constante du nombre de joueur ----- */
        nPlayer: 2,
        /* ----- DETAILS Nom de la scene de départ ----- */
        sStartScene: 'InitializeScene',
        /* ----- DETAILS Constante des chemins techniques de chaques entités ----- */
        oPath: {
            oCharacter: {
                sRoot: 'assets/images/characters',
                sFrames: 'assets/images/characters',
                sFace: 'face.png',
                sPreview: 'stand_0.png'
            },
            oProjectile: {
                sRoot: 'assets/images/projectiles',
                sFrames: 'assets/images/projectiles'
            },
            oBeam: {
                sRoot: 'assets/images/beams',
                sFrames: 'assets/images/beams'
            },
            oEffect: {
                sRoot: 'assets/images/effects',
                sFrames: 'assets/images/effects'
            },
            oStage: {
                sRoot: 'assets/images/stages',
                sBackground: 'background.png',
                sPreview: 'preview.png'
            },
            oController: {
                sRoot: 'assets/images/controllers',
                sFrames: 'assets/images/controllers'
            },
            oAudio: {
                sRoot: 'assets/audios',
                sBGM: 'assets/audios/BGM',
                sSFX: 'assets/audios/SFX'
            }
        },
        /* ----- DETAILS Constante de filtre des effets visuels des SPRITES de personnage ----- */
        aFilter: [
            {
                sSuffixe: '_0',
                aFrames: ['stand_1', 'hit_2', 'hit_4', 'move_1', 'move_2', 'move_3', 'guard_0', 'guard_2'],
                oData: {
                    oStatus: {
                        bInvul: true
                    },
                    aHurtBox: null
                }
            },
            {
                sSuffixe: '_1',
                aFrames: ['hit_0', 'hit_1', 'hit_2'],
                oData: {}
            },
            {
                sSuffixe: '_2',
                aFrames: ['guard_0', 'guard_1'],
                oData: {
                    oStatus: {
                        bGuard: true
                    }
                }
            },
            {
                sSuffixe: '_3',
                aFrames: ['hit_0', 'hit_1'],
                oData: {}
            }
        ],
        /* ----- DETAILS Constante des POSITION_POINT de chaque entité ----- */
        oPositionPoint: {
            character: {
                nX: 98,
                nY: 182,
                nGapY: 200 - 182 - 2
            },
            projectile: {
                nX: 128,
                nY: 190
            },
            beam: {
                nX: 98,
                nY: 232
            },
            effect: {
                nX: 128,
                nY: 210
            }
        },
        /* ----- DETAILS Constante des choix de position sur le terrain en TRAINING ----- */
        oSide: {
            nDefault: 2,
            aSide: [
                {
                    sName: 'Left',
                    fPosition: (oArea, nIndex) => {
                        const oBoxArea = oArea.getBox(),
                            nLeft = oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX);

                        return {
                            nX: nIndex ? nLeft + 88 : -nLeft - 32
                        };
                    }
                },
                {
                    sName: 'Left reverse',
                    fPosition: (oArea, nIndex) => {
                        const oBoxArea = oArea.getBox(),
                            nLeft = oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX);

                        return {
                            nX: nIndex ? nLeft + 32 : -nLeft - 88 
                        };
                    }
                },
                {
                    sName: 'Middle',
                    fPosition: () => {
                        return { nX: 192 };
                    }
                },
                {
                    sName: 'Middle reverse',
                    fPosition: () => {
                        return { nX: -192 };
                    }
                },
                {
                    sName: 'Right',
                    fPosition: (oArea, nIndex) => {
                        const oBoxArea = oArea.getBox(),
                            nRight = oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

                            return {
                                nX: nIndex ? nRight - 32 : -nRight + 88
                            };
                    }
                },
                {
                    sName: 'Right reverse',
                    fPosition: (oArea, nIndex) => {
                        const oBoxArea = oArea.getBox(),
                            nRight = oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX);

                            return {
                                nX: nIndex ? nRight - 88 : -nRight + 32
                            };
                    }
                }
            ]
        },
        // INPUT
        /* ----- DETAILS Configuration des différents périphériques d'entrées ----- */
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
        },
        // OUTPUT
        /* ----- DETAILS Constante du volume par défaut de chaque canal de sortie AUDIO ----- */
        oAudio: {
            oChannel: {
                BGM: 5,
                SFX: 10
            },
            oInitialize: {
                BGM: ['Menu'],
                SFX: ['Move', 'Validate', 'Cancel']
            },
            oPreBattle: {
                BGM: ['Victory'/* BGM of STAGE */],
                SFX: ['Hit', 'Guard', 'Recovery', 'Beam', 'Projectile']
            }
        },
        /* ----- END PROPERTIES ----- */

        /* ----- START PROPERTIES ----- */
        /* -----
        SUBCATEGORY Game Settings
        DETAILS Données paramétrables de jeu, comme la vie, le KI, etc
        ----- */

        /* ----- DETAILS Nombre de FRAME lors d'un HIT FREEZE ----- */
        nFreeze: 6,
        /* ----- DETAILS PUSHBACK par défault appliqué lors d'un coup ----- */
        oPushback: {
            nLength: 4,
            nX: -24
        },
        // ENTITY
        /* ----- DETAILS Temps avant suppression d'un entité pour futur ROLLBACK ----- */
        nDie: 60,
        /* ----- DETAILS Nombre de point de vie pour chaque entité ----- */
        oLife: {
            player: 1000,
            character: 0,
            projectile: 1,
            beam: 0
        },
        /* ----- DETAILS Position lors d'un effet visuel sur une entité ----- */
        oPositionEffect: {
            nX: -24
        },
        // CHARACTER
        /* ----- DETAILS Nombre maximum de KI possible en combat ----- */
        nKi: 20,
        /* ----- DETAILS Paramétrage de l'animation d'un personnage LUNCHER ----- */
        oLauncher: {
            nLength: 36,
            nInvulnerable: 8,
            oMove: {
                nX: -63 * 4,
                nY: -54 * 4
            }
        },
        /* ----- DETAILS Paramétrage de l'animation d'un personnage JUMP ----- */
        oJump: {
            nLength: 36,
            oPre: {
                nJump: 8,
                nLanding: 8
            },
            oMove: {
                nX: 63 * 4,
                nY: -54 * 3
            }
        },
        /* ----- DETAILS Paramètrage de la distance de déplacement lors d'une relevé d'un personnage mis au sol ----- */
        nRecovery: 14,
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */