import { stringToByteArray } from "../utils";

export const getPasswordHash = async (key: string): Promise<Uint8Array> => {
    const data = stringToByteArray(key);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hash);
}