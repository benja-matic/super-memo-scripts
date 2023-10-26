import axios from 'axios';

import { config } from 'dotenv';
import { readFile } from 'fs/promises';
config();
const URL_ROUTE = "Bollards"; // DONT FORGET TO UPDATE
const userId = 2735855;

const courseId = 112143; // DONT FORGET TO UPDATE
const targetParentNumber = 559108968; // DONT FORGET TO UPDATE

const token = process.env.SUPER_MEMO_TOKEN;

async function readSkipCountriesFromFile() {
    try {
        const data = await readFile(`./data/${URL_ROUTE}.json`, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const run = async () => {

    const cards = await readSkipCountriesFromFile();
    shuffle(cards); // possibly a better way to separate reoccuring values could be needed
    const jsdom = await import('jsdom');
    const { JSDOM } = jsdom;

    console.log(...cards.map((data) => {
        const dom = new JSDOM(data.answer);
        const document = dom.window.document;
        return document.querySelector('a').textContent.trim() + "\n";
    }));
    const newCardUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages?contentType=json&targetParentNumber=${targetParentNumber}`;

    console.log(newCardUrl);
    console.log("number of cards", cards.length);
    for (const card of cards) {
        const response = await postNewCard(newCardUrl, card.question, card.answer);
        console.log(response);
    }
};

const postNewCard = async (newCardUrl, question, answer) => {


    const questionObject = {
        content: question
    };

    const answerObject = {
        content: answer
    };

    const json = {
        question: JSON.stringify(questionObject),
        answer: JSON.stringify(answerObject)
    };

    const response = await axios.post(newCardUrl, json, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

run().then(() => {
    console.log("done");
});


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}