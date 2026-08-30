import { historyManager } from "../history.js";
import { TOKENS } from "./inputTokens.js";

export class InputHandler {
    constructor(tokens=[]) {
        this.inputTokens = tokens;
        this.cursorPosition = 0;
        this.mode = "Main";
        this.inputMode = "Edit";
    }

    handleInput(input) {
        const token = TOKENS[input];

        if (this.inputMode == "Error") {
            switch(input) {
            case "ArrowLeft":
                this.setEdit();
                return;
            case "ArrowRight":
                this.setEdit();
                return;
            case "AllClear":
                this.inputTokens = [];
                this.cursorPosition = 0;
                this.setEdit();
                return;

            default:
                return "ErrorDisplay";
            }
        }

        if (this.inputMode == "Review") {
            switch(input) {
            case "ArrowLeft":
                this.setEdit();
                this.cursorPosition = this.inputTokens.length;
                return;
            case "ArrowRight":
                this.setEdit();
                this.cursorPosition = 0;
                return;
            case "ArrowUp":
                if (this.inputMode == "Review") return "previousHistory";
                return;
            case "ArrowDown":
                if (this.inputMode == "Review") return "nextHistory";
                return;
            case "Shift":
                return "shift";
            case "Alpha":
                return "alpha";

            case "Calculate":
                return "calculate";
            case "StandardToDecimal":
                return "standard-decimal";
            case "Store":
                return "store";
            case "Recall":
                return "recall";
            case "Delete":
                return;
            case "AllClear":
                this.inputTokens = [];
                this.cursorPosition = 0;
                this.setEdit();
                return;

            default:
                this.setEdit();
                this.setTokens([]);
                console.log(this.cursorPosition)
            }

            if ([
                "Plus",
                "Minus",
                "Multiply",
                "Divide",
                "Square",
                "Cube",
                "Power",
                "Factorial",
                "Percent",
                "Invert"
            ].includes(input) ||
                (typeof(input) === "string" && input.startsWith("Store")))
            {
                this.addToken({type: "VARIABLE", exp: "Ans", rep: "\\text{Ans}"});
            }
        }

        if (token !== undefined) return this.addToken(token);

        switch(input) {
            case "ArrowLeft":
                this.moveCursor("left", true);
                return;
            case "ArrowRight":
                this.moveCursor("right", true);
                return;
            case "ArrowUp":
                if (this.traverseFraction("up")) return;
                if (this.inputTokens.length === 0) {
                    this.setReview();
                    return "latestHistory";
                }
                return;
            case "ArrowDown":
                if (this.traverseFraction("down")) return;
                if (this.inputTokens.length === 0) {
                    this.setReview();
                    return "oldestHistory";
                }
                return;
            case "Shift":
                return "shift";
            case "Alpha":
                return "alpha";

            case "Calculate":
                return "calculate";
            case "StandardToDecimal":
                return "standard-decimal";
            case "Store":
                return "store";
            case "Recall":
                return "recall";
            case "Delete":
                return this.delete("left");
            case "AllClear":
                this.inputTokens = [];
                this.cursorPosition = 0;
                return;

            case "Fraction":
                return this.createSpecial("FRACTION", "\\frac{", "}{", "}");
            case "MixedFraction":
                return this.createSpecial("MIXEDFRAC", "\\,{", "}\\frac{", "}", "}{");
            case "Power":
                return this.createSpecial("POWER", "\\vphantom{}^{", null, "}");
            case "Square":
                return this.createSpecial("POWER",  "\\vphantom{}^{", null, "}", null, [2]);
            case "Cube":
                return this.createSpecial("POWER", "\\vphantom{}^{", null, "}", null, [3]);
            case "Invert":
                return this.createSpecial("POWER", "\\vphantom{}^{", null, "}", null, ["UnaryMinus", 1]);
            case "Sqrt":
                return this.createSpecial("SQRT", "\\sqrt{", null, "}\\,");
            case "Root":
                return this.createSpecial("ROOT", "\\sqrt[{", "}]{", "}\\,");
            case "CubeRoot":
                this.addToken({type:"ROOT", exp: "start", rep: "\\sqrt[{"});
                this.addToken({type:"DIGIT", rep: "3", value: "3"});
                this.addToken({type:"ROOT", exp: "middle", rep: "}]{"});
                this.addToken({type:"ROOT", exp: "end", rep: "}\\,"});
                this.moveCursor("left");
                return;
            case "Abs":
                this.addToken({type:"ABS", exp: "start", rep: "|{"});
                this.addToken({type:"ABS", exp: "end", rep: "}|"});
                this.moveCursor("left");
                return;
            case "Exp":
                this.addToken({type:"EXP", exp: "start", rep: "{\\footnotesize{\\mathbf{e}}^{"});
                this.addToken({type:"EXP", exp: "end", rep: "}}"});
                this.moveCursor("left");
                return;
            case "10^x":
                this.addToken({type:"EXP10", exp: "start", rep: "{\\footnotesize{\\texttt{10}}^{"});
                this.addToken({type:"EXP10", exp: "end", rep: "}}"});
                this.moveCursor("left");
                return;

            default:
                return input;
        }
    }

    delete(direction) {
        if (direction == "left") this.cursorPosition = Math.max(0, this.cursorPosition-1);
        const deleteToken = this.getCursorToken("right");
        if (!deleteToken) return;
        if (deleteToken.type == "POWER") return this.deletePower();
        if (deleteToken && ["FRACTION", "MIXEDFRAC", "SQRT", "ROOT", "ABS", "EXP", "EXP10"].includes(deleteToken.type)) {
            if (deleteToken.exp == "start") {
                this.deleteSpecial(deleteToken.type);
            }
        } else {
            if (this.cursorPosition !== this.inputTokens.length) this.inputTokens.splice(this.cursorPosition, 1);
        }
    }
    
    addToken(token) {
        this.inputTokens.splice(this.cursorPosition, 0, token);
        this.cursorPosition += 1;
    }
    
    getTokens(cursor = false) {
        if (cursor) return this.inputTokens.toSpliced(this.cursorPosition, 0, {type:"CURSOR", rep:"\\clap{\\rule{0.1em}{0.5em}}"}) // TODO: 0.5/0.7 depends on if in fraction etc.
        return this.inputTokens;
    }

    setTokens(input) {
        this.inputTokens = [...input];
        this.cursorPosition = this.inputTokens.length;
    }

    setReview() {
        this.cursorPosition = this.inputTokens.length;
        this.inputMode = "Review";
    }

    setError() {
        this.inputMode = "Error";
    }

    setEdit() {
        this.inputMode = "Edit";
        katex.render("", document.querySelector("#output-display"));  // TODO dont hard code
    }

    getCursorToken(direction = "left") {
        if (direction == "left")
            return this.inputTokens[this.cursorPosition-1];
        else if (direction == "right")
            return this.inputTokens[this.cursorPosition];
        else throw new Error("Direction not specified");
    }
    
    moveCursor(direction, wrap=false) {
        if (wrap) {
            if (direction == "left") {
                this.cursorPosition -=1;
                if (this.cursorPosition < 0) this.cursorPosition = this.inputTokens.length;
                return this.cursorPosition;
            }
            if (direction == "right") {
                this.cursorPosition += 1;
                if(this.cursorPosition > this.inputTokens.length) this.cursorPosition = 0;
                return this.cursorPosition;
            }
        } else {
            if (direction == "left") {
                return this.cursorPosition = Math.max(this.cursorPosition-1, 0);
            }
            if (direction == "right") {
                return this.cursorPosition = Math.min(this.cursorPosition+1, this.inputTokens.length);
            }
        }
    }

    createSpecial(type, start, middle, end, middle2, args) {
        let orig = this.cursorPosition;
        let moveToTop = false; 
        
        const leftDigit = this.toNonDigit("left");
        // Power should be made at the cursor current location.
        if (type === "POWER" || type === "SQRT") this.cursorPosition = orig;

        this.addToken({type:type, exp:"start", rep:start});
        
        this.cursorPosition = orig + 1;
        if (!args) this.toNonDigit("right");

        if (type === "MIXEDFRAC") this.addToken({type:type, exp:"middle2", rep: middle2});
        if (args) for (const arg of args) this.addToken(TOKENS[arg]);
        this.addToken({type:type, exp:"end", rep:end});
        
        // Position in the bottom of the fraction...
        this.cursorPosition = orig + 1;
        if (middle !== null) this.addToken({type:type, exp:"middle", rep:middle});

        if (leftDigit === orig && (type === "FRACTION" || type === "MIXEDFRAC" || type === "ROOT"))
            moveToTop = true; // Flag to move to first box if empty
        if (type === "POWER" || type === "SQRT") {
            if (leftDigit !== orig) moveToTop = true
        }

        if (moveToTop && (type === "FRACTION" || type === "MIXEDFRAC")) this.cursorPosition = orig+1;
        if (moveToTop && type === "ROOT") this.cursorPosition = orig+1;
        if (type === "POWER") {
            if (moveToTop) {
                if (args) this.cursorPosition = orig + 2 + args.length;
            }
            else this.cursorPosition = orig;
        }
    }
    
    deleteSpecial(type) {
        let orig = this.cursorPosition;
        this.inputTokens.splice(this.cursorPosition, 1);
        let currentHeight = 0;
        while (this.cursorPosition < this.inputTokens.length) {
            const currentToken = this.getCursorToken("right");
            if (currentToken.type === type) {
                if (currentToken.exp === "start") currentHeight++;
                if (currentHeight === 0) {
                    this.inputTokens.splice(this.cursorPosition, 1);
                    if (currentToken.exp === "middle" || currentToken.exp === "middle2") this.cursorPosition--;
                    if (currentToken.exp === "end") break;
                } else if (currentToken.exp === "end") currentHeight--;
            }
            this.moveCursor("right");
        }
        this.cursorPosition = orig;
    }

    deletePower() {
        if (this.getCursorToken("right") && this.getCursorToken("right").exp === "end") return;
        return this.deleteSpecial("POWER")
    }

    traverseFraction(direction) {
        const orig = this.cursorPosition;
        let currentHeight = 0;
        const step = direction === "up" ? "left" : "right";
        const increment = direction === "up" ? -1 : 1;
        // Traverse until i find a middle on the same or lower currentHeight
        while(this.getCursorToken(step)) {
            const currentToken = this.getCursorToken(step);
            const middleExp = currentToken.type === "FRACTION" ? "middle" : "middle2"
            if (currentToken.type === "FRACTION" || (currentToken.type === "MIXEDFRAC")) {
                if (currentToken.type === "MIXEDFRAC" && ((step === "right" && currentToken.exp === "middle" && currentHeight >= 0))) break;
                if (currentToken.exp === middleExp && currentHeight <= 0) {
                    this.moveCursor(step);
                    return true;
                } else {
                if (currentToken.exp === "end") currentHeight -= increment;
                if (currentToken.exp === "start") currentHeight += increment;
                }
            }
            this.moveCursor(step);
        }
        // Reset the cursor if a matching middle wasn't found.
        if (this.cursorPosition === 0 || this.cursorPosition === this.inputTokens.length)
            this.cursorPosition = orig;
        // Return that we failed, so the equation list can be traversed instead.
        return false;
    }

    toNonDigit(step) {
        let currentHeight = {"FRACTION": 0, "MIXEDFRAC": 0, "POWER": 0, "ROOT": 0, "SQRT": 0, "ABS": 0};
        let currentBracket = 0;
        const increment = step === "left" ? -1 : 1;
        let token;
        while (
            (token = this.getCursorToken(step)) &&
            (
                [
                    "DIGIT",
                    "CONSTANT",
                    "LPAREN",
                    "RPAREN",
                    "FRACTION",
                    "MIXEDFRAC",
                    "POWER",
                    "ROOT",
                    "SQRT",
                    "ABS",
                    "VARIABLE"
                ].includes(token.type) ||
                (token.type === "FUNCTION" && step === "right") ||
                currentBracket > 0 ||
                currentHeight.FRACTION > 0 ||
                currentHeight.MIXEDFRAC > 0 ||
                currentHeight.POWER > 0 ||
                currentHeight.ROOT > 0 ||
                currentHeight.SQRT > 0 ||
                currentHeight.ABS > 0
            )
        ) {
            const currentToken = this.getCursorToken(step);
            if (token.type === "LPAREN" || token.type === "FUNCTION") currentBracket += increment; 
            if (token.type === "RPAREN") currentBracket -= increment; 

            if (currentBracket < 0 &&
                !(currentHeight.FRACTION > 0 ||
                currentHeight.MIXEDFRAC > 0 ||
                currentHeight.POWER > 0 ||
                currentHeight.ROOT > 0 ||
                currentHeight.SQRT > 0 ||
                currentHeight.ABS > 0)
            ) break;
            
            if (["FRACTION", "MIXEDFRAC", "POWER", "SQRT", "ROOT", "ABS"].includes(token.type)) {
                if (step === "left" && token.exp !== "end" && currentHeight[token.type] === 0) break; 
                if (step === "right" && token.exp !== "start" && currentHeight[token.type] === 0) break; 
                if (token.exp === "end") currentHeight[token.type] -= increment;
                if (token.exp === "start") currentHeight[token.type] += increment;
            }
            this.moveCursor(step);
        }
    return this.cursorPosition;
    }

    toLastToken() {
        this.cursorPosition = this.inputTokens.length;
        return;
    }

    getLineEquivalent() {
        let line = "";
        for (let token of this.getTokens()) {
            if (token.type == "DIGIT") line += token.value;
            else if (token.exp) line += LINE_EQUIVALENTS[token.type][token.exp];
            else line += LINE_EQUIVALENTS[token.type];
        }
        return line;
    }

    switchMode(mode, force, shiftButton, alphaButton) {
        if (force) this.mode = mode;
        else {
            if (this.mode === "Menu") return;
            if (mode === "Main") this.mode = "Main";
            else if (mode === "Store") this.mode = "Store";
            else if (mode === "Recall") this.mode = "Recall";
            else if (mode === "Menu") this.mode = "Menu";
            else if (mode === "Shift") this.mode = this.mode === "Shift" ? "Main" : "Shift";
            else if (mode === "Alpha") this.mode = this.mode === "Alpha" ? "Main" : "Alpha";
        }
        shiftButton.classList.toggle("pressed-Shift", this.mode === "Shift");
        alphaButton.classList.toggle("pressed-Alpha", this.mode === "Alpha");
    }
}