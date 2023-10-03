const { downloadVideo } = require("./youtube");
const ytdl = require("ytdl-core");

// const ytpl = require("ytpl");

// (async () => {
//   const playlist = await ytpl(process.argv[2]);
//   playlist.items.map((video) => {
//     downloadVideo(
//       video.shortUrl,
//       video.title.replace(/\s|\|/g, "_"),
//       playlist.author.name
//     );
//   });
// })();

(async () => {
  const url = process.argv[2];

  const isValidUrl = ytdl.validateURL(url);

  if (!isValidUrl) throw new Error("Invalid video link provided.");
  const {
    videoDetails: { title, author },
  } = await ytdl.getBasicInfo(url);

  downloadVideo(url, title?.replace(/\s|\|/g, "_"), author.name);
})();
