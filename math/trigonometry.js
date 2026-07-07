export default function computeTrig(fn, a) {
    const mathErrorLimit = (Decimal.acos(-1)).div(Decimal(2)).times(Decimal(1e8));
    if (a.abs().gte(mathErrorLimit)) {
        throw new Error("Math error: trig argument too large")
    }

    const smallAngleThreshold = new Decimal("1e-11");
    const smallAngleMax = new Decimal("1e-98");
    if (fn === "sin" || fn === "cos"){
        if (a.abs().lt(smallAngleMax)) {
            return 0;
        }
        if (a.abs().lt(smallAngleThreshold)) {
            return a.sin();
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
    

    // Truncate to 14 dp
    output = output.toDP(14)//, Decimal.ROUND_DOWN);
    
    // TODO Check sf of the output. If less than 3, return 0

    return output;
}

