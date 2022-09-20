require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let url = `https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=DMOAPCNG&aggregates=pageviews&field_grouping=pathname&date_from=2022-08-01 00:00:00&sort_by=pageviews:desc&limit=10&filters=[{"property":"referrer_hostname","operator":"is not","value":"localhost"},{"property":"pathname","operator":"is like","value":"/posts"},{"property":"pathname","operator":"is not","value":"/posts/"},{"property":"pathname","operator":"is not","value":"/posts/1/"},{"property":"pathname","operator":"is not","value":"/posts/2/"},{"property":"pathname","operator":"is not","value":"/posts/3/"},{"property":"pathname","operator":"is not","value":"/posts/4/"},{"property":"pathname","operator":"is not","value":"/posts/5/"},{"property":"pathname","operator":"is not","value":"/posts/6/"},{"property":"pathname","operator":"is not","value":"/posts/7/"},{"property":"pathname","operator":"is not","value":"/posts/8/"},{"property":"pathname","operator":"is not","value":"/posts/9/"},{"property":"pathname","operator":"is not","value":"/posts/notes/"},{"property":"pathname","operator":"is not","value":"/posts/essays/"},{"property":"pathname","operator":"is not","value":"/posts/lists/"}]`;
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
