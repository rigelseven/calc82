import safeSquareRoot from "../math/root.js";

export const FUNCTIONS = {
    sin: a => a.sin(),
    cos: a => a.cos(),
    tan: a => a.tan(),
    sqrt: a => safeSquareRoot(a),
    ln: a => a.ln(),
    log: a => a.log10()
}