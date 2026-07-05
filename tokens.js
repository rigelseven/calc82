export const SYMBOLS = {
    "+": { type: "PLUS" },
    "-": { type: "MINUS" },
    "*": { type: "MULTIPLY" },
    "/": { type: "DIVIDE" },
    "^": { type: "POWER" },
    "(": { type: "LPAREN" },
    ")": { type: "RPAREN" }
}

export const FUNCTIONS = new Set([
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
    "sqrt"
]);

export const CONSTANTS = new Set([
    "pi",
    "e"
]);