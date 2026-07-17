import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import Fraction from "./math/fraction.js";

export default class Calculator {
    calculate(expression) {
        console.log(expression);         
        const tokeniser = new Tokeniser(expression);
        const tokens = tokeniser.tokenise();
        console.table(tokens);

        const parser = new Parser(tokens);
        const ast = parser.parse();
        console.log(ast);

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(ast);
        console.log(result);
        const decimalResult = result.toDecimal();
        let fractionResult = Fraction.toFraction(result);
        if (fractionResult instanceof Decimal) fractionResult = undefined;

        this.decimalResult = decimalResult;
        this.fractionResult = fractionResult;
        return {result, decimalResult, fractionResult, tokens, ast};
    }
}