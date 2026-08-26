import { generateTextAST, generateTextTokens } from "./debug.js";
import trigSolver from "./math/trigonometry.js";
import Calculator from "./calculator.js";
import { InputHandler } from "./input/input.js";
import LayoutEngine from "./interface/layout.js";
import { shiftedToUnshifted, unshiftedToShifted } from "./interface/keyboard.js";
import { historyManager } from "./history.js";
import { display } from "./display.js";

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

const buttonsArea = document.querySelector("#buttons-area");

// debug
const tokensDisplay = document.querySelector("#tokens");
const astDisplay = document.querySelector("#ast");

const inputHandler = new InputHandler;
const calculator = new Calculator;
const layoutEngine = new LayoutEngine;



calculateButton.addEventListener("click", function(event) {
    calculate(true);
});

function calculate(storeHistory = true) {
    try {
        const value = inputHandler.getTokens();
        const {res, decimalResult, fractionResult, tokens, ast} = calculator.calculate(value);
        currentResult = res;

        textDisplay.textContent="=";
        tokensDisplay.textContent="Token visualisation\n";
        astDisplay.textContent="AST visualisation\n";
       
        const textAST = generateTextAST(ast);
        astDisplay.textContent += textAST;
        
        const textTokens = generateTextTokens(tokens);
        tokensDisplay.textContent += textTokens;
        
        if (fractionResult) setOutput("fraction");
        else setOutput("decimal");

        inputHandler.setReview();
        renderInput();

        if (storeHistory) historyManager.pushHistory(value, fractionResult, decimalResult);

    } catch (error) {
        let errorMessage = error.message;
        if (error.cause) {
            if (error.cause.type !== undefined) errorMessage = error.cause.type;
            if (error.cause.position !== undefined) {
                inputHandler.cursorPosition = error.cause.position;
                renderInput();
            }
        }
        textDisplay.textContent=`= ${errorMessage}`;
        display.renderError(errorMessage);
        inputHandler.setError();

        katex.render("", inputDisplay, {
            throwOnError: false
        });

        currentResultType = null;
        console.error(error);
    }
}

// Angle mode selector
angleModeSelector.addEventListener("change", function(event) {
    getAngleMode();
    calculate(false);
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

function renderInput() {
    let inputText = "";
    let previousToken = null;
    let showCursor = inputHandler.inputMode === "Edit";
    for (let token of inputHandler.getTokens(showCursor)) {
        if ((token.type === "POWER") && token.exp === "start"
            && (!(previousToken !== null && ["DIGIT", "CONSTANT", "RPAREN", "RADIANS", "GRADIANS", "DEGREES", "VARIABLE"].includes(previousToken.type))
            && !(previousToken !== null && ["FRACTION", "MIXEDFRAC", "SQRT", "ROOT", "ABS"].includes(previousToken.type) && previousToken.exp === "end")))
            inputText += "{}";
        inputText += `${token.rep}`;

        previousToken = token.type === "CURSOR" ? previousToken : token;
    }
    inputText = addPlaceholders(inputText);
    setInput(inputText);
}

function setInput(input) {
    katex.render(input, inputDisplay, {throwOnError: false, strict: "ignore"})
    testInput.value = "";
    for (let token of inputHandler.getTokens(false)) testInput.value += token.type;
}

function addPlaceholders(latex) {
    return latex
        .replace("{\\clap{\\rule{0.1em}{0.5em}}}", "{\\clap{\\rule{0.1em}{0.5em}}\\square}")
        .replaceAll("{}", "{\\square}")
}

function handleButton(button, forceMode=null) {
        if (forceMode !== null) inputHandler.switchMode(forceMode, true, shiftButton, alphaButton);
        if (button !== null) {
        const action = button[4][inputHandler.mode];
        if (action !== null) {
            const finalAction = inputHandler.handleInput(action);
            if (finalAction === "ErrorDisplay") return;
            else display.clearDisplay();
            renderInput();
            console.log(finalAction)

            if (finalAction !== undefined && finalAction !== null) {
                // Handle store/recall buttons
                if (finalAction.startsWith("Store")) {
                    try {
                        inputHandler.toLastToken();
                        // Handle memory plus/minus buttons
                        if (finalAction == "StoreMPlus") inputHandler.addToken({type:"MPLUS", exp: "MPLUS", rep: `\\text{M+}`});
                        else if (finalAction == "StoreMMinus") inputHandler.addToken({type:"MMINUS", exp: "MMINUS", rep: `\\text{M-}`});
                        else inputHandler.addToken({type:"STORE", exp: finalAction.at(-1), rep: `\\rightarrow{\\text{${finalAction.at(-1)}}}`});
                        renderInput();
                        calculate(true);
                    } catch (error) {;}
                }

                if (finalAction.startsWith("Recall")) {
                    const toCalculate = inputHandler.inputTokens.length === 0;
                    inputHandler.addToken({type:"VARIABLE", exp: finalAction.at(-1), rep: `\\text{${finalAction.at(-1)}}`});
                    renderInput();
                    if (toCalculate) calculate(true);
                }

                console.log(inputHandler.mode)
                // Handle menu
                if (finalAction.startsWith("Menu")) {
                    console.log("m", finalAction.slice(4));
                    // todo make this its own class
                    inputHandler.switchMode("Menu", true, shiftButton, alphaButton);
                    display.renderMenu(["MthIO","LineIO","Deg","Rad","Gra","Fix","Sci", "Norm"]);
                    display.renderMenu(["ab/c","d/c","STAT", "Disp", "⏴CONT⏵"]);
                    display.renderMenu(["COMP", "STAT", "VERIF"]);

                }
            }

            // Handle history buttons
            if (finalAction === "nextHistory" || finalAction === "previousHistory" || finalAction === "oldestHistory" || finalAction === "latestHistory") {
                let h;
                if (finalAction === "nextHistory") h = historyManager.nextHistory();
                else if (finalAction === "previousHistory") h = historyManager.prevHistory();
                else if (finalAction === "oldestHistory") h = historyManager.oldestHistory();
                else if (finalAction === "latestHistory") h = historyManager.latestHistory();
                inputHandler.setTokens(h.expression);
                calculator.fractionResult = h.fractionResult;
                calculator.decimalResult = h.decimalResult;
                renderInput();
                setOutput(calculator.fractionResult !== undefined ? "fraction" : "decimal");
            }

            // Handle calculation
            else if (finalAction === "calculate") calculate(true);
            else if (finalAction === "standard-decimal") switchAngleMode();
            
            // Handle mode buttons
            if (finalAction === "shift") inputHandler.switchMode("Shift", false, shiftButton, alphaButton);
            else if (finalAction === "alpha") inputHandler.switchMode("Alpha", false, shiftButton, alphaButton);
            else if (finalAction === "store") inputHandler.switchMode("Store", false, shiftButton, alphaButton);
            else if (finalAction === "recall") inputHandler.switchMode("Recall", false, shiftButton, alphaButton);
            else {
                if (inputHandler.mode != "Menu") 
                    inputHandler.switchMode("Main", false, shiftButton, alphaButton);
            }
        } else {
            inputHandler.switchMode("Main", false, shiftButton, alphaButton);
        }
    }
}

function attachListeners() {
    buttonsArea.addEventListener("click", (event) => {
        event.stopPropagation();

        let button_id;
        if (event.target.classList.contains("nav-button")) {
            button_id = event.target.getAttribute("id").split("_");
        }
        else {
            const button_element = event.target.closest(".button-wrapper");
            if (button_element === null) return;
            button_id = button_element.getAttribute("id").split("_");
        }
        const button = layoutEngine.getButton(button_id[0], button_id[1]);
        
        handleButton(button);
    });

    document.addEventListener('keydown', (event) => {

        // Handle shift and alpha lone press
        if (event.key === shiftKey) {isShiftKeyHeld = true; return;}
        else isShiftKeyHeld = false;
        if (event.key === alphaKey) {isAlphaKeyHeld = true; return;}
        else isAlphaKeyHeld = false;

        let button = layoutEngine.getButtonFromKey(event.key);
        if (inputHandler.mode === "Store" || inputHandler.mode === "Recall")
            button = layoutEngine.getButtonFromKey(event.key, "Variable") ?? button;
        if (button !== undefined) {
            event.preventDefault();
            if (event.repeat) return; // TODO repeat arrow keys
            button[2].classList.add(`pressed-${button[1] === null ? inputHandler.mode : button[1]}`);
            handleButton(button[0], button[1]);
        }
    });

    // TODO handle missing keyup on lost focus.
    document.addEventListener('keyup', (event) => {
        
        // Handle shift and alpha lone press
        if (event.key === shiftKey && isShiftKeyHeld) {
            inputHandler.switchMode("Shift", false, shiftButton, alphaButton);
            isShiftKeyHeld = false;
            return;
        }
        else if (event.key === alphaKey && isAlphaKeyHeld) {
            inputHandler.switchMode("Alpha", false, shiftButton, alphaButton);
            isAlphaKeyHeld = false;
            return;
        }
        
        for (const button of [layoutEngine.getButtonFromKey(event.key), layoutEngine.getButtonFromKey(event.key, "Variable")]) {
            if (button !== undefined) {
                event.preventDefault();
                button[2].classList.remove("pressed-Main", "pressed-Shift", "pressed-Alpha", "pressed-Store", "pressed-Recall");
                    const counterpart = /^[a-z]$/i.test(event.key)
                    ? (event.key === event.key.toLowerCase()
                        ? event.key.toUpperCase()
                        : event.key.toLowerCase())
                    : shiftedToUnshifted[event.key] ?? unshiftedToShifted[event.key];

                layoutEngine.getButtonFromKey(counterpart)?.[2]?.classList.remove("pressed-Main", "pressed-Shift", "pressed-Alpha", "pressed-Store", "pressed-Recall");
            }
        }
    });
}

let currentResultType = null;
let currentResult = null;
let displayValue = null;

let isShiftKeyHeld = false;
let isAlphaKeyHeld = false;

const shiftKey = "Shift";
const alphaKey = "z";

getAngleMode();
layoutEngine.createButtons();

const shiftButton = layoutEngine.getButtonFromKey("Shift")[2];
const alphaButton = layoutEngine.getButtonFromKey("Alpha")[2];

attachListeners();
renderInput();