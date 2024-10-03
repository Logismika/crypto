import { byte, GOST_Kuz_F, GOST_Kuz_Get_C, GOST_Kuz_GF_mul, GOST_Kuz_L, vect } from '../src/utils/kuznechik';
import { expect } from "chai";

describe('GOST Function Tests', () => {
    describe("GOST_Kuz_GF_mul", () => {
        const testData: { in_a: byte, in_b: byte, c: byte }[] = [
            { in_a: 92, in_b: 133, c: 45 },
            { in_a: 200, in_b: 16, c: 221 },
            { in_a: 113, in_b: 194, c: 114 },
            { in_a: 64, in_b: 192, c: 183 },
            { in_a: 67, in_b: 1, c: 67 },
            { in_a: 31, in_b: 251, c: 27 },
            { in_a: 15, in_b: 1, c: 15 },
            { in_a: 144, in_b: 192, c: 240 },
            { in_a: 181, in_b: 194, c: 165 },
            { in_a: 245, in_b: 16, c: 139 },
            { in_a: 139, in_b: 133, c: 92 },
            { in_a: 206, in_b: 32, c: 185 },
            { in_a: 110, in_b: 148, c: 239 },
            { in_a: 139, in_b: 1, c: 139 },
            { in_a: 194, in_b: 148, c: 157 },
            { in_a: 237, in_b: 32, c: 83 },
            { in_a: 32, in_b: 133, c: 205 },
            { in_a: 92, in_b: 16, c: 137 },
            { in_a: 200, in_b: 194, c: 134 },
            { in_a: 113, in_b: 192, c: 144 },
            { in_a: 64, in_b: 1, c: 64 },
            { in_a: 67, in_b: 251, c: 161 },
            { in_a: 31, in_b: 1, c: 31 },
            { in_a: 15, in_b: 192, c: 202 },
            { in_a: 144, in_b: 194, c: 19 },
            { in_a: 181, in_b: 16, c: 1 },
            { in_a: 245, in_b: 133, c: 117 },
            { in_a: 139, in_b: 32, c: 206 },
            { in_a: 206, in_b: 148, c: 162 },
            { in_a: 110, in_b: 1, c: 110 },
            { in_a: 205, in_b: 148, c: 221 },
            { in_a: 194, in_b: 32, c: 250 },
            { in_a: 237, in_b: 133, c: 80 },
            { in_a: 32, in_b: 16, c: 69 },
            { in_a: 92, in_b: 194, c: 27 },
            { in_a: 200, in_b: 192, c: 213 },
            { in_a: 113, in_b: 1, c: 113 },
            { in_a: 64, in_b: 251, c: 111 },
            { in_a: 67, in_b: 1, c: 67 },
            { in_a: 31, in_b: 192, c: 151 },
            { in_a: 15, in_b: 194, c: 212 },
            { in_a: 144, in_b: 16, c: 20 },
            { in_a: 181, in_b: 133, c: 44 },
            { in_a: 245, in_b: 32, c: 213 },
            { in_a: 139, in_b: 148, c: 176 },
            { in_a: 206, in_b: 1, c: 206 },
            { in_a: 113, in_b: 148, c: 251 },
            { in_a: 205, in_b: 32, c: 217 },
            { in_a: 194, in_b: 133, c: 34 },
            { in_a: 237, in_b: 16, c: 200 },
            { in_a: 32, in_b: 194, c: 250 },
            { in_a: 92, in_b: 192, c: 163 },
            { in_a: 200, in_b: 1, c: 200 },
            { in_a: 113, in_b: 251, c: 41 },
            { in_a: 64, in_b: 1, c: 64 },
            { in_a: 67, in_b: 192, c: 52 },
            { in_a: 31, in_b: 194, c: 169 },
            { in_a: 15, in_b: 16, c: 240 },
            { in_a: 144, in_b: 133, c: 53 },
            { in_a: 181, in_b: 32, c: 2 },
            { in_a: 245, in_b: 148, c: 11 },
            { in_a: 139, in_b: 1, c: 139 },
        ] as const;

        testData.forEach(testItem => {
            it(`in_a = ${testItem.in_a}, in_b = ${testItem.in_b}, c = ${testItem.c}`, () => {
                const actual = GOST_Kuz_GF_mul(testItem.in_a, testItem.in_b);
                expect(testItem.c).to.be.equals(actual);
            });
        });
    });

    describe("GOST_Kuz_L", () => {
        const testData: { in_data: vect, expected: vect }[] = [{
            in_data: [126, 25, 140, 136, 80, 195, 243, 209, 12, 234, 150, 30, 87, 199, 220, 230],
            expected: [201, 130, 38, 15, 202, 166, 210, 227, 118, 132, 128, 34, 168, 117, 127, 210],
        }, {
            in_data: [41, 187, 8, 220, 74, 0, 101, 235, 194, 94, 225, 238, 117, 244, 18, 203],
            expected: [54, 70, 144, 56, 163, 145, 184, 219, 12, 133, 155, 194, 38, 174, 228, 29],
        }, {
            in_data: [171, 107, 85, 87, 191, 43, 221, 142, 204, 95, 214, 217, 85, 211, 143, 206],
            expected: [75, 1, 39, 194, 40, 195, 194, 212, 84, 152, 26, 62, 80, 35, 231, 35],
        }, {
            in_data: [142, 45, 229, 27, 254, 178, 2, 232, 163, 116, 163, 122, 231, 24, 175, 157],
            expected: [215, 26, 15, 167, 58, 95, 31, 12, 131, 155, 73, 58, 136, 32, 80, 190],
        }, {
            in_data: [236, 152, 25, 151, 44, 17, 86, 220, 87, 117, 86, 79, 170, 116, 113, 139],
            expected: [209, 75, 39, 85, 168, 46, 244, 147, 23, 52, 250, 247, 28, 57, 75, 241],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = GOST_Kuz_L(testItem.in_data);
                expect(testItem.expected).deep.eq(actual);
            });
        });
    });

    describe("GOST_Kuz_Get_C", () => {
        const expected = [
            [1, 148, 132, 221, 16, 189, 39, 93, 184, 122, 72, 108, 114, 118, 162, 110],
            [2, 235, 203, 121, 32, 185, 78, 186, 179, 244, 144, 216, 228, 236, 135, 220],
            [3, 127, 79, 164, 48, 4, 105, 231, 11, 142, 216, 180, 150, 154, 37, 178],
            [4, 21, 85, 242, 64, 177, 156, 183, 165, 43, 227, 115, 11, 27, 205, 123],
            [5, 129, 209, 47, 80, 12, 187, 234, 29, 81, 171, 31, 121, 109, 111, 21],
            [6, 254, 158, 139, 96, 8, 210, 13, 22, 223, 115, 171, 239, 247, 74, 167],
            [7, 106, 26, 86, 112, 181, 245, 80, 174, 165, 59, 199, 157, 129, 232, 201],
            [8, 42, 170, 39, 128, 161, 251, 173, 137, 86, 5, 230, 22, 54, 89, 246],
            [9, 190, 46, 250, 144, 28, 220, 240, 49, 44, 77, 138, 100, 64, 251, 152],
            [10, 193, 97, 94, 160, 24, 181, 23, 58, 162, 149, 62, 242, 218, 222, 42],
            [11, 85, 229, 131, 176, 165, 146, 74, 130, 216, 221, 82, 128, 172, 124, 68],
            [12, 63, 255, 213, 192, 16, 103, 26, 44, 125, 230, 149, 29, 45, 148, 141],
            [13, 171, 123, 8, 208, 173, 64, 71, 148, 7, 174, 249, 111, 91, 54, 227],
            [14, 212, 52, 172, 224, 169, 41, 160, 159, 137, 118, 77, 249, 193, 19, 81],
            [15, 64, 176, 113, 240, 20, 14, 253, 39, 243, 62, 33, 139, 183, 177, 63],
            [16, 84, 151, 78, 195, 129, 53, 153, 209, 172, 10, 15, 44, 108, 178, 47],
            [17, 192, 19, 147, 211, 60, 18, 196, 105, 214, 66, 99, 94, 26, 16, 65],
            [18, 191, 92, 55, 227, 56, 123, 35, 98, 88, 154, 215, 200, 128, 53, 243],
            [19, 43, 216, 234, 243, 133, 92, 126, 218, 34, 210, 187, 186, 246, 151, 157],
            [20, 65, 194, 188, 131, 48, 169, 46, 116, 135, 233, 124, 39, 119, 127, 84],
            [21, 213, 70, 97, 147, 141, 142, 115, 204, 253, 161, 16, 85, 1, 221, 58],
            [22, 170, 9, 197, 163, 137, 231, 148, 199, 115, 121, 164, 195, 155, 248, 136],
            [23, 62, 141, 24, 179, 52, 192, 201, 127, 9, 49, 200, 177, 237, 90, 230],
            [24, 126, 61, 105, 67, 32, 206, 52, 88, 250, 15, 233, 58, 90, 235, 217],
            [25, 234, 185, 180, 83, 157, 233, 105, 224, 128, 71, 133, 72, 44, 73, 183],
            [26, 149, 246, 16, 99, 153, 128, 142, 235, 14, 159, 49, 222, 182, 108, 5],
            [27, 1, 114, 205, 115, 36, 167, 211, 83, 116, 215, 93, 172, 192, 206, 107],
            [28, 107, 104, 155, 3, 145, 82, 131, 253, 209, 236, 154, 49, 65, 38, 162],
            [29, 255, 236, 70, 19, 44, 117, 222, 69, 171, 164, 246, 67, 55, 132, 204],
            [30, 128, 163, 226, 35, 40, 28, 57, 78, 37, 124, 66, 213, 173, 161, 126],
            [31, 20, 39, 63, 51, 149, 59, 100, 246, 95, 52, 46, 167, 219, 3, 16],
            [32, 168, 237, 156, 69, 193, 106, 241, 97, 155, 20, 30, 88, 216, 167, 94],
        ];

        it("data set #0", () => {
            const actual = GOST_Kuz_Get_C();
            expect(expected).deep.eq(actual);
        });
    });

    describe("GOST_Kuz_F", () => {
        const testData: { in_key_1: vect, in_key_2: vect, iter_const: vect, out_key_1: vect, out_key_2: vect }[] = [{
            in_key_1: [51,27,1,151,196,66,71,71,252,89,29,98,141,22,126,160],
            in_key_2: [91,161,222,228,91,116,80,173,178,207,102,87,135,127,16,236],
            iter_const: [29,255,236,70,19,44,117,222,69,171,164,246,67,55,132,204],
            out_key_1: [140,187,209,67,97,43,79,161,49,84,47,109,15,95,64,82],
            out_key_2: [51,27,1,151,196,66,71,71,252,89,29,98,141,22,126,160],
        }, {
            in_key_1: [140,187,209,67,97,43,79,161,49,84,47,109,15,95,64,82],
            in_key_2: [51,27,1,151,196,66,71,71,252,89,29,98,141,22,126,160],
            iter_const: [30,128,163,226,35,40,28,57,78,37,124,66,213,173,161,126],
            out_key_1: [226,80,38,194,108,108,179,212,235,109,231,149,145,47,53,81],
            out_key_2: [140,187,209,67,97,43,79,161,49,84,47,109,15,95,64,82],
        }, {
            in_key_1: [226,80,38,194,108,108,179,212,235,109,231,149,145,47,53,81],
            in_key_2: [140,187,209,67,97,43,79,161,49,84,47,109,15,95,64,82],
            iter_const: [31,20,39,63,51,149,59,100,246,95,52,46,167,219,3,16],
            out_key_1: [67,64,74,142,168,186,93,117,91,244,188,22,116,221,233,114],
            out_key_2: [226,80,38,194,108,108,179,212,235,109,231,149,145,47,53,81],
        }, {
            in_key_1: [67,64,74,142,168,186,93,117,91,244,188,22,116,221,233,114],
            in_key_2: [226,80,38,194,108,108,179,212,235,109,231,149,145,47,53,81],
            iter_const: [32,168,237,156,69,193,106,241,97,155,20,30,88,216,167,94],
            out_key_1: [23,229,182,205,115,47,243,165,35,49,199,120,83,226,68,187],
            out_key_2: [67,64,74,142,168,186,93,117,91,244,188,22,116,221,233,114],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = GOST_Kuz_F(testItem.in_key_1, testItem.in_key_2, testItem.iter_const);
                expect(testItem.out_key_1).deep.eq(actual.out_key_1);
                expect(testItem.out_key_2).deep.eq(actual.out_key_2);
            });
        });
    });
});