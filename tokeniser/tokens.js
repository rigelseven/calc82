export const SYMBOLS = {
    "+": { type: "PLUS" },
    "-": { type: "MINUS" },
    "*": { type: "MULTIPLY" },
    "/": { type: "DIVIDE" },
    "^": { type: "POWER" },
    "(": { type: "LPAREN" },
    ")": { type: "RPAREN" },
    "!": { type: "FACTORIAL" },
    "%": { type: "PERCENT" },
    ",": { type: "COMMA" },
    "P": { type: "PERMUTATION" },
    "C": { type: "COMBINATION" }
}

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

    "abs"
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