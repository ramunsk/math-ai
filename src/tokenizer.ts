export class Token {
    constructor(public type: string, public value: string) { }
}

export class Tokenizer {
    private input: string;
    private currentPos: number;

    constructor(input: string) {
        this.input = input;
        this.currentPos = 0;
    }

    private isDigit(char: string): boolean {
        return /\d/.test(char);
    }

    private isOperator(char: string): boolean {
        return /[+\-]/.test(char);
    }

    private readNumber(): string {
        let result = '';

        while (this.currentPos < this.input.length && this.isDigit(this.input[this.currentPos])) {
            result += this.input[this.currentPos];
            this.currentPos++;
        }

        return result;
    }

    private readOperator(): string {
        const operator = this.input[this.currentPos];
        this.currentPos++;
        return operator;
    }

    getNextToken(): Token | null {
        while (this.currentPos < this.input.length && /\s/.test(this.input[this.currentPos])) {
            this.currentPos++; // Skip whitespace
        }

        if (this.currentPos >= this.input.length) {
            return null; // End of input
        }

        const currentChar = this.input[this.currentPos];

        if (this.isDigit(currentChar)) {
            const value = this.readNumber();
            return new Token('NUMBER', value);
        }

        if (this.isOperator(currentChar)) {
            const value = this.readOperator();
            return new Token('OPERATOR', value);
        }

        throw new Error(`Invalid character: ${currentChar}`);
    }

    getAllTokens(): Token[] {
        const tokens: Token[] = [];
        let token = this.getNextToken();

        while (token !== null) {
            tokens.push(token);
            token = this.getNextToken();
        }

        return tokens;
    }
}


