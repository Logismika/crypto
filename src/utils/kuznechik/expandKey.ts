import { createHash } from "crypto";
import { KEY_SIZE } from "./consts";
import { ExpandedKey } from "./ExpandedKey";
import { byte, vect } from "./types";
import { toArray } from "../buffer-helper";
import * as R from "ramda";
import { createVect } from "./utils";

export const expandKey = (key: string | byte[]) =>
    typeof key === "string" ? expandKeyString(key) : expandKeyArray(key);

const expandKeyString = (key: string): ExpandedKey =>
    expandKeyArray(toArray<byte>(createHash("sha256").update(key).digest()));

const expandKeyArray = (key: byte[]): ExpandedKey => {
    if (key.length !== KEY_SIZE) {
        throw new Error(`Key's length must be ${KEY_SIZE}.`);
    }

    const result: ExpandedKey = {
        iter_c: R.range(0, 32).map(() => createVect()),
        iter_key: R.range(0, 10).map(() => createVect()),
    }

    const key_1 = key.slice(KEY_SIZE / 2);
    const key_2 = key.slice(0, KEY_SIZE / 2);
    GOST_Kuz_Get_C(result.iter_c);

    result.iter_key[0] = key_1.slice();
    result.iter_key[1] = key_2.slice();
    let iter_1 = key_1.slice();
    let iter_2 = key_2.slice();
    let iter_3: byte[];
    let iter_4: byte[];
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
    const iter_num = R.range(0, 32).map(() => createVect()), ;

    for (let i = 0; i < iter_num.length; i++) {
        iter_num[i][0] = (i + 1) as byte;
    }
    for (let i = 0; i < iter_c.length; i++) {
        GOST_Kuz_L(iter_num[i], iter_c[i]);
    }
}

const GOST_Kuz_F = (in_key_1: byte[], in_key_2: byte[], iter_const: byte[]): { out_key_1: byte[], out_key_2: byte[] } => {
    const out_key_2 = in_key_1.slice();
    const intrl1 = GOST_Kuz_X(in in_key_1, in iter_const);
    const intrl2 = GOST_Kuz_S(in intrl1);
    const intrl3 = GOST_Kuz_L(in intrl2);
    const out_key_1 = GOST_Kuz_X(in intrl3, in in_key_2);

    return { out_key_1, out_key_2 }
}
