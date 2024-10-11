import { BLOCK_SIZE, Pi } from "./consts";
import { vect } from "./types";
import { createBytes } from "./utils";

export const GOST_Kuz_S = (in_data: vect): vect => {
    const out_data = createBytes(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1) {
        out_data[i] = Pi[in_data[i]!]!;
    }

    return out_data;
}