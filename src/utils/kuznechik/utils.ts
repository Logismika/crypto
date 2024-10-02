import * as R from "ramda";
import { byte, vect } from "./types";
import { toArray } from "../buffer-helper";
import { BLOCK_SIZE } from "./consts";

export const createBytes = (count: number): vect => R.range(0, count).map(() => toByte(0));

export const toByte = (value: number): byte => {
    if (value < 0 || value >= 256) {
        throw new RangeError(`Byte value out of range. Value = ${value}`);
    }

    return value as byte;
}

export const toByteArray = (buf: Uint8Array, length: number): vect => toArray<byte>(buf, length);

export const getOutLength = (inLength: number): number =>
    Math.floor(inLength / BLOCK_SIZE) * BLOCK_SIZE + (inLength % BLOCK_SIZE === 0 ? 0 : BLOCK_SIZE);