import { byte } from '../src/utils/kuznechik/types';
import { GOST_Kuz_GF_mul, GOST_Kuz_L } from "../src/utils/kuznechik/gost";
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
        const testData: { in_data: byte[], expected: byte[] }[] = [{
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
});