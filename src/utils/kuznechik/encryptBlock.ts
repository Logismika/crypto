import { ExpandedKey } from "./ExpandedKey";
import { GOST_Kuz_L, GOST_Kuz_S, GOST_Kuz_X } from "./gost";
import { vect } from "./types";

export const encryptBlock = (key: ExpandedKey, blk: vect): vect => {
    let out_blk = blk.slice();

    for (let i = 0; i < 9; i += 1)
    {
        out_blk = GOST_Kuz_X(key.iter_key[i]!, out_blk);
        out_blk = GOST_Kuz_S(out_blk);
        out_blk = GOST_Kuz_L(out_blk);
    }

    return GOST_Kuz_X(out_blk, key.iter_key[9]!);
}