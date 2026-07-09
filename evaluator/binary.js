import { safePower } from "../math/power.js";

export const BINARY = {
    PLUS: (a, b) => a.plus(b),
    MINUS: (a, b) => a.minus(b),
    MULTIPLY: (a, b) => a.times(b),
    DIVIDE: (a, b) => a.div(b),
    POWER: (base, exponent) => safePower(base, exponent)
}