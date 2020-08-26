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
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
