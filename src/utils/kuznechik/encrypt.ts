import { vect } from "./types";
import { expandKey } from "./expandKey";
import { getOutLength, toByteArray } from "./utils";
import { BLOCK_SIZE } from "./consts";
import { encryptBlock } from "./EncryptBlock";

export const encrypt = (key: string | vect, inStream: Uint8Array): Uint8Array => {
    const result = new Uint8Array(getOutLength(inStream.length));
    
    const expandedKey = expandKey(key);

    for (let i = 0; i < inStream.length; i += BLOCK_SIZE) {
        const block = toByteArray(inStream.subarray(i, BLOCK_SIZE), BLOCK_SIZE);
        const encrypted = encryptBlock(expandedKey, block);
        result.set(encrypted, i);
    }

    return result;
}