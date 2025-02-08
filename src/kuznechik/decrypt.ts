import { GOST_Kuz_X, BLOCK_SIZE, reverse_Pi, GOST_Kuz_GF_mul, l_vec, ExpandedKey, toByte } from "./common";
import { expandKey } from "./expandKey";

export const decrypt = async (key: string | Uint8Array, inStream: Uint8Array, length: number): Promise<Uint8Array> => {
    if (inStream.length < length) {
        throw new Error("inStream's length shoud be greater or equal to length.");
    }

    if (inStream.length % BLOCK_SIZE != 0) {
        throw new Error(`inStream's length shoud devides on ${BLOCK_SIZE}.`);
    }

    const result = new Uint8Array(length);

    const expandedKey = await expandKey(key);

    for (let i = 0; i < inStream.length; i += BLOCK_SIZE) {
        const delta = length - i;
        const block = inStream.subarray(i, i + BLOCK_SIZE);
        const decrypted = decryptBlock(expandedKey, block);
        const len = delta < BLOCK_SIZE ? delta : BLOCK_SIZE;
        result.set(decrypted.slice(0, len), i);
    }

    return result;
}

export const decryptBlock = (key: ExpandedKey, blk: Uint8Array): Uint8Array => {
    let out_blk = blk.slice();

    out_blk = GOST_Kuz_X(out_blk, key.iter_key[9]!);
    for (let i = 8; i >= 0; i -= 1) {
        out_blk = GOST_Kuz_reverse_L(out_blk);
        out_blk = GOST_Kuz_reverse_S(out_blk);
        out_blk = GOST_Kuz_X(key.iter_key[i]!, out_blk);
    }
    return out_blk;
}

const GOST_Kuz_reverse_S = (in_data: Uint8Array): Uint8Array => {
    const out_data = new Uint8Array(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1) {
        out_data[i] = reverse_Pi[in_data[i]!]!;
    }

    return out_data;
}

const GOST_Kuz_reverse_L = (in_data: Uint8Array): Uint8Array => {
    let result = in_data.slice();
    for (let i = 0; i < 16; i += 1) {
        result = GOST_Kuz_reverse_R(result);
    }
    return result;
}

const GOST_Kuz_reverse_R = (state: Uint8Array): Uint8Array => {
    let a_0 = state[15]!;
    const internal = new Uint8Array(BLOCK_SIZE);;
    for (let i = 1; i < internal.length; i++) {
        internal[i] = state[i - 1]!;
        a_0 ^= GOST_Kuz_GF_mul(toByte(internal[i]!), toByte(l_vec[i]!));
    }
    internal[0] = a_0;
    return internal;
}

export const decrypt_testPackage = { GOST_Kuz_reverse_S, GOST_Kuz_reverse_L, GOST_Kuz_reverse_R } as const;
