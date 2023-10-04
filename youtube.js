const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const readline = require("readline");
const path = require("path");
const fs = require("fs");
const { createDirIfNotExist } = require("./util");

const ROOT_PATH = `${process.env.USERPROFILE}/Downloads`;

createDirIfNotExist(ROOT_PATH);

const downloadVideo = (videoUrl, videoTitle, author) => {
  try {
    const CONTENT_PATH = `${ROOT_PATH}/${author}`;

    author && createDirIfNotExist(CONTENT_PATH);

    const output = path.resolve(
      path.join(CONTENT_PATH, (videoTitle += ".mp3"))
    );

    const video = ytdl(videoUrl, {
      filter: "audioonly",
    });

    video.pipe(fs.createWriteStream(output));
    video.once("info", () => {
      process.stdout.write(`${videoTitle}\n`);
    });
    video.on("progress", (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(
        `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
          total /
          1024 /
          1024
        ).toFixed(2)}MB)\n`
      );
      readline.moveCursor(process.stdout, 0, -1);
    });
    video.on("end", () => {
      process.stdout.write("\n");
    });
  } catch (error) {
    console.log(error);
  }
};

const downloadASingleVideo = async (url) => {
  const {
    videoDetails: { title, author },
  } = await ytdl.getBasicInfo(url);

  downloadVideo(url, title.replace(/\s\|/g, "_"), author.name);
};

const downloadAllVideoFromPlaylist = async (url) => {
  const playlist = await ytpl(url);
  playlist.items.map((video) => {
    downloadVideo(
      video.shortUrl,
      video.title.replace(/\s|\|/g, "_"),
      playlist.author.name
    );
  });
};
module.exports = { downloadASingleVideo, downloadAllVideoFromPlaylist };
