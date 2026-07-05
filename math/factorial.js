export default function factorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Math ERROR (factorial undefined)")
    }

    let result = 1;
    for(let i=2;i<=n;++i) {
        result *= i;
    }

    return result;
}