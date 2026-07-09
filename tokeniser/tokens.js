export const SYMBOLS = {
    "+": { type: "PLUS" },
    "-": { type: "MINUS" },
    "*": { type: "MULTIPLY" },
    "/": { type: "DIVIDE" },
    "^": { type: "POWER" },
    "(": { type: "LPAREN" },
    ")": { type: "RPAREN" },
    "!": { type: "FACTORIAL"}
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
    "sqrt"
]);

export const CONSTANTS = new Set([
    "pi",
    "e"
]);