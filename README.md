# @logismika/crypto

Implementation of the Kuznechik encryption algorithm according to GOST 34.12 - 2015.

## Installation

To install and set up the library, run:

```sh
$ npm install @logismika/crypto
```

## Usage

### encrypt

```ts
const encryptedData = encrypt("Secret", new Uint8Array([1, 2, 3]));
```

### decrypt

```ts
const decryptedData = decrypt("Secret", encryptedData, 3);
```

*Note:* `3` is a length of decrypted array.

## Example

```ts
import { decrypt, encrypt } from "@logismika/crypto";

const secretKey = "Secret";
const dataToEncrypt = new Uint8Array([1, 1, 1, 100, 100, 200]);

const len = dataToEncrypt.length;
const encryptedData = encrypt(secretKey, dataToEncrypt);

const decryptedData = decrypt(secretKey, encryptedData, len);
```