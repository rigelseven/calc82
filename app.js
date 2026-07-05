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
    try {
        const expression = event.target.value;

        display.textContent="=";
        tokensDisplay.textContent="";
        astDisplay.textContent="";
            
        const tokeniser = new Tokeniser(expression);
        const tokens = tokeniser.tokenise();

        const textTokens = "Token visualisation\n" + generateTextTokens(tokens);
        console.table(tokens);
        console.log(textTokens);
        tokensDisplay.textContent = textTokens;

        const parser = new Parser(tokens);
        const ast = parser.parse();

        const textAST = "AST visualisation\n" + generateTextAST(ast);
        console.log(ast);
        console.log(textAST);
        astDisplay.textContent = textAST;

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(ast);

        console.log(result)

        display.textContent=`= ${result}`;
    } catch (error) {
        display.textContent=`= ${error.message}`;
        console.error(error)
    }
});