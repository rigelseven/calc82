// [Main, top white, top Shift, top Alpha]
export const BUTTONS = [
    {
        Shift: ["", "", "Shift", "", {Main: "Shift", Shift: "Shift", Alpha: "Shift"}],
        Alpha: ["", "", "", "Alpha", {Main: "Alpha", Shift: "Alpha", Alpha: "Alpha"}],
        Spacer1: null,
        Spacer2: null,
        Mode: ["", "MODE", "SET UP", "", {Main: null, Shift: null, Alpha: null}],
        On: ["", "ON", "", "", {Main: null, Shift: null, Alpha: null}],
    },

    {
        Abs: ["Abs", "", "", "", {Main: "Abs", Shift: null, Alpha: null}],
        Cube: ["$x^3$", "", "", ":", {Main: "Cube", Shift: null, Alpha: "Colon"}],
        Spacer3: null,
        Spacer4: null,
        Invert: ["$x^{-1}$", "", "", "", {Main: "Invert", Shift: null, Alpha: null}],
        Factorial:["$x!$", "", "", "", {Main: "Factorial", Shift: null, Alpha: null}],
    },

    {
        Fraction: ["$\\frac{\\blacksquare}{\\square}$", "", "$\\blacksquare\\frac{\\square}{\\square}$", "", {Main: "Fraction", Shift: "MixedFraction", Alpha: null}],
        Sqrt: ["$\\sqrt{\\blacksquare}$", "", "$\\sqrt[3]{\\blacksquare}$", "", {Main: "Sqrt", Shift: "CubeRoot", Alpha: null}],
        Square: ["$x^2$", "", "", "", {Main: "Square", Shift: null, Alpha: null}],
        Power: ["$x^\\blacksquare$", "", "$\\sqrt[\\blacksquare]{\\square}$", "", {Main: "Power", Shift: "Root", Alpha: null}],
        Log: ["log", "", "$10^\\blacksquare$", "", {Main: "Log", Shift: "10^x", Alpha: null}],
        Ln: ["ln", "", "$e^\\blacksquare$", "", {Main: "Ln", Shift: "Exp", Alpha: null}],
    },

    {
        UnaryMinus: ["(-)", "", "", "A", {Main: "UnaryMinus", Shift: null, Alpha: "VarA"}],
        Degree: ["$\\degree ' \"$", "", "FACT", "B", {Main: "DegMinSec", Shift: "Factors", Alpha: "VarB"}],
        Hyp: ["hyp", "", "", "C", {Main: "Hyp", Shift: null, Alpha: "VarC"}],
        Sin: ["sin", "", "$\\textsf{sin}^{-1}$", "D", {Main: "Sin", Shift: "Asin", Alpha: "VarD"}],
        Cos: ["cos", "", "$\\textsf{cos}^{-1}$", "E", {Main: "Cos", Shift: "Acos", Alpha: "VarE"}],
        Tan: ["tan", "", "$\\textsf{tan}^{-1}$", "F", {Main: "Tan", Shift: "Atan", Alpha: "VarF"}],
    },

    {
        Recall: ["RCL", "", "STO", "", {Main: "Recall", Shift: "Store", Alpha: null}],
        Engineering: ["ENG", "", "$\\leftarrow$", "", {Main: "Engineering", Shift: "ReduceDecimal", Alpha: null}],
        LParen: ["(", "", "%", "", {Main: "LParen", Shift: "Percent", Alpha: null}],
        RParen: [")", "", ",", "X", {Main: "RParen", Shift: "Comma", Alpha: "VarX"}],
        StandardToDecimal: ["$\\mathsf{\\small{S}{\\Leftrightarrow}{D}}$", "", "$\\mathsf{\\small{{\\scriptstyle a}\\frac{b}{c}}{\\Leftrightarrow}{\\frac{d}{c}}}$", "Y", {Main: "StandardToDecimal", Shift: "MixedToImproper", Alpha: "VarY"}],
        MemoryPlus: ["M+", "", "M-", "M",{Main: "MemoryAdd", Shift: "MemoryMinus", Alpha: "VarM"}],
    },

    {
        7: ["7", "", "", "", {Main: 7, Shift: null, Alpha: null}],
        8: ["8", "", "", "", {Main: 8, Shift: null, Alpha: null}],
        9: ["9", "", "CLR", "", {Main: 9, Shift: "Clear", Alpha: null}],
        Del: ["DEL", "", "INS", "", {Main: "Delete", Shift: "Insert", Alpha: null}],
        AllClear: ["AC", "", "OFF", "", {Main: "AllClear", Shift: null, Alpha: null}],
    },

    {
        4: ["4", "", "", "", {Main: 4, Shift: null, Alpha: null}],
        5: ["5", "", "", "", {Main: 5, Shift: null, Alpha: null}],
        6: ["6", "", "VERIFY", "", {Main: 6, Shift: null, Alpha: null}],
        Multiply: ["×", "", "nPr", "GCD", {Main: "Multiply", Shift: "Permutation", Alpha: "GCD"}],
        Divide: ["÷", "", "nCr", "LCM", {Main: "Divide", Shift: "Combination", Alpha: "LCM"}],
    },

    {
        1: ["1", "", "", "", {Main: 1, Shift: null, Alpha: null}],
        2: ["2", "", "", "", {Main: 2, Shift: null, Alpha: null}],
        3: ["3", "", "", "", {Main: 3, Shift: null, Alpha: null}],
        Plus: ["+", "", "Pol", "", {Main: "Plus", Shift: null, Alpha: null}],
        Minus: ["-", "", "Rec", "", {Main: "Minus", Shift: null, Alpha: null}],
    },

    {
        0: ["0", "", "Rnd", "", {Main: 0, Shift: "Round", Alpha: null}],
        Decimal: [".", "", "Ran#", "RanInt", {Main: ".", Shift: "Random", Alpha: "RandomInt"}],
        ExponentialDigit: ["$\\times 10^x$", "", "$\\pi$", "$e$", {Main: "E", Shift: "ConstantPi", Alpha: "ConstantE"}],
        Ans: ["Ans", "", "DRG▶", "", {Main: "Ans", Shift: "Degree", Alpha: null}],
        Calculate: ["=", "", "", "", {Main: "Calculate", Shift: "Calculate", Alpha: "Calculate"}],
    }
]

export const ROW_HEIGHTS = [
    0.8,
    1,
    1,
    1,
    1,
    1.3,
    1.3,
    1.3,
    1.3
]

export const NAV_BUTTONS = {
    up: ["↑", "", "", "", {Main: "ArrowUp", Shift: "ArrowUp", Alpha: "ArrowUp"}],
    right: ["→", "", "", "", {Main: "ArrowRight", Shift: "ArrowRight", Alpha: "ArrowRight"}],
    left: ["←", "", "", "", {Main: "ArrowLeft", Shift: "ArrowLeft", Alpha: "ArrowLeft"}],
    down: ["↓", "", "", "", {Main: "ArrowDown", Shift: "ArrowDown", Alpha: "ArrowDown"}],
}

export const NAV_DIMENSIONS = {
    cx: 50,
    cy: 10,
    offsetx: 11,
    offsety: 5
}

export const KEYBOARD_MAP = {
    "ArrowUp": ["up", null],
    "ArrowRight": ["right", null],
    "ArrowLeft": ["left", null],
    "ArrowDown": ["down", null],

    "Shift": ["Shift", null],
    "Alpha": ["Alpha", null],

    "|": ["Abs", null],
    "!": ["Factorial", null],

    "f": ["Fraction", null],
    "q": ["Sqrt", null],
    "^": ["Power", null],
        "r": ["Power", "Shift"],
    "L": ["Log", null],
    "l": ["Ln", null],

    "`": ["Degree", null],
    "h": ["Hyp", null],
    "s": ["Sin", null],
    "c": ["Cos", null],
    "t": ["Tan", null],

    "R": ["Recall", null],
    "<": ["Engineering", null],
    "(": ["LParen", null],
        "%": ["LParen", "Shift"],
    ")": ["RParen", null],
        ",": ["RParen", "Shift"], // TODO x and y vars
    "S": ["StandardToDecimal", null],
    "m": ["MemoryPlus", null],
        "M": ["MemoryPlus", "Alpha"],

    7: [7, null],
    8: [8, null],
    9: [9, null],
    "Backspace": ["Del", null], // TODO Forward delete

    4: [4, null],
    5: [5, null],
    6: [6, null],
    "*": ["Multiply", null],
    "/": ["Divide", null],

    1: [1, null],
    2: [2, null],
    3: [3, null],
    "+": ["Plus", null],
    "-": ["Minus", null],

    0: [0, null],
    ".": ["Decimal", null],
    "E": ["ExponentialDigit", null],
        "p": ["ExponentialDigit", "Shift"],
        "e": ["ExponentialDigit", "Alpha"],
    "A": ["Ans", null],
    "Enter": ["Calculate", null],
        "=": ["Calculate", null],  // TODO different in verify mode.

}

// TODO: when in alpha, ABCDEFMXY G L R should do their variables/functions