const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "./build/icon.ico"),
  },
  electronPackagerConfig: {
    icon: path.join(__dirname, "./build/icon.ico"),
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "feed_reader",
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
