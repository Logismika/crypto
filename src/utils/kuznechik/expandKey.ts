import { createHash } from "crypto";
import { BLOCK_SIZE, KEY_SIZE, l_vec, Pi } from "./consts";
import { ExpandedKey } from "./ExpandedKey";
import { byte, vect } from "./types";
import { toArray } from "../buffer-helper";
import * as R from "ramda";
import { createBytes, toByte } from "./utils";

export const expandKey = (key: string | vect) =>
    typeof key === "string" ? expandKeyString(key) : expandKeyArray(key);

const expandKeyString = (key: string): ExpandedKey =>
    expandKeyArray(toArray<byte>(createHash("sha256").update(key).digest()));

const expandKeyArray = (key: vect): ExpandedKey => {
    if (key.length !== KEY_SIZE) {
        throw new Error(`Key's length must be ${KEY_SIZE}.`);
    }

    const result: ExpandedKey = {
        iter_c: R.range(0, 32).map(() => createBytes(BLOCK_SIZE)),
        iter_key: R.range(0, 10).map(() => createBytes(BLOCK_SIZE)),
    }

    const key_1 = key.slice(KEY_SIZE / 2);
    const key_2 = key.slice(0, KEY_SIZE / 2);
    GOST_Kuz_Get_C(result.iter_c);

    result.iter_key[0] = key_1.slice();
    result.iter_key[1] = key_2.slice();
    let iter_1 = key_1.slice();
    let iter_2 = key_2.slice();
    let iter_3: vect;
    let iter_4: vect;
    for (let i = 0; i < 4; i += 1) {
        const retVal1 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[0 + 8 * i]); iter_3 = retVal1.out_key_1; iter_4 = retVal1.out_key_2;
        const retVal2 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[1 + 8 * i]); iter_1 = retVal2.out_key_1; iter_2 = retVal2.out_key_2;
        const retVal3 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[2 + 8 * i]); iter_3 = retVal3.out_key_1; iter_4 = retVal3.out_key_2;
        const retVal4 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[3 + 8 * i]); iter_1 = retVal4.out_key_1; iter_2 = retVal4.out_key_2;
        const retVal5 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[4 + 8 * i]); iter_3 = retVal5.out_key_1; iter_4 = retVal5.out_key_2;
        const retVal6 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[5 + 8 * i]); iter_1 = retVal6.out_key_1; iter_2 = retVal6.out_key_2;
        const retVal7 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[6 + 8 * i]); iter_3 = retVal7.out_key_1; iter_4 = retVal7.out_key_2;
        const retVal8 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[7 + 8 * i]); iter_1 = retVal8.out_key_1; iter_2 = retVal8.out_key_2;
        result.iter_key[2 * i + 2] = iter_1.slice();
        result.iter_key[2 * i + 3] = iter_2.slice();
    }

    return result;

}

const GOST_Kuz_Get_C = (iter_c: vect[]) => {
    const iter_num = R.range(0, 32).map(() => createBytes(BLOCK_SIZE));

    for (let i = 0; i < iter_num.length; i++) {
        iter_num[i][0] = toByte(i + 1);
    }

    for (let i = 0; i < iter_c.length; i++) {
        iter_c[i] = GOST_Kuz_L(iter_num[i]);
    }
}

const GOST_Kuz_F = (in_key_1: vect, in_key_2: vect, iter_const: vect): { out_key_1: vect, out_key_2: vect } => {
    const out_key_2 = in_key_1.slice();
    const intrl1 = GOST_Kuz_X(in_key_1, iter_const);
    const intrl2 = GOST_Kuz_S(intrl1);
    const intrl3 = GOST_Kuz_L(intrl2);
    const out_key_1 = GOST_Kuz_X(intrl3, in_key_2);

    return { out_key_1, out_key_2 }
}

const GOST_Kuz_L = (in_data: vect): vect => {
    let result: vect = in_data.slice();
    for (let i = 0; i < 16; i += 1) {
        result = GOST_Kuz_R(result);
    }
    return result;
}

const GOST_Kuz_R = (in_data: vect): vect => {
    let a_15 = 0;
    const internal: vect = createBytes(16);
    for (let i = 15; i >= 0; i -= 1) {
        if (i > 0) {
            internal[i - 1] = in_data[i];
        }

        a_15 ^= GOST_Kuz_GF_mul(in_data[i], l_vec[i]);
    }

    internal[15] = toByte(a_15);
    return internal;
}

const GOST_Kuz_GF_mul = (in_a: byte, in_b: byte): byte => {
    let a = in_a;
    let b = in_b;

    let c = 0;
    for (let i = 0; i < 8; i += 1)
    {
        if ((b & 1) != 0)
        {
            c ^= a;
        }
        const hi_bit = a & 0x80;
        a <<= 1;
        if (hi_bit != 0)
        {
            a ^= 0xc3; //полином x^8+x^7+x^6+x+1
        }
        b >>= 1;
    }
    return toByte(c);
}

const GOST_Kuz_X = (a: vect, b: vect): vect => {
    const c = createBytes(BLOCK_SIZE);

    for (let i = 0; i < c.length; i += 1)
    {
        c[i] = toByte(a[i] ^ b[i]);
    }

    return c;
}

const GOST_Kuz_S = (in_data: vect): vect => {
    const out_data = createBytes(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1)
    {
        out_data[i] = Pi[in_data[i]];
    }

    return out_data;
}