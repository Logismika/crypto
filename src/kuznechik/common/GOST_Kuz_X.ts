import { BLOCK_SIZE } from "./consts";
import { toByte } from "./utils";

export const GOST_Kuz_X = (a: Uint8Array, b: Uint8Array): Uint8Array => {
    const c = new Uint8Array(BLOCK_SIZE);

    for (let i = 0; i < c.length; i += 1) {
        c[i] = toByte(a[i]! ^ b[i]!);
    }

    return c;
}
