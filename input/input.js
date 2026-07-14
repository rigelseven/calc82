    import { TOKENS } from "./inputTokens.js";

    export class InputHandler {
        constructor(tokens=[]) {
            this.inputTokens = tokens;
            this.cursorPosition = 0;
        }
    
    handleKey(key) {
        const token = TOKENS[key];
        if (token) return this.addToken(token);
        if (/\d/.test(key) || key === ".") this.addToken({type:"DIGIT", rep: key, value:key});
        if (key === "E") this.addToken({type:"DIGIT", rep: ""})
        switch (key) {
            case "ArrowLeft":
                return this.moveCursor("left");
            case "ArrowRight":
                return this.moveCursor("right");
            case "Enter": 
                return "calculate";
            case "Backspace":
                return this.backspace();
            default:
                return "default";
        }
    }

    backspace() {
        this.cursorPosition = Math.max(0, this.cursorPosition-1);
        if (this.cursorPosition !== this.inputTokens.length) this.inputTokens.splice(this.cursorPosition, 1);
    }
    
    addToken(token) {
        this.inputTokens.splice(this.cursorPosition, 0, token);
        this.cursorPosition += 1;
    }
    
    getTokens(cursor = false) {
        if (cursor) return this.inputTokens.toSpliced(this.cursorPosition, 0, {type:"CURSOR", rep:"\\clap{\\rule{0.02em}{0.7em}}"})
        return this.inputTokens;
    }
    
    moveCursor(direction) {
        if (direction == "left") {
            this.cursorPosition = Math.max(this.cursorPosition-1, 0);
        }
        if (direction == "right") {
            this.cursorPosition = Math.min(this.cursorPosition+1, this.inputTokens.length);
        }
    }
}