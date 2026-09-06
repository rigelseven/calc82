// [Main, top white, top Shift, top Alpha]
export const BUTTONS = [
    {
        Shift: ["", "", "Shift", "", {Main: "Shift", Shift: "Shift", Alpha: "Shift", Store: "Shift", Recall: "Shift",}],
        Alpha: ["", "", "", "Alpha", {Main: "Alpha", Shift: "Alpha", Alpha: "Alpha", Store: "Alpha", Recall: "Alpha"}],
        Spacer1: null,
        Spacer2: null,
        Mode: ["", "MODE", "SET UP", "", {Main: "MenuModes", Shift: "MenuSetup", Alpha: "MenuModes", Store: "MenuModes", Recall: "MenuModes"}],
        On: ["", "ON", "", "", {Main: null, Shift: null, Alpha: null, Menu: "MenuExit"}],
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
        UnaryMinus: ["(-)", "", "", "A", {Main: "UnaryMinus", Shift: null, Alpha: "VarA", Store: "StoreA", Recall: "RecallA"}],
        Degree: ["$\\degree ' \"$", "", "FACT", "B", {Main: "DegMinSec", Shift: "Factors", Alpha: "VarB", Store: "StoreB", Recall: "RecallB"}],
        Hyp: ["hyp", "", "", "C", {Main: "MenuHyp", Shift: null, Alpha: "VarC", Store: "StoreC", Recall: "RecallC"}],
        Sin: ["sin", "", "$\\textsf{sin}^{-1}$", "D", {Main: "Sin", Shift: "Asin", Alpha: "VarD", Store: "StoreD", Recall: "RecallD"}],
        Cos: ["cos", "", "$\\textsf{cos}^{-1}$", "E", {Main: "Cos", Shift: "Acos", Alpha: "VarE", Store: "StoreE", Recall: "RecallE"}],
        Tan: ["tan", "", "$\\textsf{tan}^{-1}$", "F", {Main: "Tan", Shift: "Atan", Alpha: "VarF", Store: "StoreF", Recall: "RecallF"}],
    },

    {
        Recall: ["RCL", "", "STO", "", {Main: "Recall", Shift: "Store", Alpha: null, Store: "Store", Recall: "Recall"}],
        Engineering: ["ENG", "", "$\\leftarrow$", "", {Main: "Engineering", Shift: "ReduceDecimal", Alpha: null}],
        LParen: ["(", "", "%", "", {Main: "LParen", Shift: "Percent", Alpha: null}],
        RParen: [")", "", ",", "X", {Main: "RParen", Shift: "Comma", Alpha: "VarX", Store: "StoreX", Recall: "RecallX"}],
        StandardToDecimal: ["$\\mathsf{\\small{S}{\\Leftrightarrow}{D}}$", "", "$\\mathsf{\\small{{\\scriptstyle a}\\frac{b}{c}}{\\Leftrightarrow}{\\frac{d}{c}}}$", "Y", {Main: "StandardToDecimal", Shift: "MixedToImproper", Alpha: "VarY", Store: "StoreY", Recall: "RecallY"}],
        MemoryPlus: ["M+", "", "M-", "M",{Main: "StoreMPlus", Shift: "StoreMMinus", Alpha: "VarM", Store: "StoreM", Recall: "RecallM"}],
    },

    {
        7: ["7", "", "", "", {Main: 7, Shift: null, Alpha: null, Menu: "Menu7"}],
        8: ["8", "", "", "", {Main: 8, Shift: null, Alpha: null, Menu: "Menu8"}],
        9: ["9", "", "CLR", "", {Main: 9, Shift: "MenuClr", Alpha: null, Menu: "Menu9"}],
        Del: ["DEL", "", "INS", "", {Main: "Delete", Shift: "Insert", Alpha: null}],
        AllClear: ["AC", "", "OFF", "", {Main: "AllClear", Shift: null, Alpha: "AllClear", Store: "AllClear", Recall: "AllClear", Menu: "MenuExit"}],
    },

    {
        4: ["4", "", "", "", {Main: 4, Shift: null, Alpha: null, Menu: "Menu4"}],
        5: ["5", "", "", "", {Main: 5, Shift: null, Alpha: null, Menu: "Menu5"}],
        6: ["6", "", "VERIFY", "", {Main: 6, Shift: null, Alpha: null, Menu: "Menu6"}],
        Multiply: ["×", "", "nPr", "GCD", {Main: "Multiply", Shift: "Permutation", Alpha: "GCD"}],
        Divide: ["÷", "", "nCr", "LCM", {Main: "Divide", Shift: "Combination", Alpha: "LCM"}],
    },

    {
        1: ["1", "", "", "", {Main: 1, Shift: null, Alpha: null, Menu: "Menu1"}],
        2: ["2", "", "", "", {Main: 2, Shift: null, Alpha: null, Menu: "Menu2"}],
        3: ["3", "", "", "", {Main: 3, Shift: null, Alpha: null, Menu: "Menu3"}],
        Plus: ["+", "", "Pol", "", {Main: "Plus", Shift: "Pol", Alpha: null}],
        Minus: ["-", "", "Rec", "", {Main: "Minus", Shift: "Rec", Alpha: null}],
    },

    {
        0: ["0", "", "Rnd", "", {Main: 0, Shift: "Round", Alpha: null, Menu: "Menu0"}],
        Decimal: [".", "", "Ran#", "RanInt", {Main: ".", Shift: "Random", Alpha: "RandomInt"}],
        ExponentialDigit: ["$\\small{\\times}10^x$", "", "$\\pi$", "$e$", {Main: "E", Shift: "ConstantPi", Alpha: "ConstantE"}],
        Ans: ["Ans", "", "DRG▶", "", {Main: "Ans", Shift: "MenuDegree", Alpha: null}],
        Calculate: ["=", "", "", "", {Main: "Calculate", Shift: "Calculate", Alpha: "Calculate", Menu: "MenuYes"}],
    },

    // hidden
    {
        ForwardDelete: ["", "", "", "", {Main: "ForwardDelete", Shift: null, Alpha: null}]
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
    1.3,
]

export const NAV_BUTTONS = {
    up: ["↑", "", "", "", {Main: "ArrowUp", Shift: "ArrowUp", Alpha: "ArrowUp", Store: "ArrowUp", Recall: "ArrowUp", Menu: "MenuUp"}],
    right: ["→", "", "", "", {Main: "ArrowRight", Shift: "ArrowRight", Alpha: "ArrowRight", Store: "ArrowRight", Recall: "ArrowRight"}],
    left: ["←", "", "", "", {Main: "ArrowLeft", Shift: "ArrowLeft", Alpha: "ArrowLeft", Store: "ArrowLeft", Recall: "ArrowLeft"}],
    down: ["↓", "", "", "", {Main: "ArrowDown", Shift: "ArrowDown", Alpha: "ArrowDown", Store: "ArrowDown", Recall: "ArrowDown", Menu: "MenuDown"}],
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
    "u": ["Mode", null],
        "U": ["Mode", "Shift"],

    "|": ["Abs", null],
    ":": ["Cube", "Alpha"],
    "!": ["Factorial", null],
    "\\": ["Invert", null],

    "f": ["Fraction", null],
    "q": ["Sqrt", null],
    "^": ["Power", null],
        "r": ["Power", "Shift"],
    "L": ["Log", null],
    "l": ["Ln", null],

    "`": ["Degree", null],
    "H": ["Hyp", null],
    "s": ["Sin", null],
    "c": ["Cos", null],
    "t": ["Tan", null],

    "r": ["Recall", null],
        "R": ["Recall", "Shift"],
    ">": ["Engineering", null],
        "<": ["Engineering", "Shift"],
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
    "Backspace": ["Del", null],
    "Escape": ["AllClear", null],

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
    "x": ["ExponentialDigit", null],
        "p": ["ExponentialDigit", "Shift"],
        "e": ["ExponentialDigit", "Alpha"],
    "a": ["Ans", null],
    "Enter": ["Calculate", null],
        "=": ["Calculate", null],  // TODO different in verify mode.

    "A": ["UnaryMinus", "Alpha"],
    "B": ["Degree", "Alpha"],
    "C": ["Hyp", "Alpha"],
    "D": ["Sin", "Alpha",],
    "E": ["Cos", "Alpha"],
    "F": ["Tan", "Alpha"],
    "X": ["RParen", "Alpha"],
    "Y": ["StandardToDecimal", "Alpha"],

    "Delete": ["ForwardDelete", null]
}

export const REVERSED_KEYBOARD_MAP = Object.fromEntries(
    Object.entries(KEYBOARD_MAP).map(([key, value]) => [value, key])
);

REVERSED_KEYBOARD_MAP['Alpha,Alpha'] = "z";
REVERSED_KEYBOARD_MAP['Shift,Shift'] = "Shift";
REVERSED_KEYBOARD_MAP['AllClear,'] = "Esc";
REVERSED_KEYBOARD_MAP['Del,'] = "⌫";

export const VARIABLE_MAP = {
    "a": ["UnaryMinus", null],
    "b": ["Degree", null],
    "c": ["Hyp", null],
    "d": ["Sin", null],
    "e": ["Cos", null],
    "f": ["Tan", null],
    "x": ["RParen", null],
    "y": ["StandardToDecimal", null],
    "m": ["MemoryPlus", null],

    "A": ["UnaryMinus", null],
    "B": ["Degree", null],
    "C": ["Hyp", null],
    "D": ["Sin", null],
    "E": ["Cos", null],
    "F": ["Tan", null],
    "X": ["RParen", null],
    "Y": ["StandardToDecimal", null],
    "M": ["MemoryPlus", null]
}