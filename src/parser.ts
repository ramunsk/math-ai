import { Token } from './tokenizer';

enum ASTNodeType {
    BinaryExpression = 'BinaryExpression',
    NumberLiteral = 'NumberLiteral',
}

export interface ASTNode {
    type: ASTNodeType;
}

export interface BinaryExpressionNode extends ASTNode {
    type: ASTNodeType.BinaryExpression;
    operator: string;
    left: ASTNode;
    right: ASTNode;
}

export interface NumberLiteralNode extends ASTNode {
    type: ASTNodeType.NumberLiteral;
    value: number;
}

export class Parser {
    private tokens: Token[];
    private currentPos: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.currentPos = 0;
    }

    private match(expectedType: string): void {
        const currentToken = this.tokens[this.currentPos];

        if (currentToken && currentToken.type === expectedType) {
            this.currentPos++;
        } else {
            throw new Error(`Unexpected token: ${JSON.stringify(currentToken)}`);
        }
    }

    private binaryExpression(operator: string, left: ASTNode, right: ASTNode): BinaryExpressionNode {
        return {
            type: ASTNodeType.BinaryExpression,
            operator,
            left,
            right,
        };
    }

    private numberLiteral(value: number): NumberLiteralNode {
        return {
            type: ASTNodeType.NumberLiteral,
            value,
        };
    }

    private expression(): ASTNode {
        let left = this.term();

        while (this.tokens[this.currentPos] && ['+', '-'].includes(this.tokens[this.currentPos].value)) {
            const operator = this.tokens[this.currentPos].value;
            this.currentPos++;

            const right = this.term();
            left = this.binaryExpression(operator, left, right);
        }

        return left;
    }

    private term(): ASTNode {
        return this.number();
    }

    private number(): ASTNode {
        const digits = this.digit();
        return this.numberLiteral(parseInt(digits, 10));
    }

    private digit(): string {
        const currentToken = this.tokens[this.currentPos];

        if (currentToken && currentToken.type === 'NUMBER') {
            const value = currentToken.value;
            this.currentPos++;
            return value;
        } else {
            throw new Error('Expected a digit');
        }
    }

    parse(): ASTNode {
        return this.expression();
    }
}

//   // Example usage:
//   const inputExpression = '10 + 20 - 5';
//   const tokenizer = new Tokenizer(inputExpression);
//   const tokens = tokenizer.getAllTokens();

//   const parser = new Parser(tokens);
//   const ast = parser.parse();
//   console.log(JSON.stringify(ast, null, 2));
