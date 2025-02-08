import { Options } from "./options";
import {decrypt as decrypt_kuznechik} from "./kuznechik/decrypt";

export const decrypt = async (key: string | Uint8Array, data: Uint8Array, length: number, options: Options = { }): Promise<Uint8Array> => {
    const algorythm = options.algorythm ?? "Kuznechik";

    switch (algorythm) {
        case "Kuznechik":
            return await decrypt_kuznechik(key, data, length);
        default:
            const _: never = algorythm;
            throw new Error(`Unknown algorythm "${algorythm}"`);
    }
}