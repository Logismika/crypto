import * as R from "ramda";
import { byte, vect } from "./types";

export const createBytes = (count: number): vect => R.range(0, count).map(() => toByte(0));

export const toByte = (value: number): byte => {
    if (value < 0 || value >= 256) {
        throw new RangeError(`Byte value out of range. Value = ${value}`);
    }

    return value as byte;
}