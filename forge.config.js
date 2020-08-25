const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "./build/icon.ico"),
  },
  electronPackagerConfig: {
    icon: path.join(__dirname, "./build/icon.ico"),
  },
  makers: [
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {
    //     name: "feed_reader",
    //   },
    // },
    {
      name: "@electron-forge/maker-wix",
      config: {
        description: "One app to read 'em all",
        name: "Feed Reader",
        version: "1.0.0",
        ui: {
          images: {
            background: path.join(__dirname, "build/wix-bg.jpg"),
            banner: path.join(__dirname, "build/wix-banner.jpg"),
            exclamationIcon: path.join(__dirname, "build/icon-32x.jpg"),
            infoIcon: path.join(__dirname, "build/icon-32x.jpg"),
            newIcon: path.join(__dirname, "build/icon-16x.jpg"),
            upIcon: path.join(__dirname, "build/icon-16x.jpg"),
          },
        },
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
