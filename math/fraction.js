import { gcd } from "./arithmetic.js";

export default class Fraction {
    constructor(numerator, denominator) {
        if (denominator.isZero()) {
            throw new Error("Math error: div 0");
        }

        this.numerator = numerator;
        this.denominator = denominator;
    }

    clone() {
        return new Fraction(this.numerator, this.denominator);
    }

    simplify() {
        const ndGcd = gcd(this.numerator, this.denominator);

        this.numerator = this.numerator.div(ndGcd);
        this.denominator = this.denominator.div(ndGcd);

        if (this.denominator.isNeg()) {
            this.numerator = this.numerator.neg();
            this.denominator = this.denominator.neg();
        }

        return this;
    }

    plus(other) {
        // TODO
    }

    minus(other) {
        // TODO
    }
    
    times(other) {
        // TODO
    }
    
    divide(other) {
        // TODO
    }

    reciprocate() {
        return new Fraction(this.denominator, this.numerator);
    }

    negate() {
        return new Fraction(this.numerator.negated(), this.denominator);
    }

    toDecimal() {
        return this.numerator.div(this.denominator);
    }

    toStringImproper() {
        return `${this.numerator}f${this.denominator}`
    }

    toStringMixed() {
        // TODO
    }

    static fromDecimals(numerator, denominator) {
        const nDp = numerator.decimalPlaces();
        const dDp = denominator.decimalPlaces();

        const scale = Decimal.max(nDp, dDp);

        const factor = new Decimal(10).pow(scale)

        return new Fraction(
            numerator.times(factor),
            denominator.times(factor)
        ).simplify();
    }
}