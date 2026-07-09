export function computeTrig(fn, a) {
    const PI = Decimal.acos(-1);
    const HALF_PI = PI.div(2);

    const mathErrorLimit = HALF_PI.times(Decimal(1e8));
    if (a.abs().gte(mathErrorLimit)) {
        throw new Error("Math error: trig argument too large")
    }

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

export function computeInverseTrig(fn, a) {
    let output;

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

    return output;
}

export function computeHypTrig(fn, a) {
    let output;

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

export function computeInverseHypTrig(fn, a) {
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