import safeSquareRoot from "../math/root.js";
import computeTrig from "../math/trigonometry.js"

export const FUNCTIONS = {
    sin: a => computeTrig("sin", a),
    cos: a => computeTrig("cos", a),
    tan: a => computeTrig("tan", a),
    sqrt: a => safeSquareRoot(a),
    ln: a => a.ln(),
    log: a => a.log10()
}