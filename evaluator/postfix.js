import factorial from "../math/factorial.js";

export const POSTFIX = {
    "FACTORIAL": a => factorial(a),
    "PERCENT": a => a.div(100)
}