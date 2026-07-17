export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    // Recursive descent parser!!!
    parse() {
        const ast = this.expression();
        if(!this.isAtEnd()) {
            throw new Error("Syntax error: Unexpected token", {cause: {type: "Syntax ERROR", position: this.getToken().pos}});
        }
        return ast;
    }

    expression() {
        return this.addition();
    }

    addition() {
        let expr = this.multiplication();
        
        while(this.match("PLUS", "MINUS", "PERMUTATION", "COMBINATION")) {
            const operator = this.getPreviousToken();
            const right = this.multiplication();

            expr = {
                type: "BinaryExpression",
                operator: operator.type,
                pos: operator.pos,
                left: expr,
                right
            };
        }

        return expr;
    }

    multiplication() {
        let expr = this.fraction();

        while (this.match("MULTIPLY", "DIVIDE")) {
            const operator = this.getPreviousToken();
            const right = this.fraction();

            expr = {
                type: "BinaryExpression",
                operator: operator.type,
                pos: operator.pos,
                left: expr,
                right
            }

        }
        return expr;
    }

    fraction() {
        let expr = this.power();

        while (this.match("FRACTION")) {
            const middle = this.power();
            if (!this.match("FRACTION")) {
                return {
                    type: "FractionExpression",
                    pos: this.getPreviousToken().pos + 1,
                    numerator: expr,
                    denominator: middle
                };
            }

            const right = this.power();

            return {
                type: "FractionExpression",
                pos: this.getPreviousToken().pos + 1,
                whole: expr,
                numerator: middle,
                denominator: right
            };
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
                pos: operator.pos,
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
                pos: this.getPreviousToken().pos,
                operator: "MINUS",
                argument: this.unary()
            };

        }
        return this.postfix();
    }

    postfix() {
        let expr = this.variable();

        while (this.match("FACTORIAL", "PERCENT", "DEGREES", "RADIANS", "GRADIANS")) {
            const operator = this.getPreviousToken();

            expr = {
                type: "PostfixExpression",
                pos: operator.pos,
                operator: operator.type,
                argument: expr,
            }
        }

        return expr;
    }

    variable() {
        if (this.match("VARIABLE")) {
            return {
                type: "Variable",
                pos: this.getPreviousToken().pos,
                name: this.getPreviousToken().value
            };
        }
    
        return this.primary();
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
                pos: this.getPreviousToken().pos,
                name: this.getPreviousToken().value
            };
        }

        if (this.match("FUNCTION")) {
            const name = this.getPreviousToken().value;
            const pos = this.getPreviousToken().pos;

            this.consume("LPAREN");

            let args = [];

            // Get upcoming commas
            if (!this.checkType("RPAREN")) {
                do {
                    args.push(this.expression());
                } while (this.match("COMMA"));
            }

            const operator = this.consume("RPAREN");

            return {
                type: "FunctionCall",
                name,
                pos: operator.pos,
                args
            }
        }

        if (this.match("LPAREN")) {
            const expr = this.expression();
            this.consume("RPAREN");

            return expr;
        }
        throw new Error(`Syntax error: Expected expression`, {cause: {type: "Syntax ERROR", position: this.getToken().pos}});
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
        
        throw new Error(`Syntax error: Expected ${type}`, {cause: {type: "Syntax ERROR", position: this.getToken().pos}});
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