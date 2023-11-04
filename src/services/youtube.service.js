const fs = require("fs");
const path = require("path");
const readline = require("readline");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const utils = require("../utils/utils");

const downloadSingleVideo = (
  videoUrl,
  filePath,
  config = {
    fileExtension: ".mp3",
    filter: "audioonly",
    index: 0,
  }
) => {
  return new Promise((resolve, reject) => {
    try {
      const output = path.resolve(
        (filePath += config?.fileExtension || ".mp3")
      );

      const video = ytdl(videoUrl, {
        filter: config?.filter || "audioonly",
      });
      const index = config?.index || 0;

      video.pipe(fs.createWriteStream(output));
      video.once("info", (info) => {
        const {
          videoDetails: { title, lengthSeconds },
        } = info;

        console.log(
          `Downloading: ${index + 1}. [${utils.secondsToDuration(
            lengthSeconds
          )}] - ${utils.sanitizeFileName(title)}`
        );
      });
      video.on("progress", (chunkLength, downloaded, total) => {
        const percent =
          `${((downloaded / total) * 100).toFixed(2)}`.padStart(5, 0) + "%";

        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Downloaded: ${percent} `);

        process.stdout.write(utils.generateProgressBar(downloaded, total, 25));
        process.stdout.write(
          ` ${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
          ).toFixed(2)}MB\n`
        );
        readline.moveCursor(process.stdout, 0, -1);
      });
      video.on("end", () => {
        resolve(output);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getSingleVideoInfo = async (url) => {
  const {
    videoDetails: {
      title,
      author: { name },
      video_url,
      videoId,
      publishDate,
    },
  } = await ytdl.getBasicInfo(url);

  return { title, author: name, videoUrl: video_url, videoId, publishDate };
};

const getAllVideoFromPlaylist = async (url) => {
  const {
    id,
    url: playlistUrl,
    title,
    items,
    author: { name },
  } = await ytpl(url);

  const playlistInfo = { id, url: playlistUrl, name: title, channelName: name };
  const videos = items.map(({ title, shortUrl, index }) => ({
    index,
    title,
    shortUrl,
  }));

  return { info: playlistInfo, items: videos };
};

const isValidPlaylistId = async (url) => {
  try {
    const playlistId = (await ytpl.getPlaylistID(url)) || null;
    return ytpl.validateID(playlistId);
  } catch (error) {
    return false;
  }
};

const isValidVideoId = (url) => {
  return ytdl.validateURL(url);
};
module.exports = {
  downloadSingleVideo,
  getAllVideoFromPlaylist,
  getSingleVideoInfo,
  isValidPlaylistId,
  isValidVideoId,
};
