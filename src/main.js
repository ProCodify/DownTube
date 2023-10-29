const path = require("path");
const { takeUserInput } = require("./cli/input.cli.js");
const ROOT_PATH = require("./services/filePath.service.js");
const youtubeService = require("./services/youtube.service.js");
const utils = require("./utils/utils.js");

function* emptyLoopGenerator(ends) {
  for (let i = 0; i <= ends; i++) {
    yield i;
  }
}

const main = async () => {
  const introText = utils.generateIntroText();
  console.log(introText);

  const { contentUrl, contentExt, contentFilter, contentType } =
    await takeUserInput();

  if (contentType === "playlist") {
    const { info, items } = await youtubeService.getAllVideoFromPlaylist(
      contentUrl
    );
    const { name, channelName } = info;

    const channelPath = path.join(
      ROOT_PATH,
      utils.sanitizeFileName(channelName)
    );
    const playlistPath = path.join(channelPath, utils.sanitizeFileName(name));

    utils.createDirIfNotExist(channelPath);
    utils.createDirIfNotExist(playlistPath);

    console.log(`Downloading ${items.length} contents from ${name}`);

    const generator = emptyLoopGenerator(items.length - 1);

    for await (const index of generator) {
      const video = items[index];
      const filePath = path.join(
        playlistPath,
        utils.sanitizeFileName(video.title)
      );
      console.log(
        `Downloading: [${index + 1}/${items.length}] - ${utils.sanitizeFileName(
          video.title
        )} `
      );
      await youtubeService.downloadSingleVideo(video.shortUrl, filePath, {
        fileExtension: contentExt,
        filter: contentFilter,
      });
    }
    console.log(`Content saved at ${playlistPath}`);
  } else if (contentType === "video") {
    const { author, videoUrl, title } = await youtubeService.getSingleVideoInfo(
      contentUrl
    );

    const channelPath = path.join(ROOT_PATH, utils.sanitizeFileName(author));
    utils.createDirIfNotExist(channelPath);

    const filePath = path.join(channelPath, utils.sanitizeFileName(title));
    console.log(`Downloading:  ${utils.sanitizeFileName(title)} `);
    await youtubeService.downloadSingleVideo(videoUrl, filePath, {
      fileExtension: contentExt,
      filter: contentFilter,
    });
    console.log(`Content saved at ${channelPath}`);
  } else {
    throw new Error("Unknown content type selected");
  }
};

module.exports = main;
