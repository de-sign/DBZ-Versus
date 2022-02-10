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
                aFrames: ['stand_1', 'hit_2', 'hit_4', 'move_1', 'move_2', 'move_3', 'guard_0', 'guard_2']
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
                        const nLeft = oArea.oPosition.nX - oArea.oPosition.originX,
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
                        const nRight = oArea.oPosition.nX + oArea.oPosition.width - oArea.oPosition.originX,
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
        /* ----- DETAILS Constante des groupes de commande dans la COMMAND LIST ----- */
        oList: {
            oGroup: {
                offense: 'Offensif options',
                defense: 'Defensif options',
                normal: 'Normal attacks',
                command: 'Command attacks',
                aerial: 'Aerial attacks',
                ki: 'Ki attacks'
            },
            aOrder: ['aerial', 'normal', 'command', 'ki', 'offense', 'defense']
        },
        // INPUT
        /* ----- DETAILS Configuration des différents périphériques d'entrées ----- */
        oController: {
            aOrderButtons: ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B', 'C', 'D', 'START'],
            nNeededButtons: 9,
            aKeyboard: [
                {
                    UP: 'KeyW',
                    DOWN: 'KeyS',
                    LEFT: 'KeyA',
                    RIGHT: 'KeyD',
                    A: 'KeyU',
                    B: 'KeyI',
                    C: 'KeyO',
                    D: 'KeyJ',
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
                    D: 'Numpad0',
                    START: 'Numpad5'
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
                D: 'Button0',
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
        oAnimations: {
            oType: {
                sDefault: 'action',
                aAll: [
                    'action', 'dash', 'cancel',
                    'stand', 'movement', 'jump', 'landing',
                    'guard', 'hit', 'launch',
                    'down', 'recovery',
                    'animation', 'restart'
                ],
                oMap: {
                    // frame: type
                }
            },
            oCategory: {
                aAll: [
                    'counter',
                    'stack',
                    'movement',
                    'hurt'
                ],
                aCanSetLength: ['hurt'],
                oMap: {
                    // type: category
                    'action': 'counter',
                    'dash': ['counter', 'stack'],
                    'cancel': 'stack',
                    'stand': 'movement',
                    'movement': 'movement',
                    'jump': 'stack',
                    'landing': 'stack',
                    'guard': ['hurt', 'guard'],
                    'hit': ['hurt', 'hit'],
                    'launch': ['hurt', 'hit'],
                    'down': 'down',
                    'recovery': null,
                    'animation': null,
                    'restart': null,
                }
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
        /* ----- DETAILS Parametrage lors d'un COUNTER ----- */
        oCounter: {
            // ----- Bonus de HITSTUN -----
            nStun: 4,
            // ----- Rallongement du HIT FREEZE -----
            nFreeze: 6 * 3,
            // ----- Affichage du TEXT -----
            oText: {
                sText: 'Counter !',
                nChar: 2,
                nFrameStep: 1,
                nLength: 21 + 10 // 10x2 via Slow => Length 41
            },
            // ----- Effect du COUNTER -----
            aEffect: [ {
                sType: 'slow',
                nSlow: 2,
                nDelay: 21,
                nLength: 10,
            } ]
        },

        // ENTITY
        /* ----- DETAILS Temps avant suppression d'un entité pour futur ROLLBACK ----- */
        nDie: 1, // 60
        /* ----- DETAILS
            Information pour chaque entité :
                Nombre de point de vie
                Position lors d'un effet visuel
                PositionPoint
                Information de vérification des collisions
        ----- */
        oBattleElement: {
            Effect: {
                nLife: 0,
                oPosition: {
                    nX: -24
                },
                oCheck: {}
            },
            Text: {
                nLength: 20,
                oPosition: {
                    nY: -192
                },
                oCheck: {}
            },
            Beam: {
                bPreload: true,
                nLife: 0,
                oPositionPoint: {
                    nX: 98,
                    nY: 232
                },
                oCheck: {
                    bCollapse: true,
                    oHurt: {},
                    bPushback: true
                }
            },
            Projectile: {
                bPreload: true,
                nLife: 100,
                oPositionPoint: {
                    nX: 128,
                    nY: 190
                },
                oCheck: {
                    oHurt: {
                        Projectile: true,
                        Beam: true
                    }
                }
            },
            Character: {
                bPreload: true,
                nLife: 0,
                oPositionPoint: {
                    nX: 100,
                    nY: 182,
                    nGapX: 4 * 4,
                    nGapY: 200 - 182 - 2
                },
                oCheck: {
                    bCollapse: true,
                    bReverse: true,
                    oHurt: {
                        Projectile: true,
                        Beam: true,
                        Character: true,
                        Player: true
                    },
                    bLaunch: true,
                    bPushback: true
                }
            },
            Player: {
                nLife: 1500,
                oPositionPoint: {
                    nX: 98,
                    nY: 182,
                    nGapX: 4 * 4,
                    nGapY: 200 - 182 - 2
                },
                oCheck: {
                    bCollapse: true,
                    bReverse: true,
                    oHurt: {
                        Projectile: true,
                        Beam: true,
                        Character: true,
                        Player: true
                    },
                    bLaunch: true,
                    bPushback: true
                }
            }
        },

        // CHARACTER
        /* ----- Paramétrage du gain de KI ----- */
        oKi: {
            nMax: 50,
            nBar: 10
        },
        /* ----- DETAILS Parametrages des COMMAND par défaut ----- */
        aCommandLevel: [
            // Level 0 - Technical
            {
                oHit: {
                    oDamage: {
                        nDamage: 0,
                        nScaling: 0,
                        nProration: 0,
                        nMinimumReduce: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        nFreeze: 7,
                        nStun: 0,
                        sAnimation: 'hit_0',
                        sImpact: false,
                        sText: null
                    },
                    oPushback: false
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 0,
                        nGive: 0
                    },
                    oStun: {
                        nFreeze: 7,
                        nStun: 0,
                        sAnimation: 'defense_4',
                        sImpact: false,
                        sText: null
                    },
                    oPushback: false
                }
            },
            // Default / Level 1 - Light
            {
                oHit: {
                    oDamage: {
                        nDamage: 25,
                        nScaling: 20,
                        nProration: 5,
                        nMinimumReduce: 10
                    },
                    oKi: {
                        nGain: 2,
                        nGive: 1
                    },
                    oStun: {
                        nFreeze: 7,
                        nStun: 12,
                        sAnimation: 'hit_0',
                        sImpact: 'impact_hit',
                        sText: 'パフ', // PAF
                    },
                    oPushback: {
                        nLength: 6,
                        nX: -24
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 0
                    },
                    oKi: {
                        nGain: 1,
                        nGive: 1
                    },
                    oStun: {
                        nFreeze: 7,
                        nStun: 10,
                        sAnimation: 'defense_j4',
                        sImpact: 'impact_guard',
                        sText: 'バム', // BAM
                    },
                    oPushback: {
                        nLength: 6,
                        nX: -24
                    }
                }
            },
            // Level 2 - Heavy
            {
                oHit: {
                    oDamage: {
                        nDamage: 50,
                        nScaling: 10
                    },
                    oStun: {
                        nFreeze: 8,
                        nStun: 15,
                        sAnimation: 'hit_1'
                    },
                    oPushback: {
                        nLength: 8,
                        nX: -32
                    }
                },
                oGuard: {
                    oStun: {
                        nFreeze: 8,
                        nStun: 12,
                        sAnimation: 'defense_4'
                    },
                    oPushback: {
                        nLength: 8,
                        nX: -32
                    }
                }
            },
            // Level 3 - Command Light
            {
                oHit: {
                    oDamage: {
                        nDamage: 75,
                        nScaling: 5
                    },
                    oStun: {
                        nFreeze: 9,
                        nStun: 18,
                        sAnimation: 'hit_1'
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                },
                oGuard: {
                    oStun: {
                        nFreeze: 9,
                        nStun: 14,
                        sAnimation: 'defense_4'
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                }
            },
            // Level 4 - Command Heavy
            {
                oHit: {
                    oDamage: {
                        nDamage: 100,
                        nScaling: 5
                    },
                    oStun: {
                        nFreeze: 10,
                        nStun: 21,
                        sAnimation: 'hit_2'
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                },
                oGuard: {
                    oStun: {
                        nFreeze: 10,
                        nStun: 16,
                        sAnimation: 'defense_4'
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                }
            },
            // Level 5 - Kikoha / Beam
            {
                oHit: {
                    oDamage: {
                        nDamage: 100,
                        nScaling: 5,
                        nProration: 5,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nFreeze: 12,
                        nStun: 21,
                        sAnimation: 'hit_0',
                        sImpact: 'explode_light',
                        sText: 'ブーム' // BOOM
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                },
                oGuard: {
                    oStun: {
                        nFreeze: 12,
                        nStun: 21,
                        sAnimation: 'defense_4',
                        sImpact: 'explode_light',
                        sText: 'ブーム' // BOOM
                    },
                    oPushback: {
                        nLength: 12,
                        nX: -48
                    }
                }
            },
            // Level 6 - Super
            {
                oHit: {
                    oDamage: {
                        nDamage: 300,
                        nScaling: 5,
                        nProration: 5,
                        nMinimumReduce: 40
                    },
                    oStun: {
                        nFreeze: 14,
                        nStun: 36,
                        sAnimation: 'hit_1',
                        sImpact: 'explode_heavy',
                        sText: 'ブーム' // BOOM
                    },
                    oPushback: {
                        nLength: 8,
                        nX: -192
                    }
                },
                oGuard: {
                    oDamage: {
                        nDamage: 100
                    },
                    oStun: {
                        nFreeze: 14,
                        nStun: 36,
                        sAnimation: 'defense_4',
                        sImpact: 'explode_heavy',
                        sText: 'ブーム' // BAM
                    },
                    oPushback: {
                        nLength: 8,
                        nX: -192
                    }
                }
            }
        ],
        /* ----- DETAILS Paramétrage de l'animation d'un personnage LUNCHER ----- */
        oLauncher: {
            nLength: 36,
            nInvulnerable: 8,
            oMove: {
                nX: -63 * 4,
                nY: -54 * 4
            },
            // (nLength / 2) - 1 frame car UPDATE AUTO
            nFallLength: (36 / 2) - 1
        },
        /* ----- DETAILS Paramétrage de l'animation d'un personnage JUMP ----- */
        oJump: {
            nLength: 36,
            oMove: {
                nDelay: 4,
                nX: 63 * 4,
                nY: -54 * 3
            },
            // (nLength / 2) + nDelay - 1 frame car UPDATE AUTO
            nFallLength: (36 / 2) + 4 - 1
        },
        /* ----- DETAILS Paramètrage de la distance de déplacement lors d'une relevé d'un personnage mis au sol ----- */
        nRecovery: 14,
        /* ----- END PROPERTIES ----- */
        /* ----- END SINGLETON ----- */
    }
);
/* ----- END CLASS ----- */