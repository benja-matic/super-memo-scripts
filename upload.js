
import { answers } from "./answers.js";

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzM1ODU1IiwiZmlyc3ROYW1lIjoiIiwicGVybWlzc2lvbnMiOltdLCJpc3MiOiJTdXBlck1lbW8tcHJvZCIsImF1dGhUeXBlIjoidW5rbm93biIsImV4cCI6MTY5NzgyMTMyMiwiaWF0IjoxNjk3MjE2NTIyLCJlbWFpbCI6InByaW5jZW9mZXhjZXNzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicHJpbmNlb2ZleGNlc3NAZ21haWwuY29tIn0.jjzVJGY3V3fX-08GPiYSwKO-F3-dwSezK5Q19oWbE9s`;
const userId = 2735855;
const courseId = 112399;
const fullPath = "/Users/maciek/Downloads/Bollards/New/";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function process(answer, newCardUrl, userId, courseId, file, filename) {

    console.log(answer, filename);
    const response = await postNewCard(newCardUrl, filename, answer);

    // console.log(response);
    const { pageNumber } = response?.data ?? {};
    if (!pageNumber) {
        console.log("error could not get page number");
        return;
    }
    const fileId = `${pageNumber}a`;
    const fileRes = await uploadFile(userId, courseId, pageNumber, file, filename, fileId);
    // console.log(fileRes);

    // const pageNumber = '854584068';
    const updateCardUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages/${pageNumber}?contentType=json`;
    const responsePut = await putCardFile(updateCardUrl, filename, "", answer, pageNumber);
    // console.log(responsePut);

    // await sleep(500);
}

const postNewCard = async (newCardUrl, question, answer) => {
    const json = {
        question: `{"content": "${question}"}`,
        answer: `{"content": "${answer}"}`
    };

    const response = await axios.post(newCardUrl, json, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

const putCardFile = async (cardUrl, filename, question, answer, _pageNumber) => {

    const questionObject = {
        content: question,
        media: [{
            fileName: filename,
            contentType: "IMAGE",
            fileId: "a"
        }]
    };
    const answerObject = {
        content: answer,
        media: []
    };

    // Convert the JavaScript objects into a JSON string
    const json = {
        question: JSON.stringify(questionObject),
        answer: JSON.stringify(answerObject)
    };

    const response = await axios.put(cardUrl, json, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

async function uploadFile(userId, courseId, pageNumber, file, filename, fileId) {
    const fileUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages/${pageNumber}/files`;

    const form = new FormData();
    form.append('fileId', fileId);
    form.append('file', file, { filename });

    try {
        const response = axios.put(fileUrl, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    return {};
}

const upload = async (courseId, folderFullPath) => {
    const files = fs.readdirSync(folderFullPath);

    const newCardUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages?contentType=json&targetParentNumber=60158050`;

    const remaining = [];
    const sorted = files.sort((a, b) => {
        return (+a.match(/\d+/g)) - (+b.match(/\d+/g));
    });

    for (const filename of sorted) { // make sure all files have answers
        if (filename === ".DS_Store") continue;
        getAnswer(filename);
    }

    const minIndexes = {};
    let curr = 1;

    for (const filename of sorted) {
        if (filename === ".DS_Store") continue;

        remaining.sort((a, b) => {
            const answerA = getAnswer(a);
            const minIndexA = minIndexes[answerA];
            const answerB = getAnswer(b);
            const minIndexB = minIndexes[answerB];

            return minIndexA - minIndexB;
        });

        for (const [i, filename] of remaining.entries()) {
            if (filename == undefined) continue;

            const answer = getAnswer(filename);
            const minIndex = minIndexes[answer];
            if (curr > minIndex) {
                const filePath = path.join(folderFullPath, filename);
                const file = fs.readFileSync(filePath);
                await process(answer, newCardUrl, userId, courseId, file, filename);
                minIndexes[answer] = curr + 3;
                curr++;
                delete remaining[i];
            }
        }

        const answer = getAnswer(filename);
        // TODO write answer to file so you can double check your uploads
        if (skip(minIndexes, curr, answer, remaining, filename)) {
            continue;
        }
        const filePath = path.join(folderFullPath, filename);
        const file = fs.readFileSync(filePath);
        curr++;
        await process(answer, newCardUrl, userId, courseId, file, filename);
    }

    console.log("Remaining to process");
    console.log(...remaining.filter(rem => rem != undefined));

};

upload(courseId, fullPath).then();


function skip(minIndexes, curr, answer, remaining, filename) {
    const minIndex = minIndexes[answer] ?? 0;
    if (curr <= minIndex) {
        remaining.push(filename);
        minIndexes[answer] = curr + 3;
        return true;
    }
    minIndexes[answer] = curr + 3;
    return false;
}


function getAnswer(filename) {
    try {
        const filen = filename.split(".")[0].toLowerCase();
        const answer = answers.find(answer => answer.name.toLowerCase() === filen);
        return answer.country;
    } catch (error) {
        console.log("error at", filename);
        throw error;
    }
}