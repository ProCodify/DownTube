const { createDirIfNotExist, sanitizeFileName } = require("./files.util.js");
const generateIntroText = require("./intro.util.js");
const { sleep, secondsToDuration, generator } = require("./time.util.js");

const generateProgressBar = (length, totalLength, barLength = 20) => {
  const progress = (length / totalLength) * barLength;
  const progressBar = "█".repeat(progress) + "-".repeat(barLength - progress);
  return `[${progressBar}]`;
};
module.exports = {
  createDirIfNotExist,
  sleep,
  generateIntroText,
  sanitizeFileName,
  secondsToDuration,
  generator,
  generateProgressBar,
};
