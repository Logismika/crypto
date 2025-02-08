import * as R from "ramda";
import { decrypt_testPackage, expandKey, decryptBlock, encrypt, decrypt, toByteArray, toByte, KEY_SIZE, byte } from "../../src/kuznechik";
import { expect } from "chai";
import { randomBytes, randomInt } from "crypto";

describe("Decrypt tests", () => {
    describe("GOST_Kuz_reverse_S", () => {
        const testData: { in_data: byte[], expected: byte[] }[] = [{
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
                const actual = decrypt_testPackage.GOST_Kuz_reverse_S(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("GOST_Kuz_reverse_L", () => {
        const testData: { in_data: byte[], expected: byte[] }[] = [{
            in_data: [12, 64, 71, 13, 155, 22, 189, 234, 143, 119, 245, 232, 60, 172, 163, 7],
            expected: [39, 195, 20, 6, 109, 4, 12, 173, 184, 160, 50, 116, 63, 249, 116, 110],
        }, {
            in_data: [21, 67, 41, 132, 27, 252, 0, 207, 250, 82, 120, 62, 172, 171, 247, 149],
            expected: [6, 133, 179, 102, 74, 225, 197, 193, 111, 254, 211, 243, 142, 254, 160, 170],
        }, {
            in_data: [98, 148, 63, 251, 196, 102, 111, 207, 66, 209, 231, 6, 34, 228, 249, 163],
            expected: [70, 212, 145, 210, 164, 112, 227, 128, 51, 86, 112, 225, 119, 9, 188, 121],
        }, {
            in_data: [41, 82, 89, 103, 167, 242, 155, 120, 182, 193, 98, 103, 212, 159, 228, 60],
            expected: [120, 39, 166, 200, 95, 220, 220, 125, 117, 137, 70, 209, 91, 101, 253, 166],
        }, {
            in_data: [71, 173, 129, 85, 63, 219, 50, 180, 46, 195, 136, 25, 73, 110, 120, 123],
            expected: [25, 13, 163, 218, 57, 163, 9, 123, 182, 47, 130, 36, 222, 94, 55, 123],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = decrypt_testPackage.GOST_Kuz_reverse_L(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    describe("GOST_Kuz_reverse_R", () => {
        const testData: { in_data: byte[], expected: byte[] }[] = [{
            in_data: [0, 128, 229, 222, 45, 60, 151, 41, 144, 247, 18, 91, 249, 79, 224, 136],
            expected: [199, 0, 128, 229, 222, 45, 60, 151, 41, 144, 247, 18, 91, 249, 79, 224],
        }, {
            in_data: [220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134, 241, 12, 65],
            expected: [244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134, 241, 12],
        }, {
            in_data: [244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134, 241, 12],
            expected: [219, 244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134, 241],
        }, {
            in_data: [219, 244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134, 241],
            expected: [58, 219, 244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134],
        }, {
            in_data: [58, 219, 244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139, 134],
            expected: [89, 58, 219, 244, 220, 148, 48, 95, 141, 97, 130, 97, 222, 176, 112, 139],
        }] as const;

        testData.forEach((testItem, index) => {
            it(`test set #${index}`, () => {
                const actual = decrypt_testPackage.GOST_Kuz_reverse_R(new Uint8Array(testItem.in_data));
                expect(testItem.expected).deep.eq(toByteArray(actual));
            });
        });
    });

    it("decryptBlock vect", async () => {
        const test_key: byte[] = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const test_string: byte[] = [
            0xcd, 0xed, 0xd4, 0xb9, 0x42, 0x8d, 0x46, 0x5a,
            0x30, 0x24, 0xbc, 0xbe, 0x90, 0x9d, 0x67, 0x7f
        ];

        const expected: byte[] = [
            0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
            0x00, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11
        ];

        const expandedKey = await expandKey(new Uint8Array(test_key));
        const actual = decryptBlock(expandedKey, new Uint8Array(test_string));

        expect(toByteArray(actual)).deep.eq(expected);
    });

    it("decryptBlock string", async () => {
        const test_key = "Secret phrase!";

        const test_string: byte[] = [
            0x05, 0xAF, 0xD9, 0xAB, 0x65, 0x9E, 0xAA, 0x9F,
            0x13, 0xC0, 0x06, 0xC9, 0x54, 0x48, 0x42, 0xDD
        ];

        const expected: byte[] = [
            0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
            0x00, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11
        ];

        const expandedKey = await expandKey(test_key);
        const actual = decryptBlock(expandedKey, new Uint8Array(test_string));

        expect(toByteArray(actual)).deep.eq(expected);
    });

    it("simple encrypt/decrypt", async () => {
        const test_key: byte[] = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const source = [1, 2, 3];

        const encrypted = await encrypt(new Uint8Array(test_key), new Uint8Array(source));
        const decrypted = await decrypt(new Uint8Array(test_key), encrypted, source.length);

        const actual = toByteArray(decrypted);

        expect(actual).deep.eq(source);
    });

    it("zero encrypt/decrypt", async () => {
        const test_key: byte[] = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const source: byte[] = [];

        const encrypted = await encrypt(new Uint8Array(test_key), new Uint8Array(source));
        const decrypted = await decrypt(new Uint8Array(test_key), encrypted, source.length);

        const actual = toByteArray(decrypted);

        expect(actual).deep.eq(source);
    });

    describe("Decrypt Streams", () => {
        const count = 5;
        R.range(0, count).forEach(i => {
            const test_key: byte[] = [...randomBytes(KEY_SIZE)].map(v => toByte(v));

            const size = randomInt(1000);
            const source: byte[] = [...randomBytes(size)].map(v => toByte(v));

            it(`encrypt/decrypt random #${i} ${size} bytes`, async () => {
                const encrypted = await encrypt(new Uint8Array(test_key), new Uint8Array(source));
                const decrypted = await decrypt(new Uint8Array(test_key), encrypted, source.length);
        
                const actual = toByteArray(decrypted);
                expect(actual).deep.eq(actual);
            });
        });
    });
});
