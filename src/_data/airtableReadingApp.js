require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const airtableToken = process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = "tblr6UI7PA9ETQlOg"; // Reading activity

  let url = `https://api.airtable.com/v0/${baseId}/${tableId}?fields%5B%5D=Date+Started&fields%5B%5D=Full+Title+(from+Book)&fields%5B%5D=Percent+Read&fields%5B%5D=Full+Name+(from+Author(s))+(from+Book)&fields%5B%5D=Cover+(from+Book)&fields%5B%5D=Time+Read+(Weeks)&fields%5B%5D=Date+Started&fields%5B%5D=Open+Library+URL+(from+Book)&sort%5B0%5D%5Bfield%5D=Date+Started&sort%5B0%5D%5Bdirection%5D=desc&view=Currently+Reading`;

  const data = await EleventyFetch(url, {
    duration: "1m",
    type: "json",
    fetchOptions: {
      headers: {
        authorization: `Bearer ${airtableToken}`,
      },
    },
  });

  return data.records;
};
