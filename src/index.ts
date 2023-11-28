import * as readline from 'readline';
// import tokenizer
import { Tokenizer } from './tokenizer';
import { Parser } from './parser';
import { Interpreter } from './interpreter';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}





async function main() {
    try {
        const expression = await getUserInput('Enter a mathematical expression: ');
        const tokens = new Tokenizer(expression).getAllTokens();
        // console.dir(tokens, { depth: null });
        const parser = new Parser(tokens);
        const ast = parser.parse();
        console.log(ast);

        const interpreter = new Interpreter();
        const result = interpreter.interpret(ast);
        console.log(result);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        rl.close();
    }
}

main();