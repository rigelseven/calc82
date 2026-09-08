export function randomInteger(a, b) {
    if (!a.isInt() || !b.isInt() || a.greaterThan(b)) {
        throw new Error('Argument error: invalid range');
    }

    const min = new Decimal("-1e10");
    const max = new Decimal("1e10");
    const range = b.minus(a).plus(1);
    if (a.lte(min) || b.gte(max) || range.greaterThan(max.plus(1))) {
        throw new Error('Argument error: arguments/range must be <1e10');
    }

    return Decimal.random().times(range).plus(a).floor();
}