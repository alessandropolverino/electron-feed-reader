const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "./build/icon"),
  },
  electronPackagerConfig: {
    icon: path.join(__dirname, "./build/icon"),
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "FeedReader",
        iconUrl: path.join(__dirname, "build/icon.ico"),
        setupIcon: path.join(__dirname, "build/icon.ico"),
        loadingGif: path.join(__dirname, "build/installing-gif.gif"),
        setupExe: "FeedReader-Setup.exe",
        authors: "Alessandro Polverino, Carlo Stanzione",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        categories: "Office",
        icon: path.join(__dirname, "build/icon.png"),
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          categories: "Office",
          icon: path.join(__dirname, "build/icon.png"),
        },
      },
    },
  ],
};
