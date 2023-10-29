const figlet = require("figlet");
const gradient = require("gradient-string");
const generateIntroText = () => {
  return gradient.instagram.multiline(
    figlet.textSync("DownTube", {
      horizontalLayout: "full",
      verticalLayout: "full",
    })
  );
};

module.exports = generateIntroText;
