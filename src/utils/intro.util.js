import figlet from "figlet";
import gradient from "gradient-string";
const generateIntroText = () => {
  return gradient.instagram.multiline(
    figlet.textSync("DownTube", {
      horizontalLayout: "full",
      verticalLayout: "full",
    })
  );
};

export default generateIntroText;
