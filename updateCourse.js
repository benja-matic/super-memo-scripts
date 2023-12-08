import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import jsdom from 'jsdom';
import path from 'path';
import { getCourse } from "./helpers/course.js";
import config from "./helpers/import_env.js";
config();

// DONT FORGET TO UPDATE
const env_prefix = "";
const userId = process.env?.[`${env_prefix}USER_ID`];
const courseId = process.env?.[`${env_prefix}COURSE_ID`];
const token = process.env?.[`${env_prefix}SUPER_MEMO_TOKEN`];
const USE_CACHE = false;

const COURSE_FILENAME = "./data/geogussr/courses/GeoImages.json";
const MAP_FILENAME = "./data/geogussr/map_images/cache/poles.json";
const BASE_URL = 'https://public.fotki.com/GeogussrLearning/geohints-poles-map-/?show=all';

const updateCourse = async (userId, courseId, token, courseName) => {
    const course = await getCourse(userId, courseId, token, courseName, USE_CACHE);

    const filePath = path.resolve(`${courseName}`);
    const mapFilePath = path.resolve(`${MAP_FILENAME}`);
    writeFileSync(filePath, JSON.stringify(course, null, 4));

    const updateList = await getMapImageUrlAndTitles(BASE_URL, mapFilePath);
    writeFileSync(mapFilePath, JSON.stringify(updateList, null, 4));

    for (const card of course) {
        const pageId = card.number;
        const question = card.content.question;
        const answer = card.content.answer;

        let questionContent = JSON.parse(question)?.content;
        let answerContent = JSON.parse(answer)?.content;

        // questionObj.content.includes('Sources/Signs/Pedestrian')

        const foundUpdate = updateList.find(update => answerContent.includes(update[0]));

        if (foundUpdate) {
            const mapUrl = foundUpdate[1];

            // console.log(mapUrl);
            // console.log(questionContent);
            answerContent += `<a href="${mapUrl}" target="_blank"><img src="${mapUrl}" style="max-height:450px;display:block;margin:auto;" alt="${foundUpdate[0]}" /></a>`;

            console.log(answerContent);
            await updateCard({
                userId,
                courseId,
                pageId,
                questionContent,
                answerContent,
                token
            });
        }
        // if (questionObj.content.includes('Sources/Signs/Pedestrian')
        //     && (questionObj.content.includes('guam') || questionObj.content.includes('guatemala.svg'))
        // ) {
        //     let questionContent = questionObj.content;
        //     let answerContent = JSON.parse(answer).content;
        //     console.log(questionObj.content);
        //     await updateCard({
        //         userId,
        //         courseId,
        //         pageId,
        //         questionContent,
        //         answerContent,
        //         token
        //     });
        // }

        // if (questionObj.content.includes('Sources/Signs/Pedestrian') &&
        //     !questionObj.content.includes('style="max-height:450px;min-width:350px;margin:auto;"')
        // ) {
        //     const imgRegex = /(\<img[^>]+src="[^"]+")/g;

        //     questionObj.content = questionObj.content.replace(
        //         imgRegex,
        //         `$1 style="max-height:450px;min-width:350px;margin:auto;"`
        //     );

        //     // Serialize the object back to a JSON string
        //     let questionContent = questionObj.content;
        //     let answerContent = JSON.parse(answer).content;
        //     console.log(questionContent);


        //     // Uncomment the following to perform the update
        //     // await updateCard({
        //     //     userId,
        //     //     courseId,
        //     //     pageId,
        //     //     questionContent,
        //     //     answerContent,
        //     //     token
        //     // });
        // }
    }

};

const updateCard = async ({
    userId,
    courseId,
    pageId,
    questionContent,
    answerContent,
    token,
}) => {
    const cardUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages/${pageId}`;

    const questionObject = JSON.stringify({ content: questionContent });
    const answerObject = JSON.stringify({ content: answerContent });

    // Construct the payload
    const payload = {
        question: questionObject,
        answer: answerObject
    };
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.put(`${cardUrl}?contentType=json`, payload, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating card:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        throw error;
    }
};

async function getMapImageUrlAndTitles(url, mapFilePath) {
    try {
        const fetchedData = readFileSync(mapFilePath);
        if (fetchedData) return JSON.parse(fetchedData);
    } catch (readError) {
        // If the file does not exist, proceed to fetch from the API
        if (readError.code !== 'ENOENT') {
            throw readError; // Rethrow error if it's not 'File not found'
        }
    }
    try {

        const { JSDOM } = jsdom;
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Select all <a> tags with a title attribute
        const aTagsWithTitle = document.querySelectorAll('a[title]');

        // Extract the title and src attribute of all <img> tags within those <a> tags
        const titlesAndSources = Array.from(aTagsWithTitle).map(aTag => {
            const imgTag = aTag.querySelector('img');
            return imgTag ? [aTag.title, imgTag.src] : null;
        }).filter(item => item !== null); // Filter out any null values

        return titlesAndSources;
    } catch (error) {
        console.error('Error occurred while fetching titles and image sources:', error);
        return [];
    }
}


updateCourse(userId, courseId, token, COURSE_FILENAME).then(() => {
    console.log("done");
});