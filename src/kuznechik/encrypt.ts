import { BLOCK_SIZE, ExpandedKey, getOutLength, GOST_Kuz_L, GOST_Kuz_S, GOST_Kuz_X } from "./common";
import { expandKey } from "./expandKey";

export const encrypt = (key: string | Uint8Array, inStream: Uint8Array): Uint8Array => {
    const result = new Uint8Array(getOutLength(inStream.length));
    
    const expandedKey = expandKey(key);

    for (let i = 0; i < inStream.length; i += BLOCK_SIZE) {
        const block = inStream.subarray(i, BLOCK_SIZE);
        const encrypted = encryptBlock(expandedKey, block);
        result.set(encrypted, i);
    }

    return result;
}

export const encryptBlock = (key: ExpandedKey, blk: Uint8Array): Uint8Array => {
    let out_blk = blk.slice();

    for (let i = 0; i < 9; i += 1)
    {
        out_blk = GOST_Kuz_X(key.iter_key[i]!, out_blk);
        out_blk = GOST_Kuz_S(out_blk);
        out_blk = GOST_Kuz_L(out_blk);
    }

    return GOST_Kuz_X(out_blk, key.iter_key[9]!);
}
