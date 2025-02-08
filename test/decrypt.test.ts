import { encrypt, decrypt} from "../src";
import { expect } from "chai";
import * as R from "ramda";

import { users, goods, tasks, movies, weather } from "./fixtures.json";
import { stringFromByteArray, stringToByteArray } from "../src/utils";

describe("Decrypt tests", () => {
    const test_key = new Uint8Array([
        0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
        0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
        0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
        0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
    ]);

    it("simple encrypt/decrypt", async () => {
        const source = new Uint8Array([1, 2, 3]);

        const encrypted = await encrypt(test_key, source);
        const decrypted = await decrypt(test_key, encrypted, source.length);

        expect(decrypted).deep.eq(source);
    });

    it("empty array encrypt/decrypt", async () => {
        const source = new Uint8Array();
        const encrypted = await encrypt(test_key, source);
        const decrypted = await decrypt(test_key, encrypted, source.length);
        expect(decrypted).deep.eq(source);
    });

    it("empty string encrypt/decrypt", async () => {
        const source = "";
        const data = stringToByteArray(source);
        const encrypted = await encrypt(test_key, data);
        const decrypted = await decrypt(test_key, encrypted, data.length);
        const actual = stringFromByteArray(decrypted);
        expect(actual).deep.eq(source);
    });


    describe("Complext Tests", ()  => {
        const compressionFormats: (undefined | CompressionFormat)[] = [undefined, "deflate", "deflate-raw", "gzip"];
        const dataSets = [users, goods, tasks, movies, weather];
        compressionFormats.forEach(cf => {
            const name = R.isNil(cf) ? "Test without compression" : `Test with "${cf}" compression`;
            describe(name, () => {
                dataSets.forEach((ds, index) => {
                    it(`enrypt/decrypt data set #${index}`, async () => {
                        const source = JSON.stringify(ds);
                        const data = stringToByteArray(source);
                        const encrypted = await encrypt(test_key, data);
                        const decrypted = await decrypt(test_key, encrypted, data.length);
                        expect(data).deep.eq(decrypted);
                        const actual = stringFromByteArray(decrypted);
                        expect(actual).deep.eq(source);
                    });
                })
            });
        })
    });
});
