export default class Evaluator {
    evaluate(node) {
        switch (node.type) {
            case "NumberLiteral":
                return node.value;
            case "UnaryExpression":
                return this.evaluateUnary(node);
            case "BinaryExpression":
                return this.evaluateBinary(node);
            default:
                throw new Error(`Unknown node ${node.type}`)
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
        }
    }
}