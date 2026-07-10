export const VARIABLES = {
    "vA": function() {return STORAGE["A"]},
    "vB": function() {return STORAGE["B"]},
    "vC": function() {return STORAGE["C"]},
    "vD": function() {return STORAGE["D"]},
    "vE": function() {return STORAGE["E"]},
    "vF": function() {return STORAGE["F"]},
    "M": function() {return STORAGE["G"]}
}

// Temporary variable storage (TODO cookies?)
const STORAGE = {
    "A": new Decimal(1),
    "B": new Decimal(2),
    "C": new Decimal(3),
    "D": new Decimal(4),
    "E": new Decimal(5),
    "F": new Decimal(6),
    "M": new Decimal(7)
}