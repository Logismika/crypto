import { encrypt, decrypt} from "../src";
import { expect } from "chai";
import { toByteArray } from "./utils";

describe("Decrypt tests", () => {
    it("simple encrypt/decrypt", async () => {
        const test_key = [
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
        const test_key = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const source: number[] = [];

        const encrypted = await encrypt(new Uint8Array(test_key), new Uint8Array(source));
        const decrypted = await decrypt(new Uint8Array(test_key), encrypted, source.length);

        const actual = toByteArray(decrypted);

        expect(actual).deep.eq(source);
    });
});
