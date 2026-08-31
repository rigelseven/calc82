export function decimalReplacer(key, value) {
    if (value instanceof Decimal) {
        return {
            s: Number(value.s),
            e: Number(value.e),
            d: value.d.map(Number)
        };
    }

    return value;
}

export function decimalReviver(key, value) {
    if (
        value &&
        typeof value === "object" &&
        "s" in value &&
        "e" in value &&
        Array.isArray(value.d)
    ) {
        return new Decimal(value);
    }

    return value;
}