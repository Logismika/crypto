import * as R from "ramda";

export const toArray = <T extends number>(buf: Uint8Array, length?: number): T[] => {
    const result: T[] = [];
    buf.forEach((value) => {
        result.push(value as T);
    });

    if (!R.isNil(length)) {
        while (result.length < length) {
            result.push(0 as T);
        }
    }
    return result;
}