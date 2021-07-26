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
            oHud: {
                sRoot: 'assets/images/hud',
                sRound: 'assets/images/hud/round.png'
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
                nGapX: 4 * 4,
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
        /* ----- DETAILS Constante des ROUNDS ----- */
        oRound: {
            nDefault: 2,
            nMax: 10
        },
        /* ----- DETAILS Constante des choix de position sur le terrain en TRAINING ----- */
        oSide: {
            nDefault: 1,
            aSide: [
                {
                    sName: 'Left',
                    fPosition: (nIndex, bReverse, oArea) => {
                        const oBoxArea = oArea.getBox(),
                            nLeft = oArea.oPosition.nX + (oBoxArea.left - oBoxArea.originX),
                            aValue = bReverse ?
                                [32, 88] :
                                [88, 32];

                        return {
                            nX: nIndex ? nLeft + aValue[0] : -nLeft - aValue[1]
                        };
                    }
                },
                {
                    sName: 'Middle',
                    fPosition: (nIndex, bReverse, oArea) => {
                        return { nX: 192 * (bReverse ? -1 : 1) };
                    }
                },
                {
                    sName: 'Right',
                    fPosition: (nIndex, bReverse, oArea) => {
                        const oBoxArea = oArea.getBox(),
                            nRight = oArea.oPosition.nX + (oBoxArea.right - oBoxArea.originX),
                            aValue = bReverse ?
                                [88, 32] :
                                [32, 88];

                        return {
                            nX: nIndex ? nRight - aValue[0] : -nRight + aValue[1]
                        };
                    }
                }
            ]
        },
        // INPUT
        /* ----- DETAILS Configuration des différents périphériques d'entrées ----- */
        oController: {
            aOrderButtons: ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B', 'C', 'START'],
            nNeededButtons: 8,
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
            },
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

        /* ----- DETAILS Temps du TIMER ----- */
        nTimer: 99,
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
            player: 1500,
            character: 0,
            projectile: 100,
            beam: 0,
            text: 20 // Nombre de Frames avant disparition
        },
        /* ----- DETAILS Position lors d'un effet visuel sur une entité ----- */
        oPositionEffect: {
            effect: {
                nX: -24
            },
            text: {
                nY: -192
            }
        },
        // CHARACTER
        /* ----- DETAILS Paramétrage du gain de KI ----- */
        oKi: {
            nMax: 50,
            nBar: 10,
            oAttack: {
                nHit: 2,
                nGuard: 1
            },
            oDefend: {
                nHit: 1,
                nGuard: 1
            }
        },
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
                nJump: 4,
                nLanding: 4
            },
            oMove: {
                nX: 63 * 4,
                nY: -54 * 3
            }
        },
        /* ----- DETAILS Paramètrage de la distance de déplacement lors d'une relevé d'un personnage mis au sol ----- */
        nRecovery: 14,
        /* ----- DETAILS Parametrages des DAMAGES par défaut et du damage REDUCE ----- */
        oDamage: {
            nDefault: 25,
            // Percent !
            nReduce: 5,
            nMinimumReduce: 10
        },
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */