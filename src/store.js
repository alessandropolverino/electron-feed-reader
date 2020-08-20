const Store = require("electron-store");
const savedStore = new Store({ name: "saved-config" });

function saveProxy() {
  let { customProxyIn } = require("./feedReader");
  if (customProxyIn.value != "") {
    let proxys = savedStore.get("proxys");
    if (proxys) {
      savedStore.set("proxys", proxys.concat(customProxyIn.value));
    } else {
      savedStore.set("proxys", [customProxyIn.value]);
    }
  } else {
    alert("insert valid proxy");
  }
}

function getProxys() {
  let proxys = savedStore.get("proxys");
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
  let separators = savedStore.get("separators");
  if (separators) {
    savedStore.set("separators", separators.concat(`${separatorIn.value}`));
  } else {
    savedStore.set("separators", [`${separatorIn.value}`]);
  }
}

function getSeparators() {
  let separators = savedStore.get("separators");
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
    let feedUrls = savedStore.get("feedUrls");
    if (feedUrls) {
      savedStore.set("feedUrls", feedUrls.concat(feedIn.value));
    } else {
      savedStore.set("feedUrls", [feedIn.value]);
    }
  } else {
    alert("Insert valid feed url");
  }
}

function getFeedUrls() {
  let feedUrls = savedStore.get("feedUrls");
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

/**
 * full config
 */

const customConfigsStore = new Store({ name: "custom-configs" });

function saveCustomConfig() {
  let {
    feedIn,
    proxyCheck,
    proxyType,
    customProxyIn,
    separatorCheck,
    separatorIn,
  } = require("./feedReader");
  let customConfigs = customConfigsStore.get("customConfigs");
  if (customConfigs) {
    customConfigsStore.set(
      "customConfigs",
      customConfigs.concat({
        name: `Custom ${customConfigs.length + 1}`,
        feedUrl: feedIn.value,
        useProxy: proxyCheck.checked,
        proxyType: proxyType.value,
        customProxy: customProxyIn.value,
        useCustomSeparator: separatorCheck.checked,
        customSeparator: separatorIn.value,
      })
    );
  } else {
    customConfigsStore.set("customConfigs", [
      {
        name: "Custom 1",
        feedUrl: feedIn.value,
        useProxy: proxyCheck.checked,
        proxyType: proxyType.value,
        customProxy: customProxyIn.value,
        useCustomSeparator: separatorCheck.checked,
        customSeparator: separatorIn.value,
      },
    ]);
  }
}

function getCustomConfigs() {
  let customConfigs = customConfigsStore.get("customConfigs");
  if (customConfigs) {
    return customConfigs.map((cfg) => {
      return {
        label: cfg.name,
        click() {
          setConfig(cfg);
        },
      };
    });
  } else {
    return [{ label: "No custom config saved" }];
  }
}

function setConfig(cfg) {
  let {
    feedIn,
    proxyCheck,
    proxyType,
    customProxyIn,
    separatorCheck,
    separatorIn,
  } = require("./feedReader");
  feedIn.value = cfg.feedUrl;
  proxyCheck.checked = cfg.useProxy;
  if (proxyCheck.checked == true && proxyType.classList.contains("is-hidden")) {
    proxyType.classList.remove("is-hidden");
  } else {
    proxyType.classList.add("is-hidden");
  }
  proxyType.value = cfg.proxyType;
  if (
    proxyType.value == "custom" &&
    customProxyIn.classList.contains("is-hidden")
  ) {
    customProxyIn.classList.remove("is-hidden");
  } else {
    customProxyIn.classList.add("is-hidden");
  }
  customProxyIn.value = cfg.customProxy;
  separatorCheck.checked = cfg.useCustomSeparator;
  if (
    separatorCheck.checked == true &&
    separatorIn.classList.contains("is-hidden")
  ) {
    separatorIn.classList.remove("is-hidden");
  } else {
    separatorIn.classList.add("is-hidden");
  }
  separatorIn.value = cfg.customSeparator;
}

module.exports = {
  saveProxy: saveProxy,
  getProxys: getProxys,
  saveSeparator: saveSeparator,
  getSeparators: getSeparators,
  saveFeedUrl: saveFeedUrl,
  getFeedUrls: getFeedUrls,
  saveCustomConfig: saveCustomConfig,
  getCustomConfigs: getCustomConfigs,
  setConfig: setConfig,
};
