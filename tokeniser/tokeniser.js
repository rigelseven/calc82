import { SYMBOLS, MULTICHAR } from "./tokens.js";

export default class Tokeniser {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenise() {
        while (!this.isAtEnd()) {
            console.log(this.position);
            const c = this.getCharacter();

            // Number
            const nextChar = this.getNextCharacter();
            if (c.type === "DIGIT" || (c.type === "DIGIT" && c.value === "E" && nextChar && (nextChar.type === "PLUS" || nextChar.type === "MINUS"))) {
                this.addToken(this.scanNumber());
                continue;
            }

            // Single character operators
            if (c.type in SYMBOLS) {
                this.addToken({
                    type: c.type,
                    pos: this.position
                });
                this.advance();
                continue;
            }

            // Multi char operators
            if (c.type in MULTICHAR) {
                for (let token of MULTICHAR[c.type][c.exp]) {
                    if (token.f) {
                        this.addToken({
                            type: "FUNCTION",
                            value: token["f"],
                            pos: this.position
                        });
                    } else {
                        this.addToken({
                            type: token,
                            pos: this.position
                        });
                    }
                }
                this.advance();
                continue;
            }

            // Constants
            if (c.type === "CONSTANT") {
                this.addToken({
                    type: c.type,
                    value: c.exp,
                    pos: this.position
                });
                this.advance();
                continue;
            }

            // Functions.
            if (c.type == "FUNCTION") {
                this.addToken({
                    type: c.type,
                    value: c.exp,
                    pos: this.position
                });
                this.addToken({
                    type: "LPAREN",
                    pos: this.position
                });
                this.advance();
                continue;
            }

            throw new Error(`Syntax error: Unexpected input token ${c.type}`, {cause: {type: "Syntax ERROR", position: this.getToken().pos}})
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
                type: "MULTIPLY",
                pos: this.position
            });
        }

        this.tokens.push(token);
    }

    scanNumber() {
        let value = "";
        let seenDecimal = false;
        let seenExponent = false;
        let seenDigit = false;
        let exponentAllowed = false;
        let exponentSignAllowed = false;
        let canEnd = true;
        
        while (!this.isAtEnd()) {
            const c = this.getCharacter().value ? this.getCharacter().value : this.getCharacter().type;
            console.log(c);
            if (/\d/.test(c)) {
                seenDigit = true;
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
                if (!seenDigit && !seenDecimal) value = "1";
                if (!seenDigit && seenDecimal) value = "0";
                seenExponent = true;
                exponentSignAllowed = true;
                canEnd = false;
                value += c;
                this.advance();

            } else if ((c === "PLUS" || c === "MINUS") && exponentSignAllowed) {
                canEnd = false;
                value += c === "PLUS" ? "+" : "-";
                this.advance();
            } else {
                break;
            }
        }
        if (!canEnd) {
            throw new Error(`Syntax error: incomplete number`, {cause: {type: "Syntax ERROR", position: this.position}});
        }
        
        return {
            type: "NUMBER",
            value: this.finaliseNumber(value),
            pos: this.position
        };
    }

    finaliseNumber(num) {
        try {
            return num.replace(
                /([E])([+-]?)([+-]?)(\d+)/g,
                function (match, e, firstSign, secondSign, exponent) {
                    var signs = firstSign + secondSign;
                    if (exponent.length > 2) throw new Error("Syntax error: scientific notation out of range");

                    if (signs.indexOf("-") !== -1) {
                        return e + "-" + exponent;
                    }

                    // "+", "++", or no sign -> positive exponent
                    console.log(e + exponent);
                    return e + exponent;
                }
            );
        } catch (error) {
            throw new Error(error.message, {cause: {type: "Syntax ERROR", position: this.position}});
        }
    }

    scanIdentifier() {
        // Read in the next function (sin, cos..)
        let text = "";
        let count = 0;

        while (!this.isAtEnd()) {
            const c = this.getCharacter();

            if (/[a-z]/i.test(c)) {
                text += c;
                this.advance();
                count += 1;
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

        this.rewind(count);
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

    rewind(cnt) {
        for (let i=0; i<cnt; i++) {
            this.position--;
        }
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