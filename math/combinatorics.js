import factorial from "./factorial.js";

export function permutation(n, r) {
    n = new Decimal(n);
    r = new Decimal(r);

    if (r.isNegative() || r.gt(n)) {
        return new Decimal(0);
    }

    let result = new Decimal(1);

    for (let i = new Decimal(0); i.lt(r); i = i.plus(1)) {
        result = result.times(n.minus(i));
    }

    return result;
}

export function combination(n, r) {
    n = new Decimal(n);
    r = new Decimal(r);

    if (r.isNegative() || r.gt(n)) {
        return new Decimal(0);
    }

    // C(n, r) = C(n, n-r)
    if (r.gt(n.div(2))) {
        r = n.minus(r);
    }

    let result = new Decimal(1);

    for (let i = new Decimal(1); i.lte(r); i = i.plus(1)) {
        result = result
            .times(n.minus(r).plus(i))
            .div(i);
    }

    return result;
}