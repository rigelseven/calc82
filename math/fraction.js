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

    simplfiy() {
        // TODO
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
}