const Store = require("electron-store");
const savedStore = new Store({ name: "saved-config" });

/**
 *
 * @param {String} custProxyVal Value of the proxy to save
 */
function saveProxy(custProxyVal) {
  if (custProxyVal != "") {
    let proxys = savedStore.get("proxys");
    if (proxys) {
      savedStore.set("proxys", proxys.concat(custProxyVal));
    } else {
      savedStore.set("proxys", [custProxyVal]);
    }
  } else {
    alert("insert valid proxy");
  }
}

/**
 *
 * @param {Element} $proxyCheck Dom node
 * @param {Element} $proxyType Dom node
 * @param {Element} $customProxyIn Dom node
 */
function getProxys($proxyCheck, $proxyType, $customProxyIn) {
  let proxys = savedStore.get("proxys");
  if (proxys) {
    return proxys.map((proxy) => {
      return {
        label: proxy,
        click() {
          if (
            !$proxyCheck instanceof Element ||
            !$proxyType instanceof Element ||
            !$customProxyIn instanceof Element
          ) {
            throw new Error(
              "Invalid parameters passed, they all have to be DOMElements"
            );
          }
          $proxyCheck.checked = true;
          $proxyType.value = "custom";
          if ($proxyType.classList.contains("is-hidden"))
            $proxyType.classList.remove("is-hidden");
          $customProxyIn.value = proxy;
          if ($customProxyIn.classList.contains("is-hidden"))
            $customProxyIn.classList.remove("is-hidden");
        },
      };
    });
  } else {
    return [{ label: "No proxy Saved" }];
  }
}

/**
 *
 * @param {String} separator Value of the separator to save
 */
function saveSeparator(separator) {
  let separators = savedStore.get("separators");
  if (separators) {
    savedStore.set("separators", separators.concat(`${separator}`));
  } else {
    savedStore.set("separators", [`${separator}`]);
  }
}

/**
 *
 * @param {Element} $separatorCheck Dom node
 * @param {Element} $separatorIn Dom node
 */
function getSeparators($separatorCheck, $separatorIn) {
  let separators = savedStore.get("separators");
  if (separators) {
    return separators.map((separator) => {
      return {
        label: `\"${separator}\"`,
        click() {
          if (
            !$separatorCheck instanceof Element ||
            !$separatorIn instanceof Element
          ) {
            throw new Error("Invalid parameter");
          }
          $separatorCheck.checked = true;
          if ($separatorIn.classList.contains("is-hidden"))
            $separatorIn.classList.remove("is-hidden");
          $separatorIn.value = separator;
        },
      };
    });
  } else {
    return [{ label: "No separator saved" }];
  }
}

/**
 *
 * @param {String} feedUrl Feed Url to save
 */
function saveFeedUrl(feedUrl) {
  let feedUrls = savedStore.get("feedUrls");
  if (feedUrls) {
    savedStore.set("feedUrls", feedUrls.concat(feedUrl));
  } else {
    savedStore.set("feedUrls", [feedUrl]);
  }
}

/**
 *
 * @param {Element} $feedIn Dom node
 */
function getFeedUrls($feedIn) {
  let feedUrls = savedStore.get("feedUrls");
  if (feedUrls) {
    return feedUrls.map((feedUrl) => {
      return {
        label: feedUrl,
        click() {
          if (!$feedIn instanceof Element) {
            throw new Error("Invalid parameter passed");
          }
          $feedIn.value = feedUrl;
        },
      };
    });
  } else {
    return [{ label: "No feed Url saved" }];
  }
}

/**
 * Save full forms config
 */

const customConfigsStore = new Store({ name: "custom-configs" });

/**
 * Handles custom full config save
 * @param {Element} $feedIn Dom node
 * @param {Element} $proxyCheck Dom node
 * @param {Element} $proxyType Dom node
 * @param {Element} $customProxyIn Dom node
 * @param {Element} $separatorCheck Dom node
 * @param {Element} $separatorIn Dom node
 * @param {Element} $itemsLimitCheck Dom node
 * @param {Element} $itemsNumberIn Dom node
 * @param {Element} $outFileNameIn Dom node
 * @param {Element} $pathDisplayDiv Dom node
 * @param {Element} $hourIn Dom node
 */
function saveCustomConfig(
  $feedIn,
  $proxyCheck,
  $proxyType,
  $customProxyIn,
  $separatorCheck,
  $separatorIn,
  $itemsLimitCheck,
  $itemsNumberIn,
  $outFileNameIn,
  $pathDisplayDiv,
  $hourIn
) {
  let customConfigs = customConfigsStore.get("customConfigs");
  if (customConfigs) {
    customConfigsStore.set(
      "customConfigs",
      customConfigs.concat({
        name: `Custom ${customConfigs.length + 1}`,
        feedUrl: $feedIn.value,
        useProxy: $proxyCheck.checked,
        proxyType: $proxyType.value,
        customProxy: $customProxyIn.value,
        useCustomSeparator: $separatorCheck.checked,
        useLimitItems: $itemsLimitCheck.checked,
        itemsLimitNumber: $itemsNumberIn.value,
        customSeparator: $separatorIn.value,
        repeatOutName: $outFileNameIn.value,
        repeatOutPath: $pathDisplayDiv.innerText,
        repeatOutDailyHour: $hourIn.value,
      })
    );
  } else {
    customConfigsStore.set("customConfigs", [
      {
        name: "Custom 1",
        feedUrl: $feedIn.value,
        useProxy: $proxyCheck.checked,
        proxyType: $proxyType.value,
        customProxy: $customProxyIn.value,
        useCustomSeparator: $separatorCheck.checked,
        customSeparator: $separatorIn.value,
        useLimitItems: $itemsLimitCheck.checked,
        itemsLimitNumber: $itemsNumberIn.value,
        repeatOutName: $outFileNameIn.value,
        repeatOutPath: $pathDisplayDiv.innerText,
        repeatOutDailyHour: $hourIn.value,
      },
    ]);
  }
}

/**
 * @param {Element} $feedIn Dom node
 * @param {Element} $proxyCheck Dom node
 * @param {Element} $proxyType Dom node
 * @param {Element} $customProxyIn Dom node
 * @param {Element} $separatorCheck Dom node
 * @param {Element} $separatorIn Dom node
 * @param {Element} $itemsLimitCheck Dom node
 * @param {Element} $itemsNumberIn Dom node
 * @param {Element} $outFileNameIn Dom node
 * @param {Element} $pathDisplayDiv Dom node
 * @param {Element} $hourIn Dom node
 * @returns {Object[]} An array of object to use as Electron submenu with label
 *                      and onclick function that sets the config
 */
function getCustomConfigs(
  $feedIn,
  $proxyCheck,
  $proxyType,
  $customProxyIn,
  $separatorCheck,
  $separatorIn,
  $itemsLimitCheck,
  $itemsNumberIn,
  $outFileNameIn,
  $pathDisplayDiv,
  $hourIn
) {
  let customConfigs = customConfigsStore.get("customConfigs");
  if (customConfigs) {
    return customConfigs.map((cfg) => {
      return {
        label: cfg.name,
        click() {
          setConfig(
            cfg,
            $feedIn,
            $proxyCheck,
            $proxyType,
            $customProxyIn,
            $separatorCheck,
            $separatorIn,
            $itemsLimitCheck,
            $itemsNumberIn,
            $outFileNameIn,
            $pathDisplayDiv,
            $hourIn
          );
        },
      };
    });
  } else {
    return [{ label: "No custom config saved" }];
  }
}

/**
 * Sets the config
 * @param {Object} cfg Object taken from saved configs
 * @param {Element} $feedIn Dom node
 * @param {Element} $proxyCheck Dom node
 * @param {Element} $proxyType Dom node
 * @param {Element} $customProxyIn Dom node
 * @param {Element} $separatorCheck Dom node
 * @param {Element} $separatorIn Dom node
 * @param {Element} $itemsLimitCheck Dom node
 * @param {Element} $itemsNumberIn Dom node
 * @param {Element} $outFileNameIn Dom node
 * @param {Element} $pathDisplayDiv Dom node
 * @param {Element} $hourIn Dom node
 */
function setConfig(
  cfg,
  $feedIn,
  $proxyCheck,
  $proxyType,
  $customProxyIn,
  $separatorCheck,
  $separatorIn,
  $itemsLimitCheck,
  $itemsNumberIn,
  $outFileNameIn,
  $pathDisplayDiv,
  $hourIn
) {
  $feedIn.value = cfg.feedUrl;
  $proxyCheck.checked = cfg.useProxy;
  if ($proxyCheck.checked && $proxyType.classList.contains("is-hidden")) {
    $proxyType.classList.remove("is-hidden");
  } else {
    $proxyType.classList.add("is-hidden");
  }
  $proxyType.value = cfg.proxyType;
  if (
    $proxyType.value == "custom" &&
    $customProxyIn.classList.contains("is-hidden")
  ) {
    $customProxyIn.classList.remove("is-hidden");
  } else {
    $customProxyIn.classList.add("is-hidden");
  }
  $customProxyIn.value = cfg.customProxy;
  $separatorCheck.checked = cfg.useCustomSeparator;
  if ($separatorCheck.checked && $separatorIn.classList.contains("is-hidden")) {
    $separatorIn.classList.remove("is-hidden");
  } else {
    $separatorIn.classList.add("is-hidden");
  }
  $separatorIn.value = cfg.customSeparator;
  $itemsLimitCheck.checked = cfg.useLimitItems;
  if (
    $itemsLimitCheck.checked &&
    $itemsNumberIn.classList.contains("is-hidden")
  ) {
    $itemsNumberIn.classList.remove("is-hidden");
  } else {
    $itemsNumberIn.classList.add("is-hidden");
  }
  $itemsNumberIn.value = cfg.itemsLimitNumber;
  $outFileNameIn.value = cfg.repeatOutName;
  const { normalize } = require("path");
  $pathDisplayDiv.innerText = normalize(cfg.repeatOutPath);
  $hourIn.value = cfg.repeatOutDailyHour;
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
