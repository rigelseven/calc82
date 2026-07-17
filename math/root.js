export function safeSquareRoot(a) {
    if (a.isNeg()) {
        throw new Error("Math error: negative root undefined");
    }

    return a.sqrt();
}

export function safeRoot(n, value) {

    if (n.isZero()) {
        throw new Error("Math error: Zero root");
    }

    if (value.isNeg()) {

        // even root of negative number
        if (n.mod(2).isZero()) {
            throw new Error("Math ERROR");
        }

        // odd root: root of magnitude, then restore sign
        return safeRoot(value.negated(), n).negated();
    }

    return value.pow(Decimal(1).div(n));
}