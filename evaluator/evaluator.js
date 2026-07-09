import { BINARY } from "./binary.js";
import { CONSTANTS } from "./constants.js";
import { FUNCTIONS } from "./functions.js";
import { POSTFIX } from "./postfix.js";
import { UNARY } from "./unary.js"


export default class Evaluator {
    evaluate(node) {
        switch (node.type) {
            case "NumberLiteral":
                return new Decimal(node.value);
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
                throw new Error(`Syntax error: Unknown node ${node.type}`)
        }
    }

    evaluateConstant(node) {
        return CONSTANTS[node.name]
    }

    evaluateUnary(node) {
        const value = this.evaluate(node.argument);

        const operation = UNARY[node.operator];

        return operation(value);
    }

    evaluateBinary(node) {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        const operation = BINARY[node.operator];

        return operation(left, right);
    }

    evaluateFunction(node) {
        const values = node.args.map(arg => this.evaluate(arg));
        const fn = FUNCTIONS[node.name];

        return fn(...values);
    }

    evaluatePostfix(node) {
        const value = this.evaluate(node.argument);

        const operation = POSTFIX[node.operator];

        return operation(value);
    }
}