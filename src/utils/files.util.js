const fs = require("fs");

const createDirIfNotExist = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const sanitizeFileName = (name) => {
  return name.replace(/[.!"`'<>={}~\$\(\)\*\+\/\\\?\^\|]+/g, " ");
};
module.exports = { createDirIfNotExist, sanitizeFileName };
