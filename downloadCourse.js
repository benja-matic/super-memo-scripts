
import fs, { readFileSync } from 'fs';
import { getCourse } from "./helpers/course.js";

import config from "./helpers/import_env.js";
config();

const FILENAME = "Geogussr"; // DONT FORGET TO UPDATE
const env_prefix = "";
const userId = process.env?.[`${env_prefix}USER_ID`];

const courseId = process.env?.[`${env_prefix}COURSE_ID`]; // DONT FORGET TO UPDATE

const token = process.env?.[`${env_prefix}SUPER_MEMO_TOKEN`];

async function download(userId, courseId, token, filename) {
    const course = await getCourse(userId, courseId, token);
    // Write data to the file
    const filePath = path.resolve("./helpers/course.json");
    fs.writeFileSync(filePath, JSON.stringify(course, null, 4));
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

    fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(missing, null, 4));
}


download(userId, courseId, token, FILENAME).then(() => {
    console.log("done");
});