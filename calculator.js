import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import Fraction from "./math/fraction.js";
import { variableManager } from "./evaluator/variables.js";

export default class Calculator {
    calculate(expression) {
        console.log(expression);         
        const tokeniser = new Tokeniser(expression);
        const tokens = tokeniser.tokenise();
        console.table(tokens);

        const parser = new Parser(tokens);
        const [ast, storeVar] = parser.parse();
        console.log(ast, storeVar);

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(ast);
        console.log(result);
        const decimalResult = result.toDecimal();
        let fractionResult = Fraction.toFraction(result);
        if (fractionResult instanceof Decimal) fractionResult = undefined;

        if (storeVar !== null) variableManager.setVariable(storeVar, result);

        variableManager.setVariable("Ans", result);

        this.decimalResult = decimalResult;
        this.fractionResult = fractionResult;
        return {result, decimalResult, fractionResult, tokens, ast};
    }
}