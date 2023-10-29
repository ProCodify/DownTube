#! /usr/bin/env node

const main = require("./src/main.js");

(async () => {
  try {
    while (true) {
      await main();
    }
  } catch (error) {
    console.log(
      "Unable to download your content. Please check your connection"
    );
    console.log(
      "please report the bug: https://github.com/ProCodify/DownTube/bugs"
    );
    process.exit(1);
  }
})();
