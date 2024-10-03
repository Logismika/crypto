import { byte } from '../src/utils/kuznechik/types';
import { GOST_Kuz_GF_mul } from "../src/utils/kuznechik/gost";
import {expect} from "chai";

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
});