import { vect, GOST_Kuz_X, createBytes, BLOCK_SIZE, reverse_Pi, GOST_Kuz_GF_mul, l_vec, ExpandedKey } from "./common";

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

const GOST_Kuz_reverse_S = (in_data: vect): vect => {
    const out_data = createBytes(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1) {
        out_data[i] = reverse_Pi[in_data[i]!]!;
    }

    return out_data;
}

const GOST_Kuz_reverse_L = (in_data: vect): vect => {
    let result: vect = in_data.slice();
    for (let i = 0; i < 16; i += 1) {
        result = GOST_Kuz_reverse_R(result);
    }
    return result;
}

const GOST_Kuz_reverse_R = (state: vect): vect => {
    let a_0 = state[15]!;
    const internal = createBytes(BLOCK_SIZE);
    for (let i = 1; i < internal.length; i++)
    {
        internal[i] = state[i - 1]!;
        a_0 ^= GOST_Kuz_GF_mul(internal[i]!, l_vec[i]!);
    }
    internal[0] = a_0;
    return internal;
}

export const decrypt_testPackage = { GOST_Kuz_reverse_S, GOST_Kuz_reverse_L, GOST_Kuz_reverse_R } as const;