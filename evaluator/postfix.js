import factorial from "../math/factorial.js";
import trigSolver from "../math/trigonometry.js";

export const POSTFIX = {
    "FACTORIAL": a => factorial(a),
    "PERCENT": a => a.div(100),
    "RADIANS": a => trigSolver.convertAngle(a, "rad"),
    "GRADIANS": a => trigSolver.convertAngle(a, "gra"),
    "DEGREES": a => trigSolver.convertAngle(a, "deg")
}