export const toByteArray = (buf: Uint8Array): number[] => {
    const result: number[] = [];
    buf.forEach((value) => {
        result.push(value);
    });
    return result;
}