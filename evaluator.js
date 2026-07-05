import factorial  from "./math/factorial.js";

export default class Evaluator {
    evaluate(node) {
        switch (node.type) {
            case "NumberLiteral":
                return node.value;
            case "Constant":
                return this.evaluateConstant(node);
            case "UnaryExpression":
                return this.evaluateUnary(node);
            case "BinaryExpression":
                return this.evaluateBinary(node);
            case "FunctionCall":
                return this.evaluateFunction(node);
            case "PostfixExpression":
                return this.evaluatePostfix(node);
            default:
                throw new Error(`Unknown node ${node.type}`)
        }
    }

    evaluateConstant(node) {
        switch(node.value) {
            case "pi":
                return Math.PI
            case "e":
                return Math.E
        }
    }

    evaluateUnary(node) {
        const value = this.evaluate(node.argument);

        switch(node.operator) {
            case "MINUS":
                return -value;
        }
    }

    evaluateBinary(node) {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        switch (node.operator) {
            case "PLUS":
                return left + right;
            case "MINUS":
                return left - right;
            case "MULTIPLY":
                return left * right;
            case "DIVIDE":
                return left / right;
            case "POWER":
                return Math.pow(left, right);
        }
    }

    evaluateFunction(node) {
        const value = this.evaluate(node.argument);

        switch (node.name) {
            case "sin":
                return Math.sin(value);
            case "cos":
                return Math.cos(value);
            case "tan":
                return Math.tan(value);
            case "sqrt":
                return Math.sqrt(value);
            case "log":
                return Math.log10(value);
            case "ln":
                return Math.log(value);
            default:
                throw new Error(`Unknown function: ${node.name}`);
        }

        return fn(this.evaluate(node.argument))
    }

    evaluatePostfix(node) {
        const value = this.evaluate(node.argument);

        switch (node.operator) {
            case "FACTORIAL":
                return factorial(value);

            default:
                throw new Error(`Unknown postfix: ${node.operator}`);
        }
    }
}