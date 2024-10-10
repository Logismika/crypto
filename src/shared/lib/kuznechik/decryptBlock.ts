import { ExpandedKey } from "./ExpandedKey";
import { GOST_Kuz_reverse_L, GOST_Kuz_reverse_S, GOST_Kuz_X } from "./gost";
import { vect } from "./types";

export const decryptBlock = (key: ExpandedKey, blk: vect): vect => {
    let out_blk = blk.slice();

    out_blk = GOST_Kuz_X(out_blk, key.iter_key[9]!);
    for (let i = 8; i >= 0; i -= 1) {
        out_blk = GOST_Kuz_reverse_L(out_blk);
        out_blk = GOST_Kuz_reverse_S(out_blk);
        out_blk = GOST_Kuz_X(key.iter_key[i]!, out_blk);
    }
    return out_blk;
}