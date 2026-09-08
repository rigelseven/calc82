import { SYMBOLS, MULTICHAR } from "./tokens.js";

export default class Tokeniser {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [[]];
    }

    tokenise() {
        while (!this.isAtEnd()) {
            const c = this.getCharacter();

            // Number
            const nextChar = this.getNextCharacter();
            if (c.type === "DIGIT" || (c.type === "DIGIT" && c.value === "E" && nextChar && (nextChar.type === "PLUS" || nextChar.type === "MINUS" || nextChar.type === "UNARYMINUS"))) {
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
                if (c.type === "POWER" && this.getPreviousCharacter().type == "POWER") {
                    throw new Error(`Syntax error: Disallowed power token`, {cause: {type: "Syntax ERROR", position: this.position}})
                }
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

            // Constants/variables
            if (c.type === "CONSTANT" || c.type === "VARIABLE"  || c.type === "STORE" || c.type === "MPLUS" || c.type === "MMINUS") {
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

            // Colon
            if (c.type === "COLON") {
                this.addToken({
                    type: "EOF"
                })
                this.tokens.push([]);
                this.advance();
                continue;
            }

            throw new Error(`Syntax error: Unexpected input token ${c.type}`, {cause: {type: "Syntax ERROR", position: this.position}})
        }
        this.addToken({
            type: "EOF"
        })
        return this.tokens;
    }

    addToken(token) {
        // Handle implicit multiplication: if the last token and current token need implicit mult
        const previous = this.tokens.at(-1).at(-1);
        if (previous && this.needsImpMult(previous, token)) {
            this.tokens.at(-1).push({
                type: "IMPLICITMULTIPLY",
                pos: this.position
            });
        }

        this.tokens.at(-1).push(token);
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
            if (/^\d+$/.test(c)) {
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

            } else if ((c === "PLUS" || c === "MINUS" || c === "UNARYMINUS") && exponentSignAllowed) {
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
            return num.replace(/([Ee])([+-]+)(\d+)/g, (_, e, signs, digits) => {
                const negative = [...signs].filter(c => c === "-").length % 2 === 1;
                return `${e}${negative ? "-" : ""}${digits}`;
            });
        } catch (error) {
            throw new Error(error.message, {cause: {type: "Syntax ERROR", position: this.position}});
        }
    }
    
    getCharacter() {
        // Get current character
        return this.input[this.position];
    }

    getNextCharacter() {
        return this.input[this.position + 1];
    }

    getPreviousCharacter() {
        return this.input[this.position - 1];
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
            "VARIABLE",
        ];

        return leftEnd.includes(left.type) && rightStart.includes(right.type);
    }
}