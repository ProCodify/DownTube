#! /usr/bin/env node
const {
  downloadASingleVideo,
  downloadAllVideoFromPlaylist,
} = require("./youtube");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

(async () => {
  const CONTENT_URL = process.argv[2];

  const isValidPlaylistId = ytpl.validateID(CONTENT_URL);
  const isValidVideoId = ytdl.validateURL(CONTENT_URL);

  if (isValidPlaylistId) {
    downloadAllVideoFromPlaylist(CONTENT_URL);
  } else if (isValidVideoId) {
    downloadASingleVideo(CONTENT_URL);
  } else {
    throw new Error("Invalid Playlist or Video link");
  }
})();
