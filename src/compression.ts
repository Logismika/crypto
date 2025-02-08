export const compressByteArray = (bytes: Uint8Array, format: CompressionFormat): Promise<Uint8Array> => 
    compressBlob(new Blob([bytes]), format);

export const decompressByteArray = (bytes: Uint8Array, format: CompressionFormat): Promise<Uint8Array> => 
    decompressBlob(new Blob([bytes]), format);

const compressBlob = async (blob: Blob, format: CompressionFormat): Promise<Uint8Array> => {
    const compressedStream = blob.stream().pipeThrough(new CompressionStream(format));
    return new Uint8Array(await new Response(compressedStream).arrayBuffer());
}

const decompressBlob = async (blob: Blob, format: CompressionFormat): Promise<Uint8Array> => {
    const ds = new DecompressionStream(format);
    const decompressedStream = blob.stream().pipeThrough(ds);
    return new Uint8Array(await new Response(decompressedStream).arrayBuffer());
}
