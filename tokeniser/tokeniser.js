import { SYMBOLS, FUNCTIONS, CONSTANTS } from "./tokens.js";

export default class Tokeniser {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenise() {
        while (!this.isAtEnd()) {
            const c = this.getCharacter();
            // Skip whitespace (testing input)
            if (/\s/.test(c)) {
                this.advance();
                continue;
            }

            // Number
            if (/\d/.test(c) || (c === "." && /\d/.test(this.getNextCharacter()))) {
                this.addToken(this.scanNumber());
                continue;
            }

            // Identifier
            if (/[a-z]/i.test(c)) {
                this.addToken(this.scanIdentifier());
                continue;
            }

            // Single character operators
            const token = SYMBOLS[c];
            if (token) {
                this.addToken(token);
                this.advance();
                continue;
            }

            throw new Error(`Syntax error: Unexpected char ${c}`)
        }
        this.addToken({
            type: "EOF"
        })
        return this.tokens;
    }

    addToken(token) {
        // Handle implicit multiplication: if the last token and current token need implicit mult
        const previous = this.tokens.at(-1);
        if (previous && this.needsImpMult(previous, token)) {
            this.tokens.push({
                type: "MULTIPLY"
            });
        }

        this.tokens.push(token);
    }

    scanNumber() {
        let value = "";
        let seenDecimal = false;

        while (!this.isAtEnd()) {
            const c = this.getCharacter();
            if (/\d/.test(c)) {
                value += c;
                this.advance();
            } else if (c === "." && !seenDecimal) {
                seenDecimal = true;
                value += c;
                this.advance();
            } else {
                break;
            }
        }
        
        return {
            type: "NUMBER",
            value: Number(value)
        };
    }

    scanIdentifier() {
        // Read in the next function (sin, cos..)
        let text = "";

        while (!this.isAtEnd()) {
            const c = this.getCharacter();

            if (/[a-z]/i.test(c)) {
                text += c;
                this.advance();
            } else {
                break;
            }
        }

        if (CONSTANTS.has(text)) {
            return {
                type: "CONSTANT",
                value: text
            }
        }

        if (FUNCTIONS.has(text)) {
            return {
                type: "FUNCTION",
                value: text
            }
        }

        throw new Error(`Syntax error: Unexpected identifier ${text}`)
    }

    getCharacter() {
        // Get current character
        return this.input[this.position];
    }

    getNextCharacter() {
        return this.input[this.position + 1];
    }

    advance() {
        // Move forwards (andn return)
        return this.input[this.position++];
    }

    isAtEnd() {
        return this.position >= this.input.length;
    }

    needsImpMult(left, right) {
        const leftEnd = [
            "NUMBER",
            "CONSTANT",
            "RPAREN"
        ];

        const rightStart = [
            "CONSTANT",
            "FUNCTION",
            "LPAREN"
        ];

        return leftEnd.includes(left.type) && rightStart.includes(right.type);
    }
}