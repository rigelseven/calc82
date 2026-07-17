export const TOKENS = {
    "+": { type: "PLUS", rep: "{+}" },
    "-": { type: "MINUS", rep: "{-}" },
    "*": { type: "MULTIPLY", rep: "{\\times}" },
    "/": { type: "DIVIDE", rep: "{\\div}" },
    "(": { type: "LPAREN", rep: "(" },
    ")": { type: "RPAREN", rep: ")" },
    "!": { type: "FACTORIAL", rep: "!" },
    "%": { type: "PERCENT", rep: "\\%" },
    ",": { type: "COMMA", rep: "," },
    "P": { type: "PERMUTATION", rep: "P" },
    // "C": { type: "COMBINATION", rep: "C" },  TODO: temporarily removed as this interferes w firefox
    //"r": { type: "RADIANS", rep: "{^\\mathrm{r}}" },  TODO: temporarily removed as this is root key
    "g": { type: "GRADIANS", rep: "{^\\mathrm{g}}" },
    "d": { type: "DEGREES", rep: "{^\\circ}" },
    "p": { type: "CONSTANT", exp: "PI", rep: "{\\pi}" },
    "e": { type: "CONSTANT", exp: "E", rep: "{e}" },
    "E": { type: "DIGIT", rep: "{\\footnotesize\\times{\\texttt{10}}}", value: "E"},
    ".": { type: "DIGIT", rep: ".", value: "."},
    "s": { type: "FUNCTION", exp: "SIN", rep: "\\sin("},
    "c": { type: "FUNCTION", exp: "COS", rep: "\\cos("},
    "t": { type: "FUNCTION", exp: "TAN", rep: "\\tan("}
}

export const LINE_EQUIVALENTS = {
    "PLUS": "+",
    "MINUS": "-",
    "MULTIPLY": "*",
    "DIVIDE": "/",
    "LPAREN": "(",
    "RPAREN": ")",
    "FACTORIAL": "!",
    "PERCENT": "%",
    "COMMA": ",",
    "PERMUTATION": "P",
    "COMBINATION": "C",
    "RADIANS": "r",
    "GRADIANS": "g",
    "DEGREES": "d",

    "CONSTANT": {"PI": "pi", "E": "e"},
    "FUNCTION": {"SIN": "sin(", "COS": "cos(", "TAN": "tan("},

    "FRACTION": {"start": "(", "middle": "f", "end": ")"},
    "MIXEDFRAC": {"start": "(", "middle": "f", "middle2": "f", "end": ")"},
    "POWER": {"start": "^(", "end": ")"},
    "SQRT": {"start": "sqrt(", "end": ")"},
    "ROOT": {"start": "root(", "middle": ",", "end": ")"},
}