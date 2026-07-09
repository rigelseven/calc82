export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    // Recursive descent parser!!!
    parse() {
        const ast = this.expression();
        if(!this.isAtEnd()) {
            throw new Error("Syntax error: Unexpected token");
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
        let expr = this.power();

        while (this.match("MULTIPLY", "DIVIDE")) {
            const operator = this.getPreviousToken();
            const right = this.power();

            expr = {
                type: "BinaryExpression",
                operator: operator.type,
                left: expr,
                right
            }

        }
        return expr;
    }

    power() {
        let expr = this.unary();

        while(this.match("POWER")) {
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
        if (this.match("MINUS")) {
            return {
                type: "UnaryExpression",
                operator: "MINUS",
                argument: this.unary()
            };

        }
        return this.postfix();
    }

    postfix() {
        let expr = this.primary();

        while (true) {
            if (this.match("FACTORIAL")) {
                expr = {
                    type: "PostfixExpression",
                    operator: "FACTORIAL",
                    argument: expr
                };

                continue;
            }

            // TODO? Refactor
            if (this.match("PERCENT")) {
                expr = {
                    type: "PostfixExpression",
                    operator: "PERCENT",
                    argument: expr
                };

                continue;
            }
            break;
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

        if (this.match("CONSTANT")) {
            return {
                type: "Constant",
                name: this.getPreviousToken().value
            };
        }

        if (this.match("FUNCTION")) {
            const name = this.getPreviousToken().value;
            this.consume("LPAREN");

            let args = [];

            // Get upcoming commas
            if (!this.checkType("RPAREN")) {
                do {
                    args.push(this.expression());
                } while (this.match("COMMA"));
            }

            this.consume("RPAREN");

            return {
                type: "FunctionCall",
                name,
                args
            }
        }

        if (this.match("LPAREN")) {
            const expr = this.expression();
            this.consume("RPAREN");

            return expr;
        }

        throw new Error("Syntax error: Expected expression")
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
        
        throw new Error(`Syntax error: Expected ${type}`);
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
        return this.getToken().type === "EOF";
    }
}