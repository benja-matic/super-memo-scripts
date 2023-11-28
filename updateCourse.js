import axios from 'axios';
import { writeFileSync } from 'fs';
import path from 'path';
import { getCourse } from "./helpers/course.js";
import config from "./helpers/import_env.js";

config();

// DONT FORGET TO UPDATE
const env_prefix = "";
const userId = process.env?.[`${env_prefix}USER_ID`];
const courseId = process.env?.[`${env_prefix}COURSE_ID`];
const token = process.env?.[`${env_prefix}SUPER_MEMO_TOKEN`];
const USE_CACHE = true;

const COURSE_FILENAME = "./data/geogussr/courses/GeoImages.json";

const updateCourse = async (userId, courseId, token, courseName) => {
    const course = await getCourse(userId, courseId, token, courseName, USE_CACHE);

    const filePath = path.resolve(`${courseName}`);
    writeFileSync(filePath, JSON.stringify(course, null, 4));

    for (const card of course) {
        const pageId = card.number;
        const question = card.content.question;
        const answer = card.content.answer;

        let questionObj = JSON.parse(question);


        const updateList = [
        ];
        // questionObj.content.includes('Sources/Signs/Pedestrian')
        if (
            // questionObj.content.includes('Pedestrian') &&
            (updateList.some(update => questionObj.content.includes(update)))
        ) {
            let questionContent = questionObj.content;
            let answerContent = JSON.parse(answer).content;
            console.log(questionObj.content);
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

updateCourse(userId, courseId, token, COURSE_FILENAME).then(() => {
    console.log("done");
});