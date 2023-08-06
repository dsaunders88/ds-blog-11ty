const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-toc-done-right");
const sanitizeHTML = require("sanitize-html");

async function imageShortcode(src, alt, sizes = "100vw") {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ["webp", "jpeg"],
    urlPath: "/assets/optimized/",
    outputDir: "./_site/assets/optimized/",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `${Object.values(metadata)
    .map((imageFormat) => {
      return `  <source type="${
        imageFormat[0].sourceType
      }" srcset="${imageFormat
        .map((entry) => entry.srcset)
        .join(", ")}" sizes="${sizes}">`;
    })
    .join("\n")}
		<img
		  src="${lowsrc.url}"
		  width="${highsrc.width}"
		  height="${highsrc.height}"
		  alt="${alt}"
		  loading="lazy"
		  decoding="async">`;
}

async function inlineImageShortcode(src, alt) {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [600, 900, 1200],
    formats: ["webp"],
    urlPath: "/assets/optimized/",
    outputDir: "./_site/assets/optimized/",
  });

  let data = metadata.webp[metadata.webp.length - 1];

  return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

// Eleventy module exports
module.exports = function (eleventyConfig) {
  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlMinTransform);
  }

  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./_redirects");
  eleventyConfig.addPassthroughCopy("./netlify");

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");

  // Custom collections
  eleventyConfig.addCollection("posts", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/**/*.md")];
  });

  eleventyConfig.addCollection("notes", (collection) => {
    return collection.getFilteredByGlob("./src/posts/notes/*.md");
  });

  eleventyConfig.addCollection("essays", (collection) => {
    return collection.getFilteredByGlob("./src/posts/essays/*.md");
  });

  eleventyConfig.addCollection("lists", (collection) => {
    return collection.getFilteredByGlob("./src/posts/lists/*.md");
  });

  eleventyConfig.addCollection("tagList", (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags
        .filter((tag) => !["all", "nav", "posts", "rss"].includes(tag))
        .forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  // Custom filters
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // https://mxb.dev/blog/using-webmentions-on-static-sites/#webmentions
  eleventyConfig.addFilter("getWebmentionsForUrl", function (webmentions, url) {
    // const allowedTypes = ['like-of', 'repost-of']

    // const hasRequiredFields = entry => {
    // 	const { author, published, content } = entry
    // 	return author.name && published && content
    // }

    // const sanitize = entry => {
    // 	const { content } = entry
    // 	if (content['content-type'] === 'text/html') {
    // 		content.value = sanitizeHTML(content.value)
    // 	}
    // 	return entry
    // }

    if (webmentions) {
      const filtered = webmentions.map((entry) => {
        let oldUrl =
          "https://daniel-saunders.com/2021/07/20/tricontinental-conference-and-liberationist-christianity/";
        if (entry["wm-target"].startsWith(oldUrl)) {
          let updatedTarget = entry["wm-target"].replace(
            oldUrl,
            "https://daniel-saunders.com/posts/essays/the-tricontinental-conference-and-latin-american-liberationist-christianity/"
          );
          entry["wm-target"] = updatedTarget;
          entry["like-of"] = updatedTarget;
          return entry;
        } else {
          return entry;
        }
      });

      return filtered.filter((entry) => entry["wm-target"] === url);
      // .filter(entry => allowedTypes.includes(entry['wm-property']))
      // .map(sanitize)
    } else {
      return;
    }
  });

  // Set Luxon date time formatting
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .toUTC()
      .toLocaleString(DateTime.DATE_FULL);
    //.setZone("America/Los_Angeles")
    //.toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("postDateShort", (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .toUTC()
      .toLocaleString(DateTime.DATE_SHORT);
    //.setZone("America/Los_Angeles")
    //.toLocaleString(DateTime.DATE_SHORT);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter("slugify"),
    })
    .use(markdownItToc, {
      slugify: eleventyConfig.getFilter("slugify"),
      containerClass: "article-toc",
      linkClass: "article-toc-link",
    });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // Inline image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("inlineImage", inlineImageShortcode);
  eleventyConfig.addLiquidShortcode("inlineImage", inlineImageShortcode);
  eleventyConfig.addJavaScriptFunction("inlineImage", inlineImageShortcode);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
    },
  };
};
