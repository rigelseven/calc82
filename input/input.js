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
                return this.delete("back");
            case "Delete":
                return this.delete("front");
            default:
                return "default";
        }
    }

    delete(direction) {
        if (direction == "back") this.cursorPosition = Math.max(0, this.cursorPosition-1);
        // TODO delete fractions
        if (this.cursorPosition !== this.inputTokens.length) this.inputTokens.splice(this.cursorPosition, 1);
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
            this.cursorPosition = Math.max(this.cursorPosition-1, 0);
        }
        if (direction == "right") {
            this.cursorPosition = Math.min(this.cursorPosition+1, this.inputTokens.length);
        }
    }
        
    createFraction() {
        const orig = this.cursorPosition;
        let moveToTop = false; 
        
        if (this.toNonDigit("left") == orig)
            moveToTop = true; // Flag to move to first box if empty
        this.addToken({type:"FRACTION", exp:"start", rep:"\\frac{"});
        
        this.toNonDigit("right");
        this.addToken({type:"FRACTION", exp:"end", rep:"}"});
        
        // Position in the bottom of the fraction...
        this.cursorPosition = orig + 1;
        this.addToken({type:"FRACTION", exp:"middle", rep:"}{"});

        if (moveToTop) this.cursorPosition = orig+1;  // Unless the top box is empty.
    }

    toNonDigit(step) {
        console.log(this.getCursorToken(step));
        while (this.getCursorToken(step)
            && (this.getCursorToken(step).type === "DIGIT"
            || this.getCursorToken(step).type == "CONSTANT")
            && this.cursorPosition !== 0)
            {
                this.moveCursor(step);
            }
        return this.cursorPosition;
    }
}