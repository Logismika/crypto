import * as R from "ramda";
import { BLOCK_SIZE } from "./consts";
import { byte, vect } from "./types";

export const createVect = (): vect => R.range(0, BLOCK_SIZE).map(() => 0 as byte);
