// Tokens visualiser
export function generateTextTokens(tokens) {
    let output = "";

    tokens.forEach((token, index) => {
        output += `${index} ${token.type}${token.value===undefined ? "" : `(${token.value})`} \n`;
    });

    return output;
}

// AST visualiser
export function generateTextAST(ast) {
    return buildTree(ast);
}

function buildTree(node, prefix="", isLast) {
    if (!node) return "";
    const branch = isLast ? "└─" : "├─";

    let output = prefix + branch + label(node) + "\n";
    console.log(output);

    const children = getChildren(node);

    children.forEach((child, index) => {
        output += buildTree(
            child,
            prefix + (isLast ? "  " : "│ "),
            index === children.length - 1
        );
    });

    return output;

}

function label(node) {
    switch(node.type) {
        case "NumberLiteral":
            return `Number(${node.value})`;
        case "BinaryExpression":
            return `Binary(${node.operator})`;
        case "UnaryExpression":
            return `Unary(${node.operator})`;
        case "PostfixExpression":
            return `Postfix(${node.operator})`;
        case "FunctionCall":
            return `Function(${node.name})`;
        case "Constant":
            return `Constant(${node.name})`;
        
        default:
            return node.type;
    }
}

function getChildren(node) {
    switch(node.type) {
        case "BinaryExpression":
            return [node.left, node.right];
        
        case "UnaryExpression":
        case "PostfixExpression":
        case "FunctionCall":
            return [node.argument];

        default:
            return [];
    }
}