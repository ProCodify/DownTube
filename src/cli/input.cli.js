const chalk = require("chalk");
const inquirer = require("inquirer");
const youtubeService = require("../services/youtube.service.js");

const takeUserInput = async () => {
  let contentType = "playlist";

  const { contentUrl, contentFilter } = await inquirer.prompt([
    {
      type: "input",
      name: "contentUrl",
      message: chalk.bgCyan("Enter the video/playlist Url:"),
      validate: async (url) => {
        if (await youtubeService.isValidPlaylistId(url)) {
          contentType = "playlist";
          return true;
        } else if (youtubeService.isValidVideoId(url)) {
          contentType = "video";
          return true;
        } else {
          return chalk.redBright(
            "Invalid video/playlist link. Please provide a valid link"
          );
        }
      },
    },
    {
      type: "list",
      name: "contentFilter",
      message: chalk.bgCyan(
        "Select the content type that you want to download: "
      ),
      choices: [
        { name: "Video", value: "videoandaudio", checked: true, line: true },
        { name: "Audio", value: "audioonly", line: true },
      ],
    },
  ]);

  const contentExt = contentFilter == "videoandaudio" ? ".mp4" : ".mp3";

  return { contentUrl, contentType, contentFilter, contentExt };
};

module.exports = { takeUserInput };
