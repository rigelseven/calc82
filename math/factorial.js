export default function factorial(n) {
    if (!Decimal.isDecimal(n) || !n.isInt() || n.lessThan(0)) {
        throw new Error("Math error: factorial undefined")
    }

    let result = new Decimal(1);
    for(let i=2;i<=n;++i) {
        result = result.times(Decimal(i));
    }
    console.log(result)
    return result;
}