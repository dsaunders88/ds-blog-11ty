// require("dotenv").config();
// const EleventyFetch = require("@11ty/eleventy-fetch");

// module.exports = async function () {
//   const airtableToken = process.env.AIRTABLE_ACCESS_TOKEN;
//   const baseId = process.env.AIRTABLE_BASE_ID;
//   const tableId = "tblr6UI7PA9ETQlOg"; // Reading activity

//   let url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

//   const params = new URLSearchParams([
//     ["returnFieldsByFieldId", "true"],
//     ["view", "viwo1vSF2U6Xi3taY"],
//     ["fields", "fldKlpKfwoCqCJbVM"], // title
//     ["fields", "fldC7XcQ4urRb4fQV"], // authors
//     ["fields", "fldpzGGsP5bR1hUAW"], // feed date
//     // ["fields", "fldEtqJkG0cSKP8dK"], // cover
//     ["fields", "fld1sg0p9VvabKQDP"], // time read
//     ["fields", "fld9dnT2caLS69tcb"], // url
//   ]);

//   // const data = await EleventyFetch(`${url}?${params.toString()}`, {
//   //   duration: "1s",
//   //   type: "json",
//   //   fetchOptions: {
//   //     headers: {
//   //       authorization: `Bearer ${airtableToken}`,
//   //     },
//   //   },
//   // });
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${airtableToken}`);
//   const data = await EleventyFetch(`${url}?${params.toString()}`, {
//     duration: "1s",
//     type: "json",
//     fetchOptions: {
//       headers: {
//         authorization: `Bearer ${airtableToken}`,
//       },
//     },
//   });

//   if (!data.ok) {
//     console.log("Error fetching Airtable book data.");
//   }
//   return data.records;
// };
