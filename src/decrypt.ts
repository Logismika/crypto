import { Options } from "./options";
import * as kuznechik from "./kuznechik";
import * as R from "ramda";
import { decompressByteArray } from "./compression";
import { EncryptedData } from "./encrypt";

export const decrypt = async (key: string | Uint8Array, data: EncryptedData, options: Options = {}): Promise<Uint8Array> => {
    const algorythm = options.algorythm ?? "Kuznechik";

    const dataCompressed = await (async () => {
        switch (algorythm) {
            case "Kuznechik":
                return await kuznechik.decrypt(key, data.bytes, data.length);
            default:
                const _: never = algorythm;
                throw new Error(`Unknown algorythm "${algorythm}"`);
        }
    })();

    return R.isNil(options.compression) ?
        dataCompressed :
        await decompressByteArray(dataCompressed, options.compression);

}
