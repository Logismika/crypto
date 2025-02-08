import { Options } from "./options";
import { encrypt as encrypt_kuznechik } from "./kuznechik/encrypt";
import * as R from "ramda";
import { compressByteArray } from "./compression";

export const encrypt = async (key: string | Uint8Array, data: Uint8Array, options: Options = {}): Promise<Uint8Array> => {
    const algorythm = options.algorythm ?? "Kuznechik";

    const dataCompressed = R.isNil(options.compression) ?
        data :
        await compressByteArray(data, options.compression);

    switch (algorythm) {
        case "Kuznechik":
            return await encrypt_kuznechik(key, dataCompressed);
        default:
            const _: never = algorythm;
            throw new Error(`Unknown algorythm "${algorythm}"`);
    }
}