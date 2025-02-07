import * as R from "ramda";
import { byte, vect } from "./types";
import { BLOCK_SIZE } from "./consts";

export const createBytes = (count: number): vect => R.range(0, count).map(() => toByte(0));

export const toByteArray = (buf: Uint8Array, length?: number): vect => {
    const result: vect = [];
    buf.forEach((value) => {
        result.push(toByte(value));
    });

    if (!R.isNil(length)) {
        while (result.length < length) {
            result.push(0);
        }

        return result.slice(0, length);
    } else {
        return result;
    }
}

export const toByte = (value: number): byte => {
    if (value < 0 || value >= 256) {
        throw new RangeError(`Byte value out of range. Value = ${value}`);
    }

    return value as byte;
}

export const getOutLength = (inLength: number): number =>
    Math.floor(inLength / BLOCK_SIZE) * BLOCK_SIZE + (inLength % BLOCK_SIZE === 0 ? 0 : BLOCK_SIZE);