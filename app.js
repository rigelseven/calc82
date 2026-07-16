import { generateTextAST, generateTextTokens } from "./debug.js";
import trigSolver from "./math/trigonometry.js";
import Calculator from "./calculator.js";
import { InputHandler } from "./input/input.js";

// TODO: Depends on Norm1/Norm2
// Norm1: toExpNeg = -3
Decimal.set({ precision: 15, maxE: 99, toExpNeg: -3, toExpPos: 10});

const textDisplay = document.querySelector("#text-display");
const testInput = document.querySelector("#test-input");

const inputDisplay = document.querySelector("#input-display");
const outputDisplay = document.querySelector("#output-display");

const angleModeSelector = document.querySelector("#angle-mode-selector");
const calculateButton = document.querySelector("#calculate-button");
const outputModeButton = document.querySelector("#standard-decimal-button");

// debug
const tokensDisplay = document.querySelector("#tokens");
const astDisplay = document.querySelector("#ast");

const inputHandler = new InputHandler;
const calculator = new Calculator;
let currentResultType = null;
let currentResult = null;
let displayValue = null;

calculateButton.addEventListener("click", function(event) {
    calculate(testInput.value);
});

function calculate(value) {
    try {
        const {res, decimalResult, fractionResult, tokens, ast} = calculator.calculate(value);
        currentResult = res;

        textDisplay.textContent="=";
        tokensDisplay.textContent="Token visualisation\n";
        astDisplay.textContent="AST visualisation\n";
       
        const textAST = generateTextAST(ast);
        console.log(ast);
        astDisplay.textContent += textAST;
        
        const textTokens = generateTextTokens(tokens);
        console.table(tokens);
        tokensDisplay.textContent += textTokens;
        
        if (fractionResult) setOutput("fraction");
        else setOutput("decimal");
        
    } catch (error) {
        textDisplay.textContent=`= ${error.message}`;
        outputDisplay.innerHTML="";
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
    if (currentResultType === "fraction"  && calculator.decimalResult !== undefined)
        setOutput("decimal");
    else if (currentResultType === "decimal" && calculator.fractionResult !== undefined)
        setOutput("fraction");
}

function setOutput(outputType) {
    if (outputType === "decimal") {
        currentResultType = "decimal";
        displayValue = `${calculator.decimalResult.toSD(10).toString().replace(/e\+?(-?\d+)/g, "\\times10^{$1}")}`;
    } else if (outputType === "fraction") {
        currentResultType = "fraction";
        const numerator = calculator.fractionResult.numerator;
        const denominator = calculator.fractionResult.denominator;
        let sign = "";
        if (numerator.isNeg()) sign = "-";
        displayValue = `${sign}\\frac\{${numerator.abs()}\}\{${denominator}\}`;
    }
    // textDisplay.textContent = displayValue;
    katex.render(displayValue, outputDisplay, {
        throwOnError: false
    });
}

document.addEventListener('keydown', (event) => {
    const action = inputHandler.handleKey(event.key);
    if (action !== "default") event.preventDefault();
    let inputText = "";
    let previousToken = "";
    for (let token of inputHandler.getTokens(true)) {
        console.log(previousToken);
        if (token.type === "POWER" && token.exp === "start" && !previousToken.includes(["DIGIT"]))
            inputText += "{}";
        inputText += `${token.rep}`;

        previousToken = token.type === "CURSOR" ? previousToken : token.type;
    }
    console.log(inputText);
    inputText = addPlaceholders(inputText);
    console.log(inputText);
    setInput(inputText);
    if (action == "calculate") {
        calculate(testInput.value);
    }
})

function setInput(input) {
    katex.render(input, inputDisplay, {throwOnError: false, strict: "ignore"})
    testInput.value = "";
    for (let token of inputHandler.getTokens(false)) testInput.value += token.type;
}

function addPlaceholders(latex) {
    return latex.replace("{\\clap{\\rule{0.1em}{0.5em}}}", "{\\clap{\\rule{0.1em}{0.5em}}\\text{▯}}")
        .replaceAll("{}", "{\\text{▯}}")
}

getAngleMode();