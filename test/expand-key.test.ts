import { byte } from '../src/utils/kuznechik/types';
import { expandKey } from '../src/utils/kuznechik/expandKey';
import { expect } from 'chai';

describe('expandKey function tests', () => {
    it('Create a key', () => {
        const test_key: byte[] = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const expected = {
            iter_c: [
                [
                    1, 148, 132, 221, 16,
                    189, 39, 93, 184, 122,
                    72, 108, 114, 118, 162,
                    110
                ],
                [
                    2, 235, 203, 121, 32,
                    185, 78, 186, 179, 244,
                    144, 216, 228, 236, 135,
                    220
                ],
                [
                    3, 127, 79, 164, 48, 4,
                    105, 231, 11, 142, 216, 180,
                    150, 154, 37, 178
                ],
                [
                    4, 21, 85, 242, 64, 177,
                    156, 183, 165, 43, 227, 115,
                    11, 27, 205, 123
                ],
                [
                    5, 129, 209, 47, 80, 12,
                    187, 234, 29, 81, 171, 31,
                    121, 109, 111, 21
                ],
                [
                    6, 254, 158, 139, 96, 8,
                    210, 13, 22, 223, 115, 171,
                    239, 247, 74, 167
                ],
                [
                    7, 106, 26, 86, 112,
                    181, 245, 80, 174, 165,
                    59, 199, 157, 129, 232,
                    201
                ],
                [
                    8, 42, 170, 39, 128, 161,
                    251, 173, 137, 86, 5, 230,
                    22, 54, 89, 246
                ],
                [
                    9, 190, 46, 250, 144, 28,
                    220, 240, 49, 44, 77, 138,
                    100, 64, 251, 152
                ],
                [
                    10, 193, 97, 94, 160, 24,
                    181, 23, 58, 162, 149, 62,
                    242, 218, 222, 42
                ],
                [
                    11, 85, 229, 131, 176,
                    165, 146, 74, 130, 216,
                    221, 82, 128, 172, 124,
                    68
                ],
                [
                    12, 63, 255, 213, 192,
                    16, 103, 26, 44, 125,
                    230, 149, 29, 45, 148,
                    141
                ],
                [
                    13, 171, 123, 8, 208, 173,
                    64, 71, 148, 7, 174, 249,
                    111, 91, 54, 227
                ],
                [
                    14, 212, 52, 172, 224,
                    169, 41, 160, 159, 137,
                    118, 77, 249, 193, 19,
                    81
                ],
                [
                    15, 64, 176, 113, 240, 20,
                    14, 253, 39, 243, 62, 33,
                    139, 183, 177, 63
                ],
                [
                    16, 84, 151, 78, 195, 129,
                    53, 153, 209, 172, 10, 15,
                    44, 108, 178, 47
                ],
                [
                    17, 192, 19, 147, 211, 60,
                    18, 196, 105, 214, 66, 99,
                    94, 26, 16, 65
                ],
                [
                    18, 191, 92, 55, 227, 56,
                    123, 35, 98, 88, 154, 215,
                    200, 128, 53, 243
                ],
                [
                    19, 43, 216, 234, 243,
                    133, 92, 126, 218, 34,
                    210, 187, 186, 246, 151,
                    157
                ],
                [
                    20, 65, 194, 188, 131,
                    48, 169, 46, 116, 135,
                    233, 124, 39, 119, 127,
                    84
                ],
                [
                    21, 213, 70, 97, 147, 141,
                    142, 115, 204, 253, 161, 16,
                    85, 1, 221, 58
                ],
                [
                    22, 170, 9, 197, 163,
                    137, 231, 148, 199, 115,
                    121, 164, 195, 155, 248,
                    136
                ],
                [
                    23, 62, 141, 24, 179, 52,
                    192, 201, 127, 9, 49, 200,
                    177, 237, 90, 230
                ],
                [
                    24, 126, 61, 105, 67, 32,
                    206, 52, 88, 250, 15, 233,
                    58, 90, 235, 217
                ],
                [
                    25, 234, 185, 180, 83,
                    157, 233, 105, 224, 128,
                    71, 133, 72, 44, 73,
                    183
                ],
                [
                    26, 149, 246, 16, 99,
                    153, 128, 142, 235, 14,
                    159, 49, 222, 182, 108,
                    5
                ],
                [
                    27, 1, 114, 205, 115,
                    36, 167, 211, 83, 116,
                    215, 93, 172, 192, 206,
                    107
                ],
                [
                    28, 107, 104, 155, 3,
                    145, 82, 131, 253, 209,
                    236, 154, 49, 65, 38,
                    162
                ],
                [
                    29, 255, 236, 70, 19,
                    44, 117, 222, 69, 171,
                    164, 246, 67, 55, 132,
                    204
                ],
                [
                    30, 128, 163, 226, 35, 40,
                    28, 57, 78, 37, 124, 66,
                    213, 173, 161, 126
                ],
                [
                    31, 20, 39, 63, 51, 149,
                    59, 100, 246, 95, 52, 46,
                    167, 219, 3, 16
                ],
                [
                    32, 168, 237, 156, 69,
                    193, 106, 241, 97, 155,
                    20, 30, 88, 216, 167,
                    94
                ]
            ],
            iter_key: [
                [
                    119, 102, 85, 68, 51,
                    34, 17, 0, 255, 238,
                    221, 204, 187, 170, 153,
                    136
                ],
                [
                    239, 205, 171, 137, 103,
                    69, 35, 1, 16, 50,
                    84, 118, 152, 186, 220,
                    254
                ],
                [
                    68, 140, 199, 140, 239, 106,
                    141, 34, 67, 67, 105, 21,
                    83, 72, 49, 219
                ],
                [
                    4, 253, 159, 10, 196,
                    173, 235, 21, 104, 236,
                    207, 233, 216, 83, 69,
                    61
                ],
                [
                    172, 241, 41, 244, 70,
                    146, 229, 211, 40, 94,
                    74, 196, 104, 100, 100,
                    87
                ],
                [
                    27, 88, 218, 52, 40, 232,
                    50, 181, 50, 100, 92, 22,
                    53, 148, 7, 189
                ],
                [
                    177, 152, 0, 90, 38, 39,
                    87, 112, 222, 69, 135, 126,
                    117, 64, 230, 81
                ],
                [
                    132, 249, 134, 34, 162,
                    145, 42, 215, 62, 221,
                    159, 123, 1, 37, 121,
                    90
                ],
                [
                    23, 229, 182, 205, 115,
                    47, 243, 165, 35, 49,
                    199, 120, 83, 226, 68,
                    187
                ],
                [
                    67, 64, 74, 142, 168,
                    186, 93, 117, 91, 244,
                    188, 22, 116, 221, 233,
                    114
                ]
            ]
        };

        const actual = expandKey(test_key);

        expect(actual).deep.eq(expected);
    });
});