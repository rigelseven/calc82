import { divide } from "../math/arithmetic.js";
import factorial from "../math/factorial.js";
import trigSolver from "../math/trigonometry.js";

export const POSTFIX = {
    "FACTORIAL": a => factorial(a),
    "PERCENT": a => divide(a, new Decimal(100)),
    "RADIANS": a => trigSolver.convertAngle(a.toDecimal(), "rad"),
    "GRADIANS": a => trigSolver.convertAngle(a.toDecimal(), "gra"),
    "DEGREES": a => trigSolver.convertAngle(a.toDecimal(), "deg")
}