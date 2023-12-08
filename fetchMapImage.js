import axios from 'axios';
import fs from 'fs/promises';
import jsdom from 'jsdom';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { fetchLatLonFromShortUrl } from './helpers/googleMapApi.js';
import config from "./helpers/import_env.js";
config();



async function extractLatLon(url) {
    if (url.includes('@')) {
        const regex = /@([-\d.]+),([-\d.]+)/;
        const match = url.match(regex);
        if (match) {
            const lat = parseFloat(match[1]);
            const lon = parseFloat(match[2]);
            return [lat, lon, `${lat}-${lon}`];
        } else {
            return ['', '', ''];
        }
    } else {
        const [lat, lon] = await fetchLatLonFromShortUrl(url);
        const shortUrlPart = url.split('/').pop();
        return [lat, lon, shortUrlPart];
    }
}

async function downloadImage(url, filepath) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const fullPath = path.resolve(filepath);
        await fs.writeFile(fullPath, response.data);

        console.log(`Image saved to ${fullPath}`);
    } catch (error) {
        console.error('Error occurred while downloading the image:', error);
    }
}

function extractUrlsFromJson(jsonData) {
    return jsonData.map(item => {
        const urlMatch = item.answer.match(/href=\"(https[^\"]+)\"/);
        return urlMatch ? urlMatch[1] : null;
    }).filter(url => url !== null);
}


async function main() {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const mapType = 'hybrid';
    const defaultZoomLevel = 6; // Adjust as needed
    const baseSavePath = 'data/geogussr/map_images/poles';

    // Read JSON data
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const jsonPath = path.join(__dirname, 'data/geogussr/Poles.json');
    const jsonRaw = await fs.readFile(jsonPath, 'utf8');
    const jsonData = JSON.parse(jsonRaw);

    // Extract URLs
    const urls = extractUrlsFromJson(jsonData);

    const smallCountriesAndTerritories = [
        "Vatican City", "Monaco", "Nauru", "Tuvalu", "San Marino",
        "Liechtenstein", "Marshall Islands", "Saint Kitts and Nevis",
        "Maldives", "Malta", "Grenada", "Saint Vincent and the Grenadines",
        "Barbados", "Antigua and Barbuda", "Seychelles", "Palau",
        "Andorra", "Saint Lucia", "Singapore", "Micronesia",
        "Tonga", "Dominica", "Bahrain", "Kiribati", "Sao Tome and Principe",
        "Samoa", "Luxembourg", "Comoros", "Mauritius", "Cabo Verde",
        "Trinidad and Tobago", "Brunei", "Cyprus", "Lebanon",
        "Jamaica", "The Gambia", "Qatar", "Vanuatu",
        "Montenegro", "Bahamas", "Timor-Leste", "Eswatini",
        "Kuwait", "Fiji", "Slovenia", "Israel",
        "El Salvador", "Belize", "Djibouti", "North Macedonia",
        "Rwanda", "Armenia", "Burundi", "Equatorial Guinea",
        "Albania", "Solomon Islands", "Lesotho", "Belize",
        "Bhutan", "Moldova", "Eritrea", "Guinea-Bissau",
        "Latvia", "Bahrain", "East Timor", "US Virgin Islands",
        "Guam", "Gibraltar", "American Samoa", "Northern Mariana Islands",
        "Puerto Rico", "Guernsey", "Jersey", "Isle of Man",
        "Faroe Islands", "Cayman Islands", "Bermuda",
        "Turks and Caicos Islands", "British Virgin Islands", "Anguilla",
        "Montserrat", "Pitcairn Islands", "Falkland Islands",
        "Norfolk Island", "Cook Islands", "Niue", "Tokelau",
        "Wallis and Futuna", "French Polynesia", "New Caledonia",
        "Saint Helena, Ascension and Tristan da Cunha", "Svalbard and Jan Mayen",
        "Mayotte", "Saint Pierre and Miquelon", "Saint Barthélemy",
        "Saint Martin", "Sint Maarten", "Bonaire, Sint Eustatius and Saba",
        "Christmas Island", "Cocos", "Macau", "Hong Kong"
    ];


    const tinyCountries = [
        "San Marino",
        "Liechtenstein", "Malta",
        "Andorra", "Micronesia",
        "Luxembourg",
        "Guam", "American Samoa", "Northern Mariana Islands",
        "Guernsey", "Jersey", "Isle of Man",
        "Bermuda",
        "Singapore",
        "Christmas Island", "Cocos", "Macau", "Hong Kong"
    ];

    // Process each URL
    for (const [index, url] of urls.entries()) {

        const country = extractTextFromHtmlATag(jsonData[index].answer);
        const isSmallCountry = smallCountriesAndTerritories.some(smallCountry => country.toLowerCase().includes(smallCountry.toLowerCase()));
        const isTinyCountry = tinyCountries.some(tiny => country.toLowerCase().includes(tiny.toLowerCase()));
        const [latitude, longitude, filenamePart] = await extractLatLon(url);

        const zoomLevel = isTinyCountry ? 12 : (isSmallCountry ? 8 : defaultZoomLevel);

        console.log(country, zoomLevel);
        const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoomLevel}&size=350x450&maptype=${mapType}&markers=color:red%7Clabel:C%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
        const savePath = path.join(baseSavePath, `${filenamePart}.jpg`);
        await downloadImage(mapURL, savePath);
    }
}


function extractTextFromHtmlATag(htmlString) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;
    const aTag = document.querySelector('a');
    return aTag ? aTag.textContent : '';
}

main().then(() => {
    console.log("done");
}).catch(console.error);
