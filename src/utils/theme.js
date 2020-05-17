const HAXXIUM = {
  bodybg: "#07110a",
  activeword: "#1E3B28",
  activechar: "#A0FF2B",
  typedword: "#2C4D39",
  fontcolor: "#27FF27",

  error: "#E6F8FC",

  fastest: "#27FF27",
  fast: "#acce3d",
  normal: "#FFF216",
  slow: "#FB885C",
  slowest: "#DA274B",
};

const XXPRESSO = {
  bodybg: "#171717",
  activeword: "#4E3F35",
  activechar: "#CE9A48",
  typedword: "#5E5452",
  fontcolor: "#E5AB6B",

  error: "#E6F8FC",

  fastest: "#00cec9",
  fast: "#55efc4",
  normal: "#81ecec",
  slow: "#74b9ff",
  slowest: "#ff7675",
};

const LASERWAVE = {
  bodybg: "#200401",
  activeword: "#410802",
  typedword: "#900",
  activechar: "#fa7769",
  fontcolor: "#faa",
  error: "#F1F1F1",

  fastest: "#fbfbfa",
  fast: "#faa",
  normal: "#f77",
  slow: "#f44",
  slowest: "#f00",
};

const DODECAHEDRON = {
  bodybg: "#100019",
  activeword: "#360850",
  typedword: "#581B7B",
  activechar: "#fbfbfa",
  fontcolor: "#E2ACFF",
  error: "#FF329B",

  fastest: "#fbfbfa",
  fast: "#642887",
  normal: "#EF50A2",
  slow: "#D62D7E",
  slowest: "#BE0D5D",
};

let themeNames = ["HAXXIUM", "LASERWAVE", "XXPRESSO", "DODECAHEDRON"];
let themes = [HAXXIUM, LASERWAVE, XXPRESSO, DODECAHEDRON];
let index = -1;

// theme changer
export default () => {
  index = index == themes.length - 1 ? 0 : index + 1;
  for (let key in themes[index]) {
    document.documentElement.style.setProperty(`--${key}`, themes[index][key]);
    document.body.classList.add("fade-in");
    document.querySelector(".theme-name").textContent = themeNames[index];
    setTimeout(() => {
      document.body.classList.remove("fade-in");
    }, 1000);
  }
};
