import { createHash } from "crypto";
import * as R from "ramda";
import { vect, ExpandedKey, toByteArray, KEY_SIZE, createBytes, BLOCK_SIZE, toByte, GOST_Kuz_L, GOST_Kuz_X, GOST_Kuz_S } from "./common";

export const expandKey = (key: string | vect) =>
    typeof key === "string" ? expandKeyString(key) : expandKeyArray(key);

const expandKeyString = (key: string): ExpandedKey =>
    expandKeyArray(toByteArray(createHash("sha256").update(key).digest(), KEY_SIZE));

const expandKeyArray = (key: vect): ExpandedKey => {
    if (key.length !== KEY_SIZE) {
        throw new Error(`Key's length must be ${KEY_SIZE}.`);
    }

    const result: ExpandedKey = {
        iter_c: GOST_Kuz_Get_C(),
        iter_key: R.range(0, 10).map(() => createBytes(BLOCK_SIZE)),
    } as const;

    const key_1 = key.slice(KEY_SIZE / 2);
    const key_2 = key.slice(0, KEY_SIZE / 2);

    result.iter_key[0] = key_1.slice();
    result.iter_key[1] = key_2.slice();
    let iter_1 = key_1.slice();
    let iter_2 = key_2.slice();
    let iter_3: vect;
    let iter_4: vect;
    for (let i = 0; i < 4; i += 1) {
        const retVal1 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[0 + 8 * i]!); iter_3 = retVal1.out_key_1; iter_4 = retVal1.out_key_2;
        const retVal2 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[1 + 8 * i]!); iter_1 = retVal2.out_key_1; iter_2 = retVal2.out_key_2;
        const retVal3 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[2 + 8 * i]!); iter_3 = retVal3.out_key_1; iter_4 = retVal3.out_key_2;
        const retVal4 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[3 + 8 * i]!); iter_1 = retVal4.out_key_1; iter_2 = retVal4.out_key_2;
        const retVal5 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[4 + 8 * i]!); iter_3 = retVal5.out_key_1; iter_4 = retVal5.out_key_2;
        const retVal6 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[5 + 8 * i]!); iter_1 = retVal6.out_key_1; iter_2 = retVal6.out_key_2;
        const retVal7 = GOST_Kuz_F(iter_1, iter_2, result.iter_c[6 + 8 * i]!); iter_3 = retVal7.out_key_1; iter_4 = retVal7.out_key_2;
        const retVal8 = GOST_Kuz_F(iter_3, iter_4, result.iter_c[7 + 8 * i]!); iter_1 = retVal8.out_key_1; iter_2 = retVal8.out_key_2;
        result.iter_key[2 * i + 2] = iter_1.slice();
        result.iter_key[2 * i + 3] = iter_2.slice();
    }

    return result;

}

const GOST_Kuz_Get_C = (): vect[] => {
    const result = R.range(0, 32).map(() => createBytes(BLOCK_SIZE))
    const iter_num = R.range(0, 32).map(() => createBytes(BLOCK_SIZE));

    for (let i = 0; i < iter_num.length; i++) {
        iter_num[i]![0] = toByte(i + 1);
    }

    for (let i = 0; i < result.length; i++) {
        result[i] = GOST_Kuz_L(iter_num[i]!);
    }

    return result;
}

const GOST_Kuz_F = (in_key_1: vect, in_key_2: vect, iter_const: vect): { out_key_1: vect, out_key_2: vect } => {
    const out_key_2 = in_key_1.slice();
    const intrl1 = GOST_Kuz_X(in_key_1, iter_const);
    const intrl2 = GOST_Kuz_S(intrl1);
    const intrl3 = GOST_Kuz_L(intrl2);
    const out_key_1 = GOST_Kuz_X(intrl3, in_key_2);

    return { out_key_1, out_key_2 }
}

export const expandKey_testPack = { GOST_Kuz_Get_C, GOST_Kuz_F }