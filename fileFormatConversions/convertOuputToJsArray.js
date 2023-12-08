import { readFile, writeFile } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const inputFilePath = join(currentDir, '../data', 'numbersMnemonics.txt');
const outputFilePath = join(currentDir, '../data', 'numbersMnemonics.js');

const QA_DELIMITER = " - ";
const CARD_DELIMITER = "\n";
// Read the file
readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the data into cards
    const cards = data.split(CARD_DELIMITER);

    // Map each line to an object
    const mnemonics = cards.map(card => {
        const [number, description] = card.split(QA_DELIMITER);
        return {
            question: number.trim(),
            answer: description.trim()
        };
    });

    // Convert the object to a string and format it for JS
    const jsContent = `export default ${JSON.stringify(mnemonics, null, 2)};`;

    // Write the JS file
    writeFile(outputFilePath, jsContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('File has been saved.');
    });
});