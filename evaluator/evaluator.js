import { BINARY } from "./binary.js";
import { CONSTANTS } from "./constants.js";
import { variableManager } from "./variables.js"
import { FUNCTIONS } from "./functions.js";
import { POSTFIX } from "./postfix.js";
import { UNARY } from "./unary.js"
import Fraction from "../math/fraction.js";
import { divide, plus, times } from "../math/arithmetic.js";
import { Polar, Rectangular } from "../math/polRec.js";


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
        let value = this.evaluate(node.argument);

        const operation = UNARY[node.operator];

        if (value instanceof Polar || value instanceof Rectangular) value = value.toDecimal();

        return operation(value);
    }

    evaluateBinary(node) {
        let left = this.evaluate(node.left);
        let right = this.evaluate(node.right);

        const operation = BINARY[node.operator];

        if (left instanceof Polar || left instanceof Rectangular) left = left.toDecimal();
        if (right instanceof Polar || right instanceof Rectangular) right = right.toDecimal();

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

        for (let i = 0; i < values.length; i++) {
            if (values[i] instanceof Polar || values[i] instanceof Rectangular) {
                values[i] = values[i].toDecimal();
            }
        }

        return entry.fn(...values);
    }

    evaluatePostfix(node) {
        let value = this.evaluate(node.argument);

        const operation = POSTFIX[node.operator];

        if (value instanceof Polar || value instanceof Rectangular) value = value.toDecimal();

        return operation(value);
    }

    evaluateVariable(node) {
        return variableManager.getVariable(node.name);
    }

    evaluateDecimal(node) {
        const value = new Decimal(node.value);

        return Fraction.fromDecimal(value);
    }

    evaluateFraction(node) {
        // improper fraction
        let numerator = this.evaluate(node.numerator);
        let denominator = this.evaluate(node.denominator);

        if (node.whole !== undefined) {
            const whole = this.evaluate(node.whole);
            numerator = plus(numerator, times(whole, denominator))
        }

        if (numerator instanceof Polar || numerator instanceof Rectangular) numerator = numerator.toDecimal();
        if (denominator instanceof Polar || denominator instanceof Rectangular) denominator = denominator.toDecimal();

        return divide(numerator, denominator);
    }

    checkBounds(value) {
        const checkValue = value.toDecimal();

        if ((checkValue instanceof Decimal) && (checkValue.e > 99 || !checkValue.isFinite() || checkValue.e === undefined))
            throw new Error("Math error: out of bounds")
        if (checkValue.e < -99) return new Decimal(0)
        return value
    }
}