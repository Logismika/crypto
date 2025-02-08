export type AlgorythmType = "Kuznechik";

export interface Options {
    /**
     * Crypto Algorythm Type.
     * Default: "Kuznechik"
     */
    readonly algorythm?: AlgorythmType;

    /**
     * Compression Format
     * Default: undefined (without compression)
     */
    readonly compression?: CompressionFormat;

    readonly solt?: string | Uint8Array;
}