export const toArray = <T extends number>(buf: Uint8Array): T[] => {
    const result: T[] = [];
    buf.forEach((value) => {
        result.push(value as T);
    });
    return result;
}