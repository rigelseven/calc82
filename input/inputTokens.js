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
    "s": { type: "FUNCTION", exp: "sin", rep: "\\sin("},
    "c": { type: "FUNCTION", exp: "cos", rep: "\\cos("},
    "t": { type: "FUNCTION", exp: "tan", rep: "\\tan("}
}
