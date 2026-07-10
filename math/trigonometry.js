class TrigSolver {
    constructor(angleMode = "rad") {
        this.angleMode = angleMode;
        this.PI = Decimal.acos(-1);
        this.HALF_PI = this.PI.div(2);
    }

    setAngleMode(angleMode) {
        this.angleMode = angleMode;
    }

    computeTrig(fn, a) {
        a = this.convertAngle(a, this.angleMode, "rad");

        const PI = this.PI;
        const HALF_PI = this.HALF_PI;

        this.checkTrigRange(a);

        const smallAngleThreshold = new Decimal("1e-11");
        const smallAngleMax = new Decimal("1e-98");
        if (fn === "sin" || fn === "tan"){
            if (a.abs().lt(smallAngleMax)) {
                return 0;
            }
            if (a.abs().lt(smallAngleThreshold)) {
                return a;
            }
        }

        let output;

        switch (fn) {
            case "sin":
                output = a.sin(); break;
            case "cos":
                output = a.cos(); break;
            case "tan": {
                // Reduce to nearest +/-pi/2 pole
                const k = a.div(PI).round();
                const offset = a.sub(k.mul(PI));

                const x = offset.sub(HALF_PI.mul(offset.s));

                // Near tan pole
                if (x.abs().lt("1e-4")) {
                    output = x;
                } else {
                    output = a.tan();
                }
            }
        }

        
        // Compute precision based on trig rotation
        const rotations = a.abs().div(PI.mul(2));
        const precision = "1e-".concat(12 - Decimal.log10(rotations).floor());
        
        // Evaluate when tan goes to infinity by cosine denominator
        if (fn === "tan") {
            const cosValue = Decimal.cos(a);

            if (cosValue.abs().lt(precision)) {
                throw new Error("Math error: tan infinity");
            }
        }

        // Snap to clean values
        if (fn === "sin" || fn === "cos") {
            console.log(output.abs().toNumber(), precision)
            if (output.sub(1).abs().lt(precision)) {
                output = new Decimal(1);
            } else if (output.add(1).abs().lt(precision)) {
                output = new Decimal(-1);
            } else if (output.abs().lt(precision)) {
                output = new Decimal(0);
            }
        }

        if (fn === "tan") {
            if (output.abs().lt(precision)) {
                output = new Decimal(0);
            }
        }

        return output;
    }

    computeInverseTrig(fn, a) {
        let output;

        this.checkTrigRange(a);

        if (fn === "asin") {
            output = a.asin();
        } else if (fn === "acos") {
            output = a.acos();
        } else if (fn === "atan") {
            output = a.atan();
        }

        if (isNaN(output)) {
            throw new Error("Math error: inverse trig out of range")
        }

        output = this.convertAngle(output, "rad", this.angleMode);

        return output;
    }

    computeHypTrig(fn, a) {
        const MAX_HYP_INPUT = 240;
        let output;

        this.checkTrigRange(a);

        if ((fn === "sinh" || fn === "cosh") && a.abs().gt(MAX_HYP_INPUT)) {
            throw new Error("Math error: hyperbolic trig out of range");
        }

        if (fn === "sinh") {
            output = a.sinh();
        } else if (fn === "cosh") {
            output = a.cosh();
        } else if (fn === "tanh") {
            output = a.tanh();
        }

        if (isNaN(output)) {
            throw new Error("Math error: hyp trig out of range")
        }

        return output;
    }

    computeInverseHypTrig(fn, a) {
        let output;

        if (fn === "asinh") {
            output = a.asinh();
        } else if (fn === "acosh") {
            output = a.acosh();
        } else if (fn === "atanh") {
            output = a.atanh();
        }

        if (isNaN(output)) {
            throw new Error("Math error: inverse hyp trig out of range")
        }

        return output;
    }

    checkTrigRange(a) {
        const mathErrorLimit = this.HALF_PI.times(Decimal(1e8));
        if (a.abs().gte(mathErrorLimit)) {
            throw new Error("Math error: trig argument too large")
        }
    }

    convertAngle(a, current=this.angleMode, target=this.angleMode) {
        switch (`${current}->${target}`) {
            case "deg->rad":
                return a.mul(this.PI).div(180);
            case "rad->deg":
                return a.mul(180).div(this.PI);
            case "gra->rad":
                return a.mul(this.PI).div(200);
            case "rad->gra":
                return a.mul(200).div(this.PI);
            case "deg->gra":
                return a.mul(10).div(9);
            case "gra->deg":
                return a.mul(9).div(10);
            default:
                return a;
        }
    }
}

const trigSolver = new TrigSolver;
export default trigSolver;