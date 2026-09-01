import { safeRoot, safeSquareRoot } from "../math/root.js";
import trigSolver from "../math/trigonometry.js";
import { randomInteger } from "../math/random.js";
import { lcm, gcd } from "../math/arithmetic.js";
import Fraction from "../math/fraction.js";
import { Polar, Rectangular } from "../math/polRec.js";

export const FUNCTIONS = {
    sin: {fn: a => trigSolver.computeTrig("sin", a.toDecimal()), args: 1},
    cos: {fn: a => trigSolver.computeTrig("cos", a.toDecimal()), args: 1},
    tan: {fn: a => trigSolver.computeTrig("tan", a.toDecimal()), args: 1},
    asin: {fn: a => trigSolver.computeInverseTrig("asin", a.toDecimal()), args: 1},
    acos: {fn: a => trigSolver.computeInverseTrig("acos", a.toDecimal()), args: 1},
    atan: {fn: a => trigSolver.computeInverseTrig("atan", a.toDecimal()), args: 1},

    sinh: {fn: a => trigSolver.computeHypTrig("sinh", a.toDecimal()), args: 1},
    cosh: {fn: a => trigSolver.computeHypTrig("cosh", a.toDecimal()), args: 1},
    tanh: {fn: a => trigSolver.computeHypTrig("tanh", a.toDecimal()), args: 1},
    asinh: {fn: a => trigSolver.computeInverseHypTrig("asinh", a.toDecimal()), args: 1},
    acosh: {fn: a => trigSolver.computeInverseHypTrig("acosh", a.toDecimal()), args: 1},
    atanh: {fn: a => trigSolver.computeInverseHypTrig("atanh", a.toDecimal()), args: 1},

    sqrt:{fn: a => safeSquareRoot(a), args: 1},
    root: {fn: (n, value) => safeRoot(n, value), args: 2},

    ln: {fn: a => a.toDecimal().ln(), args: 1},
    log: {fn: a => a.toDecimal().log(10), args: 1},

    exp: {fn: a => a.toDecimal().exp(), args: 1},
    exp10: {fn: a => Decimal.pow(10, a.toDecimal()), args: 1},

    abs: {fn: a => a.abs(), args: 1},

    round: {fn: a => a.toDecimal().round(), args: 1},

    randomInt: {fn: (a, b) => randomInteger(a.toDecimal(), b.toDecimal()), args: 2},

    lcm: {fn: (a, b) => lcm(a.toDecimal(), b.toDecimal()), args: 2},
    gcd: {fn: (a, b) => gcd(a.toDecimal(), b.toDecimal()), args: 2},

    pol: {fn: (a, b) => Polar.fromXY(a.toDecimal(), b.toDecimal()), args: 2},
    rec: {fn: (a, b) => Rectangular.fromPolar(a.toDecimal(), b.toDecimal()), args: 2},
}