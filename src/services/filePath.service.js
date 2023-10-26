import path from "path";
import utils from "../utils/utils.js";

const USER_DOWNLOAD_PATH = `${process.env.USERPROFILE}/Downloads`;
const ROOT_PATH = path.join(USER_DOWNLOAD_PATH, "DownTube");

try {
  utils.createDirIfNotExist(USER_DOWNLOAD_PATH);
  utils.createDirIfNotExist(ROOT_PATH);
} catch (error) {
  console.log(`Unable to create root path for downloads: ${ROOT_PATH}`);
  process.exit(1);
}

export default ROOT_PATH;
