import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import { generateTextAST, generateTextTokens } from "./debug.js";

const display = document.querySelector("#display");

const testInput = document.querySelector("#test-input");

// debug
const tokensDisplay = document.querySelector("#tokens");
const astDisplay = document.querySelector("#ast");

testInput.addEventListener("input", function(event) {
    calculate(event.target.value);
});

function calculate(value) {
    try {
        const expression = value;

        display.textContent="=";
        tokensDisplay.textContent="Token visualisation\n";
        astDisplay.textContent="AST visualisation\n";
            
        const tokeniser = new Tokeniser(expression);
        const tokens = tokeniser.tokenise();

        const textTokens = generateTextTokens(tokens);
        console.table(tokens);
        tokensDisplay.textContent += textTokens;

        const parser = new Parser(tokens);
        const ast = parser.parse();

        const textAST = generateTextAST(ast);
        console.log(ast);
        astDisplay.textContent += textAST;

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(ast);

        console.log(result)

        display.textContent=`= ${result.toPrecision(10)}`;
    } catch (error) {
        display.textContent=`= ${error.message}`;
        console.error(error)
    }
}

calculate(testInput.value);