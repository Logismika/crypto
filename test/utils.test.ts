import { expect } from "chai";
import { stringFromByteArray, stringToByteArray } from "../src/utils";
import { compressByteArray, decompressByteArray } from "../src/compression";
import { users, goods, tasks, movies, weather } from "./fixtures.json";

describe("Utils Tests", () => {

    describe("stringToByteArray tests", () => {
        const sourceStrings = [
            "",
            "1",
            " ",
            "Technology has become the cornerstone of modern life, reshaping how we communicate, work, and navigate daily challenges. From smartphones to AI-driven solutions, innovation accelerates progress, offering unprecedented convenience and connectivity.",
            JSON.stringify(users, null, 2),
        ];

        sourceStrings.forEach((source, index) => {
            it(`#${index} stringToByteArray("${source}")`, () => {
                const bytes = stringToByteArray(source);
                const actual = stringFromByteArray(bytes);
                // console.log(`Source Length: ${source.length}, Bytes Length: ${bytes.length}, Actual Length: ${actual.length}`);
                expect(actual).eq(source);
            });
        });
    });

    describe("compressByteArray tests", () => {
        const sourceStrings = [
            "",
            "1",
            " ",
            "Technology has become the cornerstone of modern life, reshaping how we communicate, work, and navigate daily challenges. From smartphones to AI-driven solutions, innovation accelerates progress, offering unprecedented convenience and connectivity.",
            JSON.stringify(users, null, 2),
            JSON.stringify(goods, null, 2),
            JSON.stringify(movies, null, 2),
            JSON.stringify(tasks, null, 2),
            JSON.stringify(weather, null, 2),
        ];

        const compressionFormat: CompressionFormat[] = [
            "deflate",
            "deflate-raw",
            "gzip",
        ];

        compressionFormat.forEach(cf => {
            sourceStrings.forEach((source, index) => {
                it(`"${cf}" #${index} compress/decompress`, async () => {
                    const expected = stringToByteArray(source);
                    const compressed = await compressByteArray(expected, cf);
                    const actual = await decompressByteArray(compressed, cf);
                    // console.log(`Source Length: ${source.length}, Bytes Length: ${expected.length}, Compressed Length: ${compressed.length}`);
                    expect(actual).deep.eq(expected);
                });
            });
        });

    });
});