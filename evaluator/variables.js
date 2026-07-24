class VariableManager {
    constructor(storage) {
        this.storage = storage ? storage : {
            "A": new Decimal(0),
            "B": new Decimal(0),
            "C": new Decimal(0),
            "D": new Decimal(0),
            "E": new Decimal(0),
            "F": new Decimal(0),
            "X": new Decimal(0),
            "Y": new Decimal(0),
            "M": new Decimal(0),
            "Ans": new Decimal(0)
        };
    }
    
    getVariable(variable) {
        return this.storage[variable];
    }

    setVariable(variable, value) {
        return this.storage[variable] = value;
    }
}

export const variableManager = new VariableManager();