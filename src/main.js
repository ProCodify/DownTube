const chalk = require("chalk");
const { takeUserInput } = require("./cli/input.cli.js");
const mainService = require("./services/main.service.js");
const utils = require("./utils/utils.js");

const main = async () => {
  const introText = utils.generateIntroText();
  console.log(introText);

  const {
    contentUrl: link,
    contentExt,
    contentFilter,
    contentType,
  } = await takeUserInput();

  const contentUrls = link.replace(/[ ]+/g, " ").split(" ");

  switch (contentType) {
    case "video":
      {
        const g = utils.generator(contentUrls.length - 1);
        console.log(
          chalk.yellow(
            `Downloading ${contentUrls.length} content${
              contentUrls.length > 1 ? "s" : ""
            }`
          )
        );
        for await (const i of g) {
          await mainService.downloadVideo({
            contentUrl: contentUrls[i],
            contentExt,
            contentFilter,
            index: i,
          });
        }
      }

      break;
    case "playlist":
      {
        const g = utils.generator(contentUrls.length - 1);
        for await (const i of g) {
          await mainService.downloadPlaylist({
            contentUrl: contentUrls[i],
            contentExt,
            contentFilter,
            index: i,
          });
        }
      }
      break;
    default:
      throw new Error("Unknown content type:", contentType);
  }
};

module.exports = main;
