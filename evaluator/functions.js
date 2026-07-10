import { safeRoot, safeSquareRoot } from "../math/root.js";
import trigSolver from "../math/trigonometry.js";
import { randomInteger } from "../math/random.js";
import { lcm, gcd } from "../math/arithmetic.js";

export const FUNCTIONS = {
    sin: {fn: a => trigSolver.computeTrig("sin", a), args: 1},
    cos: {fn: a => trigSolver.computeTrig("cos", a), args: 1},
    tan: {fn: a => trigSolver.computeTrig("tan", a), args: 1},
    asin: {fn: a => trigSolver.computeInverseTrig("asin", a), args: 1},
    acos: {fn: a => trigSolver.computeInverseTrig("acos", a), args: 1},
    atan: {fn: a => trigSolver.computeInverseTrig("atan", a), args: 1},

    sinh: {fn: a => trigSolver.computeHypTrig("sinh", a), args: 1},
    cosh: {fn: a => trigSolver.computeHypTrig("cosh", a), args: 1},
    tanh: {fn: a => trigSolver.computeHypTrig("tanh", a), args: 1},
    asinh: {fn: a => trigSolver.computeInverseHypTrig("asinh", a), args: 1},
    acosh: {fn: a => trigSolver.computeInverseHypTrig("acosh", a), args: 1},
    atanh: {fn: a => trigSolver.computeInverseHypTrig("atanh", a), args: 1},

    sqrt:{fn: a => safeSquareRoot(a), args: 1},
    root: {fn: (n, value) => safeRoot(n, value), args: 2},

    ln: {fn: a => a.ln(), args: 1},
    log: {fn: a => a.log10(), args: 1},

    abs: {fn: a => a.abs(), args: 1},

    RanInt: {fn: (a, b) => randomInteger(a, b), args: 2},

    lcm: {fn: (a, b) => lcm(a, b), args: 2},
    gcd: {fn: (a, b) => gcd(a, b), args: 2},
}