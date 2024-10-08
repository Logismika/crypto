import { vect } from '../src/utils/kuznechik/types';
import { expandKey } from '../src/utils/kuznechik/expandKey';
import { expect } from 'chai';
import { encryptBlock } from '../src/utils/kuznechik';

describe('Encrypt tests', () => {
    it('encryptBlock vect', () => {
        const test_key: vect = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const test_string: vect = [
            0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
            0x00, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11
        ];

        const expected: vect = [
            0xcd, 0xed, 0xd4, 0xb9, 0x42, 0x8d, 0x46, 0x5a,
            0x30, 0x24, 0xbc, 0xbe, 0x90, 0x9d, 0x67, 0x7f
        ];

        const expandedKey = expandKey(test_key);
        const actual = encryptBlock(expandedKey, test_string);

        expect(actual).deep.eq(expected);
    });

    it('encryptBlock string', () => {
        const test_key = "Secret phrase!";

        const test_string: vect = [
            0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
            0x00, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11
        ];

        const expected: vect = [
            0x05, 0xAF, 0xD9, 0xAB, 0x65, 0x9E, 0xAA, 0x9F,
            0x13, 0xC0, 0x06, 0xC9, 0x54, 0x48, 0x42, 0xDD
        ];

        const expandedKey = expandKey(test_key);
        const actual = encryptBlock(expandedKey, test_string);

        expect(actual).deep.eq(expected);
    });
});