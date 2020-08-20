const {
  saveProxy,
  getProxys,
  saveSeparator,
  getSeparators,
  saveFeedUrl,
  getFeedUrls,
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
      ],
    },
    {
      label: "Configuration",
      submenu: [{ label: "Default" }],
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
