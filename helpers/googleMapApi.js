
import axios from 'axios';

export const fetchLatLonFromShortUrl = async url => {
    let response = {};
    try {
        response = await axios.get(url);
    } catch (error) {
        console.log(error);
        return ["", ""];
    }
    const redirectUrl = response.request.res.responseUrl;

    // Extract lat and lon from fullUrl
    const coords = /@([-\d.]+),([-\d.]+)/.exec(redirectUrl);

    if (!coords) {
        return ["", ""];
    }
    const lat = coords[1];
    const lon = coords[2];
    return [lat, lon];
};