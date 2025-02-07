import { BLOCK_SIZE, Pi } from "./consts";

export const GOST_Kuz_S = (in_data: Uint8Array): Uint8Array => {
    const out_data = new Uint8Array(BLOCK_SIZE);

    for (let i = 0; i < out_data.length; i += 1) {
        out_data[i] = Pi[in_data[i]!]!;
    }

    return out_data;
}
