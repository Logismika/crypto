import { byte } from "./types";
import { BLOCK_SIZE } from "./consts";

export const toByte = (value: number): byte => {
    if (value < 0 || value >= 256) {
        throw new RangeError(`Byte value out of range. Value = ${value}`);
    }

    return value as byte;
}

export const getOutLength = (inLength: number): number =>
    Math.floor(inLength / BLOCK_SIZE) * BLOCK_SIZE + (inLength % BLOCK_SIZE === 0 ? 0 : BLOCK_SIZE);

export const digestMessage = async (value: string): Promise<Uint8Array> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hash);
}