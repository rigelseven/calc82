import { statusBar } from "../statusbar.js";

class VariableManager {
    constructor(storage) {
        this.storage = {
            "A": new Decimal(storage?.["A"] ?? 0),
            "B": new Decimal(storage?.["B"] ?? 0),
            "C": new Decimal(storage?.["C"] ?? 0),
            "D": new Decimal(storage?.["D"] ?? 0),
            "E": new Decimal(storage?.["E"] ?? 0),
            "F": new Decimal(storage?.["F"] ?? 0),
            "X": new Decimal(storage?.["X"] ?? 0),
            "Y": new Decimal(storage?.["Y"] ?? 0),
            "M": new Decimal(storage?.["M"] ?? 0),
            "Ans": new Decimal(storage?.["Ans"] ?? 0)
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
            JSON.stringify(this.storage, decimalReplacer)
        );

        return this.storage[variable];
    }
}

// Read variables
let savedVariables = [];
try {
    savedVariables = JSON.parse(
            localStorage.getItem("variables"),
            decimalReviver);
} catch {;}
export const variableManager = new VariableManager(savedVariables);
statusBar.toggle("memory", variableManager.storage["M"] != "0");


function decimalReplacer(key, value) {
    if (value instanceof Decimal) {
        return {
            s: Number(value.s),
            e: Number(value.e),
            d: value.d.map(Number)
        };
    }

    return value;
}

function decimalReviver(key, value) {
    if (
        value &&
        typeof value === "object" &&
        "s" in value &&
        "e" in value &&
        Array.isArray(value.d)
    ) {
        return new Decimal(value);
    }

    return value;
}