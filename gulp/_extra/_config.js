Object.assign(
    module.exports,  {
        oPath: {
            sFrames: 'characters',
            sData: 'data/_extra'
        },

        nSquare: 50,
        oRatio: {
            nWidth: 1,
            nHeight: 1
        },
        oPos: { nX: 24, nY: 45 },
        aBox: ['oPositionBox', 'aHurtBox', 'aHitBox'],
        aFilter: [
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
                sColor: 'rgb(0, 255, 0)',
                nAlpha: 0.4
            },
            {
                sSuffixe: 'invul',
                aFrame: ['blur', 'hit_luncher', 'recovery', 'reflect'/*, 'super_first', 'super_second', 'super_third'*/],
                sColor: 'rgb(255, 255, 255)',
                nAlpha: 0.4
            },
            {
                sSuffixe: 'filter',
                aFrame: ['hit_light', 'hit_heavy', 'hit_luncher'],
                sColor: /*'rgb(255, 102, 0)'*/'rgb(222, 0, 0)',
                nAlpha: 0.4
            },
            {
                sSuffixe: 'filter',
                aFrame: ['guard'],
                sColor: 'rgb(153, 51, 204)',
                nAlpha: 0.4
            }
        ],
        aFilterFrames: ['hit_light'],

        oChar: {
            BJT: {
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
            
            SRU: {
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

