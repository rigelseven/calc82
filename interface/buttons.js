// [Main, top white, top Shift, top Alpha]
export const BUTTONS = [
    [
        ["", "", "Shift", "", {Main: "Shift", Shift: "Shift", Alpha: "Shift"}],
        ["", "", "", "Alpha", {Main: "Alpha", Shift: "Alpha", Alpha: "Alpha"}],
        null,
        null,
        ["", "MODE", "SET UP", "", {Main: null, Shift: null, Alpha: null}],
        ["", "ON", "", "", {Main: null, Shift: null, Alpha: null}],
    ],

    [
        ["Abs", "", "", "", {Main: "Abs", Shift: null, Alpha: null}],
        ["$x^3$", "", "", ":", {Main: "Cube", Shift: null, Alpha: "Colon"}],
        null,
        null,
        ["$x^{-1}$", "", "", "", {Main: "Invert", Shift: null, Alpha: null}],
        ["$x!$", "", "", "", {Main: "Factorial", Shift: null, Alpha: null}],
    ],

    [
        ["$\\frac{\\blacksquare}{\\square}$", "", "$\\blacksquare\\frac{\\square}{\\square}$", "", {Main: "Fraction", Shift: "MixedFraction", Alpha: null}],
        ["$\\sqrt{\\blacksquare}$", "", "$\\sqrt[3]{\\blacksquare}$", "", {Main: "Sqrt", Shift: "CubeRoot", Alpha: null}],
        ["$x^2$", "", "", "", {Main: "Square", Shift: null, Alpha: null}],
        ["$x^\\blacksquare$", "", "$\\sqrt[\\blacksquare]{\\square}$", "", {Main: "Power", Shift: "Root", Alpha: null}],
        ["log", "", "$10^\\blacksquare$", "", {Main: "Log", Shift: "10^x", Alpha: null}],
        ["ln", "", "$e^\\blacksquare$", "", {Main: "Ln", Shift: "Exp", Alpha: null}],
    ],

    [
        ["(-)", "", "", "A", {Main: "UnaryMinus", Shift: null, Alpha: "VarA"}],
        ["$\\degree ' \"$", "", "FACT", "B", {Main: "DegMinSec", Shift: "Factors", Alpha: "VarB"}],
        ["hyp", "", "", "C", {Main: "Hyp", Shift: null, Alpha: "VarC"}],
        ["sin", "", "$\\textsf{sin}^{-1}$", "D", {Main: "Sin", Shift: "Asin", Alpha: "VarD"}],
        ["cos", "", "$\\textsf{cos}^{-1}$", "E", {Main: "Cos", Shift: "Acos", Alpha: "VarE"}],
        ["tan", "", "$\\textsf{tan}^{-1}$", "F", {Main: "Tan", Shift: "Atan", Alpha: "VarF"}],
    ],

    [
        ["RCL", "", "STO", "", {Main: "Recall", Shift: "Store", Alpha: null}],
        ["ENG", "", "$\\leftarrow$", "", {Main: "Engineering", Shift: "ReduceDecimal", Alpha: null}],
        ["(", "", "%", "", {Main: "LParen", Shift: "Percent", Alpha: null}],
        [")", "", ",", "X", {Main: "RParen", Shift: "Comma", Alpha: "VarX"}],
        ["$\\mathsf{\\small{S}{\\Leftrightarrow}{D}}$", "", "$\\mathsf{\\small{{\\scriptstyle a}\\frac{b}{c}}{\\Leftrightarrow}{\\frac{d}{c}}}$", "Y", {Main: "StandardToDecimal", Shift: "MixedToImproper", Alpha: "VarY"}],
        ["M+", "", "M-", "M",{Main: "MemoryAdd", Shift: "MemoryMinus", Alpha: "VarM"}],
    ],

    [
        ["7", "", "", "", {Main: 7, Shift: null, Alpha: null}],
        ["8", "", "", "", {Main: 8, Shift: null, Alpha: null}],
        ["9", "", "CLR", "", {Main: 9, Shift: "Clear", Alpha: null}],
        ["DEL", "", "INS", "", {Main: "Delete", Shift: "Insert", Alpha: null}],
        ["AC", "", "OFF", "", {Main: "AllClear", Shift: null, Alpha: null}],
    ],

    [
        ["4", "", "", "", {Main: 4, Shift: null, Alpha: null}],
        ["5", "", "", "", {Main: 5, Shift: null, Alpha: null}],
        ["6", "", "VERIFY", "", {Main: 6, Shift: null, Alpha: null}],
        ["×", "", "nPr", "GCD", {Main: "Multiply", Shift: "Permutation", Alpha: "GCD"}],
        ["÷", "", "nCr", "LCM", {Main: "Divide", Shift: "Combination", Alpha: "LCM"}],
    ],

    [
        ["1", "", "", "", {Main: 1, Shift: null, Alpha: null}],
        ["2", "", "", "", {Main: 2, Shift: null, Alpha: null}],
        ["3", "", "", "", {Main: 3, Shift: null, Alpha: null}],
        ["+", "", "Pol", "", {Main: "Plus", Shift: null, Alpha: null}],
        ["-", "", "Rec", "", {Main: "Minus", Shift: null, Alpha: null}],
    ],

    [
        ["0", "", "Rnd", "", {Main: 0, Shift: "Round", Alpha: null}],
        [".", "", "Ran#", "RanInt", {Main: ".", Shift: "Random", Alpha: "RandomInt"}],
        ["$\\times 10^x$", "", "$\\pi$", "$e$", {Main: "E", Shift: "ConstantPi", Alpha: "ConstantE"}],
        ["Ans", "", "DRG▶", "", {Main: "Ans", Shift: "Degree", Alpha: null}],
        ["=", "", "", "", {Main: "Calculate", Shift: null, Alpha: null}],
    ]
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