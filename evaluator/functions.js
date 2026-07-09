import safeSquareRoot from "../math/root.js";
import { computeInverseTrig, computeTrig } from "../math/trigonometry.js"

export const FUNCTIONS = {
    sin: a => computeTrig("sin", a),
    cos: a => computeTrig("cos", a),
    tan: a => computeTrig("tan", a),
    asin: a => computeInverseTrig("asin", a),
    acos: a => computeInverseTrig("acos", a),
    atan: a => computeInverseTrig("atan", a),
    sqrt: a => safeSquareRoot(a),
    ln: a => a.ln(),
    log: a => a.log10()
}