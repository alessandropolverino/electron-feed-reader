const Store = require("electron-store");
const configStore = new Store({ name: "config" });

function saveProxy() {
  let { customProxyIn } = require("./feedReader");
  if (customProxyIn.value != "") {
    let proxys = configStore.get("proxys");
    if (proxys) {
      configStore.set("proxys", proxys.concat(customProxyIn.value));
    } else {
      configStore.set("proxys", [customProxyIn.value]);
    }
  } else {
    alert("insert valid proxy");
  }
}

function getProxys() {
  let proxys = configStore.get("proxys");
  if (proxys) {
    return proxys.map((proxy) => {
      return {
        label: proxy,
        click() {
          setCustomProxy(proxy);
        },
      };
    });
  } else {
    return [{ label: "No proxy Saved" }];
  }
}

function setCustomProxy(proxy) {
  let { proxyCheck, proxyType, customProxyIn } = require("./feedReader");
  proxyCheck.checked = true;
  proxyType.value = "custom";
  if (proxyType.classList.contains("is-hidden"))
    proxyType.classList.remove("is-hidden");
  customProxyIn.value = proxy;
  if (customProxyIn.classList.contains("is-hidden"))
    customProxyIn.classList.remove("is-hidden");
}

function saveSeparator() {
  let { separatorIn } = require("./feedReader");
  let separators = configStore.get("separators");
  if (separators) {
    configStore.set("separators", separators.concat(`${separatorIn.value}`));
  } else {
    configStore.set("separators", [`${separatorIn.value}`]);
  }
}

function getSeparators() {
  let separators = configStore.get("separators");
  if (separators) {
    return separators.map((separator) => {
      return {
        label: `\"${separator}\"`,
        click() {
          setCustomSeparator(separator);
        },
      };
    });
  } else {
    return [{ label: "No separator saved" }];
  }
}

function setCustomSeparator(separator) {
  let { separatorCheck, separatorIn } = require("./feedReader");
  separatorCheck.checked = true;
  if (separatorIn.classList.contains("is-hidden"))
    separatorIn.classList.remove("is-hidden");
  separatorIn.value = separator;
}

function saveFeedUrl() {
  let { feedIn } = require("./feedReader");
  if (feedIn.value != "") {
    let feedUrls = configStore.get("feedUrls");
    if (feedUrls) {
      configStore.set("feedUrls", feedUrls.concat(feedIn.value));
    } else {
      configStore.set("feedUrls", [feedIn.value]);
    }
  } else {
    alert("Insert valid feed url");
  }
}

function getFeedUrls() {
  let feedUrls = configStore.get("feedUrls");
  if (feedUrls) {
    return feedUrls.map((feedUrl) => {
      return {
        label: feedUrl,
        click() {
          setFeedUrl(feedUrl);
        },
      };
    });
  } else {
    return [{ label: "No feed Url saved" }];
  }
}

function setFeedUrl(feedUrl) {
  let { feedIn } = require("./feedReader");
  feedIn.value = feedUrl;
}

module.exports = {
  saveProxy: saveProxy,
  getProxys: getProxys,
  saveSeparator: saveSeparator,
  getSeparators: getSeparators,
  saveFeedUrl: saveFeedUrl,
  getFeedUrls: getFeedUrls,
};
