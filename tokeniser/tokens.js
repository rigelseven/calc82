export const SYMBOLS = {
    "PLUS": { type: "PLUS" },
    "MINUS": { type: "MINUS" },
    "MULTIPLY": { type: "MULTIPLY" },
    "DIVIDE": { type: "DIVIDE" },
    //"INLINEPOWER": { type: "POWER" },  // TODO: for line io
    "LPAREN": { type: "LPAREN" },
    "RPAREN": { type: "RPAREN" },
    "FACTORIAL": { type: "FACTORIAL" },
    "PERCENT": { type: "PERCENT" },
    "COMMA": { type: "COMMA" },
    "PERMUTATION": { type: "PERMUTATION" },
    "COMBINATION": { type: "COMBINATION" },
    "RADIANS": { type: "RADIANS" },
    "GRADIANS": { type: "GRADIANS" },
    "DEGREES": { type: "DEGREES" },
    "INLINEFRAC": { type: "FRACTION" }  // TODO: for line io
}

export const MULTICHAR = {
    "FRACTION": {
        start: ["LPAREN"],
        middle: ["RPAREN", "FRACTION", "LPAREN"],
        end: ["RPAREN"]
    },
    "MIXEDFRAC": {
        start: ["LPAREN"],
        middle: ["RPAREN", "FRACTION", "LPAREN"],
        middle2: ["RPAREN", "FRACTION", "LPAREN"],
        end: ["RPAREN"]
    },
    "POWER": {
        start: ["POWER", "LPAREN"],
        end: ["RPAREN"]
    },
    "SQRT": {
        start: [{"f": "sqrt"}, "LPAREN"],
        end: ["RPAREN"]
    },
    "ROOT": {
        start: [{"f": "root"}, "LPAREN"],
        middle: ["COMMA"],
        end: ["RPAREN"]
    },
    "ABS": {
        start: [{"f": "abs"}, "LPAREN"],
        end: ["RPAREN"]
    },
}

// TODO: everything below here is no longer used.

export const FUNCTIONS = new Set([
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",

    "sinh",
    "cosh",
    "tanh",
    "asinh",
    "acosh",
    "atanh",

    "log",
    "ln",

    "sqrt",
    "root",

    "abs",

    "RanInt",

    "lcm",
    "gcd"
]);

export const CONSTANTS = new Set([
    "pi",
    "e"
]);

export const VARIABLES = new Set([
    "vA",
    "vB",
    "vC",
    "vD",
    "vE",
    "vF",
    "M",
    "Ran"
])