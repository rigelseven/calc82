import { safeRoot, safeSquareRoot } from "../math/root.js";
import { computeTrig, computeInverseTrig, computeHypTrig, computeInverseHypTrig } from "../math/trigonometry.js"

export const FUNCTIONS = {
    sin: a => computeTrig("sin", a),
    cos: a => computeTrig("cos", a),
    tan: a => computeTrig("tan", a),
    asin: a => computeInverseTrig("asin", a),
    acos: a => computeInverseTrig("acos", a),
    atan: a => computeInverseTrig("atan", a),

    sinh: a => computeHypTrig("sinh", a),
    cosh: a => computeHypTrig("cosh", a),
    tanh: a => computeHypTrig("tanh", a),
    asinh: a => computeInverseHypTrig("asinh", a),
    acosh: a => computeInverseHypTrig("acosh", a),
    atanh: a => computeInverseHypTrig("atanh", a),

    sqrt: a => safeSquareRoot(a),
    root: (value, n) => safeRoot(value, n),

    ln: a => a.ln(),
    log: a => a.log10(),

    abs: a=>a.abs()
}