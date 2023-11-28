import { ASTNode, BinaryExpressionNode, NumberLiteralNode } from "./parser";



export class Interpreter {
    visit(node: ASTNode): number {
        if (node.type === 'BinaryExpression') {
            // @ts-expect-error
            return this.visitBinaryExpression(node);
        } else if (node.type === 'NumberLiteral') {
            // @ts-expect-error
            return this.visitNumberLiteral(node);
        } else {
            throw new Error(`Unexpected node type: ${node.type}`);
        }
    }

    private visitBinaryExpression(node: BinaryExpressionNode): number {
        const leftValue = this.visit(node.left);
        const rightValue = this.visit(node.right);

        switch (node.operator) {
            case '+':
                return leftValue + rightValue;
            case '-':
                return leftValue - rightValue;
            default:
                throw new Error(`Unexpected operator: ${node.operator}`);
        }
    }

    private visitNumberLiteral(node: NumberLiteralNode): number {
        return node.value;
    }

    interpret(ast: ASTNode): number {
        return this.visit(ast);
    }
}



