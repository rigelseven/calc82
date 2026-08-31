import { statusBar } from "../statusbar.js";
import { decimalReplacer, decimalReviver } from "../storage.js";

class VariableManager {
    constructor(storage) {
        this.storage = {
            "A": new Decimal(storage["A"] ? storage["A"] : 0),
            "B": new Decimal(storage["B"] ? storage["B"] : 0),
            "C": new Decimal(storage["C"] ? storage["C"] : 0),
            "D": new Decimal(storage["D"] ? storage["D"] : 0),
            "E": new Decimal(storage["E"] ? storage["E"] : 0),
            "F": new Decimal(storage["F"] ? storage["F"] : 0),
            "X": new Decimal(storage["X"] ? storage["X"] : 0),
            "Y": new Decimal(storage["Y"] ? storage["Y"] : 0),
            "M": new Decimal(storage["M"] ? storage["M"] : 0),
            "Ans": new Decimal(storage["Ans"] ? storage["Ans"] : 0)
        };
    }
    
    getVariable(variable) {
        return this.storage[variable];
    }

    setVariable(variable, value) {
        if (variable == "M") statusBar.toggle("memory", this.storage["M"] !== Decimal(0));
        this.storage[variable] = value;

        localStorage.setItem(
            "variables",
            JSON.stringify(this.storage, decimalReplacer)
        );

        console.log(localStorage.getItem("variables"), JSON.stringify(this.storage, decimalReplacer))
        return this.storage[variable];
    }
}

// Read variables
let savedVariables;
try {
    savedVariables = JSON.parse(
            localStorage.getItem("variables"),
            decimalReviver);
} catch {;}
export const variableManager = new VariableManager(savedVariables);
statusBar.toggle("memory", variableManager.storage["M"] !== Decimal(0));