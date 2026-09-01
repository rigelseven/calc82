import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import Fraction from "./math/fraction.js";
import { variableManager } from "./evaluator/variables.js";
import { Polar, Rectangular } from "./math/polRec.js";

export default class Calculator {
    calculate(expression, n=0) {
        console.log(expression);         
        const tokeniser = new Tokeniser(expression);
        const tokens = tokeniser.tokenise();
        console.log(tokens);

        const parser = new Parser(tokens[n]);
        const [ast, storeVar] = parser.parse();
        console.log(ast, storeVar);

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(ast);
        console.log(result);
        const decimalResult = result.toDecimal();
        let fractionResult = Fraction.toFraction(result);
        if (fractionResult instanceof Decimal) fractionResult = undefined;

        let specialResult;
        if (result instanceof Polar) specialResult = ["Polar", result.modulus, result.argument];
        if (result instanceof Rectangular) specialResult = ["X", result.X, result.Y];

        if (storeVar !== null) variableManager.setVariable(storeVar, result);
        if (storeVar === "MPLUS") variableManager.setVariable("M", variableManager.getVariable("M").plus(result));
        else if (storeVar === "MMINUS") variableManager.setVariable("M", variableManager.getVariable("M").minus(result));
        else variableManager.setVariable("Ans", result);
        console.log(variableManager.getVariable("M"));

        this.decimalResult = decimalResult;
        this.fractionResult = fractionResult;
        this.specialResult = specialResult;
        return {result, decimalResult, fractionResult, specialResult, tokens, ast};
    }
}