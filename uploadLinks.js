import axios from 'axios';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { config } from 'dotenv';
config({ path: `${__dirname}/.env` });

console.log(process.env.USER_ID);
const URL_ROUTE = "numbersMnemonics.js"; // DONT FORGET TO UPDATE
const env_prefix = "";
const userId = process.env?.[`${env_prefix}USER_ID`];

const courseId = process.env?.[`${env_prefix}COURSE_ID`]; // DONT FORGET TO UPDATE
const targetParentNumber = process.env?.[`${env_prefix}TARGET_PARENT_NUMBER`]; // DONT FORGET TO UPDATE

const token = process.env?.[`${env_prefix}SUPER_MEMO_TOKEN`];

async function readDataFromFile() {
    try {
        if (URL_ROUTE.includes("json")) {
            const data = await readFile(`./data/${URL_ROUTE}`, 'utf-8'); //./data/
            return JSON.parse(data);
        }
        const module = await import(`./data/${URL_ROUTE}`);
        return module.default;

    } catch (err) {
        console.log(err);
        return [];
    }
}

const run = async () => {

    const cards = await readDataFromFile();
    shuffle(cards); // possibly a better way to separate reoccuring values could be needed
    const jsdom = await import('jsdom');
    const { JSDOM } = jsdom;

    // console.log(...cards.map((data) => {
    //     const dom = new JSDOM(data.answer);
    //     const document = dom.window.document;
    //     return document.querySelector('a').textContent.trim() + "\n";
    // }));
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

    try {

        const response = await axios.post(newCardUrl, json, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return "";
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