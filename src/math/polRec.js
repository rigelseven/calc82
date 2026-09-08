import Fraction from "./fraction.js";
import trigSolver from "./trigonometry.js";

export class Polar {
    constructor(modulus, argument) {
        this.modulus = new Decimal(modulus);
        this.argument = new Decimal(argument);
    }

    static fromXY(X, Y) {
        X = new Decimal(X);
        Y = new Decimal(Y);

        const modulus = X.pow(2).plus(Y.pow(2)).sqrt();
        
        let argument;

        const PI = Decimal.acos(0).times(2);

        if (X.isZero()) {
            if (Y.isZero()) {
                argument = new Decimal(0);
            } else {
                argument = Y.isNegative()
                    ? PI.div(2).neg()
                    : PI.div(2);
            }
        } else {
            argument = trigSolver.computeInverseTrig("atan", Y.div(X));

            if (X.isNegative()) {
                argument = Y.isNegative()
                    ? argument.minus(PI)
                    : argument.plus(PI);
            }
        }

        return new Polar(modulus, argument);
    }

    toDecimal() {
        return this.modulus;
    }

    toFraction() {
        return Fraction.fromDecimal(this.toDecimal());
    }
}

export class Rectangular {
    constructor(X, Y) {
        this.X = new Decimal(X);
        this.Y = new Decimal(Y);
    }

    static fromPolar(modulus, argument) {
        modulus = new Decimal(modulus);
        argument = new Decimal(argument);

        const X = modulus.times(trigSolver.computeTrig("cos", argument));
        const Y = modulus.times(trigSolver.computeTrig("sin", argument));

        return new Rectangular(X, Y);
    }

    toDecimal() {
        return this.X;
    }

    toFraction() {
        return Fraction.fromDecimal(this.toDecimal());
    }
}

