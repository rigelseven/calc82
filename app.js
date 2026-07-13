import { generateTextAST, generateTextTokens } from "./debug.js";
import trigSolver from "./math/trigonometry.js";
import Calculator from "./calculator.js";

// TODO: Depends on Norm1/Norm2
// Norm1: toExpNeg = -3
Decimal.set({ precision: 15, maxE: 99, toExpNeg: -10, toExpPos: 10});

const display = document.querySelector("#display");
const testInput = document.querySelector("#test-input");

const angleModeSelector = document.querySelector("#angle-mode-selector");
const calculateButton = document.querySelector("#calculate-button");
const outputModeButton = document.querySelector("#standard-decimal-button");

// debug
const tokensDisplay = document.querySelector("#tokens");
const astDisplay = document.querySelector("#ast");

calculateButton.addEventListener("click", function(event) {
    calculate(testInput.value);
});

const calculator = new Calculator;
let currentResultType = null;
let currentResult = null;

function calculate(value) {
    try {
        const {res, decimalResult, fractionResult, tokens, ast} = calculator.calculate(value);
        currentResult = res;

        display.textContent="=";
        tokensDisplay.textContent="Token visualisation\n";
        astDisplay.textContent="AST visualisation\n";

        const textAST = generateTextAST(ast);
        console.log(ast);
        astDisplay.textContent += textAST;
        
        const textTokens = generateTextTokens(tokens);
        console.table(tokens);
        tokensDisplay.textContent += textTokens;

        if (fractionResult) {
            currentResultType = "fraction";
            display.textContent=`= ${fractionResult.numerator} over ${fractionResult.denominator}`
        } else {
            currentResultType = "decimal";
            display.textContent=`= ${decimalResult.toSD(10)}`;
        }

    } catch (error) {
        display.textContent=`= ${error.message}`;
        currentResultType = null;
        console.error(error);
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

outputModeButton.addEventListener("click", switchAngleMode);

function switchAngleMode() {
    if (currentResultType === "fraction"  && calculator.decimalResult !== undefined) {
        currentResultType = "decimal";
        display.textContent = `= ${calculator.decimalResult.toSD(10)}`;
    }
    else if (currentResultType === "decimal" && calculator.fractionResult !== undefined) {
        currentResultType = "fraction";
            display.textContent = `= ${calculator.fractionResult.numerator} over ${calculator.fractionResult.denominator}`
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculate(testInput.value);
    }
})

calculate(testInput.value);
getAngleMode();