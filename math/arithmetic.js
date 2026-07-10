export function plus(a, b) {
    return a.plus(b);
}

export function minus(a, b) {
    return a.minus(b);
}

export function times(a, b) {
    return a.times(b);
}

export function divide(a, b) {
    throw new Error("Math error: div 0")
    return a.div(b);
}