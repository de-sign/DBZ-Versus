Object.assign(
    module.exports,  {
        oPath: {
            oFrames: {
                oEffect: 'effects',
                oChar: 'characters'
            },
            sData: 'data/_extra'
        },

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
        aFilterFrames: [/*'hit_light', 'hit_heavy', 'hit_luncher', */'guard'],

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
                oRatio: {}
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
                oRatio: {}
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
                oRatio: {}
            },

            FRZ: {
                sType: 'oChar',
                sChar: 'FRZ',
                aColor: ['LSW_FRZ', 'CTM_MKR'],
                aFrames: [
                    ['stand', 'blur', 'backward', 'forward'],
                    ['jump', 'fall', null, 'guard', 'reflect', 'burst'],
                    ['hit_light', 'hit_heavy', 'hit_luncher', 'hit_fall', 'down', 'recovery'],
                    ['light_first', 'light_first_active', 'light_second', 'light_second_active', 'light_third', 'light_third_active'],
                    ['heavy', 'heavy_active', 'tracker', 'tracker_active', 'luncher', 'luncher_active'],
                    ['kikoha', 'ki_beam'],
                    ['super_first', 'super_second', 'super_third']
                ],
                oRatio: {}
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
                oRatio: {}
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
                oRatio: {}
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
                oRatio: {}
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
                oRatio: {}
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
                    }
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
                oRatio: {}
            },
        }
    }
);

