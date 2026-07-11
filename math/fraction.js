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

    toDecimalIfExceeding() {
        const threshold = 7;

        if (Math.abs(this.numerator.e) + Math.abs(this.denominator.e) > 7) 
            return this.numerator.div(this.denominator);

        if (this.denominator.toNumber() === 1) return this.numerator;
        
        return this;
    }

    static plus(a, b) {
        a = Fraction.toFraction(a, true);
        b = Fraction.toFraction(b, true);
        return new Fraction(
            a.numerator.times(b.denominator)
                .plus(b.numerator.times(a.denominator)),
            a.denominator.times(b.denominator)
        ).simplify().toDecimalIfExceeding();
    }

    static times(a, b) {
        a = Fraction.toFraction(a, true);
        b = Fraction.toFraction(b, true);
        return new Fraction(
            a.numerator.times(b.numerator),
            a.denominator.times(b.denominator)
        ).simplify().toDecimalIfExceeding();
    }

    static divide(a, b) {
        a = Fraction.toFraction(a, true);
        b = Fraction.toFraction(b, true);
        return new Fraction(
            a.numerator.times(b.denominator),
            a.denominator.times(b.numerator)
        ).simplify().toDecimalIfExceeding();
    }

    pow(a) {
        // Fraction exponent
        if (a instanceof Fraction) {

            const p = a.numerator;
            const q = a.denominator;

            const numRoot = Fraction.exactRoot(this.numerator, q);
            const denRoot = Fraction.exactRoot(this.denominator, q);

            if (numRoot !== null && denRoot !== null) {
                return new Fraction(
                    numRoot.pow(p),
                    denRoot.pow(p)
                ).simplify().toDecimalIfExceeding();
            }

            return this.toDecimal().pow(a.toDecimal());
        }

        // Integer exponent
        if (a.isInteger()) {
            return new Fraction(
                this.numerator.pow(a),
                this.denominator.pow(a)
            ).simplify().toDecimalIfExceeding();
        }

        // Decimal exponent
        return this.toDecimal().pow(a);
    }

    static exactRoot(x, n) {
        const root = x.pow(new Decimal(1).div(n));
        const rounded = root.round();
        if (rounded.pow(n).eq(x)) {
            return rounded;
        }

        return null;
    }

    sqrt() {
        return this.pow(new Fraction(new Decimal(1), new Decimal(2)));
    }

    abs() {
        return new Fraction(this.numerator.abs(), this.denominator.abs());
    }

    reciprocate() {
        return new Fraction(this.denominator, this.numerator);
    }

    negated() {
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

    isZero() {
        return this.numerator.isZero();
    }

    isNegative() {
        return this.numerator.isNegative() !== this.denominator.isNegative();
    }
    isNeg() {this.isNegative();}


    static fromDecimals(numerator, denominator) {
        const nDp = numerator.decimalPlaces();
        const dDp = denominator.decimalPlaces();

        const scale = Decimal.max(nDp, dDp);

        const factor = new Decimal(10).pow(scale)

        numerator.times(factor),
        denominator.times(factor)

        return new Fraction(
            numerator.times(factor),
            denominator.times(factor)
        ).simplify().toDecimalIfExceeding();
    }

    static fromDecimal(a, strict=false) {
        const {0: numerator, 1: denominator} = a.toFraction("1e12");
        const fraction = Fraction.fromDecimals(numerator, denominator);
        if (fraction instanceof Fraction && (fraction.denominator.toNumber() !== 1)) return fraction;
        if (strict) return new Fraction(a, new Decimal(1))
        return a;
    }

    static toFraction(a, strict=false) {
        if (a instanceof Fraction) return a;
        return Fraction.fromDecimal(a, strict);
    }
}