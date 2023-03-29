const ytdl = require("ytdl-core");
const readline = require("readline");
const path = require("path");
const fs = require("fs");
const { createDirIfNotExist } = require("./util");

createDirIfNotExist("./downloads");

const downloadVideo = (videoUrl, videoTitle, author) => {
  try {
    author && createDirIfNotExist(`./downloads/${author}`);

    const output = path.resolve(
      path.join(process.cwd(), "downloads", author, (videoTitle += ".mp3"))
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

module.exports = { downloadVideo };
