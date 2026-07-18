import { BINARY } from "./binary.js";
import { CONSTANTS } from "./constants.js";
import { VARIABLES } from "./variables.js"
import { FUNCTIONS } from "./functions.js";
import { POSTFIX } from "./postfix.js";
import { UNARY } from "./unary.js"
import Fraction from "../math/fraction.js";
import { divide, plus, times } from "../math/arithmetic.js";


export default class Evaluator {
    evaluate(node) {
        try {
            switch (node.type) {
                case "NumberLiteral":
                    return this.checkBounds(this.evaluateDecimal(node));
                case "FractionExpression":
                    return this.checkBounds(this.evaluateFraction(node));
                case "Constant":
                    return this.checkBounds(this.evaluateConstant(node));
                case "Variable":
                    return this.checkBounds(this.evaluateVariable(node));
                case "UnaryExpression":
                    return this.checkBounds(this.evaluateUnary(node));
                case "BinaryExpression":
                    return this.checkBounds(this.evaluateBinary(node));
                case "FunctionCall":
                    return this.checkBounds(this.evaluateFunction(node));
                case "PostfixExpression":
                    return this.checkBounds(this.evaluatePostfix(node));
                default:
                    throw new Error(`Syntax error: Unknown node ${node.type}`);
            }
        } catch (error) {
            if (!error.cause) throw new Error (error.message, {cause: {type: "Math ERROR", position: node.pos}});
            throw error;
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
        const entry = FUNCTIONS[node.name];

        if (!entry) {
            throw new Error(`Unknown function: ${node.name}`);
        }

        if (values.length !== entry.args) {
            throw new Error(
                `Syntax error: ${node.name} expects ${entry.args} argument(s), got ${values.length}`
            );
        }

        return entry.fn(...values);
    }

    evaluatePostfix(node) {
        const value = this.evaluate(node.argument);

        const operation = POSTFIX[node.operator];

        return operation(value);
    }

    evaluateVariable(node) {
        const operation = VARIABLES[node.name];

        return operation();
    }

    evaluateDecimal(node) {
        const value = new Decimal(node.value);

        return Fraction.fromDecimal(value);
    }

    evaluateFraction(node) {
        // improper fraction
        let numerator = this.evaluate(node.numerator);
        const denominator = this.evaluate(node.denominator);

        if (node.whole !== undefined) {
            const whole = this.evaluate(node.whole);
            numerator = plus(numerator, times(whole, denominator))
        }

        return divide(numerator, denominator);
    }

    checkBounds(value) {
        if ((value instanceof Decimal) && (value.e > 99 || !value.isFinite() || value.e === undefined))
            throw new Error("Math error: out of bounds")
        if (value.e < -99) return new Decimal(0)
        return value
    }
}