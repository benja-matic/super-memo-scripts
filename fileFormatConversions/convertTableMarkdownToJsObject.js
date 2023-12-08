import { readFile, writeFile } from 'fs/promises';

function convertToJsObject(input) {
    const lines = input.split('\n');
    const result = [];

    // Start from the third line to skip the header and formatting
    for (let i = 2; i < lines.length; i++) {
        const [question, answer] = lines[i].split('|').slice(1, 3);
        if (question && answer) {
            result.push({
                question: question.trim(),
                answer: answer.trim()
            });
        }
    }

    return `export default ${JSON.stringify(result, null, 2)};`;
}

async function processFile(inputPath, outputPath) {
    try {
        const input = await readFile(inputPath, 'utf-8');

        const jsObjectString = convertToJsObject(input);
        await writeFile(outputPath, jsObjectString);

        console.log(`File successfully converted and saved to ${outputPath}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

const FILENAME = 'programmingJS';
const inputPath = `../data/${FILENAME}.md`;
const outputPath = `../data/${FILENAME}.js`;

processFile(inputPath, outputPath);