const axios = require('axios')

const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
require('dotenv').config();

const API_KEY = process.env.NASA_API_KEY;

/**
 * Fetches Near-Earth Objects from NASA based on a date range.
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {Promise<object>} - NASA NeoWs API response
 */

async function getNeoFeed(startDate, endDate) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                start_date: startDate,
                end_date: endDate,
                api_key: API_KEY,
            },
        });

        return response.data;
    }
    catch (error) {
        console.error('Error fetching Neows feed: ', error.message);
        throw new Error('Failed to fetch asteroid data from NASA');
    }
}

async function getNeoLookup(asteroid_id) {
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}`, {
            params: {
                api_key: API_KEY,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching NeoWs LookUp: ', error.message);
        throw new Error('Failed to fetch asteroid lookup data from NASA')
    }
}

module.exports = {
    getNeoFeed,
    getNeoLookup,
}