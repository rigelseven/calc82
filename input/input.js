    import { TOKENS } from "./inputTokens.js";

    export class InputHandler {
        constructor(tokens=[]) {
            this.inputTokens = tokens;
            this.cursorPosition = 0;
        }
    
    handleKey(key) {
        const token = TOKENS[key];
        if (token) return this.addToken(token);
        if (/^\d$/.test(key) || key === ".") return this.addToken({type:"DIGIT", rep: key, value:key});
        switch (key) {
            case "f":
                return this.createFraction();
            case "E":
                return this.addToken({type:"DIGIT", rep: ""})
            case "ArrowLeft":
                return this.moveCursor("left");
            case "ArrowRight":
                return this.moveCursor("right");
            case "Enter": 
                return "calculate";
            case "Backspace":
                return this.delete("left");
            case "Delete":
                return this.delete("right");
            default:
                return "default";
        }
    }

    delete(direction) {
        if (direction == "left") this.cursorPosition = Math.max(0, this.cursorPosition-1);
        const deleteToken = this.getCursorToken("right");
        if (deleteToken && deleteToken.type == "FRACTION") {
            if (deleteToken.exp == "start") {
                this.deleteFraction();
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

    getCursorToken(direction = "left") {
        if (direction == "left")
            return this.inputTokens[this.cursorPosition-1];
        else if (direction == "right")
            return this.inputTokens[this.cursorPosition];
        else throw new Error("Direction not specified");
    }
    
    moveCursor(direction) {
        if (direction == "left") {
            return this.cursorPosition = Math.max(this.cursorPosition-1, 0);
        }
        if (direction == "right") {
            return this.cursorPosition = Math.min(this.cursorPosition+1, this.inputTokens.length);
        }
    }
        
    createFraction() {
        const orig = this.cursorPosition;
        let moveToTop = false; 
        
        if (this.toNonDigit("left") == orig)
            moveToTop = true; // Flag to move to first box if empty
        this.addToken({type:"FRACTION", exp:"start", rep:"\\frac{"});
        
        this.cursorPosition = orig + 1;
        this.toNonDigit("right");
        this.addToken({type:"FRACTION", exp:"end", rep:"}"});
        
        // Position in the bottom of the fraction...
        this.cursorPosition = orig + 1;
        this.addToken({type:"FRACTION", exp:"middle", rep:"}{"});

        if (moveToTop) this.cursorPosition = orig+1;  // Unless the top box is empty.
    }
    
    deleteFraction() {
        let orig = this.cursorPosition;
        this.inputTokens.splice(this.cursorPosition, 1);
        let currentHeight = 0;
        while (this.cursorPosition < this.inputTokens.length) {
            const currentToken = this.getCursorToken("right");
            console.log(this.getCursorToken("right"), currentHeight);
            if (currentToken.type === "FRACTION") {
                if (currentToken.exp === "start") currentHeight++;
                if (currentHeight === 0) {
                    this.inputTokens.splice(this.cursorPosition, 1);
                    if (currentToken.exp === "middle") this.cursorPosition--;
                    if (currentToken.exp === "end") break;
                } else if (currentToken.exp === "end") currentHeight--;
            }
            this.moveCursor("right");
        }
        this.cursorPosition = orig;
    }

    toNonDigit(step) {
        let currentHeight = 0;
        let currentBracket = 0;
        const increment = step == "left" ? -1 : 1;
        while (this.getCursorToken(step)
            && ((this.getCursorToken(step).type === "DIGIT"
            || this.getCursorToken(step).type === "CONSTANT"
            || (this.getCursorToken(step).type === "FUNCTION" && step == "right")
            || this.getCursorToken(step).type === "LPAREN"
            || this.getCursorToken(step).type === "RPAREN")
            || this.getCursorToken(step).type === "FRACTION"
            && this.cursorPosition !== 0
            || currentBracket > 0 ))
            {
                const currentToken = this.getCursorToken(step);
                if (currentToken.type == "LPAREN") currentBracket += increment; 
                if (currentToken.type == "RPAREN") currentBracket -= increment; 
                if (currentToken.type == "FRACTION") {
                    if (step == "left" && currentToken.exp !== "end" && currentHeight === 0) break; 
                    if (step == "right" && currentToken.exp !== "start" && currentHeight === 0) break; 
                    if (currentToken.end === "end") currentHeight += increment;
                    if (currentToken.end === "start") currentHeight == increment;
                }
                if (currentToken.type == "FRACTION" && currentToken.exp == "end") currentHeight -= increment; 
                this.moveCursor(step);
            }
        return this.cursorPosition;
    }
}