import { SYMBOLS, FUNCTIONS, CONSTANTS, VARIABLES } from "./tokens.js";

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
            if (/[a-z]/i.test(c) && !/[CP]/.test(c)) {
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
        let seenExponent = false;
        let exponentAllowed = false;
        let exponentSignAllowed = false;
        let canEnd = true;
        
        while (!this.isAtEnd()) {
            const c = this.getCharacter();
            
            if (/\d/.test(c)) {
                exponentSignAllowed = false
                value += c;
                canEnd = true;
                this.advance();

            } else if (c === "." && !seenDecimal) {
                seenDecimal = true;
                exponentSignAllowed = false
                value += c;
                this.advance();

            } else if (c === "E" && !seenExponent) {
                seenExponent = true;
                exponentSignAllowed = true;
                canEnd = false;
                value += c;
                this.advance();

            } else if ((c === "+" || c === "-") && exponentSignAllowed) {
                exponentSignAllowed = false;
                canEnd = false;
                value += c;
                this.advance();
            } else {
                break;
            }
        }
        if (!canEnd) {
            throw new Error(`Syntax error: incomplete number`);
        }
        
        return {
            type: "NUMBER",
            value: value
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

        if (VARIABLES.has(text)) {
            return {
                type: "VARIABLE",
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
            "RPAREN",
            "VARIABLE"
        ];

        const rightStart = [
            "CONSTANT",
            "FUNCTION",
            "LPAREN",
            "VARIABLE"
        ];

        return leftEnd.includes(left.type) && rightStart.includes(right.type);
    }
}