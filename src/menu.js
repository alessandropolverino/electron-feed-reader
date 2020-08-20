const {
  saveProxy,
  getProxys,
  saveSeparator,
  getSeparators,
  saveFeedUrl,
  getFeedUrls,
  saveCustomConfig,
  getCustomConfigs,
  setConfig,
} = require("./store.js");
const { Menu } = remote;

function buildMenu() {
  let menu = Menu.buildFromTemplate([
    {
      label: "Save",
      submenu: [
        {
          label: "Save custom proxy",
          click() {
            saveProxy();
            buildMenu();
          },
        },
        {
          label: "Save custom separator",
          click() {
            saveSeparator();
            buildMenu();
          },
        },
        {
          label: "Save Feed Url",
          click() {
            saveFeedUrl();
            buildMenu();
          },
        },
        {
          label: "Save configuration",
          click() {
            saveCustomConfig();
            buildMenu();
          },
        },
      ],
    },
    {
      label: "Configurations",
      submenu: [
        {
          label: "Default",
          click() {
            setConfig({
              name: "default",
              feedUrl: "",
              useProxy: false,
              proxyType: "default",
              customProxy: "",
              useCustomSeparator: false,
              customSeparator: "",
            });
          },
        },
        {
          label: "Custom",
          submenu: getCustomConfigs(),
        },
      ],
    },
    {
      label: "Saved",
      submenu: [
        {
          label: "proxys ",
          submenu: getProxys(),
        },
        {
          label: "separators",
          submenu: getSeparators(),
        },
        {
          label: "feed Urls",
          submenu: getFeedUrls(),
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

buildMenu();
