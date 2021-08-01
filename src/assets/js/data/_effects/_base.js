/* ----- START DATA ----- */
/* ----- START INITIALIZE ----- */
/* ----- MENU GameData/GameData.oEntity ----- */
/* ----- DETAILS Constante avec les données des effets visuels déjà formatées. ----- */
GameData.oEntity.oEffect = {
    /* ----- START PROPERTIES ----- */
    /* ----- DETAILS Chemin d'accès aux SPRITES des effets visuels contenu dans [GameSettings](Technical_settings.md#technical_settingsopath). ----- */
    oPath: GameSettings.oPath.oEffect,
    /* ----- DETAILS Données des FRAMES ----- */
    oFrames: {
        explode_light_1: {
            sPath: 'explode_light_1.png'
        },
        explode_light_2: {
            sPath: 'explode_light_2.png'
        },
        explode_light_3: {
            sPath: 'explode_light_3.png'
        },
        explode_light_4: {
            sPath: 'explode_light_4.png'
        },
        explode_light_5: {
            sPath: 'explode_light_5.png'
        },

        explode_heavy_1: {
            sPath: 'explode_heavy_1.png'
        },
        explode_heavy_2: {
            sPath: 'explode_heavy_2.png'
        },
        explode_heavy_3: {
            sPath: 'explode_heavy_3.png'
        },
        explode_heavy_4: {
            sPath: 'explode_heavy_4.png'
        },
        explode_heavy_5: {
            sPath: 'explode_heavy_5.png'
        },

        impact_hit_1: {
            sPath: 'impact_hit_1.png'
        },
        impact_hit_2: {
            sPath: 'impact_hit_2.png'
        },
        impact_hit_3: {
            sPath: 'impact_hit_3.png'
        },
        impact_hit_4: {
            sPath: 'impact_hit_4.png'
        },

        impact_guard_1: {
            sPath: 'impact_guard_1.png'
        },
        impact_guard_2: {
            sPath: 'impact_guard_2.png'
        },
        impact_guard_3: {
            sPath: 'impact_guard_3.png'
        },
        impact_guard_4: {
            sPath: 'impact_guard_4.png'
        },

        cancel_1: {
            sPath: 'cancel_1.png'
        },
        cancel_2: {
            sPath: 'cancel_2.png'
        },
        cancel_3: {
            sPath: 'cancel_3.png'
        },
        cancel_4: {
            sPath: 'cancel_4.png'
        },
        cancel_5: {
            sPath: 'cancel_5.png'
        }
    },
    /* ----- DETAILS Données des animations ----- */
    oAnimations: {
        explode_light: {
            aFrames: [
                {
                    sFrame: 'explode_light_1',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_light_2',
                    nFrame: 6
                },
                {
                    sFrame: 'explode_light_3',
                    nFrame: 4
                },
                {
                    sFrame: 'explode_light_4',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_light_5',
                    nFrame: 2
                }
            ]
        },
        explode_heavy: {
            aFrames: [
                {
                    sFrame: 'explode_light_1',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_heavy_1',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_heavy_2',
                    nFrame: 8
                },
                {
                    sFrame: 'explode_heavy_3',
                    nFrame: 6
                },
                {
                    sFrame: 'explode_heavy_4',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_heavy_5',
                    nFrame: 2
                },
                {
                    sFrame: 'explode_light_5',
                    nFrame: 2
                }
            ]
        },
        impact_hit: {
            aFrames: [
                {
                    sFrame: 'impact_hit_1',
                    nFrame: 2
                },
                {
                    sFrame: 'impact_hit_2',
                    nFrame: 2
                },
                {
                    sFrame: 'impact_hit_3',
                    nFrame: 4
                },
                {
                    sFrame: 'impact_hit_4',
                    nFrame: 2
                }
            ]
        },
        impact_guard: {
            aFrames: [
                {
                    sFrame: 'impact_guard_1',
                    nFrame: 2
                },
                {
                    sFrame: 'impact_guard_2',
                    nFrame: 2
                },
                {
                    sFrame: 'impact_guard_3',
                    nFrame: 4
                },
                {
                    sFrame: 'impact_guard_4',
                    nFrame: 2
                }
            ]
        },

        cancel: {
            aFrames: [
                {
                    sFrame: 'cancel_1',
                    nFrame: 2
                },
                {
                    sFrame: 'cancel_2',
                    nFrame: 4
                },
                {
                    sFrame: 'cancel_3',
                    nFrame: 6
                },
                {
                    sFrame: 'cancel_4',
                    nFrame: 4
                },
                {
                    sFrame: 'cancel_5',
                    nFrame: 2
                }
            ]
        }
    },
    /* ----- END PROPERTIES ----- */
};
/* ----- END INITIALIZE ----- */
/* ----- END DATA ----- */