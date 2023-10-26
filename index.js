#! /usr/bin/env node

import main from "./src/main.js";

try {
  main();
} catch (error) {
  console.log("Unable to download your content. Please check your connection");
  console.log(
    "please report the bug: https://github.com/ProCodify/DownTube/bugs"
  );
  process.exit(1);
}
