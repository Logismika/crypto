import { byte } from '../src/utils/kuznechik/types';
import { expandKey } from '../src/utils/kuznechik/expandKey';
import assert from 'assert';

describe('expandKey function tests', () => {
    it('Create a key', () => {
        const test_key: byte[] = [
            0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01,
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
            0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88
        ];

        const actual = expandKey(test_key);

        console.log("** KEY", actual);

        assert.notEqual(actual, null);
    });
});