import { generateTextAST, generateTextTokens } from "./debug.js";
import trigSolver from "./math/trigonometry.js";
import Calculator from "./calculator.js";
import { InputHandler } from "./input/input.js";
import LayoutEngine from "./interface/layout.js";
import { shiftedToUnshifted, unshiftedToShifted } from "./interface/keyboard.js";
import { historyManager } from "./history.js";
import { display } from "./display.js";
import { menuManager } from "./menu.js";
import { statusBar } from "./statusbar.js";
import { settingsManager } from "./settingsManager.js";
import { getAllPrimeFactors } from "./math/factorise.js"

const inputDisplay = document.querySelector("#input-display");
const outputDisplay = document.querySelector("#output-display");

const buttonsArea = document.querySelector("#buttons-area");

// debug
const tokensDisplay = document.querySelector("#tokens");
const astDisplay = document.querySelector("#ast");

const inputHandler = new InputHandler;
const calculator = new Calculator;
const layoutEngine = new LayoutEngine;

function calculate(storeHistory = true) {
    setOutputFormat();    
    try {
        const value = inputHandler.getTokens();

        if (inputHandler.inputMode !== "Review") colonIndex = 0;

        const {res, decimalResult, fractionResult, specialResult, tokens, ast} = calculator.calculate(value, storeHistory ? colonIndex : previousColonIndex);
        currentResult = res;


        textDisplay.textContent="=";
        tokensDisplay.textContent="Token visualisation\n";
        astDisplay.textContent="AST visualisation\n";
       
        const textAST = generateTextAST(ast);
        astDisplay.textContent += textAST;
        
        const textTokens = generateTextTokens(tokens[colonIndex]);
        tokensDisplay.textContent += textTokens;
        
        if (specialResult) setOutput("special");
        else if (fractionResult) setOutput(settingsManager.getSetting("fractionMode"));
        else setOutput("decimal");

        if (storeHistory) {
            previousColonIndex = colonIndex;
            if (tokens.length > 1) {
                statusBar.toggle("disp", colonIndex !== tokens.length-1);
                colonIndex = (colonIndex + 1) % tokens.length;
            } else {
                colonIndex = 0;
                statusBar.toggle("disp", false);
            }
        }

        inputHandler.setReview();
        renderInput();
        
        if (storeHistory) historyManager.pushHistory(extractSubarray(value, previousColonIndex), fractionResult, decimalResult, specialResult);

    } catch (error) {
        showError(error);
    }
}

function extractSubarray(arr, targetN) {
  const result = [];
  let currentChunkIndex = 0;

  for (const item of arr) {
    if (item.type === "COLON") {
      currentChunkIndex++;
      if (currentChunkIndex > targetN) break; 
      continue;
    }

    if (currentChunkIndex === targetN) {
      result.push(item);
    }
  }

  return result;
}

function showError(error) {
    let errorMessage = error.message;
    if (error.cause) {
        if (error.cause.type !== undefined) errorMessage = error.cause.type;
        if (error.cause.position !== undefined) {
            inputHandler.cursorPosition = error.cause.position;
            renderInput();
        }
    }
    textDisplay.textContent = `= ${errorMessage}`;
    display.renderError(errorMessage);
    inputHandler.setError();

    katex.render("", inputDisplay, {
        throwOnError: false,
        trust: true
    });

    katex.render("", outputDisplay, {
        throwOnError: false
    });

    currentResultType = null;
    console.error(error);
}

function setOutputFormat() {
    const formatMode = settingsManager.getSetting("displayMode");
    if (formatMode[0] === "norm" && formatMode[1] == 1)
        Decimal.set({ precision: 15, maxE: 99, toExpNeg: -3, toExpPos: 10});
    else if (formatMode[0] === "norm" && formatMode[1] == 2)
        Decimal.set({ precision: 15, maxE: 99, toExpNeg: -9, toExpPos: 10});
    else if (formatMode[0] === "fix") 
        Decimal.set({ precision: 15, maxE: 99, toExpNeg: -101, toExpPos: 10});
    else if (formatMode[0] === "sci") 
        Decimal.set({ precision: 15, maxE: 99, toExpNeg: 0, toExpPos: 0});
}

function switchAngleMode(type="improper") {
    if (type === "improper") {
        if (currentResultType !== "decimal" && calculator.decimalResult !== undefined)
            setOutput("decimal");
        else if (currentResultType === "decimal" && calculator.fractionResult !== undefined)
            setOutput("fraction");
    } else if (type == "mixed") {
        if (currentResultType !== "mixed" && calculator.decimalResult !== undefined)
            setOutput("mixed");
        else if (currentResultType === "mixed" && calculator.fractionResult !== undefined)
            setOutput("fraction");
    }
}

function setOutput(outputType, direction) {
    if (outputType === "degminsec") {
        currentResultType = "decimal";
        const deg = calculator.decimalResult.floor();
        const min = calculator.decimalResult.minus(deg).times(60).floor();
        const sec = calculator.decimalResult.minus(deg).minus(min.div(60)).times(3600);
        displayValue = `{${deg.toString()}}^\\circ {${min.toString()}}^\\prime {${sec.toDP(2).toString()}}^{\\prime\\prime}`;
    }
    if (outputType === "factors") {
        currentResultType = "decimal";
        try {
            const factors = getAllPrimeFactors(calculator.decimalResult);

            displayValue = "";

            let currentFactor;
            let currentCount = 0;

            for (const factor of factors) {
                if (factor !== currentFactor) {
                    // Add the previous factor before moving to the next one
                    if (currentFactor !== undefined) {
                        displayValue += currentCount > 1
                            ? `${currentFactor}^{${currentCount}}{\\times}`
                            : `${currentFactor}{\\times}`;
                    }

                    currentFactor = factor;
                    currentCount = 1;
                } else {
                    currentCount++;
                }
            }

            // Add the final factor
            if (currentFactor !== undefined) {
                displayValue += currentCount > 1
                    ? `${currentFactor}^{${currentCount}}`
                    : `${currentFactor}`;
            }
        } catch (error) {
            showError(error);
            return;
        }
    }
    if (outputType === "eng") {
        currentResultType = "decimal";
        let [coeffStr, expStr] = calculator.decimalResult.toExponential().split('e');
        let scientificExp = parseInt(expStr, 10);
        
        let coeff = parseFloat(coeffStr);

        const oldExp = engExp;

        if (engExp !== undefined && engExp !== null) {
            engExp += 3 * direction;
        } else {
            let mod = scientificExp % 3;
            if (mod < 0) mod += 3; 
            engExp = scientificExp - mod;
            if (direction === 1) engExp += 3;
        }

        let shift = scientificExp - oldExp;
        if (scientificExp - engExp < 9 && scientificExp - engExp > -9)
            shift = scientificExp - engExp;
        else
            engExp = oldExp;

        const EngDecimal = Decimal.clone({ 
            toExpPos: 101,
            toExpNeg: -101
        });

        const engResult = new EngDecimal(coeff).times(Math.pow(10, shift)).toSD(10);

        displayValue = engResult.toFixed(9).replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1') + `\\times10^{${engExp}}`;
        console.log(displayValue)
    } else engExp = null;

    if (outputType === "special") {
        if (calculator.specialResult[0] === "Polar")
            displayValue = `{\\text{r=} ${calculator.specialResult[1].toSD(10)}, {\\theta}\\text{=}} ${calculator.specialResult[2].toSD(10)}`;
        else if (calculator.specialResult[0] === "Rectangular")
            displayValue = `\\text{X=} ${calculator.specialResult[1].toSD(10)}, \\text{Y=} ${calculator.specialResult[2].toSD(10)}`;
    }
    if (outputType === "decimal") {
        currentResultType = "decimal";

        const formatMode = settingsManager.getSetting("displayMode")
                                                        // Sci mode accuracy
        displayValue = `${calculator.decimalResult.toSD(formatMode[0] === "sci" ? Number(formatMode[1]) : 10).toString().replace(/e\+?(-?\d+)/g, "\\times10^{$1}")}`;

        // Fix mode
        if (formatMode[0] === "fix" && !displayValue.includes("\\times10")) {
            // Truncate to n digits after dp
            const index = displayValue.indexOf('.');
  
            if (index !== -1)
                displayValue = displayValue.slice(0, Number(index) + Number(formatMode[1]));

            if (!displayValue.includes(".")) displayValue += '.';
        }

        // Comma DP
        if (settingsManager.getSetting("decimalPoint") === "comma")
            displayValue = displayValue.replaceAll('.', '{,}'); 

    } else if (outputType === "fraction") {
        currentResultType = "fraction";
        const numerator = calculator.fractionResult.numerator;
        const denominator = calculator.fractionResult.denominator;
        let sign = "";
        if (numerator.isNeg()) sign = "-";
        displayValue = `${sign}\\frac\{${numerator.abs().toFixed()}\}\{${denominator.toFixed()}\}`;
    } else if (outputType === "mixed" && calculator.fractionResult) {

        currentResultType = "mixed";

        const numerator = calculator.fractionResult.numerator;
        const denominator = calculator.fractionResult.denominator;

        const isNegative = numerator.isNeg();
        const absNumerator = numerator.abs();

        const whole = absNumerator.div(denominator).floor();
        const remainder = absNumerator.mod(denominator);

        if (remainder.isZero()) {
            displayValue = `${isNegative ? "-" : ""}${whole.toFixed()}`;
        } else if (whole.isZero()) {
            displayValue = `${isNegative ? "-" : ""}\\frac{${remainder.toFixed()}}{${denominator.toFixed()}}`;
        } else {
            displayValue = `${isNegative ? "-" : ""}${whole.toFixed()}\\frac{${remainder.toFixed()}}{${denominator.toFixed()}}`;
        }
    }

    katex.render(displayValue, outputDisplay, {
        throwOnError: false
    });
}

function renderInput() {
    if (inputHandler.mode == "Menu") return;
    let inputText = [""];
    let previousToken = null;
    let showCursor = inputHandler.inputMode === "Edit";
    for (let token of inputHandler.getTokens(showCursor)) {
        if (token.type === "COLON" && inputHandler.inputMode == "Review") {inputText.push(""); continue}
        if ((token.type === "POWER") && token.exp === "start"
            && (!(previousToken !== null && ["DIGIT", "CONSTANT", "RPAREN", "RADIANS", "GRADIANS", "DEGREES", "VARIABLE"].includes(previousToken.type))
            && !(previousToken !== null && ["FRACTION", "MIXEDFRAC", "SQRT", "ROOT", "ABS"].includes(previousToken.type) && previousToken.exp === "end")))
            inputText += "{}";
        inputText[inputText.length-1] += `${token.rep}`;

        previousToken = token.type === "CURSOR" ? previousToken : token;
    }
    inputText = addPlaceholders(inputText[inputHandler.inputMode === "Review" ? previousColonIndex : 0]);
    setInput(inputText);
}

function setInput(input) {
    katex.render(input, inputDisplay, {throwOnError: false, strict: "ignore", trust: true})
}

function addPlaceholders(latex) {
    return latex
        .replace(
            "{\\htmlClass{math-cursor-placeholder}{\\vphantom{1}}}",
            "{\\htmlClass{math-cursor-placeholder}{\\vphantom{1}}\\htmlClass{math-square-placeholder}{\\phantom{0}}}"
        )
        .replaceAll(
            "{}",
            "{\\htmlClass{math-square-placeholder}{\\phantom{0}}}"
        );
}

function handleButton(button, forceMode=null) {
        if (forceMode !== null) inputHandler.switchMode(forceMode, true, shiftButton, alphaButton);
        if (button !== null) {
        const action = button[4][inputHandler.mode];
        if (action !== null) {
            const finalAction = inputHandler.handleInput(action);

            if (finalAction === "ErrorDisplay") return;
            else if (inputHandler.mode !== "Menu") 
                display.clearDisplay();

            if (!(finalAction === "nextHistory" || finalAction === "previousHistory" || finalAction === "oldestHistory" || finalAction === "latestHistory"))
            renderInput(); // render later if history

            if (finalAction !== undefined && finalAction !== null) {
                // Handle menu
                if (finalAction.startsWith("Menu")) {
                    const menuAction = finalAction.slice(4);
                    const finalMenuAction = menuManager.handleMenuAction(menuAction)
                    if (finalMenuAction == "Exit") {
                        inputHandler.switchMode("Main", true, shiftButton, alphaButton);
                        if (inputHandler.inputMode == "Review")calculate(false);
                        renderInput();
                        outputDisplay.style.display = "";
                        historyManager.checkHistoryArrows();
                    }
                    else {
                        inputHandler.switchMode("Menu", true, shiftButton, alphaButton);
                        katex.render("", inputDisplay);
                        outputDisplay.style.display = "none";
                    }

                    if (finalMenuAction && finalMenuAction.startsWith("Token")) { // todo tidy this up
                        menuManager.leaveMenus();
                        inputHandler.switchMode("Main", true, shiftButton, alphaButton);
                        inputHandler.handleInput(finalMenuAction.slice(5));
                        renderInput();
                        outputDisplay.style.display = "";
                        historyManager.checkHistoryArrows();
                    }

                    if (finalMenuAction == "ClearIO") {
                        menuManager.leaveMenus();
                        inputHandler.switchMode("Main", true, shiftButton, alphaButton);
                        inputHandler.inputTokens = [];
                        inputHandler.cursorPosition = 0;
                        outputDisplay.style.display = "";
                        historyManager.checkHistoryArrows();
                        displayValue = "";
                        currentResult = "";
                        inputHandler.setEdit();
                        setOutput();
                        renderInput();
                    }

                }

                // Handle store/recall buttons
                if (finalAction.startsWith("Store") && inputHandler.inputTokens.length !== 0) {
                    try {
                        inputHandler.toLastToken();
                        // Handle memory plus/minus buttons
                        if (finalAction == "StoreMPlus") inputHandler.addToken({type:"MPLUS", exp: "MPLUS", rep: `\\text{M+}`});
                        else if (finalAction == "StoreMMinus") inputHandler.addToken({type:"MMINUS", exp: "MMINUS", rep: `\\text{M-}`});
                        else inputHandler.addToken({type:"STORE", exp: finalAction.at(-1), rep: `\\rightarrow{\\text{${finalAction.at(-1)}}}`});
                        renderInput();
                        if (inputHandler.inputTokens.length != 0) calculate(true);
                    } catch (error) {;}
                }

                if (finalAction.startsWith("Recall")) {
                    const toCalculate = inputHandler.inputTokens.length === 0;
                    inputHandler.addToken({type:"VARIABLE", exp: finalAction.at(-1), rep: `\\text{${finalAction.at(-1)}}`});
                    renderInput();
                    if (toCalculate) calculate(true);
                }
            }

            // Handle history buttons
            if (finalAction === "nextHistory" || finalAction === "previousHistory" || finalAction === "oldestHistory" || finalAction === "latestHistory") {
                let h;
                if (finalAction === "nextHistory") h = historyManager.nextHistory();
                else if (finalAction === "previousHistory") h = historyManager.prevHistory();
                else if (finalAction === "oldestHistory") h = historyManager.oldestHistory();
                else if (finalAction === "latestHistory") h = historyManager.latestHistory();
                
                if (h) {
                    inputHandler.setTokens(h.expression);
                    calculator.fractionResult = h.fractionResult;
                    calculator.decimalResult = h.decimalResult;
                    calculator.specialResult = h.specialResult;
                    previousColonIndex = 0;
                    renderInput();
                    setOutput(calculator.specialResult !== undefined ? "special" : 
                        calculator.fractionResult !== undefined ? "fraction" : "decimal");
                    statusBar.toggle("disp", false);
                }
            }

            // Handle calculation
            else if (finalAction === "calculate") {
                if (inputHandler.inputTokens.length != 0) calculate(true);
            }
            // Handle angle mode
            else if (finalAction === "standard-decimal") switchAngleMode("improper");
            else if (finalAction === "mixed-improper") switchAngleMode("mixed");
            // Handle eng button
            else if (finalAction === "engineering") setOutput("eng", -1);
            else if (finalAction === "reduceDecimal") setOutput("eng", 1);
            // Handle factor button
            else if (finalAction === "factors") setOutput("factors");
            else if (finalAction === "degminsec") setOutput("degminsec");
            
            // Handle mode buttons
            if (finalAction === "shift") inputHandler.switchMode("Shift", false, shiftButton, alphaButton);
            else if (finalAction === "alpha") inputHandler.switchMode("Alpha", false, shiftButton, alphaButton);
            else if (finalAction === "store") inputHandler.switchMode("Store", false, shiftButton, alphaButton);
            else if (finalAction === "recall") inputHandler.switchMode("Recall", false, shiftButton, alphaButton);
            else {
                inputHandler.switchMode("Main", false, shiftButton, alphaButton);
            }
        } else {
            inputHandler.switchMode("Main", false, shiftButton, alphaButton);
        }
    }

    scrollToCursor();
}

window.scrollToCursor = scrollToCursor;

function scrollToCursor() {
    const cursor = document.querySelector(".math-cursor-placeholder");

    if (!cursor) return;

    const rect = cursor.getBoundingClientRect();
    const container = inputDisplay;

    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const padding = containerRect.width * 0.05; // 5cqw

    if (rect.left < containerRect.left + padding) {
        container.scrollLeft += rect.left - (containerRect.left + padding);
    } else if (rect.right > containerRect.right - padding) {
        container.scrollLeft += rect.right - (containerRect.right - padding);
    }

    if (rect.top < containerRect.top + padding) {
        container.scrollTop += rect.top - (containerRect.top + padding);
    } else if (rect.bottom > containerRect.bottom - padding) {
        container.scrollTop += rect.bottom - (containerRect.bottom - padding);
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
        if (button !== undefined && !(event.metaKey  || event.ctrlKey || event.altKey)) {
            event.preventDefault();
            if (event.repeat) return; // TODO repeat arrow keys
            button[2].classList.add(`pressed-${button[1] === null ? (inputHandler.mode == "Menu" ? "Main" : inputHandler.mode) : button[1]}`);
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
        
        const counterpart = /^[a-z]$/i.test(event.key)
        ? (event.key === event.key.toLowerCase()
            ? event.key.toUpperCase()
            : event.key.toLowerCase())
        : shiftedToUnshifted[event.key] ?? unshiftedToShifted[event.key];
        
        for (const button of [layoutEngine.getButtonFromKey(event.key),
            layoutEngine.getButtonFromKey(event.key, "Variable"),
            layoutEngine.getButtonFromKey(counterpart),
            layoutEngine.getButtonFromKey(counterpart, "Variable")]) {
            if (button !== undefined) {
                event.preventDefault();
                button[2].classList.remove("pressed-Main", "pressed-Shift", "pressed-Alpha", "pressed-Store", "pressed-Recall");
                layoutEngine.getButtonFromKey(counterpart)?.[2]?.classList.remove("pressed-Main", "pressed-Shift", "pressed-Alpha", "pressed-Store", "pressed-Recall");
            }
        }
    });
}

let colonIndex = 0;
let previousColonIndex = 0;

let currentResultType = null;
let currentResult = null;
let displayValue = null;

let isShiftKeyHeld = false;
let isAlphaKeyHeld = false;

let engExp = null;

const shiftKey = "Shift";
const alphaKey = "z";

layoutEngine.createButtons();

const shiftButton = layoutEngine.getButtonFromKey("Shift")[2];
const alphaButton = layoutEngine.getButtonFromKey("Alpha")[2];

setOutputFormat();

attachListeners();
renderInput();

statusBar.toggle('math', true);