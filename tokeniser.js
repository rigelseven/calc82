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
            if (/\d/.test(c)) {
                this.tokens.push(this.scanNumber());
                continue;
            }

            // Identifier
            if (/[a-z]/i.test(c)) {
                this.tokens.push(this.scanIdentifier());
                continue;
            }

            // Single character operators
            const token = SYMBOLS[c];
            if (token) {
                this.tokens.push(token);
                this.advance();
                continue;
            }

            throw new Error(`Unexpected char ${c}`)
        }
        this.tokens.push({
            type: "EOF"
        })
        return this.tokens;
    }

    scanNumber() {
        let value = "";

        while (!this.isAtEnd()) {
            const c = this.getCharacter();
            if (/\d/.test(c) || c === ".") {
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

        throw new Error(`Unexpected identifier ${text}`)
    }

    getCharacter() {
        // Get current character
        return this.input[this.position];
    }

    advance() {
        // Move forwards (andn return)
        return this.input[this.position++];
    }

    isAtEnd() {
        return this.position >= this.input.length;
    }

}