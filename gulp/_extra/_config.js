Object.assign(
    module.exports,  {
        oPath: {
            oFrames: {
                oEffect: 'effects',
                oChar: 'characters'
            },
            sData: 'data/_extra',
            oDoc: {
                sSrc: '.',
                sDest: 'doc'
            }
        },

        // DOC
        oRegExp: {
            rRegexp: /\/\* ----- START (CLASS|DATA) ----- \*\/[^]*?\/\* ----- END \1 ----- \*\//gm,
            nGroup: 0,
            oStructure: {
                sType: {
                    rRegexp: /\/\* ----- START (CLASS|DATA) ----- \*\/[^]*?\/\* ----- END \1 ----- \*\//gm,
                    nGroup: 1
                },
                sMenu: {
                    rRegexp: /\/\* ----- MENU([^]*?)----- \*\//gm,
                    nGroup: 1
                },
                // DATA
                oInitialize: {
                    rRegexp: /\/\* ----- START INITIALIZE ----- \*\/[^]*?\/\* ----- END INITIALIZE ----- \*\//gm,
                    nGroup: 0,
                    oStructure: {
                        sName: {
                            rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?(?:(.*)=[^]*?);/gm,
                            nGroup: 1
                        },
                        sDetails: {
                            rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?(?:.*=[^]*?);/gm,
                            nGroup: 1,
                            rRemove: /^\s*/gm
                        },
                        aProperties: {
                            rRegexp: /\/\* ----- START PROPERTIES ----- \*\/[^]*?\/\* ----- END PROPERTIES ----- \*\//gm,
                            nGroup: 0,
                            oStructure: {
                                // (?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(?:o.*:\s?\{[^]*?^\1\}|a.*:\s\[[^]*?^\1\]|.*:\s.*),
                                sName: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(?:(o.*):\s?\{[^]*?^\1\}|(a.*):\s\[[^]*?^\1\]|(.*):\s.*),/gm,
                                    nGroup: [2, 3, 4]
                                },
                                sDetails: {
                                    rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?( *?)(?:o.*:\s?\{[^]*?^\2\}|a.*:\s\[[^]*?^\2\]|.*:\s.*),/gm,
                                    nGroup: 1,
                                    rRemove: /^\s*/gm
                                },
                                sValue: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(?:o.*:\s?(\{[^]*?^\1\})|a.*:\s(\[[^]*?^\1\])|.*:\s(.*)),/gm,
                                    nGroup: [2, 3, 4],
                                    nRemove: 1
                                }
                            }
                        }
                    }
                },
                // CLASS
                oSingleton: {
                    rRegexp: /\/\* ----- START SINGLETON ----- \*\/[^]*?\/\* ----- END SINGLETON ----- \*\//gm,
                    nGroup: 0,
                    oStructure: {
                        aProperties: {
                            rRegexp: /\/\* ----- START PROPERTIES ----- \*\/[^]*?\/\* ----- END PROPERTIES ----- \*\//gm,
                            nGroup: 0,
                            oStructure: {
                                // (?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(?:o.*:\s?\{[^]*?^\1\}|a.*:\s\[[^]*?^\1\]|.*:\s.*),
                                sName: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]+?----- \*\/\s*?)?( *?)(?:(o.*):\s?\{[^]*?^\1\}|(a.*):\s\[[^]*?^\1\]|(.*):\s.*),/gm,
                                    nGroup: [2, 3, 4]
                                },
                                sDetails: {
                                    rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?( *?)(?:o.*:\s?\{[^]*?^\2\}|a.*:\s\[[^]*?^\2\]|.*:\s.*),/gm,
                                    nGroup: 1,
                                    rRemove: /^\s*/gm
                                },
                                sValue: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(?:o.*:\s?(\{[^]*?^\1\})|a.*:\s(\[[^]*?^\1\])|.*:\s(.*)),/gm,
                                    nGroup: [2, 3, 4],
                                    nRemove: 1
                                },
                                oSubCategory: {
                                    rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS[^]*?)?----- \*\//gm,
                                    nGroup: 0,
                                    oStructure: {
                                        sName: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY([^]*?)(?:DETAILS[^]*?)?----- \*\//gm,
                                            nGroup: 1
                                        },
                                        sDetails: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS([^]*?))?----- \*\//gm,
                                            nGroup: 1,
                                            rRemove: /^\s*/gm
                                        }
                                    }
                                }
                            }
                        },
                        aMethods: {
                            rRegexp: /\/\* ----- START METHODS ----- \*\/[^]*?\/\* ----- END METHODS ----- \*\//gm,
                            nGroup: 0,
                            oStructure: {
                                // (?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?).*?:\s?function\s?\(.*\)\s?\{(?:[^]*?^\1){0,1}?\}
                                sName: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(.*?):\s?function\s?\(.*\)\s?\{(?:[^]*?^\1){0,1}?\}/gm,
                                    nGroup: 2
                                },
                                sDetails: {
                                    rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?( *?).*?:\s?function\s?\(.*\)\s?\{(?:[^]*?^\2){0,1}?\}/gm,
                                    nGroup: 1,
                                    rRemove: /^\s*/gm
                                },
                                sArguments: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?).*?:\s?function\s?(\(.*\))\s?\{(?:[^]*?^\1){0,1}?\}/gm,
                                    nGroup: 2
                                },
                                oSubCategory: {
                                    rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS[^]*?)?----- \*\//gm,
                                    nGroup: 0,
                                    oStructure: {
                                        sName: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY([^]*?)(?:DETAILS[^]*?)?----- \*\//gm,
                                            nGroup: 1
                                        },
                                        sDetails: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS([^]*?))?----- \*\//gm,
                                            nGroup: 1,
                                            rRemove: /^\s*/gm
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                oConstructor: {
                    rRegexp: /\/\* ----- START CONSTRUCTOR ----- \*\/[^]*?\/\* ----- END CONSTRUCTOR ----- \*\//gm,
                    nGroup: 0,
                    oStructure: {
                        // (?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?^(?:\/\/\s?)?function (.*)(\(.*\))
                        sName: {
                            rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?^(?:\/\/\s?)?function (.*)\(.*\)/gm,
                            nGroup: 1
                        },
                        sDetails: {
                            rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?^(?:\/\/\s?)?function .*\(.*\)/gm,
                            nGroup: 1,
                            rRemove: /^\s*/gm
                        },
                        sArguments: {
                            rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?^(?:\/\/\s?)?function .*(\(.*\))/gm,
                            nGroup: 1
                        },
                        aProperties: {
                            rRegexp: /\/\* ----- START PROPERTIES ----- \*\/[^]*?\/\* ----- END PROPERTIES ----- \*\//gm,
                            nGroup: 0,
                            oStructure: {
                                sName: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?this\.(.*)?=[^]*?;/gm,
                                    nGroup: 1
                                },
                                sDetails: {
                                    rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?this\..*?=[^]*?;/gm,
                                    nGroup: 1,
                                    rRemove: /^\s*/gm
                                },
                                sValue: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?this\..*?=([^]*?);/gm,
                                    nGroup: 1
                                },
                                oSubCategory: {
                                    rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS[^]*?)?----- \*\//gm,
                                    nGroup: 0,
                                    oStructure: {
                                        sName: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY([^]*?)(?:DETAILS[^]*?)?----- \*\//gm,
                                            nGroup: 1
                                        },
                                        sDetails: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS([^]*?))?----- \*\//gm,
                                            nGroup: 1,
                                            rRemove: /^\s*/gm
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                sExtend: {
                    rRegexp: /\/\* ----- START EXTENDS ----- \*\/[^]*?Object\.create\((.*?).prototype\)[^]*?\/\* ----- END EXTENDS ----- \*\//gm,
                    nGroup: 1
                },
                oPrototype: {
                    rRegexp: /\/\* ----- START PROTOTYPE ----- \*\/[^]*?\/\* ----- END PROTOTYPE ----- \*\//gm,
                    nGroup: 0,
                    oStructure: {
                        aMethods: {
                            rRegexp: /\/\* ----- START METHODS ----- \*\/[^]*?\/\* ----- END METHODS ----- \*\//gm,
                            nGroup: 0,
                            oStructure: {
                                // (?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?).*?:\s?function\s?\(.*\)\s?\{(?:[^]*?^\1){0,1}?\}
                                sName: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?)(.*?):\s?function\s?\(.*\)\s?\{(?:[^]*?^\1){0,1}?\}/gm,
                                    nGroup: 2
                                },
                                sDetails: {
                                    rRegexp: /(?:\/\* ----- DETAILS([^]*?)----- \*\/\s*?)?( *?).*?:\s?function\s?\(.*\)\s?\{(?:[^]*?^\2){0,1}?\}/gm,
                                    nGroup: 1,
                                    rRemove: /^\s*/gm
                                },
                                sArguments: {
                                    rRegexp: /(?:\/\* ----- DETAILS[^]*?----- \*\/\s*?)?( *?).*?:\s?function\s?(\(.*\))\s?\{(?:[^]*?^\1){0,1}?\}/gm,
                                    nGroup: 2
                                },
                                oSubCategory: {
                                    rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS[^]*?)?----- \*\//gm,
                                    nGroup: 0,
                                    oStructure: {
                                        sName: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY([^]*?)(?:DETAILS[^]*?)?----- \*\//gm,
                                            nGroup: 1
                                        },
                                        sDetails: {
                                            rRegexp: /\/\* -----\s*?SUBCATEGORY[^]*?(?:DETAILS([^]*?))?----- \*\//gm,
                                            nGroup: 1,
                                            rRemove: /^\s*/gm
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        // SPRITE & DATA
        oSquare: {
            oEffect: 64,
            oChar: 50
        },
        oRatio: {
            nWidth: 1,
            nHeight: 1
        },
        oPos: {
            oEffect: { nX: 32, nY: 52 },
            oChar: { nX: 24, nY: 45 }
        },
        aBox: ['oPositionBox', 'aHurtBox', 'aHitBox'],
        oFilter: {
            oEffect: [],
            oChar: [
                /*{
                    sSuffixe: 'filter',
                    aFrame: ['light_first', 'light_second', 'light_third', 'heavy', 'tracker', 'luncher'],
                    sColor: 'rgb(255, 0, 0)',
                    nAlpha: 0.4
                },
                */
                {
                    sSuffixe: 'throw',
                    aFrame: ['hit_light'],
                    sColor: 'rgb(153, 51, 204)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: 'invul',
                    aFrame: ['blur', 'hit_luncher', 'recovery', 'reflect', 'guard'/*, 'super_first', 'super_second', 'super_third'*/],
                    sColor: 'rgb(255, 255, 255)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: 'filter',
                    aFrame: ['hit_light', 'hit_heavy', 'hit_luncher'],
                    sColor: 'rgb(255, 102, 0)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: 'filter',
                    aFrame: ['guard'],
                    sColor: 'rgb(0, 102, 255)',
                    nAlpha: 0.4
                }
            ]
        },
        oNewFilter: {
            oChar: [
                {
                    sSuffixe: '_0',
                    aFrame: ['stand_1', 'hit_2', 'hit_4', 'move_1', 'move_2', 'move_3', 'guard_0', 'guard_2'],
                    sColor: 'rgb(255, 255, 255)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: '_1',
                    aFrame: ['hit_0', 'hit_1', 'hit_2'],
                    sColor: 'rgb(255, 102, 0)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: '_2',
                    aFrame: ['guard_0', 'guard_1'],
                    sColor: 'rgb(0, 102, 255)',
                    nAlpha: 0.4
                },
                {
                    sSuffixe: '_3',
                    aFrame: ['hit_0', 'hit_1'],
                    sColor: 'rgb(153, 51, 204)',
                    nAlpha: 0.4
                }
            ]
        },
        aFilterFrames: [/*'hit_light', 'hit_heavy', 'hit_luncher', 'guard'*/],

        aEntity: ['oEffect', 'oChar'],
        oEffect: {
            FX: {
                sType: 'oEffect',
                aColor: [null],
                aFrames: [
                    ['explode_light_1', 'explode_light_2', 'explode_light_3', 'explode_light_4', 'explode_light_5'],
                    ['explode_heavy_1', 'explode_heavy_2', 'explode_heavy_3', 'explode_heavy_4', 'explode_heavy_5'],
                    ['impact_hit_1', 'impact_hit_2', 'impact_hit_3', 'impact_hit_4'],
                    ['impact_guard_1', 'impact_guard_2', 'impact_guard_3', 'impact_guard_4']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            }
        },

        oChar: {
            BJT: {
                sType: 'oChar',
                sChar: 'BJT',
                aColor: ['LSW_SSJ', 'LSW_BAD'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward', 'forward_inverse'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            BUU: {
                sType: 'oChar',
                sChar: 'BUU',
                aColor: ['LSW_MBU', 'LSW_SBU'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', 'pre_jump', 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha', null, 'tracker_second', 'tracker_second_active'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            FRZ: {
                sType: 'oChar',
                sChar: 'FRZ',
                aColor: ['LSW_FRZ'/*, 'CTM_MKR'*/, 'SWP_FRT'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha', 'ki_beam'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            GHN: {
                sType: 'oChar',
                sChar: 'GHN',
                aColor: ['LSW_SNS', 'LSW_SSJ'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'tracker_second', 'tracker_second_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            GKU: {
                sType: 'oChar',
                sChar: 'GKU',
                aColor: ['CTM_TRN', 'LSW_TRN', 'LSW_GNU'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            GKU_SSJ: {
                sType: 'oChar',
                sChar: 'GKU_SSJ',
                aColor: ['CTM_SSJ', 'CTM_BRK', 'LSW_SSJ'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            KID_GHN: {
                sType: 'oChar',
                sChar: 'KID_GHN',
                aColor: ['LSW_SSJT', 'LSW_TRN'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', 'pre_jump', 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha', null, 'tracker_second', 'tracker_second_active'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },

            MJN_BUU: {
                sType: 'oChar',
                sChar: 'MJN_BUU',
                aColor: ['LSW_MJB', 'LSW_PKR'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active'],
                    ['heavy', 'heavy_active', null, null, 'luncher', 'luncher_active'],
                    ['tracker', 'tracker_second', 'kikoha', 'super_first', 'super_second', 'super_third'],
                    ['tracker_1', null, 'tracker_2', null, 'tracker_active'],
                    ['tracker_second_active', null, 'tracker_second_2', null, 'tracker_second_1']
                ],
                oRatio: {
                    tracker_1: {
                        nWidth: 2,
                        nHeight: 1
                    },
                    tracker_2: {
                        nWidth: 2,
                        nHeight: 1
                    },
                    tracker_active: {
                        nWidth: 2,
                        nHeight: 1
                    },
                    tracker_second_1: {
                        nWidth: 2,
                        nHeight: 1
                    },
                    tracker_second_2: {
                        nWidth: 2,
                        nHeight: 1
                    },
                    tracker_second_active: {
                        nWidth: 2,
                        nHeight: 1
                    },

                    // MIGRATE
                    hit_6: { nHeight: 2 },

                    attack_5_0: { nX: 0 }, // 'tracker_second',
                    attack_5_1: { nX: 0, nWidth: 2 }, // 'tracker_second_1',
                    attack_5_2: { nX: 1, nWidth: 2 }, // 'tracker_second_2',
                    attack_5_3: { nX: 2, nWidth: 2 }, // 'tracker_second_active',
                    attack_5_4: { nX: 3, nWidth: 2 }, // 'tracker_2',
                    attack_5_5: { nX: 4, nWidth: 2 }, // 'tracker_1',
                    attack_5_6: { nX: 5 }, // 'tracker',

                    attack_6_0: { nX: 0, nWidth: 2 }, // 'tracker_2',
                    attack_6_1: { nX: 1, nWidth: 2 }, // 'tracker_active',
                    attack_6_2: { nX: 2, nWidth: 2 }, // 'tracker_2',
                    attack_6_3: { nX: 3, nWidth: 2 }, // 'tracker_1',
                    attack_6_4: { nX: 4 } // 'tracker',
                }
            },
            
            SRU: {
                sType: 'oChar',
                sChar: 'SRU',
                aColor: ['LSW_PFC', 'LSW_SRU'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha', 'ki_beam'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {
                    hit_6: { nHeight: 2 }
                }
            },
        },

        oMigrate: {
            oCanvas: {
                nWidth: 50 * 7,
                nHeight: 50 * 14
            },
            aFrames: [
                ['stand_0', 'stand_1'],
                ['move_0', 'move_1', 'move_2', 'move_3'],
                ['jump_0', 'jump_1', 'jump_2', 'jump_3', 'jump_4'],
                ['guard_0', 'guard_1', 'guard_2', nuull, null, null, 'hit_6'],
                ['hit_0', 'hit_1', 'hit_2', 'hit_3', 'hit_4', 'hit_5'],
                ['throw_0', 'throw_1', 'throw_2'],
                ['ki_0_0', 'ki_0_1', 'ki_1_0', 'ki_1_1', 'ki_1_2'],
                ['attack_0_0', 'attack_0_1', 'attack_0_2', 'attack_0_3', 'attack_0_4', 'attack_0_5', 'attack_0_6'],
                ['attack_1_0', 'attack_1_1', 'attack_1_2', 'attack_1_3', 'attack_1_4', 'attack_1_5', 'attack_1_6'],
                ['attack_2_0', 'attack_2_1', 'attack_2_2', 'attack_2_3', 'attack_2_4', 'attack_2_5', 'attack_2_6'],
                ['attack_3_0', 'attack_3_1', 'attack_3_2', 'attack_3_3', 'attack_3_4', 'attack_3_5', 'attack_3_6'],
                ['attack_4_0', 'attack_4_1', 'attack_4_2', 'attack_4_3', 'attack_4_4', 'attack_4_5', 'attack_4_6'],
                ['attack_5_0', 'attack_5_1', 'attack_5_2', 'attack_5_3', 'attack_5_4', 'attack_5_5', 'attack_5_6'],
                ['attack_6_0', 'attack_6_1', 'attack_6_2', 'attack_6_3', 'attack_6_4', 'attack_6_5', 'attack_6_6']
            ],
            
            oMapping: {
                stand_0: 'stand',
                stand_1: 'blur',

                move_0: 'backward',
                move_1: 'forward',
                move_2: 'burst',
                move_3: 'recovery',

                jump_0: 'pre_jump',
                jump_1: 'fall',
                jump_2: 'jump',
                jump_3: 'fall',
                jump_4: 'pre_jump',
                
                guard_0: 'guard',
                guard_1: 'pre_jump',
                guard_2: 'reflect',

                hit_0: 'hit_light',
                hit_1: 'hit_heavy',
                hit_2: 'hit_luncher',
                hit_3: 'hit_fall',
                hit_4: 'down',

                throw_0: 'reflect',
                throw_1: 'guard',

                ki_0_0: 'kikoha',
                ki_0_1: 'ki_beam',
                ki_1_0: 'super_first',
                ki_1_1: 'super_second',
                ki_1_2: 'super_third',

                attack_0_0: 'pre_jump',
                attack_0_1: 'jump_light',
                attack_0_2: 'jump_light_active',
                attack_0_3: 'jump_light_second',
                attack_0_4: 'jump_light_second_active',
                attack_0_5: 'jump',

                attack_1_0: 'jump',
                attack_1_1: 'fall',
                attack_1_2: 'jump_heavy',
                attack_1_3: 'jump_heavy_active',
                attack_1_4: 'jump',

                attack_2_0: 'light_first',
                attack_2_1: 'light_first_active',
                attack_2_2: 'light_second',
                attack_2_3: 'light_second_active',
                attack_2_4: 'light_third',
                attack_2_5: 'light_third_active',

                attack_3_0: 'heavy',
                attack_3_1: 'heavy_active',
                attack_3_2: 'heavy_second',
                attack_3_3: 'heavy_second_active',
                
                attack_4_0: 'jump',
                attack_4_1: 'luncher',
                attack_4_2: 'luncher_active',
                attack_4_3: 'jump',

                attack_5_0: 'tracker',
                attack_5_1: 'tracker_active',
                attack_5_2: 'tracker_second',
                attack_5_3: 'tracker_second_active',
                attack_5_4: 'tracker_third',
                attack_5_5: 'tracker_third_active',
                attack_5_6: 'tracker_extra',

                attack_6_0: 'extra',
                attack_6_1: 'extra_active',
                attack_6_2: 'extra_second',
                attack_6_3: 'extra_second_active',
                attack_6_4: 'extra_third',
                attack_6_5: 'extra_third_active',
                attack_6_6: 'extra_extra',
            },
            
            oChar: {
                BJT: {
                    jump_light: 'heavy',
                    jump_light_active: 'heavy_active',
                    heavy: 'forward_inverse',
                    heavy_active: 'heavy',
                    heavy_second: 'heavy_active',
                    tracker: 'forward',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'forward'
                },

                BUU: {
                    jump_light: 'tracker',
                    jump_light_active: 'tracker_active',
                    jump_light_second: 'tracker_second',
                    jump_light_second_active: 'tracker_second_active',
                    light_third: false,
                    light_third_active: false,
                    tracker: 'pre_jump',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'tracker_second',
                    tracker_third: 'tracker_second_active',
                    tracker_third_active: 'jump',
                    extra: 'forward',
                    extra_active: 'light_third',
                    extra_second: 'light_third_active',
                    extra_second_active: 'forward'
                },

                FRZ: {
                    light_third: false,
                    light_third_active: false,
                    tracker: 'forward',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'forward',
                    extra: 'light_third',
                    extra_active: 'light_third_active'
                },

                GHN: {
                    tracker: 'forward',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'forward',
                    tracker_third: 'tracker_second',
                    tracker_third_active: 'tracker_second_active'
                },

                GKU: {
                    tracker: 'forward',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'forward'
                },

                GKU_SSJ: {
                    tracker: 'forward',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'forward'
                },

                KID_GHN: {
                    jump_light: 'tracker',
                    jump_light_active: 'tracker_active',
                    jump_light_second: 'tracker_second',
                    jump_light_second_active: 'tracker_second_active',
                    tracker: 'pre_jump',
                    tracker_active: 'tracker',
                    tracker_second: 'tracker_active',
                    tracker_second_active: 'tracker_second',
                    tracker_third: 'tracker_second_active',
                    tracker_third_active: 'jump'
                },

                MJN_BUU: {
                    tracker: 'tracker_second',
                    tracker_active: 'tracker_second_1',
                    tracker_second: 'tracker_second_2',
                    tracker_second_active: 'tracker_second_active',
                    tracker_third: 'tracker_2',
                    tracker_third_active: 'tracker_1',
                    tracker_extra: 'tracker',
                    
                    extra: 'tracker_2',
                    extra_active: 'tracker_active',
                    extra_second: 'tracker_2',
                    extra_second_active: 'tracker_1',
                    extra_third: 'tracker',
                },

                SRU: {
                    light_third: false,
                    light_third_active: false,
                    tracker: 'forward',
                    tracker_active: 'light_third',
                    tracker_second: 'light_third_active',
                    tracker_second_active: 'forward',
                    extra: 'forward',
                    extra_active: 'tracker',
                    extra_second: 'tracker_active',
                    extra_second_active: 'forward'
                }
            }
        }
    }
);

