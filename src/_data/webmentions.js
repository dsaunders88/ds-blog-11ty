require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'

module.exports = async function () {
    const domain = 'daniel-saunders.com';
    const token = process.env.WEBMENTION_API_TOKEN;

    let perPage = 10000;
    let url = `${API_ORIGIN}?domain=${domain}&token=${token}&per-page=${perPage}`;

    const response = await EleventyFetch(url, {
        duration: "1d",
        type: "json"
    })

    const feed = response.children
    console.log(feed)
    return feed
}