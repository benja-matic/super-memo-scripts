import axios from 'axios';
import path from 'path';

import { readFileSync } from 'fs';

export const getCourse = async (userId, courseId, token, courseName, useCache = false) => {
    const classUrl = `https://learn.supermemo.com/api/users/${userId}/courses/${courseId}/pages?limit=10000&lt=0&rt=10000`;
    const filePath = path.resolve(`${courseName}`);


    try {
        // Check if the file exists and read it
        if (useCache) {
            try {
                const fetchedData = readFileSync(filePath);
                if (fetchedData) return JSON.parse(fetchedData);
            } catch (readError) {
                // If the file does not exist, proceed to fetch from the API
                if (readError.code !== 'ENOENT') {
                    throw readError; // Rethrow error if it's not 'File not found'
                }
            }
        }

        // Fetch data from the API if not found locally
        const response = await axios.get(classUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
    return {};
};