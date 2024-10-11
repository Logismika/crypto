import { l_vec } from "./consts";
import { GOST_Kuz_GF_mul } from "./GOST_Kuz_GF_mul";
import { vect } from "./types";
import { createBytes, toByte } from "./utils";

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