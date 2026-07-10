import factorial from "./factorial.js";

export function permutation(n, r) {
    // nPr = n!/(n-r)!
    return factorial(n).div(factorial(n.minus(r)));
}

export function combination(n, r) {
    // nCr = n!/(r!*(n-r)!)
    return factorial(n).div(factorial(r).times(factorial(n.minus(r))))
}