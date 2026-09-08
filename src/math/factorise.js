import { gcd } from "./arithmetic.js";

function pollardRho(n) {
    if (n.modulo(2).isZero()) return new Decimal(2);

    let x = new Decimal(2);
    let y = new Decimal(2);
    let d = new Decimal(1);
    let c = new Decimal(1);

    const f = (val) => val.times(val).plus(c).modulo(n);

    while (d.equals(1)) {
        x = f(x);
        y = f(f(y));
        d = gcd(x.minus(y), n);
    }

    if (d.equals(n)) {
        return null;
    }
    return d;
}

export function getAllPrimeFactors(n) {
    let factors = [];

    // Error cases
    if (Math.abs(n.e) >= 10 || !n.isInt() || n.isNeg() || n.equals(0)) throw new Error("Math ERROR")

    if (n.equals(1)) return [1];

    if (n.lessThanOrEqualTo(1)) return [];

    // Trial division for small primes
    const smallPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    for (let prime of smallPrimes) {
        let pDec = new Decimal(prime);
        while (n.modulo(pDec).isZero()) {
            factors.push(pDec);
            n = n.dividedBy(pDec);
        }
    }

    // Pollard's Rho for the remaining large composite segments
    let cMod = 1;
    while (n.greaterThan(1)) {
        let factor = pollardRho(n, cMod);

        if (factor === null) {
            // If Rho failed, try changing the constant parameter polynomial
            cMod++;
            if (cMod > 5) {
                // If multiple attempts fail, the remaining number is likely prime
                factors.push(n);
                break;
            }
            continue;
        }

        let subFactors = getAllPrimeFactors(factor);
        factors.push(...subFactors);

        n = n.dividedBy(factor);
    }

    return factors.sort((a, b) => new Decimal(a).minus(new Decimal(b)));
}