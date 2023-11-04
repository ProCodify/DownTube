const path = require("path");
const ROOT_PATH = require("./filePath.service.js");
const youtubeService = require("./youtube.service.js");
const utils = require("../utils/utils.js");

const chalk = require("chalk");
const downloadVideo = async ({
  contentUrl,
  contentExt,
  contentFilter,
  index,
}) => {
  const { author, videoUrl, title } = await youtubeService.getSingleVideoInfo(
    contentUrl
  );

  const channelPath = path.join(ROOT_PATH, utils.sanitizeFileName(author));
  utils.createDirIfNotExist(channelPath);
  const filePath = path.join(channelPath, utils.sanitizeFileName(title));
  await youtubeService.downloadSingleVideo(videoUrl, filePath, {
    fileExtension: contentExt,
    filter: contentFilter,
    index,
  });
  console.log(chalk.green(`Content saved at ${channelPath}`));
};

const downloadPlaylist = async ({ contentUrl, contentExt, contentFilter }) => {
  const { info, items } = await youtubeService.getAllVideoFromPlaylist(
    contentUrl
  );
  const { name, channelName } = info;

  const channelPath = path.join(ROOT_PATH, utils.sanitizeFileName(channelName));
  const playlistPath = path.join(channelPath, utils.sanitizeFileName(name));

  utils.createDirIfNotExist(channelPath);
  utils.createDirIfNotExist(playlistPath);

  console.log(
    chalk.yellow(`Downloading ${items.length} contents from ${name}`)
  );

  const g = utils.generator(items.length - 1);

  for await (const index of g) {
    const video = items[index];
    const filePath = path.join(
      playlistPath,
      utils.sanitizeFileName(video.title)
    );
    await youtubeService.downloadSingleVideo(video.shortUrl, filePath, {
      fileExtension: contentExt,
      filter: contentFilter,
      index,
    });
  }
  console.log(chalk.green(`Content saved at ${playlistPath}`));
};

module.exports = { downloadPlaylist, downloadVideo };
