const removeMd = require("remove-markdown");

module.exports = (markdownText) => {
  return removeMd(markdownText);
};
