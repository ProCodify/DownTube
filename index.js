const { downloadVideo } = require("./youtube");

const ytpl = require("ytpl");

(async () => {
  const playlist = await ytpl(process.argv[2]);
  playlist.items.map((video) => {
    downloadVideo(
      video.shortUrl,
      video.title.replace(/\s|\|/g, "_"),
      playlist.author.name
    );
  });
})();
