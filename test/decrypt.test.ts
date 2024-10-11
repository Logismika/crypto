import { vect, decrypt_testPackage } from '../src/shared';
import { expect } from 'chai';

describe('Decrypt tests', () => {
    describe("GOST_Kuz_reverse_S", () => {
        const testData: { in_data: vect, expected: vect }[] = [{
            in_data: [219, 50, 84, 141, 43, 14, 158, 224, 133, 93, 125, 102, 182, 211, 239, 238],
            expected: [19, 112, 121, 216, 229, 82, 109, 144, 222, 94, 187, 249, 255, 62, 38, 1],
        }, {
            in_data: [123, 125, 90, 198, 38, 187, 122, 74, 146, 158, 81, 69, 76, 208, 225, 178],
            expected: [101, 187, 35, 122, 174, 27, 148, 159, 179, 109, 67, 177, 212, 235, 208, 110],
        }, {
            in_data: [169, 145, 149, 60, 1, 194, 21, 123, 54, 169, 236, 59, 48, 19, 1, 243],
            expected: [131, 105, 190, 42, 45, 251, 96, 101, 25, 131, 146, 191, 200, 90, 45, 104],
        }, {
            in_data: [251, 126, 166, 22, 120, 47, 5, 132, 209, 163, 103, 80, 229, 173, 230, 239],
            expected: [8, 119, 241, 7, 106, 183, 48, 49, 248, 185, 226, 155, 237, 176, 244, 38],
        }, {
            in_data: [57, 97, 197, 236, 117, 231, 20, 225, 18, 31, 249, 65, 198, 33, 183, 234],
            expected: [252, 223, 13, 146, 113, 206, 28, 208, 87, 63, 32, 175, 122, 39, 93, 68],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = decrypt_testPackage.GOST_Kuz_reverse_S(testItem.in_data);
                expect(testItem.expected).deep.eq(actual);
            });
        });
    });
});