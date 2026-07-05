import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import { generateTextAST } from "./debug.js";

const display = document.querySelector("#display");

const testInput = document.querySelector("#test-input");

// debug
const astDisplay = document.querySelector("#ast");

testInput.addEventListener("input", function(event) {
    const expression = event.target.value;

    display.textContent=`${expression} =`
        
    const tokeniser = new Tokeniser(expression);
    const tokens = tokeniser.tokenise();

    console.table(tokens);

    const parser = new Parser(tokens);
    const ast = parser.parse();

    const textAST = generateTextAST(ast);
    console.log(ast);
    console.log(textAST);
    astDisplay.textContent = textAST;

    const evaluator = new Evaluator();
    const result = evaluator.evaluate(ast);

    console.log(result)

    display.textContent=`${expression} = ${result}`;
});