require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const { DateTime } = require("luxon");

function threeMonthsAgo() {
  const now = DateTime.now();
  const date = now.minus({ months: 3 }).toISODate();
  return date;
}

module.exports = async function () {
  let url = `https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=DMOAPCNG&aggregates=pageviews&field_grouping=pathname&date_from=${threeMonthsAgo()}&sort_by=pageviews:desc&limit=10&timezone=America/Los_Angeles&filters=[{"property":"referrer_hostname","operator":"is not","value":"localhost"},{"property":"pathname","operator":"is like","value":"/posts"},{"property":"pathname","operator":"is not","value":"/posts/"},{"property":"pathname","operator":"is not","value":"/posts/1/"},{"property":"pathname","operator":"is not","value":"/posts/2/"},{"property":"pathname","operator":"is not","value":"/posts/3/"},{"property":"pathname","operator":"is not","value":"/posts/4/"},{"property":"pathname","operator":"is not","value":"/posts/5/"},{"property":"pathname","operator":"is not","value":"/posts/6/"},{"property":"pathname","operator":"is not","value":"/posts/7/"},{"property":"pathname","operator":"is not","value":"/posts/8/"},{"property":"pathname","operator":"is not","value":"/posts/9/"},{"property":"pathname","operator":"is not","value":"/posts/notes/"},{"property":"pathname","operator":"is not","value":"/posts/essays/"},{"property":"pathname","operator":"is not","value":"/posts/lists/"}]`;
  let fathomToken = process.env.FATHOM_API_TOKEN;

  return EleventyFetch(url, {
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: {
        authorization: `Bearer ${fathomToken}`,
      },
    },
  });
};
