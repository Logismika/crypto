import * as kuznechik from "./kuznechik";
import { AlgorythmType } from "./options";

export const getPasswordHash = async (key: string, algorythm: AlgorythmType = "Kuznechik"): Promise<Uint8Array> => {
    switch (algorythm) {
        case "Kuznechik":
            return await kuznechik.getPasswordHash(key);
        default:
            const _: never = algorythm;
            throw new Error(`Unknown algorythm "${algorythm}"`);
    }
}
