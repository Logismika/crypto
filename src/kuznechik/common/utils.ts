import { byte } from "./types";
import { BLOCK_SIZE } from "./consts";

export const alignByteArray = (buf: Uint8Array, length: number): Uint8Array => {
    const result = new Uint8Array(length);
    if (buf.length > length) {
        result.set(buf.slice(0, length));
    } else {
        result.set(buf, 0);
    }

    return result;
}

export const toByteArray = (buf: Uint8Array): byte[] => {
    const result: byte[] = [];
    buf.forEach((value) => {
        result.push(toByte(value));
    });
    return result;
}

export const toByte = (value: number): byte => {
    if (value < 0 || value >= 256) {
        throw new RangeError(`Byte value out of range. Value = ${value}`);
    }

    return value as byte;
}

export const getOutLength = (inLength: number): number =>
    Math.floor(inLength / BLOCK_SIZE) * BLOCK_SIZE + (inLength % BLOCK_SIZE === 0 ? 0 : BLOCK_SIZE);