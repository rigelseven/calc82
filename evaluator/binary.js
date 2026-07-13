import { safePower } from "../math/power.js";
import { permutation, combination } from "../math/combinatorics.js";
import { divide, minus, plus, times } from "../math/arithmetic.js";
import { safeRoot } from "../math/root.js";

export const BINARY = {
    PLUS: (a, b) => plus(a, b),
    MINUS: (a, b) => minus(a, b),
    MULTIPLY: (a, b) => times(a, b),
    DIVIDE: (a, b) => divide(a, b),
    ROOT: (a, b) => safeRoot(a, b),
    POWER: (base, exponent) => safePower(base, exponent),
    PERMUTATION: (n, r) => permutation(n, r),
    COMBINATION: (n, r) => combination(n, r)
}