import { expect } from "chai";
import {stringFromByteArray, stringToByteArray} from "../src/utils";

describe("Utils Tests", () => {

    describe("stringToByteArray tests", () => {
        const sourceStrings = [
            "",
            "1",
            " ",
            "Technology has become the cornerstone of modern life, reshaping how we communicate, work, and navigate daily challenges. From smartphones to AI-driven solutions, innovation accelerates progress, offering unprecedented convenience and connectivity."
        ];

        sourceStrings.forEach((source, index) => {
            it(`#${index} stringToByteArray("${source}")`, () => {
                const bytes = stringToByteArray(source);
                const actual = stringFromByteArray(bytes);
                expect(actual).eq(source);
            });
        });
    });
});