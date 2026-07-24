export const TOKENS = {
    "0": { type: "DIGIT", rep: "0", value: "0"},
    "1": { type: "DIGIT", rep: "1", value: "1"},
    "2": { type: "DIGIT", rep: "2", value: "2"},
    "3": { type: "DIGIT", rep: "3", value: "3"},
    "4": { type: "DIGIT", rep: "4", value: "4"},
    "5": { type: "DIGIT", rep: "5", value: "5"},
    "6": { type: "DIGIT", rep: "6", value: "6"},
    "7": { type: "DIGIT", rep: "7", value: "7"},
    "8": { type: "DIGIT", rep: "8", value: "8"},
    "9": { type: "DIGIT", rep: "9", value: "9"},
    "E": { type: "DIGIT", rep: "{\\footnotesize\\times{\\texttt{10}}}", value: "E"},
    ".": { type: "DIGIT", rep: ".", value: "."},

    "Plus": { type: "PLUS", rep: "{+}" },
    "Minus": { type: "MINUS", rep: "{-}" },
    "Multiply": { type: "MULTIPLY", rep: "{\\times}" },
    "Divide": { type: "DIVIDE", rep: "{\\div}" },

    "UnaryMinus": { type: "UNARYMINUS", rep: "\\text{-}" },

    "LParen": { type: "LPAREN", rep: "(" },
    "RParen": { type: "RPAREN", rep: ")" },
    "Factorial": { type: "FACTORIAL", rep: "!" },
    "Percent": { type: "PERCENT", rep: "\\%" },
    "Comma": { type: "COMMA", rep: "," },
    "Permutation": { type: "PERMUTATION", rep: "P" },
    "Combination": { type: "Combination", rep: "C" },
    
    "r": { type: "RADIANS", rep: "{^\\mathrm{r}}" },
    "g": { type: "GRADIANS", rep: "{^\\mathrm{g}}" },
    "d": { type: "DEGREES", rep: "{^\\circ}" },

    "ConstantPi": { type: "CONSTANT", exp: "PI", rep: "{\\pi}" },
    "ConstantE": { type: "CONSTANT", exp: "E", rep: "{e}" },

    "Log": { type: "FUNCTION", exp: "log", rep: "\\log(" },
    "Ln": { type: "FUNCTION", exp: "ln", rep: "\\ln(" },

    "Sin": { type: "FUNCTION", exp: "sin", rep: "\\sin("},
    "Cos": { type: "FUNCTION", exp: "cos", rep: "\\cos("},
    "Tan": { type: "FUNCTION", exp: "tan", rep: "\\tan("},

    "Asin": { type: "FUNCTION", exp: "asin", rep: "\\sin^{-1}("},
    "Acos": { type: "FUNCTION", exp: "acos", rep: "\\cos^{-1}("},
    "Atan": { type: "FUNCTION", exp: "atan", rep: "\\tan^{-1}("},

    "Round": { type: "FUNCTION", exp: "round", rep: "\\text{Rnd}("},
    "Random": { type: "VARIABLE", exp: "Random", rep: "\\text{Ran\\#}"},
    "RandomInt": { type: "FUNCTION", exp: "randomInt", rep: "\\text{RanInt\\#}("},

    "LCM": { type: "FUNCTION", exp: "lcm", rep: "\\text{LCM}("},
    "GCD": { type: "FUNCTION", exp: "gcd", rep: "\\text{GCD}("},

    "VarA": { type: "VARIABLE", exp: "A", rep: "\\text{A}"},
    "VarB": { type: "VARIABLE", exp: "B", rep: "\\text{B}"},
    "VarC": { type: "VARIABLE", exp: "C", rep: "\\text{C}"},
    "VarD": { type: "VARIABLE", exp: "D", rep: "\\text{D}"},
    "VarE": { type: "VARIABLE", exp: "E", rep: "\\text{E}"},
    "VarF": { type: "VARIABLE", exp: "F", rep: "\\text{F}"},
    "VarX": { type: "VARIABLE", exp: "X", rep: "\\text{X}"},
    "VarY": { type: "VARIABLE", exp: "Y", rep: "\\text{Y}"},
    "VarM": { type: "VARIABLE", exp: "M", rep: "\\text{M}"},

    "Ans": { type: "VARIABLE", exp: "Ans", rep: "\\text{Ans}"}
}