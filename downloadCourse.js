import axios from 'axios';
import { config } from 'dotenv';
import fs, { readFileSync } from 'fs';
import path from 'path';
config({ path: './.env' });

const FILENAME = "Geogussr"; // DONT FORGET TO UPDATE
const env_prefix = "";
const userId = process.env?.[`${env_prefix}USER_ID`];

const courseId = process.env?.[`${env_prefix}COURSE_ID`]; // DONT FORGET TO UPDATE

const token = process.env?.[`${env_prefix}SUPER_MEMO_TOKEN`];

async function download(userId, courseId, token, filename) {
    const course = await getCourse(userId, courseId, token);
    // console.log(course);

    const questionJsonString = course.map((qa) => {
        return JSON.parse(qa.content.question).content;
    });


    // question: '{"content":"<a href=\\"http://www.geohints.com/Sources/Signs/Numbers/estonia_4.jpg\\" target=\\"_blank\\"><img src=\\"http://www.geohints.com/Sources/Signs/Numbers/estonia_4.jpg\\" alt=\\"estonia_4.jpg\\" /></a>"}'

    // loop through all files Poles.json, RoadNumbering.json, Bollards.json
    const files = ["Poles", "RoadNumbering", "Bollards"];
    const missing = [];

    for (const file of files) {
        const filePath = `./data/${file}.json`;
        const contents = readFileSync(filePath);
        for (const content of JSON.parse(contents)) {
            const exists = questionJsonString.some((str) => str == content.question);
            if (!exists) missing.push(content);
        }
    }

    console.log(missing.length);

    const filePath = `./data/${filename}.json`;
    fs.writeFileSync(filePath, JSON.stringify(missing, null, 4));
}

const getCourse = async (userId, courseId, token) => {
    const classUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages?limit=10000&lt=0&rt=10000`;
    const filePath = path.resolve("./data/course.json");

    try {
        // Check if the file exists and read it
        try {
            const fetchedData = readFileSync(filePath);
            if (fetchedData) return JSON.parse(fetchedData);
        } catch (readError) {
            // If the file does not exist, proceed to fetch from the API
            if (readError.code !== 'ENOENT') {
                throw readError; // Rethrow error if it's not 'File not found'
            }
        }

        // Fetch data from the API if not found locally
        const response = await axios.get(classUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Write data to the file
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 4));

        return response.data;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    return {};
};

download(userId, courseId, token, FILENAME).then(() => {
    console.log("done");
});