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
    if (b.isZero()) throw new Error("Math error: div 0")
    return a.div(b);
}

export function gcd(a, b) {
    a = a.abs();
    b = b.abs();
    while(!b.isZero()) {
        const temp = b;
        b = a.mod(b);
        a = temp;
    }

    return a;
}

export function lcm(a, b) {
    if (a.isZero() || b.isZero()) return new Decimal(0);
    // LCM(a,b) = |ab|/GCD(a,b)
    return a.times(b).abs().div(gcd(a, b));
}