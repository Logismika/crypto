import { Options } from "./options";
import * as R from "ramda";
import { compressByteArray } from "./compression";
import * as kuznechik from "./kuznechik";

export interface EncryptedData {
    readonly length: number;
    readonly bytes: Uint8Array;
}

export const encrypt = async (key: string | Uint8Array, data: Uint8Array, options: Options = {}): Promise<EncryptedData> => {
    const algorythm = options.algorythm ?? "Kuznechik";

    const dataCompressed = R.isNil(options.compression) ?
        data :
        await compressByteArray(data, options.compression);

    switch (algorythm) {
        case "Kuznechik":
            return {
                length: dataCompressed.length,
                bytes: await kuznechik.encrypt(key, dataCompressed)
            };
        default:
            const _: never = algorythm;
            throw new Error(`Unknown algorythm "${algorythm}"`);
    }
}