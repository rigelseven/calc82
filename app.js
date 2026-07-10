import Tokeniser from "./tokeniser/tokeniser.js";
import Parser from "./parser.js"
import Evaluator from "./evaluator/evaluator.js";
import { generateTextAST, generateTextTokens } from "./debug.js";
import trigSolver from "./math/trigonometry.js";
import Fraction from "./math/fraction.js";

// TODO: Depends on Norm1/Norm2
// Norm1: toExpNeg = -3
Decimal.set({ precision: 15, maxE: 99, toExpNeg: -10, toExpPos: 10})

const display = document.querySelector("#display");

const testInput = document.querySelector("#test-input");

const angleModeSelector = document.querySelector("#angle-mode-selector")

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

        if (result instanceof Decimal) {
            display.textContent=`= ${result.toSD(10)}`;
        } else if (result instanceof Fraction)
            display.textContent=`= ${result.numerator} over ${result.denominator}`
    } catch (error) {
        display.textContent=`= ${error.message}`;
        console.error(error)
    }
}

// Angle mode selector
angleModeSelector.addEventListener("change", function(event) {
    getAngleMode();
    calculate(testInput.value);
});

function getAngleMode() {
    const newMode = document.querySelector(`.angle-mode input[type="radio"]:checked`).value;
    trigSolver.setAngleMode(newMode);
}

calculate(testInput.value);
getAngleMode();