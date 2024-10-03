import { BLOCK_SIZE, l_vec, Pi } from "./consts";
import { byte, vect } from "./types";
import { createBytes, toByte } from "./utils";

export const GOST_Kuz_X = (a: vect, b: vect): vect => {
    const c = createBytes(BLOCK_SIZE);

    for (let i = 0; i < c.length; i += 1) {
        c[i] = toByte(a[i]! ^ b[i]!);
    }

    return c;
}

export const GOST_Kuz_S = (in_data: vect): vect => {
    const out_data = createBytes(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1) {
        out_data[i] = Pi[in_data[i]!]!;
    }

    return out_data;
}

export const GOST_Kuz_L = (in_data: vect): vect => {
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
            internal[i - 1] = in_data[i]!;
        }

        a_15 ^= GOST_Kuz_GF_mul(in_data[i]!, l_vec[i]!);
    }

    internal[15] = toByte(a_15);
    return internal;
}


export const GOST_Kuz_GF_mul = (in_a: byte, in_b: byte): byte => {
    let a = in_a;
    let b = in_b;

    let c = 0;
    for (let i = 0; i < 8; i += 1)
    {
        if ((b & 1) != 0)
        {
            c = (c ^ a) % 0x100;
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