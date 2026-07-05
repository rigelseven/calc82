import Tokeniser from "./tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator.js";

const display = document.querySelector("#display");

const testInput = document.querySelector("#test-input");

testInput.addEventListener("input", function(event) {
    const expression = event.target.value;
        
    const tokeniser = new Tokeniser(expression);
    const tokens = tokeniser.tokenise();

    console.table(tokens);

    const parser = new Parser(tokens);
    const ast = parser.parse();

    console.log(ast);

    const evaluator = new Evaluator();
    const result = evaluator.evaluate(ast);

    console.log(result)

    display.textContent=`${expression} = ${result}`;
});