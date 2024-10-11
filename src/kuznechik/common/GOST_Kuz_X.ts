import { BLOCK_SIZE } from "./consts";
import { vect } from "./types";
import { createBytes, toByte } from "./utils";

export const GOST_Kuz_X = (a: vect, b: vect): vect => {
    const c = createBytes(BLOCK_SIZE);

    for (let i = 0; i < c.length; i += 1) {
        c[i] = toByte(a[i]! ^ b[i]!);
    }

    return c;
}
