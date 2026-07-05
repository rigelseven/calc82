export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    // Recursive descent parser!!!
    parse() {
        const ast = this.expression();
        if(!this.isAtEnd()) {
            throw new Error("Unexpected token");
        }
        return ast;
    }

    expression() {
        return this.addition();
    }

    addition() {
        let expr = this.multiplication();
        
        while(this.match("PLUS", "MINUS")) {
            const operator = this.getPreviousToken();
            const right = this.multiplication();

            expr = {
                type: "BinaryExpression",
                operator: operator.type,
                left: expr,
                right
            };
        }

        return expr;
    }

    multiplication() {
        let expr = this.unary();

        while (this.match("MULTIPLY", "DIVIDE")) {
            const operator = this.getPreviousToken();
            const right = this.unary();

            expr = {
                type: "BinaryExpression",
                operator: operator.type,
                left: expr,
                right
            }

        }
        return expr;
    }

    unary() {
        let expr = this.primary()

        if(this.match("MINUS")) {
            return {
                type: "UnaryExpression",
                operator: "-",
                argument: this.unary()
            };

        }
        return expr;
    }

    primary() {
        if (this.match("NUMBER")) {
            return {
                type: "NumberLiteral",
                value: this.getPreviousToken().value
            };
        }

        if (this.match("LPAREN")) {
            const expr = this.expression();
            this.consume("RPAREN");

            return expr;
        }

        throw new Error("Expected expression...")
    }

    getToken() {
        return this.tokens[this.current];
    }

    getPreviousToken() {
        return this.tokens[this.current - 1];
    }

    advance() {
        if (!this.isAtEnd()) {
            this.current++
        }

        return this.getPreviousToken();
    }

    consume(type) {
        if(this.checkType(type)) {
            return this.advance();
        }
        
        throw new Error(`Expected ${type}`);
    }

    checkType(type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.getToken().type === type;
    }

    match(...types) {
        for (const type of types) {
            if(this.checkType(type)) {
                this.advance();
                return true;
            }
        }

        return false;
    }

    isAtEnd() {
        if (this.current >= this.tokens.length) {
            return true;
        }
        return this.getToken().type === "EOF";
    }
}