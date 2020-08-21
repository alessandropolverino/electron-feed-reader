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
const { Menu, app } = remote;

let nowDate = new Date();

function buildMenu() {
  let menu = Menu.buildFromTemplate([
    {
      label: "Save",
      submenu: [
        {
          label: "Save Feed Url",
          click() {
            saveFeedUrl();
            buildMenu();
          },
        },
        {
          label: "Save Custom Proxy",
          click() {
            saveProxy();
            buildMenu();
          },
        },
        {
          label: "Save Custom Separator",
          click() {
            saveSeparator();
            buildMenu();
          },
        },
        {
          label: "Save Configuration",
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
              repeatOutName: "feed-out.txt",
              repeatOutPath: app.getPath("documents"),
              repeatOutDailyHour: nowDate.getHours(),
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
          label: "Feed Urls",
          submenu: getFeedUrls(),
        },
        {
          label: "Proxys ",
          submenu: getProxys(),
        },
        {
          label: "Separators",
          submenu: getSeparators(),
        },
      ],
    },
    {
      label: "Repeat",
      submenu: [
        {
          label: "Hourly",
          click() {
            const { readRepeatHour } = require("./scheduleRead");
            readRepeatHour();
          },
        },
        {
          label: "Daily",
          click() {
            const { readRepeatDay } = require("./scheduleRead");
            readRepeatDay();
          },
        },
        {
          label: "Stop repeating",
          click() {
            const { clearRepeat } = require("./scheduleRead");
            clearRepeat();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

buildMenu();
