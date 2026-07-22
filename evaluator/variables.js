export const VARIABLES = {
    "vA": function() {return STORAGE["A"]},
    "vB": function() {return STORAGE["B"]},
    "vC": function() {return STORAGE["C"]},
    "vD": function() {return STORAGE["D"]},
    "vE": function() {return STORAGE["E"]},
    "vF": function() {return STORAGE["F"]},
    "vX": function() {return STORAGE["X"]},
    "vY": function() {return STORAGE["Y"]},
    "vM": function() {return STORAGE["M"]},
    "Random": function() {return Decimal.random(3)}
}

// Temporary variable storage (TODO cookies?)
const STORAGE = {
    "A": new Decimal(1),
    "B": new Decimal(2),
    "C": new Decimal(3),
    "D": new Decimal(4),
    "E": new Decimal(5),
    "F": new Decimal(6),
    "X": new Decimal(7),
    "Y": new Decimal(8),
    "M": new Decimal(9)
}