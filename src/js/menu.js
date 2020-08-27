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
const { Menu, app } = require("electron").remote;

let nowDate = new Date();

function buildMenu(domNodes) {
  let menu = Menu.buildFromTemplate([
    {
      label: "Save",
      submenu: [
        {
          label: "Save Feed Url",
          click() {
            let feedUrl = domNodes.$feedIn.value;
            if (feedUrl != "") {
              saveFeedUrl(feedUrl);
              buildMenu(domNodes);
            } else {
              alert("Insert valid feed url");
            }
          },
        },
        {
          label: "Save Custom Proxy",
          click() {
            saveProxy(domNodes.$customProxyIn.value);
            buildMenu(domNodes);
          },
        },
        {
          label: "Save Custom Separator",
          click() {
            saveSeparator(domNodes.$separatorIn.value);
            buildMenu(domNodes);
          },
        },
        {
          label: "Save Configuration",
          click() {
            saveCustomConfig(
              domNodes.$feedIn,
              domNodes.$proxyCheck,
              domNodes.$proxyType,
              domNodes.$customProxyIn,
              domNodes.$separatorCheck,
              domNodes.$separatorIn,
              domNodes.$itemsLimitCheck,
              domNodes.$itemsNumberIn,
              domNodes.$outFileNameIn,
              domNodes.$pathDisplayDiv,
              domNodes.$hourIn
            );
            buildMenu(domNodes);
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
              useLimitItems: false,
              itemsLimitNumber: "",
              customSeparator: "",
              repeatOutName: "feed-out.txt",
              repeatOutPath: app.getPath("documents"),
              repeatOutDailyHour: nowDate.getHours(),
            });
          },
        },
        {
          label: "Custom",
          submenu: getCustomConfigs(
            domNodes.$feedIn,
            domNodes.$proxyCheck,
            domNodes.$proxyType,
            domNodes.$customProxyIn,
            domNodes.$separatorCheck,
            domNodes.$separatorIn,
            domNodes.$itemsLimitCheck,
            domNodes.$itemsNumberIn,
            domNodes.$outFileNameIn,
            domNodes.$pathDisplayDiv,
            domNodes.$hourIn
          ),
        },
      ],
    },
    {
      label: "Saved",
      submenu: [
        {
          label: "Feed Urls",
          submenu: getFeedUrls(domNodes.$feedIn),
        },
        {
          label: "Proxys ",
          submenu: getProxys(
            domNodes.$proxyCheck,
            domNodes.$proxyType,
            domNodes.$customProxyIn
          ),
        },
        {
          label: "Separators",
          submenu: getSeparators(
            domNodes.$separatorCheck,
            domNodes.$separatorIn
          ),
        },
      ],
    },
    {
      label: "Repeat",
      submenu: [
        {
          label: "Hourly",
          click() {
            const { readRepeatHour } = require("./feed_reader.js");
            readRepeatHour(
              domNodes.$feedArea,
              domNodes.$pathDisplayDiv,
              domNodes.$outFileNameIn.value,
              domNodes.$feedIn.value,
              domNodes.$separatorIn.value,
              domNodes.$proxyCheck.checked,
              domNodes.$proxyType.value,
              domNodes.$customProxyIn.value,
              domNodes.$itemsLimitCheck.checked,
              domNodes.$itemsNumberIn.value
            );
          },
        },
        {
          label: "Daily",
          click() {
            const { readRepeatDay } = require("./feed_reader.js");
            readRepeatDay(
              domNodes.$hourIn,
              domNodes.$feedArea,
              domNodes.$pathDisplayDiv,
              domNodes.$outFileNameIn.value,
              domNodes.$feedIn.value,
              domNodes.$separatorIn.value,
              domNodes.$proxyCheck.checked,
              domNodes.$proxyType.value,
              domNodes.$customProxyIn.value,
              domNodes.$itemsLimitCheck.checked,
              domNodes.$itemsNumberIn.value
            );
          },
        },
        {
          label: "Stop repeating",
          click() {
            const { clearRepeat } = require("./feed_reader.js");
            clearRepeat();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  buildMenu: buildMenu,
};
