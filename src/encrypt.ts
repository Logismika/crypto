import { Options } from "./options";
import { stringToByteArray } from "./utils";
import {encrypt as encrypt_kuznechik} from "./kuznechik/encrypt";

export const encrypt = async (key: string | Uint8Array, data: string | Uint8Array, options: Options = { }): Promise<Uint8Array> => {
    const dataBin = typeof data === "string" ? stringToByteArray(data) : data;
    const algorythm = options.algorythm ?? "Kuznechik";

    switch (algorythm) {
        case "Kuznechik":
            return await encrypt_kuznechik(key, dataBin);
        default:
            const _: never = algorythm;
            throw new Error(`Unknown algorythm "${algorythm}"`);
    }
}