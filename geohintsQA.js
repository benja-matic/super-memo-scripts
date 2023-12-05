import axios from 'axios';
import { writeFile } from 'fs/promises';
import { fetchLatLonFromShortUrl } from "./helpers/googleMapApi.js";

import { config } from 'dotenv';
config();

const BASE_URL = "http://www.geohints.com/";
const URL_ROUTE = "Street"; // DONT FORGET TO UPDATE


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getGoogleLocation = async (url) => {
    const [lat, lon] = await fetchLatLonFromShortUrl(url);

    if (!lat || !lon) {
        return "";
    }

    // Use Geocoding API to fetch details
    const GEOCODING_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;

    try {
        const geoResponse = await axios.get(GEOCODING_URL);
        // Parse the response to extract city and state
        const details = geoResponse.data.results[0].address_components;
        const city = details.find(comp => comp.types.includes("locality"));
        const sublocality = details.find(comp => comp.types.includes("sublocality"));
        const sublocality_level1 = details.find(comp => comp.types.includes("sublocality_level1"));


        const locality = city ?? sublocality ?? sublocality_level1;
        const state = details.find(comp => comp.types.includes("administrative_area_level_1"));

        const state2 = details.find(comp => comp.types.includes("administrative_area_level_2"));
        const state3 = details.find(comp => comp.types.includes("administrative_area_level_3"));
        const stateDetails = `${state2 && state2?.long_name != locality?.long_name ? state2?.long_name + ", " : ""}${state3 && state3?.long_name != locality?.long_name && state3?.long_name != state2?.long_name ? state3?.long_name : ""}`;
        return `${locality ? (locality?.long_name ?? "") + ", " : ""}${(state?.long_name ?? "") + ": "}${stateDetails ?? ""}`;
    } catch (error) {
        console.error(error);
        return "";
    }
};


const run = async () => {
    const response = await axios.get(`${BASE_URL}${URL_ROUTE}`);

    const jsdom = await import('jsdom');
    const { JSDOM } = jsdom;
    const options = {
        resources: "usable", // This will allow JSDOM to load external resources.
        runScripts: "dangerously" // Be cautious with this as it will run scripts inside the JSDOM environment.
    };

    const dom = new JSDOM(response.data); // TODO add options to get image height
    console.log(`${BASE_URL}${URL_ROUTE}`);
    const document = dom.window.document;
    const continents = document.body.querySelectorAll("div.section");
    // const continents = document.querySelectorAll("body");
    const cards = [];

    for (const continent of Array.from(continents)) {
        const bollards = continent.querySelectorAll("div.inside > div.bollard");
        // const bollards = continent.querySelectorAll("div.bollard");
        // const bollards = continent.querySelectorAll("div");
        for (const bollard of Array.from(bollards)) {
            const imageElem = bollard.querySelector(`img`);
            const imgSrc = imageElem?.getAttribute("src");


            const country = bollard.querySelector("p.country").textContent.replace(/[^\x00-\x7F]/g, "").trim();
            const aElement = bollard.querySelector("p.country > a.gps");
            const href = bollard.querySelector("p.country > a.gps")?.getAttribute("href");
            if (!imgSrc) {
                console.log(bollard.querySelector(`img`));
                console.log(bollard.querySelector(`img`).getAttribute("class"));
            }
            const imgAlt = imageElem?.getAttribute("alt")?.replace("Sources/Signs/Numbers/", "").replace("http://www.geohints.com/", "").replace(`Sources/${URL_ROUTE}/`, "") ?? imgSrc.replace(`Sources/${URL_ROUTE}/`, "");
            console.log(imgAlt);

            const itallicText = bollard.querySelector(`i`)?.textContent ? `name: ${bollard.querySelector(`i`)?.textContent}` : "";

            const imageHeight = 0; // TODO implement getImageHeight(imageElem);
            const imageStyle = (imageHeight ?? 0) < 450 ? "max-height:450px;min-width:350px;display:block;margin:auto;" : "max-height:450px;display:block;margin:auto;";
            const imageTagHTML = `<a href="${BASE_URL}${imgSrc}" target="_blank"><img src="${BASE_URL}${imgSrc}" style="${imageStyle}" alt="${imgAlt}" /></a>`;

            // const googleLocation = "";
            const googleLocation = await getGoogleLocation(href);

            aElement.removeAttribute("style"); // remove all inline styles
            aElement.textContent = aElement.textContent.replace("🌍", country); // replace globe emoji with country
            aElement.style.fontWeight = 'bold'; // make the text bold
            aElement.style.textDecoration = 'none'; // remove the underline
            aElement.style.color = 'black'; // make link text black 

            const answer = aElement.outerHTML + " - " + googleLocation + itallicText;
            cards.push({ question: imageTagHTML, answer });
        };

    };
    // write the cards array to file 

    await writeFile(`./data/geogussr/${URL_ROUTE}.json`, JSON.stringify(cards, null, 2));
};

run().then(() => {
    console.log("done");
}).catch((error) => {
    console.error(error);
});