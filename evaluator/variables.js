import Fraction from "../math/fraction.js";
import { statusBar } from "../statusbar.js";

class VariableManager {
    constructor(storage) {
        this.storage = {
            "A": VariableManager.parseValue(storage["A"]),
            "B": VariableManager.parseValue(storage["B"]),
            "C": VariableManager.parseValue(storage["C"]),
            "D": VariableManager.parseValue(storage["D"]),
            "E": VariableManager.parseValue(storage["E"]),
            "F": VariableManager.parseValue(storage["F"]),
            "X": VariableManager.parseValue(storage["X"]),
            "Y": VariableManager.parseValue(storage["Y"]),
            "M": VariableManager.parseValue(storage["M"]),
            "Ans": VariableManager.parseValue(storage["Ans"]),
        };
    }
    
    getVariable(variable) {
        return this.storage[variable];
    }

    setVariable(variable, value) {
        if (variable == "M") statusBar.toggle("memory", value != "0");
        this.storage[variable] = value;

        localStorage.setItem(
            "variables",
            JSON.stringify(this.storage)
        );

        return this.storage[variable];
    }

    static parseValue(val) {
    if (!val) return new Decimal(0);
    if (typeof val === 'object' && 'numerator' in val && 'denominator' in val) {
        return new Fraction(Decimal(val.numerator), Decimal(val.denominator));
    }
    return new Decimal(val);
}
}

// Read variables
let savedVariables = [];
try {
    savedVariables = JSON.parse(
            localStorage.getItem("variables"));
} catch {;}
export const variableManager = new VariableManager(savedVariables);
statusBar.toggle("memory", variableManager.storage["M"] != "0");

