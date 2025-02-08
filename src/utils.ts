export const stringToByteArray = (value: string): Uint8Array => 
    new TextEncoder().encode(value);

export const stringFromByteArray = (bytes: Uint8Array): string =>
    new TextDecoder().decode(bytes);