import fs from 'fs';

// Global constant for the filename
const FILENAME = 'ThinkingFastAndSlow';

function convertToFlashcardFormat(input) {
    const flashcards = [];
    let potentialCards = input.split(/\n---\n/).filter(Boolean);

    // Further segment any large blocks by '**Flashcard n**:'
    potentialCards = potentialCards.flatMap(card => card.split(/\*\*Flashcard \d+\*\*:/).filter(Boolean));

    for (let card of potentialCards) {
        // Skip content that starts with chapter headings like '6. **Flashcard Designs ...'
        if (/^\d+\.\s*\*\*/.test(card)) continue;

        const frontMatch = /\*\*Front\*\*:\s*([\s\S]+?)(?=\*\*Back\*\*|\*\*Question\*\*|$)/.exec(card);
        const questionMatch = /\*\*Question\*\*:\s*([\s\S]+?)(?=\*\*Back\*\*|$)/.exec(card);
        const backMatch = /\*\*Back\*\*:\s*([\s\S]+?)(?=\*\*Front\*\*|\*\*Question\*\*|$)/.exec(card);

        let frontContent = frontMatch ? replaceAsterisksWithBoldTags(frontMatch[1].trim()) : '';
        let questionContent = questionMatch ? replaceAsterisksWithBoldTags(questionMatch[1].trim()) : '';
        let backContent = backMatch ? replaceAsterisksWithBoldTags(backMatch[1].trim()) : '';

        if ((frontContent || questionContent) && backContent) {
            let question = frontContent ? frontContent + ' ' : '';
            question += questionContent || '';
            let answer = backContent;

            flashcards.push({ question, answer });
        }
    }

    return flashcards;
}

// Read content from the .txt file
const rawContent = fs.readFileSync(`./data/${FILENAME}.txt`, 'utf-8').replace(/\n\n---\s*$/, '');

const converted = convertToFlashcardFormat(rawContent);

// Ensure the data directory exists
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Write to .json file
const filePath = `./data/${FILENAME}.json`;
fs.writeFileSync(filePath, JSON.stringify(converted, null, 4));

console.log(`Flashcards saved to ${filePath}`);


function replaceAsterisksWithBoldTags(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
}
