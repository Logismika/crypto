import { byte } from "./types";
import { toByte } from "./utils";

export const GOST_Kuz_GF_mul = (in_a: byte, in_b: byte): byte => {
    let a = in_a;
    let b = in_b;

    let c = 0;
    for (let i = 0; i < 8; i += 1) {
        if ((b & 1) != 0) {
            c = (c ^ a) % 0x100;
        }
        const hi_bit = a & 0x80;
        a <<= 1;
        if (hi_bit != 0) {
            a ^= 0xc3;
        }
        b >>= 1;
    }
    return toByte(c);
}