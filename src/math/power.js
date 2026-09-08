import Fraction from "./fraction.js";

export function safePower(base, exponent) {

    if (exponent instanceof Fraction) base = Fraction.toFraction(base, true);

    if (base.isNegative()) {

        const [numerator, denominator] =
            exponent.toFraction(1e13);

        // even root of negative number
        if (denominator.mod(2).isZero()) {
            return Decimal.NaN;
        }

        const result = base.negated()
            .pow(numerator.div(denominator));

        return numerator.mod(2).isZero()
            ? result
            : result.negated();
    }

    return base.pow(exponent);
}