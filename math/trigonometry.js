export default function computeTrig(fn, a) {
    const mathErrorLimit = (Decimal.acos(-1)).times(Decimal(0.5)).times(Decimal(1e8));
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
        case "tan":
            output = a.tan(); break;
    }
    
    // Round the output
    const precision = 13-Decimal.log10(a.div(Decimal.acos(-1))).floor();
    output = output.toDP(precision);
    
    return output;
}