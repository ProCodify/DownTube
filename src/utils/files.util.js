import fs from "fs";

const createDirIfNotExist = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const sanitizeFileName = (name) => {
  return name.replace(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g, "");
};
export { createDirIfNotExist, sanitizeFileName };
