export const SYMBOLS = {
    "PLUS": { type: "PLUS" },
    "MINUS": { type: "MINUS" },
    "UNARYMINUS": { type: "UNARYMINUS" },
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
        start: ["LPAREN", "LPAREN"],
        middle: ["RPAREN", "FRACTION", "LPAREN"],
        end: ["RPAREN", "RPAREN"]
    },
    "MIXEDFRAC": {
        start: ["LPAREN", "LPAREN"],
        middle: ["RPAREN", "FRACTION", "LPAREN"],
        middle2: ["RPAREN", "FRACTION", "LPAREN"],
        end: ["RPAREN", "RPAREN"]
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
    "EXP": {
        start: [{"f": "exp"}, "LPAREN"],
        end: ["RPAREN"]
    },
    "EXP10": {
        start: [{"f": "exp10"}, "LPAREN"],
        end: ["RPAREN"]
    },
}