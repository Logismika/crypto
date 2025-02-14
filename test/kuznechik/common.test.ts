import * as R from "ramda";
import { byte, getOutLength, GOST_Kuz_GF_mul, GOST_Kuz_L, GOST_Kuz_L_testPackage, GOST_Kuz_S, GOST_Kuz_X, toByte } from "../../src/kuznechik";
import { expect } from "chai";
import { randomBytes, randomInt } from "crypto";
import { toByteArray } from "../utils";

describe("Common Function Tests", () => {
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
                const actual = GOST_Kuz_L(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("GOST_Kuz_S", () => {
        const testData: { in_data: byte[], expected: byte[] }[] = [{
            in_data: [99, 27, 84, 152, 159, 165, 34, 64, 251, 181, 208, 1, 113, 245, 87, 232],
            expected: [41, 187, 8, 220, 74, 0, 101, 235, 194, 94, 225, 238, 117, 244, 18, 203],
        }, {
            in_data: [71, 202, 182, 127, 88, 229, 2, 46, 79, 30, 138, 205, 182, 62, 54, 78],
            expected: [171, 107, 85, 87, 191, 43, 221, 142, 204, 95, 214, 217, 85, 211, 143, 206],
        }, {
            in_data: [46, 228, 237, 209, 215, 110, 50, 153, 185, 242, 185, 148, 206, 33, 250, 108],
            expected: [142, 45, 229, 27, 254, 178, 2, 232, 163, 116, 163, 122, 231, 24, 175, 157],
        }, {
            in_data: [146, 59, 114, 161, 66, 3, 83, 152, 127, 113, 83, 47, 218, 242, 225, 44],
            expected: [236, 152, 25, 151, 44, 17, 86, 220, 87, 117, 86, 79, 170, 116, 113, 139],
        }, {
            in_data: [253, 68, 1, 253, 95, 249, 136, 176, 29, 50, 211, 187, 54, 244, 54, 65],
            expected: [75, 234, 238, 75, 135, 102, 215, 173, 205, 2, 73, 125, 143, 230, 143, 52],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = GOST_Kuz_S(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("GOST_Kuz_R", () => {
        const testData: { in_data: byte[], expected: byte[] }[] = [{
            in_data: [120, 107, 251, 134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91],
            expected: [107, 251, 134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91, 51],
        }, {
            in_data: [107, 251, 134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91, 51],
            expected: [251, 134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91, 51, 15],
        }, {
            in_data: [251, 134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91, 51, 15],
            expected: [134, 36, 255, 214, 240, 235, 42, 209, 41, 178, 175, 228, 91, 51, 15, 212],
        }, {
            in_data: [58, 84, 55, 131, 254, 82, 91, 139, 120, 208, 100, 64, 197, 169, 228, 240],
            expected: [84, 55, 131, 254, 82, 91, 139, 120, 208, 100, 64, 197, 169, 228, 240, 39],
        }, {
            in_data: [84, 55, 131, 254, 82, 91, 139, 120, 208, 100, 64, 197, 169, 228, 240, 39],
            expected: [55, 131, 254, 82, 91, 139, 120, 208, 100, 64, 197, 169, 228, 240, 39, 106],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = GOST_Kuz_L_testPackage.GOST_Kuz_R(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("GOST_Kuz_X", () => {
        const testData: { a: byte[], b: byte[], c: byte[] }[] = [{
            a: [105, 128, 217, 247, 121, 127, 113, 126, 97, 141, 88, 24, 38, 208, 94, 105],
            b: [92, 235, 130, 81, 224, 147, 93, 39, 82, 168, 96, 220, 226, 39, 115, 88],
            c: [53, 107, 91, 166, 153, 236, 44, 89, 51, 37, 56, 196, 196, 247, 45, 49],
        }, {
            a: [53, 107, 91, 166, 153, 236, 44, 89, 51, 37, 56, 196, 196, 247, 45, 49],
            b: [20, 65, 194, 188, 131, 48, 169, 46, 116, 135, 233, 124, 39, 119, 127, 84],
            c: [33, 42, 153, 26, 26, 220, 133, 119, 71, 162, 209, 184, 227, 128, 82, 101],
        }, {
            a: [196, 46, 107, 129, 1, 230, 9, 251, 238, 219, 222, 3, 102, 188, 133, 250],
            b: [121, 71, 196, 55, 252, 5, 220, 72, 139, 95, 247, 35, 95, 115, 172, 228],
            c: [189, 105, 175, 182, 253, 227, 213, 179, 101, 132, 41, 32, 57, 207, 41, 30],
        }, {
            a: [189, 105, 175, 182, 253, 227, 213, 179, 101, 132, 41, 32, 57, 207, 41, 30],
            b: [21, 213, 70, 97, 147, 141, 142, 115, 204, 253, 161, 16, 85, 1, 221, 58],
            c: [168, 188, 233, 215, 110, 110, 91, 192, 169, 121, 136, 48, 108, 206, 244, 36],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = GOST_Kuz_X(new Uint8Array(testItem.a), new Uint8Array(testItem.b));
                expect(testItem.c).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("Utils", () => {
        describe("toByte", () => {
            const passTestData: { input: number, expected: byte }[] = [
                { input: 0, expected: 0 },
                { input: 1, expected: 1 },
                { input: 37, expected: 37 },
                { input: 255, expected: 255 },
            ];

            passTestData.forEach(testItem => {
                it(`toByte(${testItem.input})`, () => {
                    const actual = toByte(testItem.input);
                    expect(testItem.expected).eq(actual);
                });
            });

            const failTestData = [-1, 256];

            failTestData.forEach(testItem => {
                it(`toByte(${testItem})`, () => {
                    expect(() => toByte(testItem)).to.throw(RangeError);
                });
            });
        });

        describe("getOutLength", () => {
            const passTestData: { input: number, expected: number }[] = [
                { input: 0, expected: 0 },
                { input: 1, expected: 16 },
                { input: 16, expected: 16 },
                { input: 37, expected: 48 },
                { input: 255, expected: 256 },
            ];

            passTestData.forEach(testItem => {
                it(`getOutLength(${testItem.input})`, () => {
                    const actual = getOutLength(testItem.input);
                    expect(testItem.expected).eq(actual);
                });
            });
        });

        describe("toByteArray", () => {
            const count = 10 as const;
            R.range(0, count).forEach(i => {
                it(`toByteArray() random #${i}`, () => {
                    const size = randomInt(10000);
                    const source: byte[] = [...randomBytes(size)].map(v => toByte(v));
                    const actual = toByteArray(new Uint8Array(source));
                    expect(actual).deep.eq(source);
                });
            });
        });
    });
});