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
    ",": { type: "COMMA" }
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