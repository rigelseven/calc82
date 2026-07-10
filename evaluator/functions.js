import { safeRoot, safeSquareRoot } from "../math/root.js";
import trigSolver from "../math/trigonometry.js";
import { randomInteger } from "../math/random.js";

export const FUNCTIONS = {
    sin: a => trigSolver.computeTrig("sin", a),
    cos: a => trigSolver.computeTrig("cos", a),
    tan: a => trigSolver.computeTrig("tan", a),
    asin: a => trigSolver.computeInverseTrig("asin", a),
    acos: a => trigSolver.computeInverseTrig("acos", a),
    atan: a => trigSolver.computeInverseTrig("atan", a),

    sinh: a => trigSolver.computeHypTrig("sinh", a),
    cosh: a => trigSolver.computeHypTrig("cosh", a),
    tanh: a => trigSolver.computeHypTrig("tanh", a),
    asinh: a => trigSolver.computeInverseHypTrig("asinh", a),
    acosh: a => trigSolver.computeInverseHypTrig("acosh", a),
    atanh: a => trigSolver.computeInverseHypTrig("atanh", a),

    sqrt: a => safeSquareRoot(a),
    root: (value, n) => safeRoot(value, n),

    ln: a => a.ln(),
    log: a => a.log10(),

    abs: a => a.abs(),

    RanInt: (a, b) => randomInteger(a, b)
}