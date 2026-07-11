import Fraction from "./fraction.js";

export function plus(a, b) {
    if (a instanceof Fraction || b instanceof Fraction) {
        return Fraction.plus(a, b);
    }
    return a.plus(b);
}

export function minus(a, b) {
    return plus(a, b.negated());
}

export function times(a, b) {
    if (a instanceof Fraction || b instanceof Fraction) {
        return Fraction.times(a, b);
    }
    return a.times(b);
}

export function divide(a, b) {
    if (b.isZero()) throw new Error("Math error: div 0");
    if (a instanceof Fraction || b instanceof Fraction) {
        return Fraction.divide(a, b);
    }
    // TODO fraction coercion for math io mode only
    const frac = Fraction.fromDecimals(a, b)
    if (frac instanceof Fraction) return frac;

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