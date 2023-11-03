
import { readFile } from 'fs/promises';

export async function readFile(filename) {
    try {
        if (filename.includes("json")) {
            const data = await readFile(`./data/${filename}`, 'utf-8');
            return JSON.parse(data);
        }
        const module = await import(`./data/${filename}`);
        return module.default;
    } catch (err) {
        return [];
    }
}